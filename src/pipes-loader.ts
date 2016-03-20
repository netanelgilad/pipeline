import {Injectable} from "angular2/core";
import {Log} from "./logger";
import relative = require('require-relative');
import {CommandRunner} from "./command-runner";

@Injectable()
@Log()
export class PipesLoader {
  constructor(private commandRunner: CommandRunner) {}
  
  loadPipes(pipes:Array<string>) {
    pipes.forEach((pipe) => {
      const pipeDefinition = relative(pipe, process.cwd());
      pipeDefinition.definition.commands.forEach((commandDefinition) => {
        this.commandRunner.loadCommand(commandDefinition);
      });
    });
  }
}
