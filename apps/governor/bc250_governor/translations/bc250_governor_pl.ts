<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="pl">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura GPU</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>GPU ma %1 °C (alarm ustawiony na %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Ograniczanie przez governor</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>GPU ma %1 °C, czyli co najmniej tyle, ile wynosi temperatura ograniczania governora (%2 °C); maksymalny zegar jest obniżany.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>nie powiodło się</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>zatrzymane</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>Usługa governora ma stan: %1; GPU działa z domyślnymi zegarami sterownika. Zobacz stronę Usługa.</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Kopie zapasowe</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Odśwież</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Przed każdym zapisem aplikacja kopiuje %1 do config.toml.bak-YYYYMMDD-HHMMSS obok niego. Wybierz kopię, aby zobaczyć różnice względem bieżącego pliku; Przywróć przywraca ją (bieżący plik jest najpierw zapisywany jako kopia zapasowa, więc nic nie ginie).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Kopie, od najnowszej</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Utworzono</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Rozmiar</translation>
    </message>
    <message>
        <source>File</source>
        <translation>Plik</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Brak kopii zapasowych.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Różnica: kopia zapasowa → bieżący plik</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Uruchom ponownie governor po przywróceniu</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Przywróć zaznaczoną</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Przywraca zaznaczoną kopię jako bieżącą konfigurację (wymaga hasła).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Wybierz kopię zapasową, aby porównać ją z bieżącym plikiem.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>Nie można odczytać %1: %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Identyczny z bieżącym plikiem.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Wczytaj ponownie z dysku</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Odrzuć zmiany na każdej stronie i pokaż ponownie wartości z config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Uruchom ponownie governor po zastosowaniu</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor odczytuje config.toml tylko przy starcie.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Zastosuj zmiany</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Prosi o hasło jednorazowo (pkexec), tworzy kopię zapasową config.toml z sygnaturą czasową i zapisuje %1. Oczekujące zmiany na drugiej stronie konfiguracji również są zapisywane.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 nie został znaleziony. Wygląda na to, że governor SMU Cyan Skillfish nie jest zainstalowany.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 jest zainstalowany, ale %2 nie istnieje.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Governor SMU Cyan Skillfish jest zainstalowany i skonfigurowany.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Uwierzytelnianie zostało anulowane.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec nie powiodło się (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Nieobsługiwana akcja usługi: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 nie ma interfejsu D-Bus.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 nie został znaleziony. Wygląda na to, że governor SMU Cyan Skillfish nie jest zainstalowany.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 jest zainstalowany, ale %2 nie istnieje.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Governor SMU Cyan Skillfish jest zainstalowany i skonfigurowany.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Uwierzytelnianie zostało anulowane.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec nie powiodło się (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Nieobsługiwana akcja usługi: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 nie ma interfejsu D-Bus.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctl nie powiodło się (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 nie jest obecny na magistrali systemowej (governor zatrzymany lub [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>Governor odpowiedział na magistrali, ale nie udało się odczytać jego właściwości.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Uwierzytelnianie zostało anulowane.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Nieobsługiwana metoda obciążenia GPU: %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Nieobsługiwane źródło temperatury: %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>Nieobsługiwana wartość gpu.set-method: %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every musi wynosić co najmniej 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals musi wynosić co najmniej 1 µs</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust nie może być krótszy niż sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples musi wynosić 0 (wyłączone) lub 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events musi wynosić co najmniej 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal musi być dodatnie</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst musi być większe niż normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust nie może być ujemne</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Częstotliwości nie mogą być ujemne</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min nie może przekraczać frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target wymaga 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling musi mieścić się w zakresie 0..100 °C</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery musi być niższa niż temperature.throttling (lub 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>Obciążenie GPU</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>napraw obciążenie GPU w gpu_metrics</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Zapisuje obciążenie mierzone przez governora do spatchowanej tabeli gpu_metrics i montuje ją nad sysfs, dzięki czemu MangoHud, nakładka Steam, radeontop i ta aplikacja pokazują prawdziwy procent zamiast błędu 655%.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>napraw zegar GPU w hwmon</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Zastępuje hwmon freq1_input zegarem odczytanym z SMU. Naprawia błędne raportowanie częstotliwości przez sysfs, głównie po odblokowaniu 8 rdzeni. Niezależne od fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Metoda obciążenia:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Źródło temperatury:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Zapisuj spatchowaną tabelę metryk co N cykli odświeżania (domyślnie 10).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>zastosuj zegar/napięcie przez:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>nowe wartości</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Zapisywane są tylko klucze zarządzane przez tę aplikację ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]); każda inna linia pliku, w tym komentarze i tabela safe-points, pozostaje bez zmian. Przed każdym zapisem tworzona jest obok niego kopia o nazwie config.toml.bak-YYYYMMDD-HHMMSS.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml jeszcze nie istnieje; zastosowanie je utworzy)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Wczytaj ponownie z dysku</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Odrzuć zmiany na każdej stronie i pokaż ponownie wartości z config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Uruchom ponownie governor po zastosowaniu</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor odczytuje config.toml tylko przy starcie.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Zastosuj zmiany</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Prosi o hasło jednorazowo (pkexec), tworzy kopię zapasową config.toml z sygnaturą czasową i zapisuje %1. Oczekujące zmiany na drugiej stronie konfiguracji również są zapisywane.</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>Filtr:</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>tekst lub wyrażenie regularne, bez rozróżniania wielkości liter</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Śledź</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Przewijaj do najnowszej linii. Odznacz, aby czytać bez przewijania.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Wyczyść</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Zapomnij dotychczas wyświetlone linie; nowe wpisy będą nadal napływać.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — łączenie…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>Śledzenie journalctl -u %1; przechowywanych jest do %2 linii.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>kod wyjścia %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl zatrzymany (%1). Twój użytkownik może wymagać członkostwa w grupie systemd-journal lub wheel, aby odczytywać jednostki systemowe. Ponawianie za %2 s…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl zakończony; ponowne uruchomienie za %1 s…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl nie jest dostępny w tym systemie; dziennik nie może zostać wyświetlony.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (potraktowane dosłownie, nie jest poprawnym wyrażeniem regularnym)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%1 z %2 linii pasuje%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>dziennik jądra nie jest odczytywalny dla tego użytkownika (dodaj go do grupy systemd-journal)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k zakończył się kodem %1</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl nie jest dostępny</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Dla gry</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>Governor dostarcza nakładkę (wrapper), która stosuje jedno z tych ustawień dla pojedynczego programu i wyłącza tryb wydajności ponownie po jego zakończeniu, co przywraca też normalny zakres. Wybierz, co gra ma otrzymać, i skopiuj linię do jej launchera.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Dla:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Kopiuj</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Skopiuj linię do schowka.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Zegar do przypięcia, MHz.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Dolny limit, 0 = brak limitu.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Górny limit, 0 = brak limitu.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Brak limitu</translation>
    </message>
    <message>
        <source>to</source>
        <translation>do</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>Poniżej tego obciążenia governor obniża zegar.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Powyżej tego obciążenia governor podwyższa zegar.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Ogranicz powyżej tej temperatury.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Wznów normalne zegary poniżej tej temperatury.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Ułamek 1, jak w config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>Dolny limit jest wyższy niż górny limit.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>Dolny cel obciążenia musi być niższy niż górny.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>Temperatura wznowienia musi być niższa niż temperatura ograniczania.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Skopiowano</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>Obciążenie GPU</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>Zegar GPU</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura GPU</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Moc</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Tryb wydajności</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Skopiowano: %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Przegląd</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>Obciążenie GPU</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Strojenie</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Punkty bezpieczne</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Wydajność</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Kopie zapasowe</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Usługa</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Ustawienia</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Pomoc</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Gotowe</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>Obciążenie %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Obciążenie N/D</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>tryb wydajności</translation>
    </message>
    <message>
        <source>running</source>
        <translation>działa</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>niezainstalowany</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>zatrzymane</translation>
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
        <translation>Nadal działa w zasobniku systemowym; użyj Zamknij z jego menu, aby wyjść.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 niezastosowanych zmian. Zamknąć mimo to?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>Usługa governora nie jest uruchomiona.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>N/D</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>Brak czujnika częstotliwości.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>Brak czujnika temperatury.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power z tabeli gpu_metrics (cały APU); SMU raportuje to w stałoprzecinkowym formacie 24.8, tu pokazane w watach</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>Tabela gpu_metrics nie raportuje mocy gniazda.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>brak limitu</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Włączone</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Wyłączone</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Bieżący zakres %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus nieosiągalny.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Brak</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>Działa</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Niepowodzenie</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Zatrzymane</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> stron ma</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> strona ma</translation>
    </message>
    <message>
        <source> and </source>
        <translation> i </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Niezastosowane zmiany: %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Nieprawidłowe wartości</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>Nie można zapisać config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Konfiguracja zastosowana</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, kopia zapasowa: %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Zapisano, ale ponowne uruchomienie się nie powiodło</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml zostało zaktualizowane, ale nie udało się ponownie uruchomić governora.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>Nie zwrócono żadnego tekstu błędu.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — ponowne uruchomienie się nie powiodło</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, governor uruchomiony ponownie</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Zastosuj punkty bezpieczne</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>Zapisać %1 punktów bezpiecznych (%2–%3 MHz) do config.toml?

Governor będzie skalować się wzdłuż tej krzywej. Punkt, którego krzem nie jest w stanie utrzymać, zawiesza płytkę pod obciążeniem; najpierw tworzona jest kopia zapasowa bieżącego pliku, którą można przywrócić ze strony Kopie zapasowe.</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Punkty bezpieczne zastosowane</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>brak zapisanych</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>Brak profilu o nazwie '%1' (znane: %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Profil '%1' wczytany do formularzy; zastosuj, aby go zapisać</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Zastosuj profil</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>Zastosować '%1'? %2 niezastosowanych zmian zostanie odrzuconych.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Nieprawidłowy profil</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>Nie można zastosować '%1': %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Profil '%1' zastosowany</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Profil '%1' zastosowany, governor uruchomiony ponownie.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Przypisz to polecenie do klawisza w ustawieniach skrótów swojego środowiska; dociera ono do działającej aplikacji i stosuje profil.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Zapisz profil</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Nazwa profilu:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Zastąp profil</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>'%1' istnieje. Zastąpić go bieżącymi wartościami formularza?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Profil '%1' zapisany</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Usuń profil</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>Usunąć profil '%1'?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Profil '%1' usunięty</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>Zastąpić %1 przez %2?

Najpierw tworzona jest kopia zapasowa bieżącego pliku.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
Governor zostanie potem uruchomiony ponownie.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Przywróć kopię zapasową</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>Nie można przywrócić kopii zapasowej</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>Przywrócono %1</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Dostępna aktualizacja governora %1 (zainstalowano %2); zobacz stronę Usługa</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Dostępna aktualizacja governora %1.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Eksportuj historię telemetrii</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>Pliki CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>Nie można zapisać pliku CSV</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 próbek (%2–%3) zapisano w %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Porównaj z wcześniejszym eksportem telemetrii</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>Pliki CSV (*.csv);;Wszystkie pliki (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>Nie można odczytać pliku CSV</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Nie ma czego porównywać</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>Plik nie zawiera próbek z odczytywalnym czasem.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 próbek referencyjnych z %2 narysowano przerywaną linią</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Eksportuj diagnostykę</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>Pliki tekstowe (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Eksport nie powiódł się</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Diagnostyka wyeksportowana</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Zapisano w %1.

Przeczytaj to przed dołączeniem do zgłoszenia błędu i usuń wszystko, czym nie chcesz się dzielić.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1: wykonano</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1 nie powiodło się</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>Test zakończony z powodu '%1' na stronie Wydajność.</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1: wykonano</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1 nie powiodło się</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>Governor nie zwrócił tekstu błędu.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Tryb wydajności włączony</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Tryb wydajności wyłączony</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Stała częstotliwość %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Zakres w czasie działania %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Cel obciążenia %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>nieustawione</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Temperatura %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Wartości z czasu działania skopiowane na stronę Strojenie; zastosuj, aby je zapisać</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>przez %1 s</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>aż do zatrzymania</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> i uruchom %1 do obciążenia</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Testuj punkt bezpieczny</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>Przypiąć GPU do %1 MHz przy %2 mV %3%4?

Governor stosuje tę parę dokładnie tak, jak podano, i zatrzymuje automatyczne skalowanie; ograniczanie termiczne pozostaje aktywne. Punkt, którego krzem nie jest w stanie utrzymać, zawiesza płytkę pod obciążeniem. Nic nie jest zapisywane do config.toml. Zostaniesz poproszony o hasło (interfejs TestMode jest dostępny tylko dla roota).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>Tryb testowy nie powiódł się</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>%1 nie można było uruchomić (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Tryb testowy: %1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>przerwany po błędzie GPU w dzienniku jądra</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>uległ awarii</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>zakończony z kodem %1</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2 podczas przypięcia punktu</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Test %1 MHz @ %2 mV %3 po %4 s</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> przy obciążeniu %1</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>szczyt %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>zegar %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>zegar %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ jądro: %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+%1 więcej)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>dziennik jądra nie jest monitorowany</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>brak błędów GPU w dzienniku jądra</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. Governor znów skaluje normalnie.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>zakończone przez licznik czasu</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>Nie można zakończyć testu</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Ponowne uruchomienie governora na stronie Usługa również kończy tryb testowy.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>Governor zatrzymany; test zakończył się wraz z nim.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, pozostało %1 s</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 obciąża GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Obciąż GPU samodzielnie.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Dziennik jądra nieodczytywalny, brak wykrywania zawieszeń.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Dziennik jądra monitorowany.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Testowanie %1 MHz @ %2 mV%3.%4%5 Obserwuj Przegląd; Zatrzymaj test wraca do normalnego skalowania.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Przegląd</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>Stan w czasie działania</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Usługa governora</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Nadpisanie gpu_metrics</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>Czujnik obciążenia GPU</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (zapisane)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Tryb wydajności</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>Obciążenie GPU, zegar i temperatura</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Okno:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Ile z ostatnich %1 minut pokazuje wykres; eksport zawsze zawiera wszystko, co zostało zachowane.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>Eksportuj CSV…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Zapisuje każdą zachowaną próbkę (czas, obciążenie, zegar, temperatura, moc gniazda, tryb wydajności, zakres w czasie działania) jako plik CSV.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Porównaj…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Wczytuje wcześniejszy eksport CSV i rysuje go przerywaną linią za liniami na żywo, najnowsza próbka przy prawej krawędzi, ze średnimi obu sesji pod wykresem.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Wyczyść</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Usuń sesję referencyjną z wykresu.</translation>
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
        <translation>Obciążenie %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Temperatura °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Zegar MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Obciążenie % (ref.)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Temperatura °C (ref.)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Zegar MHz (ref.)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>tabela gpu_metrics</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>BC-250 zwykle nie udostępnia czujnika gpu_busy_percent, ale governor sam mierzy obciążenie i publikuje je w swojej spatchowanej tabeli gpu_metrics, gdy fix-metrics jest włączone, a usługa działa. Aplikacja odczytuje je stamtąd; brakujący czujnik jest pokazywany jako N/D, nigdy jako 0%.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>Niezainstalowany</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Aktywna</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>SubState: %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Niepowodzenie</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>Jednostka zakończyła się niepowodzeniem; zobacz stronę Usługa, aby przejrzeć dziennik.</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Nieaktywna</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>nieznany</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Zamontowana</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>Niezamontowana</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>Governor montuje swoją spatchowaną tabelę gpu_metrics nad plikiem sysfs, gdy fix-metrics jest włączone, a usługa działa.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Włączona</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Wyłączona</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Wartość zapisana w config.toml.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>Niedostępna</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Dostępna</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>obciążenie %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>obciążenie N/D</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>zegar %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>temperatura %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Bieżący: %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. Brak użytecznego czujnika obciążenia GPU: %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Osiągalny</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor odpowiada na magistrali systemowej.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Włączone</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Wyłączone</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Bieżący zakres %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>brak limitu</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Nieosiągalny</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Nieznany</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Wymaga uruchomionego governora z włączonym [dbus].</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>Obciążenie GPU, zegar i temperatura, ostatnie %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (zarejestrowano %1 min %2 s)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Referencja %1 (%2): %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Okno na żywo (%1): %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>Brak odczytywalnej tabeli gpu_metrics v2.x w /sys/class/drm/card*/device.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (spatchowana)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (surowa)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>brak</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Tabela publikowana przez governora (fix-metrics): aktywność GFX jest jego własnym pomiarem.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Surowa tabela jądra: aktywność GFX to błędna wartość firmware (błąd 655%); włącz fix-metrics, aby uzyskać prawdziwą.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Surowa tabela jądra.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Wydajność</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Odśwież</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Sterowanie w czasie działania przez D-Bus (com.cyanskillfish.Governor): stosowane natychmiast, nie wymaga hasła i jest tracone przy kolejnym ponownym uruchomieniu governora. config.toml pozostaje bez zmian; użyj strony Strojenie, aby zapisać wartości na stałe. Tryb wydajności otwiera pełny zakres punktów bezpiecznych; stała częstotliwość przypina zegar; cel obciążenia i progi temperatury zmieniają sposób skalowania governora bez zmiany trybu.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>Stan w czasie działania</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Tryb wydajności</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Bieżący zakres</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Zakres przy starcie ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Dozwolony zakres (punkty bezpieczne)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Cel obciążenia (dolny / górny)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Temperatura (ograniczanie / wznowienie)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Sterowanie</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Tryb wydajności: wyłączony</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled: włączenie pozwala governorowi używać całego dozwolonego zakresu i szybciej reagować na obciążenie; wyłączenie wraca do zakresu, z którym governor wystartował.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Tryb:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency: tryb wydajności z zegarem przypiętym tutaj. Musi mieścić się w dozwolonym zakresie.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Przypnij zegar</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Stała częstotliwość:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Brak limitu</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Dolny limit zegaru na teraz; Brak limitu = najniższy punkt bezpieczny.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Górny limit zegaru na teraz; Brak limitu = najwyższy punkt bezpieczny.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Ustaw zakres</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max): tymczasowy zakres, opuszcza tryb wydajności.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>do</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Zakres w czasie działania:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>Poniżej tego obciążenia GPU governor obniża zegar krokowo.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Powyżej tego obciążenia GPU governor podwyższa zegar krokowo.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Ustaw cel obciążenia</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper): pasmo obciążenia, w którym governor utrzymuje GPU, do kolejnego ponownego uruchomienia. Nie dotyczy trybu wydajności.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Cel obciążenia:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Powyżej tej temperatury governor obniża maksymalny zegar.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Nieustawione</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>Poniżej tej temperatury ponownie dozwolony jest pełny zakres; Nieustawione = własna histereza governora.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Ustaw temperatury</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery): do kolejnego ponownego uruchomienia. Nie dotyczy trybu wydajności.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Temperatura:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Skopiuj wartości z czasu działania na stronę Strojenie</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Umieszcza bieżący zakres, cel obciążenia i temperatury w formularzu Strojenie, abyś mógł je zapisać do config.toml.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Osiągalny</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor odpowiada na magistrali systemowej.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Włączone</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Wyłączone</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Właściwość Enabled interfejsu PerformanceMode.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Tryb wydajności: włączony</translation>
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
        <translation>nieustawione</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Nieosiągalny</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Nieznany</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>Usługa governora nie jest uruchomiona (strona Usługa).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus jest wyłączony w config.toml: włącz go na stronie Strojenie i zastosuj z ponownym uruchomieniem.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>Governor nie odpowiedział na magistrali systemowej.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>Sterowanie wyłączone: %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>dolny cel obciążenia musi być niższy niż górny</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>temperatura wznowienia musi być niższa niż temperatura ograniczania (lub Nieustawione)</translation>
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
        <translation>Nazwane migawki tej strony i strony Obciążenie GPU, przechowywane tylko dla Twojego użytkownika. Punkty bezpieczne nie są częścią profilu.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>Wczytaj do formularzy</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Wypełnia formularze Strojenie i Obciążenie GPU; nic nie jest zapisywane, dopóki nie zastosujesz.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Zastosuj teraz</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Zapisuje profil do config.toml (najpierw kopia zapasowa, jedno pytanie o hasło) i ponownie uruchamia governor. Oczekujące zmiany na stronach konfiguracji są odrzucane.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Zapisz bieżące jako…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Zapisuje wartości z formularzy od razu (zastosowane lub nie) pod podaną nazwą.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Usuń</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Skopiuj polecenie skrótu klawiszowego</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Umieszcza w schowku linię poleceń, która stosuje ten profil w działającej aplikacji. Przypisz ją do klawisza w Ustawieniach systemowych → Skróty (KDE) lub Klawiatura → Niestandardowe skróty (GNOME), aby przełączać profile bez otwierania okna.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Brak profili: skonfiguruj formularze i użyj Zapisz bieżące jako…</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Punkty bezpieczne</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Wczytaj ponownie z dysku</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>Sekcje [[safe-points]] pliku %1 definiują krzywą częstotliwość/napięcie, wzdłuż której skaluje się governor. Nigdy nie wychodzi poza zakres między najniższym a najwyższym punktem; [frequency-range] i sterowanie w czasie działania są do niego przycinane. Edytuj ostrożnie: złe napięcia mogą zawiesić lub uszkodzić płytkę. Zastosuj najpierw sprawdza reguły governora i twarde granice (%2–%3 mV, do %4 MHz), a następnie tworzy kopię zapasową.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Punkty</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Częstotliwość</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Napięcie</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Dodaj punkt</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Dodaje punkt po zaznaczonym, w połowie drogi do następnego.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Usuń</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Sortuj</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Uporządkuj wiersze według częstotliwości (Zastosuj robi to i tak).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Krzywa</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Zastosuj punkty bezpieczne</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Zapisuje bloki [[safe-points]] do config.toml (prosi o hasło, najpierw tworzy kopię zapasową).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Uruchom ponownie governor po tym</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>Governor odczytuje config.toml tylko przy starcie.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Cofnij</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Powrót do punktów z pliku.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Domyślne z dystrybucji</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>Aktywne punkty z domyślnego pliku default-config.toml governora: %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Testuj punkt przed zapisaniem (czas działania, root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode przez D-Bus przypina tę częstotliwość i napięcie od razu i zatrzymuje automatyczne skalowanie; ograniczanie termiczne governora pozostaje aktywne. Nic nie jest zapisywane do config.toml, a governor stosuje parę dokładnie tak, jak podano, więc pozostań w granicach twardych limitów. Obciąż GPU, gdy test trwa. Zatrzymaj test (lub licznik czasu) wyłącza tryb wydajności, co wraca do normalnego skalowania z zakresem startowym. Punkt, którego krzem nie jest w stanie utrzymać, zawiesza płytkę; miej zapisaną swoją pracę.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Obciążenie:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Generator obciążenia GPU znaleziony w PATH, uruchamiany wraz z testem i zabijany po jego zakończeniu. Jeśli zakończy się awarią podczas przypięcia punktu, zostanie to zgłoszone.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>Nie znaleziono narzędzia obciążającego (vkmark, glmark2, vkcube ani glxgears): uruchom samodzielnie grę lub benchmark podczas testu.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Wstępnie wypełnione z zaznaczonego wiersza; edytuj dowolnie.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>Do zatrzymania</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>Aplikacja sama kończy test po tym czasie (0 = tylko przez Zatrzymaj test).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Częstotliwość:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Napięcie:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Dla:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Rozpocznij test</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Prosi o hasło (pkexec): interfejs TestMode jest dostępny tylko dla roota.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Zatrzymaj test</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Dodaj do tabeli</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Umieszcza tę parę częstotliwość/napięcie w powyższej tabeli punktów bezpiecznych (posortowanej według częstotliwości, zastępując punkt o tej samej częstotliwości). Zastosuj, aby zapisać.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Znalezienie, jak daleko może pójść Twoja własna płytka (wyższa szczytowa częstotliwość, niższe napięcia), to zadanie dla %1: testuje on krok po kroku pod zweryfikowanym obciążeniem i może zainstalować wynik. Edytuj punkty ręcznie tylko wtedy, gdy wiesz, co krzem toleruje.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 punktów: %2 MHz @ %3 mV aż do %4 MHz @ %5 mV.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>Brak [[safe-points]]; governor wróciłby do 350 MHz @ 700 mV i 2000 MHz @ 1000 mV.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>podnosi szczytową częstotliwość z %1 do %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>obniża napięcie przy %1 istniejących punktach</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Ta zmiana %1: niestabilny punkt może zawiesić płytkę pod obciążeniem. Zweryfikuj ją najpierw za pomocą bc250-gpu-oc-bisect.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> i </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>brak limitu</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor (D-Bus): dozwolony zakres %1–%2 MHz, bieżący zakres %3–%4 MHz.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz jest powyżej %2 MHz, gdzie wiele płytek twardo się zawiesza</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV jest powyżej %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>powyższa krzywa dałaby %1 mV przy %2 MHz; to jest niższe</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>Interfejs D-Bus governora jest nieosiągalny (usługa zatrzymana lub [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Usługa</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Sprawdź dostępność aktualizacji</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Porównaj zainstalowany RPM z najnowszym wydaniem na GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Eksportuj diagnostykę…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Zapisz wersje, config.toml, stan usługi, dziennik i surową tabelę gpu_metrics do pliku tekstowego na potrzeby zgłoszenia błędu.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Odśwież</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Jednostka znaleziona</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Aktywna</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Włączona przy starcie</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Nadpisanie gpu_metrics</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Wersja</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Uruchom</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Zatrzymaj</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Uruchom ponownie</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Włącz przy starcie</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Wyłącz przy starcie</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (prosi o hasło).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Dziennik (na żywo)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Tak</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>Nie — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Tak (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>Nie (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>niewczytana</translation>
    </message>
    <message>
        <source>No</source>
        <translation>Nie</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>informacje o wydaniu</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>wydania</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Pakiet niezainstalowany</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Sprawdzanie…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Ustawienia</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Te ustawienia dotyczą aplikacji, nie governora. Są przechowywane dla każdego użytkownika.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Zasobnik systemowy</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Pokaż ikonę w zasobniku z obciążeniem GPU, zegarem i temperaturą w podpowiedzi</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Zamknięcie okna pozostawia aplikację działającą w zasobniku</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Kliknij lewym przyciskiem ikonę w zasobniku, aby pokazać lub ukryć okno; menu przełącza również tryb wydajności (gdy D-Bus jest osiągalny) i zamyka aplikację.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>To środowisko graficzne nie oferuje zasobnika systemowego (w GNOME zainstaluj rozszerzenie AppIndicator).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Uruchom przy logowaniu</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Uruchom aplikację przy logowaniu</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…ukryte w zasobniku, bez otwierania okna</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Aktualizacje governora</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Sprawdź dostępność nowszego wydania governora przy starcie aplikacji</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Jedno zapytanie do api.github.com o najnowsze wydanie filippor/cyan-skillfish-governor, porównane z zainstalowanym RPM. Nic więcej nie jest wysyłane. Strona Usługa ma to samo sprawdzenie jako przycisk.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Alarmy</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Powiadamiaj, gdy temperatura GPU osiągnie</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Powiadamiaj, gdy governor zaczyna ograniczanie z powodu temperatury</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Powiadamiaj, gdy usługa governora zatrzyma się lub zakończy niepowodzeniem samoistnie</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Pokazywane jako powiadomienia pulpitu przez ikonę w zasobniku (w pasku stanu, gdy zasobnik jest wyłączony). Jeden komunikat na zdarzenie: alarm temperatury uzbraja się ponownie, gdy GPU ochłodzi się o 5 °C poniżej progu, a ten sam alarm powtarza się nie częściej niż co 5 minut.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Nie można zapisać %1: %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Wpis: %1
Polecenie: %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Zapisuje wpis pulpitu w %1; nic nie jest instalowane systemowo.</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Nieznany</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Narzędzie obciążające już działa.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1 nie zostało znalezione w PATH.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 nie uruchomiło się: %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>obciążenie %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>zegar %1 MHz (maks. %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (maks. %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>brak odczytów</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Ukryj okno</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Tryb wydajności</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Zastosuj profil</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Zamknij</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Pokaż okno</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Strojenie</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Preset:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>Formularz nie pasuje do żadnego presetu.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Wypełnia poniższy formularz; nic nie jest zapisywane, dopóki nie zastosujesz.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>limity zegara przy starcie</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Najniższy zegar, jaki może wybrać governor. 0 (Brak limitu) = najniższy punkt bezpieczny.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Najwyższy zegar, jaki może wybrać governor. 0 (Brak limitu) = najwyższy punkt bezpieczny.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Minimum:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Maksimum:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>Wartości spoza tabeli punktów bezpiecznych w config.toml są przycinane przez governora.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>kiedy zmieniać zegar</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>Obciążenie GPU, powyżej którego governor podnosi zegar (górne).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>Obciążenie GPU, poniżej którego governor obniża zegar (dolne).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Podnieś powyżej:</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Obniż poniżej:</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Szeroki odstęp utrzymuje stabilny zegar; wąski odstęp dokładnie podąża za obciążeniem. Domyślne wartości governora, gdy sekcja jest nieobecna: 95% / 80%.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>ograniczanie termiczne</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Powyżej tej temperatury GPU governor obniża zegar (domyślnie 85).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Nieustawione</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>Poniżej tej temperatury ograniczanie się kończy. Musi być niższa niż temperatura ograniczania; Nieustawione pomija klucz w config.toml.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Ograniczaj powyżej:</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Wznów poniżej:</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>sterowanie w czasie działania</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>publikuj com.cyanskillfish.Governor na magistrali systemowej</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Potrzebne przez stronę Wydajność tej aplikacji i przez nakładkę uruchomieniową cyan-skillfish-performance-mode.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>pętla sterująca</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>jak często próbkowana jest flaga zajętości GPU (domyślnie governora 2000 µs, plik dystrybucyjny 250 µs). Używane przez metodę obciążenia busy-flag.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>jak często przeliczany jest docelowy zegar (domyślnie governora 10 × sample, plik dystrybucyjny 100 000 µs). Nie może być krótszy niż interwał próbkowania.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Próbkuj co:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Dostosuj co:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>jak szybko zegar zmierza do celu (domyślnie 1 MHz/ms).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>tempo narastania w trybie burst; musi być wyższe niż tempo normalne (domyślnie governora 200 × normalne, plik dystrybucyjny 50 MHz/ms).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Tempo narastania:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Tempo narastania burst:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> próbek</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Wyłączone</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>tyle kolejnych próbek zajętości przełącza na tempo narastania burst, dzięki czemu gra, która nagle obciąża GPU, szybko otrzymuje swój zegar (1..%1; Wyłączone pomija klucz, plik dystrybucyjny 60).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Burst po:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> zdarzeniach</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>cykle dostosowania z obciążeniem poniżej dolnego celu, zanim zegar zostanie obniżony (domyślnie governora 10, plik dystrybucyjny 5). Wyższa wartość = bardziej stabilny zegar.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Obniżaj po:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Szybsze próbkowanie i dostosowywanie reagują szybciej, ale kosztują więcej czasu CPU. Tryb burst skraca opóźnienie przy starcie gry; więcej zdarzeń obniżania zapobiega spadkowi zegaru podczas krótkich przerw.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>martwa strefa</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>zmiana zegaru poza trybem burst mniejsza niż ta wartość nie jest stosowana (domyślnie 10). Zapobiega ciągłym drobnym zapisom do SMU.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Ignoruj zmiany poniżej:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>sekcje strojenia</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>Governor raportuje zakres punktów bezpiecznych %1–%2 MHz; wartości spoza niego są przycinane.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Wczytaj ponownie z dysku</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Odrzuć zmiany na każdej stronie i pokaż ponownie wartości z config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Uruchom ponownie governor po zastosowaniu</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor odczytuje config.toml tylko przy starcie.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Zastosuj zmiany</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Prosi o hasło jednorazowo (pkexec), tworzy kopię zapasową config.toml z sygnaturą czasową i zapisuje %1. Oczekujące zmiany na drugiej stronie konfiguracji również są zapisywane.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>niezainstalowany</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (najnowsza: nieznana — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (najnowsza: nieznana)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → dostępna %2 (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (aktualna, najnowsze wydanie %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (najnowsze wydanie: %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Próbkuje pojedynczy bit zajętości GPU w timing.intervals.sample (domyślne). Najtańsze, działa wszędzie.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Skanuje każdy proces korzystający z GPU. Więcej pracy CPU niż busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Odczytuje własną wartość obciążenia jądra. Wymaga spatchowanego jądra, którego standardowe Bazzite nie posiada.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>ioctl AMDGPU_INFO_SENSOR_GPU_TEMP; utrzymuje otwarty uchwyt urządzenia DRM podczas działania governora (domyślne).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Odczytuje zamiast tego amdgpu hwmon temp1_input, więc żaden klient DRM nie pozostaje otwarty. Ten sam czujnik.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Rozmawia bezpośrednio z SMU (API bc250collective); stosuje napięcie punktów bezpiecznych razem z zegarem (domyślne).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Przechodzi przez interfejs sysfs amdgpu (pp_od_clk_voltage) zamiast przez SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Domyślne z dystrybucji</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Cichy</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Responsywny</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Maksymalny zegar</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>Wartości z pliku config.toml instalowanego przez pakiet governora.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>Najniższe zegary, które nadal nadążają: podnoszą się późno, szczyt 1500 MHz, ograniczanie przy 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Podnosi się wcześnie i pozwala na pełny bezpieczny zakres, kosztem więcej ciepła i mocy.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Pozostaje blisko górnej granicy bezpiecznego zakresu; bliskie stałemu zegarowi, przy zachowaniu włączonego ograniczania termicznego.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Niestandardowy</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Brak limitu</translation>
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
&lt;p&gt;Mała nakładka na &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, governor GPU układu &lt;b&gt;AMD BC-250&lt;/b&gt;
(APU Cyan Skillfish, gfx1013) w &lt;b&gt;Bazzite&lt;/b&gt;. Governor musi być już zainstalowany; ta aplikacja
edytuje jedną sekcję jego konfiguracji i steruje jego usługą systemd. Nic innego w systemie
nie jest dotykane.&lt;/p&gt;

&lt;h2&gt;Przegląd&lt;/h2&gt;
&lt;p&gt;Pokazuje, czy usługa działa, czy spatchowana tabela &lt;code&gt;gpu_metrics&lt;/code&gt; governora jest
zamontowana nad sysfs, czy dostępny jest czujnik obciążenia GPU, oraz wykres obciążenia GPU (%), temperatury (°C, lewa
oś) i zegaru (MHz, prawa oś). Brakujący odczyt pozostawia lukę, nigdy fałszywe zero. Aplikacja przechowuje ostatnią godzinę
próbek (jedną co dwie sekundy) podczas działania; &lt;b&gt;Okno&lt;/b&gt; wybiera, ile z tego pokazuje wykres (2, 10, 30 lub
60 minut), a &lt;b&gt;Eksportuj CSV…&lt;/b&gt; zapisuje każdą zachowaną próbkę (czas, obciążenie, zegar, temperatura, moc gniazda,
tryb wydajności, zakres w czasie działania) do pliku. &lt;b&gt;Porównaj…&lt;/b&gt; wczytuje taki plik z powrotem i rysuje go przerywaną linią za
liniami na żywo (najnowsza próbka przy prawej krawędzi, tak jak w oknie na żywo) oraz umieszcza pod wykresem średnie
i szczyty obu sesji (obciążenie, zegar, temperatura, moc gniazda), dzięki czemu zmianę profilu lub punktu bezpiecznego można ocenić
względem wcześniejszego przebiegu; &lt;b&gt;Wyczyść&lt;/b&gt; usuwa ją.&lt;/p&gt;
&lt;p&gt;Pole &lt;b&gt;tabela gpu_metrics&lt;/b&gt; dekoduje tabelę udostępnianą przez jądro (lub governor): aktywności, temperatury,
moc gniazda/GFX/CPU, zegary GFX, SoC, pamięci i fabric, stan ograniczania oraz zegary rdzeni CPU.
&lt;i&gt;(spatchowana)&lt;/i&gt; oznacza, że zamontowana jest tabela governora; &lt;i&gt;(surowa)&lt;/i&gt; to własna tabela jądra, której aktywność GFX
na BC-250 jest błędną wartością 655% i nie jest używana jako obciążenie.&lt;/p&gt;
&lt;p&gt;BC-250 zwykle nie ma czujnika &lt;code&gt;gpu_busy_percent&lt;/code&gt;, ale governor sam mierzy obciążenie i,
gdy &lt;b&gt;fix-metrics&lt;/b&gt; jest włączone, publikuje je w spatchowanej tabeli &lt;code&gt;gpu_metrics&lt;/code&gt;, którą montuje nad sysfs. Aplikacja
odczytuje stamtąd obciążenie; &lt;code&gt;gpu_busy_percent&lt;/code&gt; i &lt;code&gt;radeontop&lt;/code&gt; są rozwiązaniami zapasowymi. Bez żadnego
źródła pokazuje &lt;b&gt;N/D&lt;/b&gt;, nigdy mylące 0%, a podpowiedź informuje, czego brakuje. Zegar i temperatura GPU pochodzą z czujników
hwmon amdgpu; przy włączonym &lt;code&gt;fix-freq&lt;/code&gt; zegar jest prawdziwą wartością SMU.&lt;/p&gt;

&lt;h2&gt;Obciążenie GPU&lt;/h2&gt;
&lt;p&gt;Edytuje sekcję &lt;code&gt;[gpu-usage]&lt;/code&gt; pliku &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Klucz&lt;/th&gt;&lt;th&gt;Domyślnie&lt;/th&gt;&lt;th&gt;Znaczenie&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Zapisuje zmierzone obciążenie do spatchowanej tabeli &lt;code&gt;gpu_metrics&lt;/code&gt;
i montuje ją nad sysfs. Naprawia błędne 655% obciążenia GPU w MangoHud, nakładce Steam i radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Dodatkowo patchuje &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; zegarem odczytanym
z SMU. Naprawia błędną częstotliwość w sysfs, głównie po odblokowaniu 8 rdzeni. Niezależne od fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; próbkuje bit zajętości GPU;
&lt;i&gt;process&lt;/i&gt; skanuje każdy proces korzystający z GPU (więcej pracy CPU); &lt;i&gt;kernel&lt;/i&gt; wymaga spatchowanego jądra.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Gdzie odczytywana jest temperatura GPU: ioctl DRM (utrzymuje otwarty uchwyt DRM)
lub plik hwmon &lt;code&gt;temp1_input&lt;/code&gt;. Ten sam czujnik.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Zapisuj spatchowaną tabelę co N cykli odświeżania.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;Oraz sekcja &lt;code&gt;[gpu]&lt;/code&gt;: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, domyślnie, stosuje zegar i napięcie bezpośrednio przez
SMU; &lt;i&gt;kernel&lt;/i&gt; przechodzi zamiast tego przez interfejs sysfs amdgpu).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Zastosuj zmiany&lt;/b&gt; (na tej stronie lub na Strojeniu) prosi raz o hasło (pkexec). Kopiuje bieżący
plik do &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; i zapisuje oczekujące zmiany obu stron. Zmieniają się tylko znane
klucze; każda inna linia pliku, w tym komentarze, zostaje zachowana. Governor odczytuje plik tylko przy starcie, więc
usługa jest potem uruchamiana ponownie, chyba że odznaczysz tę opcję.&lt;/p&gt;

&lt;h2&gt;Strojenie&lt;/h2&gt;
&lt;p&gt;Edytuje pozostałe sekcje pliku &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Sekcja&lt;/th&gt;&lt;th&gt;Klucze&lt;/th&gt;&lt;th&gt;Znaczenie&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Limity zegara w MHz, z którymi startuje governor. &lt;i&gt;Brak limitu&lt;/i&gt;
(0) pozostawia limit otwarty; wartości spoza tabeli punktów bezpiecznych są przycinane przez governora.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Podnosi zegar, gdy obciążenie jest powyżej &lt;i&gt;upper&lt;/i&gt;,
obniża, gdy jest poniżej &lt;i&gt;lower&lt;/i&gt;. Szeroki odstęp utrzymuje stabilny zegar, wąski dokładnie podąża za obciążeniem.
Własne wartości domyślne governora, gdy sekcja jest nieobecna, to 95% / 80%; plik dystrybucyjny używa 65% / 50%.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Ogranicza powyżej pierwszej wartości (domyślnie
85 °C); wznawia poniżej drugiej, która jest opcjonalna (&lt;i&gt;Nieustawione&lt;/i&gt;) i musi być niższa.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Publikuje &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; na magistrali systemowej.
Strona Wydajność tego potrzebuje; plik dystrybucyjny to włącza, wbudowana wartość domyślna governora to wyłączone.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;Pętla sterująca: jak często próbkowane jest obciążenie i dostosowywany zegar (µs), jak szybko zegar
zmierza do celu (MHz/ms), ile kolejnych próbek zajętości przełącza na szybsze tempo burst (&lt;i&gt;Wyłączone&lt;/i&gt; pomija
klucz) oraz ile cykli dostosowania przy niskim obciążeniu mija, zanim zegar zostanie obniżony. Wartości domyślne governora: 2000 µs /
10 × sample, 1 / 200 × normal, wyłączone, 10; plik dystrybucyjny używa 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Martwa strefa w MHz: zmiana poza trybem burst mniejsza niż ta wartość
nie jest stosowana (domyślnie 10).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Presety&lt;/b&gt; wypełniają jednocześnie zakres częstotliwości, cel obciążenia i temperaturę (timing pozostaje bez zmian): &lt;i&gt;Domyślne z dystrybucji&lt;/i&gt; (konfiguracja pakietu), &lt;i&gt;Cichy&lt;/i&gt; (niższe
zegary, późne narastanie), &lt;i&gt;Responsywny&lt;/i&gt; (wczesne narastanie, pełny zakres) i &lt;i&gt;Maksymalny zegar&lt;/i&gt; (pozostaje blisko górnej granicy).
Lista rozwijana pokazuje &lt;i&gt;Niestandardowy&lt;/i&gt;, gdy wartość różni się od każdego presetu. Nieprawidłowe kombinacje (min powyżej
max, wznowienie nie niższe niż ograniczanie, interwał dostosowania krótszy niż próbkowanie, tempo burst nie wyższe niż normalne) są zgłaszane
pod formularzem i blokują Zastosuj.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Profile&lt;/b&gt; to nazwane migawki każdej wartości na tej stronie i stronie Obciążenie GPU (punkty bezpieczne nie są
włączone), przechowywane dla Twojego użytkownika w &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Zapisz bieżące jako…&lt;/i&gt; zapisuje to, co formularze pokazują właśnie teraz, zastosowane lub nie. &lt;i&gt;Wczytaj do formularzy&lt;/i&gt; wypełnia obie
strony, abyś mógł przejrzeć i zastosować jak zwykle; &lt;i&gt;Zastosuj teraz&lt;/i&gt; zapisuje profil do &lt;code&gt;config.toml&lt;/code&gt;
(najpierw kopia zapasowa, jedno pytanie o hasło), odrzuca oczekujące zmiany i ponownie uruchamia governor. Przy włączonej ikonie w zasobniku
podmenu &lt;i&gt;Zastosuj profil&lt;/i&gt; menu zasobnika robi to samo bez otwierania okna. Dla &lt;b&gt;skrótu klawiszowego&lt;/b&gt;,
&lt;i&gt;Skopiuj polecenie skrótu klawiszowego&lt;/i&gt; umieszcza w schowku &lt;code&gt;bc250-governor-manager --profile 'Nazwa'&lt;/code&gt;; przypisz go w
Ustawieniach systemowych → Skróty (KDE) lub Klawiatura → Niestandardowe skróty (GNOME). Aplikacja działa raz na użytkownika: to polecenie
dociera do działającej instancji przez lokalne gniazdo i stosuje tam profil (jedno pytanie o hasło, powiadomienie
w zasobniku) albo uruchamia aplikację i stosuje go, gdy nic nie działa. Zwykłe drugie uruchomienie po prostu podnosi okno.
&lt;code&gt;--list-profiles&lt;/code&gt; wypisuje zapisane nazwy.&lt;/p&gt;

&lt;h2&gt;Punkty bezpieczne&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;[[safe-points]]&lt;/code&gt; pliku &lt;code&gt;%3&lt;/code&gt; jako edytowalna tabela i krzywa częstotliwość/napięcie.
Governor skaluje się wzdłuż tej krzywej i nigdy nie opuszcza jej zakresu; &lt;code&gt;[frequency-range]&lt;/code&gt; i sterowanie
w czasie działania są do niego przycinane. &lt;b&gt;Dodaj punkt&lt;/b&gt; wstawia w połowie drogi do następnego punktu, &lt;b&gt;Usuń&lt;/b&gt; usuwa zaznaczony
wiersz, &lt;b&gt;Domyślne z dystrybucji&lt;/b&gt; wczytuje własną tabelę governora, &lt;b&gt;Cofnij&lt;/b&gt; wraca do pliku. Zanim
&lt;b&gt;Zastosuj punkty bezpieczne&lt;/b&gt; zostanie włączone, lista musi spełniać reguły governora (co najmniej dwa punkty, unikalne
częstotliwości, napięcie nigdy nie spadające wraz ze wzrostem częstotliwości) oraz twarde granice współdzielone z bc250-gpu-oc-bisect
(700–1100 mV, do 2500 MHz). Powyżej 2000 MHz lub 1000 mV, lub gdy zmiana podnosi szczytową częstotliwość albo obniża
istniejące napięcie, pojawia się ostrzeżenie: niestabilny punkt zawiesza płytkę pod obciążeniem. Zastosuj tworzy kopię zapasową i
prosi o hasło; bezpieczne znalezienie własnej granicy płytki jest zadaniem dla
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Testuj punkt przed zapisaniem&lt;/b&gt; używa dostępnego tylko dla roota interfejsu D-Bus &lt;code&gt;TestMode&lt;/code&gt; governora
(jedno pytanie &lt;code&gt;pkexec&lt;/code&gt;): GPU zostaje przypięte do podanej częstotliwości i napięcia, a automatyczne
skalowanie się zatrzymuje, podczas gdy ograniczanie termiczne pozostaje aktywne. Nic nie jest zapisywane do &lt;code&gt;config.toml&lt;/code&gt;. Pola
są wstępnie wypełniane z zaznaczonego wiersza; ostrzeżenie pojawia się powyżej 2000 MHz / 1000 mV lub gdy napięcie jest
niższe niż dałaby powyższa krzywa. &lt;b&gt;Obciążenie&lt;/b&gt; wybiera generator obciążenia GPU znaleziony w PATH (vkmark, glmark2,
vkcube lub glxgears, w tej kolejności preferencji); jest uruchamiany wraz z testem i zabijany po jego zakończeniu,
a jeśli zakończy się awarią podczas przypięcia punktu, mówi o tym stan. Bez niego obciąż GPU samodzielnie i obserwuj
Przegląd. &lt;b&gt;Zatrzymaj test&lt;/b&gt;, licznik czasu (domyślnie 60 s, &lt;i&gt;Do zatrzymania&lt;/i&gt; = 0), zamknięcie aplikacji lub jakakolwiek akcja na
stronie Wydajność kończy test, wyłączając tryb wydajności, co przywraca governor do normalnego
skalowania z jego zakresem startowym. Linia wyniku raportuje wtedy, jak długo punkt był utrzymany, szczytową temperaturę
i zaobserwowany zakres zegaru; &lt;b&gt;Dodaj do tabeli&lt;/b&gt; umieszcza przetestowaną parę w tabeli punktów bezpiecznych (posortowanej, zastępując
punkt o tej samej częstotliwości), abyś mógł ją zastosować. Podczas przypięcia punktu &lt;b&gt;dziennik jądra&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) jest monitorowany pod kątem problemów amdgpu (przekroczenia czasu pierścienia, resety GPU, linie
&lt;code&gt;*ERROR*&lt;/code&gt;, awarie SMU); pierwsza taka linia natychmiast przerywa test, uwalniając punkt, zanim płytka się zawiesi,
i jest cytowana w wyniku. Czysty przebieg również to zgłasza. Odczyt pierścienia jądra wymaga członkostwa w grupie
&lt;code&gt;systemd-journal&lt;/code&gt; (lub &lt;code&gt;wheel&lt;/code&gt;); w przeciwnym razie stan informuje, że dziennik nie jest monitorowany i
test przebiega na ślepo. Punkt, którego krzem nie jest w stanie utrzymać, może zawiesić płytkę szybciej, niż jądro zdąży to zapisać,
więc najpierw zapisz swoją pracę. Tylko governor smu ma D-Bus.&lt;/p&gt;

&lt;h2&gt;Wydajność&lt;/h2&gt;
&lt;p&gt;Sterowanie governorem w czasie działania przez D-Bus, dokładnie to, co robi własna nakładka
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; governora. Zmiany stosowane są natychmiast, nie wymagają hasła i są
tracone przy kolejnym ponownym uruchomieniu governora; &lt;code&gt;config.toml&lt;/code&gt; pozostaje bez zmian. &lt;i&gt;Skopiuj wartości z czasu działania na stronę Strojenie&lt;/i&gt;
przenosi bieżący zakres i progi na stronę Strojenie, abyś mógł je zapisać.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Tryb wydajności&lt;/b&gt; to przełącznik (czerwony, gdy włączony): włączenie otwiera pełny dozwolony (punkty bezpieczne) zakres; wyłączenie wraca
do zakresu &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Przypnij zegar&lt;/b&gt; ustala częstotliwość i włącza tryb wydajności.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Ustaw zakres&lt;/b&gt; stosuje tymczasowe min/max.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Ustaw cel obciążenia&lt;/b&gt; i &lt;b&gt;Ustaw temperatury&lt;/b&gt; zmieniają pasmo obciążenia (dolne/górne %) oraz temperatury
ograniczania / wznowienia, z którymi skaluje się governor, bez dotykania trybu wydajności ani trwającego testu punktu bezpiecznego.
Pola podążają za bieżącymi wartościami governora i są uzupełniane ponownie przy ich zmianie; niemożliwe pary (dolna nie
niższa niż górna, wznowienie nie niższe niż ograniczanie) wyłączają przycisk.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Sterowanie jest wyłączone, gdy usługa nie działa lub nazwa magistrali nie jest publikowana; powód jest pokazany
pod sterowaniem. Włącz &lt;code&gt;[dbus] enabled&lt;/code&gt; na stronie Strojenie i uruchom ponownie governor w razie potrzeby.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Dla gry&lt;/b&gt; buduje linię uruchomieniową dla nakładki &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; governora:
zwykły tryb wydajności, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; lub
&lt;code&gt;--temperature&lt;/code&gt;, wstępnie wypełnione bieżącymi liczbami governora, sformatowane dla opcji uruchamiania Steam
(&lt;code&gt;… %command%&lt;/code&gt;), polecenia nakładki Heroic/Lutris lub terminala. &lt;b&gt;Kopiuj&lt;/b&gt; umieszcza to w schowku.
Nakładka stosuje ustawienie, uruchamia grę i wyłącza tryb wydajności po jej zakończeniu, co również przywraca
governor do jego zakresu startowego. Wymaga włączonego D-Bus, tak jak sterowanie powyżej.&lt;/p&gt;

&lt;h2&gt;Kopie zapasowe&lt;/h2&gt;
&lt;p&gt;Każdy zapis tworzy kopię &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; obok konfiguracji. Strona je wylicza,
pokazuje różnicę między kopią a bieżącym plikiem, a &lt;b&gt;Przywróć zaznaczoną&lt;/b&gt; przywraca kopię (bieżący
plik jest najpierw zapisywany jako kopia zapasowa, hasło pytane jednorazowo). Governor jest potem uruchamiany ponownie, chyba że odznaczysz tę opcję.&lt;/p&gt;

&lt;h2&gt;Usługa&lt;/h2&gt;
&lt;p&gt;Uruchamia, zatrzymuje, restartuje, włącza lub wyłącza &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, z wyjściem
&lt;code&gt;systemctl status&lt;/code&gt; i &lt;b&gt;dziennikiem na żywo&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, ostatnie 200 linii oraz
wszystko, co następuje podczas wyświetlania strony, do 2000 przechowywanych). Pole filtra przyjmuje tekst lub wyrażenie
regularne, bez rozróżniania wielkości liter; odznacz &lt;b&gt;Śledź&lt;/b&gt;, aby czytać bez przewijania. Odczyt jednostek systemowych wymaga, aby
użytkownik należał do grupy &lt;code&gt;wheel&lt;/code&gt; lub &lt;code&gt;systemd-journal&lt;/code&gt;, co jest przypadkiem w Bazzite. Każda akcja usługi
prosi o hasło.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Sprawdź dostępność aktualizacji&lt;/b&gt; porównuje zainstalowany RPM &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; z najnowszym
wydaniem &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
na GitHub (jedno zapytanie do api.github.com; uruchamiane też przy starcie, chyba że wyłączone w Ustawieniach). Nowsze wydanie jest
pokazane na pomarańczowo z odnośnikiem do jego informacji. Zaktualizuj pakiet w sposób, w jaki go zainstalowano: COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; przez &lt;code&gt;rpm-ostree upgrade&lt;/code&gt;, gdy jest warstwowy, lub archiwum wydania.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Eksportuj diagnostykę…&lt;/b&gt; zapisuje jeden plik tekstowy na potrzeby zgłoszenia błędu: wersje aplikacji, governora i Bazzite, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; i jego kopie zapasowe, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, ostatnie 300 linii
dziennika, interfejs D-Bus, linię poleceń jądra, komunikaty jądra amdgpu, czujniki hwmon oraz surową
tabelę &lt;code&gt;gpu_metrics&lt;/code&gt; (sparsowaną i jako zrzut hex). Przeczytaj plik i usuń to, czym nie chcesz się
dzielić, zanim dołączysz go do zgłoszenia.&lt;/p&gt;

&lt;h2&gt;Ustawienia&lt;/h2&gt;
&lt;p&gt;Ustawienia aplikacji, przechowywane dla każdego użytkownika. &lt;b&gt;Zasobnik systemowy&lt;/b&gt;: pokazuje ikonę w zasobniku, której podpowiedź niesie obciążenie GPU, zegar,
temperaturę, tryb wydajności i stan governora; kliknięcie lewym przyciskiem pokazuje lub ukrywa okno, menu przełącza
tryb wydajności (gdy D-Bus jest osiągalny) i zamyka aplikację. Przy zaznaczonej opcji &lt;i&gt;Zamknięcie okna pozostawia aplikację działającą w
zasobniku&lt;/i&gt; przycisk zamknięcia okna ukrywa je do zasobnika zamiast zamykać aplikację; użyj menu zasobnika, aby zamknąć.
&lt;b&gt;Uruchom przy logowaniu&lt;/b&gt; zapisuje &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (nic
systemowo), opcjonalnie uruchamiając ukryte w zasobniku z &lt;code&gt;--start-in-tray&lt;/code&gt;. Sesja KDE Plasma w Bazzite
ma natywny zasobnik, więc to działa od razu; sesja GNOME wymagałaby rozszerzenia AppIndicator.
&lt;b&gt;Alarmy&lt;/b&gt; to powiadomienia pulpitu przez ikonę w zasobniku (pasek stanu tylko, gdy zasobnik jest wyłączony): osiągnięcie przez GPU
wybranej temperatury, osiągnięcie przez GPU własnej temperatury ograniczania governora (wartość w czasie działania, gdy D-Bus
jest osiągalny, w przeciwnym razie ta z &lt;code&gt;config.toml&lt;/code&gt;) oraz zatrzymanie lub niepowodzenie usługi governora, odkąd
aplikacja widziała ją działającą. Alarm temperatury uruchamia się raz na przekroczenie i uzbraja się ponownie 5 °C poniżej progu; ten
sam alarm powtarza się nie częściej niż co 5 minut.&lt;/p&gt;

&lt;h2&gt;Starszy governor tt&lt;/h2&gt;
&lt;p&gt;Uruchomiona z &lt;code&gt;--backend tt&lt;/code&gt; (lub automatycznie, gdy wczytana jest tylko jednostka &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;),
aplikacja zarządza zamiast tego plikiem &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. Ten governor nie ma
fix-metrics, zakresu częstotliwości, D-Bus ani wydań na GitHub, więc strony Obciążenie GPU i Wydajność, te sekcje Strojenia,
pole &lt;code&gt;down-events&lt;/code&gt; oraz sprawdzanie aktualizacji są ukryte, a czujnik obciążenia GPU pozostaje
niedostępny. Wszystko inne, w tym &lt;code&gt;[timing]&lt;/code&gt; i &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, działa tak
samo.&lt;/p&gt;

&lt;h2&gt;Uprawnienia&lt;/h2&gt;
&lt;p&gt;Aplikacja działa jako Twój zwykły użytkownik. Tylko cztery rzeczy wymagają roota i przechodzą przez &lt;code&gt;pkexec&lt;/code&gt;:
kopia zapasowa, zapis &lt;code&gt;config.toml&lt;/code&gt;, akcje &lt;code&gt;systemctl&lt;/code&gt; oraz test punktu bezpiecznego
(&lt;code&gt;busctl&lt;/code&gt; na dostępnym tylko dla roota interfejsie TestMode). Hasłem zajmuje się
agent polkit środowiska; aplikacja nigdy go nie widzi.&lt;/p&gt;

&lt;h2&gt;Instalacja i aktualizacja&lt;/h2&gt;
&lt;p&gt;Archiwum wydania zawiera &lt;code&gt;install.sh&lt;/code&gt;. Instaluje aplikację tylko dla Twojego użytkownika (prywatne venv
z PyQt6 w &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, launcher
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, wpis pulpitu i ikonę), dzięki czemu pojawia się w
menu aplikacji. Uruchom je ponownie z nowszego wydania, aby zaktualizować, &lt;code&gt;./install.sh --uninstall&lt;/code&gt; usuwa aplikację.
Nic nie jest warstwowe przez rpm-ostree, a konfiguracja governora nigdy nie jest dotykana.&lt;/p&gt;

&lt;h2&gt;Odnośniki&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Ta aplikacja: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;Governor (filippor, gałąź SMU): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Licencja GNU General Public License v3.0 lub nowsza. Dołączona jest czcionka Inter (SIL Open Font License).&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>to nie eksport telemetrii: brak kolumny 'time'</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>to nie eksport telemetrii: brak kolumn(y) %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Tryb wydajności</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Pełny zakres punktów bezpiecznych, szybsza reakcja na obciążenie. To samo co przycisk Włączone.</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Stały zegar</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency: przypina zegar GPU dla tej gry (musi mieścić się w dozwolonym zakresie).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Zakres zegaru</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range: tymczasowe min/max, 0 = brak limitu.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Cel obciążenia</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target: dolne/górne obciążenie GPU, które steruje podnoszeniem i obniżaniem zegaru.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Temperatura</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature: progi ograniczania / wznowienia w °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Opcje uruchamiania Steam</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → gra → Właściwości → Ogólne → Opcje uruchamiania. Wklej całą linię.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Nakładka Heroic / Lutris</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic: ustawienia gry → Zaawansowane → Polecenie nakładki. Lutris: Opcje runnera → Prefiks polecenia. Potrzebna jest tylko część nakładki; launcher dołącza samą grę.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Terminal / skrypt</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>Zastąp &lt;program&gt; poleceniem do uruchomienia.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>czujnik hwmon amdgpu</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>tabela gpu_metrics</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2 min</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10 min</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30 min</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60 min</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>average_gfx_activity ze spatchowanej tabeli gpu_metrics governora.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>czujnik sysfs amdgpu gpu_busy_percent.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Rozwiązanie zapasowe: radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Tabela</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>Aktywność GFX</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>Aktywność MM</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>Temperatura GFX</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>Temperatura SoC</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>Moc gniazda</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>Moc GFX</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>Moc CPU</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>Zegar GFX</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Śr. zegar GFX</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>Zegar SoC</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Zegar pamięci</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Zegar fabric</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>Stan ograniczania</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>Rdzenie CPU</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Tylko cyan-skillfish-governor-smu publikuje wartość obciążenia (fix-metrics); governor tt tego nie robi, więc to pozostaje niedostępne.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>Zainstaluj cyan-skillfish-governor-smu; mierzy on obciążenie i publikuje je przez gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>Włącz fix-metrics na stronie Obciążenie GPU i zastosuj z ponownym uruchomieniem.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Uruchom usługę governora na stronie Usługa; fix-metrics jest włączone, ale nic nie publikuje obciążenia.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics jest włączone, a usługa działa, ale żadna spatchowana tabela gpu_metrics nie jest zamontowana: sprawdź dziennik.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>Spatchowana tabela gpu_metrics nie zawiera prawidłowej wartości obciążenia; sprawdź dziennik na stronie Usługa.</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1 min %2 s</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1 s</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 W (surowe %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (nieprawidłowe)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C maks.</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>brak limitu</translation>
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
        <translation>Potrzeba co najmniej %1 punktów.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz pojawia się dwukrotnie.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz jest poza zakresem 1–%2 MHz.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 mV przy %2 MHz jest poza zakresem %3–%4 mV.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 mV przy %2 MHz jest niższe niż %3 mV przy %4 MHz; napięcie nie może spadać wraz ze wzrostem częstotliwości (reguła governora).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz jest powyżej %2 MHz, gdzie wiele płytek zaczyna się twardo zawieszać.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV jest powyżej %2 mV; miej na oku temperaturę i zasilacz.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Brak (obciąż GPU samodzielnie)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub odpowiedział %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>brak połączenia (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>nieoczekiwany tag %1</translation>
    </message>
</context>
</TS>
