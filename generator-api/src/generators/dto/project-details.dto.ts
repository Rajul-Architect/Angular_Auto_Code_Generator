export class ProjectDetailsDTO {
  public hooks: any[];
  public components: any[];
  public projectName: string;
  public applicationName: string;
  constructor(
    hooks: any[],
    components: any[],
    projectName: string,
    applicationName: string,
  ) {
    this.hooks = hooks;
    this.projectName = projectName;
    this.components = components;
    this.applicationName = applicationName;
  }
}
