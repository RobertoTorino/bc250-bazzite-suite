<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Migration status

Working notes for moving the seven BC-250 tools into this suite. Not part of the manual or the READMEs, which
describe only what exists.

## Resume here (13-10-2026, after the break)

Released by the owner during the break: console-link-v1.0.0 and portal-v1.0.0 (with dependency-checker-v0.1.9),
with everything built before it (controller, motion, rumble and light bar, privacy, the Steam PS button setting,
the controller test with the genuine check, the account ID from the clipboard, Game Mode, withdrawing a release).

Built since, in the working tree:
- Console Link: the mouse pointer hides over the stream after 2 s still, and comes back when the mouse moves.
  The manual names the desktop's own mute (the speaker on the task bar entry) beside M. Needs a Console Link
  release (patch).
- Console Link, performance (owner's board, 13-10-2026: Lumines Remastered from the Steam shortcut, full screen,
  cable: the sound stuttered, the picture and the controller lagged, compared with playing on the console): a
  statistics file per stream (stream_stats.py, a line per second in ~/.local/state/bc250-console-link/streams), and
  the native core's decoders now let go of the GIL (they held it about 5 ms per 1080p frame, stalling the window,
  the sound output and the controller reader). Open on the board: reinstall from the checkout (the native core
  must be rebuilt: `bash apps/console-link/install.sh`), play Lumines a few minutes from the shortcut, and send the
  newest file. Then, by what it shows: the sound reserve (the sink holds 30 ms and is fed from the GUI thread; a
  bigger one or a thread of its own), the picture's path (decoder to drawing, the compositor), decoder threads,
  720p as a choice (stream settings). The owner's second board (its SSD has a DRAM cache, this one's not) as a
  second file to compare; the file shows disk waits and swapping, which is when the SSD would matter. Not the CPU unlock: decoding runs on one thread, so cores 7 and 8 only help
  when the file shows all cores busy (owner asked, 13-10-2026; the board runs 6 cores).
- Board result (13-10-2026, owner, after reinstalling from the checkout): no more sound or picture stutter, the
  controller feels more responsive, Escape leaves full screen. So the GIL held while decoding was the cause. The
  statistics file stays, for the next problem and for the second board. Explained for later (owner: useful for a
  handheld version) in docs/development/console-link-stream.md: the threads, the GIL rule for the native core, and
  how to read the statistics file on other hardware.
