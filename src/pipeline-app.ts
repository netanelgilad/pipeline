import "reflect-metadata";
import {Injectable} from "angular2/core";
import { readFileSync, accessSync, F_OK } from 'fs';
import { join } from 'path';
import { safeLoad } from 'js-yaml';
import VError = require("verror");
import {Log} from "./logger";
import {PipesLoader} from "./pipes-loader";
import {CommandRunner} from "./command-runner";

const PIPELINE_DIRECTORY = '.pipeline';
const PIPELINE_FILE = 'pipeline';

@Injectable()
@Log()
export class PipelineApp {

  constructor(private pipesLoader: PipesLoader,
              private commandRunner: CommandRunner) {}

  start() {
    this.moveToProjectDirectory();
    const pipelineDefinition = this.loadPipelineDefinition();
    this.pipesLoader.loadPipes(pipelineDefinition.pipes);
    this.commandRunner.run(process.argv);
  }

  moveToProjectDirectory() {
    this.moveToDirectoryWithPipelineDirectory();
    this.ensurePipelineDirectoryContainsPipelineFile();
  }
  
  loadPipelineDefinition() {
    return safeLoad(readFileSync(join(PIPELINE_DIRECTORY, PIPELINE_FILE), 'utf8'));
  }

  private moveToDirectoryWithPipelineDirectory() {
    try {
      accessSync(PIPELINE_DIRECTORY, F_OK);
    }
    catch (_) {
      try {
        process.chdir('..');
      }
      catch (error) {
        throw new VError(error, 'Not inside a pipeline project! Sorry, can\'t help here... ');
      }

      this.moveToProjectDirectory();
    }
  }

  private ensurePipelineDirectoryContainsPipelineFile() {
    try {
      accessSync(join(PIPELINE_DIRECTORY, PIPELINE_FILE));
    }
    catch(error) {
      throw new VError(error, 'No pipeline file in the pipeline directory! You gotta fix this...');
    }
  }
}