<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="it">
    <context>
        <name>DeployPage</name>
        <message>
            <source>Deploy</source>
            <translation>Distribuisci</translation>
        </message>
        <message>
            <source>Game</source>
            <translation>Gioco</translation>
        </message>
        <message>
            <source>Steam library:</source>
            <translation>Libreria Steam:</translation>
        </message>
        <message>
            <source>The folders under steamapps/common of every Steam library on this PC.</source>
            <translation>Le cartelle in steamapps/common di ogni libreria Steam su questo PC.</translation>
        </message>
        <message>
            <source>Browse…</source>
            <translation>Sfoglia…</translation>
        </message>
        <message>
            <source>Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix.</source>
            <translation>Qualsiasi cartella: un gioco fuori da Steam o un prefisso Heroic / Lutris / Bottles.</translation>
        </message>
        <message>
            <source>Folder:</source>
            <translation>Cartella:</translation>
        </message>
        <message>
            <source>Pick a game above or browse to its folder</source>
            <translation>Scegli un gioco sopra o sfoglia fino alla sua cartella</translation>
        </message>
        <message>
            <source>Scan</source>
            <translation>Scansiona</translation>
        </message>
        <message>
            <source>FSR 3.1 upscaler DLLs in that folder</source>
            <translation>DLL upscaler FSR 3.1 in quella cartella</translation>
        </message>
        <message>
            <source>DLL</source>
            <translation>DLL</translation>
        </message>
        <message>
            <source>State</source>
            <translation>Stato</translation>
        </message>
        <message>
            <source>Network files</source>
            <translation>File di rete</translation>
        </message>
        <message>
            <source>helixsr.ini</source>
            <translation>helixsr.ini</translation>
        </message>
        <message>
            <source>Location</source>
            <translation>Percorso</translation>
        </message>
        <message>
            <source>Scan a game folder first.</source>
            <translation>Scansiona prima una cartella di gioco.</translation>
        </message>
        <message>
            <source>How</source>
            <translation>Metodo</translation>
        </message>
        <message>
            <source>Replace the selected DLL (the game's file is kept as *.original.dll)</source>
            <translation>Sostituisci la DLL selezionata (il file del gioco resta come *.original.dll)</translation>
        </message>
        <message>
            <source>Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)</source>
            <translation>Cartella autonoma per OptiScaler (giochi DLSS / XeSS / FSR 2)</translation>
        </message>
        <message>
            <source>The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: under Engine/Plugins/…/Win64) or &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; above, then choose &lt;b&gt;AMD FSR&lt;/b&gt; in the game. No launch options.</source>
            <translation>Il modo previsto per installare HelixSR: il gioco chiama FSR 3.1 e ottiene HelixSR. Scegli sopra &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; del gioco (Unreal: sotto Engine/Plugins/…/Win64) o &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt;, poi scegli &lt;b&gt;AMD FSR&lt;/b&gt; nel gioco. Nessuna opzione di avvio.</translation>
        </message>
        <message>
            <source>Defaults to &lt;game&gt;/HelixSR</source>
            <translation>Predefinita: &lt;game&gt;/HelixSR</translation>
        </message>
        <message>
            <source>Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this folder with the lines below (Copy puts them on the clipboard).</source>
            <translation>Installa OptiScaler per il gioco come descritto nella sua documentazione, poi punta il suo OptiScaler.ini a questa cartella con le righe qui sotto (Copia le mette negli appunti).</translation>
        </message>
        <message>
            <source>Copy OptiScaler.ini lines</source>
            <translation>Copia righe OptiScaler.ini</translation>
        </message>
        <message>
            <source>Write helixsr.ini with the values of the helixsr.ini page</source>
            <translation>Scrivi helixsr.ini con i valori della pagina helixsr.ini</translation>
        </message>
        <message>
            <source>Unticked: the payload's helixsr.ini is copied if it has one, else none is written and HelixSR uses its defaults.</source>
            <translation>Se deselezionato: viene copiato l'helixsr.ini del payload, se presente; altrimenti non viene scritto nulla e HelixSR usa i predefiniti.</translation>
        </message>
        <message>
            <source>Remove HelixSR</source>
            <translation>Rimuovi HelixSR</translation>
        </message>
        <message>
            <source>Delete HelixSR's files and put the game's original DLL back.</source>
            <translation>Elimina i file di HelixSR e ripristina la DLL originale del gioco.</translation>
        </message>
        <message>
            <source>Deploy HelixSR</source>
            <translation>Distribuisci HelixSR</translation>
        </message>
        <message>
            <source>Copy HelixSR into the game as chosen above.</source>
            <translation>Copia HelixSR nel gioco come scelto sopra.</translation>
        </message>
        <message>
            <source>— pick a game —</source>
            <translation>— scegli un gioco —</translation>
        </message>
        <message>
            <source>— no Steam library found —</source>
            <translation>— nessuna libreria Steam trovata —</translation>
        </message>
        <message>
            <source>No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a separate DLL: use the OptiScaler folder below, or check the game's folder.</source>
            <translation>Nessuna DLL upscaler FSR 3.1 in questa cartella. Il gioco potrebbe non includere FSR 3.1 come DLL separata: usa la cartella OptiScaler qui sotto o controlla la cartella del gioco.</translation>
        </message>
        <message>
            <source>{0} DLL(s) found; select the one the game loads (usually the only one, or the shallowest).</source>
            <translation>DLL trovate: {0}; seleziona quella caricata dal gioco (di solito l’unica o la meno annidata).</translation>
        </message>
        <message>
            <source>Import a complete payload first.</source>
            <translation>Importa prima un payload completo.</translation>
        </message>
        <message>
            <source>Write HelixSR under both FidelityFX names into the folder.</source>
            <translation>Scrivi HelixSR nella cartella con entrambi i nomi FidelityFX.</translation>
        </message>
        <message>
            <source>Select a DLL in the list.</source>
            <translation>Seleziona una DLL nell’elenco.</translation>
        </message>
        <message>
            <source>Replace {0} with HelixSR.</source>
            <translation>Sostituisci {0} con HelixSR.</translation>
        </message>
        <message>
            <source>Second upscaler:</source>
            <translation>Secondo upscaler:</translation>
        </message>
        <message>
            <source>Optional: AMD&apos;s amd_fidelityfx_upscaler_dx12.dll, e.g. with FSR 4</source>
            <translation>Facoltativo: amd_fidelityfx_upscaler_dx12.dll di AMD, ad es. con FSR 4</translation>
        </message>
        <message>
            <source>Copied into the folder as {0}, with UpscalerDll in helixsr.ini pointing at it: OptiScaler&apos;s FFX Upscaler menu then lists its upscalers after HelixSR, and the one you pick runs in that DLL. Empty: HelixSR only.</source>
            <translation>Copiata nella cartella come {0}, con UpscalerDll in helixsr.ini che punta a essa: il menu «FFX Upscaler» di OptiScaler elenca allora i suoi upscaler dopo HelixSR, e quello scelto gira in quella DLL. Vuoto: solo HelixSR.</translation>
        </message>
    </context>
    <context>
        <name>HelpPage</name>
        <message>
            <source>Language:</source>
            <translation>Lingua:</translation>
        </message>
        <message>
            <source>System default</source>
            <translation>Predefinita di sistema</translation>
        </message>
        <message>
            <source>Saved for the next start; the interface is built once in the language that is active then.</source>
            <translation>Salvata per il prossimo avvio; l’interfaccia viene creata una sola volta nella lingua attiva in quel momento.</translation>
        </message>
        <message>
            <source>Takes effect after a restart.</source>
            <translation>Ha effetto dopo il riavvio.</translation>
        </message>
    </context>
    <context>
        <name>IniPage</name>
        <message>
            <source>helixsr.ini</source>
            <translation>helixsr.ini</translation>
        </message>
        <message>
            <source>HelixSR defaults</source>
            <translation>Predefiniti di HelixSR</translation>
        </message>
        <message>
            <source>Reset every field to the value HelixSR uses when the key is missing.</source>
            <translation>Ripristina ogni campo al valore usato da HelixSR quando la chiave manca.</translation>
        </message>
        <message>
            <source>Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a game that already has HelixSR.</source>
            <translation>Impostazioni opzionali che HelixSR legge da un helixsr.ini accanto alla sua DLL; ogni chiave ha un valore predefinito. Questi valori vengono scritti durante Distribuisci (se selezionato), possono essere salvati come predefiniti del payload o inviati a un gioco che ha già HelixSR.</translation>
        </message>
        <message>
            <source>off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, or Sharpness below if it sends none. override: always Sharpness below.</source>
            <translation>off: mai nitidezza (la rete DLSS non la applica). game: nitidezza FSR del gioco, o Sharpness qui sotto se non ne invia una. override: sempre Sharpness qui sotto.</translation>
        </message>
        <message>
            <source>0 = none, 1 = strongest RCAS (FidelityFX scale).</source>
            <translation>0 = nessuna, 1 = RCAS massimo (scala FidelityFX).</translation>
        </message>
        <message>
            <source>Less sharpening on fast-moving pixels</source>
            <translation>Meno nitidezza sui pixel in movimento rapido</translation>
        </message>
        <message>
            <source>Motion in output pixels per frame where the reduction starts.</source>
            <translation>Movimento in pixel di output per fotogramma da cui inizia la riduzione.</translation>
        </message>
        <message>
            <source>Motion where the reduction is complete.</source>
            <translation>Movimento a cui la riduzione è completa.</translation>
        </message>
        <message>
            <source>Fraction of sharpening removed at and above MotionLimit.</source>
            <translation>Frazione di nitidezza rimossa a MotionLimit e oltre.</translation>
        </message>
        <message>
            <source>Write helixsr.log next to the DLL</source>
            <translation>Scrivi helixsr.log accanto alla DLL</translation>
        </message>
        <message>
            <source>Run the Model E network</source>
            <translation>Esegui la rete Model E</translation>
        </message>
        <message>
            <source>Off, or while the network files are missing, a placeholder upscale is used.</source>
            <translation>Se disattivato, o se mancano i file di rete, viene usato un upscaling segnaposto.</translation>
        </message>
        <message>
            <source>auto: the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one.</source>
            <translation>auto: la rete principale a ogni rapporto di scala (più veloce della rete Ultra Performance sulle GPU senza matrix core). nvidia: come selezionata da DLSS. Oppure forzane una.</translation>
        </message>
        <message>
            <source>Jitter comes out mirrored</source>
            <translation>Il jitter esce specchiato</translation>
        </message>
        <message>
            <source>Motion vectors come out mirrored</source>
            <translation>I vettori di movimento escono specchiati</translation>
        </message>
        <message>
            <source>Convert render-resolution motion vectors first</source>
            <translation>Converti prima i vettori di movimento a risoluzione di rendering</translation>
        </message>
        <message>
            <source>Used anyway when the game's vectors include the jitter; otherwise NVIDIA's render-resolution path is faster.</source>
            <translation>Usato comunque quando i vettori del gioco includono il jitter; altrimenti il percorso a risoluzione di rendering di NVIDIA è più veloce.</translation>
        </message>
        <message>
            <source>auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll</source>
            <translation>auto: amd_fidelityfx_dx12.original.dll, altrimenti …framegeneration_dx12.dll</translation>
        </message>
        <message>
            <source>DLL that serves FidelityFX effects other than upscaling (frame generation).</source>
            <translation>DLL che fornisce effetti FidelityFX diversi dall’upscaling (frame generation).</translation>
        </message>
        <message>
            <source>empty: HelixSR only</source>
            <translation>vuoto: solo HelixSR</translation>
        </message>
        <message>
            <source>A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu. A bare name is looked up next to HelixSR.</source>
            <translation>Una seconda DLL upscaler FidelityFX (ad es. quella AMD con FSR 4) elencata dopo HelixSR nel menu di OptiScaler. Un nome semplice viene cercato accanto a HelixSR.</translation>
        </message>
        <message>
            <source>Resulting file</source>
            <translation>File risultante</translation>
        </message>
        <message>
            <source>Save as payload default</source>
            <translation>Salva come predefinito del payload</translation>
        </message>
        <message>
            <source>Write this file into the payload folder: it is what Deploy copies when the helixsr.ini tick box there is off, and what this page starts from.</source>
            <translation>Scrive questo file nella cartella del payload: è ciò che Distribuisci copia quando la casella helixsr.ini è disattivata, ed è il punto di partenza di questa pagina.</translation>
        </message>
        <message>
            <source>Push to:</source>
            <translation>Invia a:</translation>
        </message>
        <message>
            <source>Write to game</source>
            <translation>Scrivi nel gioco</translation>
        </message>
        <message>
            <source>Overwrite the helixsr.ini of that deployment with this file.</source>
            <translation>Sovrascrivi l’helixsr.ini di quella distribuzione con questo file.</translation>
        </message>
    </context>
    <context>
        <name>MainWindow</name>
        <message>
            <source>HelixSR payload</source>
            <translation>Payload HelixSR</translation>
        </message>
        <message>
            <source>Network files</source>
            <translation>File di rete</translation>
        </message>
        <message>
            <source>Deployments</source>
            <translation>Distribuzioni</translation>
        </message>
        <message>
            <source>Steam games</source>
            <translation>Giochi Steam</translation>
        </message>
        <message>
            <source>Overview</source>
            <translation>Panoramica</translation>
        </message>
        <message>
            <source>Setup</source>
            <translation>Configurazione</translation>
        </message>
        <message>
            <source>Deploy</source>
            <translation>Distribuisci</translation>
        </message>
        <message>
            <source>helixsr.ini</source>
            <translation>helixsr.ini</translation>
        </message>
        <message>
            <source>Help</source>
            <translation>Aiuto</translation>
        </message>
        <message>
            <source>Ready</source>
            <translation>Pronto</translation>
        </message>
        <message>
            <source>Setup running</source>
            <translation>Configurazione in esecuzione</translation>
        </message>
        <message>
            <source>The HelixSR setup is still running. Cancel it and quit?</source>
            <translation>La configurazione di HelixSR è ancora in esecuzione. Annullarla e uscire?</translation>
        </message>
        <message>
            <source>Imported</source>
            <translation>Importato</translation>
        </message>
        <message>
            <source>Missing</source>
            <translation>Mancante</translation>
        </message>
        <message>
            <source>helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh</source>
            <translation>helixsr_weights.bin e helixsr_kernels.pak da helixsr-setup.sh</translation>
        </message>
        <message>
            <source>HelixSR in place / known deployments</source>
            <translation>HelixSR presente / distribuzioni note</translation>
        </message>
        <message>
            <source>No Steam library found</source>
            <translation>Nessuna libreria Steam trovata</translation>
        </message>
        <message>
            <source>Extracted HelixSR release folder</source>
            <translation>Cartella della release HelixSR estratta</translation>
        </message>
        <message>
            <source>HelixSR release zip</source>
            <translation>Zip della release HelixSR</translation>
        </message>
        <message>
            <source>Zip archives (*.zip)</source>
            <translation>Archivi zip (*.zip)</translation>
        </message>
        <message>
            <source>Import failed</source>
            <translation>Importazione non riuscita</translation>
        </message>
        <message>
            <source>Imported {0} file(s): {1}.</source>
            <translation>File importati: {0}: {1}.</translation>
        </message>
        <message>
            <source>

