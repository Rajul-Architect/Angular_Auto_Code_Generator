export class Project {
    public projectName: string;
    public applicationName: string;
    public components: string;
    public hooks: string;
    constructor(projectName: string, appName: string, components: string, hooks: string) {
        this.projectName = projectName;
        this.applicationName = appName;
        this.components = components;
        this.hooks = hooks;
    }

}
