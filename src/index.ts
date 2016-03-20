import "reflect-metadata";
import {injector} from "./injector";
import {PipelineApp} from "./pipeline-app";

injector.get(PipelineApp).start();
