import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import * as io from "@actions/io";
import * as exec from "@actions/exec";
import axios from "axios";

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

  exec.exec(`echo ${path}`);

  core.addPath(path);
}

export const install = async () => {
  switch (process.platform) {
    case "win32": {
      installZip(binDir, "https://api.secman.dev/resto-windows-latest");
      break;
    }

    case "linux": {
      installZip(binDir, "https://api.secman.dev/resto-linux-latest");
      break;
    }
    case "darwin": {
      installZip(binDir, "https://api.secman.dev/resto-macos-latest");
      break;
    }

    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
};
