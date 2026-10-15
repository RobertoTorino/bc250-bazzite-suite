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

## GitHub's API limit

GitHub's API answers a limited number of requests an hour: **60 without signing in**, counted per network address
(everything on your network that asks GitHub without signing in shares them), and **5,000 when signed in**.
Answers that did not change since the last look ("304 Not Modified") do not count.

BC250 Suite Releases asks the API whether the newest push built: every 30 seconds while a build runs, every 5
minutes otherwise. A running build with a busy hour of other requests can use up the 60. The window shows how many
are left, beside its GitHub button (*GitHub API: 4,894 of 5,000 left until 04:16, signed in*); when none are left
the button says *GitHub: limit reached, back at …* and waits until then.

**Nothing is broken when the limit is reached**, and there is nothing to fix: GitHub answers again after the time
shown. To get the 5,000, sign in once with the GitHub CLI:

```bash
brew install gh
gh auth login
```

Suite Releases then uses that login (`gh auth token`; a `GITHUB_TOKEN` or `GH_TOKEN` variable takes its place). The
token is only sent to GitHub's API and never stored by the app. The limit as it stands right now:

```bash
curl -s https://api.github.com/rate_limit                                            # without signing in
curl -s -H "Authorization: Bearer $(gh auth token)" https://api.github.com/rate_limit # signed in
```
