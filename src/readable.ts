import * as _ from "lodash";
import {FunctionDefinitions} from "./readable.d";
import {ArgDefinition} from "./readable.d";

export function define(functionDefinitions: FunctionDefinitions, definition:string) {
  return {
    as: <(Function) => void>_.partial(defineAs, functionDefinitions, definition, _),
    is: <(string) => void>_.partial(defineIs, functionDefinitions, definition, _)
  };
}

export function defineAs(functions: FunctionDefinitions,
                         definition: string,
                         func: (...args: Array<any>) => any): FunctionDefinitions {
  const stringRegex = definition.replace(/"(.+?)"/g, '(.+)');

  functions.push({
    regex: new RegExp(stringRegex, 'i'),
    func
  });

  return functions;
}

export function defineIs(functions: FunctionDefinitions,
                         definition: string,
                         body: string): FunctionDefinitions {
  var stringRegex = definition.replace(/"(.+?)"/g, '(.+?)');
  var dependency: any = functions.filter((func: any) => func.regex.test(body))[0];
  var knownArgs = body.match(dependency.regex)
    .splice(1)
    .map((arg, index) => {return { index, arg }})
    .filter((argDef) => argDef.arg[0] !== '"');
  functions.push({
    regex: new RegExp(stringRegex, 'i'),
    dependency,
    knownArgs
  });

  return functions;
}

export function execute(functions: FunctionDefinitions, text: string): any {
  const result = functions.filter((func) => func.regex.test(text)).map((func) => {
    if (func.dependency) {
      const args = text.match(func.regex);
      args.shift();
      func.knownArgs.forEach((knownArg) => {
        args.splice(knownArg.index, 0, knownArg.arg)
      });
      return func.dependency.func.apply(undefined, getArgsFromStrings(functions, args));
    }
    else {
      const args = text.match(func.regex);
      args.shift();
      return func.func.apply(undefined, getArgsFromStrings(functions, args));
    }

  });
  return result[0];
}

function findFunctionDefinitionByText(functions: FunctionDefinitions, text: string) {
  return _.find(functions, (functionDefinition) => functionDefinition.regex.test(text));
}

function getArgsFromStrings(functions: FunctionDefinitions, argsAsStrings: Array<string>): Array<any> {
  return argsAsStrings.map((argAsString) => {
    let matchingFunction = findFunctionDefinitionByText(functions, argAsString);
    if (!matchingFunction) {
      let value;
      try {
        value = JSON.parse(argAsString)
      }
      catch (e) {
        value = argAsString;
      }

      return value;
    }
    else {
      return execute(functions, argAsString);
    }
  });
}