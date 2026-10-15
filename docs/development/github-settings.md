<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# GitHub settings

The repository's settings on GitHub, and why. They suit a repository where one person pushes straight to `main`
and releases come from tags. Use them as a starting point for a new project.

## Features

**Settings → General**, the section **Features** (scroll down past the repository name and social preview).

| Feature | Setting | Why |
|---|---|---|
| Wikis | Off | The documentation is this site, built from `docs/` and checked by `mkdocs build --strict`. A GitHub wiki is a separate repository outside CI, and search engines skip it on small repositories. |
| Issues | On | Bug reports and feature requests, through the forms in `.github/ISSUE_TEMPLATE/`. |
| Discussions | Off | Issues cover it. Turn it on for questions and reports that are not bugs. |
| Projects | Off | Not used. |

Also under **Settings → General**, in **Pull Requests**: tick **Automatically delete head branches**.

## The About box

The ⚙ next to **About** on the repository's front page, not in Settings.

- **Website:** tick **Use your GitHub Pages website**, so the address of this site shows on the front page.
- **Topics:** the keywords people search and browse by, such as `bazzite`, `bc250`, `amd`, `linux-gaming`,
  `fedora-atomic`, `universal-blue` and `pyqt6`. Only topics that really describe the project.

## Rulesets

**Settings → Rules → Rulesets.** Rules that guard against mistakes without getting in the way of daily work.

**Release tags:** **New tag ruleset**.

- Target: **Include by pattern** `*-v*`. That covers every app and portal tag (`portal-v1.1.3`, `governor-v0.1.1`).
- Rules: **Restrict updates** and **Restrict deletions**. Leave **Restrict creations** off, or new release tags
  are blocked too.
- Bypass list: empty. To really move a tag, set the ruleset to Disabled for a moment.

The pins in `portal/apps.toml` name a tag and the sha256 of its asset, so a released tag must never move.

**The main branch:** **New branch ruleset**.

- Target: **Include default branch**.
- Rules: **Restrict deletions** and **Block force pushes**, nothing else.
- Bypass list: empty.

Direct pushes keep working. Rules that require pull requests or passing checks would block them, so they stay off.

## Actions

**Settings → Actions → General.**

- **Actions permissions:** **Allow RobertoTorino, and select non-RobertoTorino, actions and reusable workflows**,
  with only **Allow actions created by GitHub** ticked. The workflows use only `actions/*`, so they keep working;
  a third-party action fails until it is allowed on purpose.
- **Require actions to be pinned to a full-length commit SHA:** off. The workflows refer to actions by version
  (`actions/checkout@v4`); this setting would fail every run until each `uses:` line names a commit hash.
- **Workflow permissions:** **Read repository contents**. A workflow that needs more asks for it in its own
  `permissions:` block (`release.yml` writes releases, `docs.yml` publishes the site).

## Security

**Settings → Advanced Security.**

- **Private vulnerability reporting:** on. The [Security policy](../SECURITY.md) and the issue form's
  "Security problem" link send people to it; with it off, that link fails.
- **Dependabot alerts** and **Dependabot security updates:** on.
- **Dependabot version updates:** set in `.github/dependabot.yml`. Once a week one pull request updates the
  actions the workflows use; nothing changes until it is merged.
