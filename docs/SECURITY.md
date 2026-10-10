<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Security

## Reporting a vulnerability

Please don't open a public issue for a security problem. Use **Security → Report a vulnerability** in this
repository instead, so it can be fixed before it's public. You'll get an answer within a week.

## Verifying a download

Every release comes with a `SHA256SUMS` file. Check the download before you install it:

```bash
sha256sum --check --ignore-missing SHA256SUMS
```

The app also checks its own test files before every run and refuses to run tests when they were changed.
