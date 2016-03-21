import {Injectable} from "angular2/core";

@Injectable()
export class PipelineEnvironment {
  private definition;
  
  setPipelineDefinition(definition) {
    this.definition = definition;
  }
  
  addPipeDependency(pipeName: string) {
    this.definition.pipes.push(pipeName);
  }
  
  getPipelineDefinition() {
    return this.definition;
  }
}