Still missing: {0}. Run helixsr-setup.sh in the extracted release folder, then import that folder.</source>
            <translation>

Ancora mancanti: {0}. Esegui helixsr-setup.sh nella cartella della release estratta, poi importa quella cartella.</translation>
        </message>
        <message>
            <source>Payload incomplete</source>
            <translation>Payload incompleto</translation>
        </message>
        <message>
            <source>Could not write</source>
            <translation>Impossibile scrivere</translation>
        </message>
        <message>
            <source>Saved {0}</source>
            <translation>Salvato {0}</translation>
        </message>
        <message>
            <source>Game folder</source>
            <translation>Cartella del gioco</translation>
        </message>
        <message>
            <source>Folder for HelixSR (OptiScaler)</source>
            <translation>Cartella per HelixSR (OptiScaler)</translation>
        </message>
        <message>
            <source>{0} is not a folder.</source>
            <translation>{0} non è una cartella.</translation>
        </message>
        <message>
            <source>Could not scan {0}: {1}</source>
            <translation>Impossibile scansionare {0}: {1}</translation>
        </message>
        <message>
            <source>The helixsr.ini page has invalid values; fix them or untick writing the ini.</source>
            <translation>La pagina helixsr.ini contiene valori non validi; correggili o deseleziona la scrittura dell’ini.</translation>
        </message>
        <message>
            <source>Deploy HelixSR</source>
            <translation>Distribuisci HelixSR</translation>
        </message>
        <message>
            <source>Rename
{path}
to {original} and put HelixSR in its place?</source>
            <translation>Rinominare
{path}
in {original} e mettere HelixSR al suo posto?</translation>
        </message>
        <message>
            <source>Deploy failed</source>
            <translation>Distribuzione non riuscita</translation>
        </message>
        <message>
            <source>HelixSR deployed: {0} file(s) written to {1}</source>
            <translation>HelixSR distribuito: {0} file scritti in {1}</translation>
        </message>
        <message>
            <source>HelixSR folder ready</source>
            <translation>Cartella HelixSR pronta</translation>
        </message>
        <message>
            <source>HelixSR is in
{folder}

