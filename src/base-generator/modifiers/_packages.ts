import {
    Rule,
    SchematicContext,
    Tree
} from '@angular-devkit/schematics';

export function updateJSONFiles(_options: any): Rule {
    return (tree: Tree, _: SchematicContext): Tree => {
        const path = `/${_options.name}/package.json`;
        const angularJSONPath = `/${_options.name}/angular.json`;
        const file = tree.read(path);
        const json = JSON.parse(file!.toString());
        const angularJson = JSON.parse(tree.read(angularJSONPath)!.toString());
        console.log(_options)

        json.scripts = {
            ...json.scripts,
            'build:prod': 'ng build --prod',
            test: 'ng test --code-coverage',
            lint: 'ng lint --fix'
        };


        if (_options.precommit) {
            json.husky = {
                hooks: {
                    'pre-commit': '',
                }
            };
            const hooks: any = [];
            _options.precommit.split(',').forEach((el: any) => {
                if (json.scripts[el])
                    hooks.push(json.scripts[el]);
            });
            json.husky.hooks['pre-commit'] = hooks.join(' && ');
            json.devDependencies.husky = '*';
        }

        if (_options.precommit.indexOf('prettier') !== -1) {
            json.devDependencies.prettier = '^2.0.0';
            json.scripts.prettier = 'pretty-quick --staged --pattern \"apps/**/**/*.{ts,scss,html}\"';
            json.husky.hooks['pre-commit'] += ' && pretty-quick --staged --pattern \"apps/**/**/*.{ts,scss,html}\"';
        }

        json.devDependencies['ngx-bootstrap'] = '*';
        json.devDependencies['bootstrap'] = '^4.5.2';
        json.devDependencies['jquery'] = '*';
        let projects = JSON.parse(JSON.stringify(angularJson.projects));
        projects[Object.keys(angularJson.projects)[0]].architect.build.options.styles = [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'src/assets/css/vendor.scss',
            'src/styles.scss'];
        projects[Object.keys(angularJson.projects)[0]].architect.build.options.scripts = [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/bootstrap/dist/js/bootstrap.min.js"]
        angularJson.projects = projects;
        tree.overwrite(path, JSON.stringify(json, null, 2));
        tree.overwrite(angularJSONPath, JSON.stringify(angularJson, null, 2));

        return tree;
    }
}
