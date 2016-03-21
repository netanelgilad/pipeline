import "reflect-metadata";
import {Injectable} from "angular2/core";
import { readFileSync, accessSync, F_OK, writeFileSync } from 'fs';
import { join } from 'path';
import { safeLoad, safeDump } from 'js-yaml';
import VError = require("verror");
import {Log} from "./logger";
import {PipesLoader} from "./pipes-loader";
import {CommandRunner} from "./command-runner";
import {PipelineEnvironment} from "./pipeline-environment";

const PIPELINE_DIRECTORY = '.pipeline';
const PIPELINE_FILE = 'pipeline';

@Injectable()
@Log()
export class PipelineApp {

  constructor(private pipesLoader: PipesLoader,
              private commandRunner: CommandRunner,
              private pipelineEnvironment: PipelineEnvironment) {}

  start() {
    this.moveToProjectDirectory();
    const pipelineDefinition = this.loadPipelineDefinition();
    this.pipelineEnvironment.setPipelineDefinition(pipelineDefinition);
    this.pipesLoader.loadPipes(pipelineDefinition.pipes);
    this.commandRunner.run(process.argv);
    this.writePipelineDefinition(this.pipelineEnvironment.getPipelineDefinition());
  }

  moveToProjectDirectory() {
    this.moveToDirectoryWithPipelineDirectory();
    this.ensurePipelineDirectoryContainsPipelineFile();
  }
  
  loadPipelineDefinition() {
    return safeLoad(readFileSync(join(PIPELINE_DIRECTORY, PIPELINE_FILE), 'utf8'));
  }
  
  writePipelineDefinition(pipelineDefinition) {
    writeFileSync(join(PIPELINE_DIRECTORY, PIPELINE_FILE), safeDump(pipelineDefinition), 'utf8');
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