Now point OptiScaler at it: the OptiScaler.ini lines on the Deploy page (Copy button) go into the game's OptiScaler.ini.</source>
            <translation>HelixSR si trova in
{folder}

Ora punta OptiScaler a questa cartella: le righe OptiScaler.ini nella pagina Distribuisci (pulsante Copia) vanno nell’OptiScaler.ini del gioco.</translation>
        </message>
        <message>
            <source>Delete HelixSR's files next to
{0}
and rename the game's .original.dll back?</source>
            <translation>Eliminare i file di HelixSR accanto a
{0}
e ripristinare il nome della .original.dll del gioco?</translation>
        </message>
        <message>
            <source>Delete HelixSR's files in
{0}?</source>
            <translation>Eliminare i file di HelixSR in
{0}?</translation>
        </message>
        <message>
            <source>Remove HelixSR</source>
            <translation>Rimuovi HelixSR</translation>
        </message>
        <message>
            <source>Remove failed</source>
            <translation>Rimozione non riuscita</translation>
        </message>
        <message>
            <source>Removed {0} file(s); HelixSR is gone from {1}</source>
            <translation>Rimossi {0} file; HelixSR non è più in {1}</translation>
        </message>
        <message>
            <source>Folder gone</source>
            <translation>Cartella assente</translation>
        </message>
        <message>
            <source>{0} does not exist any more.</source>
            <translation>{0} non esiste più.</translation>
        </message>
        <message>
            <source>Wrote {0}</source>
            <translation>Scritto {0}</translation>
        </message>
        <message>
            <source>Update check: {0}</source>
            <translation>Controllo aggiornamenti: {0}</translation>
        </message>
        <message>
            <source>HelixSR {version} is out ({published}); the payload has {installed}. Get HelixSR… updates it.</source>
            <translation>HelixSR {version} è disponibile ({published}); il payload ha {installed}. Scarica HelixSR… lo aggiorna.</translation>
        </message>
        <message>
            <source>Latest HelixSR release: {version} ({published}).</source>
            <translation>Ultima release HelixSR: {version} ({published}).</translation>
        </message>
        <message>
            <source>{app} {version} is available: {url}</source>
            <translation>{app} {version} è disponibile: {url}</translation>
        </message>
        <message>
            <source>{0} does not exist.</source>
            <translation>{0} non esiste.</translation>
        </message>
        <message>
            <source>Payload is current</source>
            <translation>Payload aggiornato</translation>
        </message>
        <message>
            <source>The payload already has HelixSR {version} with its network files. Download and build again anyway?</source>
            <translation>Il payload contiene già HelixSR {version} con i relativi file di rete. Scaricare e compilare di nuovo comunque?</translation>
        </message>
        <message>
            <source>(unknown version)</source>
            <translation>(versione sconosciuta)</translation>
        </message>
        <message>
            <source>Nothing to do: the payload already has HelixSR {version} with its network files. Use Deploy to install it into a game.</source>
            <translation>Nulla da fare: il payload contiene già HelixSR {version} con i relativi file di rete. Usa Distribuisci per installarlo in un gioco.</translation>
        </message>
        <message>
            <source>Payload is already current.</source>
            <translation>Il payload è già aggiornato.</translation>
        </message>
        <message>
            <source>HelixSR setup running…</source>
            <translation>Configurazione di HelixSR in esecuzione…</translation>
        </message>
        <message>
            <source>Cancelling…</source>
            <translation>Annullamento…</translation>
        </message>
        <message>
            <source>HelixSR setup failed: {0}</source>
            <translation>Configurazione di HelixSR non riuscita: {0}</translation>
        </message>
        <message>
            <source>HelixSR setup failed</source>
            <translation>Configurazione di HelixSR non riuscita</translation>
        </message>
        <message>
            <source>{message} ({seconds:.0f} s)</source>
            <translation>{message} ({seconds:.0f} s)</translation>
        </message>
        <message>
            <source>NVIDIA {0} (310.7.0)</source>
            <translation>NVIDIA {0} (310.7.0)</translation>
        </message>
        <message>
            <source>No Steam library found on this PC.</source>
            <translation>Nessuna libreria Steam trovata su questo PC.</translation>
        </message>
        <message>
            <source>Looking for {dll} in {libraries} …</source>
            <translation>Ricerca di {dll} in {libraries} …</translation>
        </message>
        <message>
            <source>Copied to the clipboard</source>
            <translation>Copiato negli appunti</translation>
        </message>
        <message>
            <source>Could not open</source>
            <translation>Impossibile aprire</translation>
        </message>
        <message>
            <source>Second FidelityFX upscaler DLL (e.g. AMD&apos;s with FSR 4)</source>
            <translation>Seconda DLL upscaler FidelityFX (ad es. quella di AMD con FSR 4)</translation>
        </message>
        <message>
            <source>DLL files (*.dll)</source>
            <translation>File DLL (*.dll)</translation>
        </message>
        <message>
            <source>The second upscaler is in the folder as {0}; OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR.</source>
            <translation>Il secondo upscaler è nella cartella come {0}; il menu «FFX Upscaler» di OptiScaler elenca i suoi upscaler dopo HelixSR.</translation>
        </message>
    </context>
    <context>
        <name>OverviewPage</name>
        <message>
            <source>Overview</source>
            <translation>Panoramica</translation>
        </message>
        <message>
            <source>Refresh</source>
            <translation>Aggiorna</translation>
        </message>
        <message>
            <source>HelixSR payload</source>
            <translation>Payload HelixSR</translation>
        </message>
        <message>
            <source>Upscaler DLL</source>
            <translation>DLL upscaler</translation>
        </message>
        <message>
            <source>Weights</source>
            <translation>Weights</translation>
        </message>
        <message>
            <source>Kernels</source>
            <translation>Kernels</translation>
        </message>
        <message>
            <source>helixsr.ini</source>
            <translation>helixsr.ini</translation>
        </message>
        <message>
            <source>The Setup page downloads a HelixSR release and builds its network files (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) from NVIDIA's DLSS DLL for you. Or do it by hand: extract the release, run its &lt;code&gt;helixsr-setup.sh&lt;/code&gt; there once and import that folder here. The network files are NVIDIA's property: they stay on this PC and are never part of this app.</source>
            <translation>La pagina Configurazione scarica una release HelixSR e crea per te i suoi file di rete (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) dalla DLL DLSS di NVIDIA. Oppure fallo a mano: estrai la release, esegui lì una volta &lt;code&gt;helixsr-setup.sh&lt;/code&gt; e importa qui quella cartella. I file di rete sono proprietà di NVIDIA: restano su questo PC e non fanno mai parte di questa app.</translation>
        </message>
        <message>
            <source>Get HelixSR…</source>
            <translation>Scarica HelixSR…</translation>
        </message>
        <message>
            <source>Open the Setup page: download the latest release and build the network files in one go.</source>
            <translation>Apri la pagina Configurazione: scarica l’ultima release e crea i file di rete in un solo passaggio.</translation>
        </message>
        <message>
            <source>Import release folder…</source>
            <translation>Importa cartella release…</translation>
        </message>
        <message>
            <source>The folder the HelixSR zip was extracted to, after running helixsr-setup.sh there.</source>
            <translation>La cartella in cui è stato estratto lo zip HelixSR, dopo avervi eseguito helixsr-setup.sh.</translation>
        </message>
        <message>
            <source>Import release zip…</source>
            <translation>Importa zip release…</translation>
        </message>
        <message>
            <source>The release zip as downloaded; the network files still have to be built and imported from the extracted folder afterwards.</source>
            <translation>Lo zip della release così come scaricato; i file di rete devono comunque essere creati e poi importati dalla cartella estratta.</translation>
        </message>
        <message>
            <source>Open payload folder</source>
            <translation>Apri cartella payload</translation>
        </message>
        <message>
            <source>Deployments</source>
            <translation>Distribuzioni</translation>
        </message>
        <message>
            <source>Game</source>
            <translation>Gioco</translation>
        </message>
        <message>
            <source>Mode</source>
            <translation>Modalità</translation>
        </message>
        <message>
            <source>State</source>
            <translation>Stato</translation>
        </message>
        <message>
            <source>HelixSR</source>
            <translation>HelixSR</translation>
        </message>
        <message>
            <source>Deployed</source>
            <translation>Distribuito</translation>
        </message>
        <message>
            <source>Location</source>
            <translation>Percorso</translation>
        </message>
        <message>
            <source>Nothing deployed yet. Use the Deploy page.</source>
            <translation>Nessuna distribuzione ancora. Usa la pagina Distribuisci.</translation>
        </message>
        <message>
            <source>Open folder</source>
            <translation>Apri cartella</translation>
        </message>
        <message>
            <source>Forget entry</source>
            <translation>Dimentica voce</translation>
        </message>
        <message>
            <source>Drop the entry from this list without touching the game. For deployments whose files are already gone.</source>
            <translation>Rimuove la voce da questo elenco senza toccare il gioco. Per distribuzioni i cui file sono già spariti.</translation>
        </message>
        <message>
            <source>Remove HelixSR from game</source>
            <translation>Rimuovi HelixSR dal gioco</translation>
        </message>
        <message>
            <source>Delete HelixSR's files there and put the game's original DLL back.</source>
            <translation>Elimina lì i file di HelixSR e ripristina la DLL originale del gioco.</translation>
        </message>
        <message>
            <source>Present</source>
            <translation>Presente</translation>
        </message>
        <message>
            <source>Missing</source>
            <translation>Mancante</translation>
        </message>
        <message>
            <source>Default</source>
            <translation>Predefinito</translation>
        </message>
        <message>
            <source>No helixsr.ini in the payload: HelixSR's defaults are used as the template.</source>
            <translation>Nessun helixsr.ini nel payload: i predefiniti di HelixSR vengono usati come modello.</translation>
        </message>
        <message>
            <source>HelixSR (version unknown)</source>
            <translation>HelixSR (versione sconosciuta)</translation>
        </message>
        <message>
            <source>{version} ready to deploy.</source>
            <translation>{version} pronto per la distribuzione.</translation>
        </message>
        <message>
            <source>{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted release and import the folder again.</source>
            <translation>{version} importato, ma mancano i file di rete: esegui helixsr-setup.sh nella release estratta e importa di nuovo la cartella.</translation>
        </message>
        <message>
            <source>No payload yet: import an extracted HelixSR release.</source>
            <translation>Nessun payload: importa una release HelixSR estratta.</translation>
        </message>
        <message>
            <source>Folder: {0}</source>
            <translation>Cartella: {0}</translation>
        </message>
        <message>
            <source>Replaced DLL</source>
            <translation>DLL sostituita</translation>
        </message>
        <message>
            <source>OptiScaler folder</source>
            <translation>Cartella OptiScaler</translation>
        </message>
    </context>
    <context>
        <name>SetupPage</name>
        <message>
            <source>Unknown</source>
            <translation>Sconosciuto</translation>
        </message>
        <message>
            <source>Update</source>
            <translation>Aggiornamento</translation>
        </message>
        <message>
            <source>Up to date</source>
            <translation>Aggiornato</translation>
        </message>
        <message>
            <source>Setup</source>
            <translation>Configurazione</translation>
        </message>
        <message>
            <source>One click does what the HelixSR README asks you to do by hand: download the release, fetch NVIDIA's DLSS DLL, Microsoft's shader compiler and (on Bazzite) a portable Python in parallel, run &lt;code&gt;helixsr-setup.sh&lt;/code&gt; and import the result as the payload. The DLSS DLL is used once and deleted; the network files it produces are NVIDIA's property and stay on this PC.</source>
            <translation>Un clic esegue ciò che il README di HelixSR chiede di fare a mano: scarica la release, recupera in parallelo la DLL DLSS di NVIDIA, il compilatore shader di Microsoft e (su Bazzite) un Python portatile, esegue &lt;code&gt;helixsr-setup.sh&lt;/code&gt; e importa il risultato come payload. La DLL DLSS viene usata una volta ed eliminata; i file di rete prodotti sono proprietà di NVIDIA e restano su questo PC.</translation>
        </message>
        <message>
            <source>Releases</source>
            <translation>Release</translation>
        </message>
        <message>
            <source>Not checked</source>
            <translation>Non controllato</translation>
        </message>
        <message>
            <source>HelixSR</source>
            <translation>HelixSR</translation>
        </message>
        <message>
            <source>This app</source>
            <translation>Questa app</translation>
        </message>
        <message>
            <source>Check now</source>
            <translation>Controlla ora</translation>
        </message>
        <message>
            <source>Ask GitHub for the latest HelixSR release and the latest release of this app</source>
            <translation>Chiedi a GitHub l’ultima release HelixSR e l’ultima release di questa app</translation>
        </message>
        <message>
            <source>Check at start</source>
            <translation>Controlla all’avvio</translation>
        </message>
        <message>
            <source>Look up both releases every time the app starts (one small request each)</source>
            <translation>Cerca entrambe le release a ogni avvio dell’app (una piccola richiesta ciascuna)</translation>
        </message>
        <message>
            <source>Get HelixSR and build the network files</source>
            <translation>Scarica HelixSR e crea i file di rete</translation>
        </message>
        <message>
            <source>Use a {0} already on this PC:</source>
            <translation>Usa un {0} già su questo PC:</translation>
        </message>
        <message>
            <source>Skips the 59 MB download from NVIDIA's GitHub. Only DLSS 310.7.0 (the exact build HelixSR pins) is accepted; Find looks through the Steam libraries for one.</source>
            <translation>Salta il download da 59 MB dal GitHub di NVIDIA. È accettato solo DLSS 310.7.0 (la build esatta fissata da HelixSR); Trova la cerca nelle librerie Steam.</translation>
        </message>
        <message>
            <source>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</source>
            <translation>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</translation>
        </message>
        <message>
            <source>Browse…</source>
            <translation>Sfoglia…</translation>
        </message>
        <message>
            <source>Find in Steam</source>
            <translation>Trova in Steam</translation>
        </message>
        <message>
            <source>Scan the Steam libraries for a DLSS 310.7.0 DLL (checks each file's checksum)</source>
            <translation>Scansiona le librerie Steam alla ricerca di una DLL DLSS 310.7.0 (controlla il checksum di ogni file)</translation>
        </message>
        <message>
            <source>Download and build</source>
            <translation>Scarica e compila</translation>
        </message>
        <message>
            <source>Download the latest release and everything the setup needs, run helixsr-setup.sh and import the result</source>
            <translation>Scarica l’ultima release e tutto ciò che serve alla configurazione, esegui helixsr-setup.sh e importa il risultato</translation>
        </message>
        <message>
            <source>Cancel</source>
            <translation>Annulla</translation>
        </message>
        <message>
            <source>Import built release</source>
            <translation>Importa release compilata</translation>
        </message>
        <message>
            <source>Import the network files built in the work folder into the payload</source>
            <translation>Importa nel payload i file di rete creati nella cartella di lavoro</translation>
        </message>
        <message>
            <source>Open work folder</source>
            <translation>Apri cartella di lavoro</translation>
        </message>
        <message>
            <source>Idle</source>
            <translation>Inattivo</translation>
        </message>
        <message>
            <source>Output of the downloads and of helixsr-setup.sh</source>
            <translation>Output dei download e di helixsr-setup.sh</translation>
        </message>
        <message>
            <source> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</source>
            <translation> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</translation>
        </message>
        <message>
            <source> — &lt;a href="{url}"&gt;release page&lt;/a&gt;</source>
            <translation> — &lt;a href="{url}"&gt;pagina della release&lt;/a&gt;</translation>
        </message>
        <message>
            <source>Checking…</source>
            <translation>Controllo…</translation>
        </message>
        <message>
            <source>Found {0} matching {1}: {2}</source>
            <translation>Trovato {0} corrispondente a {1}: {2}</translation>
        </message>
        <message>
            <source>No DLSS 310.7.0 {0} found in the Steam libraries; it will be downloaded.</source>
            <translation>Nessun {0} DLSS 310.7.0 trovato nelle librerie Steam; verrà scaricato.</translation>
        </message>
        <message>
            <source>{done} / {total}  (%p%)</source>
            <translation>{done} / {total}  (%p%)</translation>
        </message>
        <message>
            <source>Downloading: {0}</source>
            <translation>Download: {0}</translation>
        </message>
        <message>
            <source>{0} — {1}:{2:02d} elapsed</source>
            <translation>{0} — {1}:{2:02d} trascorsi</translation>
        </message>
        <message>
            <source>{0} — took {1}:{2:02d}</source>
            <translation>{0} — durata {1}:{2:02d}</translation>
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
        <name>acquire</name>
        <message>
            <source>GitHub answered {0}</source>
            <translation>GitHub ha risposto {0}</translation>
        </message>
        <message>
            <source>no connection ({0})</source>
            <translation>nessuna connessione ({0})</translation>
        </message>
        <message>
            <source>unexpected tag {0}</source>
            <translation>tag inatteso {0}</translation>
        </message>
        <message>
            <source>not installed</source>
            <translation>non installato</translation>
        </message>
        <message>
            <source>{0} (latest: unknown, {1})</source>
            <translation>{0} (ultima: sconosciuta, {1})</translation>
        </message>
        <message>
            <source>{0} (latest: unknown)</source>
            <translation>{0} (ultima: sconosciuta)</translation>
        </message>
        <message>
            <source>{0} → {1} available ({2})</source>
            <translation>{0} → {1} disponibile ({2})</translation>
        </message>
        <message>
            <source>{0} (up to date, released {1})</source>
            <translation>{0} (aggiornato, rilasciato {1})</translation>
        </message>
        <message>
            <source>{0}; latest release {1} ({2})</source>
            <translation>{0}; ultima release {1} ({2})</translation>
        </message>
        <message>
            <source>{0}: server answered {1} for {2}</source>
            <translation>{0}: il server ha risposto {1} per {2}</translation>
        </message>
        <message>
            <source>{0}: download failed ({1})</source>
            <translation>{0}: download non riuscito ({1})</translation>
        </message>
        <message>
            <source>{0}: checksum mismatch, the download is not the file HelixSR expects. Nothing was kept.</source>
            <translation>{0}: checksum non corrispondente, il download non è il file atteso da HelixSR. Non è stato conservato nulla.</translation>
        </message>
        <message>
            <source>No {0} in {1}: not a HelixSR release.</source>
            <translation>Nessun {0} in {1}: non è una release HelixSR.</translation>
        </message>
        <message>
            <source>{0} contains an unsafe path: {1}</source>
            <translation>{0} contiene un percorso non sicuro: {1}</translation>
        </message>
        <message>
            <source>the shader compiler archive has no bin/x64 folder</source>
            <translation>l’archivio del compilatore shader non contiene la cartella bin/x64</translation>
        </message>
        <message>
            <source>unsafe path in {0}: {1}</source>
            <translation>percorso non sicuro in {0}: {1}</translation>
        </message>
        <message>
            <source>the portable Python archive did not produce python/bin/python3</source>
            <translation>l’archivio Python portatile non ha prodotto python/bin/python3</translation>
        </message>
        <message>
            <source>Cancelled.</source>
            <translation>Annullato.</translation>
        </message>
        <message>
            <source>HelixSR {0} is built in {1}</source>
            <translation>HelixSR {0} è compilato in {1}</translation>
        </message>
        <message>
            <source>Could not look up the latest HelixSR release: {0}</source>
            <translation>Impossibile cercare l’ultima release HelixSR: {0}</translation>
        </message>
        <message>
            <source>HelixSR {0} has no zip to download; see {1}</source>
            <translation>HelixSR {0} non ha uno zip da scaricare; vedi {1}</translation>
        </message>
        <message>
            <source>Downloading HelixSR {0}</source>
            <translation>Download di HelixSR {0}</translation>
        </message>
        <message>
            <source>Using the already downloaded {0}</source>
            <translation>Uso di {0} già scaricato</translation>
        </message>
        <message>
            <source>Downloading {0}</source>
            <translation>Download di {0}</translation>
        </message>
        <message>
            <source>Extracted to {0}</source>
            <translation>Estratto in {0}</translation>
        </message>
        <message>
            <source>The release has no {0}.</source>
            <translation>La release non contiene {0}.</translation>
        </message>
        <message>
            <source>Could not read the pinned source(s) for {0} from the setup scripts; the script will download them itself.</source>
            <translation>Impossibile leggere dagli script di configurazione le sorgenti fissate per {0}; lo script le scaricherà da sé.</translation>
        </message>
        <message>
            <source>Downloading {0} in parallel</source>
            <translation>Download di {0} in parallelo</translation>
        </message>
        <message>
            <source>Shader compiler unpacked to {0}</source>
            <translation>Compilatore shader estratto in {0}</translation>
        </message>
        <message>
            <source>Portable Python unpacked to {0}</source>
            <translation>Python portatile estratto in {0}</translation>
        </message>
        <message>
            <source>Building the network files (about 5-6 minutes on a BC-250)</source>
            <translation>Creazione dei file di rete (circa 5-6 minuti su una BC-250)</translation>
        </message>
        <message>
            <source>Could not start {0}: {1}</source>
            <translation>Impossibile avviare {0}: {1}</translation>
        </message>
        <message>
            <source>Deleted the downloaded {0}</source>
            <translation>Eliminato {0} scaricato</translation>
        </message>
        <message>
            <source>{0} exited with code {1}; see the output above.</source>
            <translation>{0} è terminato con codice {1}; vedi l’output sopra.</translation>
        </message>
        <message>
            <source>The setup finished but did not produce {0}</source>
            <translation>La configurazione è terminata ma non ha prodotto {0}</translation>
        </message>
        <message>
            <source>no release tagged {0} yet</source>
            <translation>ancora nessuna release con il tag {0}</translation>
        </message>
    </context>
    <context>
        <name>backend</name>
        <message>
            <source>{0} does not exist.</source>
            <translation>{0} non esiste.</translation>
        </message>
        <message>
            <source>{0} is not a zip archive or a folder.</source>
            <translation>{0} non è un archivio zip né una cartella.</translation>
        </message>
        <message>
            <source>No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release zip itself).</source>
            <translation>Nessun {0} trovato in {1}. Scegli la cartella in cui è stata estratta la release HelixSR (o lo zip della release stessa).</translation>
        </message>
        <message>
            <source>HelixSR deployed</source>
            <translation>HelixSR distribuito</translation>
        </message>
        <message>
            <source>HelixSR deployed (other build)</source>
            <translation>HelixSR distribuito (altra build)</translation>
        </message>
        <message>
            <source>HelixSR (no original kept)</source>
            <translation>HelixSR (originale non conservato)</translation>
        </message>
        <message>
            <source>Game's own DLL</source>
            <translation>DLL del gioco</translation>
        </message>
        <message>
            <source>The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running its helixsr-setup.sh.</source>
            <translation>Il payload è incompleto, mancano: {0}. Importa la release HelixSR estratta dopo aver eseguito il suo helixsr-setup.sh.</translation>
        </message>
        <message>
            <source>{0} is not an FSR 3.1 upscaler DLL ({1}).</source>
            <translation>{0} non è una DLL upscaler FSR 3.1 ({1}).</translation>
        </message>
        <message>
            <source>{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.</source>
            <translation>{0} non è HelixSR (nessun {1} accanto e differisce dal payload). Non è stato modificato nulla.</translation>
        </message>
        <message>
            <source>{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone folder. Use Remove on the DLL instead.</source>
            <translation>{0} contiene un {1} del gioco (c’è un {2}): questa è una DLL sostituita, non una cartella autonoma. Usa invece Rimuovi sulla DLL.</translation>
        </message>
        <message>
            <source>{0} is not HelixSR; nothing was changed.</source>
            <translation>{0} non è HelixSR; non è stato modificato nulla.</translation>
        </message>
        <message>
            <source>Folder gone</source>
            <translation>Cartella assente</translation>
        </message>
        <message>
            <source>Removed</source>
            <translation>Rimosso</translation>
        </message>
        <message>
            <source>In place</source>
            <translation>Presente</translation>
        </message>
        <message>
            <source>Network files missing</source>
            <translation>File di rete mancanti</translation>
        </message>
        <message>
            <source>DLL missing</source>
            <translation>DLL mancante</translation>
        </message>
        <message>
            <source>Only the backup is left</source>
            <translation>Resta solo il backup</translation>
        </message>
        <message>
            <source>Original restored</source>
            <translation>Originale ripristinato</translation>
        </message>
        <message>
            <source>Older build</source>
            <translation>Build vecchia</translation>
        </message>
        <message>
            <source>{0} is HelixSR itself; pick another FidelityFX upscaler DLL, e.g. AMD&apos;s with FSR 4.</source>
            <translation>{0} è HelixSR stesso; scegli un&apos;altra DLL upscaler FidelityFX, ad es. quella di AMD con FSR 4.</translation>
        </message>
    </context>
    <context>
        <name>help</name>
        <message>
            <source>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</source>
            <translation>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;Installs &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, the FSR/DLSS hybrid upscaler for Direct3D 12 tuned for the &lt;b&gt;AMD BC-250&lt;/b&gt;, into games on &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR runs NVIDIA's DLSS Model E network as plain compute shaders on an AMD GPU; games talk to it as FSR 3.1. This app only copies, renames and deletes files inside the game folders you point it at and inside its own payload folder. Nothing on the system is touched, no root is needed.&lt;/p&gt;</source>
            <translation>&lt;p&gt;Installa &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, l’upscaler ibrido FSR/DLSS per Direct3D 12 ottimizzato per &lt;b&gt;AMD BC-250&lt;/b&gt;, nei giochi su &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR esegue la rete DLSS Model E di NVIDIA come semplici compute shader su una GPU AMD; i giochi lo vedono come FSR 3.1. Questa app copia, rinomina ed elimina solo file nelle cartelle di gioco indicate e nella propria cartella payload. Il sistema non viene toccato e non serve root.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;How HelixSR is installed (what the app does for you)&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;Come viene installato HelixSR (ciò che l’app fa per te)&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;The game's FSR 3.1 upscaler DLL, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (Unreal Engine games keep it under &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) or &lt;code&gt;{helixsr_dll}&lt;/code&gt;, is renamed to &lt;code&gt;*.original.dll&lt;/code&gt;. That file is the backup &lt;i&gt;and&lt;/i&gt; is still used: HelixSR forwards frame generation and other FidelityFX effects to it.&lt;/li&gt;</source>
            <translation>&lt;li&gt;La DLL upscaler FSR 3.1 del gioco, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (i giochi Unreal Engine la tengono sotto &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) o &lt;code&gt;{helixsr_dll}&lt;/code&gt;, viene rinominata in &lt;code&gt;*.original.dll&lt;/code&gt;. Quel file è il backup &lt;i&gt;e&lt;/i&gt; viene ancora usato: HelixSR gli inoltra frame generation e gli altri effetti FidelityFX.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;HelixSR's &lt;code&gt;{helixsr_dll}&lt;/code&gt; is copied in under the game's original file name, together with &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Il &lt;code&gt;{helixsr_dll}&lt;/code&gt; di HelixSR viene copiato con il nome file originale del gioco, insieme a &lt;code&gt;{weights}&lt;/code&gt; e &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;Optionally a &lt;code&gt;{ini}&lt;/code&gt; is written next to it.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Facoltativamente viene scritto un &lt;code&gt;{ini}&lt;/code&gt; accanto.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;Start the game normally and select &lt;b&gt;AMD FSR&lt;/b&gt; as the upscaler. No launch options are needed.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Avvia il gioco normalmente e seleziona &lt;b&gt;AMD FSR&lt;/b&gt; come upscaler. Non servono opzioni di avvio.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Remove&lt;/b&gt; undoes it: HelixSR's files are deleted and the &lt;code&gt;.original.dll&lt;/code&gt; gets its name back.&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Rimuovi&lt;/b&gt; annulla l’operazione: i file di HelixSR vengono eliminati e &lt;code&gt;.original.dll&lt;/code&gt; riottiene il suo nome.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;Setup&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;Configurazione&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Download and build&lt;/b&gt; does the HelixSR README's setup for you: it fetches the latest release zip from &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), reads the exact sources and SHA-256 sums the release's own setup scripts pin, downloads what this PC still needs &lt;i&gt;in parallel&lt;/i&gt; and verifies each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable Python (67 MB, numpy is added by the script). Then it runs &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; with its output on the page: the script builds &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutes, the shader compiler runs through your Proton) and the result is imported as the payload. The DLSS DLL is deleted afterwards. Everything is downloaded into &lt;code&gt;{work_dir}&lt;/code&gt; and &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (the script's own cache, reused next time).&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Scarica e compila&lt;/b&gt; esegue per te la configurazione del README di HelixSR: recupera da &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; lo zip dell’ultima release (2 MB), legge le sorgenti esatte e le somme SHA-256 fissate dagli script di configurazione della release, scarica &lt;i&gt;in parallelo&lt;/i&gt; ciò che ancora serve a questo PC e verifica ogni file: la DLL DLSS 310.7.0 di NVIDIA (59 MB, dal GitHub di NVIDIA sotto licenza NVIDIA), il DirectX Shader Compiler di Microsoft (25 MB) e, su sistemi in sola lettura come Bazzite, un Python portatile (67 MB, numpy viene aggiunto dallo script). Poi esegue &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; con il suo output nella pagina: lo script crea &lt;code&gt;{weights}&lt;/code&gt; e &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minuti, il compilatore shader passa attraverso il tuo Proton) e il risultato viene importato come payload. La DLL DLSS viene poi eliminata. Tutto viene scaricato in &lt;code&gt;{work_dir}&lt;/code&gt; e &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (la cache dello script, riutilizzata la volta successiva).&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;If a game you own already ships DLSS 310.7.0, tick &lt;b&gt;Use a nvngx_dlss.dll already on this PC&lt;/b&gt; and let &lt;b&gt;Find in Steam&lt;/b&gt; locate it (checksums are compared, only the exact build HelixSR pins is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.&lt;/p&gt;</source>
            <translation>&lt;p&gt;Se un gioco che possiedi include già DLSS 310.7.0, seleziona &lt;b&gt;Usa un nvngx_dlss.dll già su questo PC&lt;/b&gt; e lascia che &lt;b&gt;Trova in Steam&lt;/b&gt; lo individui (i checksum vengono confrontati, viene offerta solo la build esatta fissata da HelixSR): così si salta il download da NVIDIA. Non sono i download a richiedere tempo; è la compilazione.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; compares the payload with the latest HelixSR release and this app with its latest release on GitHub, at start (one small request each, can be turned off) or with &lt;b&gt;Check now&lt;/b&gt;. A newer HelixSR shows on the Overview too; &lt;b&gt;Download and build&lt;/b&gt; again updates the payload, then deploy again per game (the Overview marks them &lt;i&gt;Older build&lt;/i&gt;).&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Release&lt;/b&gt; confronta il payload con l’ultima release HelixSR e questa app con la sua ultima release su GitHub, all’avvio (una piccola richiesta ciascuna, disattivabile) o con &lt;b&gt;Controlla ora&lt;/b&gt;. Una versione più recente di HelixSR viene mostrata anche nella Panoramica; esegui di nuovo &lt;b&gt;Scarica e compila&lt;/b&gt; per aggiornare il payload, poi ridistribuisci per ogni gioco (la Panoramica li indica come &lt;i&gt;Build vecchia&lt;/i&gt;).&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;Overview&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;Panoramica&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;The &lt;b&gt;payload&lt;/b&gt; is your copy of a HelixSR release: the DLL, the two network files and the ini, kept in &lt;code&gt;{payload_dir}&lt;/code&gt;. It is filled by the Setup page, or by hand: extract a release, run &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in that folder once and &lt;b&gt;Import release folder…&lt;/b&gt;. The network files contain NVIDIA's network: they are for your own PC and are never part of this app or its releases. &lt;b&gt;Import release zip…&lt;/b&gt; takes the download as is, but the network files are still missing until the setup has run and the folder is imported.&lt;/p&gt;</source>
            <translation>&lt;p&gt;Il &lt;b&gt;payload&lt;/b&gt; è la tua copia di una release HelixSR: la DLL, i due file di rete e l’ini, conservati in &lt;code&gt;{payload_dir}&lt;/code&gt;. Viene popolato dalla pagina Configurazione, oppure a mano: estrai una release, esegui una volta &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in quella cartella e usa &lt;b&gt;Importa cartella release…&lt;/b&gt;. I file di rete contengono la rete di NVIDIA: sono per il tuo PC e non fanno mai parte di questa app o delle sue release. &lt;b&gt;Importa zip release…&lt;/b&gt; prende il download così com’è, ma i file di rete restano mancanti finché la configurazione non è stata eseguita e la cartella importata.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Deployments&lt;/b&gt; lists every place the app put HelixSR, with its live state: &lt;i&gt;In place&lt;/i&gt;, &lt;i&gt;Older build&lt;/i&gt; (the payload has been updated since; deploy again to update the game), &lt;i&gt;Network files missing&lt;/i&gt;, &lt;i&gt;Original restored&lt;/i&gt; or &lt;i&gt;Removed&lt;/i&gt;. The list is kept in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Forget entry&lt;/b&gt; drops a line without touching the game.&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Distribuzioni&lt;/b&gt; elenca ogni posizione in cui l’app ha messo HelixSR, con lo stato attuale: &lt;i&gt;Presente&lt;/i&gt;, &lt;i&gt;Build vecchia&lt;/i&gt; (il payload è stato aggiornato da allora; distribuisci di nuovo per aggiornare il gioco), &lt;i&gt;File di rete mancanti&lt;/i&gt;, &lt;i&gt;Originale ripristinato&lt;/i&gt; o &lt;i&gt;Rimosso&lt;/i&gt;. L’elenco è conservato in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Dimentica voce&lt;/b&gt; rimuove una riga senza toccare il gioco.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;Deploy&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;Distribuisci&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;Pick a game from the Steam libraries found on this PC (&lt;code&gt;steamapps/common&lt;/code&gt; of every library in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) or &lt;b&gt;Browse…&lt;/b&gt; to any folder (Heroic, Lutris, Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's own file, HelixSR, and whether the network files are next to it. Select the one the game loads (usually the only one) and &lt;b&gt;Deploy HelixSR&lt;/b&gt;.&lt;/p&gt;</source>
            <translation>&lt;p&gt;Scegli un gioco dalle librerie Steam trovate su questo PC (&lt;code&gt;steamapps/common&lt;/code&gt; di ogni libreria in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) oppure usa &lt;b&gt;Sfoglia…&lt;/b&gt; verso qualsiasi cartella (Heroic, Lutris, Bottles). La cartella viene scansionata per DLL upscaler FSR 3.1; ognuna mostra se è il file del gioco, HelixSR, e se i file di rete sono accanto. Seleziona quella caricata dal gioco (di solito l’unica) e premi &lt;b&gt;Distribuisci HelixSR&lt;/b&gt;.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Stand-alone folder for OptiScaler&lt;/b&gt; is for games that do not ship FSR 3.1 as a separate DLL (DLSS, XeSS, FSR 2 / 3.0 games). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; routes their upscaler calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own (default &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) and shows the &lt;code&gt;OptiScaler.ini&lt;/code&gt; lines that point OptiScaler there (Windows paths; &lt;code&gt;Z:&lt;/code&gt; is the Linux root under Proton). Install OptiScaler for the game as its documentation describes, paste the lines, and pick &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; in OptiScaler's FFX Upscaler menu.&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Cartella autonoma per OptiScaler&lt;/b&gt; serve per i giochi che non includono FSR 3.1 come DLL separata (giochi DLSS, XeSS, FSR 2 / 3.0). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; instrada le loro chiamate upscaler a una DLL FSR 3.1. L’app scrive HelixSR con entrambi i nomi FidelityFX in una cartella propria (predefinita &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) e mostra le righe di &lt;code&gt;OptiScaler.ini&lt;/code&gt; che puntano lì OptiScaler (percorsi Windows; &lt;code&gt;Z:&lt;/code&gt; è la radice Linux sotto Proton). Installa OptiScaler per il gioco come descritto nella sua documentazione, incolla le righe e scegli &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; nel menu FFX Upscaler di OptiScaler.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;Deploying again over an existing deployment updates HelixSR's files and keeps the game's original.&lt;/p&gt;</source>
            <translation>&lt;p&gt;Distribuire di nuovo sopra una distribuzione esistente aggiorna i file di HelixSR e conserva l’originale del gioco.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;th&gt;Sezione&lt;/th&gt;&lt;th&gt;Chiave&lt;/th&gt;&lt;th&gt;Predefinito&lt;/th&gt;&lt;th&gt;Significato&lt;/th&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (as DLSS), &lt;i&gt;game&lt;/i&gt; = the game's FSR sharpness (or Sharpness if it sends none), &lt;i&gt;override&lt;/i&gt; = always Sharpness&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (come DLSS), &lt;i&gt;game&lt;/i&gt; = nitidezza FSR del gioco (o Sharpness se non ne invia una), &lt;i&gt;override&lt;/i&gt; = sempre Sharpness&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, FidelityFX RCAS scale&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, scala FidelityFX RCAS&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Less sharpening on fast-moving pixels: where the reduction starts and is complete (output pixels per frame), and how much is removed&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Meno nitidezza sui pixel in movimento rapido: dove la riduzione inizia ed è completa (pixel di output per fotogramma) e quanta ne viene rimossa&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Run the Model E network; otherwise a placeholder upscale&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Esegue la rete Model E; altrimenti un upscaling segnaposto&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: the main network at every ratio (about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); &lt;i&gt;nvidia&lt;/i&gt;: as DLSS selects; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: la rete principale a ogni rapporto (circa il 30 % più veloce della rete Ultra Performance di NVIDIA sulle GPU senza matrix core); &lt;i&gt;nvidia&lt;/i&gt;: come seleziona DLSS; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;For games whose jitter or motion vectors come out mirrored&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Per i giochi in cui jitter o vettori di movimento escono specchiati&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convert render-resolution motion vectors to display resolution first (used anyway when the game's vectors include the jitter)&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Converte prima i vettori di movimento a risoluzione di rendering in risoluzione di visualizzazione (usato comunque quando i vettori del gioco includono il jitter)&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Writes &lt;code&gt;helixsr.log&lt;/code&gt; next to the DLL; it names the network that runs and reports missing network files&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Scrive &lt;code&gt;helixsr.log&lt;/code&gt; accanto alla DLL; indica la rete in esecuzione e segnala i file di rete mancanti&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL for the other FidelityFX effects (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; if present, else &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL per gli altri effetti FidelityFX (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; se presente, altrimenti &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu&lt;/td&gt;&lt;/tr&gt;</source>
            <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;Una seconda DLL upscaler FidelityFX (ad es. quella AMD con FSR 4) elencata dopo HelixSR nel menu di OptiScaler&lt;/td&gt;&lt;/tr&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;The page edits these values and shows the resulting file; the comments of the payload's own &lt;code&gt;{ini}&lt;/code&gt; are kept, only values change. &lt;b&gt;Save as payload default&lt;/b&gt; makes it the file Deploy starts from; &lt;b&gt;Write to game&lt;/b&gt; replaces the ini of a chosen deployment. Sharpening off costs nothing; on, about 0.4 ms at 4K on the BC-250.&lt;/p&gt;</source>
            <translation>&lt;p&gt;La pagina modifica questi valori e mostra il file risultante; i commenti del &lt;code&gt;{ini}&lt;/code&gt; del payload vengono mantenuti, cambiano solo i valori. &lt;b&gt;Salva come predefinito del payload&lt;/b&gt; lo rende il file da cui parte Distribuisci; &lt;b&gt;Scrivi nel gioco&lt;/b&gt; sostituisce l’ini di una distribuzione scelta. La nitidezza disattivata non costa nulla; attiva, circa 0.4 ms a 4K su BC-250.&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;h2&gt;Good to know&lt;/h2&gt;</source>
            <translation>&lt;h2&gt;Utile da sapere&lt;/h2&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 (gfx1013, Mesa RADV, Proton). Vulkan games are not supported.&lt;/li&gt;</source>
            <translation>&lt;li&gt;HelixSR è solo per Direct3D 12 e per RDNA 1 e successive; è sviluppato e testato su BC-250 (gfx1013, Mesa RADV, Proton). I giochi Vulkan non sono supportati.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;Steam verifies game files on updates and may put the game's own DLL back. The Overview then shows &lt;i&gt;Original restored&lt;/i&gt; and the backup stays; deploy again.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Steam verifica i file dei giochi durante gli aggiornamenti e può ripristinare la DLL del gioco. La Panoramica mostra allora &lt;i&gt;Originale ripristinato&lt;/i&gt; e il backup resta; distribuisci di nuovo.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;Per-stage GPU timings: launch option &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; writes them to &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Tempi GPU per fase: l’opzione di avvio &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; li scrive in &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Deployments: &lt;code&gt;{deployments_file}&lt;/code&gt;. Window size and page are kept per user. Removing the app with &lt;code&gt;install.sh --uninstall&lt;/code&gt; leaves the payload alone.&lt;/li&gt;</source>
            <translation>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Distribuzioni: &lt;code&gt;{deployments_file}&lt;/code&gt;. Dimensione della finestra e pagina vengono mantenute per utente. Rimuovere l’app con &lt;code&gt;install.sh --uninstall&lt;/code&gt; lascia intatto il payload.&lt;/li&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;Source and issues: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR itself: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; this app ships none of it).&lt;/p&gt;</source>
            <translation>&lt;p&gt;Sorgente e segnalazioni: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR stesso: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; questa app non ne distribuisce alcuna parte).&lt;/p&gt;</translation>
        </message>
        <message>
            <source>&lt;p&gt;&lt;b&gt;Second upscaler&lt;/b&gt; (optional, OptiScaler folder only): pick another FidelityFX upscaler DLL, for example AMD&apos;s &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; with FSR 4. It is copied into the folder as &lt;code&gt;{second}&lt;/code&gt; and &lt;code&gt;UpscalerDll&lt;/code&gt; in its helixsr.ini points at it, so OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR and the one you pick runs in that DLL.&lt;/p&gt;</source>
            <translation>&lt;p&gt;&lt;b&gt;Secondo upscaler&lt;/b&gt; (facoltativo, solo cartella OptiScaler): scegli un&apos;altra DLL upscaler FidelityFX, ad esempio &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; di AMD con FSR 4. Viene copiata nella cartella come &lt;code&gt;{second}&lt;/code&gt; e &lt;code&gt;UpscalerDll&lt;/code&gt; nel suo helixsr.ini punta a essa, così il menu «FFX Upscaler» di OptiScaler elenca i suoi upscaler dopo HelixSR e quello scelto gira in quella DLL.&lt;/p&gt;</translation>
        </message>
    </context>
    <context>
        <name>setup_page</name>
        <message>
            <source>{0:.1f} MB</source>
            <translation>{0:.1f} MB</translation>
        </message>
    </context>
</TS>