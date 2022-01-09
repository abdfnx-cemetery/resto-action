import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { installZip, executeInstallSh, binDir } from "./installer";

async function run() {
  try {
    switch (process.platform) {
      case "win32": {
        const url = "https://api.secman.dev/resto-windows-latest";
        await installZip(binDir, url);
        break;
      }
      case "linux":
      case "darwin": {
        await executeInstallSh(binDir);
        break;
      }
      default: {
        throw new Error(`Unsupported platform '${process.platform}'`);
      }
    }

    const args = core.getInput("args");

    if (!args) {
      core.setFailed("args input required");
      return;
    }

    exec.exec(`resto ${args}`);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
