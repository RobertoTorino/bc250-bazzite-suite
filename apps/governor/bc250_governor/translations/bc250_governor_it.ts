<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="it">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura GPU</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>La GPU è a %1 °C (avviso impostato a %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Throttling del governor</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>La GPU è a %1 °C, pari o superiore alla temperatura di throttling del governor di %2 °C; il clock massimo viene abbassato.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>non riuscito</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>arrestato</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>Il servizio del governor è %1; la GPU funziona ai clock predefiniti del driver. Vedere la pagina Servizio.</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Backup</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aggiorna</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Prima di ogni scrittura l'app copia %1 in config.toml.bak-YYYYMMDD-HHMMSS accanto ad esso. Selezionarne uno per vedere le differenze rispetto al file attuale; Ripristina lo rimette al suo posto (il file attuale viene prima salvato, quindi non si perde nulla).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Copie, dalla più recente</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Creato</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Dimensione</translation>
    </message>
    <message>
        <source>File</source>
        <translation>File</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Nessun backup ancora.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Differenza: backup → file attuale</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Riavvia il governor dopo il ripristino</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Ripristina selezionato</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Rende la copia selezionata di nuovo la configurazione (richiede la password).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Selezionare un backup per confrontarlo con il file attuale.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>Impossibile leggere %1: %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Identico al file attuale.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Ricarica dal disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annulla le modifiche su tutte le pagine e mostra di nuovo i valori di config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Riavvia il governor dopo l'applicazione</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Il governor legge config.toml solo all'avvio.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Applica modifiche</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Richiede la password una sola volta (pkexec), crea un backup con data e ora di config.toml e scrive %1. Vengono scritte anche le modifiche in sospeso dell'altra pagina di configurazione.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 non è stato trovato. Il governor SMU Cyan Skillfish non risulta installato.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 è installato, ma %2 non esiste.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Il governor SMU Cyan Skillfish è installato e configurato.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'autenticazione è stata annullata.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec non riuscito (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Azione del servizio non supportata: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 non ha un'interfaccia D-Bus.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 non è stato trovato. Il governor SMU Cyan Skillfish non risulta installato.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 è installato, ma %2 non esiste.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Il governor SMU Cyan Skillfish è installato e configurato.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'autenticazione è stata annullata.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec non riuscito (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Azione del servizio non supportata: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 non ha un'interfaccia D-Bus.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctl non riuscito (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 non è sul bus di sistema (governor arrestato, oppure [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>Il governor ha risposto sul bus, ma non è stato possibile leggere le sue proprietà.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'autenticazione è stata annullata.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Metodo di utilizzo GPU non supportato: %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Origine temperatura non supportata: %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>gpu.set-method non supportato: %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every deve essere almeno 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals deve essere almeno 1 µs</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust non deve essere più breve di sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples deve essere 0 (off) oppure 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events deve essere almeno 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal deve essere positivo</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst deve essere maggiore di normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust non può essere negativo</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Le frequenze non possono essere negative</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min non deve superare frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target richiede 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling deve essere 0..100 °C</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery deve essere inferiore a temperature.throttling (o 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>Utilizzo GPU</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>correggi l'utilizzo GPU in gpu_metrics</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Scrive il carico misurato dal governor in una tabella gpu_metrics corretta e la monta con bind-mount su sysfs, così MangoHud, l'overlay di Steam, radeontop e questa app mostrano una percentuale reale invece del bug del 655%.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>correggi il clock GPU in hwmon</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Sostituisce freq1_input di hwmon con il clock letto dall'SMU. Corregge la frequenza errata riportata da sysfs, soprattutto dopo lo sblocco a 8 core. Indipendente da fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Metodo di carico:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Origine temperatura:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Scarica la tabella delle metriche corretta ogni N cicli di aggiornamento (predefinito 10).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>applica clock/tensione tramite:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>i nuovi valori</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Vengono scritte solo le chiavi gestite da questa app ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]); tutte le altre righe del file, compresi i commenti e la tabella dei safe point, restano invariate. Prima di ogni scrittura viene creata una copia denominata config.toml.bak-YYYYMMDD-HHMMSS accanto ad esso.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml non esiste ancora; applicando lo si crea)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Ricarica dal disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annulla le modifiche su tutte le pagine e mostra di nuovo i valori di config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Riavvia il governor dopo l'applicazione</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Il governor legge config.toml solo all'avvio.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Applica modifiche</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Richiede la password una sola volta (pkexec), crea un backup con data e ora di config.toml e scrive %1. Vengono scritte anche le modifiche in sospeso dell'altra pagina di configurazione.</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>Filtro:</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>testo o espressione regolare, senza distinzione tra maiuscole e minuscole</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Segui</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Continua a scorrere fino alla riga più recente. Deselezionare per leggere senza essere spostati.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Cancella</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Dimentica le righe mostrate finora; le nuove voci continuano ad arrivare.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — connessione in corso…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>In ascolto su journalctl -u %1; vengono mantenute fino a %2 righe.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>codice di uscita %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl si è arrestato (%1). L'utente potrebbe dover appartenere al gruppo systemd-journal o wheel per leggere le unità di sistema. Nuovo tentativo tra %2 s…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl è terminato; riavvio tra %1 s…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl non è disponibile su questo sistema; il journal non può essere mostrato.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (interpretato alla lettera, non è un'espressione regolare valida)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%1 di %2 righe corrispondono%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>il log del kernel non è leggibile da questo utente (aggiungerlo al gruppo systemd-journal)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k è terminato con codice %1</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl non è disponibile</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Per gioco</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>Il governor include un wrapper che applica una di queste impostazioni per un singolo programma e disattiva nuovamente la modalità prestazioni quando questo termina, ripristinando anche l'intervallo normale. Scegliere cosa deve ottenere il gioco, copiare la riga nel suo launcher.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Per:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Copia</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Copia la riga negli appunti.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Clock da fissare, MHz.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Limite inferiore, 0 = nessun limite.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Limite superiore, 0 = nessun limite.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Nessun limite</translation>
    </message>
    <message>
        <source>to</source>
        <translation>a</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>Sotto questo carico il governor abbassa il clock.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Sopra questo carico il governor alza il clock.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Throttling sopra questa temperatura.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Riprende i clock normali sotto questa temperatura.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Frazione di 1, come in config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>Il limite inferiore è superiore al limite superiore.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>L'obiettivo di carico inferiore deve essere minore di quello superiore.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>Il recupero deve essere inferiore alla temperatura di throttling.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Copiato</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>Carico GPU</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>Clock GPU</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura GPU</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Potenza</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modalità prestazioni</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Copiato: %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Panoramica</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>Utilizzo GPU</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Regolazione</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Safe point</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Prestazioni</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Backup</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Servizio</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Impostazioni</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Guida</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Pronto</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>Carico %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Carico N/D</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>modalità prestazioni</translation>
    </message>
    <message>
        <source>running</source>
        <translation>in esecuzione</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>non installato</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>arrestato</translation>
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
        <translation>È ancora in esecuzione nell'area di notifica; usare Esci nel suo menu per terminare.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 modifiche non applicate. Chiudere comunque?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>Il servizio del governor non è in esecuzione.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>N/D</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>Nessun sensore di frequenza.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>Nessun sensore di temperatura.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power della tabella gpu_metrics (intera APU); l'SMU la riporta in virgola fissa 24.8, mostrata qui in watt</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>La tabella gpu_metrics non riporta la potenza socket.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>nessun limite</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Attivo</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Disattivo</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Intervallo attuale %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus non raggiungibile.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Mancante</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>In esecuzione</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Non riuscito</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Arrestato</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> pagine hanno</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> pagina ha</translation>
    </message>
    <message>
        <source> and </source>
        <translation> e </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Modifiche non applicate: %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Valori non validi</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>Impossibile scrivere config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Configurazione applicata</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, backup: %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Salvato, ma il riavvio non è riuscito</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml è stato aggiornato, ma non è stato possibile riavviare il governor.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>Non è stato restituito alcun testo di errore.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — riavvio non riuscito</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, governor riavviato</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Applica safe point</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>Scrivere %1 safe point (%2–%3 MHz) in config.toml?

Il governor scalerà lungo questa curva. Un punto che il silicio non riesce a sostenere blocca la scheda sotto carico; viene prima creato un backup del file attuale, ripristinabile dalla pagina Backup.</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Safe point applicati</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>nessuno salvato</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>Nessun profilo denominato '%1' (noti: %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Profilo '%1' caricato nei moduli; applicare per scriverlo</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Applica profilo</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>Applicare '%1'? Le %2 modifiche non applicate verranno scartate.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Profilo non valido</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>'%1' non può essere applicato: %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Profilo '%1' applicato</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Profilo '%1' applicato, governor riavviato.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Associare quel comando a un tasto nelle impostazioni delle scorciatoie del desktop; raggiunge l'app in esecuzione e applica il profilo.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Salva profilo</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Nome profilo:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Sostituisci profilo</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>'%1' esiste già. Sostituirlo con i valori attuali del modulo?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Profilo '%1' salvato</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Elimina profilo</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>Eliminare il profilo '%1'?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Profilo '%1' eliminato</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>Sostituire %1 con %2?

Viene prima creato un backup del file attuale.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
Il governor viene riavviato in seguito.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Ripristina backup</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>Impossibile ripristinare il backup</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>Ripristinato %1</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Governor %1 è disponibile (installato %2); vedere la pagina Servizio</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>È disponibile l'aggiornamento %1 del governor.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Esporta cronologia telemetria</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>File CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>Impossibile scrivere il file CSV</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 campioni (%2–%3) scritti in %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Confronta con un'esportazione telemetria precedente</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>File CSV (*.csv);;Tutti i file (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>Impossibile leggere il file CSV</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Niente da confrontare</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>Il file non contiene campioni con un orario leggibile.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 campioni di riferimento da %2 disegnati tratteggiati</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Esporta diagnostica</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>File di testo (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Esportazione non riuscita</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Diagnostica esportata</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Salvato in %1.

Leggerlo prima di allegarlo a una segnalazione di bug e rimuovere ciò che non si desidera condividere.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1: completato</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1 non riuscito</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>Il test è terminato a causa di '%1' nella pagina Prestazioni.</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1: completato</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1 non riuscito</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>Il governor non ha restituito alcun testo di errore.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Modalità prestazioni attiva</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Modalità prestazioni disattiva</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Frequenza fissa %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Intervallo runtime %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Obiettivo di carico %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>non impostato</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Temperatura %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Valori runtime copiati nella pagina Regolazione; applicare per salvarli</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>per %1 s</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>fino all'arresto manuale</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> ed esegui %1 per il carico</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Testa un safe point</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>Fissare la GPU a %1 MHz a %2 mV %3%4?

Il governor applica questa coppia così com'è e interrompe la propria scalatura automatica; il throttling termico resta attivo. Un punto che il silicio non riesce a sostenere blocca la scheda sotto carico. Non viene scritto nulla in config.toml. Verrà richiesta la password (l'interfaccia TestMode è riservata a root).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>Modalità test non riuscita</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>Impossibile avviare %1 (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Modalità test: %1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>interrotto dopo un errore GPU nel log del kernel</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>terminato in modo anomalo</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>terminato con codice %1</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2 mentre il punto era fissato</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Test di %1 MHz @ %2 mV %3 dopo %4 s</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> sotto carico %1</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>picco %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>clock %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>clock %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ kernel: %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+%1 altri)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>log del kernel non monitorato</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>nessun errore GPU nel log del kernel</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. Il governor torna a scalare normalmente.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>terminato dal timer</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>Impossibile terminare il test</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Anche il riavvio del governor nella pagina Servizio termina la modalità test.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>Il governor si è arrestato; il test è terminato con esso.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, %1 s rimanenti</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 sta caricando la GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Caricare la GPU manualmente.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Log del kernel non leggibile, nessun rilevamento di blocchi.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Log del kernel monitorato.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Test di %1 MHz @ %2 mV%3.%4%5 Osservare la Panoramica; Arresta test ripristina la scalatura normale.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Panoramica</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>Stato runtime</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Servizio governor</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Sostituzione gpu_metrics</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>Sensore carico GPU</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (salvato)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modalità prestazioni</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>Carico, clock e temperatura GPU</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Finestra:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Quanto degli ultimi %1 minuti mostra il grafico; l'esportazione contiene sempre tutto ciò che viene mantenuto.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>Esporta CSV…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Salva ogni campione mantenuto (orario, carico, clock, temperatura, potenza socket, modalità prestazioni, intervallo runtime) come file CSV.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Confronta…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Carica un'esportazione CSV precedente e la disegna tratteggiata dietro le linee dal vivo, con il campione più recente sul bordo destro, con le medie di entrambe le sessioni sotto il grafico.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Cancella</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Rimuove la sessione di riferimento dal grafico.</translation>
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
        <translation>Carico %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Temperatura °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Clock MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Carico % (rif)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Temperatura °C (rif)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Clock MHz (rif)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Tabella gpu_metrics</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>Il BC-250 di norma non espone un sensore gpu_busy_percent, ma il governor misura il carico autonomamente e lo pubblica nella propria tabella gpu_metrics corretta mentre fix-metrics è attivo e il servizio è in esecuzione. L'app lo legge da lì; un sensore mancante viene mostrato come N/D, mai come 0%.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>Non installato</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Attivo</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>SubState: %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Non riuscito</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>L'unità non è riuscita; vedere la pagina Servizio per il journal.</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Inattivo</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>sconosciuto</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Montato</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>Non montato</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>Il governor monta con bind-mount la propria tabella gpu_metrics corretta sul file sysfs mentre fix-metrics è attivo e il servizio è in esecuzione.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Abilitato</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Disabilitato</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Valore salvato in config.toml.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>Non disponibile</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Disponibile</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>carico %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>carico N/D</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>clock %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>temperatura %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Attuale: %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. Nessun sensore di carico GPU utilizzabile: %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Raggiungibile</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor risponde sul bus di sistema.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Attivo</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Disattivo</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Intervallo attuale %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>nessun limite</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Non raggiungibile</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Sconosciuto</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Richiede il governor in esecuzione con [dbus] enabled attivo.</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>Carico, clock e temperatura GPU, ultimi %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (%1 min %2 s registrati)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Riferimento %1 (%2): %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Finestra dal vivo (%1): %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>Nessuna tabella gpu_metrics v2.x leggibile sotto /sys/class/drm/card*/device.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (corretta)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (grezza)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>nessuno</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Tabella come pubblicata dal governor (fix-metrics): l'attività GFX è una sua misurazione propria.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Tabella grezza del kernel: l'attività GFX è il valore errato del firmware (il bug del 655%); abilitare fix-metrics per ottenerne uno reale.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Tabella grezza del kernel.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Prestazioni</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aggiorna</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Controlli runtime via D-Bus (com.cyanskillfish.Governor): si applicano immediatamente, non richiedono password e vanno persi al successivo riavvio del governor. config.toml resta invariato; usare la pagina Regolazione per rendere permanenti i valori. La modalità prestazioni apre l'intero intervallo dei safe point; una frequenza fissa blocca il clock; l'obiettivo di carico e le soglie di temperatura cambiano il modo in cui il governor scala senza toccare la modalità.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>Stato runtime</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modalità prestazioni</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Intervallo attuale</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Intervallo all'avvio ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Intervallo consentito (safe point)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Obiettivo di carico (inferiore / superiore)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Temperatura (throttle / recupero)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Controlli</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Modalità prestazioni: disattiva</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled: attivo permette al governor di usare l'intero intervallo consentito e di reagire più velocemente al carico; disattivo torna all'intervallo con cui il governor è partito.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Modalità:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency: modalità prestazioni con il clock fissato qui. Deve rientrare nell'intervallo consentito.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Fissa clock</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Frequenza fissa:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Nessun limite</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Limite inferiore del clock per ora; Nessun limite = il safe point più basso.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Limite superiore del clock per ora; Nessun limite = il safe point più alto.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Imposta intervallo</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max): un intervallo temporaneo, esce dalla modalità prestazioni.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>a</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Intervallo runtime:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>Sotto questo carico GPU il governor riduce il clock.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Sopra questo carico GPU il governor aumenta il clock.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Imposta obiettivo di carico</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper): la fascia di carico in cui il governor mantiene la GPU, fino al prossimo riavvio. Non tocca la modalità prestazioni.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Obiettivo di carico:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Sopra questa temperatura il governor abbassa il clock massimo.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Non impostato</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>Sotto questa temperatura l'intero intervallo è nuovamente consentito; Non impostato = l'isteresi propria del governor.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Imposta temperature</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery): fino al prossimo riavvio. Non tocca la modalità prestazioni.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Temperatura:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Copia i valori runtime nella pagina Regolazione</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Inserisce l'intervallo attuale, l'obiettivo di carico e le temperature nel modulo di Regolazione in modo da poterli salvare in config.toml.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Raggiungibile</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor risponde sul bus di sistema.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Attivo</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Disattivo</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Proprietà Enabled dell'interfaccia PerformanceMode.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Modalità prestazioni: attiva</translation>
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
        <translation>non impostato</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Non raggiungibile</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Sconosciuto</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>Il servizio del governor non è in esecuzione (pagina Servizio).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus è disattivo in config.toml: abilitarlo nella pagina Regolazione e applicare con un riavvio.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>Il governor non ha risposto sul bus di sistema.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>I controlli sono disabilitati: %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>l'obiettivo di carico inferiore deve essere minore di quello superiore</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>il recupero deve essere inferiore alla temperatura di throttling (oppure Non impostato)</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>Profili</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>Istantanee denominate di questa pagina e della pagina Utilizzo GPU, memorizzate solo per l'utente corrente. I safe point non fanno parte di un profilo.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>Carica nei moduli</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Riempie i moduli di Regolazione e Utilizzo GPU; non viene scritto nulla finché non si applica.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Applica ora</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Scrive il profilo in config.toml (prima il backup, una richiesta di password) e riavvia il governor. Le modifiche in sospeso nelle pagine di configurazione vengono scartate.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Salva attuale come…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Memorizza i valori attualmente nei moduli (applicati o meno) con un nome.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Elimina</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Copia comando scorciatoia</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Inserisce negli appunti una riga di comando che applica questo profilo nell'app in esecuzione. Associarla a un tasto in Impostazioni di sistema → Scorciatoie (KDE) oppure Tastiera → Scorciatoie personalizzate (GNOME) per cambiare profilo senza aprire la finestra.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Nessun profilo ancora: impostare i moduli e usare Salva attuale come…</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Safe point</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Ricarica dal disco</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>I [[safe-points]] di %1 definiscono la curva frequenza/tensione lungo cui scala il governor. Non esce mai dall'intervallo tra il punto più basso e quello più alto; [frequency-range] e i controlli runtime vi sono vincolati. Modificare con attenzione: tensioni errate possono bloccare o danneggiare la scheda. Applica verifica prima le regole del governor e i limiti rigidi (%2–%3 mV, fino a %4 MHz) e crea un backup.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Punti</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Frequenza</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Tensione</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Aggiungi punto</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Aggiunge un punto dopo quello selezionato, a metà strada verso il successivo.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Rimuovi</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Ordina</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Ordina le righe per frequenza (Applica lo fa comunque).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Curva</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Applica safe point</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Scrive i blocchi [[safe-points]] in config.toml (richiede la password, crea prima un backup).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Riavvia il governor in seguito</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>Il governor legge config.toml solo all'avvio.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Ripristina</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Torna ai punti presenti nel file.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valori predefiniti di fabbrica</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>I punti attivi del default-config.toml del governor: %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Testa un punto prima di salvarlo (runtime, root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode via D-Bus fissa subito questa frequenza e tensione e interrompe la scalatura automatica; il throttling termico del governor resta attivo. Non viene scritto nulla in config.toml e il governor applica la coppia così com'è, quindi restare entro i limiti rigidi. Mettere la GPU sotto carico mentre il test è in esecuzione. Arresta test (o il timer) disattiva la modalità prestazioni, che ripristina la scalatura normale con l'intervallo di avvio. Un punto che il silicio non riesce a sostenere blocca la scheda; salvare il proprio lavoro prima.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Carico:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Un generatore di carico GPU trovato nel PATH, avviato con il test e terminato quando questo finisce. Se termina in modo anomalo mentre il punto è fissato, viene segnalato.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>Nessuno strumento di carico trovato (vkmark, glmark2, vkcube o glxgears): eseguire manualmente un gioco o un benchmark durante il test.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Precompilato dalla riga selezionata; modificare liberamente.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>Fino all'arresto</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>L'app termina il test autonomamente dopo questo tempo (0 = solo con Arresta test).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Frequenza:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Tensione:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Per:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Avvia test</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Richiede la password (pkexec): l'interfaccia TestMode è riservata a root.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Arresta test</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Aggiungi alla tabella</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Inserisce questa coppia frequenza/tensione nella tabella dei safe point sopra (ordinata per frequenza, sostituendo un punto alla stessa frequenza). Applicare per salvare.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Scoprire quanto lontano può arrivare la propria scheda (frequenza massima più alta, tensioni più basse) è un compito per %1: testa un passo alla volta sotto un carico verificato e può installare il risultato. Modificare i punti a mano solo se si conosce ciò che il silicio tollera.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 punti: da %2 MHz @ %3 mV fino a %4 MHz @ %5 mV.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>Nessun [[safe-points]]; il governor tornerebbe a 350 MHz @ 700 mV e 2000 MHz @ 1000 mV.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>alza la frequenza massima da %1 a %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>abbassa la tensione in %1 punto/i esistente/i</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Questa modifica %1: un punto instabile può bloccare la scheda sotto carico. Verificarla prima con bc250-gpu-oc-bisect.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> e </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>nessun limite</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor (D-Bus): intervallo consentito %1–%2 MHz, intervallo attuale %3–%4 MHz.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz è superiore a %2 MHz, dove molte schede si bloccano definitivamente</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV è superiore a %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>la curva sopra darebbe %1 mV a %2 MHz; questo è inferiore</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>L'interfaccia D-Bus del governor non è raggiungibile (servizio arrestato o [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Servizio</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Verifica aggiornamenti</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Confronta l'RPM installato con l'ultima release su GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Esporta diagnostica…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Salva versioni, config.toml, stato del servizio, journal e la tabella gpu_metrics grezza in un file di testo per una segnalazione di bug.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Aggiorna</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Unità trovata</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Attivo</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Abilitato all'avvio</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Sostituzione gpu_metrics</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Versione</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Avvia</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Arresta</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Riavvia</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Abilita all'avvio</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Disabilita all'avvio</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (richiede la password).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Journal (in diretta)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Sì</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>No — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Sì (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>No (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>non caricato</translation>
    </message>
    <message>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>note di rilascio</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>release</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Pacchetto non installato</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Verifica in corso…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Impostazioni</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Queste impostazioni riguardano l'app, non il governor. Vengono memorizzate per utente.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Area di notifica</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Mostra un'icona nell'area di notifica con il carico, il clock e la temperatura GPU nel suggerimento</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Chiudendo la finestra l'app continua a funzionare nell'area di notifica</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Fare clic sinistro sull'icona dell'area di notifica per mostrare o nascondere la finestra; il menu attiva/disattiva anche la modalità prestazioni (quando D-Bus è raggiungibile) e chiude l'app.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>Questo desktop non offre un'area di notifica (su GNOME, installare l'estensione AppIndicator).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Avvia all'accesso</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Avvia l'app quando accedo</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…nascosta nell'area di notifica, senza aprire la finestra</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Aggiornamenti del governor</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Verifica la presenza di una release più recente del governor all'avvio dell'app</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Una richiesta ad api.github.com per l'ultima release di filippor/cyan-skillfish-governor, confrontata con l'RPM installato. Non viene inviato nient'altro. La pagina Servizio ha lo stesso controllo come pulsante.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Avvisi</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Notifica quando la temperatura GPU raggiunge</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Notifica quando il governor inizia il throttling per la temperatura</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Notifica quando il servizio del governor si arresta o non riesce da solo</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Mostrate come notifiche desktop tramite l'icona dell'area di notifica (nella barra di stato quando l'area di notifica è disattiva). Un messaggio per evento: un avviso di temperatura si riarma una volta che la GPU si è raffreddata di 5 °C sotto la propria soglia, e lo stesso avviso si ripete al massimo ogni 5 minuti.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Impossibile scrivere %1: %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Voce: %1
Comando: %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Scrive una voce desktop in %1; non viene installato nulla a livello di sistema.</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Sconosciuto</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Uno strumento di carico è già in esecuzione.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1 non è stato trovato nel PATH.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 non si è avviato: %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>carico %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>clock %1 MHz (max %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (max %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>nessuna lettura</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Nascondi finestra</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modalità prestazioni</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Applica profilo</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Esci</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Mostra finestra</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Regolazione</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Preimpostazione:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>Il modulo non corrisponde a nessuna preimpostazione.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Riempie il modulo sottostante; non viene scritto nulla finché non si applica.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>limiti di clock all'avvio</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Clock minimo che il governor può scegliere. 0 (Nessun limite) = safe point più basso.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Clock massimo che il governor può scegliere. 0 (Nessun limite) = safe point più alto.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Minimo:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Massimo:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>I valori al di fuori della tabella dei safe point di config.toml vengono vincolati dal governor.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>quando cambiare il clock</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>Carico GPU sopra il quale il governor alza il clock (superiore).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>Carico GPU sotto il quale il governor abbassa il clock (inferiore).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Aumenta sopra:</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Riduci sotto:</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Un divario ampio mantiene il clock stabile; un divario stretto segue da vicino il carico. Valori predefiniti del governor quando la sezione manca: 95 % / 80 %.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>throttling termico</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Sopra questa temperatura GPU il governor abbassa il clock (predefinito 85).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Non impostato</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>Sotto questa temperatura il throttling termina. Deve essere inferiore alla temperatura di throttling; Non impostato lascia la chiave fuori da config.toml.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Throttling sopra:</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Recupero sotto:</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>controllo runtime</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>pubblica com.cyanskillfish.Governor sul bus di sistema</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Necessario alla pagina Prestazioni di questa app e al wrapper di avvio cyan-skillfish-performance-mode.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>ciclo di controllo</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>con quale frequenza viene campionato il flag busy della GPU (predefinito del governor 2000 µs, file di fabbrica 250 µs). Usato dal metodo di carico busy-flag.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>con quale frequenza viene ricalcolato il clock obiettivo (predefinito del governor 10 × sample, file di fabbrica 100 000 µs). Non deve essere più breve dell'intervallo di campionamento.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Campiona ogni:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Regola ogni:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>con quale velocità il clock si muove verso il proprio obiettivo (predefinito 1 MHz/ms).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>velocità di variazione in modalità burst; deve essere superiore alla velocità normale (predefinito del governor 200 × normal, file di fabbrica 50 MHz/ms).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Velocità di variazione:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Velocità di variazione burst:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> campioni</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Disattivo</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>questo numero di campioni busy consecutivi passa alla velocità di variazione burst, così un gioco che carica improvvisamente la GPU ottiene rapidamente il proprio clock (1..%1; Off lascia la chiave fuori, file di fabbrica 60).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Burst dopo:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> eventi</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>cicli di regolazione con il carico sotto l'obiettivo inferiore prima che il clock scenda (predefinito del governor 10, file di fabbrica 5). Più alto = clock più persistente.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Riduci dopo:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Campionamento e regolazione più rapidi reagiscono prima ma costano tempo CPU. La modalità burst riduce il ritardo quando un gioco si avvia; più down-events impediscono al clock di scendere durante brevi pause.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>banda morta</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>una variazione di clock non burst inferiore a questo valore non viene applicata (predefinito 10). Evita continue piccole scritture SMU.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Ignora variazioni sotto:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>le sezioni di regolazione</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>Il governor riporta un intervallo di safe point di %1–%2 MHz; i valori fuori da esso vengono vincolati.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Ricarica dal disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annulla le modifiche su tutte le pagine e mostra di nuovo i valori di config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Riavvia il governor dopo l'applicazione</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Il governor legge config.toml solo all'avvio.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Applica modifiche</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Richiede la password una sola volta (pkexec), crea un backup con data e ora di config.toml e scrive %1. Vengono scritte anche le modifiche in sospeso dell'altra pagina di configurazione.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>non installato</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (ultima: sconosciuta — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (ultima: sconosciuta)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2 disponibile (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (aggiornato, ultima release %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (ultima release: %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Campiona il singolo bit busy della GPU a timing.intervals.sample (predefinito). Il più economico, funziona ovunque.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Analizza ogni processo che mantiene la GPU aperta. Più lavoro per la CPU rispetto a busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Legge il valore di carico proprio del kernel. Richiede un kernel corretto, che Bazzite di fabbrica non ha.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>ioctl AMDGPU_INFO_SENSOR_GPU_TEMP; mantiene aperto un handle del dispositivo DRM mentre il governor è in esecuzione (predefinito).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Legge invece temp1_input di hwmon amdgpu, così nessun client DRM resta aperto. Stesso sensore.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Comunica direttamente con l'SMU (API di bc250collective); applica la tensione dei safe point insieme al clock (predefinito).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Passa attraverso l'interfaccia sysfs di amdgpu (pp_od_clk_voltage) invece dell'SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valori predefiniti di fabbrica</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Silenzioso</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Reattivo</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Clock massimo</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>I valori del config.toml installato dal pacchetto del governor.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>I clock più bassi che riescono ancora a stare al passo: aumenta tardi, arriva al massimo a 1500 MHz, fa throttling a 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Aumenta presto e consente l'intero intervallo sicuro, a costo di più calore e potenza.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Resta vicino al limite superiore dell'intervallo sicuro; simile a un clock fisso lasciando attivo il throttling termico.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Personalizzato</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Nessun limite</translation>
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
&lt;p&gt;Una piccola interfaccia per &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, il governor GPU dell'&lt;b&gt;AMD BC-250&lt;/b&gt;
(APU Cyan Skillfish, gfx1013) su &lt;b&gt;Bazzite&lt;/b&gt;. Il governor deve essere già installato; quest'app
modifica una sezione della sua configurazione e controlla il suo servizio systemd. Nient'altro nel sistema
viene toccato.&lt;/p&gt;

&lt;h2&gt;Panoramica&lt;/h2&gt;
&lt;p&gt;Mostra se il servizio è in esecuzione, se la tabella &lt;code&gt;gpu_metrics&lt;/code&gt; corretta del governor è
montata su sysfs, se è disponibile un sensore di carico GPU, e un grafico del carico GPU (%), della temperatura (°C, asse
sinistro) e del clock (MHz, asse destro). Una lettura mancante lascia un vuoto, mai uno zero fittizio. L'app mantiene l'ultima ora
di campioni (uno ogni due secondi) mentre è in esecuzione; &lt;b&gt;Finestra&lt;/b&gt; sceglie quanta parte mostra il grafico (2, 10, 30 o
60 minuti) e &lt;b&gt;Esporta CSV…&lt;/b&gt; scrive ogni campione mantenuto (orario, carico, clock, temperatura, potenza socket,
modalità prestazioni, intervallo runtime) in un file. &lt;b&gt;Confronta…&lt;/b&gt; ricarica un file di questo tipo
e lo disegna tratteggiato dietro le linee dal vivo (campione più recente sul bordo destro, come la finestra
dal vivo) e inserisce sotto il grafico le medie e i picchi di entrambe le sessioni (carico, clock, temperatura, potenza socket),
così un profilo o una modifica dei safe point possono essere valutati
rispetto a un'esecuzione precedente; &lt;b&gt;Cancella&lt;/b&gt; la rimuove.&lt;/p&gt;
&lt;p&gt;Il riquadro &lt;b&gt;Tabella gpu_metrics&lt;/b&gt; decodifica la tabella esposta dal kernel (o dal governor): attività, temperature,
potenza socket/GFX/CPU, i clock GFX, SoC, memoria e fabric, lo stato di throttling e i clock dei core CPU.
&lt;i&gt;(corretta)&lt;/i&gt; indica che è montata la tabella del governor; &lt;i&gt;(grezza)&lt;/i&gt; è la tabella propria del kernel, la cui attività GFX
su un BC-250 è il valore errato del 655% e non è usata come carico.&lt;/p&gt;
&lt;p&gt;Il BC-250 di norma non ha un sensore &lt;code&gt;gpu_busy_percent&lt;/code&gt;, ma il governor misura il carico autonomamente e,
con &lt;b&gt;fix-metrics&lt;/b&gt; attivo, lo pubblica nella tabella &lt;code&gt;gpu_metrics&lt;/code&gt; corretta che monta su sysfs. L'app
lo legge da lì; &lt;code&gt;gpu_busy_percent&lt;/code&gt; e &lt;code&gt;radeontop&lt;/code&gt; sono soluzioni di ripiego. Senza alcuna
origine mostra &lt;b&gt;N/D&lt;/b&gt;, mai uno 0% fuorviante, e il suggerimento indica cosa manca. Il clock e la temperatura GPU provengono dai
sensori hwmon amdgpu; con &lt;code&gt;fix-freq&lt;/code&gt; attivo, il clock è il valore SMU reale.&lt;/p&gt;

&lt;h2&gt;Utilizzo GPU&lt;/h2&gt;
&lt;p&gt;Modifica la sezione &lt;code&gt;[gpu-usage]&lt;/code&gt; di &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Chiave&lt;/th&gt;&lt;th&gt;Predefinito&lt;/th&gt;&lt;th&gt;Significato&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Scrive il carico misurato in una tabella &lt;code&gt;gpu_metrics&lt;/code&gt;
corretta e la monta con bind-mount su sysfs. Corregge l'utilizzo GPU del 655% di MangoHud, dell'overlay di Steam e di radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Corregge anche &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; con il clock letto
dall'SMU. Corregge la frequenza sysfs errata, soprattutto dopo lo sblocco a 8 core. Indipendente da fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; campiona il bit busy della GPU;
&lt;i&gt;process&lt;/i&gt; analizza ogni processo che usa la GPU (più lavoro per la CPU); &lt;i&gt;kernel&lt;/i&gt; richiede un kernel corretto.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Dove viene letta la temperatura GPU: l'ioctl DRM (mantiene aperto un handle
DRM) oppure il file &lt;code&gt;temp1_input&lt;/code&gt; di hwmon. Stesso sensore.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Scarica la tabella corretta ogni N cicli di aggiornamento.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;E la sezione &lt;code&gt;[gpu]&lt;/code&gt;: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, il predefinito, applica clock e tensione tramite
l'SMU direttamente; &lt;i&gt;kernel&lt;/i&gt; passa invece attraverso l'interfaccia sysfs di amdgpu).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Applica modifiche&lt;/b&gt; (in questa pagina o in Regolazione) richiede la password una volta sola (pkexec). Copia il
file attuale in &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; e scrive le modifiche in sospeso di entrambe le pagine. Cambiano solo le chiavi
note; ogni altra riga del file, compresi i commenti, viene mantenuta. Il governor legge il file all'avvio, quindi
il servizio viene riavviato in seguito a meno che non si deselezioni quell'opzione.&lt;/p&gt;

&lt;h2&gt;Regolazione&lt;/h2&gt;
&lt;p&gt;Modifica le altre sezioni di &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Sezione&lt;/th&gt;&lt;th&gt;Chiavi&lt;/th&gt;&lt;th&gt;Significato&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Limiti di clock in MHz con cui parte il governor. &lt;i&gt;Nessun limite&lt;/i&gt;
(0) lascia il limite aperto; i valori al di fuori della tabella dei safe point vengono vincolati dal governor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Aumenta il clock quando il carico è sopra &lt;i&gt;upper&lt;/i&gt;,
lo abbassa quando è sotto &lt;i&gt;lower&lt;/i&gt;. Un divario ampio mantiene il clock stabile, uno stretto segue da vicino il carico.
I valori predefiniti propri del governor quando la sezione manca sono 95% / 80%; il file di fabbrica usa 65% / 50%.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Fa throttling sopra il primo valore (predefinito
85 °C); recupera sotto il secondo, che è opzionale (&lt;i&gt;Non impostato&lt;/i&gt;) e deve essere inferiore.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Pubblica &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; sul bus di sistema. La
pagina Prestazioni lo richiede; il file di fabbrica lo attiva, il predefinito integrato del governor è disattivo.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;Il ciclo di controllo: con quale frequenza viene campionato il carico e regolato il clock (µs), con quale velocità il clock
si muove verso il proprio obiettivo (MHz/ms), quanti campioni busy consecutivi passano alla velocità burst più rapida (&lt;i&gt;Off&lt;/i&gt; lascia
fuori la chiave), e quanti cicli di regolazione a basso carico passano prima che il clock scenda. Predefiniti del governor: 2000 µs /
10 × sample, 1 / 200 × normal, off, 10; il file di fabbrica usa 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Banda morta in MHz: una variazione non burst inferiore a questo valore
non viene applicata (predefinito 10).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;Le &lt;b&gt;preimpostazioni&lt;/b&gt; riempiono in una volta l'intervallo di frequenza, l'obiettivo di carico e la temperatura (il timing resta invariato): &lt;i&gt;Valori predefiniti di fabbrica&lt;/i&gt; (la config del pacchetto), &lt;i&gt;Silenzioso&lt;/i&gt; (clock
più bassi, aumento tardivo), &lt;i&gt;Reattivo&lt;/i&gt; (aumento precoce, intervallo completo) e &lt;i&gt;Clock massimo&lt;/i&gt; (resta vicino al limite superiore).
Il menu a tendina mostra &lt;i&gt;Personalizzato&lt;/i&gt; non appena un valore differisce da ogni preimpostazione. Le combinazioni non valide (min sopra
max, recupero non inferiore al throttling, intervallo di regolazione più breve del campionamento, velocità burst non superiore alla normale) vengono segnalate
sotto il modulo e bloccano Applica.&lt;/p&gt;
&lt;p&gt;I &lt;b&gt;profili&lt;/b&gt; sono istantanee denominate di ogni valore in questa pagina e nella pagina Utilizzo GPU (i safe point non sono
inclusi), memorizzate per l'utente in &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Salva attuale come…&lt;/i&gt; memorizza ciò che i moduli mostrano in quel momento, applicato o meno. &lt;i&gt;Carica nei moduli&lt;/i&gt; riempie entrambe
le pagine in modo da poter rivedere e applicare come di consueto; &lt;i&gt;Applica ora&lt;/i&gt; scrive il profilo in &lt;code&gt;config.toml&lt;/code&gt;
(prima il backup, una richiesta di password), scarta le modifiche in sospeso e riavvia il governor. Con l'icona dell'area di notifica attiva, il
sottomenu &lt;i&gt;Applica profilo&lt;/i&gt; del menu dell'area di notifica fa lo stesso senza aprire la finestra. Per una &lt;b&gt;scorciatoia da tastiera&lt;/b&gt;,
&lt;i&gt;Copia comando scorciatoia&lt;/i&gt; inserisce negli appunti &lt;code&gt;bc250-governor-manager --profile 'Nome'&lt;/code&gt;; associarlo in
Impostazioni di sistema → Scorciatoie (KDE) oppure Tastiera → Scorciatoie personalizzate (GNOME). L'app viene eseguita una volta per utente: quel comando
raggiunge l'istanza in esecuzione tramite un socket locale e vi applica il profilo (una richiesta di password, avviso
dell'area di notifica), oppure avvia l'app e lo applica quando non è in esecuzione nulla. Un secondo avvio semplice solleva solo la finestra.
&lt;code&gt;--list-profiles&lt;/code&gt; stampa i nomi salvati.&lt;/p&gt;

&lt;h2&gt;Safe point&lt;/h2&gt;
&lt;p&gt;I &lt;code&gt;[[safe-points]]&lt;/code&gt; di &lt;code&gt;%3&lt;/code&gt; come tabella modificabile e curva frequenza/tensione.
Il governor scala lungo questa curva e non esce mai dal proprio intervallo; &lt;code&gt;[frequency-range]&lt;/code&gt; e i controlli runtime
vi sono vincolati. &lt;b&gt;Aggiungi punto&lt;/b&gt; inserisce a metà strada verso il punto successivo, &lt;b&gt;Rimuovi&lt;/b&gt; elimina la
riga selezionata, &lt;b&gt;Valori predefiniti di fabbrica&lt;/b&gt; carica la tabella propria del governor, &lt;b&gt;Ripristina&lt;/b&gt; torna al file. Prima che
&lt;b&gt;Applica safe point&lt;/b&gt; sia abilitato, l'elenco deve superare le regole del governor (almeno due punti, frequenze
univoche, tensione mai in calo all'aumentare della frequenza) e i limiti rigidi condivisi con bc250-gpu-oc-bisect
(700–1100 mV, fino a 2500 MHz). Sopra i 2000 MHz o i 1000 mV, oppure quando una modifica alza la frequenza massima o abbassa una
tensione esistente, viene mostrato un avviso: un punto instabile blocca la scheda sotto carico. Applica crea un backup e
richiede la password; trovare in sicurezza il limite proprio di una scheda è il compito di
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Testa un punto prima di salvarlo&lt;/b&gt; usa l'interfaccia D-Bus &lt;code&gt;TestMode&lt;/code&gt; del governor, riservata a root
(una richiesta &lt;code&gt;pkexec&lt;/code&gt;): la GPU viene fissata alla frequenza e tensione inserite e la scalatura
automatica si interrompe, mentre il throttling termico resta attivo. Non viene scritto nulla in &lt;code&gt;config.toml&lt;/code&gt;. I
campi sono precompilati dalla riga selezionata; appare un avviso sopra i 2000 MHz / 1000 mV o quando la tensione è
inferiore a quella che darebbe la curva sopra. &lt;b&gt;Carico&lt;/b&gt; sceglie un generatore di carico GPU trovato nel PATH (vkmark, glmark2,
vkcube o glxgears, in quest'ordine di preferenza); viene avviato con il test e terminato quando il test finisce,
e se termina in modo anomalo mentre il punto è fissato lo stato lo segnala. In mancanza di uno, caricare la GPU manualmente osservando la
Panoramica. &lt;b&gt;Arresta test&lt;/b&gt;, il timer (predefinito 60 s, &lt;i&gt;Fino all'arresto&lt;/i&gt; = 0), la chiusura dell'app, o qualsiasi azione nella
pagina Prestazioni termina il test disattivando la modalità prestazioni, il che riporta il governor alla scalatura
normale con il proprio intervallo di avvio. La riga del risultato riporta quindi per quanto tempo il punto è stato mantenuto, la temperatura di picco
e l'intervallo di clock osservato; &lt;b&gt;Aggiungi alla tabella&lt;/b&gt; inserisce la coppia testata nella tabella dei safe point (ordinata, sostituendo
un punto alla stessa frequenza) in modo da poterla applicare. Mentre un punto è fissato il &lt;b&gt;log del kernel&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) viene monitorato per problemi amdgpu (timeout dell'anello, reset GPU, righe
&lt;code&gt;*ERROR*&lt;/code&gt;, errori SMU); la prima riga di questo tipo interrompe subito il test, rilasciando il punto prima che la scheda si blocchi,
ed è citata nel risultato. Anche un'esecuzione pulita lo segnala. Leggere l'anello del kernel richiede l'appartenenza al gruppo
&lt;code&gt;systemd-journal&lt;/code&gt; (o &lt;code&gt;wheel&lt;/code&gt;); altrimenti lo stato indica che il log non è monitorato e
il test procede alla cieca. Un punto che il silicio non riesce a sostenere può bloccare la scheda più velocemente di quanto il kernel riesca a registrarlo,
quindi salvare prima il proprio lavoro. Solo il governor smu ha D-Bus.&lt;/p&gt;

&lt;h2&gt;Prestazioni&lt;/h2&gt;
&lt;p&gt;Controllo runtime del governor via D-Bus, esattamente ciò che fa il wrapper proprio del governor
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;. Le modifiche si applicano immediatamente, non richiedono password e vengono
perse al successivo riavvio del governor; &lt;code&gt;config.toml&lt;/code&gt; non viene toccato. &lt;i&gt;Copia i valori runtime nella pagina Regolazione&lt;/i&gt;
trasferisce l'intervallo e le soglie attuali nella pagina Regolazione in modo da poterli salvare.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;La &lt;b&gt;modalità prestazioni&lt;/b&gt; è un interruttore (rosso quando attiva): attiva apre l'intero intervallo consentito (safe point); disattiva torna
all'intervallo di &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Fissa clock&lt;/b&gt; fissa la frequenza e attiva la modalità prestazioni.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Imposta intervallo&lt;/b&gt; applica un min/max temporaneo.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Imposta obiettivo di carico&lt;/b&gt; e &lt;b&gt;Imposta temperature&lt;/b&gt; cambiano la fascia di carico (inferiore/superiore %) e le temperature di
throttling / recupero con cui scala il governor, senza toccare la modalità prestazioni o un test dei safe point in corso.
I campi seguono i valori attuali del governor e vengono ricompilati quando cambiano; coppie impossibili (inferiore non
sotto superiore, recupero non sotto throttling) disabilitano il pulsante.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;I controlli sono disabilitati quando il servizio non è in esecuzione o il nome del bus non è pubblicato; il motivo è mostrato
sotto i controlli. Abilitare &lt;code&gt;[dbus] enabled&lt;/code&gt; nella pagina Regolazione e riavviare il governor se necessario.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Per gioco&lt;/b&gt; costruisce la riga di avvio per il wrapper &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; del governor:
modalità prestazioni semplice, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; o
&lt;code&gt;--temperature&lt;/code&gt;, precompilata con i numeri attuali del governor, formattata per le opzioni di avvio di Steam
(&lt;code&gt;… %command%&lt;/code&gt;), un comando wrapper Heroic/Lutris, o un terminale. &lt;b&gt;Copia&lt;/b&gt; la inserisce negli appunti.
Il wrapper applica l'impostazione, esegue il gioco e disattiva la modalità prestazioni quando questo termina, il che riporta anche il
governor sul proprio intervallo di avvio. Richiede D-Bus abilitato, come i controlli sopra.&lt;/p&gt;

&lt;h2&gt;Backup&lt;/h2&gt;
&lt;p&gt;Ogni scrittura crea una copia &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; accanto alla configurazione. La pagina le elenca,
mostra la differenza tra una copia e il file attuale, e &lt;b&gt;Ripristina selezionato&lt;/b&gt; rimette al suo posto la copia (del file
attuale viene prima creato un backup, password richiesta una volta). Il governor viene riavviato in seguito a meno che non si deselezioni quell'opzione.&lt;/p&gt;

&lt;h2&gt;Servizio&lt;/h2&gt;
&lt;p&gt;Avvia, arresta, riavvia, abilita o disabilita &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, con l'output di
&lt;code&gt;systemctl status&lt;/code&gt; e un &lt;b&gt;journal in diretta&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, ultime 200 righe e
tutto ciò che segue mentre la pagina è mostrata, fino a 2000 mantenute). Il campo filtro accetta testo o un'espressione
regolare, senza distinzione tra maiuscole e minuscole; deselezionare &lt;b&gt;Segui&lt;/b&gt; per leggere senza essere spostati. Leggere le unità di sistema richiede che l'
utente sia nel gruppo &lt;code&gt;wheel&lt;/code&gt; o &lt;code&gt;systemd-journal&lt;/code&gt;, il che è il caso su Bazzite. Ogni azione del servizio
richiede la password.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Verifica aggiornamenti&lt;/b&gt; confronta l'RPM &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; installato con l'ultima
release di &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
su GitHub (una richiesta ad api.github.com; eseguita anche all'avvio a meno che non sia disattivata in Impostazioni). Una release più recente viene
mostrata in arancione con un collegamento alle sue note. Aggiornare il pacchetto nel modo in cui è stato installato: COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; tramite &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; se stratificato, oppure il tarball della release.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Esporta diagnostica…&lt;/b&gt; scrive un file di testo per una segnalazione di bug: versioni di app, governor e Bazzite, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; e i suoi backup, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, le ultime 300 righe del
journal, l'interfaccia D-Bus, la riga di comando del kernel, i messaggi del kernel amdgpu, i sensori hwmon e la tabella
&lt;code&gt;gpu_metrics&lt;/code&gt; grezza (analizzata e come dump esadecimale). Leggere il file e rimuovere ciò che non si vuole
condividere prima di allegarlo a una segnalazione.&lt;/p&gt;

&lt;h2&gt;Impostazioni&lt;/h2&gt;
&lt;p&gt;Impostazioni dell'app, memorizzate per utente. &lt;b&gt;Area di notifica&lt;/b&gt;: mostra un'icona nell'area di notifica il cui suggerimento riporta il carico, il clock,
la temperatura, la modalità prestazioni e lo stato del governor della GPU; il clic sinistro mostra o nasconde la finestra, il menu attiva/disattiva la
modalità prestazioni (quando D-Bus è raggiungibile) e chiude l'app. Con &lt;i&gt;Chiudendo la finestra l'app continua a funzionare nell'
area di notifica&lt;/i&gt; selezionato, il pulsante di chiusura della finestra la nasconde nell'area di notifica invece di chiuderla; usare il menu dell'area di notifica per uscire.
&lt;b&gt;Avvia all'accesso&lt;/b&gt; scrive &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (nulla
a livello di sistema), opzionalmente avviando nascosta nell'area di notifica con &lt;code&gt;--start-in-tray&lt;/code&gt;. La sessione KDE Plasma
di Bazzite ha un'area di notifica nativa, quindi questo funziona subito; una sessione GNOME richiederebbe l'estensione AppIndicator.
Gli &lt;b&gt;avvisi&lt;/b&gt; sono notifiche desktop tramite l'icona dell'area di notifica (barra di stato solo quando l'area di notifica è disattiva): la GPU che raggiunge
una temperatura scelta dall'utente, la GPU che raggiunge la temperatura di throttling propria del governor (il valore runtime quando D-Bus
è raggiungibile, altrimenti quello in &lt;code&gt;config.toml&lt;/code&gt;), e il servizio del governor che si arresta o non riesce dopo che l'
app lo ha visto in esecuzione. Un avviso di temperatura scatta una volta per attraversamento e si riarma 5 °C sotto la propria soglia; lo
stesso avviso si ripete al massimo ogni 5 minuti.&lt;/p&gt;

&lt;h2&gt;Il vecchio governor tt&lt;/h2&gt;
&lt;p&gt;Avviato con &lt;code&gt;--backend tt&lt;/code&gt; (oppure automaticamente quando è caricato solo &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;),
l'app gestisce invece &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. Quel governor non ha
fix-metrics, intervallo di frequenza, D-Bus o release GitHub, quindi le pagine Utilizzo GPU e Prestazioni, quelle sezioni di
Regolazione, il campo &lt;code&gt;down-events&lt;/code&gt; e il controllo aggiornamenti sono nascosti e il sensore di carico GPU resta
non disponibile. Tutto il resto, compresi &lt;code&gt;[timing]&lt;/code&gt; e &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, funziona allo
stesso modo.&lt;/p&gt;

&lt;h2&gt;Privilegi&lt;/h2&gt;
&lt;p&gt;L'app viene eseguita come utente normale. Solo quattro operazioni richiedono root e passano per &lt;code&gt;pkexec&lt;/code&gt;:
il backup, la scrittura di &lt;code&gt;config.toml&lt;/code&gt;, le azioni &lt;code&gt;systemctl&lt;/code&gt; e il test dei safe point
(&lt;code&gt;busctl&lt;/code&gt; sull'interfaccia TestMode riservata a root). La password viene gestita
dall'agente polkit del desktop; l'app non la vede mai.&lt;/p&gt;

&lt;h2&gt;Installazione e aggiornamento&lt;/h2&gt;
&lt;p&gt;Il tarball della release contiene &lt;code&gt;install.sh&lt;/code&gt;. Installa l'app solo per l'utente corrente (un venv privato
con PyQt6 sotto &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, il launcher
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, una voce desktop e l'icona), così appare nel
menu delle applicazioni. Eseguirlo di nuovo da una release più recente per aggiornare, &lt;code&gt;./install.sh --uninstall&lt;/code&gt; lo rimuove.
Nulla viene stratificato con rpm-ostree e la configurazione del governor non viene mai toccata.&lt;/p&gt;

&lt;h2&gt;Collegamenti&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Questa app: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;Il governor (filippor, ramo SMU): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Concesso in licenza secondo la GNU General Public License v3.0 o successiva. Il font Inter (licenza SIL Open Font) è incluso.&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>non è un'esportazione di telemetria: manca la colonna 'time'</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>non è un'esportazione di telemetria: colonna/e mancante/i %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Modalità prestazioni</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Intero intervallo dei safe point, reazione più rapida al carico. Come il pulsante Attivo.</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Clock fisso</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency: fissa il clock GPU per questo gioco (deve rientrare nell'intervallo consentito).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Intervallo di clock</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range: un min/max temporaneo, 0 = nessun limite.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Obiettivo di carico</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target: carico GPU inferiore/superiore che determina l'aumento e la riduzione del clock.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Temperatura</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature: soglie di throttle / recupero in °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Opzioni di avvio Steam</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → gioco → Proprietà → Generale → Opzioni di avvio. Incollare l'intera riga.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Wrapper Heroic / Lutris</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic: impostazioni del gioco → Avanzate → Comando wrapper. Lutris: Opzioni runner → Prefisso comando. Serve solo la parte del wrapper; il launcher aggiunge il gioco stesso.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Terminale / script</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>Sostituire &lt;program&gt; con il comando da eseguire.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>sensore hwmon amdgpu</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Tabella gpu_metrics</translation>
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
        <translation>average_gfx_activity della tabella gpu_metrics corretta del governor.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>sensore sysfs gpu_busy_percent di amdgpu.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Soluzione di ripiego: radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Tabella</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>Attività GFX</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>Attività MM</translation>
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
        <translation>Potenza socket</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>Potenza GFX</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>Potenza CPU</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>Clock GFX</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Clock GFX medio</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>Clock SoC</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Clock memoria</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Clock fabric</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>Stato throttling</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>Core CPU</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Solo cyan-skillfish-governor-smu pubblica un valore di carico (fix-metrics); il governor tt non lo fa, quindi questo resta non disponibile.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>Installare cyan-skillfish-governor-smu; misura il carico e lo pubblica tramite gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>Abilitare fix-metrics nella pagina Utilizzo GPU e applicare con un riavvio.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Avviare il servizio del governor nella pagina Servizio; fix-metrics è attivo ma nulla pubblica il carico.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics è attivo e il servizio è in esecuzione, ma nessuna gpu_metrics corretta è montata: controllare il journal.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>La tabella gpu_metrics corretta non contiene un valore di carico valido; controllare il journal nella pagina Servizio.</translation>
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
        <translation>%1 W (grezzo %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (non valido)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C max</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>nessun limite</translation>
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
        <translation>Sono necessari almeno %1 punti.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz compare due volte.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz è fuori dall'intervallo 1–%2 MHz.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 mV a %2 MHz è fuori dall'intervallo %3–%4 mV.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 mV a %2 MHz è inferiore a %3 mV a %4 MHz; la tensione non deve diminuire all'aumentare della frequenza (regola del governor).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz è superiore a %2 MHz, dove molte schede iniziano a bloccarsi definitivamente.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV è superiore a %2 mV; tenere d'occhio la temperatura e l'alimentatore.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Nessuno (caricare la GPU manualmente)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub ha risposto %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>nessuna connessione (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>tag inatteso %1</translation>
    </message>
</context>
</TS>
