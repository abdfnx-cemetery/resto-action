<p align="center">
  <img src="https://raw.githubusercontent.com/abdfnx/resto/dev/.github/assets/logo.svg" height="120px" />
  <h3 align="center">Resto Action</h3>
  <p align="center">
    <a href="https://github.com/abdfnx/resto-action/releases/latest"><img alt="GitHub release" src="https://img.shields.io/github/release/abdfnx/resto-action.svg?logo=github&style=flat-square"></a>
    <a href="https://github.com/marketplace/actions/resto-action"><img alt="GitHub marketplace" src="https://img.shields.io/badge/marketplace-resto--action-blue?logo=github&style=flat-square"></a>
  </p>
</p>

---

- [Usage](#usage)
  - [Workflow](#workflow)
  - [Just Install](#just-install)
- [Customizing](#customizing)
  - [inputs](#inputs)
- [Development](#development)
- [License](#license)

## Usage

### Workflow

```yaml
name: resto

on:
  push:
  pull_request:

jobs:
  resto:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Run Resto
        uses: resto/resto-action@v1
        with:
          args: get https://api.secman.dev/latest
```

### Just Install

```yaml
name: resto

on:
  push:

jobs:
  resto:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Install Resto
        uses: resto/resto-action@v1
        with:
          just-install: true

      - name: Run Resto
        run: resto version
```

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name           | Type   | Default | Description                    |
| -------------- | ------ | ------- | ------------------------------ |
| `args`         | String |         | Arguments passed to the action |
| `just-install` | Bool   | `false` | Just install Resto             |

## Development

```bash
# to build javascript artifacts
docker buildx bake pre-checkin

# to validate all javascript artifacts
docker buildx bake validate
```

## License

Resto Action is licensed under the [**MIT License**](https://github.com/abdfnx/resto-action/blob/main/LICENSE).
