export class Project {
    public name: string;
    public applicationName: string;
    public components: string;
    public hooks: string;
    constructor(name: string, appName: string, components: string, hooks: string) {
        this.name = name;
        this.applicationName = appName;
        this.components = components;
        this.hooks = hooks;
    }

}
