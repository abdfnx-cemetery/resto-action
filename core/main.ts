import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { version, binDir, install } from "./installer";

async function run() {
  try {
    const args = core.getInput("args");
    const isJustInstall = /^true$/i.test(core.getInput("just-install"));

    core.info(`Resto ${version} installed successfully`);

    if (isJustInstall) {
      install();
      return;
    } else if (!args) {
      core.setFailed("args input required");
      return;
    }

    let exe = `${binDir}/resto`;

    if (process.platform === "win32") {
      exe += ".exe";
    }

    await exec.exec(`${exe} ${args}`);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
