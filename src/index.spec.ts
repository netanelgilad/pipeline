import {define} from "./readable-stateful";
import {e} from "./readable-stateful";
import {main} from "./index";

describe('index', () => {
  it.only ('should define a function', () => {
    console.log(main());
  });
});