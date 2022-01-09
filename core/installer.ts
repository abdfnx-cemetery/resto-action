import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";
import * as exec from "@actions/exec";

const workspace = process.env.GITHUB_WORKSPACE;
export const binDir = `${workspace}/bin`;

export async function installZip(path, url) {
  await io.mkdirP(path);
  const downloadPath = await tc.downloadTool(url);
  await tc.extractZip(downloadPath, path);
  core.addPath(path);
}

export async function executeInstallSh(installPath) {
  // download script
  const url = "https://git.io/resto";
  const downloadPath = await tc.downloadTool(url);
  exec.exec(`chmod +x ${downloadPath}`);

  // execute script
  await io.mkdirP(installPath);
  const installCommand = `${downloadPath} ${installPath}`;

  exec.exec(installCommand);

  // add binary to PATH
  core.addPath(installPath);
}
