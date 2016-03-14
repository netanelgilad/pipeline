import {define as _define} from "./readable";
import {makeStateful} from "./stateful";
import {PARAM} from "./stateful";
import {execute} from "./readable";
import {createState} from "./stateful";

const FUNCTION_DEFINITIONS = Symbol();

createState(FUNCTION_DEFINITIONS, []);

export let define = makeStateful(_define, { params: [FUNCTION_DEFINITIONS, PARAM], returns: FUNCTION_DEFINITIONS });
export let e = makeStateful(execute, { params: [FUNCTION_DEFINITIONS, PARAM]});