# bc250_core

Code shared by the suite's apps. Nothing in it imports an app: each app passes its constants in as an `AppInfo`.

| Module | What it holds | Merged from |
|---|---|---|
| `appinfo` | `AppInfo` (id, name, version, logo, tag prefix, translation catalog, settings names) | new |
| `theme` | Palette, `STATE_COLORS`, bundled Inter font, `header_font()`, `HOVER_STYLESHEET` | all six GUIs |
| `text` | `fmt()` (`%1` placeholders), `fill()` (`{name}` placeholders), `plain_tooltip()`, `window_title()` | governor, helixsr |
| `widgets` | `StatusPill`, `MetricBox`, `ClickableLogo`, `Terminal`, `TextDialog`, `RoundedToolTip`, `show_tooltip()`, `page_header()`, `hint_label()`, `accent_button()`, `set_button_active()` | governor + helixsr's Wayland tooltip + bazzite-test's manual tooltips |
| `app` | `create_app()` / `run_app()` / `exec_app()`: names, Fusion, translators (Qt, core, app), tooltip, icon, SIGTERM | the apps' `__main__` |
| `settings` | `open_settings(info)` at each app's existing file, geometry helpers, `SettingsStore` (typed defaults) | bazzite-test's `AppSettings` |
| `help` | `HelpView`, `HelpPage` (language picker; content stays in the app) | helixsr |
| `updates` | `latest_release()` (with a tag prefix for the suite's per-app tags), `UpdateStatus`, `UpdateChecker` (any job, off the GUI thread) | helixsr + governor |

Still to come: `dialogs`, `platform`, `runner`, `systemd` and `bisect/` (migration step 6).

## Tests

```bash
cd core && QT_QPA_PLATFORM=offscreen python -m pytest -q tests
```

`tests/test_parity.py` renders core's widgets next to the copies in `apps/governor` and `apps/helixsr` and requires
identical pixels; a case is skipped once its app no longer has its own copy.
