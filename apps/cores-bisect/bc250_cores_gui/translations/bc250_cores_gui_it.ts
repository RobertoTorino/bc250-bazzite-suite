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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Un frontend PyQt6 per bc250-cores-unlock.sh: mantiene tra i riavvii lo sblocco dei core 8C/16T della BC-250 già convalidato con bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licenza: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = sempre attivo (6C/12T)   ok = superato in ogni round   xx = fallisce sempre   ?? = casuale   .. = non ancora testato</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Informazioni</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Mantiene tra i riavvii lo sblocco dei core 8C/16T già convalidato con bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Installa (mantieni 8C/16T a ogni avvio)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Attiva il servizio root che riapplica lo sblocco dopo un avvio a freddo ed esegue una volta un riavvio a caldo.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Disinstalla (stock dopo il prossimo spegnimento)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Rimuove il servizio. Lo sblocco resta attivo fino al prossimo spegnimento completo (avvio a freddo).</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Aggiorna stato</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Mostra la maschera di presenza dei core, i thread e lo stato del servizio e del guard.</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>Stato con sudo</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>Esegue lo stato come root (chiede la password sudo), così mostra anche la maschera di presenza dei core.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Ricontrolla i risultati della bisezione</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Rilegge i risultati registrati da bc250-cores-bisect.sh, ad esempio dopo il completamento di altri round.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>L'output di bc250-cores-unlock.sh appare qui.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ ACCETTATO</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ NON ANCORA ACCETTATO!</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>In corso — installazione…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>In corso — disinstallazione…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>In corso…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo: autenticazione non riuscita.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Password errata, riprova.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} completato, codice di uscita {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} non riuscito (codice di uscita {1}). Vedi l'output sopra.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>Mantenere tutti gli 8 core (16 thread) attivi a ogni avvio?

Un servizio root controlla la maschera dei core a ogni avvio. Dopo un avvio a freddo riapplica lo sblocco ed esegue una volta un riavvio a caldo. Se lo sblocco non è attivo in questo momento, riavvia (a caldo) dopo l'installazione per attivare i core.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>Rimuovere il servizio di sblocco? Gli 8 core restano attivi fino al prossimo spegnimento completo (avvio a freddo); dopodiché la scheda torna allo stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>password amministratore</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>La scrittura della SMU mailbox e l'installazione del servizio systemd richiedono i permessi di root, quindi bc250-cores-unlock.sh viene eseguito tramite sudo.
La password viene passata solo a sudo e non viene mai memorizzata.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>password sudo</translation>
    </message>
</context>
</TS>
