export interface ArgDefinition {
  index: number,
  arg: string
}

export interface FunctionDefinition {
  regex: RegExp,
  args: Array<RegExp>,
  func?: (...args: Array<any>) => any,
  dependency?: FunctionDefinition,
  knownArgs?: Array<ArgDefinition>
}

export type FunctionDefinitions = Array<FunctionDefinition>;