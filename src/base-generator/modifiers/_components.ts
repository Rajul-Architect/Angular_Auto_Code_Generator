import {
    apply,
    url,
    template,
    MergeStrategy,
    move,
    mergeWith,
    Tree,
    SchematicContext
} from '@angular-devkit/schematics';
import * as ts from 'typescript';
import { Rule } from '@angular-devkit/schematics/';
import { addDeclarationToModule } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { normalize } from '@angular-devkit/core';

const map: any = {
    'data-grid': 'DataGridComponent',
    'date-picker': 'DatePickerComponent'
}

export function generateComponents(_options: any): any {
    const merged: any[] = [];
    if (_options.components) {
        const components = _options.components.split(',');
        components.forEach((element: any) => {
            const source = apply(url('./components/' + element), [
                template(_options),
                move(normalize(`${_options.name}/src/app/` + element)),
            ]);
            merged.push(mergeWith(source, MergeStrategy.Overwrite))
        });
    }
    return merged;
}



export function addDeclarations(_options: any): Rule {
    return (tree: Tree, _: SchematicContext): Tree => {
        const modulePath = `${_options.name}/src/app/app.module.ts`;
        tree.delete(modulePath);
        const moduleContent = `import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    import { AppComponent } from './app.component';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
    `;
        tree.create(modulePath, moduleContent);

        const source = ts.createSourceFile(
            modulePath,
            moduleContent,
            ts.ScriptTarget.Latest,
            true
        );
        const updateRecorder = tree.beginUpdate(modulePath);
        const components = _options.components.split(',');
        components.forEach((element: any) => {
            const changes = addDeclarationToModule(
                source,
                modulePath,
                map[element],
                './' + element + '/' + element + '.component'
            ) as InsertChange[];
            for (const change of changes) {
                if (change instanceof InsertChange) {
                    updateRecorder.insertLeft(change.pos, change.toAdd);
                }
            }
            console.log(updateRecorder);
            tree.commitUpdate(updateRecorder);
        })
        return tree;
    };
}