- Dependency Checker: Console Link's FFmpeg (the version inside the native core), libva (required: the core links
  it), Steam and Rust, beside SDL3; the status Needs update (owner's choice, 13-10-2026: action required, an app
  needs a newer version or a release fixes a known vulnerability; Update available stays for the optional newer
  version) and a table of every status in its manual. Needs a Dependency Checker release (patch, or minor for the
  new status: the owner's call). Found 13-10-2026: most installers ran pip install -r without --upgrade, so a
  reinstall did not bring a security fix within the allowed range. Owner (13-10-2026): the installers upgrade;
  done in every installer (test_layout checks it). Needs a release of every app whose installer changed and of
  the portal, whenever each is next released (the owner's call; nothing urgent unless a Needs update shows).
- Portal: a Gaming section (`section = "gaming"` in apps.toml), open until closed, with Console Link moved there
  from Development only (the owner's end goal for it: out of Development only once the stream works); apps.toml's
  comment names the withdrawn field. Needs a portal release (check_manifest asks for the bump because apps.toml
  changed; until then that check fails).

Owner's answers (13-10-2026):
1. Navigation: leaving full screen and quitting Console Link from the controller. Full screen is left only with
   the keyboard (Escape; the owner used the Windows key), and there is no way to quit from the controller.
2. Button combinations: wanted, on the list (below).

Console Link against its plan (owner asked, 13-10-2026). The plan of 12-10-2026: iteration 1 (find, wake,
register, session), iteration 2 (the stream), end goal a regular portal tile once the stream works. Built and
tried on the board: all of iteration 1 except a PS5; of iteration 2 the network test, the encrypted connection,
FEC, the decoder (software on the BC-250), picture, sound, controller in and out (buttons, sticks, touchpad,
motion, rumble, light bar), the controller test, privacy, Game Mode, the statistics file; the stream is smooth at
1080p/60 since the GIL fix; the tile moves to Gaming. Left from the plan itself:
1. **Recovery from lost packets**: built (13-10-2026, see the console-link CHANGELOG). Open on the board, from a
   terminal after reinstalling from the checkout: `bc250-console-link --stream "ps4-728" --simulate-loss 2`, then
   5 and 10: does the picture freeze briefly and come back instead of smearing; the log's Recovery counts and the
   statistics file's recovery column; and once on Wi-Fi without the option. The console's SPS is not in any test
   yet: the H.264 slice parsing follows the standard and was checked on recorded console frames (slice type) and
   x264 clips; a real stream's log shows whether "without their reference" stays plausible.
   Board result (13-10-2026, owner, PS4 Pro, cable, --simulate-loss): at 2% still reasonable to play; at 5% and
   10% the stutter and latency are too much for joyful play. 2% over 122 s: 2232 frames rebuilt with FEC, 5 beyond
   repair, 5 key frames asked for, 40 frames skipped (about 8 each, some 130 ms), 4 without their reference; the
   fail-safe did not trip, so the console's headers read as expected. Findings: closing the window of a --stream
   start quit the app before the stream closed (fixed); the wait for a missing video packet (up to 16 ms, the
   reference's "about a frame") is paid by nearly every frame at 5% loss and adds latency. Late packets are now
   counted apart from lost ones; with a USB Wi-Fi adapter (owner, when there is one): whether late ones happen at
   all; if not, a shorter or adaptive wait (an improvement over the reference, to measure). Decoding took 9 to
   12 ms per 1080p frame in these runs (busier pictures, 4 to 10 Mbit/s): near the 16.7 ms of a frame at 60 fps, a
   reason for 720p in the stream settings where it stutters.
2. **A PS5**: registration, session and stream never tried (no hardware); DualSense adaptive triggers and haptics.
3. **The microphone**: dropped (owner, 13-10-2026); the app still announces one to the console and sends none.
4. Smaller: Remove now offers to remove the console's Game Mode shortcut (13-10-2026; the board test is on hold
   until the owner's second PS4 Pro arrives: remove that one, with its shortcut, so the first stays registered); the PS
   button in Game Mode (stays with Steam; combinations dropped by the owner); the open board tests below.
Added since the plan (owner's): controller combinations, the window redesign, several players, stream settings,
internet streaming, handhelds, a Steam release (on hold). Order (owner, 13-10-2026): the several-players
experiment, then stream settings; recovery from lost packets recommended right after.

Controller button combinations: dropped (owner, 13-10-2026: Escape covers leaving full screen; in Game Mode Steam's
menu ends the game). Kept below for the record. Was on the list: **controller button combinations** for the stream window, each a hold of about 2 s so a game
never triggers it by accident; which buttons is the owner's call. Actions to cover: leave or enter full screen,
end the stream (and with --stream quit the app), mute, and in Game Mode send the PS button (Steam keeps it there).
A proposal to put to the owner: hold PS + Options leave full screen, PS + Share end the stream, PS + touchpad
click mute; in Game Mode, PS alone goes to Steam and a hold of Share + Options sends PS. To check: whether Steam
in Game Mode lets a PS combination through at all.

Big Picture: dropped (owner, 13-10-2026; Game Mode is the target). Kept below for the record.
The issue (owner, 13-10-2026, not reproducible yet; the owner tests more, it does not hold anything back): started
straight from Big Picture, the PS button goes to the console and the window can be made smaller to reach the menu
and full screen again. After switching from the desktop to Big Picture, sometimes: the stream window gets lost
behind another window and cannot be brought back, and the PS button goes to Steam instead of the console (no way
to leave a game). Not every time; sometimes switching works fine. To find: the exact steps; then perhaps the
controller combination to bring the stream window forward (on the list), and Steam's guide setting as Big
Picture sees it.

Board tests (13-10-2026, owner, after reinstalling from the checkout): all passed: the shortcut in Game Mode itself
(picture, all controls with the browser search bar test, touchpad and motion, Exit game), the window coming to the
front, the key hints and the pointer hiding; Add to Game Mode with Steam running and Update with the owner's own
pictures in apps/console-link/images/steam/ (the new wide.png without a title in place since 13-10-2026); test withdrawal in Suite Releases; the privacy masking and a copy from the log;
a game with tilt; a motion reset; the portal from the checkout with the Gaming section.

Compared with Asobi: Remote Play (owner, 13-10-2026; a proprietary client on Steam for Windows, Linux and SteamOS,
1.0 on 9-10-2026; free tier 1080p/30 for Remote Play, a paid Premium for 60 fps, HDR, gyro, haptics, adaptive
triggers, manual bitrate, low-latency modes, audio delay): ideas to weigh, the owner's call each:
- **Several controllers as separate players** (Asobi: up to 4): Console Link combines all controllers into one.
  The biggest gap for couch play; the protocol sends one controller state, so to check what the console accepts.
  Owner (13-10-2026): worth looking into. Findings (13-10-2026), from the reference's code and protocol file: the
  reference only ever sends one controller. The protocol has room for more: a CONTROLLERCONNECTION message with a
  controller_id (the reference leaves it out) and a controller type; byte 3 of a controller-state packet is the
  number of states in it (always 1 in the reference); the state starts with 0xa0, a button event with 0x80, a touch
  with 0xc0/0xd0, whose low bits may be a controller number. Nobody documents it publicly; Asobi shows it works.
  To find out on the owner's console, with an experiment build (a hidden option, not for users): announce a second
  controller (CONTROLLERCONNECTION, controller_id 1, DualShock 4); the PS4 should then ask "Who is using this
  controller?". Then try the second controller's input three ways: two states in one packet; the low bits of the
  state and event bytes as the controller number; a second feedback channel. What the console reacts to decides
  the design. Experiment build done (13-10-2026): --player-experiment announce | marked | packed
  [:CONTROLLER_ID[:MARK]] with --stream, from a terminal. Open on the board (owner, two controllers on the board,
  the app reinstalled from the checkout), each run closed before the next, the terminal output kept:
  1. `bc250-console-link --stream "<console>" --player-experiment announce`: does the PS4 ask "Who is using this
     controller?" or show a second controller or user?
  2. `... --player-experiment marked`: the second controller's cross and sticks on the home screen and in a game
     with local multiplayer ("press X to join"); does the first one still work alone?
  3. `... --player-experiment packed`: the same with the second controller's sticks.
  4. When nothing reacts: controller_id 2 or 0 and other marks (`marked:2`, `marked:1:2`, `marked:1:4`).
  Board result (13-10-2026, owner, PS4 Pro, a DualShock 4 v1 by cable and a v2 over Bluetooth on the board):
  announce, marked, packed, marked:2 and marked:1:2 changed nothing (no "Who is using this controller?", the second
  controller without effect). marked:1:4 made either controller work, never both: a PS press on one made it the
  active one after a short delay and the other inactive. So the console took the second sender's packets (first
  byte 0xa4/0x84) as the same, single controller; which stream it follows depends on the packets' sequence numbers
  (each sender counts its own) and the PS press. The console sent no controller number back: rumble's first byte
  was always 0 (both controllers rumbled because the app sends rumble to all), and a PS4 also sends a 7-byte pad
  info (00 00 00 40 01 00 00) at the start and after each PS press. Conclusion: no sign that a PS4 takes a second
  player over one Remote Play session; Asobi's "up to 4 players" is not explained anywhere public (perhaps PS5 or
  cloud only). Parked until a PS5 can be tried (protocol version 12); the experiment option stays for that.
- **Stream settings** (resolution, frame rate, bitrate by hand, a low-latency choice) and an **audio delay**
  setting: already on the list as stream settings; Console Link has 1080p/60 and gyro without a paid tier.
  Owner (13-10-2026): worth looking into. What the protocol takes: resolution 360p, 540p, 720p or 1080p (PS5 also
  higher), 30 or 60 fps, the bitrate, H.264 or HEVC. A low-latency mode would be the app's own: a shorter sound
  buffer (40 ms now), FFmpeg's low-delay decoding, no picture held back. Audio delay: the sound buffer's target
  moved by the chosen milliseconds.
  Built (13-10-2026, owner's decisions: per console, a Stream settings… dialog, the four settings and the picture's
  fit): see the console-link CHANGELOG. Board tests passed (13-10-2026, owner): the dialog; 720p/30 and a low
  bitrate against the default; Fill and Stretch full screen; an audio delay; low latency; the Game Mode shortcut
  streaming with a console's own settings.
- **Internet streaming** (PSN hole punching): on the list already (owner, 13-10-2026: good).
- **A release on Steam** (Steamworks: a fee per app and Valve's review): a Game Mode entry, Steam's updates and
  Steam Input without our shortcut; a large decision, more for a handheld version than for the board. Owner
  (13-10-2026): on hold until the handheld version.
- **Not recommended: PS Plus Premium cloud streaming.** It uses Sony's servers without Sony's consent; for an
  open-source app in a public repository a legal and takedown risk.
- Not worth it here: frame generation, 2D-to-3D, screen filters, upscaling to 4K.

The redesign of the window (owner, 13-10-2026): a first version from the owner's mock was built and taken back
out at the owner's request; the owner makes a new mock and the design changes in iterations from there. Kept from
the attempt, for then: the header's Controller box (opens the test, shows "DS4v1 OK" / "Fake DS4" / "Tested") and
a Settings box with a menu (Controller test…, Steam's PS button, Show personal details, the statistics folder, the
manual), a card per registered console, the log folded.

Console box (13-10-2026, owner's request): built; passed on the board (13-10-2026, owner): the box and its tooltip
with the PS4 Pro on and a game running (the running app's name and title ID from discovery). Not available from the console over the
network: disk size and free space.

History… (owner, 13-10-2026): built, see the console-link CHANGELOG. Open on the board (reinstall from the
checkout): stream a game a few minutes and open History…; whether the console answers the search during a stream
(the game's name and time show; nothing shows when it does not); a game switch during one stream; the Game Mode
shortcut's stream counted too.

Next, in the order discussed: the window redesign (the owner's new mock), and later DualSense/PS5 (when the hardware is there) and the portal on handhelds.

Nice to have, low priority (owner, 13-10-2026):
- Voice commands: dropped (owner, 13-10-2026: too much privacy involved). Kept for the record: on the board ("Start stream" starts the Console Link stream through Steam). Feasible: an offline
  recognizer (Vosk, a small model, a fixed phrase list, Dutch and English models) in a user service behind a wake
  phrase; "Start stream" runs the console's Steam shortcut (steam://rungameid/ with the appid we compute), so it
  works in Game Mode; also End stream, Mute, Full screen, Wake, Rest mode. Needs a microphone (USB, or a headset on
  a DualShock 4 by USB; none over Bluetooth); opt-in, shown while listening, all local; Vosk and its model in the
  Dependency Checker. When there is time (the microphone to the console is dropped; this reads it on the board only).

## Done

| Step | What | State |
|---|---|---|
| 1 | Repository: apps under `apps/`, root CI, LF everywhere, VERSION/LICENSE/.gitignore/CHANGELOG per app | done |
| 2 | `bc250_core` foundation: appinfo, theme, text, widgets, app, settings, help, updates (+ platform in step 3) | done |
| 3 | Portal (`portal/`), bazzite-test on core, release tooling (`tools/`), installer tests | done in code; board check open |

## Open

| Step | What | Gate |
|---|---|---|
| 3 | Board check | Install, open and uninstall the portal on a clean Bazzite account; a full passive bazzite-test run matches the original |
| 4 | Headless smoke tests for the five GUIs without tests (cu bisect/unlock, cores bisect/unlock, gpu-oc). Built (12-10-2026): tests/ in cu-bisect, cores-bisect and gpu-oc-bisect (options, the --auto unit, both unlock gates, every window offscreen with a fake script), in CI's pytest matrix | CI green |
| 5 | governor and helixsr onto core; per-app releases plus a portal release | Their test suites; install from the portal |
| 6 | Bisect family: `terminal`, `runner`, `dialogs`, `systemd` into core; shared `BisectLauncher` (cu, cores, gpu-oc stay three apps); unlock GUIs onto core; names in strings become placeholders; one translation pipeline (governor's JSON catalogue + helixsr's .qm writer) | `build.py --check` loses no translation; on the board: one process after starting cu with auto-resume |
| 7 | Shell: shared helpers in one `bisect-common.sh`, inlined into each script at build time with a drift check, plus a `flock` single-instance guard | Generated scripts differ only by the markers and the guard; one full bisect round per target on the board |
| 8 | Manual: MkDocs Material, one section per app, on GitHub Pages; in-app help links to it. Done (09-10-2026): READMEs moved into the manual (READMEs keep title, description, license), Bazzite purple theme with Inter, `.github/workflows/docs.yml`, apps' README links point to the manual, Bazzite Test shows its chapter (MANUAL.md). Open: owner switches Pages on (Source: GitHub Actions); portal cards link to their chapter | `mkdocs build --strict`; every pill links to its page |
| — | bios-reader: app built (parser, GUI, chip read, tests, installer, CI). Open: portal card in `portal/apps.toml` (`changes_board = false`) with a release (owner); try "Read BIOS chip" from the GUI on the board (pkexec path untested); dump the second board to confirm the stock fingerprints and the table hold for it; the owner decides whether the P5.00 table (screens and defaults taken from the AMI/AMD firmware) may ship. Next iteration: a description for every setting (many CBS help strings are "No help string") | Tests; on the board: values match the BIOS setup screen |
| — | ace-queues (async compute, option 1 of the owner's choice: Mesa only, patched RADV beside the system Mesa; option 2, the kernel half in a custom image, is a later iteration): app built (script, ACE queue test, GUI, tests, installer, CI, manual). The build ran once on the owner's board (Mesa 26.2.4, Fedora 44, ~9 min). Open: the portal/VERSION bump for the new card (owner; check_manifest needs at least a minor bump); a release (owner); a real logo and portal icon (placeholders now); on the board: install, run the test on 7.2.8-ogc5.1, then one game with async compute (e.g. Cyberpunk 2077) with the launch options, checking `dmesg` for ring timeouts, MangoHud frame times and `run.log`; whether Steam's pressure-vessel picks up VK_DRIVER_FILES under /usr/local (the per-game path relies on it); All apps on and a re-login (Desktop and Game Mode); a kernel update with All apps on, to see the boot check switch it off | Tests; on the board: test passes, one game runs with the patched driver and no ring timeouts |
| — | memory-manager (**BC-250 Memory Manager**, decided 10-10-2026, `changes_board = true`). Iteration 1 built (10-10-2026): the VRAM split in CMOS with our own code (`cmos.py`, root helper through pkexec; layout from fanoush/bc250_memcfg, confirmed on both boards from the CMOS reads of 10-10-2026, see docs/development/memory-manager.md), the memory figures without root (split, GTT, RAM, TTM limit, swap), apply, undo, Read CMOS, the after-reboot check; tests, installer, installer test, CI, portal card, manual. Open: the portal/VERSION bump for the new card (owner; check_manifest needs at least a minor bump over the pushed 0.8.0) and a release (owner); a real logo and portal icon (placeholders now); on the board: Read CMOS from the GUI (pkexec path untested), one split change and back (e.g. 6144 -> 4096 -> 6144) with a reboot each, checking the after-reboot message and that the block reads ABL again with the new UMA_SIZE (both boards showed ABL, which suggests the firmware rewrites the block at boot: to confirm). Next iterations: (2) TTM: `ttm.pages_limit` via `rpm-ostree kargs --replace/--append`; (3) swap: zram off (zram-generator override in /etc), Btrfs swapfile, `zswap.enabled=1` (replaces the `zswap.enabled=0` karg on the owner's board), swappiness; then the profiles Gaming (6 GiB split, zswap + swapfile) and AI/LLM (512 MB split, high pages_limit, larger swapfile), values tested on both boards | Tests; on the board: the split survives a reboot, undo restores it, the layout matches test 14 |
| — | hdmi-cec (**BC250 HDMI CEC**, tile **HDMI-CEC**, decided 11-10-2026, `changes_board = false`). Iteration 1 built (11-10-2026): adapter and TV status (cec-ctl, EDID), TV buttons through cec-ctl, the settings of Valve's cecd (Bazzite's native CEC mode) in `~/.config/cecd/config.d/99-bc250-hdmi-cec.toml`, a button for `ujust cec-mode native`, a key tester on cecd's D-Bus signal; Bazzite Test test 51; portal `short` field; tests, installer, installer test, CI, manual. Findings on the owner's board (11-10-2026): amdgpu's CEC adapter is on DP-1 through the UGreen DP-to-HDMI cable (physical address 1.0.0.0, Mi TV); with CEC off in the TV it acknowledged nothing, with CEC on it answers (power on, OSD name "Game", vendor 0x6d746b, topology TV 0.0.0.0 with the board at 1.0.0.0), so the UGreen cable wires CEC; Bazzite's CEC mode is disabled; no steamosctl. Open: the portal/VERSION bump for the new card (owner; check_manifest needs at least a minor bump) and the releases of hdmi-cec, bazzite-test (test 51), dependency-checker and the portal (owner); on the board: Turn TV on, Switch to BC-250, TV standby and the volume keys; native mode, the four cecd switches across a suspend and resume, and the key tester (cecd's object paths and the signal's argument types are read from its D-Bus XML, not yet seen live). Next iteration, after a reproduction: the black screen when the board starts before the TV (connector status, EDID size and journal while it happens, then `echo detect > /sys/class/drm/card1-DP-1/status`); if that brings the picture back, the app can do it when the TV announces itself over CEC; iteration 2 built (11-10-2026, released 0.1.0 had TV standby leave the owner with a black screen): "Picture after the TV was off" with three choices (leave it, 8 bits per colour, restart the picture through the watcher service), from four standby tests on the owner's board (12-bit stays black after a long standby until the signal changes; 8-bit comes back by itself; Ctrl+Alt+F1 did not help, it only coincided with a script step). Iteration 3 built (11-10-2026, owner's pick from the feature list): TV info…, name on the TV, Remote buttons… (cecd mappings), pause videos and music while the TV is off (watcher --pause-media). Open: a release (owner); on the board: native mode, then Remote buttons… (e.g. red = F12) and the key tester, Set name (the TV's input list), pause with a playing video across a standby; each picture choice across a 3-minute standby woken by the remote, the watcher's journal line, and whether the black screen when the board starts before the TV is the same problem (it should be: the watcher sees the TV come on); iteration 4 built (11-10-2026, owner: the apps must not be limited to the owner's TV or hardware): TV info decodes CEC 2.0 answers (features, volume, lip-sync, receiver name and volume), Remote buttons… offers all 74 cecd buttons, the picture note follows the current mode's estimated signal speed, the adapter that sees a display is used when there are several, the watcher configures with the user's name. Open: the CEC 2.0 decoding is tested on made-up replies only; the owner's second TV (a newer Xiaomi) is CEC 1.4 too (11-10-2026), so a CEC 2.0 TV is still to be found; the input named "HDMI1: Playback" on the TV (adapter configured by a plain cec-ctl --playback) is fixed in the working tree: the app and watcher rename an adapter with another name (Set name in the released 0.1.1 renamed it on the owner's TV, 11-10-2026); whether CEC 2.0 TVs should get more buttons (an exact volume slider when the TV or receiver reports has-set-audio-volume-level) is the owner's call | Tests; on the board: the TV answers, Turn TV on and TV standby work, cecd wakes the TV after a resume |
| — | Portal: **App icons on the Desktop** switch (decided 11-10-2026 by the owner: one portal icon is enough, the apps' Desktop icons are the user's choice, with an on/off switch). Built: desktop_icons.py, the switch in the header, a one-time question at the first start when app icons are there, removal at start and after each install while off; app installers unchanged. Open: a portal release (owner); on the board: the question on the first start with the existing icons, both answers, switching on and off, an install with the switch off, KDE starting a re-added icon without asking | Tests (tmp Desktop and menu folders) |
| — | Portal compact design (11-10-2026, from the owner's mock): tiles with short name, icon (open, hover text, grey when not installed, red update dot), "changes the board" under the icon, symbol buttons (Install/Uninstall; Reinstall only for Bazzite Test); a "Development only" section with demo-tool and dependency-checker (`development = true`, `.standalone` removed) and, from a checkout, suite-releases (`[checkout.suite-releases]`). Built in code. Released in portal-v0.9.5 (11-10-2026), with governor-v0.1.1 and cores-bisect-v0.1.1 (their new icons) and the pinned demo-tool and dependency-checker. Open, on the board: the tiles in the desktop's own (dark) colours (the symbols, hover and update dot follow the palette; only seen offscreen in light colours so far), open/install/uninstall from a tile, the Development section from a release and from a checkout | Tests; on the board: every tile opens, installs and uninstalls its app |
| — | Consistent architecture (decided 12-10-2026 by the owner; rule in CLAUDE.md, chapter docs/development/architecture.md). Done: every app's package and images/ at its root (dependency-checker and demo-tool moved), the 96 px header in every window (core's AppHeader for the apps on core; the bisect GUIs, both unlock GUIs, demo-tool and Installer Tests in their own code), an installer test for every app. Done since (12-10-2026, owner: everything must follow the architecture, except the portal's own 56 px compact header, which stays): cu-bisect has a root install.sh (it runs the two packaging/bazzite installers, which stay); every installer takes --no-desktop-shortcut, --uninstall, --uninstall --purge and --help and refuses root (governor, helixsr, demo-tool, suite-releases, Installer Tests and the cu-bisect GUI installers brought in line); the three bisect apps have tests/. tools/tests/test_layout.py checks all of it. Left: portal/apps.toml still runs cu-bisect's packaging/bazzite scripts, because the pinned cu-bisect-v0.1.1 has no install.sh; switch its install and uninstall to bash install.sh and bash install.sh --uninstall when the next cu-bisect release is pinned (owner); governor and helixsr keep their own widgets instead of core's (step 5). Releases of every app whose window changed (owner) | tools/tests/test_layout.py, test_installer_tests.py; on the board: each window opens with the new header |
| — | console-link (**BC250 Console Link**, tile **Console Link**; until 13-10-2026 remote-play, **BC250 Remote Play**, renamed by the owner so the name does not overlap with the console maker's product: the installer and the app move the old settings and registered consoles to ~/.config/bc250-console-link and remove the old program files; open, the owner's: the portal minor bump for the renamed entry, the first release under the new name (apps.toml pins console-link-v0.1.2 with an empty checksum), and on the board, installing it over BC250 Remote Play keeps the PS4's registration; decided 12-10-2026 by the owner: a PS4/PS5 Remote Play client of our own, Python and Qt with a native core of our own in **Rust + PyO3**; license **AGPL-3.0**, so the reference's protocol code and key tables may be used; iteration 1 is a prototype with a `development = true` tile; `changes_board = false`; end goal (owner, 12-10-2026): a regular tile of the portal, out of Development only, once the stream works). Iteration 1 built (12-10-2026): discovery (broadcast and one address), wake-up, registration with its crypto, the session request (with the reference's RP-Version retry) and the control connection (heartbeats, session ID, login passcode, rest mode), all in Python; the key tables generated from the reference's lib/src/rpcrypt.c (commit c8bea2642d0e), and the crypto checked against vectors printed by the reference's own C code (tests/rpcrypt_vectors.json); the consoles' keys in ~/.config/bc250-remote-play/consoles.json (0600); the app's own venv (PyQt6, cryptography); tests against a fake console on localhost, installer, installer test, CI, portal card, catalogue, manual. Licensing note: the reference is AGPL-3.0-**only** (with an OpenSSL exception), so the ported files are AGPL-3.0-only and the app's own files AGPL-3.0-or-later; LICENSE is the reference's COPYING (AGPL text plus the exception). Open: the portal/VERSION bump for the new card (owner; check_manifest needs at least a minor bump) and a release (owner); on the board, with a PS5 and a PS4 if there is one: Search (and Search at address), Register (PIN from Link Device), Test session, Wake from rest mode, Rest mode, a PSN account with a login passcode; record the consoles' discovery answers as test fixtures (the current ones are written to the reference's format, not recorded). Iteration 2, the stream in the native core (owner: start 12-10-2026; Rust 1.99 through rustup on the owner's board, maturin in the dev venv). Built so far (12-10-2026): the crate in apps/remote-play/native (PyO3, abi3 wheel for Python 3.10+, module bc250_remote_play_core): gkcrypt (key stream, GMAC with its key refresh), ECDH on secp256k1 with the signed public key, Takion packets (GMAC placement, key position state, INIT/INIT_ACK/COOKIE, DATA and DATA_ACK, the A/V headers of versions 7, 9 and 12, congestion), all equal to vectors from the reference's own C code (tests/takion_vectors.json, used by cargo test and pytest); CI job `native` (cargo test, clippy -D warnings, wheel, Python tests); stage_app skips cargo's target/. Then (12-10-2026): the live Takion connection in the native core (handshake with retries, GMAC checks, reorder queues for data and video, acknowledgements, resends, video and audio held until the keys and decrypted), and in Python the stream connection (tkproto.py by hand, no protobuf dependency; launchspec.py; stream.py: BIG, BANG, the stream keys, STREAMINFO, acknowledgement, controller and microphone messages, heartbeats, DISCONNECT), equal to vectors from the reference's code and nanopb (tests/stream_vectors.json), and tested against a fake console (tests/fake_stream.py); button **Test stream** (5 s, counts frames and audio packets; shows nothing yet); install.sh builds the native core when cargo is installed (pip with maturin, temporary build folder) and notes it when not. Findings: the reference does not check the console's ECDH signature (Test stream notes whether it matches); its v9/v12 audio parser reads past the header when the nalu bit is set (the port refuses such packets); its reorder queue's drop leaves the freed entry in place (the port empties the slot); an acknowledgement before the keys waits up to 100 ms for set_crypt, so BANG's is signed as in the reference. Board results (12-10-2026, the owner's PS4, Remote Play 10.0, reported as PS4 Pro): Wake from rest mode works (13-10-2026, with the console set to stay connected to the internet in rest mode); Find my account ID, Register, Test session and Test stream work (STREAMINFO 1280×720, stereo 48 kHz; 291 frames, 632 video and 499 audio packets in 5 s; the console's key signature checks out, so the PS4 signs as the reference does). Its session ID message was the length byte 16 and the text InvalidSessionId (decryption right: the server type, PS4 Pro, decrypts correctly too); the made-up ID, as the reference's, is accepted by the console. Open: whether a PS4 sends a real ID in other cases (signed in to PSN, another firmware). The PS4 lists no registered devices: Settings > Remote Play Connection Settings > Connection History lists the connections (date, account, Nearby, device PC) and the OPTIONS button clears all entries at once (not one by one); clearing it keeps the registration (Test session worked right after, 13-10-2026), so on a PS4 the board stays registered until the console's settings are reset. Still open on the board: Test stream with a PS5; whether the console accepts the unsigned key positions before BANG and our key position sequence; install.sh's build of the native core on the board (Rust through rustup). Senkusha built (13-10-2026): the network test before the stream (senkusha.py, version 7 on UDP 9297: round trip, MTU in and out), its results in the launch spec, the reference's fallback when it fails; tested against a fake console with MTU limits; board result (13-10-2026, the owner's PS4 Pro): MTU 1454 in and out, round trip 0.34 ms, 10 of 10 pings answered. Frames built (13-10-2026): FEC (Cauchy Reed-Solomon as in Jerasure, written from its definition, checked against frames recorded by the reference, tests/fec_vectors.json), the frame processor, the video receiver with its CORRUPTFRAME reports, and the congestion reports every 200 ms, all in the native core; Test stream counts whole frames, frames rebuilt with FEC and lost ones; board result (13-10-2026, the owner's PS4 Pro, 720p): 287 frames in 5 s, none rebuilt or lost, 24 congestion reports and the stream ran to the end, so the console takes them; video 0.3 Mbit/s with the home screen still (open: the bitrate with moving images, and whether the frames decode, which needs the decoder). Video decoder built (13-10-2026; owner's decision 13-10-2026: FFmpeg bundled in the wheel CI builds): FFmpeg 7.1.2 from pinned sources (native/ffmpeg/build.sh, LGPL only, static; libva the system's), the cargo feature decoder, the release wheel in native/wheel built by release.yml and required by build_release.py, install.sh installing it; finding: the BC-250 has no hardware video decoder (Cyan Skillfish, no VCN; VA-API does not initialise), so the board decodes in software: one thread with assembly 3.6 ms per 720p H.264 frame, 6.6 ms at 1080p, 13.9 ms for 1080p HEVC; H.264 from a PS5 too (owner, 13-10-2026); decoder threads later if 1080p needs them (frame threads add a frame of latency each). Open: the first release with the wheel (owner), Test stream on the board with the release's wheel (frames decoded, time per frame), LGPL: the tarball carries build.sh with FFmpeg's source URL and checksum and its license text, not FFmpeg's sources (owner: enough, or attach the source tarball to the release). The picture on screen built (13-10-2026): button Stream, a window with the QOpenGL view (YUV to RGB in a shader, tested by drawing offscreen on the board's GPU) until it closes; board result (13-10-2026, the owner's PS4 Pro, installed from the checkout): the picture shows; 121 s, 7226 frames (59.7 per second), none rebuilt, lost or refused, all decoded in software at 3.1 ms per frame (720p H.264), 603 congestion reports; video 0.1 Mbit/s with the home screen still; with a game playing (66 s): 3921 frames (59.4 per second), none rebuilt or lost, 6.3 Mbit/s of video (10 asked for), 6.2 ms per frame for decoding and copying the picture out (one thread); a PS4 Pro asks for 1080p since 13-10-2026 (owner; jobs.stream_profile): open on the board, Stream with a game at 1080p (frames per second, ms per frame); open: 1080p from a PS5 in software, where HEVC takes about twice H.264's time (decided 13-10-2026 by the owner: H.264 from a PS5 too, jobs.STREAM_CODEC; decoder threads only if 1080p does not keep up). Sound built (13-10-2026): the audio receiver (FEC copies taken first, a deliberate difference), FFmpeg's Opus decoder (with libswresample) instead of libopus, lost frames as silence, a short buffer to Qt Multimedia's QAudioSink on the default output, M mutes; board result (13-10-2026, the owner's PS4 Pro at 1080p, installed from the checkout): sound good (more games to try), in step; 106 s, 6333 frames, none lost, 10585 sound frames, none lost, 4.6 to 5.0 ms per frame decoding 1080p H.264 in software; the PS4 shows "Remote Play has paused" with a stop sign: the board sends no controller state yet, which the reference sends at least every 200 ms (feedbacksender.c), so that comes first with the controller; a stream right after Wake ended after about 19 s with the console's "Server shutting down" (to watch: once more after a wake-up, with the controller state). Idea (owner, 13-10-2026), not planned yet: a pre-test before playing that measures whether the network and the board are good enough (bandwidth, loss, round trip, decoding time), so players are not disappointed. Controller state built (13-10-2026): feedback.rs, the reference's feedback sender in the native core (FEEDBACK_STATE at least every 200 ms, idle until set; FEEDBACK_HISTORY for buttons, triggers and touches with the repeats after 20, 50, 100 and 200 ms), equal to vectors from the reference's own C code (tests/feedback_vectors.json), on its own thread from start_stream; Takion.set_controller_state for the input to come. Open on the board: Stream with the PS4 Pro, whether "Remote Play has paused" is gone, and the log's count of controller states (about 5 per second); once more right after Wake, to see whether "Server shutting down" after about 19 s still comes. Board result (13-10-2026, the owner's PS4 Pro, after Wake): the controller states go out (143 in 28 s, 157 in 31 s: 5 per second), no frames or sound lost, 4.7 to 5.2 ms per 1080p frame; both streams ended with "Server shutting down" (after about 28 and 31 s); the owner pressed PS on the DualShock 4 paired with the PS4 ("Who is using this controller?", the user select screen, then a black screen in the stream), since the board sends no buttons yet. Then (13-10-2026, same console, the PS4's controller not used): "Remote Play has paused" is gone and the stream keeps going; 51 s until the window was closed, 3047 frames and 5101 sound frames, none lost, 255 controller states, 4.2 ms per frame, no "Server shutting down". So the console's own controller, signing a user in locally, is the likely cause of that ending (to confirm with a longer stream). Controller input built (13-10-2026): gamepad.py, SDL3 (the system's, Bazzite includes 3.4) through ctypes, a reader thread every 4 ms during Stream: buttons (PS too), sticks, L2/R2, touchpad and its click, as the reference maps them; several controllers combined; the fingers scaled to the console's touchpad (a deliberate difference); SDL3 in the Dependency Checker (optional). SDL3 opened the owner's DualShock 4 on USB here ("PS4 Controller"). A controller plugged in by USB during the stream (one that was paired with the PS4) was picked up at once and played (13-10-2026, owner); its PS button brought up Steam's window as well (see below). Board results (13-10-2026, the owner's PS4 Pro, two DualShock 4s, one on USB, one over Bluetooth with the board): both connect and play (174 s, 1834 states and 456 button packets, nothing lost); the owner reported L1, R1, the right stick and the touchpad without effect. A capture on the board of SDL's readings and the state handed to the stream showed all four read and mapped right (L1 256, R1 512, the right stick over its whole range, fingers and the touchpad click on both controllers; SDL through HIDAPI on hidraw, the PS4 mapping, one touchpad), and the packets match the reference's vectors. Then (13-10-2026, owner): every button works, the touchpad, the right stick, L1 and R2 too, tried with the on-screen keyboard of the PS4's web browser search bar, which uses most controls (a good test for later changes); the home screen had used none of the four. The PS button also brings up Steam's window (13-10-2026, owner): Steam reads the controllers too. The manual says to switch off Steam's Guide Button Focus Steam (Settings > Controller > Show Advanced Settings, near the bottom), confirmed on the board by the owner (13-10-2026): off, the PS button no longer brings up Steam. Built since (owner: control it from the app): the checkbox Steam comes to the front on the PS button, which changes Controller_CheckGuideButton in Steam's localconfig.vdf with a Steam restart; open on the board: switch it on and off from the app with Steam running (Steam closes and comes back, the PS button follows). In Game Mode Steam keeps the PS button for its menu: with the Game Mode shortcuts, a way to send PS to the console (a button combination, for example). Motion built (13-10-2026): orientation.rs (the reference's orientation.c, bit-equal to its vectors, tests/orientation_vectors.json), OrientationTracker in Python, the sensors' samples as SDL events with the controller's clock, one tracker per controller; on the board SDL3 gave about 156 samples per second per sensor from a DualShock 4 on USB. Open on the board: a game that uses tilt (aiming or steering by motion), and the orientation the console shows. Rumble and the light bar built (13-10-2026): rumble (data type 7) and pad info (data type 9: light bar colour, player number, motion reset) from the console to the controllers through SDL; SDL accepted a rumble and a colour on the owner's DualShock 4 here. Open on the board: a game that rumbles, the light bar's colour during a stream (a PS4 game that sets it), and a motion reset (a game's recentre). Later, with a DualSense to try: its adaptive triggers (data type 11, the reference sends them as a DualSense effect report through SDL) and the rumble a PS5 sends as haptic sound (the reference turns it into rumble for other controllers). Next in iteration 2: with the decoder, the reference's look into the bitstream (a missing reference frame swapped for an older one, a key frame asked for after a failed FEC). Account ID through the PlayStation sign-in built (12-10-2026, owner's request): **Find my account ID…** opens the sign-in in the browser and takes the pasted redirect address (no WebEngine); open: try it on the board with the owner's account. Board result (13-10-2026, owner): every button, stick, trigger and the touchpad work in the controller test; the rumble was not felt on one controller; then (13-10-2026) the other DualShock 4 rumbled by USB and Bluetooth, with Steam running and closed: the first controller's motor is faulty, not the app or Steam (suspected first, wrongly). The test window says whether the rumble was sent and suggests another controller. Find my account ID works with the clipboard; the PlayStation sign-in's QR code is turned down by the PlayStation App, entering the code under it works (Sony's page, a tip in the manual; the browser tab cannot be closed or minimised from the app). Controller test built (13-10-2026, owner's request): live inputs, motors, light bar, controller details, and genuine.py, the check whether a Sony controller answers like a genuine one (firmware information and calibration in the kernel driver's layouts; the owner's DualShock 4 passes). Open: a copy to see what it answers (the check is built from genuine answers only; owner: as soon as the owner has one); a DualSense on the board (its layouts are the kernel's, untested here); the window on the board. Research, not started: the proof a console uses, its challenge signed by the controller with Sony's key (feature reports 0xF0 to 0xF2), whether it can be checked without the console and what checking it would mean legally. Account ID (owner, 13-10-2026: grab it without the redirect page if that is no privacy issue): fully automatic needs a browser inside the app, where the user would type the PSN password, which is against the advice for apps (RFC 8252) and a large dependency, so not done; built instead: the dialog takes the redirect address from the clipboard as soon as it is copied. Privacy built (13-10-2026), as below: privacy.py, the window masked with Show personal details, the log copied masked, the manual's Privacy section; open: a look at the window on the board. Asked for by the owner (13-10-2026): Mask the PSN account ID and the consoles' IP addresses in the window and in the log, and add a privacy note to the manual (what the app keeps, where, and what it sends to whom). Where they show now: the account ID field (main_window.py, kept in the settings) and the message after Find my account ID (jobs.psn_account, with the online ID); the address in Search at address (field and settings), the console table's address column, and the messages that fall back to the address when a console has no nickname (jobs: register, wake, sessions, streams, "No console answered at ..."). Decided by the owner (13-10-2026): only the last digits stay visible (of the account ID and of the address); a show/hide control in the window reveals the real values; the PSN online ID is masked too, with the same show/hide; a log copied for a report is always masked, even while the window shows the values. Ideas from a comparison of Remote Play clients on Bazzite (owner, 13-10-2026: test and take over what is better): a Steam shortcut for Game Mode made by the app, with artwork and the controller set up (the reference's main strength on Bazzite); stream settings in the app (resolution, frame rate, bitrate by hand instead of the fixed presets); HEVC and HDR (HEVC decodes in about twice H.264's time in software on the BC-250, which has no video decoder, and HDR needs 10-bit HEVC and an HDR picture path: to measure before promising); streaming over the internet (PSN hole punching, below); the account ID through PlayStation's own sign-in, as the app has it, is more private than the third-party lookup sites some guides send people to. Genuine or fake (owner, 13-10-2026): a controller that fails the check is shown as "Fake DS4", faulty or not; built in the controller test (Genuine DS4v1, Genuine DS4v2, Fake DS4); the redesign's pill takes the same labels. No fake is tested in the app; one on the owner's board later, for knowledge. DualSense and PS5 (owner, 13-10-2026: wait for the hardware): done without it, the DualSense through SDL (buttons, touchpad, motion, rumble, light bar), its genuine check in the kernel driver's layout, the PS5 protocol against vectors; with the hardware: registration, session and stream with a PS5, the DualSense in the controller test, its adaptive triggers and the haptics a PS5 sends as sound. Future release (owner, 13-10-2026): the portal adapted to handhelds running Bazzite (a lot of potential): which apps make sense there (Console Link, the Dependency Checker; not the BC-250 board tools, nor Bazzite Test as the always-installed app; owner, 13-10-2026: also SFTP Tools, System Overlay, BIOS Reader and HDMI-CEC with tweaks. From their code: SFTP Tools has nothing board-specific (layout for 1280×800, the on-screen keyboard in Game Mode); System Overlay reads standard sensors and shows "—" for missing ones, but its GPU load comes from the governor's patched gpu_metrics (a handheld's gpu_busy_percent instead), the battery would be new, and Game Mode is the main tweak (the overlay in gamescope, see Known issues; Steam's own performance overlay is the competition); HDMI-CEC fits docked handhelds (Valve's cecd comes from SteamOS for the Deck's dock): the dock's adapter instead of the BC-250's DP AUX one, the OSD name from the device instead of BC-250, and many USB-C docks pass no CEC; BIOS Reader is the most work: it is built around the BC-250's BIOS (P5.00 forms, flashrom on the chip), handheld firmware differs per device and its chip is often locked, so a handheld version would read the settings from UEFI variables, per device), the portal's layout on a small screen and with a controller, and a handheld to test on (candidates in the conversation of 13-10-2026: a Steam Deck for the largest user base, an ROG Ally X for a well-supported non-Valve handheld; check Bazzite's list of supported devices when choosing). Handhelds running Bazzite (owner, 13-10-2026: to grow the user base): the app runs on x86-64 handhelds (Steam Deck, ROG Ally, Legion Go) as it is, and they have a video decoder (VA-API, used already: HEVC from a PS5 becomes practical); their own controls come as Steam's virtual controller in Game Mode (kept when alone); to decide: how it reaches them without the BC-250 portal (which always installs Bazzite Test): its own installer, a Flatpak, or a portal without the board tools; the codec chosen by what the device decodes instead of H.264 always; the small screen (the redesign); a handheld to test on. Redesign of the window (owner, 13-10-2026: it is getting cramped and busy; not now): among others, the controller test as a status pill in the header instead of a button in the window, opening the test, showing "Not tested", the result with the model ("DS4v2 OK", "DS4v1 OK") or a failed genuine check (owner's wording "Fake DS4"; the check is not a proof, so perhaps "DS4v2: copy?" with the details in the tooltip; the owner's call). Idea (owner, 13-10-2026: voice commands): the microphone in the stream (the reference's audio sender: the board's or a headset's microphone, Opus-encoded, sent with the stream; the app announces a microphone but sends none yet; the bundled FFmpeg has the Opus decoder only, an encoder is needed), for party and game chat; to test then whether the console's voice commands (PS4 Voice Operation, PS5 Voice Command preview) listen to it. Board result (13-10-2026): Add to Game Mode closed Steam and then gave up after 30 s ("Steam did not close"), leaving Steam closed and nothing written: the app's own finished steam -shutdown was a zombie named steam, counted as Steam running. Fixed (zombies ignored, the commands collected); open: Add to Game Mode again, with Steam closed and with Steam running. Then (13-10-2026): the shortcut is in Steam (Non-Steam) and starts the stream; sound but no picture: Steam's LD_LIBRARY_PATH mixed the system's Qt into the app's ("EGL not available"); fixed (steam_env.py: the app starts again without it; X11 in Game Mode); still no picture (13-10-2026): Steam's overlay library preloaded into the shortcut breaks OpenGL too (reproduced with its environment), now left as well. Open: the shortcut again after reinstalling the app from the checkout, on the desktop and in Game Mode; the owner's own pictures for the shortcut (images/steam/: portrait.png 2:3 600×900 or 1200×1800, wide.png 920×430, hero.png up to 3840×1240, logo.png transparent up to 1280×720; owner: the console's name over them, built: on the portrait and wide one, the banner gets it from the logo image). Then (13-10-2026, owner): picture and sound from the shortcut, from Steam on the desktop and in Big Picture (started straight from Steam: the picture at once; started while the app was open: the window behind Big Picture, getting to it and away from it guesswork); the window now asks to come to the front and names the keys. Open: what the owner found awkward in navigating (Big Picture behind the stream reacting to the controller too?); a way to end the stream from the controller (a button combination, the owner's call); the test in Game Mode itself, which is the target (Big Picture on the desktop is not Game Mode). Game Mode built (13-10-2026, owner's choice to start with it): Add to Game Mode (a Steam shortcut per console with the app's own artwork, written with Steam closed), the direct start --stream CONSOLE (wake, wait, stream full screen), the real controller read in Game Mode and Steam's virtual one left out. The shortcut's format is written from Steam's known layout; this Steam had no shortcuts.vdf to compare with. Open on the board: install the app through the portal (the shortcut runs its launcher), Add to Game Mode, Steam back up with the shortcut and its artwork, then in Game Mode: the shortcut wakes the console and streams; every control in the browser search bar test, touchpad and motion included (the real controller read under Steam); Exit game ends it. Next for Game Mode: a way to send the PS button (Steam keeps it there: a button combination, the owner's call); removing a console's shortcut with Remove. Later, the owner's call: Remote Play over the internet (PSN hole punching). Future iteration (owner, 12-10-2026): an implementation of our own without the reference's code, worked out from the protocol itself, for the knowledge it brings; the current port, its vectors from the reference's code and the fake consoles stay the reference to test it against | Tests (crypto equal to the reference's); on the board: Test session reaches the session ID with a PS5 |
| — | mesh-shaders (**BC-250 Mesh Shaders**, decided 13-10-2026 by the owner: a new app, not part of the HelixSR Manager; `changes_board = true`; under Gaming, as is helixsr now, owner 13-10-2026). Built (13-10-2026): RADV with DirectMesh v1.3.1 (lonewolf0622/bc250meshtaskwork, MIT; its release patch bundled in mesa/, pinned with the release's SHA-256) on the signed Mesa 26.2.1 in a Fedora container, beside the system Mesa; per-game launch options only (no all-apps switch); the test is its own (owner: no copy of ace-queues' test): the mesh draws with the compute queues DirectMesh opens busy beside them; Switches… for the driver's comparison variables. Checked before building: the patch applies cleanly to signed 26.2.1 and RADV builds (820 steps, Fedora 44); the mesh test passes on lavapipe and catches one wrong tile. Not applied to 26.2.4 (the system Mesa): 4 hunks fail (radv_cmd_buffer.c twice, radv_pipeline_cache.c, radv_pipeline_graphics.c), one (nir_opt_uub.c) is already upstream; the developer offered to update it. The owner's icons are in (13-10-2026), so the releases can go ahead (mesh-shaders, and the portal with the two Gaming moves). Open: nothing has run on the GPU yet (build, install and test from the app on the board, then a mesh shader game); the portal minor bump for the new card and a mesh-shaders release (owner; check_manifest --base asks for it); a dependency-checker release for its catalogue; ask the developer whether the compute queues his patch opens have shown hangs on a stock kernel (his comment says they need a patched kernel). | Its tests and installer test; on the board: the app's test passes, then a mesh shader game |

## Known issues to fix

- **Withdrawing a release (owner, 13-10-2026), every app and the portal:** a way to take back a release when it turns
  out to have a privacy, security or any other problem that makes that necessary. Decided by the owner (13-10-2026): on GitHub the
  release stays and is marked withdrawn; in `portal/apps.toml` the app's entry is marked withdrawn too; a new
  portal release then removes the app from boards that have it, where it can; the board shows the app as "App not
  available"; Suite Releases gets a test scenario that tests a withdrawal. Built (13-10-2026): `withdrawn =
  "<reason>"` in apps.toml (manifest.py, check_manifest: at least a minor portal bump), the portal's tile ("App not
  available", no install or open) and its removal at start with the app's uninstaller, the update button naming
  withdrawals, Suite Releases' tab 3. Withdraw (Withdraw, Take back, Test withdrawal, the gh command for the
  GitHub mark), the manual (portal.md, Withdrawing a release). Open: the field's line in the comment at the top of apps.toml, with the next portal release (any change to apps.toml needs a portal bump; the field is described in manifest.py and portal.md meanwhile); Test withdrawal on the board (an app installed,
  withdrawn in the checkout, the portal removing it); a portal release (owner); a withdrawn portal release itself
  (not covered: a portal cannot remove itself; to decide when needed).

- **bazzite-test score drop, fixed in the engine (09-10-2026), board check open:** with a runtime CU unlock active,
  run only the benchmark (test 42). Its log should show "CU count from the live WGP masks (umr)" and the
  Configuration line the unlocked count, and the Extended score should keep its CU factor.
- **No release tagged yet (09-10-2026):** the portal and all eight apps are at 0.1.0 with no tags, so the first tags
  release everything as it is on main (c7646ce, CI green); no version bumps are needed before that.
- **Copies of bc250_core.instance** in helixsr, the cu/cores bisect and unlock GUIs, gpu-oc-bisect and
  persistent-acpi (MIT: the owner's own code, copied under MIT there); fold them into core in step 6.
- **Governor performance mode runs hot (09-10-2026), owner tests on the board first:** no app controls the fan
  (it follows the BIOS/SuperIO curve or runs at full speed off the PSU), and the Governor's alerts (GPU 80 °C,
  throttling) only work while the app runs, watch only the GPU and only notify. To collect: GPU and CPU
  temperatures and fan RPM with performance mode on, how the fan is connected, and the warn/throttle/shutdown limits
  wanted. Proposal: a background guard that warns, turns performance mode off, and shuts down cleanly at a critical
  limit (new app or part of the Governor: owner decides).
- **Later: system overlay in Game Mode.** gamescope only composites the focused game, Steam and windows with the
  X11 property `GAMESCOPE_EXTERNAL_OVERLAY` (how mangoapp shows MangoHud). Possible route: set that property on
  the overlay's XWayland window. Open: how to start it inside the gamescope session (check how Bazzite starts
  mangoapp), no mouse input there (position and rows from the Desktop-mode settings), and it relies on a gamescope
  internal.
- **Segfault at exit (12-10-2026), cause open:** on Python 3.14.7 with PyQt6 6.11, run offscreen and stopped with
  SIGTERM, sftp-tools, memory-manager and governor crash during interpreter shutdown, in PyQt6's `cleanup_on_exit`
  (`sip_api_get_address` on an invalid wrapper); hdmi-cec and bazzite-test did not. It depends on how many widgets
  exist, so it looks like PyQt6/sip on Python 3.14, not one app. To check: a normal window close on a real desktop,
  `coredumpctl`, other PyQt6 or Python versions. Deleting the window and the instance server before exit did not help.

## Candidates for new apps

Investigated 14-10-2026 from the owner's list; nothing decided or built. Which one to build is the owner's call.
Anything chosen is a portal tile like every other app (installed through the portal, not a `ujust` command, which is
Bazzite's).

- **PS4 emulator manager (recommended first).** Installs a pinned, checksummed release of an open-source PS4
  emulator (Flathub or AppImage, not a nightly that can break without notice), writes presets for the BC-250
  (Vulkan through RADV on Cyan Skillfish/gfx1013, frame caps; the 16 GB GDDR6 is shared between CPU and GPU, so the
  split from memory-manager matters), and adds games from a chosen folder to Steam as Non-Steam shortcuts for Game
  Mode. Gaming section, `changes_board = false`. The emulator needs system modules dumped from the user's own PS4:
  the app cannot ship or download them, only point to the folder and check it. Steam shortcuts: Console Link's
  `steam_shortcuts.py` already writes them (with its tests); moving it into `bc250_core` would serve both (moving
  code: prove it unchanged). Game compatibility is the emulator's, the manual says so. Logic to take from the
  owner's Windows launcher Nexus (GPL-3.0, the owner's own, read 14-10-2026): the game scan (`eboot.bin` found
  recursively, the parent folder's name as the title without a leading `[PS4]`, paths already known skipped; better
  here: the title and title ID from `sce_sys/param.sfo` beside it, the title ID as the Steam shortcut's stable key);
  the launch line `-f true -g "<eboot.bin>"` (fullscreen, then the game; the options changed between versions, so
  check them against the pinned release); two launch entries, a game and the emulator's own settings window with
  no game; config changes as single keys in the emulator's own file, the rest kept (with a backup and undo, like
  the governor's profiles). Not taken from Nexus: window and monitor handling (KWin and gamescope do it), play
  time (Steam counts it), the controller tester (Console Link's is further), the Windows audio and process tools.
- **Save backup from a PS4 (small, fits SFTP Tools).** A scheduled pull of save files from the user's own console
  over FTP into a folder on the board. Better as an FTP source and a timer in SFTP Tools than as a new app. Not
  taken: receiving, checking and sorting game dumps (PKG files), which works with decrypted game images, legally
  unclear in most countries, for little board-specific value.
- **Streaming host resolution switch (later, narrowed).** Bazzite already ships Sunshine (`ujust setup-sunshine`),
  so no setup app. What would be ours: Sunshine's prep and undo commands that set the board's output to the
  connecting client's resolution (1280×800, 1080p60, ...), on KDE (`kscreen-doctor`) and in gamescope, worth it only
  if the BC-250's display modes need care. Controller passthrough over the stream: gyro and touchpad exist,
  adaptive triggers to check before promising them.
- **Controller Bluetooth helper (not taken).** The BC-250 has no Bluetooth: it depends on the user's USB adapter,
  not the board. Haptics and the touchpad in Game Mode come from the kernel driver and Steam Input, disconnects
  from BlueZ, the kernel or the adapter's firmware, all Bazzite's scope. At most, the Dependency Checker or
  bazzite-test could report the adapter and its driver.
- **Exploit host and DNS redirect for a PS4 (not taken).** Serving console exploits and intercepting a console's
  traffic is a takedown and reputation risk for a public repository of careful, reversible board tools, and has
  nothing to do with the BC-250.
- **Console registration and Game Mode shortcuts (already built).** Console Link registers consoles, streams and
  adds Game Mode shortcuts; gaps go into Console Link.

## Details for later steps

From the original proposal (not in the repository).

**Step 5:** governor's update checker tracks the *upstream* `cyan-skillfish-governor` releases; helixsr checks
itself and the HelixSR payload. Core supplies the mechanism (`bc250_core.updates`); what is checked stays in each
app. Settings files must not move: governor and helixsr use `QSettings(APP_ID, APP_ID)` (`settings_org`/
`settings_app` default to the app id). Translations: moving strings into core changes their Qt context; governor's
`tools/i18n/build.py` already copies base-class contexts into subclasses, which is the mechanism to keep them.

**Step 6, cu-bisect:** these come from reading the code; the current release behaves well on two boards, so check
each on hardware rather than assume a failure.
- `bc250_bisect_gui/service.py` → `install()` runs `systemctl --user enable --now bc250-cu-bisect-auto.service`,
  and the GUI then also starts the run in a terminal. With `--auto` plus auto-resume that may start **two
  concurrent runs** on the same state dir (umr register writes, possible double reboot). The cores copy
  deliberately uses `enable` without `--now`; take that, and add a `flock -n` guard in step 7. Hardware check: tick
  `--auto` and auto-resume, start, then `systemctl --user status bc250-cu-bisect-auto` and `pgrep -fa cu-bisect`
  within 30 s.
- The unit passes only `-t` and `-r`, so `--no-watch` is lost on resume: build it from `opts.to_args()` like cores.
- `hint_label` (`main_window.py`) is created but never filled.
- The baseline combo matches the English label `"Custom..."`: use `itemData`, like cores.
- `_on_auto_toggled` ticks the auto-resume box but never unticks it.
- `HelpDialog` (all three bisect apps) runs `bash script --help` synchronously with a 10 s timeout and can freeze
  the window: make it an async QProcess.

**Step 6, shared code:** `terminal.py` is identical in the three bisect apps (now `bc250_core.platform`); the
unlock runner should come from cores (it factors out `_start()` and guards against finishing twice); `gate.py`
stays per target (different acceptance rules). `BisectLauncher` supplies `_build_header`, `_build_options_frame`,
`_build_buttons`, `_restore_geometry`, `closeEvent`, `_collect_options`, `_on_reset`, `_on_start`; each app keeps its
options dataclass (`validate()`, `to_args()`, `to_command()`), summary, hints and help. A change to
`BisectLauncher` bumps all three app tags (and the portal).

**Step 7:** helpers identical in all three bisect scripts: `say hdr die usage cfg_get cfg_set`; cu ↔ cores also
`ask attempt_done do_reboot set_colors next_attempt`; cu ↔ gpu-oc also `gpu_busy gpu_temp gpu_sclk faults_since
memtest_bytes`. Keep `build_plan`, `run_attempt`, `summary` and the register/SMU access per script. Scripts stay
single-file: inline the shared block between `# >>> bisect-common` / `# <<< bisect-common` markers at build time.

**bios-reader, findings on the owner's board (stock P5.00, dump SHA-256 `f403fdd4…acf3`):** the setup forms are in
two modules, `Setup` (main Aptio menus, varstore `Setup`, 0x1D3 bytes) and `CbsSetupDxe` (AMD CBS, varstore
`AmdSetup`, 0x8B5 bytes, 1111 questions). Hidden on stock P5.00: the Chipset tab and, under Advanced, PSP
Firmware Version, Demo Board, CPU Configuration, SIO Configuration, Advanced CPU Settings and one USB Configuration
(links under `SuppressIf True`); the South Bridge forms and IMC Fan Control (not linked); in AMD CBS everything
except UMC Common Options → GDDR6 Common Options → DRAM Timing Configuration (not linked). Hidden CBS forms include
GFX Configuration (UMA mode, frame buffer size), GFX Configuration-int (GFX CUs/RB Control, InactiveCUs) and
Core/Thread Enablement (downcore, SMT). On this board all `AmdSetup` values with a form default equal it; `Setup`
differs from `StdDefaults` only in two unnamed Save & Exit bytes. Defaults: `Setup` from the `StdDefaults` NVAR
entry, `AmdSetup` from the forms' `Default` flags (there is no `AmdSetup` in `StdDefaults`). The current `Setup` is
the last entry of its NVAR link chain. A Python parser of IFRExtractor's text output was enough for this analysis;
the app needs its own IFR parser for the binary forms.

## Decisions

Fresh history; the portal first, with its own tag; per-app tags; root-owned `/opt` for code that runs as root and
one shared venv for PyQt6; `bc250_core` bundled per app release; one shared `BisectLauncher` but three bisect
apps; MkDocs for the manual; the repository is `RobertoTorino/bc250-bazzite-suite`.
