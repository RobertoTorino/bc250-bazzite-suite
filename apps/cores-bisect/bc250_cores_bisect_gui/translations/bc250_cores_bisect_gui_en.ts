<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1">
<context>
    <name>AboutDialog</name>
    <message>
        <location filename="../widgets.py" line="19"/>
        <source>about</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="33"/>
        <source>Version {0}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="39"/>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="50"/>
        <source>License: GNU GPLv3.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <location filename="../widgets.py" line="63"/>
        <source>help</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="87"/>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../main_window.py" line="65"/>
        <source>Help</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="69"/>
        <source>About</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="75"/>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="88"/>
        <source>Load per attempt (seconds):</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94"/>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="99"/>
        <source>Rounds per item:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="104"/>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="110"/>
        <source>Load tool:</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="114"/>
        <source>stress-ng --verify (default)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="115"/>
        <source>mprime torture test</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="116"/>
        <source>both (stress-ng, then mprime)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="121"/>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="129"/>
        <source>Also count hardware errors with rasdaemon</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="131"/>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="137"/>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="139"/>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="145"/>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="147"/>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="154"/>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="156"/>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="168"/>
        <source>Reset</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="170"/>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="179"/>
        <source>Show status (--status)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="180"/>
        <source>Show the results so far and write the report, then exit.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="184"/>
        <source>Start Cores Bisect</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="216"/>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="220"/>
        <source>, reboots included</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="251"/>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="253"/>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="270"/>
        <source>Start bc250-cores-bisect.sh with:

  load time: {t}s
  rounds: {r}
  load tool: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  unattended: {au}

This window will close and the run continues in a terminal.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="285"/>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
</TS>
