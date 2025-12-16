import buildThemes from '../style-dictionary.config.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = argv.slice(2);
  let watch = false;
  let brand = null;
  let noInitial = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--watch' || arg === '-w') {
      watch = true;
      continue;
    }
    if (arg === '--no-initial') {
      noInitial = true;
      continue;
    }
    if (arg === '--brand') {
      brand = args[i + 1] ?? null;
      i += 1;
      continue;
    }
    if (!arg.startsWith('-') && brand === null) {
      brand = arg;
      continue;
    }
  }

  return { watch, brand, noInitial };
}

function isDirectory(filePath) {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function shouldTriggerBuild(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  if (normalized.includes('/themes/') && normalized.includes('/dist/')) return false;

  const ext = path.extname(filePath).toLowerCase();
  return ext === '.json' || ext === '.css' || filePath.endsWith('style-dictionary.config.js');
}

function inferBrandFromPath(filePath) {
  const normalized = filePath.split(path.sep).join('/');
  const tokensBrandMatch = normalized.match(/\/tokens\/brands\/([^/]+)\//);
  if (tokensBrandMatch) {
    return tokensBrandMatch[1];
  }

  const themesBrandMatch = normalized.match(/\/themes\/([^/]+)\//);
  if (themesBrandMatch) {
    return themesBrandMatch[1];
  }

  if (normalized.includes('/tokens/global/')) {
    return null;
  }

  return null;
}

function createRecursiveWatchers(rootDirs, onPathEvent) {
  const watchers = [];
  const watchedDirs = new Set();
  const ignoredDirNames = new Set(['dist', 'node_modules', '.git']);

  function watchDir(dirPath) {
    const resolved = path.resolve(dirPath);
    if (watchedDirs.has(resolved)) return;
    if (!isDirectory(resolved)) return;

    watchedDirs.add(resolved);

    const watcher = fs.watch(resolved, { persistent: true }, (_eventType, filename) => {
      if (!filename) {
        onPathEvent(resolved);
        return;
      }

      const fullPath = path.join(resolved, filename.toString());
      onPathEvent(fullPath);

      if (isDirectory(fullPath) && !ignoredDirNames.has(path.basename(fullPath))) {
        watchDir(fullPath);
      }
    });

    watchers.push(watcher);

    for (const entry of fs.readdirSync(resolved, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (ignoredDirNames.has(entry.name)) continue;
      watchDir(path.join(resolved, entry.name));
    }
  }

  for (const dir of rootDirs) {
    watchDir(dir);
  }

  return () => {
    for (const watcher of watchers) {
      try {
        watcher.close();
      } catch {
        // ignore
      }
    }
  };
}

const { watch, brand, noInitial } = parseArgs(process.argv);

if (!noInitial) {
  await buildThemes(brand);
}

if (watch) {
  const watchRoots = [
    path.join(repoRoot, 'tokens', 'global'),
    path.join(repoRoot, 'tokens', 'brands'),
    path.join(repoRoot, 'themes'),
  ];
  const watchFiles = [path.join(repoRoot, 'style-dictionary.config.js')];

  let isBuilding = false;
  let pendingAllBrands = false;
  const pendingBrands = new Set();
  let debounceTimer = null;

  async function runBuild({ allBrands, brandsToBuild }) {
    if (allBrands) {
      await buildThemes(null);
      return;
    }

    for (const b of brandsToBuild) {
      await buildThemes(b);
    }
  }

  async function flushQueue() {
    if (isBuilding) return;
    if (!pendingAllBrands && pendingBrands.size === 0) return;

    isBuilding = true;
    const allBrands = pendingAllBrands;
    const brandsToBuild = new Set(pendingBrands);
    pendingAllBrands = false;
    pendingBrands.clear();

    try {
      await runBuild({ allBrands, brandsToBuild });
    } catch (err) {
      console.error('[themes:watch] Build failed:', err);
    } finally {
      isBuilding = false;
      if (pendingAllBrands || pendingBrands.size > 0) {
        queueBuild();
      }
    }
  }

  function queueBuild() {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      debounceTimer = null;
      void flushQueue();
    }, 150);
  }

  function requestBuildForPath(changedPath) {
    if (!shouldTriggerBuild(changedPath)) return;

    const inferredBrand = inferBrandFromPath(changedPath);
    if (brand) {
      if (inferredBrand && inferredBrand !== brand) return;
      pendingBrands.add(brand);
      queueBuild();
      return;
    }

    if (changedPath.split(path.sep).join('/').includes('/tokens/global/')) {
      pendingAllBrands = true;
      queueBuild();
      return;
    }

    if (!inferredBrand) {
      pendingAllBrands = true;
      queueBuild();
      return;
    }

    pendingBrands.add(inferredBrand);
    queueBuild();
  }

  const stopWatchingDirs = createRecursiveWatchers(watchRoots.filter(p => isDirectory(p)), requestBuildForPath);
  const fileWatchers = watchFiles
    .filter(p => fs.existsSync(p))
    .map(p => fs.watch(p, { persistent: true }, () => requestBuildForPath(p)));

  const stopWatching = () => {
    stopWatchingDirs();
    for (const watcher of fileWatchers) {
      try {
        watcher.close();
      } catch {
        // ignore
      }
    }
  };

  console.log('[themes:watch] Watching tokens/themes for changes...');

  const shutdown = () => {
    stopWatching();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}
