const path = require('path');

// Точка входа Next.js (не .bin/next — там скрипт, его нельзя require)
const nextPath = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');

process.argv.length = 1;
process.argv.push(nextPath, 'start', '--hostname=127.0.0.1');
require(nextPath);
