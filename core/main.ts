import * as core from "@actions/core";
import * as exec from "@actions/exec";
import { version, install } from "./installer";

async function run() {
  try {
    const args = core.getInput("args");
    const isJustInstall = /^true$/i.test(core.getInput("just-install"));

    core.info(`Resto ${version()} installed successfully`);

    install();

    if (isJustInstall) {
      return;
    } else if (!args) {
      core.setFailed("args input required");
      return;
    }

    await exec.exec(`resto ${args}`);
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
