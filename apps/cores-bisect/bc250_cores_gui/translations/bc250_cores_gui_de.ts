<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="de">
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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Eine PyQt6-Oberfläche für bc250-cores-unlock.sh: hält die mit bc250-cores-bisect.sh bereits validierte 8C/16T-Kernfreischaltung des BC-250 über Neustarts hinweg aufrecht.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Lizenz: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = immer aktiv (6C/12T)   ok = in jeder Runde bestanden   xx = schlägt immer fehl   ?? = zufällig   .. = noch nicht getestet</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Info</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Behält die mit bc250-cores-bisect.sh bereits validierte 8C/16T-Kernfreischaltung über Neustarts hinweg bei.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Installieren (8C/16T nach jedem Start beibehalten)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Aktiviert den Root-Dienst, der die Freischaltung nach einem Kaltstart erneut anwendet und einmal warm neu startet.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Deinstallieren (stock nach dem nächsten Ausschalten)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Entfernt den Dienst. Die Freischaltung bleibt bis zum nächsten vollständigen Ausschalten (Kaltstart) aktiv.</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Status aktualisieren</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Zeigt die Kern-Präsenzmaske, die Threads sowie den Dienst- und Guard-Status an.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Bisect-Ergebnisse erneut prüfen</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Liest die von bc250-cores-bisect.sh gespeicherten Ergebnisse erneut ein, z. B. nachdem weitere Runden abgeschlossen wurden.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>Die Ausgabe von bc250-cores-unlock.sh erscheint hier.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ AKZEPTIERT</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ NOCH NICHT AKZEPTIERT!</translation>
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
        <source>sudo: authentication failed.</source>
        <translation>sudo: Authentifizierung fehlgeschlagen.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Falsches Passwort, bitte erneut versuchen.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} abgeschlossen, Exit-Code {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} fehlgeschlagen (Exit-Code {1}). Siehe Ausgabe oben.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>Alle 8 Kerne (16 Threads) bei jedem Start aktiviert lassen?

Ein Root-Dienst prüft die Kernmaske bei jedem Start. Nach einem Kaltstart wendet er die Freischaltung erneut an und startet einmal warm neu. Falls die Freischaltung gerade nicht aktiv ist, starten Sie nach der Installation (warm) neu, um die Kerne hochzufahren.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>Freischaltdienst entfernen? Die 8 Kerne bleiben bis zum nächsten vollständigen Ausschalten (Kaltstart) aktiviert; danach läuft das Board wieder mit stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>Administratorpasswort</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Das Beschreiben der SMU mailbox und die Installation des systemd-Dienstes erfordern Root-Rechte, daher wird bc250-cores-unlock.sh über sudo ausgeführt.
Ihr Passwort wird nur an sudo übergeben und niemals gespeichert.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>sudo-Passwort</translation>
    </message>
</context>
</TS>
