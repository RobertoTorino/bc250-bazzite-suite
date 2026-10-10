<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

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
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Eine PyQt6-Oberfläche für bc250-cores-bisect.sh: Optionen auswählen und einen Durchlauf starten, der dann in einem Terminal genau so weiterläuft, als hätten Sie ihn von Hand eingetippt.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Lizenz: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>hilfe</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>bc250-cores-bisect.sh --help konnte nicht gelesen werden.

Führen Sie es stattdessen in einem Terminal aus:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Hilfe</translation>
    </message>
    <message>
        <source>About</source>
        <translation>Info</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Wählen Sie, wie bc250-cores-bisect.sh laufen soll, und klicken Sie auf Start. Dieses Fenster schließt sich und der eigentliche Durchlauf geht in einem Terminal weiter, genau wie beim Aufruf des Skripts von Hand.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Last pro Versuch (Sekunden):</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>CPU-Last pro Versuch (-t). Minimum {0}s, Standard {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Runden pro Element:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Versuche pro Element (-r), verschachtelt, damit Hitze oder Tageszeit kein Element bevorzugen. Eine einzelne Runde kann einen wirklich defekten Kern nicht von einem zufälligen Fehler unterscheiden.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Lastwerkzeug:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (Standard)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>mprime-Foltertest</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>beide (stress-ng, dann mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng prüft seine eigenen Ergebnisse und ist immer verfügbar. Der Foltertest von mprime ist eine deutlich schwerere AVX/FMA-Last, die ebenfalls jedes Ergebnis prüft, und findet so stille Rechenfehler, die stress-ng übersieht – er muss aber separat installiert werden. „beide“ führt sie nacheinander aus, ein Versuch dauert dadurch die doppelte Lastzeit.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Hardwarefehler zusätzlich mit rasdaemon zählen</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: liest die Fehlerdatenbank von ras-mc-ctl vor und nach jedem Versuch. rasdaemon speichert Fehler dauerhaft, daher werden sie auch dann gezählt, wenn das Journal flüchtig ist oder der Versuch in einem Absturz endet. Der Dienst rasdaemon muss laufen.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>Gleicher Bootvorgang (kein Neustart zwischen Versuchen)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: deutlich schneller, aber jeder Versuch erbt dann den Zustand des vorherigen, wodurch sich ein Fehler schwerer einem einzelnen Kern zuordnen lässt.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Unbeaufsichtigt (keine Rückfragen, automatischer Neustart, Fortsetzung nach der Anmeldung)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: fragt nichts nach, startet selbstständig neu und macht nach jeder Anmeldung weiter, bis alle Elemente fertig sind. Benötigt passwortloses sudo für setpci und journalctl – siehe README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Auch den Anmeldedienst zur automatischen Fortsetzung installieren (empfohlen bei Unbeaufsichtigt)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Schreibt und aktiviert ~/.config/systemd/user/bc250-cores-bisect-auto.service, damit sich der Durchlauf nach jedem Neustart bzw. jeder Anmeldung selbst neu startet, genau wie in der --auto-Checkliste der README. Das Skript entfernt den Dienst wieder, sobald alle Elemente fertig sind.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Zurücksetzen</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: löscht alle gespeicherten Ergebnisse und Protokolle in ~/.local/share/bc250-cores-bisect endgültig, sodass der nächste Durchlauf von vorne beginnt.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Status anzeigen (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Zeigt die bisherigen Ergebnisse an, schreibt den Bericht und beendet sich.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Cores-Bisect starten</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Grobe Schätzung: ~{0:.1f} h für ein typisches Board ({1} Elemente x {2} Runden){3}. Der Durchlauf ist fortsetzbar – die Ergebnisse werden nach jedem Versuch gespeichert.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, Neustarts inbegriffen</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>Alle Ergebnisse von bc250-cores-bisect löschen?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Dies löscht endgültig jedes gespeicherte Ergebnis und Protokoll in ~/.local/share/bc250-cores-bisect (--reset). Das lässt sich nicht rückgängig machen und es gibt keine Sicherung. Das Skript fragt im Terminal noch einmal nach einer Bestätigung.</translation>
    </message>
    <message>
        <source>Start bc250-cores-bisect.sh with:

  load time: {t}s
  rounds: {r}
  load tool: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  unattended: {au}

This window will close and the run continues in a terminal.</source>
        <translation>bc250-cores-bisect.sh starten mit:

  Lastzeit: {t}s
  Runden: {r}
  Lastwerkzeug: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  unbeaufsichtigt: {au}

Dieses Fenster wird geschlossen und der Durchlauf geht in einem Terminal weiter.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>Der Anmeldedienst zur automatischen Fortsetzung konnte nicht installiert werden:
{0}

Der Durchlauf startet trotzdem jetzt; siehe die --auto-Checkliste der README, um ihn von Hand einzurichten.</translation>
    </message>
</context>
</TS>
