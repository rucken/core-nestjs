const fs = require('fs');
const f_gitignore = './deploy/.gitignore';
const f_package_json = './deploy/package.json';
const f_tsconfig_json = './deploy/tsconfig.json';

var data = '', obj = {}, txt = '';

data = fs.readFileSync(f_gitignore, 'utf8');
txt = data.replace(/\/dist/g, '').replace(/\/client\/docs/g, '').replace(/\/client\/index.html/g, '');
fs.writeFileSync(f_gitignore, txt, 'utf8');

console.log('Updated .gitignore');

data = fs.readFileSync(f_package_json, 'utf8');
obj = JSON.parse(data);
delete obj['devDependencies'];
obj.scripts.build = 'exit 0';
obj.scripts.test = 'npm run migrate';
obj.scripts.preinstall = 'sh ./scripts/preinstall.sh';
fs.writeFileSync(f_package_json, JSON.stringify(obj), 'utf8');

console.log('Updated package.json');

data = fs.readFileSync(f_tsconfig_json, 'utf8');
obj = JSON.parse(data);
externalLibs = obj.externalLibs || [];
for (var i = 0; i < externalLibs.length; i++) {
    const externalLib = externalLibs[i];
    try {
        const externalLibData = fs.readFileSync(f_tsconfig_json, 'utf8');
        const externalLibObj = JSON.parse(externalLibData);
        const externalLibName = externalLibObj.name;
        if (
            obj.compilerOptions &&
            obj.compilerOptions.paths &&
            !obj.compilerOptions.paths[name]
        ) {
            obj.compilerOptions[name] = [
                externalLib
            ];
            obj.compilerOptions[name + '/*'] = [
                externalLib + '/*'
            ];
        }
    } catch (error) {

    }
}
fs.writeFileSync(f_tsconfig_json, JSON.stringify(obj), 'utf8');

console.log('Updated tsconfig.json');
