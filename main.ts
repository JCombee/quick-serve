import { Command } from "@cliffy/command";
import { serveDir } from "jsr:@std/http/file-server";

await new Command()
  .name("quick-serve")
  .version("0.1.0")
  .description("Your quick command line server!")
  .option("-p, --port <port:number>", "The port number for the local server.", {
    default: 8080,
  })
  .option("--host <hostname>", "The host name for the local server.", {
    default: "localhost",
  })
  .arguments("[directory]")
  .action(async ({ port, host }, directory = ".") => {
    const absolutePath = await Deno.realPath(directory);
    Deno.serve((req: Request) => {
      return serveDir(req, {
        fsRoot: absolutePath,
      });
    });
  })
  .parse(Deno.args);
