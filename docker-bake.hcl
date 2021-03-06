variable "NODE_VERSION" {
  default = "12"
}

target "node-version" {
  args = {
    NODE_VERSION = NODE_VERSION
  }
}

group "default" {
  targets = ["build"]
}

group "pre-checkin" {
  targets = ["vendor-update", "build"]
}

group "validate" {
  targets = ["build-validate", "vendor-validate"]
}

target "build" {
  inherits = ["node-version"]
  dockerfile = "./docker/build.Dockerfile"
  target = "build-update"
  output = ["."]
}

target "build-validate" {
  inherits = ["node-version"]
  dockerfile = "./docker/build.Dockerfile"
  target = "build-validate"
}

target "vendor-update" {
  inherits = ["node-version"]
  dockerfile = "./docker/vendor.Dockerfile"
  target = "update"
  output = ["."]
}

target "vendor-validate" {
  inherits = ["node-version"]
  dockerfile = "./docker/vendor.Dockerfile"
  target = "validate"
}
