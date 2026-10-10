<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="de">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>GPU-Temperatur</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>Die GPU liegt bei %1 °C (Alarm eingestellt bei %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Governor-Drosselung</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>Die GPU liegt bei %1 °C, auf oder über der Drosseltemperatur des Governors von %2 °C; der maximale Takt wird gesenkt.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>fehlgeschlagen</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>gestoppt</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>Der Governor-Dienst ist %1; die GPU läuft mit den Standardtakten des Treibers. Siehe die Seite „Dienst“.</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Backups</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aktualisieren</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Vor jedem Schreibvorgang kopiert die App %1 danach nach config.toml.bak-YYYYMMDD-HHMMSS. Wählen Sie eins aus, um zu sehen, was sich von der aktuellen Datei unterscheidet; Wiederherstellen setzt es zurück (die aktuelle Datei wird zuerst gesichert, sodass nichts verloren geht).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Kopien, neueste zuerst</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Erstellt</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Größe</translation>
    </message>
    <message>
        <source>File</source>
        <translation>Datei</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Noch keine Backups.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Unterschied: Backup → aktuelle Datei</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Governor nach dem Wiederherstellen neu starten</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Auswahl wiederherstellen</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Macht die ausgewählte Kopie wieder zur Konfiguration (fragt nach Ihrem Passwort).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Wählen Sie ein Backup, um es mit der aktuellen Datei zu vergleichen.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>%1 kann nicht gelesen werden: %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Identisch mit der aktuellen Datei.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Von Festplatte neu laden</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Verwirft die Änderungen auf jeder Seite und zeigt wieder die Werte von config.toml an.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Governor nach dem Anwenden neu starten</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Der Governor liest config.toml nur beim Start.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Änderungen anwenden</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Fragt einmal nach Ihrem Passwort (pkexec), erstellt ein zeitgestempeltes Backup von config.toml und schreibt %1. Ausstehende Änderungen auf der anderen Konfigurationsseite werden ebenfalls geschrieben.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 wurde nicht gefunden. Der Cyan-Skillfish-SMU-Governor scheint nicht installiert zu sein.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 ist installiert, aber %2 existiert nicht.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan-Skillfish-SMU-Governor ist installiert und konfiguriert.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Die Authentifizierung wurde abgebrochen.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec fehlgeschlagen (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Nicht unterstützte Dienstaktion: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 hat keine D-Bus-Schnittstelle.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 wurde nicht gefunden. Der Cyan-Skillfish-SMU-Governor scheint nicht installiert zu sein.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 ist installiert, aber %2 existiert nicht.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan-Skillfish-SMU-Governor ist installiert und konfiguriert.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Die Authentifizierung wurde abgebrochen.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec fehlgeschlagen (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Nicht unterstützte Dienstaktion: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 hat keine D-Bus-Schnittstelle.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctl fehlgeschlagen (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 ist nicht auf dem Systembus (Governor gestoppt oder [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>Der Governor hat auf dem Bus geantwortet, aber seine Eigenschaften konnten nicht gelesen werden.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Die Authentifizierung wurde abgebrochen.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Nicht unterstützte GPU-Auslastungsmethode: %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Nicht unterstützte Temperaturquelle: %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>Nicht unterstütztes gpu.set-method: %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every muss mindestens 1 sein</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals muss mindestens 1 µs sein</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust darf nicht kürzer als sample sein</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples muss 0 (aus) oder 1..%1 sein</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events muss mindestens 1 sein</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal muss positiv sein</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst muss größer als normal sein</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust darf nicht negativ sein</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Frequenzen dürfen nicht negativ sein</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min darf frequency-range.max nicht überschreiten</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target benötigt 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling muss 0..100 °C sein</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery muss unter temperature.throttling liegen (oder 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>GPU-Auslastung</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>GPU-Auslastung in gpu_metrics patchen</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Schreibt die vom Governor gemessene Auslastung in eine gepatchte gpu_metrics-Tabelle und bindet sie über sysfs ein, sodass MangoHud, das Steam-Overlay, radeontop und diese App einen echten Prozentwert anstelle des 655%-Fehlers anzeigen.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>Den GPU-Takt in hwmon patchen</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Ersetzt den hwmon-Wert freq1_input durch den von der SMU gelesenen Takt. Behebt die falsche Frequenzanzeige von sysfs, vor allem nach dem 8-Core-Unlock. Unabhängig von fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Erfassungsmethode:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Temperaturquelle:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Die gepatchte Metrik-Tabelle alle N Aktualisierungszyklen leeren (Standard 10).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>Takt/Spannung anwenden über:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>die neuen Werte</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Nur die von dieser App verwalteten Schlüssel ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) werden geschrieben; jede andere Zeile der Datei, einschließlich Kommentare und der Safe-Points-Tabelle, bleibt unverändert. Vor jedem Schreibvorgang wird eine Kopie namens config.toml.bak-YYYYMMDD-HHMMSS daneben erstellt.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml existiert noch nicht; Anwenden erstellt sie)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Von Festplatte neu laden</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Verwirft die Änderungen auf jeder Seite und zeigt wieder die Werte von config.toml an.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Governor nach dem Anwenden neu starten</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Der Governor liest config.toml nur beim Start.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Änderungen anwenden</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Fragt einmal nach Ihrem Passwort (pkexec), erstellt ein zeitgestempeltes Backup von config.toml und schreibt %1. Ausstehende Änderungen auf der anderen Konfigurationsseite werden ebenfalls geschrieben.</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>Filter:</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>Text oder regulärer Ausdruck, Groß-/Kleinschreibung wird ignoriert</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Folgen</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Beim Scrollen immer zur neuesten Zeile springen. Deaktivieren, um ohne Verschieben zu lesen.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Leeren</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Vergisst die bisher angezeigten Zeilen; neue Einträge kommen weiterhin an.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — verbindet …</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>Folgt journalctl -u %1; bis zu %2 Zeilen werden behalten.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>Exitcode %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl gestoppt (%1). Ihr Benutzer muss eventuell Mitglied der Gruppe systemd-journal oder wheel sein, um System-Units lesen zu können. Erneuter Versuch in %2 s …</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl beendet; Neustart in %1 s …</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl ist auf diesem System nicht verfügbar; das Journal kann nicht angezeigt werden.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (wörtlich genommen, kein gültiger regulärer Ausdruck)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%1 von %2 Zeilen stimmen überein%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>das Kernel-Log ist für diesen Benutzer nicht lesbar (zur Gruppe systemd-journal hinzufügen)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k wurde mit Code %1 beendet</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl ist nicht verfügbar</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Pro Spiel</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>Der Governor liefert einen Wrapper, der eine dieser Einstellungen für ein einzelnes Programm anwendet und den Leistungsmodus beim Beenden wieder abschaltet, was auch den normalen Bereich wiederherstellt. Wählen Sie, was das Spiel bekommen soll, und kopieren Sie die Zeile in dessen Starter.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Für:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Kopieren</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Kopiert die Zeile in die Zwischenablage.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Festzulegender Takt, MHz.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Untere Grenze, 0 = kein Limit.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Obere Grenze, 0 = kein Limit.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Kein Limit</translation>
    </message>
    <message>
        <source>to</source>
        <translation>bis</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>Unter dieser Auslastung taktet der Governor herunter.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Über dieser Auslastung taktet der Governor herauf.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Oberhalb dieser Temperatur drosseln.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Unterhalb dieser Temperatur normale Taktraten fortsetzen.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Bruchteil von 1, wie in config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>Die untere Grenze liegt über der oberen Grenze.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>Der untere Auslastungszielwert muss unter dem oberen liegen.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>Die Erholungstemperatur muss unter der Drosseltemperatur liegen.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Kopiert</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>GPU-Auslastung</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>GPU-Takt</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>GPU-Temperatur</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Leistung</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Kopiert: %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Übersicht</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>GPU-Auslastung</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Tuning</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Safe Points</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Leistung</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Backups</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Dienst</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Einstellungen</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Hilfe</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Bereit</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>Auslastung %1 %</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Auslastung k. A.</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>running</source>
        <translation>läuft</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>nicht installiert</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>gestoppt</translation>
    </message>
    <message>
        <source>%1
%2
Governor %3</source>
        <translation>%1
%2
Governor %3</translation>
    </message>
    <message>
        <source>Still running in the tray; use Quit in its menu to leave.</source>
        <translation>Läuft weiter im Tray; zum Beenden „Beenden“ im Menü verwenden.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 nicht angewendete Änderungen. Trotzdem schließen?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>Der Governor-Dienst läuft nicht.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>k. A.</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>Kein Frequenzsensor.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>Kein Temperatursensor.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power der gpu_metrics-Tabelle (gesamte APU); die SMU meldet ihn in 24.8-Festkommaformat, hier in Watt angezeigt</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>Die gpu_metrics-Tabelle meldet keine Socket-Leistung.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>kein Limit</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Ein</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Aus</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Aktueller Bereich %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus nicht erreichbar.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Fehlt</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>Läuft</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Fehlgeschlagen</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Gestoppt</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> Seiten haben</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> Seite hat</translation>
    </message>
    <message>
        <source> and </source>
        <translation> und </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Nicht angewendete Änderungen: %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Ungültige Werte</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>config.toml konnte nicht geschrieben werden</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Konfiguration angewendet</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, Backup: %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Gespeichert, aber der Neustart ist fehlgeschlagen</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml wurde aktualisiert, aber der Governor konnte nicht neu gestartet werden.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>Es wurde kein Fehlertext zurückgegeben.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — Neustart fehlgeschlagen</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, Governor neu gestartet</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Safe Points anwenden</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>%1 Safe Points (%2–%3 MHz) in config.toml schreiben?

Der Governor skaliert entlang dieser Kurve. Ein Punkt, den die Hardware nicht halten kann, lässt das Board unter Last einfrieren; zuerst wird ein Backup der aktuellen Datei erstellt, das auf der Seite „Backups“ wiederhergestellt werden kann.</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Safe Points angewendet</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>keine gespeichert</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>Kein Profil namens „%1“ (bekannt: %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Profil „%1“ in die Formulare geladen; zum Schreiben anwenden</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Profil anwenden</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>„%1“ anwenden? Die %2 nicht angewendeten Änderungen werden verworfen.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Ungültiges Profil</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>„%1“ kann nicht angewendet werden: %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Profil „%1“ angewendet</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Profil „%1“ angewendet, Governor neu gestartet.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Diesen Befehl in den Tastenkürzel-Einstellungen Ihrer Desktop-Umgebung an eine Taste binden; er erreicht die laufende App und wendet das Profil an.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Profil speichern</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Profilname:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Profil ersetzen</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>„%1“ existiert bereits. Mit den aktuellen Formularwerten ersetzen?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Profil „%1“ gespeichert</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Profil löschen</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>Profil „%1“ löschen?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Profil „%1“ gelöscht</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>%1 durch %2 ersetzen?

Die aktuelle Datei wird zuerst gesichert.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
Der Governor wird anschließend neu gestartet.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Backup wiederherstellen</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>Das Backup konnte nicht wiederhergestellt werden</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>%1 wiederhergestellt</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Governor %1 ist verfügbar (installiert %2); siehe die Seite „Dienst“</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Governor-Update %1 ist verfügbar.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Telemetrieverlauf exportieren</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>CSV-Dateien (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>Die CSV-Datei konnte nicht geschrieben werden</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 Stichproben (%2–%3) nach %4 geschrieben</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Mit einem früheren Telemetrie-Export vergleichen</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>CSV-Dateien (*.csv);;Alle Dateien (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>Die CSV-Datei konnte nicht gelesen werden</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Nichts zum Vergleichen</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>Die Datei enthält keine Stichproben mit lesbarer Zeit.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 Referenzstichproben von %2 gestrichelt gezeichnet</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Diagnose exportieren</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>Textdateien (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Export fehlgeschlagen</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Diagnose exportiert</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Gespeichert unter %1.

Lesen Sie die Datei, bevor Sie sie einem Fehlerbericht anhängen, und entfernen Sie alles, was Sie nicht teilen möchten.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1: erledigt</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1 fehlgeschlagen</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>Der Test wurde wegen „%1“ auf der Seite „Leistung“ beendet.</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1: erledigt</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1 fehlgeschlagen</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>Der Governor hat keinen Fehlertext zurückgegeben.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Leistungsmodus ein</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Leistungsmodus aus</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Feste Frequenz %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Laufzeitbereich %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Auslastungsziel %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>nicht gesetzt</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Temperatur %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Laufzeitwerte auf die Seite „Tuning“ kopiert; zum Speichern anwenden</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>für %1 s</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>bis Sie ihn stoppen</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> und %1 zur Auslastung ausführen</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Safe Point testen</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>GPU auf %1 MHz bei %2 mV %3%4 festlegen?

Der Governor wendet dieses Paar wie angegeben an und stoppt seine automatische Skalierung; die thermische Drosselung bleibt aktiv. Ein Punkt, den die Hardware nicht halten kann, lässt das Board unter Last einfrieren. Es wird nichts in config.toml geschrieben. Sie werden nach Ihrem Passwort gefragt (die TestMode-Schnittstelle ist nur für Root).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>Testmodus fehlgeschlagen</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>%1 konnte nicht gestartet werden (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Testmodus: %1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>nach einem GPU-Fehler im Kernel-Log abgebrochen</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>abgestürzt</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>mit Code %1 beendet</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2, während der Punkt festgelegt war</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Test von %1 MHz @ %2 mV %3 nach %4 s</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> unter %1 Auslastung</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>Spitzenwert %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>Takt %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>Takt %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ Kernel: %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+%1 weitere)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>Kernel-Log nicht überwacht</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>keine GPU-Fehler im Kernel-Log</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. Der Governor skaliert wieder normal.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>durch den Timer beendet</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>Der Test konnte nicht beendet werden</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Ein Neustart des Governors auf der Seite „Dienst“ beendet den Testmodus ebenfalls.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>Der Governor wurde gestoppt; der Test endete damit.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, noch %1 s</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 belastet die GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Belasten Sie die GPU selbst.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Kernel-Log nicht lesbar, keine Hang-Erkennung.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Kernel-Log überwacht.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Teste %1 MHz @ %2 mV%3.%4%5 Beobachten Sie die Übersicht; Test stoppen kehrt zur normalen Skalierung zurück.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Übersicht</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>Laufzeitstatus</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Governor-Dienst</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metrics-Override</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>GPU-Auslastungssensor</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (gespeichert)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>GPU-Auslastung, Takt und Temperatur</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Fenster:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Wie viel von den letzten %1 Minuten das Diagramm zeigt; der Export enthält immer alles Gespeicherte.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>CSV exportieren …</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Speichert jede gehaltene Stichprobe (Zeit, Auslastung, Takt, Temperatur, Socket-Leistung, Leistungsmodus, Laufzeitbereich) als CSV-Datei.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Vergleichen …</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Lädt einen früheren CSV-Export und zeichnet ihn gestrichelt hinter die Live-Linien, neueste Stichprobe am rechten Rand, mit den Durchschnittswerten beider Sitzungen unter dem Diagramm.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Leeren</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Entfernt die Referenzsitzung aus dem Diagramm.</translation>
    </message>
    <message>
        <source>% / °C</source>
        <translation>% / °C</translation>
    </message>
    <message>
        <source>MHz</source>
        <translation>MHz</translation>
    </message>
    <message>
        <source>Load %</source>
        <translation>Auslastung %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Temperatur °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Takt MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Auslastung % (Ref.)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Temperatur °C (Ref.)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Takt MHz (Ref.)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metrics-Tabelle</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>Der BC-250 bietet normalerweise keinen gpu_busy_percent-Sensor, aber der Governor misst die Auslastung selbst und veröffentlicht sie in seiner gepatchten gpu_metrics-Tabelle, solange fix-metrics aktiviert ist und der Dienst läuft. Die App liest sie von dort; ein fehlender Sensor wird als k. A. angezeigt, nie als 0 %.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>Nicht installiert</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Aktiv</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>SubState: %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Fehlgeschlagen</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>Die Unit ist fehlgeschlagen; das Journal finden Sie auf der Seite „Dienst“.</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Inaktiv</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>unbekannt</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Eingebunden</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>Nicht eingebunden</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>Der Governor bindet seine gepatchte gpu_metrics-Tabelle über die sysfs-Datei ein, solange fix-metrics aktiviert ist und der Dienst läuft.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Aktiviert</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Deaktiviert</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Wert in config.toml gespeichert.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>Nicht verfügbar</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Verfügbar</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>Auslastung %1 %</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>Auslastung k. A.</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>Takt %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>Temperatur %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Aktuell: %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. Kein nutzbarer GPU-Auslastungssensor: %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Erreichbar</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor antwortet auf dem Systembus.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Ein</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Aus</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Aktueller Bereich %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>kein Limit</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Nicht erreichbar</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Unbekannt</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Erfordert einen laufenden Governor mit aktiviertem [dbus].</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>GPU-Auslastung, Takt und Temperatur, letzte %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (%1 Min. %2 s aufgezeichnet)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Referenz %1 (%2): %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Live-Fenster (%1): %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>Keine lesbare gpu_metrics-v2.x-Tabelle unter /sys/class/drm/card*/device gefunden.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (gepatcht)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (roh)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>keine</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Tabelle wie vom Governor veröffentlicht (fix-metrics): Die GFX-Aktivität ist seine eigene Messung.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Rohe Kernel-Tabelle: Die GFX-Aktivität ist der kaputte Firmware-Wert (der 655%-Fehler); fix-metrics aktivieren, um einen echten Wert zu erhalten.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Rohe Kernel-Tabelle.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Leistung</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aktualisieren</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Laufzeitsteuerung über D-Bus (com.cyanskillfish.Governor): Sie gilt sofort, benötigt kein Passwort und geht beim nächsten Governor-Neustart verloren. config.toml bleibt unverändert; verwenden Sie die Seite „Tuning“, um Werte dauerhaft zu speichern. Der Leistungsmodus öffnet den vollen Safe-Points-Bereich; eine feste Frequenz legt den Takt fest; der Auslastungszielwert und die Temperaturschwellen ändern die Skalierung des Governors, ohne den Modus zu beeinflussen.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>Laufzeitstatus</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Aktueller Bereich</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Bereich beim Start ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Zulässiger Bereich (Safe Points)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Auslastungsziel (unten / oben)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Temperatur (Drosseln / Erholen)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Steuerung</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Leistungsmodus: aus</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled: Ein lässt den Governor den gesamten zulässigen Bereich nutzen und schneller auf Auslastung reagieren; Aus kehrt zum Startbereich des Governors zurück.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Modus:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency: Leistungsmodus mit hier festgelegtem Takt. Muss innerhalb des zulässigen Bereichs liegen.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Takt festlegen</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Feste Frequenz:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Kein Limit</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Untere Taktgrenze für jetzt; Kein Limit = der niedrigste Safe Point.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Obere Taktgrenze für jetzt; Kein Limit = der höchste Safe Point.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Bereich festlegen</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max): ein vorübergehender Bereich, verlässt den Leistungsmodus.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>bis</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Laufzeitbereich:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>Unter dieser GPU-Auslastung senkt der Governor den Takt.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Über dieser GPU-Auslastung erhöht der Governor den Takt.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Auslastungsziel festlegen</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper): das Auslastungsband, in dem der Governor die GPU bis zum nächsten Neustart hält. Beeinflusst nicht den Leistungsmodus.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Auslastungsziel:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Über dieser Temperatur senkt der Governor den maximalen Takt.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Nicht gesetzt</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>Unterhalb dieser Temperatur ist wieder der volle Bereich zulässig; Nicht gesetzt = die eigene Hysterese des Governors.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Temperaturen festlegen</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery): bis zum nächsten Neustart. Beeinflusst nicht den Leistungsmodus.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Temperatur:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Laufzeitwerte auf die Seite „Tuning“ kopieren</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Überträgt den aktuellen Bereich, das Auslastungsziel und die Temperaturen in das Tuning-Formular, damit Sie sie in config.toml speichern können.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Erreichbar</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor antwortet auf dem Systembus.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Ein</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Aus</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Enabled-Eigenschaft der PerformanceMode-Schnittstelle.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Leistungsmodus: ein</translation>
    </message>
    <message>
        <source>%1 % / %2 %</source>
        <translation>%1 % / %2 %</translation>
    </message>
    <message>
        <source>%1 °C</source>
        <translation>%1 °C</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>nicht gesetzt</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Nicht erreichbar</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Unbekannt</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>Der Governor-Dienst läuft nicht (Seite „Dienst“).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus ist in config.toml deaktiviert: auf der Seite „Tuning“ aktivieren und mit einem Neustart anwenden.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>Der Governor hat auf dem Systembus nicht geantwortet.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>Steuerung deaktiviert: %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>der untere Auslastungszielwert muss unter dem oberen liegen</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>die Erholungstemperatur muss unter der Drosseltemperatur liegen (oder Nicht gesetzt)</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>Profile</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>Benannte Momentaufnahmen dieser Seite und der Seite „GPU-Auslastung“, nur für Ihren Benutzer gespeichert. Safe Points sind nicht Teil eines Profils.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>In Formulare laden</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Füllt die Formulare „Tuning“ und „GPU-Auslastung“; es wird erst beim Anwenden etwas geschrieben.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Jetzt anwenden</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Schreibt das Profil in config.toml (zuerst Backup, eine Passwortabfrage) und startet den Governor neu. Ausstehende Änderungen auf den Konfigurationsseiten werden verworfen.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Aktuelles speichern als …</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Speichert die aktuellen Werte der Formulare (angewendet oder nicht) unter einem Namen.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Löschen</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Tastenkürzel-Befehl kopieren</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Legt eine Befehlszeile in die Zwischenablage, die dieses Profil in der laufenden App anwendet. An eine Taste binden unter Systemeinstellungen → Kurzbefehle (KDE) oder Tastatur → Benutzerdefinierte Kurzbefehle (GNOME), um Profile zu wechseln, ohne das Fenster zu öffnen.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Noch keine Profile: Formulare einrichten und Aktuelles speichern als … verwenden</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Safe Points</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Von Festplatte neu laden</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>Die [[safe-points]] von %1 legen die Frequenz-/Spannungskurve fest, entlang der der Governor skaliert. Er verlässt nie den Bereich zwischen dem niedrigsten und dem höchsten Punkt; [frequency-range] und die Laufzeitsteuerung werden darauf begrenzt. Mit Vorsicht bearbeiten: falsche Spannungen können das Board einfrieren lassen oder beschädigen. Anwenden prüft zuerst die Regeln des Governors und die harten Grenzen (%2–%3 mV, bis zu %4 MHz) und erstellt ein Backup.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Punkte</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Frequenz</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Spannung</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Punkt hinzufügen</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Fügt einen Punkt nach dem ausgewählten ein, auf halbem Weg zum nächsten.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Entfernen</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Sortieren</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Ordnet die Zeilen nach Frequenz (Anwenden tut dies ohnehin).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Kurve</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Safe Points anwenden</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Schreibt die [[safe-points]]-Blöcke in config.toml (fragt nach Ihrem Passwort, erstellt zuerst ein Backup).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Governor anschließend neu starten</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>Der Governor liest config.toml nur beim Start.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Zurücksetzen</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Zurück zu den Punkten in der Datei.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Mitgelieferte Standardwerte</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>Die aktiven Punkte der default-config.toml des Governors: %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Einen Punkt vor dem Speichern testen (Laufzeit, Root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode über D-Bus legt diese Frequenz und Spannung sofort fest und stoppt die automatische Skalierung; die thermische Drosselung des Governors bleibt aktiv. Es wird nichts in config.toml geschrieben, und der Governor wendet das Paar wie angegeben an, bleiben Sie also innerhalb der harten Grenzen. Belasten Sie die GPU, während der Test läuft. Test stoppen (oder der Timer) schaltet den Leistungsmodus aus, was zur normalen Skalierung mit dem Startbereich zurückkehrt. Ein Punkt, den die Hardware nicht halten kann, lässt das Board einfrieren; speichern Sie vorher Ihre Arbeit.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Auslastung:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Ein im PATH gefundener GPU-Lasterzeuger, der mit dem Test gestartet und bei dessen Ende beendet wird. Stirbt er, während der Punkt festgelegt ist, wird dies gemeldet.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>Kein Lastwerkzeug gefunden (vkmark, glmark2, vkcube oder glxgears): führen Sie während des Tests selbst ein Spiel oder einen Benchmark aus.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Aus der ausgewählten Zeile vorausgefüllt; frei bearbeitbar.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>Bis zum Stoppen</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>Die App beendet den Test nach dieser Zeit von selbst (0 = nur durch Test stoppen).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Frequenz:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Spannung:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Für:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Test starten</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Fragt nach Ihrem Passwort (pkexec): Die TestMode-Schnittstelle ist nur für Root.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Test stoppen</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Zur Tabelle hinzufügen</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Legt dieses Frequenz-/Spannungspaar in die obige Safe-Points-Tabelle (sortiert nach Frequenz, ersetzt einen Punkt bei derselben Frequenz). Zum Speichern anwenden.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Herauszufinden, wie weit das eigene Board gehen kann (höhere Spitzenfrequenz, niedrigere Spannungen), ist eine Aufgabe für %1: Es testet Schritt für Schritt unter einer verifizierten Last und kann das Ergebnis installieren. Bearbeiten Sie die Punkte nur von Hand, wenn Sie wissen, was die Hardware verträgt.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 Punkte: %2 MHz @ %3 mV bis %4 MHz @ %5 mV.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>Keine [[safe-points]]; der Governor würde auf 350 MHz @ 700 mV und 2000 MHz @ 1000 mV zurückfallen.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>erhöht die Spitzenfrequenz von %1 auf %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>senkt die Spannung bei %1 vorhandenen Punkt(en)</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Diese Änderung %1: ein instabiler Punkt kann das Board unter Last einfrieren lassen. Zuerst mit bc250-gpu-oc-bisect überprüfen.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> und </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>kein Limit</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor (D-Bus): zulässiger Bereich %1–%2 MHz, aktueller Bereich %3–%4 MHz.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz liegt über %2 MHz, wo viele Boards hart blockieren</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV liegt über %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>die obige Kurve würde %1 mV bei %2 MHz ergeben; das ist niedriger</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>Die D-Bus-Schnittstelle des Governors ist nicht erreichbar (Dienst gestoppt oder [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Dienst</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Nach Updates suchen</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Vergleicht das installierte RPM mit dem neuesten Release auf GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Diagnose exportieren …</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Speichert Versionen, config.toml, Dienststatus, Journal und die rohe gpu_metrics-Tabelle in einer Textdatei für einen Fehlerbericht.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aktualisieren</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Unit gefunden</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Aktiv</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Beim Systemstart aktiviert</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metrics-Override</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Version</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Starten</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Stoppen</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Neu starten</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Beim Systemstart aktivieren</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Beim Systemstart deaktivieren</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (fragt nach Ihrem Passwort).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Journal (live)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Ja</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>Nein — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Ja (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>Nein (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>nicht geladen</translation>
    </message>
    <message>
        <source>No</source>
        <translation>Nein</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>Versionshinweisen</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>Releases</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Paket nicht installiert</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Prüfe …</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Einstellungen</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Diese Einstellungen betreffen die App, nicht den Governor. Sie werden pro Benutzer gespeichert.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Systemabschnitt (Tray)</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Ein Tray-Symbol anzeigen, dessen Tooltip GPU-Auslastung, Takt und Temperatur enthält</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Schließen des Fensters lässt die App im Tray weiterlaufen</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Linksklick auf das Tray-Symbol zeigt oder versteckt das Fenster; das Menü schaltet auch den Leistungsmodus um (wenn D-Bus erreichbar ist) und beendet die App.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>Dieser Desktop bietet keinen Systemabschnitt (unter GNOME die AppIndicator-Erweiterung installieren).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Beim Anmelden starten</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Die App beim Anmelden starten</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation> … im Tray versteckt, ohne das Fenster zu öffnen</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Governor-Updates</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Beim Start der App nach einem neueren Governor-Release suchen</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Eine Anfrage an api.github.com für das neueste Release von filippor/cyan-skillfish-governor, verglichen mit dem installierten RPM. Es wird nichts anderes gesendet. Die Seite „Dienst“ hat die gleiche Prüfung als Schaltfläche.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Alarme</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Benachrichtigen, wenn die GPU-Temperatur erreicht</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Benachrichtigen, wenn der Governor wegen der Temperatur zu drosseln beginnt</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Benachrichtigen, wenn der Governor-Dienst von selbst stoppt oder fehlschlägt</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Wird als Desktop-Benachrichtigung über das Tray-Symbol angezeigt (in der Statusleiste, wenn der Tray aus ist). Eine Nachricht pro Ereignis: Ein Temperaturalarm wird erneut scharf geschaltet, sobald die GPU 5 °C unter ihren Schwellenwert abgekühlt ist, und derselbe Alarm wiederholt sich höchstens alle 5 Minuten.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>%1 konnte nicht geschrieben werden: %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Eintrag: %1
Befehl: %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Schreibt einen Desktop-Eintrag nach %1; es wird nichts systemweit installiert.</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Unbekannt</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Ein Lastwerkzeug läuft bereits.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1 wurde im PATH nicht gefunden.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 wurde nicht gestartet: %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>Auslastung %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>Takt %1 MHz (max. %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (max. %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>keine Messwerte</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Fenster verstecken</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Profil anwenden</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Beenden</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Fenster anzeigen</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Tuning</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Preset:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>Das Formular stimmt mit keinem Preset überein.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Füllt das untenstehende Formular; es wird erst beim Anwenden etwas geschrieben.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>Taktgrenzen beim Start</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Niedrigster Takt, den der Governor wählen darf. 0 (Kein Limit) = niedrigster Safe Point.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Höchster Takt, den der Governor wählen darf. 0 (Kein Limit) = höchster Safe Point.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Minimum:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Maximum:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>Werte außerhalb der Safe-Points-Tabelle von config.toml werden vom Governor begrenzt.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>wann der Takt geändert wird</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>GPU-Auslastung, oberhalb derer der Governor den Takt erhöht (oberer Wert).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>GPU-Auslastung, unterhalb derer der Governor den Takt senkt (unterer Wert).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Hochtakten oberhalb:</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Heruntertakten unterhalb:</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Ein großer Abstand hält den Takt stabil; ein enger Abstand folgt der Auslastung genau. Governor-Standardwerte, wenn der Abschnitt fehlt: 95 % / 80 %.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>thermische Drosselung</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Oberhalb dieser GPU-Temperatur senkt der Governor den Takt (Standard 85).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Nicht gesetzt</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>Unterhalb dieser Temperatur endet die Drosselung. Muss niedriger als die Drosseltemperatur sein; Nicht gesetzt lässt den Schlüssel aus config.toml weg.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Drosseln oberhalb:</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Erholen unterhalb:</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>Laufzeitsteuerung</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>com.cyanskillfish.Governor auf dem Systembus veröffentlichen</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Wird von der Seite „Leistung“ dieser App und vom Start-Wrapper cyan-skillfish-performance-mode benötigt.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>Regelkreis</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>wie oft das GPU-Busy-Flag abgetastet wird (Governor-Standard 2000 µs, mitgelieferte Datei 250 µs). Wird von der Busy-Flag-Auslastungsmethode verwendet.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>wie oft das Taktziel neu berechnet wird (Governor-Standard 10 × sample, mitgelieferte Datei 100 000 µs). Darf nicht kürzer als das Abtastintervall sein.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Abtasten alle:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Anpassen alle:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>wie schnell sich der Takt seinem Ziel annähert (Standard 1 MHz/ms).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>Rampenrate im Burst-Modus; muss über der normalen Rate liegen (Governor-Standard 200 × normal, mitgelieferte Datei 50 MHz/ms).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Rampenrate:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Burst-Rampenrate:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> Stichproben</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Aus</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>so viele aufeinanderfolgende Busy-Stichproben wechseln zur Burst-Rampenrate, sodass ein Spiel, das die GPU plötzlich belastet, schnell seinen Takt bekommt (1..%1; Aus lässt den Schlüssel weg, mitgelieferte Datei 60).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Burst ab:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> Ereignisse</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>Anpassungszyklen mit Auslastung unter dem unteren Ziel, bevor der Takt heruntergeht (Governor-Standard 10, mitgelieferte Datei 5). Höher = trägerer Takt.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Heruntertakten nach:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Schnelleres Abtasten und Anpassen reagiert zwar schneller, kostet aber CPU-Zeit. Der Burst-Modus verkürzt die Verzögerung beim Start eines Spiels; mehr Down-Events verhindern, dass der Takt bei kurzen Pausen abfällt.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>Totband</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>eine Nicht-Burst-Taktänderung, die kleiner als dieser Wert ist, wird nicht angewendet (Standard 10). Vermeidet ständige winzige SMU-Schreibvorgänge.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Änderungen ignorieren unterhalb von:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>die Tuning-Abschnitte</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>Der Governor meldet einen Safe-Points-Bereich von %1–%2 MHz; Werte außerhalb davon werden begrenzt.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Von Festplatte neu laden</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Verwirft die Änderungen auf jeder Seite und zeigt wieder die Werte von config.toml an.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Governor nach dem Anwenden neu starten</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Der Governor liest config.toml nur beim Start.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Änderungen anwenden</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Fragt einmal nach Ihrem Passwort (pkexec), erstellt ein zeitgestempeltes Backup von config.toml und schreibt %1. Ausstehende Änderungen auf der anderen Konfigurationsseite werden ebenfalls geschrieben.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>nicht installiert</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (neueste: unbekannt — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (neueste: unbekannt)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2 verfügbar (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (aktuell, neuestes Release %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (neuestes Release: %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Tastet das einzelne Busy-Bit der GPU bei timing.intervals.sample ab (Standard). Am günstigsten, funktioniert überall.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Scannt jeden Prozess, der die GPU offen hält. Mehr CPU-Aufwand als busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Liest den eigenen Auslastungswert des Kernels. Benötigt einen gepatchten Kernel, den das Standard-Bazzite nicht hat.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>AMDGPU_INFO_SENSOR_GPU_TEMP-ioctl; hält ein DRM-Gerätehandle offen, solange der Governor läuft (Standard).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Liest stattdessen den amdgpu-hwmon-Wert temp1_input, sodass kein DRM-Client offen bleibt. Derselbe Sensor.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Spricht direkt mit der SMU (API von bc250collective); wendet die Safe-Points-Spannung mit dem Takt an (Standard).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Geht stattdessen über die amdgpu-sysfs-Schnittstelle (pp_od_clk_voltage) statt über die SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Mitgelieferte Standardwerte</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Ruhig</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Reaktionsschnell</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Maximaler Takt</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>Die Werte der config.toml, die das Governor-Paket installiert.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>Niedrigste Taktraten, die noch mithalten: taktet spät hoch, deckelt bei 1500 MHz, drosselt bei 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Taktet früh hoch und erlaubt den vollen sicheren Bereich, auf Kosten von mehr Wärme und Leistungsaufnahme.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Bleibt nahe der Obergrenze des sicheren Bereichs; nahe an einem festen Takt, während die thermische Drosselung aktiv bleibt.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Benutzerdefiniert</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Kein Limit</translation>
    </message>
</context>
<context>
    <name>help</name>
    <message>
        <source>
&lt;h1&gt;%1 &lt;small&gt;v%2&lt;/small&gt;&lt;/h1&gt;
&lt;p&gt;A small front-end for &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, the GPU governor of the &lt;b&gt;AMD BC-250&lt;/b&gt;
(Cyan Skillfish APU, gfx1013) on &lt;b&gt;Bazzite&lt;/b&gt;. The governor must already be installed; this app
edits one section of its configuration and controls its systemd service. Nothing else on the system
is touched.&lt;/p&gt;

&lt;h2&gt;Overview&lt;/h2&gt;
&lt;p&gt;Shows whether the service runs, whether the governor's patched &lt;code&gt;gpu_metrics&lt;/code&gt; table is
mounted over sysfs, whether a GPU load sensor is available, and a chart of the GPU load (%), temperature (°C, left
axis) and clock (MHz, right axis). A missing reading leaves a gap, never a fake zero. The app keeps the last hour
of samples (one every two seconds) while it runs; &lt;b&gt;Window&lt;/b&gt; picks how much of it the chart shows (2, 10, 30 or
60 minutes) and &lt;b&gt;Export CSV…&lt;/b&gt; writes every kept sample (time, load, clock, temperature, socket power,
performance mode, runtime range) to a file. &lt;b&gt;Compare…&lt;/b&gt; loads such a file back and draws it dashed behind
the live lines (newest sample at the right edge, like the live window) and puts both sessions' averages and
peaks under the chart (load, clock, temperature, socket power), so a profile or safe-point change can be judged
against an earlier run; &lt;b&gt;Clear&lt;/b&gt; removes it.&lt;/p&gt;
&lt;p&gt;The &lt;b&gt;gpu_metrics table&lt;/b&gt; box decodes the table the kernel (or the governor) exposes: activities, temperatures,
socket/GFX/CPU power, the GFX, SoC, memory and fabric clocks, the throttle status and the CPU core clocks.
&lt;i&gt;(patched)&lt;/i&gt; means the governor's table is mounted; &lt;i&gt;(raw)&lt;/i&gt; is the kernel's own table, whose GFX activity
on a BC-250 is the broken 655% value and is not used as load.&lt;/p&gt;
&lt;p&gt;The BC-250 usually has no &lt;code&gt;gpu_busy_percent&lt;/code&gt; sensor, but the governor measures the load itself and,
with &lt;b&gt;fix-metrics&lt;/b&gt; on, publishes it in the patched &lt;code&gt;gpu_metrics&lt;/code&gt; table it mounts over sysfs. The app
reads the load from there; &lt;code&gt;gpu_busy_percent&lt;/code&gt; and &lt;code&gt;radeontop&lt;/code&gt; are fallbacks. Without any
source it shows &lt;b&gt;N/A&lt;/b&gt;, never a misleading 0%, and the tooltip tells you what is missing. The GPU clock and temperature come from the amdgpu hwmon
sensors; with &lt;code&gt;fix-freq&lt;/code&gt; on, the clock is the real SMU value.&lt;/p&gt;

&lt;h2&gt;GPU Usage&lt;/h2&gt;
&lt;p&gt;Edits the &lt;code&gt;[gpu-usage]&lt;/code&gt; section of &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Write the measured load into a patched &lt;code&gt;gpu_metrics&lt;/code&gt;
table and bind-mount it over sysfs. Fixes the 655% GPU usage of MangoHud, the Steam overlay and radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Also patch &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; with the clock read
from the SMU. Fixes the wrong sysfs frequency, mainly after the 8-core unlock. Independent of fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; samples the GPU's busy bit;
&lt;i&gt;process&lt;/i&gt; scans every process that uses the GPU (more CPU work); &lt;i&gt;kernel&lt;/i&gt; needs a patched kernel.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Where the GPU temperature is read: the DRM ioctl (keeps a DRM handle
open) or the hwmon &lt;code&gt;temp1_input&lt;/code&gt; file. Same sensor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Flush the patched table every N update cycles.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;And the &lt;code&gt;[gpu]&lt;/code&gt; section: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, the default, applies clock and voltage through
the SMU directly; &lt;i&gt;kernel&lt;/i&gt; goes through the amdgpu sysfs interface instead).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Apply changes&lt;/b&gt; (on this page or on Tuning) asks for your password once (pkexec). It copies the current
file to &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; and writes the pending edits of both pages. Only the known
keys change; every other line of the file, including comments, is kept. The governor reads the file at start, so
the service is restarted afterwards unless you untick that option.&lt;/p&gt;

&lt;h2&gt;Tuning&lt;/h2&gt;
&lt;p&gt;Edits the other sections of &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Keys&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Clock limits in MHz the governor starts with. &lt;i&gt;No limit&lt;/i&gt;
(0) leaves the limit open; values outside the safe-points table are clamped by the governor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Ramp the clock up when the load is above &lt;i&gt;upper&lt;/i&gt;,
down when it is below &lt;i&gt;lower&lt;/i&gt;. A wide gap keeps the clock steady, a narrow one follows the load closely.
The governor's own defaults when the section is missing are 95% / 80%; the shipped file uses 65% / 50%.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Throttle above the first value (default
85 °C); recover below the second, which is optional (&lt;i&gt;Not set&lt;/i&gt;) and must be lower.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Publish &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; on the system bus. The
Performance page needs it; the shipped file turns it on, the governor's built-in default is off.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;The control loop: how often the load is sampled and the clock adjusted (µs), how fast the clock
moves towards its target (MHz/ms), how many busy samples in a row switch to the faster burst ramp (&lt;i&gt;Off&lt;/i&gt; leaves
the key out), and how many low-load adjust cycles pass before the clock steps down. Governor defaults: 2000 µs /
10 × sample, 1 / 200 × normal, off, 10; the shipped file uses 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Dead band in MHz: a non-burst change smaller than this is
not applied (default 10).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Presets&lt;/b&gt; fill in the frequency range, load target and temperature at once (timing is left alone): &lt;i&gt;Shipped defaults&lt;/i&gt; (the package's config), &lt;i&gt;Quiet&lt;/i&gt; (lower
clocks, late ramp-up), &lt;i&gt;Responsive&lt;/i&gt; (early ramp-up, full range) and &lt;i&gt;Maximum clock&lt;/i&gt; (stays near the top).
The combo box shows &lt;i&gt;Custom&lt;/i&gt; as soon as a value differs from every preset. Invalid combinations (min above
max, recovery not below throttling, adjust interval shorter than sample, burst rate not above normal) are flagged
under the form and block Apply.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Profiles&lt;/b&gt; are named snapshots of every value on this page and the GPU Usage page (safe points are not
included), stored for your user in &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Save current as…&lt;/i&gt; stores what the forms show right now, applied or not. &lt;i&gt;Load into forms&lt;/i&gt; fills both
pages so you can review and apply as usual; &lt;i&gt;Apply now&lt;/i&gt; writes the profile to &lt;code&gt;config.toml&lt;/code&gt;
(backup first, one password prompt), discards pending edits and restarts the governor. With the tray icon on, the
tray menu's &lt;i&gt;Apply profile&lt;/i&gt; submenu does the same without opening the window. For a &lt;b&gt;keyboard shortcut&lt;/b&gt;,
&lt;i&gt;Copy hotkey command&lt;/i&gt; puts &lt;code&gt;bc250-governor-manager --profile 'Name'&lt;/code&gt; on the clipboard; bind it in
System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME). The app runs once per user: that command
reaches the running instance over a local socket and applies the profile there (one password prompt, tray
notice), or starts the app and applies it when nothing is running. A plain second launch just raises the window.
&lt;code&gt;--list-profiles&lt;/code&gt; prints the saved names.&lt;/p&gt;

&lt;h2&gt;Safe points&lt;/h2&gt;
&lt;p&gt;The &lt;code&gt;[[safe-points]]&lt;/code&gt; of &lt;code&gt;%3&lt;/code&gt; as an editable table and a frequency/voltage curve.
The governor scales along this curve and never leaves its range; &lt;code&gt;[frequency-range]&lt;/code&gt; and the runtime
controls are clamped to it. &lt;b&gt;Add point&lt;/b&gt; inserts halfway to the next point, &lt;b&gt;Remove&lt;/b&gt; deletes the selected
row, &lt;b&gt;Shipped defaults&lt;/b&gt; loads the governor's own table, &lt;b&gt;Revert&lt;/b&gt; goes back to the file. Before
&lt;b&gt;Apply safe points&lt;/b&gt; is enabled the list must pass the governor's rules (at least two points, unique
frequencies, voltage never dropping as frequency rises) and the hard rails shared with bc250-gpu-oc-bisect
(700–1100 mV, up to 2500 MHz). Above 2000 MHz or 1000 mV, or when a change raises the top frequency or lowers an
existing voltage, you get a warning: an unstable point freezes the board under load. Apply makes a backup and
asks for your password; finding a board's own ceiling safely is the job of
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Test a point before saving it&lt;/b&gt; uses the governor's root-only &lt;code&gt;TestMode&lt;/code&gt; D-Bus interface
(one &lt;code&gt;pkexec&lt;/code&gt; prompt): the GPU is pinned to the frequency and voltage you enter and the automatic
scaling stops, while thermal throttling stays active. Nothing is written to &lt;code&gt;config.toml&lt;/code&gt;. The
fields are prefilled from the selected row; a warning appears above 2000 MHz / 1000 mV or when the voltage is
below what the curve above would give. &lt;b&gt;Load&lt;/b&gt; picks a GPU load generator found on PATH (vkmark, glmark2,
vkcube or glxgears, in that order of preference); it is started with the test and killed when the test ends,
and if it dies while the point is pinned the status says so. Without one, load the GPU yourself and watch the
Overview. &lt;b&gt;Stop test&lt;/b&gt;, the timer (default 60 s, &lt;i&gt;Until stopped&lt;/i&gt; = 0), closing the app, or any action on
the Performance page ends the test by switching performance mode off, which returns the governor to normal
scaling with its start-up range. The result line then reports how long the point was held, the peak temperature
and the clock range seen; &lt;b&gt;Add to table&lt;/b&gt; puts the tested pair into the safe-points table (sorted, replacing
a point at the same frequency) so you can apply it. While a point is pinned the &lt;b&gt;kernel log&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) is watched for amdgpu trouble (ring timeouts, GPU resets, &lt;code&gt;*ERROR*&lt;/code&gt;
lines, SMU failures); the first such line aborts the test at once, releasing the point before the board freezes,
and is quoted in the result. A clean run says so too. Reading the kernel ring needs membership of the
&lt;code&gt;systemd-journal&lt;/code&gt; (or &lt;code&gt;wheel&lt;/code&gt;) group; otherwise the status says the log is not watched and
the test runs blind. A point the silicon cannot hold can still freeze the board faster than the kernel can log
it, so save your work first. Only the smu governor has D-Bus.&lt;/p&gt;

&lt;h2&gt;Performance&lt;/h2&gt;
&lt;p&gt;Runtime control of the governor over D-Bus, exactly what the governor's own
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; wrapper does. The changes apply immediately, need no password and are
lost at the next governor restart; &lt;code&gt;config.toml&lt;/code&gt; is not touched. &lt;i&gt;Copy runtime values to the Tuning page&lt;/i&gt;
carries the current range and thresholds over to the Tuning page so you can save them.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Performance mode&lt;/b&gt; is a toggle (red while on): on opens the full allowed (safe-points) range; off returns
to the range of &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Pin clock&lt;/b&gt; fixes the frequency and turns performance mode on.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Set range&lt;/b&gt; applies a runtime min/max.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Set load target&lt;/b&gt; and &lt;b&gt;Set temperatures&lt;/b&gt; change the load band (lower/upper %) and the throttling /
recovery temperatures the governor scales with, without touching performance mode or a running safe-point test.
The fields follow the governor's current values and are refilled when they change; impossible pairs (lower not
below upper, recovery not below throttling) disable the button.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;The controls are disabled when the service is not running or the bus name is not published; the reason is shown
under the controls. Enable &lt;code&gt;[dbus] enabled&lt;/code&gt; on the Tuning page and restart the governor if needed.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Per game&lt;/b&gt; builds the launch line for the governor's &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; wrapper:
plain performance mode, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; or
&lt;code&gt;--temperature&lt;/code&gt;, prefilled with the governor's current numbers, formatted for Steam launch options
(&lt;code&gt;… %command%&lt;/code&gt;), a Heroic/Lutris wrapper command, or a terminal. &lt;b&gt;Copy&lt;/b&gt; puts it on the clipboard.
The wrapper applies the setting, runs the game, and turns performance mode off when it exits, which also puts the
governor back on its start-up range. It needs D-Bus enabled, like the controls above.&lt;/p&gt;

&lt;h2&gt;Backups&lt;/h2&gt;
&lt;p&gt;Every write makes a copy &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; next to the config. The page lists them,
shows the difference between a copy and the current file, and &lt;b&gt;Restore selected&lt;/b&gt; puts the copy back (the current
file is backed up first, password asked once). The governor is restarted afterwards unless you untick that option.&lt;/p&gt;

&lt;h2&gt;Service&lt;/h2&gt;
&lt;p&gt;Start, stop, restart, enable or disable &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, with the output of
&lt;code&gt;systemctl status&lt;/code&gt; and a &lt;b&gt;live journal&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, last 200 lines and
everything that follows while the page is shown, up to 2000 kept). The filter box takes text or a regular
expression, case-insensitive; untick &lt;b&gt;Follow&lt;/b&gt; to read without being scrolled. Reading system units needs your
user in the &lt;code&gt;wheel&lt;/code&gt; or &lt;code&gt;systemd-journal&lt;/code&gt; group, which is the case on Bazzite. Each service
action asks for your password.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Check for updates&lt;/b&gt; compares the installed &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; RPM with the latest
release of &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
on GitHub (one request to api.github.com; also run at start unless turned off in Settings). A newer release is
shown in orange with a link to its notes. Update the package the way you installed it: COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; via &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; when layered, or the release tarball.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Export diagnostics…&lt;/b&gt; writes one text file for a bug report: app, governor and Bazzite versions, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; and its backups, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, the last 300 journal
lines, the D-Bus interface, kernel command line, amdgpu kernel messages, the hwmon sensors, and the raw
&lt;code&gt;gpu_metrics&lt;/code&gt; table (parsed and as a hex dump). Read the file and remove what you do not want to
share before attaching it to an issue.&lt;/p&gt;

&lt;h2&gt;Settings&lt;/h2&gt;
&lt;p&gt;App settings, stored per user. &lt;b&gt;System tray&lt;/b&gt;: show a tray icon whose tooltip carries the GPU load, clock,
temperature, performance mode and governor state; left-click shows or hides the window, the menu toggles
performance mode (when D-Bus is reachable) and quits. With &lt;i&gt;Closing the window keeps the app running in the
tray&lt;/i&gt; ticked, the window close button hides to the tray instead of quitting; use the tray menu to quit.
&lt;b&gt;Start at login&lt;/b&gt; writes &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (nothing
system-wide), optionally starting hidden in the tray with &lt;code&gt;--start-in-tray&lt;/code&gt;. Bazzite's KDE Plasma
session has a native tray, so this works out of the box; a GNOME session would need the AppIndicator extension.
&lt;b&gt;Alerts&lt;/b&gt; are desktop notifications via the tray icon (status bar only when the tray is off): the GPU reaching
a temperature you choose, the GPU reaching the governor's own throttling temperature (the runtime value when D-Bus
is reachable, else the one in &lt;code&gt;config.toml&lt;/code&gt;), and the governor service stopping or failing after the
app has seen it running. A temperature alert fires once per crossing and re-arms 5 °C below its threshold; the
same alert repeats at most every 5 minutes.&lt;/p&gt;

&lt;h2&gt;The older tt governor&lt;/h2&gt;
&lt;p&gt;Started with &lt;code&gt;--backend tt&lt;/code&gt; (or automatically when only &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;
is loaded), the app manages &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt; instead. That governor has
no fix-metrics, frequency range, D-Bus or GitHub releases, so the GPU Usage and Performance pages, those Tuning
sections, the &lt;code&gt;down-events&lt;/code&gt; field and the update check are hidden and the GPU load sensor stays
unavailable. Everything else, including &lt;code&gt;[timing]&lt;/code&gt; and &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, works the
same.&lt;/p&gt;

&lt;h2&gt;Privileges&lt;/h2&gt;
&lt;p&gt;The app runs as your normal user. Only four things need root and go through &lt;code&gt;pkexec&lt;/code&gt;:
the backup, the write of &lt;code&gt;config.toml&lt;/code&gt;, the &lt;code&gt;systemctl&lt;/code&gt; actions and the safe-point test
(&lt;code&gt;busctl&lt;/code&gt; on the root-only TestMode interface). The password is handled
by the desktop's polkit agent; the app never sees it.&lt;/p&gt;

&lt;h2&gt;Install and update&lt;/h2&gt;
&lt;p&gt;The release tarball contains &lt;code&gt;install.sh&lt;/code&gt;. It installs the app for your user only (a private venv
with PyQt6 under &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, the launcher
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, a desktop entry and the icon), so it appears in the
application menu. Run it again from a newer release to update, &lt;code&gt;./install.sh --uninstall&lt;/code&gt; removes it.
Nothing is layered with rpm-ostree and the governor's config is never touched.&lt;/p&gt;

&lt;h2&gt;Links&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;This app: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;The governor (filippor, SMU branch): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Licensed under the GNU General Public License v3.0 or later. The Inter font (SIL Open Font License) is bundled.&lt;/p&gt;
</source>
        <translation>
&lt;h1&gt;%1 &lt;small&gt;v%2&lt;/small&gt;&lt;/h1&gt;
&lt;p&gt;Ein kleines Frontend für &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, den GPU-Governor der &lt;b&gt;AMD BC-250&lt;/b&gt;
(Cyan Skillfish APU, gfx1013) auf &lt;b&gt;Bazzite&lt;/b&gt;. Der Governor muss bereits installiert sein; diese App
bearbeitet einen Abschnitt seiner Konfiguration und steuert seinen systemd-Dienst. Nichts anderes auf dem System
wird angerührt.&lt;/p&gt;

&lt;h2&gt;Übersicht&lt;/h2&gt;
&lt;p&gt;Zeigt, ob der Dienst läuft, ob die gepatchte &lt;code&gt;gpu_metrics&lt;/code&gt;-Tabelle des Governors über sysfs
eingebunden ist, ob ein GPU-Auslastungssensor verfügbar ist, sowie ein Diagramm der GPU-Auslastung (%), Temperatur (°C, linke
Achse) und des Takts (MHz, rechte Achse). Ein fehlender Messwert hinterlässt eine Lücke, nie eine vorgetäuschte Null. Die App behält die letzte Stunde
an Stichproben (eine alle zwei Sekunden), solange sie läuft; &lt;b&gt;Fenster&lt;/b&gt; wählt, wie viel davon das Diagramm zeigt (2, 10, 30 oder
60 Minuten), und &lt;b&gt;CSV exportieren …&lt;/b&gt; schreibt jede behaltene Stichprobe (Zeit, Auslastung, Takt, Temperatur, Socket-Leistung,
Leistungsmodus, Laufzeitbereich) in eine Datei. &lt;b&gt;Vergleichen …&lt;/b&gt; lädt eine solche Datei wieder ein und zeichnet sie gestrichelt hinter
die Live-Linien (neueste Stichprobe am rechten Rand, wie das Live-Fenster) und stellt die Durchschnittswerte
und Spitzenwerte beider Sitzungen unter das Diagramm (Auslastung, Takt, Temperatur, Socket-Leistung), damit eine Profil- oder Safe-Point-Änderung
gegen einen früheren Durchlauf beurteilt werden kann; &lt;b&gt;Leeren&lt;/b&gt; entfernt sie.&lt;/p&gt;
&lt;p&gt;Das Feld &lt;b&gt;gpu_metrics-Tabelle&lt;/b&gt; dekodiert die Tabelle, die der Kernel (oder der Governor) bereitstellt: Aktivitäten, Temperaturen,
Socket-/GFX-/CPU-Leistung, die GFX-, SoC-, Speicher- und Fabric-Takte, den Drosselstatus und die CPU-Kerntakte.
&lt;i&gt;(gepatcht)&lt;/i&gt; bedeutet, dass die Tabelle des Governors eingebunden ist; &lt;i&gt;(roh)&lt;/i&gt; ist die eigene Tabelle des Kernels, deren GFX-Aktivität
auf einem BC-250 der kaputte 655%-Wert ist und nicht als Auslastung verwendet wird.&lt;/p&gt;
&lt;p&gt;Der BC-250 hat normalerweise keinen &lt;code&gt;gpu_busy_percent&lt;/code&gt;-Sensor, aber der Governor misst die Auslastung selbst und
veröffentlicht sie, wenn &lt;b&gt;fix-metrics&lt;/b&gt; aktiviert ist, in der gepatchten &lt;code&gt;gpu_metrics&lt;/code&gt;-Tabelle, die er über sysfs einbindet. Die App
liest die Auslastung von dort; &lt;code&gt;gpu_busy_percent&lt;/code&gt; und &lt;code&gt;radeontop&lt;/code&gt; sind Rückfallebenen. Ohne jede
Quelle zeigt sie &lt;b&gt;k. A.&lt;/b&gt;, nie ein irreführendes 0 %, und der Tooltip verrät, was fehlt. Der GPU-Takt und die Temperatur stammen von den amdgpu-hwmon-
Sensoren; bei aktiviertem &lt;code&gt;fix-freq&lt;/code&gt; ist der Takt der echte SMU-Wert.&lt;/p&gt;

&lt;h2&gt;GPU-Auslastung&lt;/h2&gt;
&lt;p&gt;Bearbeitet den Abschnitt &lt;code&gt;[gpu-usage]&lt;/code&gt; von &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Schlüssel&lt;/th&gt;&lt;th&gt;Standard&lt;/th&gt;&lt;th&gt;Bedeutung&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Schreibt die gemessene Auslastung in eine gepatchte &lt;code&gt;gpu_metrics&lt;/code&gt;-
Tabelle und bindet sie über sysfs ein. Behebt die 655%-GPU-Auslastungsanzeige von MangoHud, dem Steam-Overlay und radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Patcht zusätzlich &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; mit dem von der
SMU gelesenen Takt. Behebt die falsche sysfs-Frequenz, vor allem nach dem 8-Core-Unlock. Unabhängig von fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; tastet das Busy-Bit der GPU ab;
&lt;i&gt;process&lt;/i&gt; scannt jeden Prozess, der die GPU nutzt (mehr CPU-Aufwand); &lt;i&gt;kernel&lt;/i&gt; benötigt einen gepatchten Kernel.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Wo die GPU-Temperatur gelesen wird: der DRM-ioctl (hält ein DRM-Handle
offen) oder die hwmon-Datei &lt;code&gt;temp1_input&lt;/code&gt;. Derselbe Sensor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Leert die gepatchte Tabelle alle N Aktualisierungszyklen.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;Und der Abschnitt &lt;code&gt;[gpu]&lt;/code&gt;: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, der Standard, wendet Takt und Spannung direkt über
die SMU an; &lt;i&gt;kernel&lt;/i&gt; geht stattdessen über die amdgpu-sysfs-Schnittstelle).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Änderungen anwenden&lt;/b&gt; (auf dieser Seite oder bei Tuning) fragt einmal nach Ihrem Passwort (pkexec). Es kopiert die aktuelle
Datei nach &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; und schreibt die ausstehenden Änderungen beider Seiten. Nur die bekannten
Schlüssel ändern sich; jede andere Zeile der Datei, einschließlich Kommentare, bleibt erhalten. Der Governor liest die Datei beim Start, daher
wird der Dienst anschließend neu gestartet, sofern Sie diese Option nicht abwählen.&lt;/p&gt;

&lt;h2&gt;Tuning&lt;/h2&gt;
&lt;p&gt;Bearbeitet die übrigen Abschnitte von &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Abschnitt&lt;/th&gt;&lt;th&gt;Schlüssel&lt;/th&gt;&lt;th&gt;Bedeutung&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Taktgrenzen in MHz, mit denen der Governor startet. &lt;i&gt;Kein Limit&lt;/i&gt;
(0) lässt die Grenze offen; Werte außerhalb der Safe-Points-Tabelle werden vom Governor begrenzt.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Takt hochfahren, wenn die Auslastung über &lt;i&gt;upper&lt;/i&gt; liegt,
herunterfahren, wenn sie unter &lt;i&gt;lower&lt;/i&gt; liegt. Ein großer Abstand hält den Takt stabil, ein enger folgt der Auslastung genau.
Die eigenen Standardwerte des Governors, wenn der Abschnitt fehlt, sind 95 % / 80 %; die mitgelieferte Datei verwendet 65 % / 50 %.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Drosselt oberhalb des ersten Werts (Standard
85 °C); erholt sich unterhalb des zweiten, der optional ist (&lt;i&gt;Nicht gesetzt&lt;/i&gt;) und niedriger sein muss.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Veröffentlicht &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; auf dem Systembus. Die
Seite „Leistung“ benötigt ihn; die mitgelieferte Datei schaltet ihn ein, der eingebaute Standard des Governors ist aus.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;Der Regelkreis: wie oft die Auslastung abgetastet und der Takt angepasst wird (µs), wie schnell sich der Takt
seinem Ziel annähert (MHz/ms), wie viele aufeinanderfolgende Busy-Stichproben zur schnelleren Burst-Rampe wechseln (&lt;i&gt;Aus&lt;/i&gt; lässt
den Schlüssel weg), und wie viele Anpassungszyklen bei niedriger Auslastung vergehen, bevor der Takt heruntergeht. Governor-Standardwerte: 2000 µs /
10 × sample, 1 / 200 × normal, aus, 10; die mitgelieferte Datei verwendet 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Totband in MHz: eine Nicht-Burst-Änderung, die kleiner als dieser Wert ist,
wird nicht angewendet (Standard 10).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Presets&lt;/b&gt; füllen Frequenzbereich, Auslastungsziel und Temperatur auf einmal aus (Timing bleibt unverändert): &lt;i&gt;Mitgelieferte Standardwerte&lt;/i&gt; (die Konfiguration des Pakets), &lt;i&gt;Ruhig&lt;/i&gt; (niedrigere
Takte, spätes Hochfahren), &lt;i&gt;Reaktionsschnell&lt;/i&gt; (frühes Hochfahren, voller Bereich) und &lt;i&gt;Maximaler Takt&lt;/i&gt; (bleibt nahe der Obergrenze).
Die Auswahlliste zeigt &lt;i&gt;Benutzerdefiniert&lt;/i&gt;, sobald sich ein Wert von jedem Preset unterscheidet. Ungültige Kombinationen (Minimum über
Maximum, Erholung nicht unter Drosselung, Anpassungsintervall kürzer als Abtastintervall, Burst-Rate nicht über normal) werden
unter dem Formular markiert und blockieren Anwenden.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Profile&lt;/b&gt; sind benannte Momentaufnahmen jedes Werts dieser Seite und der Seite „GPU-Auslastung“ (Safe Points sind nicht
enthalten), für Ihren Benutzer gespeichert in &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Aktuelles speichern als …&lt;/i&gt; speichert, was die Formulare gerade zeigen, angewendet oder nicht. &lt;i&gt;In Formulare laden&lt;/i&gt; füllt beide
Seiten, damit Sie wie gewohnt prüfen und anwenden können; &lt;i&gt;Jetzt anwenden&lt;/i&gt; schreibt das Profil in &lt;code&gt;config.toml&lt;/code&gt;
(zuerst Backup, eine Passwortabfrage), verwirft ausstehende Änderungen und startet den Governor neu. Bei aktiviertem Tray-Symbol
erledigt das Untermenü &lt;i&gt;Profil anwenden&lt;/i&gt; des Tray-Menüs dasselbe, ohne das Fenster zu öffnen. Für ein &lt;b&gt;Tastenkürzel&lt;/b&gt;
legt &lt;i&gt;Tastenkürzel-Befehl kopieren&lt;/i&gt; &lt;code&gt;bc250-governor-manager --profile 'Name'&lt;/code&gt; in die Zwischenablage; binden Sie es unter
Systemeinstellungen → Kurzbefehle (KDE) oder Tastatur → Benutzerdefinierte Kurzbefehle (GNOME) an eine Taste. Die App läuft einmal pro Benutzer: Dieser Befehl
erreicht die laufende Instanz über einen lokalen Socket und wendet das Profil dort an (eine Passwortabfrage, Tray-
Hinweis), oder startet die App und wendet es an, wenn nichts läuft. Ein einfacher zweiter Start hebt nur das Fenster hervor.
&lt;code&gt;--list-profiles&lt;/code&gt; gibt die gespeicherten Namen aus.&lt;/p&gt;

&lt;h2&gt;Safe Points&lt;/h2&gt;
&lt;p&gt;Die &lt;code&gt;[[safe-points]]&lt;/code&gt; von &lt;code&gt;%3&lt;/code&gt; als bearbeitbare Tabelle und eine Frequenz-/Spannungskurve.
Der Governor skaliert entlang dieser Kurve und verlässt nie ihren Bereich; &lt;code&gt;[frequency-range]&lt;/code&gt; und die Laufzeit-
steuerung werden darauf begrenzt. &lt;b&gt;Punkt hinzufügen&lt;/b&gt; fügt einen Punkt auf halbem Weg zum nächsten ein, &lt;b&gt;Entfernen&lt;/b&gt; löscht die ausgewählte
Zeile, &lt;b&gt;Mitgelieferte Standardwerte&lt;/b&gt; lädt die eigene Tabelle des Governors, &lt;b&gt;Zurücksetzen&lt;/b&gt; geht zur Datei zurück. Bevor
&lt;b&gt;Safe Points anwenden&lt;/b&gt; aktiviert wird, muss die Liste die Regeln des Governors erfüllen (mindestens zwei Punkte, eindeutige
Frequenzen, Spannung fällt nie mit steigender Frequenz) sowie die harten Grenzen, die mit bc250-gpu-oc-bisect geteilt werden
(700–1100 mV, bis zu 2500 MHz). Über 2000 MHz oder 1000 mV, oder wenn eine Änderung die Spitzenfrequenz anhebt oder eine
vorhandene Spannung senkt, erhalten Sie eine Warnung: ein instabiler Punkt lässt das Board unter Last einfrieren. Anwenden erstellt ein Backup und
fragt nach Ihrem Passwort; die eigene Belastungsgrenze eines Boards sicher herauszufinden ist die Aufgabe von
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Einen Punkt vor dem Speichern testen&lt;/b&gt; verwendet die nur für Root zugängliche &lt;code&gt;TestMode&lt;/code&gt;-D-Bus-Schnittstelle des Governors
(eine &lt;code&gt;pkexec&lt;/code&gt;-Abfrage): Die GPU wird auf die von Ihnen eingegebene Frequenz und Spannung festgelegt, und die automatische
Skalierung stoppt, während die thermische Drosselung aktiv bleibt. Es wird nichts in &lt;code&gt;config.toml&lt;/code&gt; geschrieben. Die
Felder werden aus der ausgewählten Zeile vorausgefüllt; eine Warnung erscheint über 2000 MHz / 1000 mV oder wenn die Spannung
niedriger ist als das, was die obige Kurve ergeben würde. &lt;b&gt;Auslastung&lt;/b&gt; wählt einen im PATH gefundenen GPU-Lasterzeuger (vkmark, glmark2,
vkcube oder glxgears, in dieser Reihenfolge der Bevorzugung); er wird mit dem Test gestartet und bei dessen Ende beendet,
und stirbt er, während der Punkt festgelegt ist, meldet der Status dies. Ohne ein solches Werkzeug belasten Sie die GPU selbst und beobachten die
Übersicht. &lt;b&gt;Test stoppen&lt;/b&gt;, der Timer (Standard 60 s, &lt;i&gt;Bis zum Stoppen&lt;/i&gt; = 0), das Schließen der App oder jede Aktion auf
der Seite „Leistung“ beendet den Test, indem der Leistungsmodus ausgeschaltet wird, was den Governor zur normalen
Skalierung mit seinem Startbereich zurückführt. Die Ergebniszeile meldet dann, wie lange der Punkt gehalten wurde, die Spitzentemperatur
und den gesehenen Taktbereich; &lt;b&gt;Zur Tabelle hinzufügen&lt;/b&gt; legt das getestete Paar in die Safe-Points-Tabelle (sortiert, ersetzt
einen Punkt bei derselben Frequenz), damit Sie es anwenden können. Während ein Punkt festgelegt ist, wird das &lt;b&gt;Kernel-Log&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) auf amdgpu-Probleme überwacht (Ring-Timeouts, GPU-Resets, &lt;code&gt;*ERROR*&lt;/code&gt;-
Zeilen, SMU-Fehler); die erste solche Zeile bricht den Test sofort ab, gibt den Punkt frei, bevor das Board einfriert,
und wird im Ergebnis zitiert. Ein sauberer Durchlauf meldet das ebenfalls. Das Lesen des Kernel-Rings erfordert Mitgliedschaft in der
Gruppe &lt;code&gt;systemd-journal&lt;/code&gt; (oder &lt;code&gt;wheel&lt;/code&gt;); andernfalls meldet der Status, dass das Log nicht überwacht wird und
der Test blind läuft. Ein Punkt, den die Hardware nicht halten kann, kann das Board schneller einfrieren lassen, als der Kernel
es protokollieren kann, speichern Sie also zuerst Ihre Arbeit. Nur der smu-Governor hat D-Bus.&lt;/p&gt;

&lt;h2&gt;Leistung&lt;/h2&gt;
&lt;p&gt;Laufzeitsteuerung des Governors über D-Bus, genau das, was der eigene
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;-Wrapper des Governors tut. Die Änderungen gelten sofort, benötigen kein Passwort und gehen
beim nächsten Governor-Neustart verloren; &lt;code&gt;config.toml&lt;/code&gt; bleibt unangetastet. &lt;i&gt;Laufzeitwerte auf die Seite „Tuning“ kopieren&lt;/i&gt;
überträgt den aktuellen Bereich und die Schwellenwerte auf die Seite „Tuning“, damit Sie sie speichern können.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Leistungsmodus&lt;/b&gt; ist ein Umschalter (rot, wenn aktiv): Ein öffnet den vollen zulässigen (Safe-Points-)Bereich; Aus kehrt
zum Bereich von &lt;code&gt;[frequency-range]&lt;/code&gt; zurück.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Takt festlegen&lt;/b&gt; legt die Frequenz fest und schaltet den Leistungsmodus ein.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Bereich festlegen&lt;/b&gt; wendet ein temporäres Minimum/Maximum zur Laufzeit an.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Auslastungsziel festlegen&lt;/b&gt; und &lt;b&gt;Temperaturen festlegen&lt;/b&gt; ändern das Auslastungsband (unterer/oberer %) und die Drossel-/
Erholungstemperaturen, mit denen der Governor skaliert, ohne den Leistungsmodus oder einen laufenden Safe-Point-Test zu beeinflussen.
Die Felder folgen den aktuellen Werten des Governors und werden bei Änderungen neu gefüllt; unmögliche Paare (unterer nicht
unter oberem, Erholung nicht unter Drosselung) deaktivieren die Schaltfläche.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Die Steuerelemente sind deaktiviert, wenn der Dienst nicht läuft oder der Busname nicht veröffentlicht ist; der Grund wird
unter den Steuerelementen angezeigt. Aktivieren Sie &lt;code&gt;[dbus] enabled&lt;/code&gt; auf der Seite „Tuning“ und starten Sie den Governor bei Bedarf neu.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Pro Spiel&lt;/b&gt; baut die Startzeile für den &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;-Wrapper des Governors:
einfacher Leistungsmodus, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; oder
&lt;code&gt;--temperature&lt;/code&gt;, vorausgefüllt mit den aktuellen Zahlen des Governors, formatiert für Steam-Startoptionen
(&lt;code&gt;… %command%&lt;/code&gt;), einen Heroic/Lutris-Wrapper-Befehl oder ein Terminal. &lt;b&gt;Kopieren&lt;/b&gt; legt sie in die Zwischenablage.
Der Wrapper wendet die Einstellung an, führt das Spiel aus und schaltet den Leistungsmodus beim Beenden aus, was auch den
Governor auf seinen Startbereich zurücksetzt. Er benötigt aktiviertes D-Bus, wie die obigen Steuerelemente.&lt;/p&gt;

&lt;h2&gt;Backups&lt;/h2&gt;
&lt;p&gt;Jeder Schreibvorgang erstellt eine Kopie &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; neben der Konfiguration. Die Seite listet sie auf,
zeigt den Unterschied zwischen einer Kopie und der aktuellen Datei, und &lt;b&gt;Auswahl wiederherstellen&lt;/b&gt; setzt die Kopie zurück (die aktuelle
Datei wird zuerst gesichert, Passwort wird einmal abgefragt). Der Governor wird anschließend neu gestartet, sofern Sie diese Option nicht abwählen.&lt;/p&gt;

&lt;h2&gt;Dienst&lt;/h2&gt;
&lt;p&gt;Startet, stoppt, startet neu, aktiviert oder deaktiviert &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, mit der Ausgabe von
&lt;code&gt;systemctl status&lt;/code&gt; und einem &lt;b&gt;Live-Journal&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, letzte 200 Zeilen und
alles, was folgt, während die Seite angezeigt wird, bis zu 2000 behalten). Das Filterfeld akzeptiert Text oder einen regulären
Ausdruck, ohne Berücksichtigung der Groß-/Kleinschreibung; deaktivieren Sie &lt;b&gt;Folgen&lt;/b&gt;, um ohne Scrollen zu lesen. Das Lesen von System-Units erfordert, dass Ihr
Benutzer in der Gruppe &lt;code&gt;wheel&lt;/code&gt; oder &lt;code&gt;systemd-journal&lt;/code&gt; ist, was auf Bazzite der Fall ist. Jede Dienst-
aktion fragt nach Ihrem Passwort.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Nach Updates suchen&lt;/b&gt; vergleicht das installierte &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt;-RPM mit dem neuesten
Release von &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
auf GitHub (eine Anfrage an api.github.com; wird auch beim Start ausgeführt, sofern nicht in den Einstellungen abgeschaltet). Ein neueres Release wird
orange mit einem Link zu seinen Versionshinweisen angezeigt. Aktualisieren Sie das Paket so, wie Sie es installiert haben: COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; über &lt;code&gt;rpm-ostree upgrade&lt;/code&gt;, wenn geschichtet, oder das Release-Tarball.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Diagnose exportieren …&lt;/b&gt; schreibt eine Textdatei für einen Fehlerbericht: App-, Governor- und Bazzite-Versionen, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; und ihre Backups, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, die letzten 300 Journal-
zeilen, die D-Bus-Schnittstelle, die Kernel-Befehlszeile, amdgpu-Kernelmeldungen, die hwmon-Sensoren und die rohe
&lt;code&gt;gpu_metrics&lt;/code&gt;-Tabelle (ausgewertet und als Hex-Dump). Lesen Sie die Datei und entfernen Sie, was Sie nicht
teilen möchten, bevor Sie sie einem Issue anhängen.&lt;/p&gt;

&lt;h2&gt;Einstellungen&lt;/h2&gt;
&lt;p&gt;App-Einstellungen, pro Benutzer gespeichert. &lt;b&gt;Systemabschnitt (Tray)&lt;/b&gt;: zeigt ein Tray-Symbol, dessen Tooltip GPU-Auslastung, Takt,
Temperatur, Leistungsmodus und Governor-Status enthält; Linksklick zeigt oder versteckt das Fenster, das Menü schaltet den
Leistungsmodus um (wenn D-Bus erreichbar ist) und beendet die App. Mit aktiviertem &lt;i&gt;Schließen des Fensters lässt die App im
Tray weiterlaufen&lt;/i&gt; versteckt die Schließen-Schaltfläche des Fensters es im Tray, statt die App zu beenden; zum Beenden das Tray-Menü verwenden.
&lt;b&gt;Beim Anmelden starten&lt;/b&gt; schreibt &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (nichts
systemweit), optional versteckt im Tray mit &lt;code&gt;--start-in-tray&lt;/code&gt;. Die KDE-Plasma-Sitzung von Bazzite
hat einen nativen Tray, also funktioniert dies von Haus aus; eine GNOME-Sitzung würde die AppIndicator-Erweiterung benötigen.
&lt;b&gt;Alarme&lt;/b&gt; sind Desktop-Benachrichtigungen über das Tray-Symbol (nur Statusleiste, wenn der Tray aus ist): die GPU erreicht
eine von Ihnen gewählte Temperatur, die GPU erreicht die eigene Drosseltemperatur des Governors (der Laufzeitwert, wenn D-Bus
erreichbar ist, sonst der aus &lt;code&gt;config.toml&lt;/code&gt;), und der Governor-Dienst stoppt oder schlägt fehl, nachdem die
App ihn laufend gesehen hat. Ein Temperaturalarm löst einmal pro Überschreitung aus und wird 5 °C unter seinem Schwellenwert erneut scharf geschaltet; der
gleiche Alarm wiederholt sich höchstens alle 5 Minuten.&lt;/p&gt;

&lt;h2&gt;Der ältere tt-Governor&lt;/h2&gt;
&lt;p&gt;Gestartet mit &lt;code&gt;--backend tt&lt;/code&gt; (oder automatisch, wenn nur &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;
geladen ist), verwaltet die App stattdessen &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. Dieser Governor hat
kein fix-metrics, keinen Frequenzbereich, kein D-Bus und keine GitHub-Releases, daher sind die Seiten „GPU-Auslastung“ und „Leistung“, jene Tuning-
Abschnitte, das Feld &lt;code&gt;down-events&lt;/code&gt; und die Update-Prüfung ausgeblendet, und der GPU-Auslastungssensor bleibt
nicht verfügbar. Alles andere, einschließlich &lt;code&gt;[timing]&lt;/code&gt; und &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, funktioniert
gleich.&lt;/p&gt;

&lt;h2&gt;Berechtigungen&lt;/h2&gt;
&lt;p&gt;Die App läuft als normaler Benutzer. Nur vier Dinge benötigen Root und laufen über &lt;code&gt;pkexec&lt;/code&gt;:
das Backup, das Schreiben von &lt;code&gt;config.toml&lt;/code&gt;, die &lt;code&gt;systemctl&lt;/code&gt;-Aktionen und der Safe-Point-Test
(&lt;code&gt;busctl&lt;/code&gt; auf der nur für Root zugänglichen TestMode-Schnittstelle). Das Passwort wird
vom Polkit-Agenten des Desktops verarbeitet; die App bekommt es nie zu sehen.&lt;/p&gt;

&lt;h2&gt;Installation und Update&lt;/h2&gt;
&lt;p&gt;Das Release-Tarball enthält &lt;code&gt;install.sh&lt;/code&gt;. Es installiert die App nur für Ihren Benutzer (ein privates venv
mit PyQt6 unter &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, den Starter
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, einen Desktop-Eintrag und das Symbol), sodass sie im
Anwendungsmenü erscheint. Erneut aus einem neueren Release ausführen, um zu aktualisieren; &lt;code&gt;./install.sh --uninstall&lt;/code&gt; entfernt sie.
Nichts wird mit rpm-ostree geschichtet, und die Konfiguration des Governors wird nie angerührt.&lt;/p&gt;

&lt;h2&gt;Links&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Diese App: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;Der Governor (filippor, SMU-Zweig): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Lizenziert unter der GNU General Public License v3.0 oder später. Die Inter-Schriftart (SIL Open Font License) ist beigefügt.&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>kein Telemetrie-Export: keine Spalte „time“</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>kein Telemetrie-Export: Spalte(n) %1 fehlen</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Leistungsmodus</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Voller Safe-Points-Bereich, schnellere Reaktion auf Auslastung. Wie die Schaltfläche „Ein“.</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Fester Takt</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency: legt den GPU-Takt für dieses Spiel fest (muss im zulässigen Bereich liegen).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Taktbereich</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range: ein vorübergehendes Minimum/Maximum, 0 = kein Limit.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Auslastungsziel</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target: untere/obere GPU-Auslastung, die das Hoch- und Herunterakten steuert.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Temperatur</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature: Drossel-/Erholungsschwellen in °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Steam-Startoptionen</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → Spiel → Eigenschaften → Allgemein → Startoptionen. Die ganze Zeile einfügen.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Heroic-/Lutris-Wrapper</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic: Spieleinstellungen → Erweitert → Wrapper-Befehl. Lutris: Runner-Optionen → Befehlspräfix. Nur der Wrapper-Teil wird benötigt; der Launcher hängt das Spiel selbst an.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Terminal/Skript</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>&lt;program&gt; durch den auszuführenden Befehl ersetzen.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>amdgpu-hwmon-Sensor</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metrics-Tabelle</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2 Min.</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10 Min.</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30 Min.</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60 Min.</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>average_gfx_activity der gepatchten gpu_metrics-Tabelle des Governors.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>amdgpu-gpu_busy_percent-sysfs-Sensor.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Fallback: radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Tabelle</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>GFX-Aktivität</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>MM-Aktivität</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>GFX-Temperatur</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>SoC-Temperatur</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>Socket-Leistung</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>GFX-Leistung</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>CPU-Leistung</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>GFX-Takt</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Durchschn. GFX-Takt</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>SoC-Takt</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Speichertakt</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Fabric-Takt</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>Drosselstatus</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>CPU-Kerne</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Nur cyan-skillfish-governor-smu veröffentlicht einen Auslastungswert (fix-metrics); der tt-Governor tut dies nicht, daher bleibt dies nicht verfügbar.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>cyan-skillfish-governor-smu installieren; er misst die Auslastung und veröffentlicht sie über gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>fix-metrics auf der Seite „GPU-Auslastung“ aktivieren und mit einem Neustart anwenden.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Den Governor-Dienst auf der Seite „Dienst“ starten; fix-metrics ist aktiviert, aber nichts veröffentlicht die Auslastung.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics ist aktiviert und der Dienst läuft, aber keine gepatchte gpu_metrics-Tabelle ist eingebunden: das Journal prüfen.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>Die gepatchte gpu_metrics-Tabelle enthält keinen gültigen Auslastungswert; das Journal auf der Seite „Dienst“ prüfen.</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1 Min. %2 s</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1 s</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 W (roh %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (ungültig)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C max.</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>kein Limit</translation>
    </message>
    <message>
        <source>%1 – %2 MHz</source>
        <translation>%1 – %2 MHz</translation>
    </message>
</context>
<context>
    <name>safepoints_page</name>
    <message>
        <source>At least %1 points are needed.</source>
        <translation>Mindestens %1 Punkte werden benötigt.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz kommt zweimal vor.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz liegt außerhalb von 1–%2 MHz.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 mV bei %2 MHz liegt außerhalb von %3–%4 mV.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 mV bei %2 MHz ist niedriger als %3 mV bei %4 MHz; die Spannung darf mit steigender Frequenz nicht sinken (Governor-Regel).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz liegt über %2 MHz, wo viele Boards anfangen, hart zu blockieren.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV liegt über %2 mV; Temperatur und Netzteil im Auge behalten.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Keine (GPU selbst belasten)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub antwortete %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>keine Verbindung (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>unerwartetes Tag %1</translation>
    </message>
</context>
</TS>
