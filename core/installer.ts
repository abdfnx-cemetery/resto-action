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

  // exec.exec(`echo ${downloadPath}`);

  core.addPath(path);
}

export const install = async () => {
  switch (process.platform) {
    case "win32": {
      exec.exec("iwr -useb https://git.io/resto-win | iex");
      break;
    }

    case "linux":
    case "darwin": {
      await exec.exec("curl -fsSL https://git.io/resto | bash");
      break;
    }

    default: {
      throw new Error(`Unsupported platform '${process.platform}'`);
    }
  }
};
