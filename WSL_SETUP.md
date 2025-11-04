# WSL/Ubuntu 22.04 Setup Guide

## Prerequisites

This project is developed on **Windows 11 with WSL 2** running **Ubuntu 22.04**.




## Common Commands

All commands should be run in **WSL Bash terminal** (not Windows CMD/PowerShell):

```bash
# Install dependencies
npm install

# Build themes
npm run build

# Run development server (Storybook)
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Validate themes
npm run validate
```

## File System Notes

- Project path: `/home/dejan/projects/white-label-ui-lib`
- Windows access: `\\wsl.localhost\Ubuntu-22.04\home\dejan\projects\white-label-ui-lib`
- Use forward slashes in WSL: `/path/to/file`
- Git handles line endings automatically with `.gitattributes`

## VS Code / Cursor Integration

If using Cursor/VS Code from Windows:

1. Open folder: `\\wsl.localhost\Ubuntu-22.04\home\dejan\projects\white-label-ui-lib`
2. Or use Remote-WSL extension: `code .` from WSL terminal
3. Terminal automatically uses WSL Bash


## Notes

- **Always use WSL terminal** for npm/node commands
- Windows CMD/PowerShell won't have access to WSL-installed tools
- Use `wsl` command from Windows CMD to enter WSL
- File watchers may have limits; increase if needed: `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`