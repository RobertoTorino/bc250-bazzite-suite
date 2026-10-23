<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

# Migration status

Working notes for moving the seven BC-250 tools into this suite. Not part of the manual or the READMEs, which
describe only what exists.

## Resume here (13-10-2026, after the break)

**First (17-10-2026): the releases of the last renames, then the icons.** Every app is renamed (item 2). State at
the end of the last session, nothing committed by Claude:

1. **Releases** (owner). Done, 17-10-2026: every app renamed before persistent-acpi is released and pinned with a
   checksum under its new prefix (the last batch: datstation, dtool, package, ppsspp, rpcs3, shadps4, vita3k), and
   portal-v1.19.0 is released. Open after the persistent-acpi, sftp-tools, usb-wifi and system-overlay renames
   below: acpi-v0.1.6, sftp-v0.2.0, wdriver-v0.1.1 and overlay-v0.2.0 are pinned without a checksum until the first
   release under each new prefix, then their pins, the portal minor bump check_manifest asks for, and the portal
   release; the dtool release too (it picks System Overlay by its new key). Done this session besides the renames:
   DatStation's revised quiz questions (item 2 under Next session below).
2. **The (re)naming convention** (owner, 17-10-2026), one app per step, the owner names each: the folder under
   `apps/` is a short name, the package the app's name without its BC-250 or Bazzite prefix, as a Python
   identifier. Done: `apps/ace/ace_queues/` (was ace-queues/bc250_ace_queues), `apps/ncgui/netcat_gui/` (was
   bazzite-netcatgui/bazzite_netcatgui) and `apps/datstation/datstation/` (was bazzite-datstation/bazzite_datstation;
   the owner's choice, 17-10-2026: the package takes the folder's name where the name without its prefix is that
   word, nothing in the tooling minds) and `apps/check/bazzite_check/` (was bazzite-test/bc250_gui; the owner,
   17-10-2026: check rather than test, so that no folder is called test; the Steam launch option the In-Game page hands
   out names the package, and one copied before is to be copied again: no shim. Three games on the owner's
   board still had a line from the old checkout and no longer started, 19-10-2026; the Game details page now
   lists such lines with the current one, and says when it runs from a checkout) and
   `apps/bios/bios_reader/` (was bios-reader/bc250_bios_reader, 17-10-2026) and `apps/consoles/consoles_link/`
   (was console-link/bc250_console_link, 17-10-2026, both names the owner's; the native core keeps its name
   bc250_console_link_core, the wheel in the installed environment) and `apps/cores/cores_bisect/` with
   `apps/cores/cores_unlock/` (was cores-bisect/bc250_cores_bisect_gui and bc250_cores_gui, 17-10-2026; two
   windows, two packages, each named after its window) and `apps/compute/cu_bisect/` with `apps/compute/cu_unlock/`
   (was cu-bisect/bc250_bisect_gui and bc250_unlock_gui, 17-10-2026, the same way) and `apps/decky/decky_manager/`
   (was decky-manager/bc250_decky_manager, 17-10-2026) and `apps/fan/fan_control/` (was fan-control/bc250_fan_control,
   17-10-2026) and `apps/gpu/gpu_governor/` (was governor/bc250_governor, 17-10-2026) and `apps/oc/oc_bisect/` (was
   gpu-oc-bisect/bc250_gpu_oc_gui, 17-10-2026) and `apps/cec/hdmi_cec/` (was hdmi-cec/bc250_hdmi_cec, 17-10-2026;
   its installer moves an installed watcher unit to the new module) and `apps/helixsr/helixsr_manager/` (was
   bc250_bazzite_helixsr, 17-10-2026; the folder kept its name, so the key, tags and pin did too) and `apps/vram/vram_manager/` (was
   memory-manager/bc250_memory_manager, 17-10-2026) and `apps/mesh/mesh_shaders/` (was
   mesh-shaders/bc250_mesh_shaders, 17-10-2026) and `apps/pcsx2/pcsx2_manager/` (was
   pcsx2-manager/bc250_pcsx2_manager, 17-10-2026) and `apps/ppsspp/ppsspp_manager/` (was
   ppsspp-manager/bc250_ppsspp_manager, 17-10-2026) and `apps/rpcs3/rpcs3_manager/` (was
   rpcs3-manager/bc250_rpcs3_manager, 17-10-2026) and `apps/shadps4/shadps4_manager/` (was
   shadps4-manager/bc250_shadps4_manager, 17-10-2026) and `apps/vita3k/vita3k_manager/` (was
   vita3k-manager/bc250_vita3k_manager, 17-10-2026) and `apps/mtool/media_tool/` (was demo-tool/simple_demo_tool,
   then dtool/demo_tool, 17-10-2026; renamed Media Tool, 19-10-2026, the owner's names: unlike the other renames
   its installed name changed too, media-tool, and its recordings folder ~/MediaToolRecordings; the installer
   removes a copy under the old name; its chapter is docs/other-tools/media-tool.md) and `apps/package/package_checker/` (was
   dependency-checker/bc250_dependency_checker, 17-10-2026; its tile icon is package.png now, the portal's
   exception for its old file name gone) and `apps/acpi/locked_acpi/` (was persistent-acpi/bc250_acpi_gui, 17-10-2026,
   both names the owner's) and `apps/sftp/sftp_tools/` (was sftp-tools/bc250_sftp_tools, 17-10-2026; the Windows
   build follows the tag, sftp-v) and `apps/suite/suite_releases/` (was suite-releases/bc250_suite_releases,
   17-10-2026; checkout-only, so no tag or pin; a launcher written before needs apps/suite/install.sh again)
   and `apps/wdriver/usb_wifidriver/` (was usb-wifi/bc250_usb_wifi, 17-10-2026; the boot service runs its own copy
   of driver.py by path, so the window asks for Update once)
   and `apps/overlay/system_overlay/` (was system-overlay/bc250_overlay, 17-10-2026; Simple Demo Tool picks it
   first by its new key). Every app follows the convention now; the recipe stays for a renamed app later. The
   recipe, as done for ace and ncgui:
   - `git mv` the folder and the package; rename `docs/apps/<old>.md`, `tools/installer-tests/<old>.sh` and
     `portal/images/apps/<old>.png` to the new short name. The tooling ties the folder name to the portal key, the
     tag prefix, the chapter, the installer test and the tile icon, so all of them follow the folder.
   - Replace the package name everywhere (imports, `python -m`, the installer's launcher line and its file check,
     the installer test), `apps/<old>` paths (ci.yml matrix and shellcheck lines, CLAUDE.md, README, the icon
     SOURCES in `tools/tests/test_portal_icons.py`), the docs links and `assets/<old>/` in the chapter, the mkdocs
     nav, the key in `portal/apps.toml` (`[apps.<new>]`, tag `<new>-v<current VERSION>`, `sha256 = ""`: the
     placeholder for the first release under the new prefix, which an app release accepts and a portal release
     waits for), `[app.<new>]` and its `owner` lines in the dependency catalogue, the portal tests' key sets, and
     `tag_prefix="<new>-v"` in the app's `__init__.py`.
   - Keep the installed identity: APP_ID, the launcher in `~/.local/bin`, the scripts, settings and state folders,
     the display name and the icon file names. Add the old key to `RENAMED` in `portal/bc250_portal/manifest.py`:
     the portal moves the record of an installed copy to the new key, the tag's prefix with it.
   - Installed files outside the app folder that name the package (a systemd unit's `-m <package>`, as hdmi-cec's
     watcher had) break on an update: the installer moves them over, and its installer test proves it.
   - An installer that clears the package folder by name (rather than the whole app folder) also removes the old
     name, on install and uninstall, as helixsr, gpu, compute and mtool do; its installer test plants the old folder.
   - CHANGELOG entries: the app (`Fixed.`), the portal (`Added.`, a key was added), the dependency checker (apps/package)
     (`Fixed.`) and the root; the convention row under Open gets the app.
   - Checks: the app's tests, its installer test, portal, package, suite and tools tests,
     check_versions, check_manifest (it asks for a portal minor bump until the owner releases: expected),
     shellcheck, the strict wiki build, `tools/ci-local.sh` for the touched jobs.
   - Then the owner: release the app under the new prefix (Suite Releases offers the current version first), pin,
     bump the portal, release the portal. Several renamed apps can share one portal release.

Next session (owner, 17-10-2026, releasing everything that stands at that point), in this order:
1. **The new app icons.** One icon per category now (see App icons below): all five of the owner's series are in
   (18-10-2026), local, waiting for the owner's approval.
2. **Bazzite DatStation's quiz questions.** Done (17-10-2026): the owner's revised `questions.json` is in
   (same shape; 1,436 questions, 25 dropped, 110 reworded, 43 answers corrected), the count test and the quiz
   tile follow the file, DatStation has its CHANGELOG entry (Fixed). The commit that carried the file had the
   old count in the test, so CI failed on it and the datstation-v0.2.1 tag waits for the fix.
Then the open board tests of USB Wi-Fi and Console Link below.

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
   Board result on Wi-Fi (17-10-2026, owner, PS4 Pro, the UGREEN AX900 on 5 GHz at -44 dBm, the cable out, the
   controller on Bluetooth, no option): 404 s at 1080p/60, 24230 frames and 40468 sound frames, none lost, none
   rebuilt, no recovery event at all (FEC failed 0, key frames asked 0, skipped 0, no reference 0), 4.5 ms per
   frame, 2.9 Mbit/s on average and 13 at most, the window at most 5 ms late, the controller read without a gap
   over 29 ms; the owner: picture and sound in sync, no lag. So a good Wi-Fi link loses nothing and the recovery
   path is not exercised by it; whether late packets happen on Wi-Fi stays open (the statistics file has no late
   column, the log's counts were not copied). Against the cable run of 13-10-2026 18:12 (374 s, no option, the
   same game, Lumines Remastered, on 1.0.1): the first 300 s of the Wi-Fi record are the home screen and menus
   (0.3 Mbit/s, the controller being sorted out), so the comparison is its last 106 s of play against the cable
   run. Same bitrate (9.8 against 10.3 Mbit/s), nothing lost or rebuilt on either, no recovery event on either; the
   longest gap between packets per second: median 20 ms on both, 95th percentile 36 ms on Wi-Fi against 48 on the
   cable, worst 53 against 89; sound without loss on both (a 10 ms gap once on the cable, none on Wi-Fi); the
   window at most 3 ms late on Wi-Fi against 20 on the cable; decoding 6.5 against 11.9 ms per frame and the CPU
   7.7 against 10.2 percent, which is 1.1.1 against 1.0.1 (the decoders letting go of the GIL), not the link; 3
   seconds under 58 frames on Wi-Fi (one down to 21, with no packet gap: the console sent fewer) against 12 on the
   cable. So the UGREEN AX900 on 5 GHz at -44 dBm streams at least as well as the cable; the one Wi-Fi hiccup of
   the whole record, at 48 s on the home screen, was the window 85 ms late with no packet gap in that second, so
   the board's, not the network's. A longer Wi-Fi run of Lumines (owner, 17-10-2026 04:18, 613 s, 10.7 Mbit/s)
   caught one real Wi-Fi event, which the short runs could not: at 142 s and 144 s two packet gaps of about 180
   ms, 3 frames lost (1 rebuilt with FEC, 3 beyond repair), and the recovery did what it was built for: 3 key
   frames asked for, 24 frames skipped until they came (8 then 16, about 130 and 270 ms of a held picture), none
   drawn without its reference, so no smearing (the owner noticed it as a tiny bit of lag at that moment, nothing
   else); the sound had 10 and 20 ms gaps there; the rest of the 10 minutes
   was clean (median packet gap 21 ms, 95th percentile 49, sound without loss, the window at most 4 ms late). The
   10 minutes against the cable run: equal on every network measure except that one event. So the recovery works
   on real Wi-Fi losses, and the open question about late packets stays with the log's counts. The pair completed
   (owner, 17-10-2026 04:33, the cable back in, 1.1.1, the same game from the start, 634 s of intensive play): the
   cable run lost nothing (worst packet gap 73 ms, 20 ms of sound gaps, decoding 7.0 ms, CPU 7.2 percent) and
   matches the Wi-Fi run on every other measure to the millisecond, so the earlier decoding difference was the
   version. The wiki chapter's section Wi-Fi or cable carries the two runs side by side as the verified test
   (owner's wish, 17-10-2026).
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

## Bazzite pkgxtractor (joined 14-10-2026)

Until 14-10-2026 its own repository (github.com/RobertoTorino/bc250-bazzite-pkgxtractor); now
`apps/bazzite-pkgxtractor`, in the portal under "Development only", pinned to `bazzite-pkgxtractor-v0.1.0` (not
tagged yet). The app's CLAUDE.md, test.sh, tools/ and .gitattributes went (the suite's own do the same); its
MARKDOWN.md is the manual chapter `docs/apps/bazzite-pkgxtractor.md`. Code and installer unchanged.

A port of the owner's C++/Qt tool pkgxtractor (github.com/RobertoTorino/pkgxtractor, Windows only, a trimmed fork
of shadPS4). The core modules keep the C++ structure on purpose, so a diff against `pkg.cpp` stays readable; the
C++ tool is the reference (behaviour, output layout, messages), and a change there is ported here with the C++
commit named in the CHANGELOG.

