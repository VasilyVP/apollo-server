const path = require('path');
const fse = require('fs-extra');
const { execSync } = require('child_process');

const build = './build';
const builtSchemas = build + '/schemas'
const schemas = './src/schemas';

fse.emptyDirSync(build);

execSync('npx tsc --build');

fse.copySync(schemas, builtSchemas, {
    filter: file => path.extname(file) === '.ts' ? false : true,
});
