import * as _ from "lodash";
const _state = {};

export const PARAM = Symbol;
export const RETURN = Symbol;

interface StateDefinition {
  params?: Array<any>;
  returns?: Array<any> | any;
}

export function createState(symbol: any, initialValue: any): void {
  _state[symbol] = initialValue;
}

export function makeStateful(func: Function, stateDefinition: StateDefinition): Function {
  return (...args) => {
    let currentArg = 0;
    let toBeArgs = [];

    if (stateDefinition.params) {
      toBeArgs = stateDefinition.params.map((stateForArg) => {
        if (stateForArg === PARAM) {
          return args[currentArg++];
        }
        else {
          return _state[stateForArg];
        }
      });
    }

    const returnValue = func.apply(undefined, toBeArgs.concat(args.slice(currentArg)));

    if (!stateDefinition.returns) {
      return returnValue;
    }
    else if (!_.isArray(stateDefinition.returns)) {
      _state[stateDefinition.returns] = returnValue;
    }
    else {
      let result;
      let currentReturn = 0;

      stateDefinition.returns.forEach((stateForReturn) => {
        if (stateForReturn === RETURN) {
          result = returnValue[currentReturn];
        }
        else {
          _state[stateForReturn] = returnValue[currentReturn];
        }

        currentReturn++;
      });

      return result;
    }
  };
}

export function getStateValue(symbol: any): any {
  return _state[symbol];
}