| Here | Port of (in the pkgxtractor repo) |
| --- | --- |
| `pkg.py` | `src/core/file_format/pkg.cpp`, `pkg.h`, `pfs.h` (same structure, same error messages) |
| `crypto.py` | `src/core/crypto/crypto.cpp` (RSA in plain Python with the CRT parameters; AES-CBC/XTS via `cryptography`) |
| `keys.py` | `src/core/crypto/keys.h`, generated: parse the byte arrays into integers, keep the names |
| `pkg_type.py` | `src/core/file_format/pkg_type.cpp`, generated from the `{0x…, "name"}` table |
| `psf.py` | `src/core/file_format/psf.cpp` (read side only) |
| `main_window.py` | `tools/pkgxtractor/gui.cpp` (the full GUI, not `tools/pkgxtractor_qt/`) |
| `cli.py` | `tools/pkgxtractor/main.cpp`, but extracting into `<output>/<TITLE_ID>/` like the GUI |
| `compare.py` | `scripts/compare_extractions.py` (built in; the C++ GUI ran it as an external script) |
| `compare_delta.py` | `scripts/compare_report_delta.py` (second entry of the window's Compare menu) |

Deliberate differences from the C++ tool: the window is resizable, the CLI uses the TITLE_ID subfolder, Compare
Extractions is built in. Two facts found while porting, both in code comments: the `param.sfo` format field is
effectively little-endian (the C++ declares `u16_be` but reads it with `.Raw()`), and the PFS seed at
`pfs_image_offset + 0x370` is in the unencrypted first sector. `tests/pkg_builder.py` builds a small package
encrypted like a real fake-signed one (how multi-block extraction is tested, as no game package can be in the
repo); keep its layout realistic: directory blocks before file data, the seed in the plain first sector, the PFSC at
a 0x10000 boundary. The console's and its maker's names appear nowhere in the app, the manual, the installer or the
tests (owner's decision).

Done: the port is complete (every feature of the C++ GUI and CLI plus both comparison scripts); 29 tests pass on
Windows and on Linux (suite venv); the installer test passes; verified against 22 real DLC packages on the owner's
Windows machine (the decrypted `license.dat` carries the RIF magic and the content id, which proves the key chain);
about 340 MB/s on the synthetic 96 MB package. On Linux (14-10-2026, the terminal extractor from the checkout): a
real 151 MB application package with a multi-file PFS (CUSA01015, 1583 entries in 35 folders, 169 MB out) extracts
in under a second with exit code 0 and no error report; every file has a valid header for its type (the executables'
magic, ICU data, TrueType/WOFF2 fonts, PEM certificates, PNG) and none has the near-random content a wrong key would
give. Not compared with the C++ tool's output yet.

Open:

1. Compare a real package's folder with the C++ tool's output (Compare Extractions with hashes): the owner's
   test.pkg (CUSA01015) extracts cleanly here, but the C++ CLI is not built on the owner's Windows machine.

On core since 15-10-2026 (owner's decision, for consistency): `INFO` (AppInfo), core's start-up (`create_app`,
`exec_app`), single instance, `AppHeader` and `open_settings` (the same .ini as before), with `bc250_core` bundled
like every core app's. A second launch with a package hands it to the open window (`instance.serve(on_args=...)`,
new in core for this).

To decide with the owner, none blocking: whether to share settings with the C++ build
(`~/.config/pkgxtractor/pkgxtractor-qt.conf`; now the shadPS4 Manager's .ini).

Absorbed into the shadPS4 Manager and dropped as a standalone app (owner, 15-10-2026; choices confirmed by the owner:
everything carried over, as an Extract PKG dialog; the manager gets its own venv with PyQt6 and cryptography, so the
shared venv stays PyQt6-only; the terminal extractor kept as `bc250-shadps4-pkg-cli`). The modules of the table
above live on unchanged in `bc250_shadps4_manager/pkgxtractor/` (only `cli.py`'s program name and the module paths
in the two comparison tools' usage lines changed), with their tests and `pkg_builder.py` ported; `main_window.py` is
`bc250_shadps4_manager/extract_dialog.py`, a dialog with the same widgets, workers and messages. What changed with
the move: no header line (the dialog has the PKG row first), the output starts in the last used folder or else the
first game folder, with a line saying whether it is a game folder, and the games are looked for again after an
extraction; the window cannot close while an extraction runs (its thread would be destroyed), where the standalone
quit mid-extraction and left a partial folder; the crash marker lives while the dialog is open; log, marker and
progress are `~/.local/share/bc250-shadps4-manager/pkgxtractor.*`; the last used folders are in the manager's .ini
(`pkg/last_pkg_folder`, `pkg/last_output_folder`), adopted once from the standalone's, which stays. The manager's
window takes a dropped `.pkg`, and its launcher a package (`%f` in the menu entry, handed to an open window), in the
caller's folder like the standalone's launchers. Its installer removes an installed standalone (launchers, menu
entry, Desktop icon, app, venv and log; not the settings) and leaves the shared venv (removed when no other app uses
it). Dropped with the app: its folder, portal entry and icon (released as v0.1.3), manual chapter (now the Extract
PKG section of the shadPS4 Manager's), CI jobs and catalogue entries. The C++ tool stays the reference.

Open on the board: Extract PKG on a real package into a game folder (it shows up in the list, starts with Play and
from Game Mode); a `.pkg` opened with the app from the file manager, with the app closed and open; the terminal
extractor; installing over the standalone and over an install on the shared venv.

## Bazzite NetcatGUI (joined 15-10-2026)

Until 15-10-2026 its own repository (github.com/RobertoTorino/bazzite-netcatgui); now `apps/bazzite-netcatgui`, in
the portal under "Development only", pinned to `bazzite-netcatgui-v0.1.0` (not tagged yet; VERSION went from 1.0.0
to 0.1.0, owner's decision). The app's CLAUDE.md, test.sh, tools/ (with make_logo.py, which draws the logo with
Pillow) and .gitattributes went; its MARKDOWN.md is the manual chapter `docs/apps/bazzite-netcatgui.md`. Code and
installer unchanged. GPL-2.0-only (owner's decision, 15-10-2026): a derivative of the C++ tool; it does not use
`bc250_core`, so nothing GPL-3.0 is bundled with it.

A port of the C++/Qt tool NetcatGUI 1.0 by Shinnok (github.com/shinnok/netcatgui, GPL-2.0). `session.py` keeps the
C++ structure (one base widget, two subclasses) on purpose, so a diff against the C++ stays readable; the C++ tool
is the reference (behaviour and messages), and a difference is a port bug or a deliberate, documented decision.

| Here | Port of (in the netcatgui repo) |
| --- | --- |
| `main_window.py` | `src/netcatgui.cpp`, `netcatgui.ui` (menus, shortcuts, tabs, status bar, Save Log, About) |
| `session.py`: `SessionWidget`, `MessageInput` | `src/widgets/ncsessionwidget.cpp`, `.ui`, `customplaintextedit.cpp` |
| `session.py`: `ConnectSessionWidget` | `src/widgets/ncsessionconnectwidget.cpp` |
| `session.py`: `ListenSessionWidget` | `src/widgets/ncsessionlistenwidget.cpp` |
| `__main__.py` | `src/main.cpp`, plus the `nc`-like arguments |

Deliberate differences from the C++ tool, all in the manual: UDP per tab (the Listen tab answers the last sender);
the rest of the C++ TODO (TLS on Connect tabs with the certificate question, no TLS on Listen tabs; pipes between
tabs; file pipes; Reconnect Automatically; message history; Rename Tab, Tab Color, the tab bar's menu; Hex View and
Hex Input; the protocol highlighter and templates; session recordings with replay as `.ncrec.json`). "Run
connections in separate threads" is not done on purpose: the Qt sockets are asynchronous in the event loop. The
window opens with one empty Connect tab; received chunks are appended without a line break per chunk; a peer that
closes sets the status bar instead of a modal box; "End Messages with Newline" with a Line Ending submenu (LF
default, CRLF) replaces "End Messages with CRLF" (which sent LF); a user Disconnect flushes before aborting;
received text is decoded incrementally; one client at a time on a TCP Listen tab; the name lookup inside the
socket; Save Log writes UTF-8. Added: Clear Log, Echo Sent Messages, remembered hosts, ports and menu state.

Done: the port is complete; the tests pass under PyQt6 6.11 on Windows (Python 3.13); the TLS test makes a
self-signed certificate with the `openssl` binary and skips without it; a refused loopback connection takes about
4 s on Windows, so the reconnect and refused tests have long deadlines. The tests open real sockets on 127.0.0.1.

Open, in this order:

1. Run it on the board: install from the portal (or `bash apps/bazzite-netcatgui/install.sh`), the menu entry,
   the Desktop icon, Wayland and Game Mode, uninstall with `--purge`, and a Listen tab reached from another
   machine (firewall).
2. The first release, and the portal release that pins it (apps.toml changed: at least a portal minor bump).

On core since 15-10-2026, like Bazzite pkgxtractor: a second launch with a host or a port opens its tab in the
open window. The grey subtitle line under the title went (`AppHeader` has the title row and one row of controls).
Moving it showed a crash at exit (core's tooltip event filter seeing the Connect tab's events after the event loop
ended); core now removes that filter on `aboutToQuit`.

## Bazzite UMD File Renamer (joined 15-10-2026)

Until 15-10-2026 its own repository (github.com/RobertoTorino/bazzite-umd-file-renamer); now
`apps/bazzite-umd-file-renamer`, in the portal under "Development only", pinned to `bazzite-umd-file-renamer-v0.1.0`
(not tagged yet; VERSION went from 1.0.0 to 0.1.0, as for pkgxtractor and NetcatGUI). The app's CLAUDE.md, test.sh,
tools/ and .gitattributes went; its MARKDOWN.md is the manual chapter `docs/apps/bazzite-umd-file-renamer.md`.
Code and installer unchanged. GPL-3.0-or-later (owner's decision, 14-10-2026; the umd-file-renamer repo has no
LICENSE file).

A port of the owner's C++/Qt rebuild in umd-file-renamer (github.com/RobertoTorino/umd-file-renamer, the `qt/`
folder, Windows only), itself a rebuild of diegohp's Java/Swing app in the same repo. The core modules keep the C++
structure on purpose, so a diff against `isoreader.cpp` and `psfparser.cpp` stays readable; the C++ tool is the
reference (behaviour, names, messages), and a change there is ported here with the C++ commit named in the
CHANGELOG.

| Here | Port of (in the umd-file-renamer repo, `qt/src/`) |
| --- | --- |
| `iso.py` | `isoreader.cpp`, `isoreader.h` (same structure; guards a truncated directory) |
| `psf.py` | `psfparser.cpp`, `psfparser.h` (the four string keys; `data_type` is byte 3) |
| `umd.py` | `umd.h` |
| `renamer.py` | `renamerlogic.cpp`, `renamerlogic.h` (the eight templates, the character cleaning) |
| `main_window.py` | `mainwindow.cpp`, `mainwindow.h` |
| `theme.py` | `applyMetallicBlueTheme` in `main.cpp` |
| `__main__.py` | `main()` in `main.cpp`, plus the suite's argument parsing and signal handling |

Deliberate differences from the C++ tool, all in the CHANGELOG: PPSSPP is found in the settings, else as the
Flatpak `org.ppsspp.PPSSPP`, else on the PATH (`find_ppsspp`); the UMDGEN and WQSG_UMD settings are left out (the
C++ app only stored those Windows tools' paths); `rename_file` treats a file that already has its new name as
renamed (Rename All twice showed errors in the C++ tool); the selected game stays selected after Apply translation
and Rename All; the last folder is saved; the window takes a folder or an `.iso` on the command line; the Title field
is editable (owner's decision; read-only in the C++ tool, which made Apply title change a no-op) and a click on the
picture cycles ICON0/PIC0/PIC1. `tests/iso_builder.py` builds real ISO 9660 images and PSP `PARAM.SFO` files (no
game image can be in the repo); keep its layout real: PVD at sector 16, directory records never crossing a sector
boundary, files at sector boundaries.

Done: the port is complete; 34 tests pass under PyQt6 on Windows and on Linux (suite venv); the installer test
passes.

Open, in this order:

1. Run it on the board: install from the portal (or `bash apps/bazzite-umd-file-renamer/install.sh`), the menu
   entry, the Desktop icon, Wayland and Game Mode, the Flatpak PPSSPP launch, uninstall with `--purge`.
2. Real images: a folder of PSP `.iso` files, a Japanese title with the translation, Rename All, and the same folder
   in the C++ tool on Windows to compare the names.
3. The first release, and the portal release that pins it (apps.toml changed: at least a portal minor bump).

On core since 15-10-2026, like Bazzite pkgxtractor: a second launch with a folder or an `.iso` loads it in the open
window.

Decided by the owner (15-10-2026): the app keeps the C++ tool's metallic blue theme (`theme.py`, applied after core's
start-up), not the suite's look; no `.cso` support (the Java original had it; the C++ tool and this port do not).

Absorbed into PPSSPP Manager and dropped as a standalone app (owner, 15-10-2026; choices confirmed by the owner:
a Rename files dialog, built on the manager's own reader in games.py rather than the C++-structured iso.py/psf.py,
so a CSO renames too, and the manager's installer removes an installed standalone). The rename logic (the eight
templates, the cleaning, the translation, the careful rename) lives on in `bc250_ppsspp_manager/renamer.py` with
the standalone's tests ported; the dialog is `rename_dialog.py` (pictures cycling, per-game translation, Google
Translate, Rename all); the saved naming template is adopted from the standalone's settings file once, which stays.
Dropped with the app: its folder, portal entry (released as v0.1.3; portal bump pending anyway), manual chapter,
CI jobs and catalogue entries; the C++ tool in github.com/RobertoTorino/umd-file-renamer stays the reference for
the rename behaviour, but changes there are no longer tracked file by file (the readers differ now). Not carried
over: Open Folder/Open ISO, the PPSSPP path setting and launch, the firmware field, the metallic theme. Open on
the board: Rename files on real images (and once in Game Mode: a renamed game needs Update Game Mode after).

## Bazzite DatStation (joined 15-10-2026)

Until 15-10-2026 its own repository (github.com/RobertoTorino/bazzite-datstation); now `apps/datstation` (the
folder was `apps/bazzite-datstation` until the naming convention, 17-10-2026), in
the portal under "Gaming" (owner, 15-10-2026), short name DatStation, pinned to `bazzite-datstation-v0.1.0` (not
tagged yet). The PlayStation knowledge part of the owner's DatStation Android app (github.com/RobertoTorino/DatStation,
Kotlin + Compose) as Python + Qt, built on bc250_core from the start. Its bundled `bc250_core/` (identical to core's),
CLAUDE.md, test.sh and .gitattributes went; its mkdocs.md is the manual chapter `docs/apps/datstation.md`.
The project page and `AppInfo.repo_url` now point to the suite, where its releases are. GPL-3.0-or-later.

Decided by the owner before the move (15-10-2026): the questions ship as plain JSON (the Android app encrypts them
with a key that is in its repository); the Roberto and Moonshie characters are dropped, the music, scores and trophies
stay; the app writes its own Steam shortcut (core's `steam`); a front page of tiles, not tabs. Two findings in the
Android data, handled in the app: 56 true/false questions carried their explanation in the answer ("False: ..."),
unanswerable on Android, now an `explanation` field; the APPS category looked up "Apps" where the data says "App".

Found on the move: the tests reached a Steam on the machine. They patched `steam.steam_running` and
`steam.with_steam_closed`, but `with_steam_closed`'s defaults and `steam_shortcut.add`'s `closed=` were bound at
import, so on the owner's Bazzite (Steam running) the main window tests closed and restarted Steam, and
`test_refusals` (expecting no Steam) wrote a "Bazzite DatStation" shortcut with a `/tmp/pytest-of-admin/...` launcher
and its four grid images (`3749308435*.png`) into the real userdata. The conftest now isolates HOME and replaces those
defaults. Other apps inject the Steam functions (shadPS4 Manager's `steam_closed=`); a cleaner fix in the app is the
owner's call.

Open, in this order:

1. The stray shortcut in the owner's Steam (above): Remove from Steam in the installed app, or by hand with Steam
   closed.
2. On the board: install from the portal (or `bash apps/datstation/install.sh`), open the app, try every tile;
   Add to Steam from Desktop Mode; start it from Game Mode with a controller (D-pad, A, B as Escape, keys 1 to 4 if
   mapped); the music plays and Music off is kept; how the tile symbols (△ ○ × □ ◇ ◆ ★) and the Inter font render.
3. The first release, and the portal release that pins it (apps.toml changed: at least a portal minor bump).

Ideas not asked for and not built: a Help page inside the app (core's `HelpView`), a controller glyph on the tiles, a
per-category best score on the results page.

## App icons: one icon per category (owner, 18-10-2026)

The owner draws one icon per category, at 1024, 512, 256 and 128 px; every app in the category gets
it. Each category's icons are kept once in `icons/<category>/`; `icons/categories.toml` assigns each app its category,
`tools/sync_icons.py` writes the copies (the app's `images/<app-id>.webp` at 512 px and `-128.png`, the portal's tile
at 256 px), and `tools/tests/test_icons.py` fails on a stale copy or an icon outside the table. The copies stay in git,
so installers, portal, wiki and releases find them where they did.

- WebP (owner, 18-10-2026): the icons are WebP, except the 128 px one, which stays PNG for the menu entries, Desktop
  icons, the hicolor theme (128x128 now, the old 512 px file taken out), Steam shortcuts (`steam.shortcut_icon()`)
  and notifications, as a desktop or Steam may not read WebP. Every app's installer and `LOGO_PATH` changed with it,
  and core (`shortcut_icon`, the banner logo as PNG): each app's release carries it, with its icon entry.

- In place (18-10-2026, local, no release yet), all as the owner made them: gaming (the blue controller), graphics
  (the titanium chip), sustainable (the metal globe and tree on green, replaced later that day), utilities (the
  graphics board with hammer and screwdriver, replaced later that day) and development (the steel pipeline board).
- Confirmed by the owner (18-10-2026): HDMI-CEC and System Overlay are utilities, Bazzite NetcatGUI is development,
  the CU and Cores unlock icons follow their bisects (sustainable), BC-250 Bazzite Test is sustainable; the copies
  stay in git; the Steam cards drawn from an icon (Console Link, PCSX2 Manager, DatStation) show the category's
  icon. The portal keeps its own icon (below).
- Next (owner): approve the icons. When they are final, every app gets a CHANGELOG entry (its icon, WebP) and a release (owner); the Steam cards drawn from an icon (`steam_art`) and the
  wiki follow the new icons by themselves.

Earlier, 17-10-2026: icons per app with the app's name in outlined letters.

- In place (17-10-2026): the five emulator managers, PCSX2, PPSSPP, RPCS3, SHADPS4 and VITA3K, on the dark-blue
  frame. The earlier proof of concept that drew symbols into the frames (`tools/icons/`, `make_icons.py`,
  `tools/tests/test_icon_family.py`) is removed.
- Next (owner, 17-10-2026): the owner prepares the next batch; the first thing to pick up in the next session.
  BC-250 USB Wi-Fi carries a placeholder until then (core's purple, a Wi-Fi fan and a USB plug, drawn with
  Pillow on 17-10-2026), released as such.
- When the five work out, every other app follows, from the same templates (owner). A new icon means a release of
  that app (owner).
- Dropped (owner, 18-10-2026): the rule that an app's window colour follows its icon (17-10-2026). The window
  colours stay as they are; the five emulator managers keep the blue #0A55B0 (the shadPS4 Manager's style).
- The portal keeps its purple board icon (owner, 16-10-2026): it fits the wiki's design and is its logo and
  favicon too.
- The portal's new icon (owner, 19-10-2026): the owner's drawing, converted to WebP (512 px in portal/images, the
  128 px PNG, the portal's tile) and copied to the wiki's logo and favicon. Local, no release yet.

## Themes: one theme for every app (owner, 19-10-2026)

Three themes, one choice for the whole suite, made in the portal's Theme box: gunmetal (dark, cool blue-grey, the
default), silver (light) and warm (dark warm grey with a bronze accent). The titanium variant is dropped. Status
pills, boxes and banners are the theme's surface with the state as a coloured left edge (owner's choice). The
emulator managers and DatStation keep their blue as the accent over the theme; BIOS Reader's screen keeps its BIOS
colours (owner, 19-10-2026).

- In place (19-10-2026, local, no release yet): core's `theme.py` (copied into the seven apps not on core and the
  installer-tests GUI), `create_app()`, the portal's Theme box, every app's startup. Every app was rendered
  offscreen in all three themes.
- Left as they were: Console Link's search fields (light in either scheme by design), the CU and core maps in the
  unlock apps (coloured cells with a legend), Bazzite Test's results card (an exported picture).
- Next (owner): try the three themes on the board. A release of core and of every app that changed (the handover
  lists them).

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
| — | **Naming convention** (owner, 17-10-2026): an app's folder under apps/ is a short name, its package the app's name without its BC-250 or Bazzite prefix; with the folder go the portal key, the tag prefix, the wiki chapter, the installer test and the tile icon, while the installed launcher, scripts, settings and state keep their names. Done (17-10-2026): ace-queues → `apps/ace/ace_queues`, bazzite-netcatgui → `apps/ncgui/netcat_gui`, bazzite-datstation → `apps/datstation/datstation`, bazzite-test → `apps/check/bazzite_check`, bios-reader → `apps/bios/bios_reader`, console-link → `apps/consoles/consoles_link`, cores-bisect → `apps/cores/cores_bisect` + `cores_unlock`, cu-bisect → `apps/compute/cu_bisect` + `cu_unlock`, decky-manager → `apps/decky/decky_manager`, fan-control → `apps/fan/fan_control`, governor → `apps/gpu/gpu_governor`, gpu-oc-bisect → `apps/oc/oc_bisect`, hdmi-cec → `apps/cec/hdmi_cec`, helixsr → `apps/helixsr/helixsr_manager` → `apps/upscaler/upscaler` (BC-250 Upscaler Manager, 21-10-2026, the owner's names; its installed name changed too, bc250-upscaler, and the installer takes over a copy under the old one), memory-manager → `apps/vram/vram_manager`, mesh-shaders → `apps/mesh/mesh_shaders`, pcsx2-manager → `apps/pcsx2/pcsx2_manager`, ppsspp-manager → `apps/ppsspp/ppsspp_manager`, rpcs3-manager → `apps/rpcs3/rpcs3_manager`, shadps4-manager → `apps/shadps4/shadps4_manager`, vita3k-manager → `apps/vita3k/vita3k_manager`, demo-tool → `apps/dtool/demo_tool` → `apps/mtool/media_tool` (Media Tool, 19-10-2026), dependency-checker → `apps/package/package_checker`, persistent-acpi → `apps/acpi/locked_acpi`, sftp-tools → `apps/sftp/sftp_tools`, suite-releases → `apps/suite/suite_releases` (checkout-only: no tag, no pin), usb-wifi → `apps/wdriver/usb_wifidriver`, system-overlay → `apps/overlay/system_overlay`; the portal moves an installed copy's record to the new key (`RENAMED` in portal/bc250_portal/manifest.py, used by Records in sources.py: add each renamed app there). Open for each (owner): the first release under the new prefix (`ace-v…`, `ncgui-v…`, `datstation-v…`, `check-v…`, `bios-v…`, `consoles-v…`, `cores-v…`, `compute-v…`, `decky-v…`, `fan-v…`, `gpu-v…`, `oc-v…`, `cec-v…`, `vram-v…`, `mesh-v…`, `pcsx2-v…`, `ppsspp-v…`, `rpcs3-v…`, `shadps4-v…`, `vita3k-v…`, `dtool-v…`, `package-v…`, `mtool-v…`, `acpi-v…`, `sftp-v…`, `wdriver-v…`, `overlay-v…`, `upscaler-v…` (apps.toml pins upscaler-v0.7.1 without a checksum until then, 21-10-2026); all are released and pinned up to package (portal-v1.19.0), apps.toml pins acpi-v0.1.6, sftp-v0.2.0, wdriver-v0.1.1 and overlay-v0.2.0 (and, since 19-10-2026, mtool-v0.1.13) without a checksum until then, which an app release accepts and a portal release waits for), its pin, and the portal minor bump check_manifest asks for (keys were added and removed). Every app is renamed (17-10-2026). | Its tests, installer test and the suite's checks; the portal lists the app under the new key |
| 4 | Headless smoke tests for the five GUIs without tests (cu bisect/unlock, cores bisect/unlock, gpu-oc). Built (12-10-2026): tests/ in cu-bisect, cores-bisect and gpu-oc-bisect (options, the --auto unit, both unlock gates, every window offscreen with a fake script), in CI's pytest matrix | CI green |
| 5 | governor and upscaler (was helixsr) onto core; per-app releases plus a portal release. Started (21-10-2026, owner): upscaler uses bc250_core.steam to close Steam while it sets a game's launch options for OptiScaler; its installer bundles core. Its own widgets, instance.py, upstream.py and theme.py copies stay until the rest of this step | Their test suites; install from the portal |
| 6 | Bisect family: `terminal`, `runner`, `dialogs`, `systemd` into core; shared `BisectLauncher` (cu, cores, gpu-oc stay three apps); unlock GUIs onto core; names in strings become placeholders | Their test suites; on the board: one process after starting cu with auto-resume |
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
| — | mesh-shaders (**BC-250 Mesh Shaders**, decided 13-10-2026 by the owner: a new app, not part of the HelixSR Manager; `changes_board = true`; under Gaming, as is helixsr now, owner 13-10-2026). Built (13-10-2026): RADV with DirectMesh v1.3.1 (lonewolf0622/bc250meshtaskwork, MIT; its release patch bundled in mesa/, pinned with the release's SHA-256) on the signed Mesa 26.2.1 in a Fedora container, beside the system Mesa; per-game launch options only (no all-apps switch); the test is its own (owner: no copy of ace-queues' test): the mesh draws with the compute queues DirectMesh opens busy beside them; Switches… for the driver's comparison variables. Checked before building: the patch applies cleanly to signed 26.2.1 and RADV builds (820 steps, Fedora 44); the mesh test passes on lavapipe and catches one wrong tile. Not applied to 26.2.4 (the system Mesa): 4 hunks fail (radv_cmd_buffer.c twice, radv_pipeline_cache.c, radv_pipeline_graphics.c), one (nir_opt_uub.c) is already upstream; the developer offered to update it. The owner's icons are in (13-10-2026), so the releases can go ahead (mesh-shaders, and the portal with the two Gaming moves). Open: nothing has run on the GPU yet (build, install and test from the app on the board, then a mesh shader game); the portal minor bump for the new card and a mesh-shaders release (owner; check_manifest --base asks for it); a dependency-checker release for its catalogue; ask the developer whether the compute queues his patch opens have shown hangs on a stock kernel (his comment says they need a patched kernel). On the board (21-10-2026): the driver's test passes on kernel 7.2.9; two PS5 emulators get further through it on SILENT HILL (PPSA10112) but stop when DirectMesh refuses to split a mesh shader with side effects (`BC250 mesh split rejected: store_ssbo` with KytyPS5, `external atomic result used` with AnyPS5). AnyPS5's two mesh shaders (CullPrimitive, 64 primitives, so split) write memory only in its `record_bda_fault` diagnostic: an atomic compare-exchange whose result only decides six SSBO stores. Decided (owner, 21-10-2026): our own patch on top of the pinned DirectMesh patch (the developer does not answer), extending its first-piece guard: an external atomic whose result feeds only other external writes, and SSBO/global stores, run in the first piece only; whether later reads may alias those writes cannot be proven from the shader, so behind a switch like `RADV_BC250_MESH_SPLIT_STORES` or limited to declared non-aliasing. Built (21-10-2026): `mesa/bc250-suite-mesa-26.2.1.patch`, applied after DirectMesh's by the container build and named in BUILD-INFO (`suite_patch`, the start of its SHA-256; a build without it shows as outdated). Behind `RADV_BC250_MESH_SPLIT_WRITES=1` (off by default, a per-game entry in Switches…): SSBO and global stores are guarded to the first piece like image stores; an external atomic's used result is allowed when every value computed from it only reaches guarded writes and if conditions whose branches hold only guarded writes, values, reads and memory fences (the other pieces get zero); fences without an execution scope stay in every piece; the storage-read refusals are lifted under the switch. Checked: AnyPS5's shaders have exactly that shape (the fault buffer, binding 60, is never read; the `atomicOr` result is unused, only the compare-exchange's is used); the patch applies on DirectMesh and RADV builds without warnings in a Fedora 44 container; the app's tests pass. Board (21-10-2026): built, installed, the app's test passes (10 of 10 rounds); SILENT HILL with AnyPS5 v0.1.3 and the switch: its mesh shaders compile and run (15 split with their side effects guarded to the first piece, 2 of them in two pieces), no split refused, no ring timeouts or GPU resets. The game runs at about 1 FPS and is killed when memory runs out (RAM and swap full; AnyPS5 refuses host memory imports once the host heap's budget is used up), also after a fresh boot: a memory matter of the game and the emulator, not of the patch. KytyPS5 (build 2026-10-21-4644c52) with the switch: its mesh shaders compile, their stores guarded to the first piece; four first attempts are refused as topology/capacity/stage and each is admitted by DirectMesh's own refused-pipeline retry; no ring timeouts or GPU resets; the run also ends with memory running out, also with a 4 GB split (the GPU borrowed 5.7 GB of RAM besides). Open: a mesh release (owner). | Its tests and installer test; on the board: the app's test passes, then a mesh shader game |
| — | Pictures from others (copyright scan, 17-10-2026). Done: the Windows zip carries THIRD-PARTY-NOTICES.txt; DatStation's news test feed is made up (it was a copy of the PlayStation Blog's feed); `.cache/` (the docs build's font downloads) is in .gitignore, and `git rm -r --cached .cache` takes the tracked copy out (owner); DirectMesh credited in mesh-shaders' README. DatStation's 28 console pictures (Sony press and retail photos) removed, without replacements (owner, 19-10-2026): the history page links each console's name to a picture search on the web. The owner's own (confirmed 17-10-2026): the board photos and clip, the music (AI, the owner's track), the quiz questions (AI drafts the owner corrected and rewrote); the controllers on the wiki's Home page (`docs/images/home/controllers/`, AI-generated by the owner, confirmed 19-10-2026); the icons (the category icons in `icons/` and every copy of them, and the suite's own icon: AI-generated as a base and heavily modified by the owner in Photoshop, confirmed 19-10-2026). The portal's example wallpaper (`portal/images/wallpaper-example.webp`, a night skyline photo, added 20-10-2026): from Pexels, under the Pexels license (free to use, no attribution needed; confirmed by the owner 20-10-2026) | Every picture has a known source and a license that allows it |

- **SILENT HILL further in the emulators (on hold, owner 21-10-2026).** Its mesh shaders run with the suite's patch
  (see mesh-shaders above), but AnyPS5 and KytyPS5 are killed when memory runs out, also with a 4 GB split: the GPU
  borrowed 5.7 GB of RAM besides, and memory seems to grow during a run. AnyPS5's host memory imports fail on this
  board (`VK_ERROR_INVALID_EXTERNAL_HANDLE`), so it copies instead. The game's options menu was not reached.
- **A license badge in the README (on hold, owner 19-10-2026).** The suite has several licenses (GPL-3.0-or-later
  for most apps, MIT for acpi, AGPL-3.0 for consoles, GPL-2.0-only for ncgui), so one GPL-3.0 badge would be wrong:
  a "multiple licenses" badge that links to the license overview.
- **Acknowledgements in the wiki (on hold, owner 19-10-2026).** A page naming the people to thank. Names are personal
  data, so each person agrees first or is named by their public handle; the reference implementation is named only
  where CLAUDE.md allows it, which this page is not unless the owner adds it there.
- **Gamescope scaling in BC-250 Upscaler Manager (on hold, owner 21-10-2026: for a next release).** A spatial
  upscaler for any game, also those HelixSR cannot serve (no FSR 3.1, DX11 such as God of War 2018): pick a game, a
  render resolution and gamescope's filter (`-F fsr`, `nis`, `pixel`, `-S integer`, sharpness), and the app writes
  the gamescope line into the game's Steam launch options, with the code the OptiScaler launch options use (Steam
  closed while writing, its record for Remove, Game Mode: the line copied; in Game Mode the Quick Access menu's
  Scaling Filter does it already, so the app says so). To decide then: where it sits (a mode on the Deploy page or
  its own page), the screen size read from the display rather than assumed, and whether shader effects (CRT,
  Anime4K-like) through a ReShade-style layer are in, if Bazzite ships one. Came from a look at Magpie
  (github.com/Blinue/Magpie, 21-10-2026), which is not a candidate: Windows-only, it captures windows through
  Windows' compositor (Graphics Capture, Desktop Duplication, GDI, DwmSharedSurface), which Wine does not have, and
  it is a spatial upscaler like gamescope's FSR 1.
- **Our own shadPS4 build (on hold, owner 22-10-2026).** shadPS4 Manager installs shadPS4's own release; built by
  the suite (the owner built shadPS4 for Windows before), with ace's and mesh's Mesa builds as the pattern. In it:
  shadPS4's quit window (`Overlay::ToggleQuitWindow`) as the suite's: a "Suite Control" header, the suite's icon
  (128 px, if it fits), the black background 75 % opaque. Perhaps also Extract PKG inside shadPS4 (installing a
  package from shadPS4 itself): shadPS4 is GPL-2.0-or-later, the Manager GPL-3.0-or-later, so a build with both is
  GPL-3.0; to check before starting. The quit window itself opens from any controller and keyboard since
  22-10-2026 (the Manager's quit hotkeys in shadPS4's `input_config/global.ini`).
- **A PS4 Camera for USB HD Cam (on hold, owner 23-10-2026: when there is one at the board).** The app handles the
  PS4 Camera on Sony's PlayStation Camera Adapter (CFI-ZAA1), but nothing of it was tried: there is no PS4 Camera at
  the board. To try then: the adapter's hub (054c:0d0b) shows it as PS4 Camera; Download gets its firmware (PS4
  system software 1.50 to 3.15, psxdev/luke_firmwares) and the box turns green; the load with Reduced bandwidth (the
  file has the same video endpoint as the PS5's); the camera back as 05a9:058a with its modes and controls (PS Move
  API: 1280x800 at 60, 640x400 at 120, 320x192 at 240); whether a CUH-ZEY1 takes the same file as a CUH-ZEY2; the
  other PS4 firmware versions; the udev rule's power line for 058a.

- **Descriptions for the games in Steam (on hold, owner 22-10-2026: after the release of the covers).** A non-Steam
  game's page shows Steam's fixed notice where a Steam game has its description, developer and release date:
  shortcuts.vdf has no field for them, so no manager can write one. Only a Decky plugin can fill that panel. The
  owner tries MetaDeck (Decky's plugin store; it looks non-Steam games up on IGDB) on the board, with the managers'
  "[PS4] Title" names. If it works, a short note in the wiki points to it; our own Decky plugin is not planned
  (JavaScript inside Steam's interface, an IGDB key, and upkeep with every Steam update, for what MetaDeck does).
- **Covers from SteamGridDB (owner, 22-10-2026; built 22-10-2026, tried on the board by the owner 22-10-2026: it
  works).** core's `covers` with one SteamGridDB API key for the whole suite (`~/.config/bc250-bazzite-suite/
  steamgriddb-key`), a Covers… button in the nine game managers. shadps4, rpcs3, vita3k and ppsspp take the portrait
  only (their games bring pictures of their own); pcsx2, swanstation, mgba, sameboy and xenia all four pictures.
  `--purge` removes the covers folder in the eight others too. The wiki's page is docs/apps/covers.md. Open: the
  releases of the nine apps (owner).
- **USB IPS3.5 (owner, 22-10-2026; built 22-10-2026).** `apps/ips35`, Utilities: the board's values on a Turzx USB
  IPS screen (USB ID 1a86:5722, a CDC-ACM serial port, no driver needed; the owner's is a Turing Smart Screen 3.5",
  serial USB35INCHIPSV2). Measured on the owner's board (22-10-2026): no answer to HELLO, about 166 KB/s (a whole
  picture 1.85 s, so only changed rectangles are sent), brightness 0 brightest to 255 darkest, a picture cut off
  halfway leaves the screen out of step until it is reset (a flood of the RESET byte; it re-enumerates in about 2 s),
  and a command must be a USB transfer of its own: the screen drops the rest of the 64-byte packet that carries a
  command, so a command written together with its pixels lost 58 bytes (first taken for a 29-column offset of the
  panel; the photos showed it was the lost bytes once partial updates went wrong). From
  the Windows app's manual, on the owner's request (22-10-2026): CPU and GPU temperature tiles, header text, a
  chosen network interface, six themes and a background picture (the Windows themes' .data files are a .NET
  format, not read), and the weather from Open-Meteo (the app's only network use, only with a chosen place and
  its tile shown). The
  owner's remarks (22-10-2026): VRM and NVMe tiles say "temp", each tile's tooltip says what it shows, the network
  interfaces say Ethernet, Wi-Fi or Virtual (from /sys/class/net), a Clock tab (24 or 12 hours, the zone's name or
  UTC offset, five date formats), Save picture and Save report under the preview, a theme or colour being tried shows
  in the preview only, the user's own text, tile, accent and background colours, and a drawn weather icon (day and
  night, from Open-Meteo's is_day); folded into the unreleased 0.1.0 entry of its CHANGELOG. The
  UsbMonitor 3.5", 5" and 7" are known by their HELLO answer but not tried; other Turing revisions (other USB IDs,
  another protocol) are not supported. System Overlay's sensors moved to core for it (by accident in the owner's
  vram-v0.7.1 commit, 22-10-2026; the CHANGELOG entries followed). The owner's board shows the values cleanly in
  portrait (22-10-2026). Open: the owner tries landscape, the themes and colours, a background picture, the clock
  options and the weather icon on the screen; the releases (owner): `ips35-v0.1.0`, core's and overlay's next ones, then pin it and bump the portal (an
  added app needs a minor bump).
- **USB HD Cam (owner, 23-10-2026; built 23-10-2026; no "PS5" in the code, owner 23-10-2026: model keys and firmware files cfi-zey1 and cuh-zey2, the text names the
  PS5 HD Camera and the PS4 Camera).** `apps/hdcam`, package `usb_hdcam`, Utilities: the PlayStation
  PS5 HD Camera as a webcam. No kernel driver: the camera is an OV580 boot loader (05a9:0580) without
  flash, which needs its firmware at every plug-in, then a UVC camera (05a9:058c). The upload (512-byte vendor control
  transfers, then 0x5b at 0x2200/0x8018) follows PS Move API's loader, over usbfs ioctls with the standard library,
  so the shared venv gets no libusb binding. The firmware is Sony's, so it is not in the repository: the app downloads
  prosperodev/hdcamera's file pinned to commit 8773610 (SHA-256 checked; the same file as the owner's Windows
  Windows driver package, SHA-1 0fa4da31…), or takes the user's own. The udev rule (pkexec, once) gives the user
  the boot loader (uaccess) and starts a user service (SYSTEMD_USER_WANTS) that install.sh writes, so nothing runs
  as root; the service also runs at login. Found on the owner's board (23-10-2026): boot mode at 5 Gbit/s on port
  7-1, its node root-only until the rule is there. After the owner's Allow access (23-10-2026) the upload worked: the
  camera came back as /dev/video1 with the 13 modes of the descriptor. But no mode streams: the board's USB 3
  controller (AMD FCH xHCI 1022:7814) refuses the camera's only video endpoint, which the firmware declares at
  offset 61414 as 1024 bytes, burst 16, mult 3 (49152 bytes per 125 us), with "Not enough bandwidth for altsetting
  1" and ENOSPC on VIDIOC_STREAMON. The window now says when no picture comes. The fix firmware does not touch that
  descriptor (its 8 bytes: a 60 to 30 fps frame interval and one setting at 66564). The owner agreed to try a smaller
  endpoint (23-10-2026): with 2 bursts (32768 bytes) the controller takes it, and every one-camera mode streams at
  its full rate, side by side up to 2560x800 at 30 fps and 3840x1080 at 8. The app's USB bandwidth setting does it,
  Reduced by default, Full for controllers that allow the original (Claude's choice of default and of the setting;
  the owner may want it otherwise). Tried with the experiment's script and the window's preview, not yet through a
  fresh plug-in with the app itself; the owner then did that plug-in (23-10-2026), and the app loaded the firmware
  with Reduced bandwidth by itself. The owner found the picture dark in a well-lit room (23-10-2026): Picture
  settings offers the camera's controls, and Auto Exposure in Auto Mode brightens it (mean luma 48 to 111, measured
  23-10-2026; the exposure time cannot be set). Auto Mode is the default (owner, 23-10-2026). USB autosuspend reset
  the camera's settings 2 s after it was let go; the udev rule now keeps it powered (tried after the owner's Allow access
  for the updated rule, 23-10-2026: brightness 110 after 15 s idle; the app now writes the chosen settings even when
  they read the same, as the driver's values were stale after the earlier suspends). Another project's firmware patch (90 bytes on the same Sony original, for
  1080p60, a depth mode and auto exposure) tried on the board with Reduced bandwidth (23-10-2026): its
  1080p60 and 2448x1088@60 (depth) modes send no picture, as they need Full bandwidth; 2448x1088@30, every other
  one-camera mode and its own auto exposure (with contrast 6, 50 Hz) work; it drops 1280x800@60. Not adopted for now
  (Claude's advice: no gain on this controller); the owner's decision. Hackinside/
  PS5_camera_files is the owner's Windows download (no license). The PS4 Camera stays (owner, 23-10-2026), with a download
  from psxdev/luke_firmwares (the owner's find; the PS4 system software 1.50 to 3.15 file, PS Move API's tested one,
  pinned to commit f90eead); untried, as there is no PS4 Camera at the board (on the backlog: "A PS4 Camera for
  USB HD Cam"). The wiki no longer suggests the fix
  firmware (owner). Hot-plugging works with the installed app (owner's board, 23-10-2026): with no window
  open, the udev rule started the user's load service at plug-in, which loaded the firmware in about a second, set
  Auto Mode and left the camera powered (Reduced endpoint, port 7-2). After a warm restart (23-10-2026, twice) the camera
  does not come back: it kept its power and its firmware (loaded before the restart) and both USB 3 ports read "not
  attached", so the login run found no camera; writing usb7-port*/disable 1 then 0 (the owner, with sudo) changed
  nothing, not even a USB event in the kernel's log (most likely the ports' power is not cut; not measured); a replug
  brings it back. The wiki says so. A cold start (power off, then on, the
  camera left plugged in; 23-10-2026) works: the camera started as a boot loader and the login run loaded it on port
  7-1. Which half is which lens (23-10-2026, 2560x800, the owner covering the lens on the left seen from behind):
  the right half went dark (mean luma 16 against 109), so each half is the lens on that side as one faces the
  camera; the wiki says so. Released (owner, 23-10-2026): hdcam-v0.1.0 with portal-v6.8.0, then hdcam-v0.2.0 (the
  restart hint) with portal-v6.9.0. The preview now reads the camera through V4L2 itself
  (owner's decision, 23-10-2026): Qt Multimedia offered one rate per size (the fastest) and showed damaged frames.
  Every mode measured with Reduced bandwidth: 1080-line modes at 15 fps send nothing at all (the firmware, not the
  bandwidth); 2560x800 at 60 and the two widest at 30 arrive damaged; the rest works. Show names the lens of each
  half. Both wait for the next hdcam release (owner). The exposure time, asked of the camera itself past
  uvcvideo (owner's sudo runs of a usbfs script, 23-10-2026): AE modes 2 and 4 only (GET_RES 6), exposure time flags
  get, set, disabled by auto mode and auto-update; in mode 4 it takes 300 or 20 and keeps it through uvcvideo
  re-attaching, but a stream start puts it back to 1000 (mean luma 51 at 30 ms and at 2 ms). Not usable; the greyed
  row stays. Nothing else open but the PS4 Camera on the backlog.
- **USB HD Control (owner, 23-10-2026: the name, `hdcontrol`, package `usb_hdcontrol`, Utilities; built 23-10-2026).**
  The DualSense and DualSense Edge on Bazzite, for the owner's Edge, which Sony updates only on a PS5 and in its
  Windows app (PlayStation Accessories, which does not run under Wine). No driver and no root: hid-playstation
  drives the controller, the app uses its hidraw node (Bazzite gives it to the user at the board, mode 0666 plus
  uaccess). Read on the owner's Edge (23-10-2026, USB, bottom USB 3 port): update version 0x0200 built 21-06-2024,
  target 0044, hardware 0x01000216; Sony's info.json lists 0x0217 for 0044 (the image's header says built
  19-09-2025). Sony serves only the latest image per target (0x0200's URL answers 404). The update protocol is
  dualsense-updater-rs's (MIT; tested by its author on a DualSense only, not an Edge), the profile layout
  dualsense-edge-profile-web-application's (MIT); the Edge's descriptor declares F4 64 bytes and F5 4, so the app
  pads every report as Windows must. The profiles' CRC-32 (three parts, at part 2 bytes 56 to 59) matches on the
  owner's default profile; the reports read back carry no per-report CRC. The app reads profiles and backs them up,
  it does not write them (the write reports 0x60 to 0x63 and the per-report CRC the web app adds are not confirmed).
  The firmware update works on the owner's Edge: the owner ran it from the window (23-10-2026, 06:27; Claude's own
  run had been stopped by the session's permission check), 0x0200 to 0x0217 in about 20 s, the controller back on
  USB 2 s later with the new firmware, its profiles byte for byte as the backup made before. Not checked: the
  Bluetooth pairing after the update, and a plain DualSense (none at the board). The release (owner): `hdcontrol-v0.1.0`,
  `package`'s next one, then pin it and bump the portal (an added app needs a minor bump; check_manifest says so
  until then).
- **Battery tests for USB HD Control (on hold, owner 23-10-2026: a later iteration).** The owner's Edge does not last
  long on its battery. Measure it over Bluetooth (on USB it charges): log the level hid-playstation reports (steps of
  10 %) and the time, with the light bar, the player LEDs, rumble and the adaptive triggers on and off, before and
  after the firmware update, and see whether any of them (they are host-set: the light bar's brightness is
  `/sys/class/leds/<input>:rgb:indicator`, root-only by default) or the update changes it. Then decide what the app
  offers (a battery log, a power-saving setting).
- **SwanStation Manager (built 21-10-2026, owner's decision; not tried on the board).** PS1, the first of six
  emulator managers the owner asked for (list below). Not standalone: SwanStation is a libretro core, so the app
  installs RetroArch from Flathub (a Flatpak, `--user`; one already installed is used) and the core from the libretro
  buildbot, and its run wrapper starts `flatpak run org.libretro.RetroArch -L <core>`. The Flatpak has
  `--filesystem=host`, so the core stays in the app's own folder. The buildbot keeps only the newest core build, so
  the core is not pinned (the one place the apps' "tested release, checked SHA-256" rule does not hold): it is checked
  as a zip with one x86-64 ELF library, its build date and SHA-256 are recorded in `core.json`, and the app says when
  the buildbot's ETag or Last-Modified changed. Stable buildbot cores exist only inside a 274 MB 7z, so that was no
  alternative. To decide: pin by building the core ourselves, or accept this. The BIOS is read from RetroArch's
  `system` folder (names from the core's info file). Release (owner): `swanstation-v0.1.0`, then pin it and bump the
  portal (an added app needs a minor bump).
- **More emulator managers (owner, 21-10-2026; built 21-10-2026, not tried on the board).** After SwanStation
  Manager: mGBA (Game Boy Advance, MPL-2.0), SameBoy (Game Boy and Color, MIT) and Xenia (Xbox 360, BSD-3-Clause).
  Mesen (NES and SNES) was built and then dropped by the owner (21-10-2026): too complicated for this case. Licenses
  checked 21-10-2026 against each project's LICENSE. All are downloaded by an app, as the existing managers do: none
  has to be bundled. Ryujinx (Switch) was dropped by the owner. Each app has the layout of the others, its installer
  test, CI jobs, a wiki chapter, catalogue entries and an apps.toml entry without a pin; SwanStation's CLAUDE.md
  lines came with them.
  - **mGBA Manager** (`apps/mgba`): pins mGBA 0.10.5, its Linux AppImage (FUSE 2, as shadPS4's). mGBA updates
    itself from its own window; the app sees that by the size and Install puts 0.10.5 back. Lists `.gba` and zipped
    `.gba`, told by the cartridge header's checksum; Game Boy games are left to SameBoy Manager.
  - **SameBoy Manager** (`apps/sameboy`): SameBoy releases no Linux binary, so the owner chose RetroArch with
    libretro's SameBoy core (21-10-2026), the SwanStation pattern. The core is libretro's port (0.14.7 when built, a
    version behind SameBoy's own releases) and, like SwanStation's, not pinned: the same decision is open for both.
    No BIOS needed. Lists `.gb`, `.gbc` and zipped ones by the header checksum and ROM size, the system from the
    colour flag.
  - **Xenia Manager** (`apps/xenia`): pins Xenia Canary build e6cd2e4 (20-10-2026), the Linux AppImage of
    `xenia-canary/xenia-canary` (the older `xenia-canary-releases` repository stopped in March 2026). Builds come
    almost daily and are tagged with a commit, so "newer" is the release published after the pin, and the weekly
    upstream check leaves it out, as it does Vita3K. Lists XGD disc images, `default.xex` folders, `.zar`, and Games on
    Demand and Arcade packages under their header's name.
  - SwanStation and SameBoy now put a newer core in the portal's notice of updates outside the suite, and an Update
    clears it (before, the window kept offering the build it had just installed).
  - Release (owner): `mgba-v0.1.0`, `sameboy-v0.1.0`, `xenia-v0.1.0` (and `swanstation-v0.1.0`), then pin them and
    bump the portal (added apps need a minor bump).
- **Console LinkB (owner, 21-10-2026; built 21-10-2026, not tried with Microsoft's services or on the board).**
  Xbox Remote Play and Xbox Cloud Gaming, a separate app beside Console Link (`apps/clb`, package `console_linkb`,
  tag prefix `clb-v`; the owner chose the name "for now"). GPL-3.0-or-later; the protocol is ported from Greenlight
  (`packages/desktop`, the released 2.4.2 client's session calls, and `packages/player`) and xal-node (the MSAL
  sign-in), both MIT with LICENSE files; their MIT notice is in the app's README, and each ported file says where it
  comes from. xbox-xcloud-player was not used: it declares MIT only in its package.json, with no LICENSE file.
  The name: "Console Xlink" was dropped for its likeness to XLink Kai (Team XLink's Xbox tunnelling tool); no
  trademark search was done for "Console LinkB" either.
  - How it works: device code sign-in (microsoft.com/link), only the refresh token kept (`account.json`, 0600); the
    console list and the wake command from xccs.xboxlive.com; cloud titles from the gssv service, named by
    catalog.gamepass.com; the cloud token tries Game Pass (`xgpuweb`) first, then the free-to-play games
    (`xgpuwebf2p`). The stream: aiortc (WebRTC, PyAV decodes), no STUN server (as the reference), the service's
    candidates merged into its answer before aiortc gets it, Teredo addresses turned into two IPv4 candidates as
    the reference does; the input reports byte for byte as the reference's (every 16 ms), the frames' metadata
    report, rumble to the pad; the first controller through pygame-ce, the keyboard as a pad.
  - Tested on this machine only: recorded-style answers for every call, and a whole WebRTC connection against an
    aiortc stand-in for the service (handshake, control, input, video, sound, rumble, a dialog, the end).
  - To try on the board (owner; the owner has an Xbox account but no Xbox): sign in; Fortnite from the cloud
    without Game Pass (Epic says it needs none; reported limit 60 min a session); the picture's smoothness at
    1080p60 (the frames are turned into images in Python, with PyAV's swscale: may need a faster path), the sound's
    delay, the controller. aiortc offers only H.264 Baseline profiles, where a browser offers Main too: the
    service accepted Firefox's (Baseline) offers, so it should accept these. A stream from a console at home stays
    untested until someone with an Xbox tries it.
  - Not in this version: Game Mode shortcuts (Console Link's Steam pattern), the stream's statistics, a choice of
    region, the microphone (chat channel), touch and mouse/keyboard input for games that take them.
  - Release (owner): `clb-v0.1.0` and a Dependency Checker release (its catalogue lists the app), then pin `clb`
    and bump the portal (an added app needs a minor bump).

## Known issues to fix

- **HelixSR 2.0, our own solution (owner, 20-10-2026: HelixSR's developer did not answer
  [issue #90](https://github.com/lonewolf0622/HelixSR/issues/90), the build-only switch asked for on 19-10-2026).**
  HelixSR 2.0.0's `helixsr-setup.sh` hands `--yes` on to its game installer, which then puts HelixSR Scaler with frame
  generation into every game it finds, and its license (sections 3 and 6) allows running the setup scripts, not
  changing them, so a cut-down copy of the script is out. Done (20-10-2026): for 2.x the HelixSR Manager runs what the
  script runs before its games, HelixSR's own builder unchanged (`python setup/helixsr_setup.py
  <release>/HelixSR-fsrfg --dxc <wrapper> --yes --no-fg --dlss <dll>`), with the Python, DXC and DLSS DLL the app
  fetches as before, Wine found where the script looks (Proton first), its own DXC wrapper in the work folder, and
  `--status` must say `network=1`; the DLL comes from `HelixSR-fsrfg/` (`payload_folder` in backend.py), 1.x stays on
  the script (`BUILDER_FROM` in acquire.py). `SUPPORTED_MAJOR` is 2, `KNOWN_VERSION` 2.0.0. Built on the board
  (20-10-2026) into a scratch folder through the worker: see the CHANGELOG. Open: deploy a 2.0 build into a game on
  the board and play it (its `helixsr.log`), then a helixsr release (owner). WindowManager has the same notes
  (`docs/HELIXSR_2.md`).

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
  limit (new app or part of the Governor: owner decides). Answered by BC-250 Fan Control (16-10-2026, item 3 below).
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
  **Built (14-10-2026) as shadps4, BC-250 shadPS4 Manager** (owner's decisions 14-10-2026: the pinned GitHub
  AppImage, not Flathub; the name; Steam's shortcut code moved into core as `bc250_core.steam`, relicensed by the
  owner from Console Link's AGPL-3.0-or-later to GPL-3.0-or-later; `development = true` first, as Console Link was).
  shadPS4 0.19.0 pinned (`shadps4-linux-sdl-0.19.0.zip`, SHA-256 `a6e3b83f…a0cf9`, from 02-10-2026); facts from its
  source at that tag: settings in `~/.local/share/shadPS4/config.json` (JSON since the TOML era; `General.install_dirs`,
  `General.sys_modules_dir`), `-f true -g <path>` still valid, `-b` opens its own Big Picture window (settings and
  game list; the Qt launcher is a separate project with dated pre-releases only), `--add-game-folder`, updates in
  `<game>-UPDATE` or `-patch` beside the game, 34 system modules it loads when present (24 without a replacement of
  its own), a folder named `user` in the current folder taken as its portable folder (the run wrapper starts it
  beside the AppImage). Not in iteration 1: the BC-250 presets in `config.json` (values to find on the board first,
  then written as single keys with a backup and undo); a check for newer shadPS4 releases (its tags are `v.0.19.0`).
  The owner's icons are in (14-10-2026). Open on the board: Install, a game from the desktop (Play) and
  from Game Mode (the shortcut, full screen, Exit game), the artwork in Steam, whether Steam's environment for a
  non-Steam game (its library path, its overlay) disturbs the AppImage, as it did Console Link's Qt; then the presets.
  Released as `shadps4-v0.1.0`. Renamed (owner, 14-10-2026) to `shadps4-manager` (package
  `bc250_shadps4_manager`) and moved to Gaming; the app's own blue, since 16-10-2026 the icon's #0A55B0 (owner).
  Release (owner): the next version as `shadps4-manager-v<x.y.z>` and a portal minor bump (the key changed); until then `apps.toml` pins
  `shadps4-manager-v0.1.0` without sha256. A board with the old install shows it as installed, version unknown,
  until it is installed again from the portal.
  shadNet (owner, 14-10-2026: the client side, not a server of our own). shadNet 0.1.0 is a server; shadPS4 0.19.0
  has the client, and signs in from `config.json` (`shad_net_enabled`, `shadnet_server`) and `users.json` (per user
  `shadnet_enabled`, `shadnet_npid`, `shadnet_password`), with no way of its own to enter an account or create one.
  The app does both (protocol 1, plain TCP; registration needs a key when the server sets `RegistrationSecretKey`).
  `srv.shadps4.net` answers with protocol 1; whether it takes registration without a key is not known yet (a test
  registration was not sent). Not taken: a shadNet server app (only source and daily builds for Linux; ports).
  Newer shadPS4 (owner, 14-10-2026): a notice in the app (stable releases only), no install; keeping in step stays
  a new app version per shadPS4 release, tried on the board first. Open on the board: Create account and Try
  sign-in against `srv.shadps4.net`, a game signing in (online trophies), the controller and the overlay through
  the run wrapper (XWayland on the desktop).
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
- **Decky Loader (built 14-10-2026 as decky-manager, BC-250 Decky Loader Manager).** Owner's request: "port"
  Decky Loader to the portal's Gaming section. Decky's interface lives inside Steam's Game Mode, so the app is a
  manager like shadPS4 Manager. Owner's decisions (14-10-2026): a pinned release with its SHA-256 (v3.2.10,
  PluginLoader, `c2cf316a…8258`, from 04-10-2026), with a check that names a newer release; besides install, update
  and remove: the service state with Restart and its journal, the plugins list (read-only, from
  `~/homebrew/plugins`, disabled ones from `settings/loader.json`), and the /home/deck link as Bazzite's
  `ujust setup-decky` makes it; `changes_board = false`. Facts from Decky's installer and its source at v3.2.10:
  the layout (`~/homebrew/services/PluginLoader`, `.loader.version` holding the tag, the release unit
  `/etc/systemd/system/plugin_loader.service` running as root with UNPRIVILEGED_PATH and PRIVILEGED_PATH,
  `chcon -t bin_t` under SELinux, Steam's `.cef-enable-remote-debugging`), and its updater, which runs as root and
  rewrites the binary, the version file and the unit. The app keeps that layout, so `ujust setup-decky` and Decky's
  updater keep working; one change: `services/` is root-owned (Decky's installer leaves it to the user, so a process
  running as the user could swap what root starts). The root steps are `loader.py` through pkexec (as HDMI-CEC's
  boot part); `install.sh --uninstall` leaves Decky (it never uses sudo) and names `ujust setup-decky uninstall`.
  The icon is a placeholder. Open on the board: Install from Desktop Mode (the password dialog, SELinux: does the
  service start from the root-owned folder in the home), Decky in the Quick Access menu after Steam restarts, a
  plugin from Decky's store (then the list), Decky's own update with `services/` root-owned, a `/home/deck` plugin
  with Link, Remove with and without the plugins, and `ujust setup-decky status` before and after. Release (owner):
  `decky-manager-v0.1.0` and a portal bump; until then `apps.toml` pins it without sha256 and check_manifest asks
  for the portal bump.
  Keeping in step (owner, 14-10-2026): `tools/check_upstream.py`, weekly in `.github/workflows/upstream.yml`
  (Mondays, and by hand), fails when Decky moved: a newer stable release, a replaced PluginLoader, or a changed
  release unit at the pinned tag or on main. A move is a new decky-manager version with the new pin, tried on the
  board first. Decky updating itself on a board stays allowed (owner): the app shows it and leaves it.
  shadPS4 too (owner, 16-10-2026): the same tool and workflow (a job of its own) check the shadps4-manager pin: a
  newer stable release, with its Linux zip and SHA-256 for the new pin, or a replaced zip. Moving the pin also needs
  a look at what changed in shadPS4 (0.20.0 moved shadNet's settings); the board test and release stay the owner's.
  HelixSR too (owner, 16-10-2026): a third job checks HelixSR against `KNOWN_VERSION` and `FALLBACK_VERSION` in
  apps/helixsr's acquire.py (a newer stable release, another fallback in its notes, a fallback without its zip).
  HelixSR 1.9.0 (15-10-2026) prepared in code: its own zip among the Scaler's, `--no-fg`, the new installer line,
  fallback 1.8.1 (owner), no OptiScaler from 1.9.0 on (owner: a hint only for now). Open: build and deploy 1.9.0
  and the 1.8.1 fallback from the app on the board, then `KNOWN_VERSION = "1.9.0"` (until then the weekly job
  fails); a helixsr release (owner). 1.9.0 is under the HelixSR Freeware License (no redistribution of modified
  copies, no modification); the app only downloads it and runs its setup, as before.
- **PS3 emulator manager (built 14-10-2026 as rpcs3-manager, RPCS3 Manager).** Owner's request: the
  shadPS4 Manager's implementation for RPCS3. Built the same way, same window, wrapper and installer; choices made
  in building it, the owner's to confirm or change: `development = true` first (as shadps4 was), the indigo
  #4F34C9 from RPCS3's logo, a placeholder icon, no RPCN (RPCS3's online service: its own window sets the account
  up, unlike shadPS4's shadNet). RPCS3 has no stable releases: a build per change in `RPCS3/rpcs3-binaries-linux`
  (`build-<commit>`, the AppImage alone, SHA-256 as GitHub's asset digest and in the release body) and now and then
  a landmark tag in `RPCS3/rpcs3` (v0.0.43, 30-09-2026). Pinned: the landmark's own build, 0.0.43-20133
  (`rpcs3-v0.0.43-20133-53d44aa4_linux64.AppImage`, SHA-256 `d26adeba…d241a`, 94 049 343 bytes, checked against the
  downloaded file); the newer-release notice follows the landmarks, not the daily builds. Facts from RPCS3's source
  at v0.0.43: everything in `$XDG_CONFIG_HOME/rpcs3` on Linux (no `config/` subfolder there), its drives in
  `vfs.yml` (`$(EmulatorDir)`), disc games it knows in `games.yml` (added when one first starts), installed games in
  `dev_hdd0/game`, the firmware version in `dev_flash/vsh/etc/version.txt`; `--no-gui`, `--fullscreen` (only with
  `--no-gui`), `--installfw` (needs the GUI); its own Steam shortcuts use `--no-gui "%RPCS3_GAMEID%:<ID>"`, ours the
  EBOOT.BIN path (a disc game then still starts its update from `dev_hdd0`); a disc game needs a valid
  `PS3_DISC.SFB`; the AppImage is a uruntime (DwarFS) one: no libfuse.so.2, it mounts with fusermount; a `portable`
  folder beside the AppImage would be its portable folder (none there). RPCS3's window checks for updates by default
  and writes a newer build over `$APPIMAGE` when the user agrees; the app notices by size and offers Install
  (turning RPCS3's check off would mean writing its GuiConfigs, not done). Not tried: whether RPCS3's SDL pad handler
  and Steam's environment behave as shadPS4's did (the wrapper takes the same two steps: a real controller instead
  of Steam's virtual one, XWayland via `QT_QPA_PLATFORM=xcb`), ISO games (RPCS3 0.0.43 boots them; the app leaves
  them out: their PARAM.SFO is inside the ISO). Open on the board: Install, Install firmware with a real
  PS3UPDAT.PUP, a disc game and an installed game from Play and from Game Mode (full screen, Exit game), the
  controller and the overlay, the artwork in Steam. Release (owner): `rpcs3-manager-v0.1.0` and a portal bump;
  until then `apps.toml` pins it without sha256.
- **PSP and PS2 emulator managers (built 15-10-2026 as ppsspp-manager, PPSSPP Manager, and pcsx2-manager, PCSX2
  Manager).** Decided 15-10-2026 by the owner after an analysis of `hrydgard/ppsspp` and `PCSX2/pcsx2`: both fit
  the RPCS3/shadPS4 pattern, PPSSPP first, then PCSX2; the names; for PCSX2 the AppImage, not its Flatpak (the
  suite's pattern, chosen by Claude as the owner allowed); PCSX2's Steam artwork is drawn text ("PCSX2 Manager" and
  the game's title on a dark background) until the owner decides the real artwork; both icons are placeholders
  until the owner's images are ready. Built as the RPCS3 Manager is: same window, wrapper, installer, tests and
  installer test; PPSSPP in its own blue #1273C8, PCSX2 in a teal #0E7490. Pinned: PPSSPP 1.20.4
  (`PPSSPP-v1.20.4-anylinux-x86_64.AppImage`, SHA-256 `661c098e…eba21`, 50 689 748 bytes, the SDL build) and PCSX2
  2.8.2 (`pcsx2-v2.8.2-linux-appimage-x64-Qt.AppImage`, SHA-256 `0c46bb6a…abea`, 60 119 544 bytes, the stable
  release: the nightlies are GitHub pre-releases, so core's newer-release check follows the stables by itself).
  Facts from their sources at those tags: PPSSPP's memory stick is `$XDG_CONFIG_HOME/ppsspp` (NativeApp.cpp), games
  in `PSP/GAME` (a folder with `EBOOT.PBP`; category PG is an update), `--fullscreen`, `--pause-menu-exit`,
  no firmware needed, no self-update on Linux, tags with two or three numbers (v1.20, v1.20.4: the app reads them
  itself, core's version_tuple wants three); PCSX2 keeps everything in `$XDG_CONFIG_HOME/PCSX2` (`bios/`,
  `inis/PCSX2.ini`), `-nogui` implies `-batch` (QtHost.cpp), `-fullscreen`, `--` before the file, and its updater
  can replace the AppImage (noticed by size, as rpcs3-manager does). The apps read the games themselves: ppsspp's
  games.py holds an ISO 9660 reader (the PSP's PARAM.SFO, ICON0.PNG and PIC1.PNG out of ISO and CSO v1 images, the
  artwork drawn from those bytes; a CHD listed under its file name) and a PBP reader; pcsx2's games.py the same ISO
  9660 walk for SYSTEM.CNF (the serial as PCSX2 shows it, SLUS_123.45 → SLUS-12345; CHD, CSO, ZSO, GZ under their
  file names, titles are the files' names: a PS2 disc carries no title or pictures; PCSX2's GameIndex.yaml could
  bring titles later, the owner's call). The two ISO readers overlap (~60 lines): a candidate for core when the
  owner wants it, as read_sfo (rpcs3, shadps4, ppsspp each carry a copy) already is. Not tried on the board:
  everything (Install, Play, Game Mode, the controller, the overlay, PCSX2's BIOS flow with a real dump, PPSSPP's
  SDL2 pad under Steam). Release (owner): `ppsspp-manager-v0.1.0`, `pcsx2-manager-v0.1.0` and a portal minor bump
  (two new cards); until then `apps.toml` pins both without sha256. Nightly channel (owner, 15-10-2026: PCSX2's
  nightlies are mostly stable): pcsx2-manager's first step has a Nightly builds box; Install then brings the newest
  pre-release AppImage, checked against the SHA-256 GitHub computed for that asset (the API's digest: the download
  is whole, not a build tried on the board, and the window says so); the installed build's size sits beside it
  (.size) so PCSX2 updating itself is noticed on either channel. The same is possible for shadps4-manager (checked
  15-10-2026: one rolling pre-release, `Pre-release-shadPS4-<date>-<commit>`, its linux-sdl zip with a digest and
  the same single member `Shadps4-sdl.AppImage`; a downloaded nightly zip matched its digest), and the owner decided
  15-10-2026 to build it there too: shadps4-manager has the same box (the stable flow unchanged, shown by its
  tests and installer test; open: a version bump, a board test and the release, owner). Also found 15-10-2026:
  shadPS4 released 0.20.0 on 14-10-2026, so the shadps4-manager pin (0.19.0) has a newer stable. The pin was
  moved to 0.20.0 on 16-10-2026 (its config.json keeps shadNet's settings in a new Network section, which the app
  now follows; the rest it relies on compared unchanged); open: a board test, a version bump and the release (owner).
- **Windows: a cut-down portal on Nagi (on hold, owner 15-10-2026).** Nagi (`github.com/D-Ogi/amdgpu-wddm`, also
  amdgpu-wddm) is a WDDM driver for Windows 11 written for the BC-250: AMD's amdgpu code in the kernel driver, RADV,
  DXVK and vkd3d-proton behind the Windows runtimes; D3D12 (12_1, DXR), D3D11, D3D9 through D3D9On12 and Vulkan run.
  Read 15-10-2026 at `0.7.216.101-tester.30` (nothing built or run): experimental, test-signed (Windows test mode),
  a GPU hang stops Windows, one developer, about 30 tester releases in three weeks, interfaces changing between
  them. Its own Control App already does clocks (1000-2000 MHz), the 24/40 CU switch and CU pair map, the voltage
  curve, fan, display modes and game profiles, through its registry keys
  (`HKLM\SYSTEM\CurrentControlSet\Services\bc250kmd\Parameters`) and private escapes. So on Windows governor,
  cu-bisect, cores-bisect and gpu-oc-bisect are not needed; ace-queues, mesh-shaders, persistent-acpi, hdmi-cec,
  memory-manager, decky-manager and system-overlay are Linux or Steam/Bazzite only. Candidates for a Windows
  edition: HelixSR, the shadPS4 and RPCS3 Managers, Console Link, SFTP Tools, NetcatGUI, the UMD File
  Renamer; bazzite-test and the Dependency Checker would need a rewrite (readings from Nagi through WMI or the
  registry). The portal's work: every app installs through bash `install.sh` and `apps.toml` holds bash commands and
  `~/.local/bin` paths, so a second installer per app, Start-menu shortcuts instead of `.desktop` files,
  `%LOCALAPPDATA%` paths, a per-OS field in `apps.toml`, per-OS release assets, Windows installer tests (no
  fakeroot) and Windows CI runners. Licence: PolyForm Noncommercial 1.0.0, not compatible with our GPL code: no code
  or binaries of Nagi in the suite, at most a link to or a download of its own GitHub release; whether our apps may
  load its `bc250control.dll` is unclear (the registry and WMI avoid it). Waiting for: OldLamer's test and YouTube
  video, and Nagi becoming stable. Then (owner): a proof of concept of a cut-down Windows portal on the second board.
- **USB Wi-Fi: the AIC8800 driver for the UGREEN AX900 (started, owner 17-10-2026; held since 15-10-2026).**
  The owner's stick is an AIC8800D80 on USB 2.0. After a cold boot it shows up as `a69c:5723 aicsemi Aic MSC`, a
  storage mode with a 3.6 MB virtual disk (the Windows driver); ejecting that disk (`eject /dev/sdX`, what the udev
  rule of every driver package does) switches it to `a69c:8d80 AIC Wlan`, the loader mode seen on 15-10-2026.
  Nothing in the kernel binds either (7.2.9-ogc3.1: no `aic8800_fdrv`, `aic_load_fw` or AIC firmware), so there is
  no `wlan0`. Groundwork (17-10-2026), which makes it the short job: Secure Boot is unsupported on the board
  (`mokutil`; lockdown none, `sig_enforce` off), so no MOK and no signing. Bazzite's image ships `kernel-devel`
  matched to the running `ogc` kernel (`/usr/lib/modules/<kernel>/build` with .config and Module.symvers), gcc
  16.2.1 (the kernel's own compiler) and make, so the driver builds on the host, no toolbox. Forks compared:
  `radxa-pkg/aic8800` (GPL-3.0 packaging of AIC's GPL-2 SDK 5.0, pushed 12-10-2026; a Debian patch per kernel up
  to 7.3; the USB loader binds `a69c:8d80` and `8d81`; the D80 firmware in `src/USB/driver_fw/fw/aic8800D80`)
  builds against 7.2.9 with no errors once its patch series is applied (two patches fail on CRLF files, neither
  needed: the firmware path is a module parameter, the other lowers a log level). `goecho/aic8800_linux_drvier`
  (MIT, pushed 07-09-2026, the base of most D80 forks) stops with 18 errors on 7.2 (cfg80211's station calls take
  a `wireless_dev` now, `strncpy` is gone); `Kiborgik/aic8800dc-linux-patched` builds for 7.2 but is the DC chip
  only, no D80 firmware. The modules: `aic_load_fw.ko` binds `8d80`, uploads the firmware, the stick re-enumerates
  as `8d81`; `aic8800_fdrv.ko` binds that, on `cfg80211`. `/usr/lib/modules` and `/usr/lib/firmware` are read-only
  on Bazzite, so the modules live under /var and load with `insmod` (a service later), the firmware through the
  loader's `aic_fw_path` parameter: the loader reads `<path>/<file>`, the Wi-Fi module appends `/aic8800D80` to the
  same variable (once per probe) and writes an RF calibration file there, so the folder holds the files flat with
  an `aic8800D80` link to itself, root-writable. The build kit on the owner's board: `~/bc250-usb-wifi-test/build.sh`
  (clone at the pinned commit e9e43ed, the series, the build; it prints the test commands and writes them to
  `TEST.txt`); built 17-10-2026 for 7.2.9-ogc3.1 in `~/bc250-usb-wifi-test/build/<kernel>/`. First load test
  (owner, 17-10-2026, the radxa build): the eject switched the stick, the loader bound it, read every firmware file
  and uploaded the patches, then the upload of the main firmware (358 KB at 0x120000) broke off at 0x170400 with the
  driver's own timeout (-32) and the probe gave up; no `wlan0`. The chip reports `chip_id=7, chip_mcu_id=1`: an
  older MCU revision whose upload boundary the SDK 5 firmware overruns, a known and closed case
  (`shenmintao/aic8800d80` issue 58, the same `a69c:8d80` and chip numbers, 24-07-2026). The fix is that
  repository's `legacy-mcu1` branch (GPL-2.0-only, pushed 08-10-2026; its main branch is for `chip_mcu_id=0`): the
  SDK 3 firmware set (the main firmware 327 KB, ending below 0x170400), the loader matched to it and a cache fix
  for that MCU; Wi-Fi on both bands and Bluetooth through the kernel's `btusb` confirmed by its testers on x86-64
  (issue 110, Debian 13). It builds against 7.2.9 with no errors; the kit now builds it by default (`build.sh`,
  pinned commit 1d1b8ff; `build.sh radxa` keeps the SDK 5 build). That repository also carries `bazzite/`: an RPM
  spec and a README by a BC-250 owner, who layers the built RPM with `rpm-ostree install` (modules under
  `/usr/lib/modules`, the udev rule, the firmware) and rebuilds it after every kernel update; an option for the
  app beside the /var-and-insmod route. Second load test (owner, 17-10-2026, the legacy build): works. One
  lesson first: a stick left in loader mode after the failed upload answers `chip_id=0` and a register read times
  out; it needs a power cycle (unplug, replug, eject) before the next try. Then the loader read `chip_id=7,
  chip_mcu_id=1`, uploaded the SDK 3 firmware, the stick re-enumerated as `a69c:8d81 AIC 8800D80`, the Wi-Fi
  module created `wlan0` (HT, VHT and HE, channels 1-14 and 36-165, 18 dBm), NetworkManager lists it, and a scan
  shows the owner's network on both bands (channel 7 and channel 48). Connection (owner, 17-10-2026): the first
  attempt failed with status 53 on every try, which NetworkManager shows as a password prompt: the router offers
  WPA2 and WPA3 on 5 GHz, NetworkManager chose WPA3 (SAE) and the stick's firmware does not do SAE. With the
  profile set to WPA2 (`wifi-sec.key-mgmt wpa-psk`) it connected at once: 5 GHz, 80 MHz, HE, -44 dBm, 540 Mbit/s
  link rate, 200 Mbit/s downloaded from the internet, 8 ms to 1.1.1.1 without loss. So: WPA2 only with this
  driver; an app sets that on the profile or says so. Decided by the owner (17-10-2026): a suite app, the modules
  under /var with a boot service (no reboot ever needed; the RPM route of the shenmintao `bazzite/` spec needs a
  reboot per kernel update), both branches with the choice made from the chip's answer. Built (17-10-2026):
  `apps/usb-wifi` (**BC-250 USB Wi-Fi**, `changes_board = true`): `stick.py` (the stick's three USB modes from
  /sys, the interface, the loaded modules, the chip's answer from `journalctl -k` across boots, with a wedged
  stick's `chip_id=0` ignored, the build tree and the tools), `builder.py` (the pinned commits of
  `shenmintao/aic8800d80` main and legacy-mcu1 fetched shallowly by hash, the make line, the output laid out with
  the firmware's self link), `driver.py` (the root helper and the service: install copies the build and the
  sources to /var/lib/bc250-usb-wifi, writes the eject rule and the unit, and starts the service; `load` builds for
  a kernel without modules, insmods with `aic_fw_path`, ejects a stick in storage mode and writes
  /run/bc250-usb-wifi/state.json, with a desktop notification on a rebuild), the window (the four boxes, the branch
  choice, Build with the output shown, Install/Update/Remove through pkexec, what the service did), tests (the
  owner's stick and log lines as fixtures), installer and installer test, CI, portal card, Dependency Checker (the
  tools gcc, make, git, kmod, eject, udevadm are new in the catalogue), wiki chapter, README, CLAUDE.md. The icon
  is a placeholder in core's purple (a Wi-Fi fan and a USB plug) until the owner draws the frame art. A finding
  while testing (17-10-2026): the helper's `main()` must hand the module's `run` on by name, or a test that calls
  `main()` reaches the real systemctl (the owner got a polkit prompt once; nothing was changed on the board).
  Safeguards for the build (owner, 17-10-2026, asked after the licence and stability questions): the sources are
  fetched from a mirror `RobertoTorino/aic8800d80` first, from `shenmintao/aic8800d80` when the mirror does not
  answer (the window says so and goes on), so a vanished upstream stops no fresh install (a board that built once
  rebuilds from the kept copy under /var anyway); and "Newest sources (untested)" fetches the branch head instead
  of the pin, for a new kernel the pinned build fails on before a release moves the pin, the installed driver then
  marked as newest. The mirror makes the owner a redistributor of the GPL-2 code (allowed) and of AICSemi's
  firmware files (the grey area every fork of that repository shares; the suite itself still ships none of it).
  Not chosen: a weekly watch on the pins in `tools/check_upstream.py`. Open: the fork itself (owner: Fork on
  GitHub, or `gh repo fork shenmintao/aic8800d80 --clone=false`; until it exists the app falls back to upstream);
  on the board, the app from the checkout (Build, then Install with the password, `wlan0` after the service
  started, and after a reboot; a stick plugged in while in storage mode switched by the rule; Remove), and the
  rebuild at the next kernel update; the portal/VERSION minor bump for the new card and the first release (owner).
  The alternative stays for other users: a stick whose driver is in the kernel (MediaTek MT7921AU, MT7612U,
  Realtek RTL8821CU/8822BU), which also does WPA3. Wi-Fi checks (owner, 19-10-2026: a test in check and the same
  check in the app's window; check only reads): `core/bc250_core/wifi.py` lists every Wi-Fi adapter (USB or PCIe)
  and whether the running kernel has a driver and firmware for it (modules.dep, modules.alias, this boot's kernel
  log), rfkill and the connection; check's test 53 (Wi-Fi Adapter, Network) runs it with the system python and adds
  the USB Wi-Fi service's state, the USB Wi-Fi window shows it as Wi-Fi adapters. Tried on the owner's board
  (19-10-2026, the stick in storage mode, the driver not installed): both report the AIC8800D80 in storage mode.
  Open: test 53 on the board as root with the driver installed and `wlan0` connected; the check, wdriver and core
  releases (owner).
- **PS1 emulator manager with DuckStation (`stenzek/duckstation`): investigated, not built (owner, 16-10-2026:
  the licence rules it out).** Technically it fits the PCSX2 Manager's pattern: an x86-64 AppImage with a SHA-256
  per asset on numbered releases (`v0.1-11894`, 12-09-2026; `latest` and `preview` are moving tags), Vulkan, a PS1
  or PS2 BIOS. But since September 2024 it is CC BY-NC-ND 4.0: no modified versions, and its README counts
  "pre-configured settings and packages" as modifications; its developer has said packaging is not permitted at all
  and removed their own Arch package script in August 2025. A manager that downloads the unmodified AppImage could
  arguably stay within it, but no settings for the BC-250 and no reuse of its code, and the developer's stance makes
  it a grey area the suite does not take on.

Investigated 16-10-2026 (owner's question: an app out there that could be ported to Bazzite or the BC-250); the order
below is the owner's (16-10-2026): mymc++ now, Vita3K when it is finished, fan control last. Observation from the
repository as it stands: the Gaming section covers the PSP, PS2, PS3 and PS4 with emulator managers built one way (a
pinned, checksummed release, the games found, Game Mode shortcuts), so a new emulator manager is mostly reuse; on the
board side the one gap MIGRATION.md itself names is the fan (Known issues: Governor performance mode runs hot).
Things already decided against were left out (the Bluetooth helper, the exploit host, a Sunshine setup app).

- **1. PS2 memory cards in the PCSX2 Manager: a port of mymc++ (owner 16-10-2026: started; built 16-10-2026).**
  `github.com/Adubbz/mymcplusplus`, GPL-3.0-or-later, Python, a command line and an optional wxPython window; active
  (last commit 28-07-2026, 3.2.0), 14 open issues. Decided by the owner (16-10-2026): the window lists the saves and
  imports (.max, .psu, .sps, .xps, .cbs, .psv), exports (.psu, .max), deletes, copies between cards, makes a new
  card, formats and checks; the save's 3D icon as a still picture; the card code kept at a pinned commit; a dated
  backup beside the card before every change, and no writes while PCSX2 runs. Built: the card code kept in
  bc250_pcsx2_manager/mymc at commit 3247c9c0afac (every changed line marked bc250:, the fixes for its issues #11 and
  #26 among them), memcards.py (the changes made on a copy that takes the card's place, the space counted first),
  memcard_icon.py (the icon drawn in Python; against mymc++'s own OpenGL viewer: mean difference 1.4 of 255) and the
  Memory cards window, its button in the main window; mymc++'s own test data and checksums in the tests (every import
  format, export, delete and format give the card mymc++'s tests expect). Choices of Claude's for the owner to
  confirm or change: the newest 10 backups kept per card; new cards of 8, 16, 32 and 64 MB offered (PCSX2's sizes), a
  .mc2 name for a card without ECC. Open: on the board, the window with PCSX2's own cards (a card PCSX2 made and
  formatted, a save imported and loaded in a game, PCSX2 running refused), a new 16 MB card in PCSX2; the release of
  the PCSX2 Manager (owner).
- **2. PS Vita emulator manager: Vita3K (owner 16-10-2026: after mymc++ is finished; started 16-10-2026, built
  16-10-2026 as vita3k-manager, Vita3K Manager).** Completes the PlayStation line. Vita3K (`github.com/Vita3K/Vita3K`)
  is GPL-2.0 (dictated by Unicorn, its CPU emulator); the manager only downloads it, as the other managers do.
  Decided by the owner (16-10-2026): games are installed from the app (a `.pkg` with its zRIF, a `.vpk`, `.zip` or
  dumped folder). Built as the RPCS3 Manager is (window, wrapper, installer, tests, installer test), in Vita3K's
  crimson #BD1550. Pinned: build 4186 (0.2.1, commit f0273e4c, 16-10-2026), `Vita3K-x86_64.AppImage` from the
  Vita3K-builds release `4186`, SHA-256 `1be29192…a06a` (GitHub's asset digest, checked on a download), 78 489 697
  bytes; the newer-build notice reads Vita3K-builds' latest release (its tag is the number, which core's
  latest_release does not read). Facts from its source at that build: settings in `$XDG_CONFIG_HOME/Vita3K`
  (`config.yml`, flat YAML; `pref-path` moves the storage), the storage ("Vita FS") in
  `$XDG_DATA_HOME/Vita3K/Vita3K`, games in its `ux0/app/<title ID>` (`eboot.bin`, `sce_sys/param.sfo`, `icon0.png`,
  `pic0.png`), started with `-r <title ID>`; `--frontend sdl` (new 08-10-2026, shared with Android) is a plain window
  that runs the game and quits with it, so the Steam shortcuts use it; `--fullscreen` is left out, as Vita3K writes
  it into config.yml (`boot-apps-full-screen`) for its own window too; `--firmware`, `--pkg`/`--zrif` install
  without a window and quit, a `.vpk`/`.zip`/folder as the positional argument installs and then boots the game.
  The firmware is three Sony files, each `PSP2UPDAT.PUP`: the system software (vs0, os0), the font package (sa0),
  the optional preinstalled apps (pd0); Vita3K counts a part as installed when its folder holds anything, and exits
  0 on a file it cannot use (the app looks at what was written). Vita3K's own updater only links to its download
  page; the AppImage (anylinux, sharun) carries a self-updater hook (`bin/10-self-updater.hook`: asks from the
  second start, then overwrites itself with the newest continuous build through appimageupdatetool), which the
  wrapper turns off with `DISABLE_AUTO_UPDATES=1` (checked with the real AppImage: no update policy written); the
  size check stays for an AppImage started some other way. Checked on this machine with the real build: the
  wrapper's `--version`, `--firmware` on a junk file, `-r` with an unknown and a known ID. Choices of Claude's for the
  owner to confirm or change: the SDL frontend for Game Mode and Play, the zRIF asked in a text box, the firmware
  box showing Ready/Partly. Not tried on the board: everything (Install, the firmware's three files, a game from
  each kind of dump, Play, Game Mode: does Game Mode's compositor show the 960 × 544 SDL window full screen, Exit
  game; performance with Vulkan through RADV on gfx1013; the controller under Steam and the overlay on the
  desktop). On the desktop the SDL window is not full screen (Vita3K's SDL frontend has no full screen option at
  this build). Release (owner): `vita3k-manager-v0.1.0` and a portal minor bump (a new card); until then `apps.toml`
  pins it without sha256.
- **A code path to check in the PPSSPP Manager (found 16-10-2026 while building the Vita3K Manager).** The pinned
  `PPSSPP-v1.20.4-anylinux-x86_64.AppImage` carries the same self-updater hook (`bin/self-updater.hook`, honouring
  `DISABLE_AUTO_UPDATES=1`), while emulator.py says PPSSPP does not update itself on Linux and the wrapper does not
  turn it off. Not seen on the board yet: whether its question appears from the second start and what Install shows
  after an update. The PCSX2 2.8.2 AppImage has no such hook. The fix would be the Vita3K Manager's (the variable in
  the wrapper, the size check), the owner's call.
- **3. Fan control and a thermal guard (the board's gap; owner 16-10-2026: last, the guard first, PWM only after the
  sensor check on the board, which needs the owner at the board).** Answers the known issue above (no app controls
  the fan; the Governor's alerts only while it runs). From mothenjoyer69's bc250-documentation: `CPU_FAN1` is a
  normal 4-pin PWM header (J4003 carries PWM and tachometer lines for fans 2 to 5, without power); the SuperIO is an
  NCT6686 (ID 0xd441), seen by lm-sensors only after `modprobe nct6683 force=true`. Mainline nct6683 reads, it does
  not set the fans. Writing PWM needs another driver: Fred78290/nct6687d (pwm1-8 with manual and firmware modes; DKMS
  and an akmod) documents the NCT6687-R only, so whether it drives the 6686 is the first thing to find on the board.
  A kernel module means the same build-per-kernel and Secure Boot work as the AIC8800 item above. The other route:
  Bazzite installs CoolerControl (`ujust install-coolercontrol`, then `coolercontrold` enabled); the app could check
  for it and add what is the BC-250's (the guard below, the sensor setup) rather than a fan curve editor of its own.
  The guard as proposed in Known issues: watch GPU and CPU temperatures in the background, warn, leave performance
  mode, and shut down cleanly at a critical limit (limits the owner's; the shutdown is an exception to Advice, not
  reboots, owner 16-10-2026). Does nothing for a fan powered from the PSU
  (the app says so). `changes_board = true`. Sensor check on the owner's board (16-10-2026): the Bazzite image
  ships `kmod-nct6687d` (Fred78290's driver, signed for the running kernel), so no DKMS, akmod or Secure Boot work;
  `/etc/modprobe.d/bc250-sensors.conf` (`options nct6687 force=true`, `blacklist nct6683`) and
  `/etc/modules-load.d/bc250-sensors.conf` load it at boot. It binds the NCT6686 as `nct6686` with `pwm1-8` and
  `pwmN_enable` (root-writable; 1-5 in firmware mode `2` at pwm 127, 6-8 manual at 0), fan1-8 and temp1-7
  (CPU, System, VRM MOS read; PCH, CPU Socket, PCIe x1, M2_1 read 0). The labels are the driver's MSI mapping.
  One fan turns: fan2 ("Pump Fan") at 1166 RPM, fan1 ("CPU Fan") reads 0. amdgpu `edge` and k10temp `Tctl` read,
  neither has a crit value, so the guard sets its own limits. Write test (16-10-2026, sudo, every channel set
  manual `1`, then 255, 90 and its old value, then back to `2`): fan2 follows, 2051 RPM at 255, 1152 at 127, 861
  at 90, and 1170 again in firmware mode; channels 1, 3-5 take the writes and read back, with no fan on them.
  The owner's fan: one Noctua NF-A12x25 PWM (about 450-2000 RPM) on CPU_FAN1, blowing into the heatsink. So
  BIOS fan 1 = CPU_FAN1 = Linux fan2/pwm2, as mothenjoyer69's table says. No Y splitter (owner 16-10-2026: it
  hides the second fan's RPM); a second fan goes on J4003 (the 2x8 2.54 mm header beside CPU_FAN1, signals only:
  `F2P`/`F2T` = Linux fan3) with 12 V from the PSU; whether J4003 reads RPM (a tach pull-up) and drives PWM is
  untested. Limits found (no AMD figure for the BC-250; community docs): GPU edge throttles about 85 °C, unstable
  90-95 °C; CPU Tctl 90-95 °C; the Governor's default throttle is 85 °C. Decided (owner 16-10-2026): a new app,
  `apps/fan-control` (**BC-250 Fan Control**, `changes_board = true`); limits on the hotter of GPU edge and CPU Tctl:
  warn 85 °C (re-arm 80), cool at 90 °C (fans to full speed, performance mode off), shut down at 95 °C held for 10 s;
  iterations: (1) the guard and a read-only window, (2) a fan curve for pwm2 (firmware mode the default, with undo).
  Iteration 1 built (16-10-2026): `guard.py` (stdlib, root; installed in /etc through pkexec as
  `bc250-fan-control-guard.service`, state in /run/bc250-fan-control/state.json, notifications through `runuser` and
  `notify-send` on each user's session bus), the window, tests, installer and installer test, CI, portal card,
  Dependency Checker, wiki chapter; icon with the fan symbol of the icon proof of concept (since removed). NVMe is
  not in the guard (its own limits stay with Bazzite Test). Open: the portal/VERSION minor bump for the new card and a release (owner); on the board:
  Turn on (the pkexec path, SELinux on /etc/bc250-fan-control), a notification on the desktop and in Game Mode,
  a cooling test without a real overheat (limits set low, e.g. 60/62/95 with a stress run: the fan goes to 2000 RPM
  and back, performance mode off), and that the shutdown fires (limits lowered so it does, with nothing open).
- **Frame generation beside HelixSR: lsfg-vk (dropped, owner 16-10-2026).** CC BY-NC-ND 4.0 since 27-08-2026 (before:
  MIT/GPLv3), its source self-hosted, builds as a tarball from builds.lsfg-vk.dev. The developer allows use and
  reuploads but no derivatives, and wants integrations agreed with them first; the owner does not take on a project
  kept under such guard.
- **Power adapter information (on hold, owner 19-10-2026).** What can be read from the FSP500-30AS. As far as known
  it has no data interface (no PMBus or USB), so nothing can be read from the adapter itself; to check against its
  datasheet. What the board reports (amdgpu's power and voltages, hwmon sensors) is readable: run `sensors` on the
  board to see what is there.
- **SSD health check (on hold, owner 19-10-2026).** Much simpler than CrystalDiskInfo: only the health percentage,
  the power cycle count and the power-on hours. Through udisks2 over D-Bus, which reads SMART without root (the board
  has no passwordless sudo). NVMe gives all three (health = 100 - "percentage used"); a SATA SSD gives the hours and
  cycles, but its health attribute differs per vendor, so an unknown drive shows "health not reported". "Start/stop
  cycles" is a hard-disk attribute; for an SSD it is the power cycle count. Utilities category.

## Details for later steps

From the original proposal (not in the repository).

**Step 5:** governor's update checker tracks the *upstream* `cyan-skillfish-governor` releases; helixsr checks
itself and the HelixSR payload. Core supplies the mechanism (`bc250_core.updates`); what is checked stays in each
app. Settings files must not move: governor and helixsr use `QSettings(APP_ID, APP_ID)` (`settings_org`/
`settings_app` default to the app id).

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

Names (owner's decision, 14-10-2026, with an eye to other devices such as the ROG Ally X): the apps tied to the
board keep "BC-250" in their names (bazzite-test, governor, cu-bisect, cores-bisect, gpu-oc-bisect, persistent-acpi,
bios-reader, memory-manager, ace-queues, mesh-shaders); the others drop the prefix (HelixSR Manager, System Overlay,
HDMI CEC Manager (owner's name), Bazzite SFTP Tools, Console Link, shadPS4 Manager, RPCS3 Manager, Decky Loader
Manager; Dependency Checker, Bazzite pkgxtractor and Simple Demo Tool never had it). Only the display names changed:
app IDs, launchers, packages, settings folders, and the files hdmi-cec writes keep `bc250`, so nothing installed
moves. The Steam shortcut tags take the new names (owner, 14-10-2026): shadps4-manager brings an old shortcut up to
date with Update Game Mode, console-link with Update in Game Mode. An app's identifiers move (with an old-ID
fallback, as console-link's `OLD_APP_ID`) only when it is ported, together with its hardware code paths.

Media licenses (owner's decision, 22-10-2026): the icons (a generative AI base, edited by hand in Photoshop) and the sounds (generative AI) stay under the
license of the folder they are in, like the code: no separate or proprietary license for media, consistent with
"open by default". The README, the wiki's Home page and CONTRIBUTING.md say so.

No translations (owner's decision, 15-10-2026): every app is English only, Qt's own dialog buttons included. The
`.ts`/`.qm` files, the language pickers, `--lang`, the i18n tools and tests, core's translator loading and every
`tr()` are gone: too much work to keep in sync for little value, as the users read English and translation tools
exist. A language saved in an app's settings before is ignored.
