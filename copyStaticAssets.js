var shell = require('shelljs');

shell.mkdir('-p', 'dist/public/js/lib','dist/public/fonts','dist/public/images');

shell.cp('-R', 'server/public/js/lib', 'dist/public/js/lib');
shell.cp('-R', 'server/public/fonts', 'dist/public/fonts');
shell.cp('-R', 'server/public/images', 'dist/public/images');