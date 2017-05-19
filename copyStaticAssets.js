var shell = require('shelljs');

shell.mkdir('-p', 'dist/public/js');

shell.cp('-R', 'server/public/js/lib', 'dist/public/js');
shell.cp('-R', 'server/public/fonts', 'dist/public');
shell.cp('-R', 'server/public/images', 'dist/public');