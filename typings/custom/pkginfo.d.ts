declare module "pkginfo" {
  function read(module: any) : {
    package: {
      version: string
    }
  };
}