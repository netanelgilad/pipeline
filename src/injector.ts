import {Injector} from "angular2/core";
import {PipelineApp} from "./pipeline-app";
import {PipesLoader} from "./pipes-loader";
import {CommandRunner} from "./command-runner";
import {PipelineEnvironment} from "./pipeline-environment";

export const injector = Injector.resolveAndCreate([
  PipelineApp,
  PipesLoader,
  CommandRunner,
  PipelineEnvironment
]);