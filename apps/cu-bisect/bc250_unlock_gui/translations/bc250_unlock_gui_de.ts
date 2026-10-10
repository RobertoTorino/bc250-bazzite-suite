<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="de">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Info</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Wendet die akzeptierte Maske jetzt an und bei jedem künftigen Start automatisch erneut.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Deaktiviert den Entsperrdienst; das Board kehrt ab dem nächsten Neustart zu den werkseitigen 24 CUs zurück.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Zeigt installierte Masken, Dienststatus und Live-Masken an (kein Root erforderlich).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Liest die von bc250-cu-bisect.sh gespeicherten Ergebnisse erneut ein, z. B. nach einem weiteren Retest.</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>Wird ausgeführt — installiere…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>Wird ausgeführt — deinstalliere…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>Wird ausgeführt…</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Falsches Passwort, bitte erneut versuchen.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Behält eine mit bc250-cu-bisect.sh bereits validierte CU-Freischaltung über Neustarts hinweg bei.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Installieren (jetzt anwenden und nach Neustart beibehalten)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Deinstallieren (beim nächsten Start zurück auf Werkszustand)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Status aktualisieren</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Bisect-Ergebnisse erneut prüfen</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>Die Ausgabe von bc250-cu-unlock.sh erscheint hier.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ AKZEPTIERT</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ NOCH NICHT AKZEPTIERT!</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: Authentifizierung fehlgeschlagen.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} abgeschlossen, Exit-Code {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} fehlgeschlagen (Exit-Code {1}). Siehe Ausgabe oben.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>{0} ({1} CUs) jetzt anwenden und bei jedem Start aktiviert lassen?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>Freischaltdienst deaktivieren? Das Board kehrt beim nächsten Neustart zu den werksseitigen 24 CUs zurück.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>Administratorpasswort</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Das Schreiben der GPU-Register und die Installation des systemd-Dienstes erfordern Root-Rechte, daher wird bc250-cu-unlock.sh über sudo ausgeführt.
Ihr Passwort wird nur an sudo übergeben und niemals gespeichert.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>sudo-Passwort</translation>
    </message>
</context>
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>info</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Version {0}</translation>
    </message>
    <message>
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Eine PyQt6-Oberfläche für bc250-cu-unlock.sh: hält eine mit bc250-cu-bisect.sh bereits validierte BC-250-Compute-Unit-Freischaltung über Neustarts hinweg aufrecht.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Lizenz: GNU GPLv3.</translation>
    </message>
</context>
</TS>
