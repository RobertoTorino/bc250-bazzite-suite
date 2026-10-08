<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="it">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>informazioni</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Versione {0}</translation>
    </message>
    <message>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Una schermata di configurazione in PyQt6 per bc250-cores-bisect.sh: scegli le opzioni e avvia un'esecuzione, che prosegue poi in un terminale esattamente come se l'avessi digitata a mano.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licenza: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>guida</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>Impossibile leggere bc250-cores-bisect.sh --help.

Eseguilo invece da un terminale:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Guida</translation>
    </message>
    <message>
        <source>About</source>
        <translation>Informazioni</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Scegli come vuoi eseguire bc250-cores-bisect.sh, poi fai clic su Avvia. Questa finestra si chiude e l'esecuzione vera prosegue in un terminale, esattamente come lanciando lo script a mano.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Carico per tentativo (secondi):</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>Carico CPU per tentativo (-t). Minimo {0}s, predefinito {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Round per elemento:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Tentativi per elemento (-r), alternati in modo che calore e ora del giorno non favoriscano un elemento. Un solo round non permette di distinguere un core davvero difettoso da un errore casuale.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Strumento di carico:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (predefinito)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>test di tortura mprime</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>entrambi (stress-ng, poi mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng verifica i propri risultati ed è sempre disponibile. Il test di tortura di mprime è un carico AVX/FMA molto più pesante che controlla anch'esso ogni risultato, quindi individua gli errori di calcolo silenziosi che stress-ng non rileva, ma va installato separatamente. «entrambi» li esegue uno dopo l'altro, perciò un tentativo dura il doppio del tempo di carico.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Conta anche gli errori hardware con rasdaemon</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: legge il database degli errori di ras-mc-ctl prima e dopo ogni tentativo. rasdaemon memorizza gli errori in modo persistente, quindi vengono contati anche quando il journal è volatile o il tentativo termina con un crash. Richiede il servizio rasdaemon attivo.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>Stesso avvio (non riavviare tra un tentativo e l'altro)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: molto più veloce, ma ogni tentativo eredita lo stato del precedente, perciò è più difficile attribuire un errore a un singolo core.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Non presidiato (nessuna domanda, riavvio automatico, riprende dopo l'accesso)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: non chiede nulla, si riavvia da solo e continua dopo ogni accesso finché tutti gli elementi non sono completati. Richiede sudo senza password per setpci e journalctl: vedi il README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Installa anche il servizio di accesso per la ripresa automatica (consigliato con Non presidiato)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Scrive e abilita ~/.config/systemd/user/bc250-cores-bisect-auto.service, così l'esecuzione si riavvia da sola dopo ogni riavvio o accesso, come nella checklist --auto del README. Lo script lo rimuove di nuovo una volta completati tutti gli elementi.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Reimposta</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: elimina definitivamente tutti i risultati e i log salvati in ~/.local/share/bc250-cores-bisect, così la prossima esecuzione riparte da zero.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Mostra stato (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Mostra i risultati ottenuti finora, scrive il report ed esce.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Avvia Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Stima approssimativa: ~{0:.1f} h per una scheda tipica ({1} elementi x {2} round){3}. L'esecuzione è riprendibile: i risultati vengono salvati dopo ogni tentativo.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, riavvii inclusi</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>Eliminare tutti i risultati di bc250-cores-bisect?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Questa operazione elimina definitivamente ogni risultato e log salvato in ~/.local/share/bc250-cores-bisect (--reset). Non può essere annullata e non esiste alcun backup. Lo script chiederà comunque un'ulteriore conferma nel terminale.</translation>
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
        <translation>Avviare bc250-cores-bisect.sh con:

  tempo di carico: {t}s
  round: {r}
  strumento di carico: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  non presidiato: {au}

Questa finestra verrà chiusa e l'esecuzione proseguirà in un terminale.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>Impossibile installare il servizio di accesso per la ripresa automatica:
{0}

L'esecuzione verrà comunque avviata ora; consulta la checklist --auto del README per configurarlo a mano.</translation>
    </message>
</context>
</TS>
