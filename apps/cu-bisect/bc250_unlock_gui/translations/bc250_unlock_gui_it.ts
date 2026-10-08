<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="it">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Informazioni</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Applica subito la maschera accettata e la riapplica automaticamente a ogni avvio futuro.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Disattiva il servizio di sblocco; la scheda torna alle 24 CU di fabbrica dal prossimo riavvio.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Mostra le maschere installate, lo stato del servizio e le maschere live (non richiede i permessi di root).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Rilegge i risultati registrati da bc250-cu-bisect.sh, ad esempio dopo un altro ritest.</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>Password errata, riprova.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Mantiene uno sblocco delle CU già convalidato con bc250-cu-bisect.sh anche dopo i riavvii.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Installa (applica ora e mantieni dopo il riavvio)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Disinstalla (torna alla configurazione di fabbrica al prossimo avvio)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Aggiorna stato</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Ricontrolla i risultati della bisezione</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>L'output di bc250-cu-unlock.sh appare qui.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ ACCETTATO</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ NON ANCORA ACCETTATO!</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: autenticazione non riuscita.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} completato, codice di uscita {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} non riuscito (codice di uscita {1}). Vedi l'output sopra.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>Applicare {0} ({1} CU) ora e mantenerlo attivo a ogni avvio?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>Disattivare il servizio di sblocco? La scheda tornerà alle 24 CU di fabbrica al prossimo riavvio.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>password amministratore</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>La scrittura dei registri GPU e l'installazione del servizio systemd richiedono i permessi di root, quindi bc250-cu-unlock.sh viene eseguito tramite sudo.
La password viene passata solo a sudo e non viene mai memorizzata.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>password sudo</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Un frontend PyQt6 per bc250-cu-unlock.sh: mantiene attivo tra i riavvii uno sblocco delle unità di calcolo BC-250 già convalidato con bc250-cu-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licenza: GNU GPLv3.</translation>
    </message>
</context>
</TS>
