import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";
import axios from "axios";
const execSync = require("child_process");

export function version() {
  return axios
    .get("https://get-latest.secman.dev/abdfnx/resto")
    .then((response) => {
      return response.data;
    });
}

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
  execSync(`chmod +x ${downloadPath}`);

  // execute script
  await io.mkdirP(installPath);
  const installCommand = `${downloadPath} ${installPath}`;
  let stdout = execSync(installCommand, { timeout: 30000 });
  console.log(Buffer.from(stdout).toString("utf-8"));

  // add binary to PATH
  core.addPath(installPath);
}

export const install = async () => {
  switch (process.platform) {
    case "win32": {
      const url = `https://github.com/abdfnx/resto/releases/download/${version()}/resto_windows_${version()}_amd64.zip`;
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
};
