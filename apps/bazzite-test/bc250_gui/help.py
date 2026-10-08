# SPDX-License-Identifier: GPL-3.0-or-later
"""Help content, shown in Settings > Help."""

from __future__ import annotations

import html

from PyQt6.QtWidgets import QWidget

from bc250_core.help import HelpView as CoreHelpView

from . import APP_NAME, __version__
from .catalog import BENCH_TEST_ID, CATEGORIES, DISK_TEST_ID, SPEEDTEST_TEST_ID, STRESS_TEST_ID
from .dashboard import SCORE_WEIGHT
from .logstore import log_dir
from .runner import WARNING


def _tests_html() -> str:
    parts = []
    for cat in CATEGORIES:
        rows = "".join(
            f"<tr><td><b>{t.id}</b></td><td>{html.escape(t.name)}</td><td>{html.escape(t.checks)}</td></tr>"
            for t in cat.tests
        )
        parts.append(f"<h3>{html.escape(cat.title)}</h3>"
                     f"<table cellpadding='4' cellspacing='0' border='1' width='100%'>"
                     f"<tr><th>#</th><th>Test</th><th>Checks</th></tr>{rows}</table>")
    return "".join(parts)


def help_html() -> str:
    warn_pct = int(SCORE_WEIGHT[WARNING] * 100)
    return f"""
<h1>{APP_NAME} <small>v{__version__}</small></h1>
<p>Read-only diagnostics for an
<b>AMD BC-250</b> (Cyan Skillfish APU, gfx1013) running <b>Bazzite</b>. Nothing is installed,
enabled or reconfigured. The only exception is the opt-in stress test, which deliberately
puts the board under load.</p>

<h2>Starting the app</h2>
<p>Start <b>{APP_NAME}</b> from the application menu. Click <b>Run all tests</b>, or open a category on the left
and click a single test. Results appear in the terminal of that page, hints in the panel next to it, and the
counters at the top give the overall picture.</p>

<h2>The main window</h2>
<ul>
<li><b>Title</b> — app name and version.</li>
<li><b>Base System</b> / <b>Extended System</b> (light) — the last two boxes: your hardware against a stock
BC-250 on BIOS 5.00, set up as recommended, which scores exactly 100. Hardware (55): GPU CUs 20 (default 24, evenly
distributed), CPU 15 (6 cores/12 threads), NVMe read speed 10 (850 MB/s, test 43), NVMe capacity 5 (512 GB) and
wired network link 5 (1 Gbit/s). Configuration (45): BIOS 5 (5.00), ACPI fix 10, VRAM split 10 (6 GB), CPU
mitigations off 5, IOMMU disabled 5, swap 5 (zswap with a disk swapfile; zram scores less) and health score 5 (100%). Below a default costs points in both scores; above
it adds points only to the Extended score, so the Base score never exceeds 100 (an older BIOS can never reach it).
Unevenly distributed CUs count as the even configuration below them, with a warning. Click a score for the breakdown.</li>
<li><b>Stats toolbar</b> — <i>Tests</i> available, <i>Finished</i> (tests with a result in the history),
<span style='color:#2e7d32'><b>Passed</b></span>,
<span style='color:#ef6c00'><b>Warnings</b></span>,
<span style='color:#c62828'><b>Failures</b></span> and
<span style='color:#1565c0'><b>Info / hints</b></span>. Each box counts the latest result of every test over all runs, also after a restart (see <i>History</i>). The test buttons show that result too; their tooltip has its date. Click <b>Warnings</b>, <b>Failures</b> or <b>Info / hints</b> to see what is behind the number: per test the WARNING, ERROR or INFO lines and the hints, read from the log of that result. Click a test name to open its page, or <i>Show in log</i> to open the run log at that test.</li>
<li><b>Health score</b> — passed and info tests count 100%, warnings {warn_pct}%, failures 0%,
averaged over the tests that ran. Green at 90% and above, orange from 70%, red below.</li>
<li><b>CPU score</b> (purple) / <b>GPU score</b> (blue) — the last performance benchmark (test {BENCH_TEST_ID}), where 100 is
your board in its stock configuration. Hover for details.</li>
<li><b>Status bar</b> (bottom right) — live values, updated every 2 s:
<ul>
<li><b>CPU / GPU</b> — whole-system load. The GPU load comes from the kernel sensor, the governor's patched
<code>gpu_metrics</code> (fix-metrics on) or the GPU time of your processes; hover to see which, and what a sample costs.</li>
<li><b>🎮 Game</b> — shown while a game runs: its name (from Steam, or the game's .exe), the share of the CPU and
GPU it uses and, with MangoHud logging on, its FPS.</li>
<li><b>↓ / ↑ network</b> — current download and upload traffic over the wired and Wi-Fi interfaces, from
the byte counters in <code>/proc/net/dev</code> (one small file per sample).</li>
<li><b>Hz</b> — refresh rate of the display the app is on.</li>
<li><b>Live</b> — switch it off to stop sampling entirely. It also pauses while the window is minimised.</li>
</ul>
It only reads a few files from <code>/proc</code> and <code>/sys</code> (about 1 ms per sample, a full process scan every
10 s), and slows down by itself if sampling ever gets expensive, so it is safe to keep running while playing.</li>
<li><b>Navigation</b> (left) — the Overview, one page per test category, the History (see below), the Readme (the user guide, formatted)
and <b>Settings</b>.</li>
<li><b>Settings</b> — opens a panel over the window (close it with ✕, Esc or a click outside):
<i>Privacy</i> (what is stored and sent, history and log masking options, admin privileges),
<i>General</i> (language, notifications and this help), <i>System overview</i> (BIOS version, CUs, cores, threads, speed test, NVMe size,
free space and package count at a glance), <i>Logs &amp; history</i> (clean up logs) and <i>About</i>
(version, build date, repository).</li>
</ul>

<h2>Running tests</h2>
<ul>
<li><b>Run all tests</b> (Overview) — every passive test, 00–40. The stress test is added only when
<i>Include stress test</i> is ticked. The benchmark ({BENCH_TEST_ID}), the disk speed test ({DISK_TEST_ID}) and the internet speed test
({SPEEDTEST_TEST_ID}) are never included; run them from the Performance, Storage and Network pages.</li>
<li><b>Run all &lt;category&gt; tests</b> — every test on that page.</li>
<li><b>A test button</b> — runs just that test.</li>
<li><b>Stop</b> — stops the current run. The tests first end their CPU/GPU load and remove their temporary
files. The test that was running goes back to not-run.</li>
</ul>
<p>Only one run happens at a time; the buttons are disabled while it runs. The run button shows the progress
(tests done out of the total) and, during the stress test, the time left.</p>
<p>Closing the window during a run asks first, then stops the tests the same way before the app quits.
When a run of a minute or more finishes while you're in another window, a desktop notification shows the
result (switch it off in <i>Settings → General</i>).</p>
<p>The app remembers its window size, the last page, the panel sizes and the stress duration and sample
interval.</p>

<h3>Button colours</h3>
<table cellpadding='4'>
<tr><td style='background:#3a3f4b;color:white'>&nbsp;grey&nbsp;</td><td>not run yet</td></tr>
<tr><td style='background:#fdd835'>&nbsp;yellow&nbsp;</td><td>running</td></tr>
<tr><td style='background:#2e7d32;color:white'>&nbsp;green&nbsp;</td><td>passed</td></tr>
<tr><td style='background:#ef6c00;color:white'>&nbsp;orange&nbsp;</td><td>at least one warning</td></tr>
<tr><td style='background:#c62828;color:white'>&nbsp;red&nbsp;</td><td>at least one error</td></tr>
<tr><td style='background:#1565c0;color:white'>&nbsp;blue&nbsp;</td><td>informational only, nothing to judge</td></tr>
</table>
<p>A test takes the colour of the worst line it logged (error &gt; warning &gt; success &gt; info).</p>

<h3>Output and hints</h3>
<p>Output streams into the terminal on the page you started the run from, and also on the page of
each test's own category. <b>Hints</b> — suggested fixes (⚠) and background notes (ℹ) — are collected
in the panel next to it.</p>

<h2>Administrator password</h2>
<p>Most checks read root-only logs and sysfs, so the tests run through <code>sudo</code>. When sudo
needs a password, a masked prompt appears. The password goes straight to sudo's input and is never
stored or logged. sudo remembers it for its usual timeout, so you are not asked for every test.
<i>Settings › Privacy</i> can turn sudo off (fewer checks, never a password) or make sudo forget the
authentication right away.</p>

<h2>Logs</h2>
<p>Every run is saved as <code>&lt;YYYYmmdd-HHMMSS&gt;_&lt;scope&gt;.log</code> in<br>
<code>{html.escape(str(log_dir()))}</code><br>
<b>Show Logs</b> on a page lists that page's runs; <i>Show all logs</i> lists every run. Logs are coloured like the
live output (WARNING orange, ERROR red, HINT purple, …). Every run also
writes a full report to <code>/var/log/bc250-bazzite-test/bc250-test-results-&lt;timestamp&gt;.log</code>.
With <i>Mask personal data in saved GUI logs</i> on (the default, Settings › Privacy), host and user name,
home folder, serial numbers, MAC/IP addresses and the speed test's ISP and result URL are replaced by
placeholders in these files; the terminal shows everything.</p>
<p>Below the list of runs, <b>Files mentioned in this run</b> lists every log, CSV and config file the
selected run refers to (the full report, the stress CSV, the GPU load tool log, the governor
config, ...). Click one to read it in the viewer. A warning icon means the file is not on this machine;
very large files show their last 2 MiB; root-only files show the <code>sudo less</code> command to use instead.
When the file is a CSV, <b>Show graph</b> plots it.</p>

<h2>History</h2>
<p>Every result is stored in a small SQLite database, <code>{html.escape(str(log_dir().parent / 'history.db'))}</code>:
per run the date, scope, active CUs and cores/threads (kernel version and mitigation state only when
turned on in Settings › Privacy); per test the status and number
of hints; and the numbers worth comparing (benchmark scores, stress clocks/temperatures/power, disk and
internet speeds). Full reports not in the history yet (in <code>/var/log/bc250-bazzite-test</code>
and the Desktop folder) are imported automatically at startup; each report is imported once. The database
only grows by a few KB per run and is read once per finished test, so it has no effect on performance.
The history and the logs are readable by your user only. The history is checked each time the app starts;
if it is damaged or was changed outside the app, it is kept aside as <code>history.db.damaged-&lt;date&gt;</code>
and a new, empty history is started.</p>

<h2>Integrity of the tests</h2>
<p>Before every run the app checks that the test files are exactly the ones that came with this version
and that only an administrator can change them. If not, no tests are run (they could otherwise run
with administrator rights) and a red bar at the top says so: reinstall the app.</p>

<h2>History page</h2>
<p>Every run with its date, what ran, the result counts, health score and configuration (CUs, cores). Use
<b>From</b> / <b>to</b> to pick the dates (the calendar opens with the arrow); <b>All dates</b> shows everything again.</p>
<ul>
<li><b>One run selected</b> — its results per category, the measurements (benchmark scores, stress clocks and
temperatures, disk and internet speeds) and the files it wrote. <b>Show logs</b> opens its log and full report.
Click a test name to open its page.</li>
<li><b>Two runs selected</b> (Ctrl-click or Shift-click) — side by side, the older run on the left:
the counts and configuration, the tests whose result changed (better or worse) and every measurement with
the difference. <span style='color:#2e7d32'>Green</span> is better, <span style='color:#c62828'>red</span> is
worse, differences under 2% count as the same (normal measurement noise). Untick <i>Only differences</i> to
see every test.</li>
</ul>
<p>Typical use: run everything and the benchmark, change something (CU unlock, BIOS, kernel, governor), run
them again, and compare the two runs.</p>

<h2>Clean up logs</h2>
<p><b>Settings › Logs &amp; history › Clean up logs…</b> removes either the run logs older than N days (default 30)
or <b>all</b> logs. The dialog shows what will be removed before anything happens. Old-log cleanup keeps
the results in the history; <i>Remove ALL</i> also empties the history for a fresh start. The full
reports are owned by root, so removing them asks for your password (masked, never stored).
<code>bench-baseline.json</code> and the benchmark and speed test history CSVs are always kept.</p>

<h2>Graphs</h2>
<p><b>Show graph</b> opens a chart window for the CSV files the tests write:</p>
<ul>
<li><b>Stress telemetry</b> (next to the stress settings) — the latest stress run as panels for clocks, temperatures,
GPU busy, GPU power, GPU memory, fan, GPU voltage and load average, with the peaks summarised on top. Older runs
can be picked from the <i>File</i> list. A clock that drops while the temperature climbs is thermal throttling; a
line that simply stops is the moment the board froze.</li>
<li><b>Benchmark history</b> (Performance page) — bar charts per run: scores against the baseline, GPU FP32,
CPU multi- and single-thread, VRAM bandwidth and GPU clock. Bars are labelled <i>#run CUs threads</i>; hover for the
date, mitigations and kernel.</li>
<li><b>Any CSV</b> in Show Logs — one panel per numeric column.</li>
</ul>
<p>Drag a rectangle to zoom in, right-click to zoom out, hover a line for its value. <i>Save as PNG</i> saves all
panels as one image. Graphs need the <code>PyQt6-Charts</code> package (in <code>requirements.txt</code>).</p>

<h2>Stress test (test {STRESS_TEST_ID})</h2>
<p>Loads all CPU threads (<code>stress-ng</code>, or shell busy-loops) and the GPU (<code>memtest_vulkan</code>, which
also checks the VRAM for errors and is recommended, or <code>vkpeak</code>, <code>vkmark</code>, <code>glmark2</code>,
<code>vkcube</code>) while sampling clocks, GPU busy, VRAM/GTT, temperatures,
power, voltage, fan speed and load. It then reports minimum/average/maximum values, checks the GPU was
really loaded and the clock responded, and scans the kernel log for hangs, panics, throttling and
out-of-memory events during the run.</p>
<ul>
<li><b>Stress duration</b> — how long the load runs (10–3600 s, default 120).</li>
<li><b>Sample interval</b> — seconds between telemetry samples (default 2).</li>
<li>Telemetry is written to <code>/var/log/bc250-bazzite-test/bc250-stress-&lt;timestamp&gt;.csv</code>;
<b>Show graph</b> plots it.</li>
</ul>
<p><b>Warning:</b> this is a deliberate attempt to reproduce under-load lockups. The system is sluggish
while it runs and may freeze outright. If it does, note the last telemetry line: that is the board's
final operating point. You are asked to confirm before it starts.</p>

<h2>Performance benchmark (test {BENCH_TEST_ID})</h2>
<p>Runs fixed workloads so configurations can be compared: <code>stress-ng</code> matrixprod on one thread and
on all threads (CPU), then <code>vkpeak</code> FP32 compute and VRAM copy (GPU). Scores are 100 &times; result /
baseline. The <b>CPU score</b> is multi-thread (it shows a core unlock); the <b>GPU score</b> is FP32 compute,
which grows with CUs &times; clock (it shows a CU unlock). The log also shows the theoretical FP32 peak for the
detected CU count and clock; a result far below it means unlocked CUs are not doing work.</p>
<ul>
<li><b>Baseline</b> — put the board in its stock configuration (24 CUs, 6C/12T, governor max 1850 MHz), tick
<i>Save as baseline</i> and run the benchmark once. It is saved as
<code>/var/log/bc250-bazzite-test/bench-baseline.json</code>, one baseline for the whole system. A baseline
saved by an older version is moved there on the next benchmark run.</li>
<li><b>CPU time per phase</b> — seconds per stress-ng phase (default 20). Keep it the same between runs you compare.</li>
<li><b>Benchmark history</b> — every run with its configuration and scores against the current baseline;
<b>Show graph</b> shows the same runs as bar charts.</li>
<li>Close games and other heavy apps first. Needs <code>stress-ng</code> and <code>vkpeak</code> (see README).</li>
</ul>

<h2>NVMe checks (test 10) and disk speed test (test {DISK_TEST_ID})</h2>
<p><b>Test 10</b> checks every NVMe drive:</p>
<ul>
<li><b>PCIe link</b> — the speed and width it runs at, compared with what the drive and the slot
support. It is a warning when the link runs slower than both support, which usually means a poor
contact.</li>
<li><b>DRAM cache</b> — DRAM-less drives ask for a <i>Host Memory Buffer</i> taken from system RAM.</li>
<li><b>SMART health</b> — wear, media errors, spare blocks, temperature, minutes spent throttling, and
unsafe shutdowns (every hard lockup counts).</li>
</ul>
<p>Test 10 needs <code>nvme-cli</code> or <code>smartmontools</code> for DRAM detection and SMART
health.</p>
<p><b>Test {DISK_TEST_ID}</b> is opt-in and measures the system disk. With the tick box off it only
reads:</p>
<ul>
<li>4 GiB sequential read;</li>
<li>random 4K reads at queue depth 1 and 32 (needs a system-wide <code>fio</code>: <code>rpm-ostree install fio</code>; a Homebrew fio is not run as root).</li>
</ul>
<p>With <b>also test writes</b> ticked:</p>
<ul>
<li>It writes <i>Write size</i> GiB to a temporary file in <code>/var/tmp</code>, which is deleted
afterwards. It needs that much space plus 5 GiB free.</li>
<li>It records the speed and drive temperature for every 256 MiB, so you can see where the fast SLC
cache runs out. <b>Show graph</b> plots it.</li>
<li>Choose a size larger than the cache you expect: a few GiB on cheap drives, tens of GiB on large
ones.</li>
<li>A speed drop while the drive is at its warning temperature is reported as thermal throttling
instead.</li>
</ul>

<h2>Internet speed test (test {SPEEDTEST_TEST_ID})</h2>
<p>Opt-in, on the Network page. It runs Ookla's <code>speedtest</code> (or <code>speedtest-cli</code>)
for about 30 s and uses roughly 1 GB of data on a fast line, so skip it on a metered connection.</p>
<ul>
<li><b>Download / upload</b> speed and the <b>idle latency</b> and jitter.</li>
<li><b>Latency under load</b>: when it rises by more than 100 ms while downloading or uploading, the
line has <i>bufferbloat</i> and online games lag whenever something else downloads. Enable SQM
(fq_codel or CAKE) in the router to fix it.</li>
<li><b>Packet loss</b> above 1% is a warning.</li>
<li>The interface used (Ethernet or Wi-Fi) and its link speed: a 100 Mbit/s link on a gigabit port
points to a bad cable.</li>
<li><b>Show graph</b> compares every run from <code>bc250-speedtest-history.csv</code>.</li>
<li>Install: download the Linux x86_64 .tgz from speedtest.net/apps/cli and put <code>speedtest</code>
in <code>~/.local/bin</code>. Tools from <code>~/.local/bin</code> or Homebrew always run as your
user, never as root.</li>
</ul>

<h2>Showing a game's FPS</h2>
<p>The FPS comes from MangoHud's log, which it writes while the game runs. Turn it on once in
<code>~/.config/MangoHud/MangoHud.conf</code>:</p>
<pre>output_folder=/home/&lt;you&gt;/mangohud-logs
autostart_log=1
log_interval=500</pre>
<p>Create the folder, and make sure MangoHud is active for the game (for example the Steam launch option
<code>mangohud %command%</code>). A log file is written per game session; delete old ones now and then. Without
logging the game's name, CPU and GPU share are still shown.</p>

<h2>Recording a game (Game details page)</h2>
<p>The <b>Game details</b> page records a whole play session into a graph: FPS, the game's CPU and GPU share,
total load, GPU and CPU clocks and temperatures, GPU power and voltage, VRAM and GTT, the fan and the free
system memory. Copy the launch line from that page into the game's
<i>Properties → Launch options</i> in Steam — it starts the game unchanged and works together with
<code>mangohud %command%</code> (put both on the same line, this app's line first). Recording and the
sample interval can be set per game; sessions appear on the page after the game closes. During the first
recorded session a screenshot of the game is taken once (about 45 seconds in) and shown on the page. FPS in the
recording needs MangoHud logging, as above. With the <b>Flatpak</b> version of Steam the launch line
cannot reach the app and the game would not start; use the Steam that comes with Bazzite.</p>

<h2>Checks for the last session (Game details page)</h2>
<p>When a game closes, the wrapper writes a small <code>.json</code> next to the session CSV and the page turns
both into short verdicts, so the numbers get a meaning:</p>
<ul>
<li><b>Smoothness</b> — the real 1% and 0.1% lows and the share of frames over twice the median frametime,
read from MangoHud's per-frame log exactly as test 48 does. A 1% low under half the average is the stutter
an average FPS figure hides: usually first-run shader compilation, a full VRAM carve-out or hhd running
(test 27). Without that log only sampled averages exist and smoothness is not judged.</li>
<li><b>What limited the frame rate</b> — GPU-bound (lighter settings gain FPS) against a CPU limit, an FPS
cap or vsync (they would not).</li>
<li><b>Memory headroom</b> — the peak VRAM and GTT use against the carve-out and the free RAM at its
tightest. A full carve-out is what causes the framebuffer pin failures of test 37; bc250_memcfg can raise
it (test 47).</li>
<li><b>Throttling</b> — whether the board sat at its power cap (test 40), how hot the GPU and CPU got, and
whether the GPU clock dropped over a long session, which is what sustained performance really costs.</li>
<li><b>Kernel errors</b> — ring timeouts, GPU resets, VM faults and pin failures the kernel logged while
this game ran (the same families as tests 35 and 37), instead of across all boots.</li>
</ul>
<p>The checks are per session and always describe the newest one; older sessions keep their graphs.</p>

<h2>Tests</h2>
{_tests_html()}
"""


class HelpView(CoreHelpView):
    def __init__(self, parent: QWidget | None = None):
        super().__init__(help_html(), parent)

