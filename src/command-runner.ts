import {Injectable} from "angular2/core";
import commander = require('commander');
import pkgInfo = require('pkginfo');
import {Log} from "./logger";
import {PipelineEnvironment} from "./pipeline-environment";

interface CommandDefinition {
  name: string;
  description: string;
  action: Function;
}

@Injectable()
@Log()
export class CommandRunner {
  private program;
  
  constructor(private pipelineEnvironment: PipelineEnvironment) {
    const packageVersion = pkgInfo.read(module).package.version;
    this.program = commander.version(packageVersion);
  }
  
  loadCommand(commandDefinition: CommandDefinition) {
    this.program
      .command(commandDefinition.name)
      .description(commandDefinition.description)
      .action((...args) => {
        commandDefinition.action(this.pipelineEnvironment, ...args);
      });
  }
  
  run(args) {
    this.program.parse(args);
  }
}