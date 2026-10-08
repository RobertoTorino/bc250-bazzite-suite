# BC250 Bazzite Suite

Tools for the AMD BC-250 running Bazzite. The **portal** installs and starts them: BC-250 Bazzite Test is always
installed, every other app is optional.

## Install

Download `portal-v<version>.tar.gz` and `SHA256SUMS` from the suite's
[Releases](https://github.com/RobertoTorino/bc250-bazzite-suite/releases) page, then:

```bash
sha256sum --check --ignore-missing SHA256SUMS
tar -xzf portal-v*.tar.gz && cd portal-v*/ && ./install.sh
```

Then install the other apps from the portal. Apps marked **changes the board** (unlocks, GPU governor, GPU
overclocking, the ACPI override) change how the BC-250 runs: read their page first.

Each app gets its own section here; until step 8 of the migration, each page points to the app's README.
