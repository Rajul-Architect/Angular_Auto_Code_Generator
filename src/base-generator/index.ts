import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
  apply,
  url,
  template,
  chain,
  mergeWith,
  MergeStrategy, move
} from '@angular-devkit/schematics';
import { generateComponents, addDeclarations } from './modifiers/_components';
import { updateJSONFiles } from './modifiers/_packages';
import { normalize } from '@angular-devkit/core';

export function newRepo(_options: any): Rule {
  const name = _options.name
  return (tree: Tree, _context: SchematicContext) => {

    const templateSource = apply(url('./static-files/css'), [
      template(_options),
      move(normalize(`${name}/src/assets/css`)),
    ]);
    const appComponentTemplateSource = apply(url('./components/app'), [
      template(_options),
      move(normalize(`${name}/src/app/`)),
    ]);
    const merged = mergeWith(templateSource, MergeStrategy.Overwrite);
    const merged2 = mergeWith(appComponentTemplateSource, MergeStrategy.Overwrite);
    const components: any = generateComponents(_options)
    const rule = chain([
      generateRepo(name),
      merged,
      merged2,
      ...components,
      addDeclarations(_options),
      updateJSONFiles(_options)
    ]);

    return rule(tree, _context) as Rule;
  }
}



function generateRepo(name: string): Rule {
  return externalSchematic('@schematics/angular', 'ng-new', {
    name,
    version: '12.0.0',
    directory: name,
    routing: false,
    style: 'scss',
    inlineStyle: false,
    inlineTemplate: false,
    skipInstall: true
  });
}
