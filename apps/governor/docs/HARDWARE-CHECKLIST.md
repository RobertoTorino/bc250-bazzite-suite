# Hardware verification checklist

Manual pass on a real BC-250 (Bazzite, `cyan-skillfish-governor-smu.service` running) for the features that the
pytest suite can only cover with mocks. Run it after a release, tick the boxes and open an issue for anything
that fails. Cross-check the GUI against `busctl` and the journal wherever a command is given.

Setup used:

- Release / tag: `v…`
- Governor version (`rpm -q cyan-skillfish-governor-smu` or `--version`):
- Kernel / Bazzite image:
- Date:

Useful shells to keep open:

```sh
journalctl -fu cyan-skillfish-governor-smu.service
watch -n1 busctl --system introspect com.cyanskillfish.Governor /com/cyanskillfish/Governor \
  com.cyanskillfish.Governor.PerformanceMode
```

## 1. Install

- [ ] Download the tarball + `.sha256` from the release, `sha256sum -c` passes.
- [ ] `./install.sh` finishes without errors; the desktop entry and icon appear in the launcher.
- [ ] Help page shows the released version number (not `0.x.0-dev` / the repository value).
- [ ] Tarball contains no `tests/`, `.github/`, `requirements-dev.txt`.
- [ ] `./install.sh --uninstall` removes launcher, venv and desktop entry; reinstall afterwards.

## 2. Overview

- [ ] Telemetry (load, clock, temperature, power) matches `busctl … get-property` values and updates each poll.
- [ ] Chart window combo: 2 / 10 / 30 / 60 min; switching re-scales the time axis, the group-box title shows the
      recorded span and stops growing at 60 min.
- [ ] "Export CSV": file dialog proposes `bc250-telemetry-<date>.csv`, file has a header row and one line per
      sample; `perf_enabled` and `range_min/max` columns reflect the Performance page state.
- [ ] "Compare…" with that export: dashed lines appear right-aligned under the live ones, the note shows
      "Reference <file> (…): load … clock … °C … W. Live window (…): …" and keeps updating; "Clear" removes it.
      A non-telemetry CSV is refused with a message.
- [ ] Leave running > 1 h: memory stays flat (ring buffer), chart keeps scrolling.

## 3. Tuning / config.toml

- [ ] Apply a change (e.g. `frequency-range` upper): `/etc/…/config.toml` keeps comments and untouched lines,
      only the edited value changes, the service restarts and the journal shows the new value.
- [ ] Safe points stay at the end of the file; newly added sections (`[timing.*]`, `[frequency-thresholds]`)
      are appended after them with their header comment.
- [ ] Backups page lists the new backup; restore brings the previous file back byte-for-byte.
- [ ] Invalid input (upper < lower, unknown method) is refused before anything is written.

## 4. Profiles

- [ ] "Save current as…" with a name containing spaces/slashes → sanitised name stored in
      `~/.config/bc250-governor-manager/profiles.json`.
- [ ] "Load into forms" marks the page dirty (Apply enabled) without touching the file.
- [ ] "Apply now" writes the file and restarts the service; tray "Apply profile" submenu lists the same names and
      applying from the tray shows a notification when the window is hidden.
- [ ] Delete removes it from both the combo and the tray submenu.
- [ ] "Copy hotkey command" → paste into a terminal while the app runs: the running instance applies the
      profile (pkexec prompt, tray notice), the terminal prints "handed to the running …" and exits at once; a
      wrong name gives a tray warning, no dialog. Bound to a key in System Settings → Shortcuts it does the same.
- [ ] Launching the app a second time (menu or terminal) raises the existing window instead of a second tray
      icon; `--profile` with the app not running starts it and applies.
- [ ] Switching between a smu and a tt profile (if both installed) does not write unsupported keys.

## 5. Performance page

- [ ] Enable/disable performance mode: `Enabled` property flips, fixed frequency / range are honoured by the
      clock trace on the Overview.
- [ ] "Set load target": `busctl … get-property … LoadTarget*` shows the new pair; forms do not reset while
      editing but refill when the governor reports different values.
- [ ] "Set temperatures": throttle / recovery pair accepted; 0 shows as "Not set"; invalid pairs disable the
      button with the hint.
- [ ] While a safe-point test is running, load / temperature changes do **not** end the test (status stays
      "Testing…"); Enable, Set fixed frequency and Set range **do** end it.

## 6. Safe-point test (TestMode)

- [ ] "Test a point" asks for pkexec once, pins the frequency/voltage; `busctl … TestMode` reports it;
      Overview clock trace sits at the pinned value.
- [ ] Timer expiry, Stop, closing the window and the governor going away each release the point and stop the
      load tool (check `pgrep vkmark|glmark2|vkcube|glxgears` is empty).
- [ ] Load combo lists only tools present on PATH; "(none)" works without starting anything.
- [ ] Run with `vkmark` or `glmark2`: GPU load rises on the Overview, temperature climbs, result line shows held
      time, tool name, peak °C and clock range.
- [ ] Kill the load tool by hand mid-test: live status and verdict mark the tool as exited/crashed, the test
      itself keeps running until Stop/timer.
- [ ] Live status says "Kernel log watched" (user in `systemd-journal`/`wheel`); as a user outside those groups
      it says "Kernel log not readable, no hang detection" and the verdict says "kernel log not watched".
- [ ] Clean run: verdict ends with "no GPU errors in the kernel log".
- [ ] Hang detection: with a test pinned, `sudo sh -c 'echo "<3>amdgpu: ring gfx_0.0.0 timeout (checklist)" > /dev/kmsg'`
      aborts the test within a second, the verdict quotes the line, tray shows a warning icon, `busctl` shows
      `Enabled` false.
- [ ] "Add to table" inserts the tested pair sorted; testing the same frequency again replaces the row.
- [ ] Deliberately unsafe point (voltage too low): governor/GPU recovers, GUI reports governor gone or verdict,
      no stuck pkexec prompts. **Have a reboot plan ready.**

## 7. Alerts

- [ ] Settings → Alerts: set temperature threshold a few degrees below the current reading → one tray
      notification + status-bar line; no repeat until the temperature drops ≥ 5 °C and climbs back, or 5 min pass.
- [ ] Throttle alert fires when the reading crosses the governor's throttle temperature (Performance page value,
      else `temperature` in config.toml).
- [ ] `sudo systemctl stop cyan-skillfish-governor-smu.service` after the app has polled it running → "service
      stopped" alert; `start` again, no false alert on launch when the service is already stopped.
- [ ] Disabling each alert in Settings silences only that kind.

## 8. Tray / lifecycle

- [ ] Close to tray, restore, quit from tray: no "QProcess destroyed while running" in the terminal, load tool
      and TestMode released.
- [ ] Launch options (autostart, start minimised) behave as labelled.
- [ ] Update check reports the running version as current right after a release.

## Result

- [ ] All boxes ticked for release `v…` on `<date>`.
- Issues opened: …
