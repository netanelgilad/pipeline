import { define, e} from "./readable-stateful";
import '../package.json'
declare var module: any;

import {read} from 'pkginfo';
define('this package version').as(() => {
  return read(module).package.version;
});

import {version} from 'commander';
define('create commander program with a version of "package version"')
  .as((packageVersion: string) => {
    return version(packageVersion);
  });

// ----- Definitions ------

export function main() {
  return e("create commander program with a version of this package version");
}
