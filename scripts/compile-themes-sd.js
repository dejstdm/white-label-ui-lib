import buildThemes from '../style-dictionary.config.js';

const brand = process.argv[2] || null;
buildThemes(brand);

