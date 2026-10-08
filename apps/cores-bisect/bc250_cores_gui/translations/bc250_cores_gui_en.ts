<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1">
<context>
    <name>AboutDialog</name>
    <message>
        <location filename="../widgets.py" line="58"/>
        <source>about</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="72"/>
        <source>Version {0}</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="78"/>
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="89"/>
        <source>License: GNU GPLv3.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <location filename="../main_window.py" line="50"/>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <location filename="../main_window.py" line="94"/>
        <source>About</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="100"/>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120"/>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="122"/>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124"/>
        <source>Uninstall (stock after next power off)</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="126"/>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="128"/>
        <source>Refresh status</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="129"/>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="131"/>
        <source>Re-check bisect results</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="133"/>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="146"/>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="172"/>
        <source>✔ ACCEPTED</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="175"/>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="193"/>
        <source>Working — installing…</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="194"/>
        <source>Working — uninstalling…</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="195"/>
        <source>Working…</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="204"/>
        <source>sudo: authentication failed.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="213"/>
        <source>Incorrect password, try again.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="224"/>
        <source>({0} finished, exit code {1})</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="227"/>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="254"/>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../main_window.py" line="266"/>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation type="unfinished"></translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="18"/>
        <source>administrator password</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="22"/>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation type="unfinished"></translation>
    </message>
    <message>
        <location filename="../widgets.py" line="34"/>
        <source>sudo password</source>
        <translation type="unfinished"></translation>
    </message>
</context>
</TS>
