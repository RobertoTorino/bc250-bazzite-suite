<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es">
<context>
    <name>DeployPage</name>
    <message>
        <source>Deploy</source>
        <translation>Instalar</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>Juego</translation>
    </message>
    <message>
        <source>Steam library:</source>
        <translation>Biblioteca de Steam:</translation>
    </message>
    <message>
        <source>The folders under steamapps/common of every Steam library on this PC.</source>
        <translation>Las carpetas bajo steamapps/common de cada biblioteca de Steam en este PC.</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>Examinar…</translation>
    </message>
    <message>
        <source>Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix.</source>
        <translation>Cualquier carpeta: un juego fuera de Steam o un prefijo de Heroic / Lutris / Bottles.</translation>
    </message>
    <message>
        <source>Folder:</source>
        <translation>Carpeta:</translation>
    </message>
    <message>
        <source>Pick a game above or browse to its folder</source>
        <translation>Elige un juego arriba o busca su carpeta</translation>
    </message>
    <message>
        <source>Scan</source>
        <translation>Escanear</translation>
    </message>
    <message>
        <source>FSR 3.1 upscaler DLLs in that folder</source>
        <translation>DLL de escalado FSR 3.1 en esa carpeta</translation>
    </message>
    <message>
        <source>DLL</source>
        <translation>DLL</translation>
    </message>
    <message>
        <source>State</source>
        <translation>Estado</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>Archivos de red</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>Ubicación</translation>
    </message>
    <message>
        <source>Scan a game folder first.</source>
        <translation>Escanea primero una carpeta de juego.</translation>
    </message>
    <message>
        <source>How</source>
        <translation>Modo</translation>
    </message>
    <message>
        <source>Replace the selected DLL (the game's file is kept as *.original.dll)</source>
        <translation>Sustituir la DLL seleccionada (el archivo del juego se conserva como *.original.dll)</translation>
    </message>
    <message>
        <source>Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)</source>
        <translation>Carpeta independiente para OptiScaler (juegos DLSS / XeSS / FSR 2)</translation>
    </message>
    <message>
        <source>The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: under Engine/Plugins/…/Win64) or &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; above, then choose &lt;b&gt;AMD FSR&lt;/b&gt; in the game. No launch options.</source>
        <translation>La forma prevista de instalar HelixSR: el juego llama a FSR 3.1 y obtiene HelixSR. Elige arriba &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; del juego (Unreal: bajo Engine/Plugins/…/Win64) o &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt;, y luego selecciona &lt;b&gt;AMD FSR&lt;/b&gt; en el juego. Sin opciones de lanzamiento.</translation>
    </message>
    <message>
        <source>Defaults to &lt;game&gt;/HelixSR</source>
        <translation>Predeterminado: &lt;game&gt;/HelixSR</translation>
    </message>
    <message>
        <source>Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this folder with the lines below (Copy puts them on the clipboard).</source>
        <translation>Instala OptiScaler para el juego como indica su documentación y luego apunta su OptiScaler.ini a esta carpeta con las líneas siguientes (Copiar las pone en el portapapeles).</translation>
    </message>
    <message>
        <source>Copy OptiScaler.ini lines</source>
        <translation>Copiar líneas de OptiScaler.ini</translation>
    </message>
    <message>
        <source>Write helixsr.ini with the values of the helixsr.ini page</source>
        <translation>Escribir helixsr.ini con los valores de la página helixsr.ini</translation>
    </message>
    <message>
        <source>Unticked: the payload's helixsr.ini is copied if it has one, else none is written and HelixSR uses its defaults.</source>
        <translation>Desmarcado: se copia el helixsr.ini del paquete si existe; si no, no se escribe ninguno y HelixSR usa sus valores predeterminados.</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>Quitar HelixSR</translation>
    </message>
    <message>
        <source>Delete HelixSR's files and put the game's original DLL back.</source>
        <translation>Elimina los archivos de HelixSR y restaura la DLL original del juego.</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>Instalar HelixSR</translation>
    </message>
    <message>
        <source>Copy HelixSR into the game as chosen above.</source>
        <translation>Copia HelixSR en el juego según lo elegido arriba.</translation>
    </message>
    <message>
        <source>— pick a game —</source>
        <translation>— elige un juego —</translation>
    </message>
    <message>
        <source>— no Steam library found —</source>
        <translation>— no se encontró ninguna biblioteca de Steam —</translation>
    </message>
    <message>
        <source>No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a separate DLL: use the OptiScaler folder below, or check the game's folder.</source>
        <translation>No hay ninguna DLL de escalado FSR 3.1 en esta carpeta. Puede que el juego no incluya FSR 3.1 como DLL separada: usa la carpeta de OptiScaler de abajo o revisa la carpeta del juego.</translation>
    </message>
    <message>
        <source>{0} DLL(s) found; select the one the game loads (usually the only one, or the shallowest).</source>
        <translation>Se encontraron {0} DLL; selecciona la que carga el juego (normalmente la única o la menos profunda).</translation>
    </message>
    <message>
        <source>Import a complete payload first.</source>
        <translation>Importa primero un paquete completo.</translation>
    </message>
    <message>
        <source>Write HelixSR under both FidelityFX names into the folder.</source>
        <translation>Escribe HelixSR en la carpeta con ambos nombres de FidelityFX.</translation>
    </message>
    <message>
        <source>Select a DLL in the list.</source>
        <translation>Selecciona una DLL en la lista.</translation>
    </message>
    <message>
        <source>Replace {0} with HelixSR.</source>
        <translation>Sustituye {0} por HelixSR.</translation>
    </message>
</context>
<context>
    <name>HelpPage</name>
    <message>
        <source>Language:</source>
        <translation>Idioma:</translation>
    </message>
    <message>
        <source>System default</source>
        <translation>Predeterminado del sistema</translation>
    </message>
    <message>
        <source>Saved for the next start; the interface is built once in the language that is active then.</source>
        <translation>Se guarda para el próximo inicio; la interfaz se crea una vez con el idioma activo entonces.</translation>
    </message>
    <message>
        <source>Takes effect after a restart.</source>
        <translation>Tiene efecto tras reiniciar.</translation>
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
        <translation>Valores predeterminados de HelixSR</translation>
    </message>
    <message>
        <source>Reset every field to the value HelixSR uses when the key is missing.</source>
        <translation>Restablece cada campo al valor que HelixSR usa cuando falta la clave.</translation>
    </message>
    <message>
        <source>Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a game that already has HelixSR.</source>
        <translation>Ajustes opcionales que HelixSR lee de un helixsr.ini junto a su DLL; cada clave tiene un valor predeterminado. Estos valores se escriben al instalar (si está marcado allí), se pueden guardar como predeterminados del paquete o enviar a un juego que ya tenga HelixSR.</translation>
    </message>
    <message>
        <source>off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, or Sharpness below if it sends none. override: always Sharpness below.</source>
        <translation>off: nunca aplicar nitidez (la red de DLSS no lo hace). game: la nitidez FSR del juego, o Sharpness abajo si no envía ninguna. override: siempre Sharpness abajo.</translation>
    </message>
    <message>
        <source>0 = none, 1 = strongest RCAS (FidelityFX scale).</source>
        <translation>0 = nada, 1 = RCAS máximo (escala FidelityFX).</translation>
    </message>
    <message>
        <source>Less sharpening on fast-moving pixels</source>
        <translation>Menos nitidez en píxeles de movimiento rápido</translation>
    </message>
    <message>
        <source>Motion in output pixels per frame where the reduction starts.</source>
        <translation>Movimiento, en píxeles de salida por fotograma, donde empieza la reducción.</translation>
    </message>
    <message>
        <source>Motion where the reduction is complete.</source>
        <translation>Movimiento donde la reducción es completa.</translation>
    </message>
    <message>
        <source>Fraction of sharpening removed at and above MotionLimit.</source>
        <translation>Fracción de nitidez eliminada en MotionLimit y por encima.</translation>
    </message>
    <message>
        <source>Write helixsr.log next to the DLL</source>
        <translation>Escribir helixsr.log junto a la DLL</translation>
    </message>
    <message>
        <source>Run the Model E network</source>
        <translation>Ejecutar la red Model E</translation>
    </message>
    <message>
        <source>Off, or while the network files are missing, a placeholder upscale is used.</source>
        <translation>Desactivado, o mientras falten los archivos de red, se usa un escalado de sustitución.</translation>
    </message>
    <message>
        <source>auto: the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one.</source>
        <translation>auto: la red principal en toda relación de escala (más rápida que la red Ultra Performance en GPU sin núcleos matriciales). nvidia: como la selecciona DLSS. O fuerza una.</translation>
    </message>
    <message>
        <source>Jitter comes out mirrored</source>
        <translation>El jitter sale reflejado</translation>
    </message>
    <message>
        <source>Motion vectors come out mirrored</source>
        <translation>Los vectores de movimiento salen reflejados</translation>
    </message>
    <message>
        <source>Convert render-resolution motion vectors first</source>
        <translation>Convertir primero los vectores de movimiento a resolución de renderizado</translation>
    </message>
    <message>
        <source>Used anyway when the game's vectors include the jitter; otherwise NVIDIA's render-resolution path is faster.</source>
        <translation>Se usa igualmente cuando los vectores del juego incluyen el jitter; en caso contrario, la ruta de resolución de renderizado de NVIDIA es más rápida.</translation>
    </message>
    <message>
        <source>auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll</source>
        <translation>auto: amd_fidelityfx_dx12.original.dll; si no, …framegeneration_dx12.dll</translation>
    </message>
    <message>
        <source>DLL that serves FidelityFX effects other than upscaling (frame generation).</source>
        <translation>DLL que sirve efectos FidelityFX distintos del escalado (generación de fotogramas).</translation>
    </message>
    <message>
        <source>empty: HelixSR only</source>
        <translation>vacío: solo HelixSR</translation>
    </message>
    <message>
        <source>A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu. A bare name is looked up next to HelixSR.</source>
        <translation>Una segunda DLL de escalado FidelityFX (p. ej., la de AMD con FSR 4) listada tras HelixSR en el menú de OptiScaler. Un nombre sin ruta se busca junto a HelixSR.</translation>
    </message>
    <message>
        <source>Resulting file</source>
        <translation>Archivo resultante</translation>
    </message>
    <message>
        <source>Save as payload default</source>
        <translation>Guardar como predeterminado del paquete</translation>
    </message>
    <message>
        <source>Write this file into the payload folder: it is what Deploy copies when the helixsr.ini tick box there is off, and what this page starts from.</source>
        <translation>Escribe este archivo en la carpeta del paquete: es lo que Instalar copia cuando la casilla helixsr.ini está desmarcada, y de donde parte esta página.</translation>
    </message>
    <message>
        <source>Push to:</source>
        <translation>Enviar a:</translation>
    </message>
    <message>
        <source>Write to game</source>
        <translation>Escribir en el juego</translation>
    </message>
    <message>
        <source>Overwrite the helixsr.ini of that deployment with this file.</source>
        <translation>Sobrescribe con este archivo el helixsr.ini de esa instalación.</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>HelixSR payload</source>
        <translation>Paquete de HelixSR</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>Archivos de red</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>Instalaciones</translation>
    </message>
    <message>
        <source>Steam games</source>
        <translation>Juegos de Steam</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Resumen</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>Configuración</translation>
    </message>
    <message>
        <source>Deploy</source>
        <translation>Instalar</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Ayuda</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Listo</translation>
    </message>
    <message>
        <source>Setup running</source>
        <translation>Configuración en curso</translation>
    </message>
    <message>
        <source>The HelixSR setup is still running. Cancel it and quit?</source>
        <translation>La configuración de HelixSR sigue en curso. ¿Cancelarla y salir?</translation>
    </message>
    <message>
        <source>Imported</source>
        <translation>Importado</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Falta</translation>
    </message>
    <message>
        <source>helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh</source>
        <translation>helixsr_weights.bin y helixsr_kernels.pak de helixsr-setup.sh</translation>
    </message>
    <message>
        <source>HelixSR in place / known deployments</source>
        <translation>HelixSR presente / instalaciones conocidas</translation>
    </message>
    <message>
        <source>No Steam library found</source>
        <translation>No se encontró ninguna biblioteca de Steam</translation>
    </message>
    <message>
        <source>Extracted HelixSR release folder</source>
        <translation>Carpeta de versión de HelixSR extraída</translation>
    </message>
    <message>
        <source>HelixSR release zip</source>
        <translation>Zip de versión de HelixSR</translation>
    </message>
    <message>
        <source>Zip archives (*.zip)</source>
        <translation>Archivos zip (*.zip)</translation>
    </message>
    <message>
        <source>Import failed</source>
        <translation>Error al importar</translation>
    </message>
    <message>
        <source>Imported {0} file(s): {1}.</source>
        <translation>Se importaron {0} archivo(s): {1}.</translation>
    </message>
    <message>
        <source>

Still missing: {0}. Run helixsr-setup.sh in the extracted release folder, then import that folder.</source>
        <translation>

Aún falta: {0}. Ejecuta helixsr-setup.sh en la carpeta de la versión extraída y luego importa esa carpeta.</translation>
    </message>
    <message>
        <source>Payload incomplete</source>
        <translation>Paquete incompleto</translation>
    </message>
    <message>
        <source>Could not write</source>
        <translation>No se pudo escribir</translation>
    </message>
    <message>
        <source>Saved {0}</source>
        <translation>Guardado {0}</translation>
    </message>
    <message>
        <source>Game folder</source>
        <translation>Carpeta del juego</translation>
    </message>
    <message>
        <source>Folder for HelixSR (OptiScaler)</source>
        <translation>Carpeta para HelixSR (OptiScaler)</translation>
    </message>
    <message>
        <source>{0} is not a folder.</source>
        <translation>{0} no es una carpeta.</translation>
    </message>
    <message>
        <source>Could not scan {0}: {1}</source>
        <translation>No se pudo escanear {0}: {1}</translation>
    </message>
    <message>
        <source>The helixsr.ini page has invalid values; fix them or untick writing the ini.</source>
        <translation>La página helixsr.ini tiene valores no válidos; corrígelos o desmarca escribir el ini.</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>Instalar HelixSR</translation>
    </message>
    <message>
        <source>Rename
{path}
to {original} and put HelixSR in its place?</source>
        <translation>¿Renombrar
{path}
a {original} y poner HelixSR en su lugar?</translation>
    </message>
    <message>
        <source>Deploy failed</source>
        <translation>Error al instalar</translation>
    </message>
    <message>
        <source>HelixSR deployed: {0} file(s) written to {1}</source>
        <translation>HelixSR instalado: {0} archivo(s) escritos en {1}</translation>
    </message>
    <message>
        <source>HelixSR folder ready</source>
        <translation>Carpeta de HelixSR lista</translation>
    </message>
    <message>
        <source>HelixSR is in
{folder}

Now point OptiScaler at it: the OptiScaler.ini lines on the Deploy page (Copy button) go into the game's OptiScaler.ini.</source>
        <translation>HelixSR está en
{folder}

Ahora apunta OptiScaler allí: las líneas de OptiScaler.ini de la página Instalar (botón Copiar) van en el OptiScaler.ini del juego.</translation>
    </message>
    <message>
        <source>Delete HelixSR's files next to
{0}
and rename the game's .original.dll back?</source>
        <translation>¿Eliminar los archivos de HelixSR junto a
{0}
y devolver su nombre a la .original.dll del juego?</translation>
    </message>
    <message>
        <source>Delete HelixSR's files in
{0}?</source>
        <translation>¿Eliminar los archivos de HelixSR en
{0}?</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>Quitar HelixSR</translation>
    </message>
    <message>
        <source>Remove failed</source>
        <translation>Error al quitar</translation>
    </message>
    <message>
        <source>Removed {0} file(s); HelixSR is gone from {1}</source>
        <translation>Se quitaron {0} archivo(s); HelixSR ya no está en {1}</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>Carpeta ausente</translation>
    </message>
    <message>
        <source>{0} does not exist any more.</source>
        <translation>{0} ya no existe.</translation>
    </message>
    <message>
        <source>Wrote {0}</source>
        <translation>Escrito {0}</translation>
    </message>
    <message>
        <source>Update check: {0}</source>
        <translation>Comprobación de actualizaciones: {0}</translation>
    </message>
    <message>
        <source>HelixSR {version} is out ({published}); the payload has {installed}. Get HelixSR… updates it.</source>
        <translation>HelixSR {version} está disponible ({published}); el paquete tiene {installed}. Obtener HelixSR… lo actualiza.</translation>
    </message>
    <message>
        <source>Latest HelixSR release: {version} ({published}).</source>
        <translation>Última versión de HelixSR: {version} ({published}).</translation>
    </message>
    <message>
        <source>{app} {version} is available: {url}</source>
        <translation>{app} {version} está disponible: {url}</translation>
    </message>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} no existe.</translation>
    </message>
    <message>
        <source>Payload is current</source>
        <translation>El paquete está actualizado</translation>
    </message>
    <message>
        <source>The payload already has HelixSR {version} with its network files. Download and build again anyway?</source>
        <translation>El paquete ya tiene HelixSR {version} con sus archivos de red. ¿Descargar y compilar de nuevo igualmente?</translation>
    </message>
    <message>
        <source>(unknown version)</source>
        <translation>(versión desconocida)</translation>
    </message>
    <message>
        <source>Nothing to do: the payload already has HelixSR {version} with its network files. Use Deploy to install it into a game.</source>
        <translation>Nada que hacer: el paquete ya tiene HelixSR {version} con sus archivos de red. Usa Instalar para instalarlo en un juego.</translation>
    </message>
    <message>
        <source>Payload is already current.</source>
        <translation>El paquete ya está actualizado.</translation>
    </message>
    <message>
        <source>HelixSR setup running…</source>
        <translation>Configuración de HelixSR en curso…</translation>
    </message>
    <message>
        <source>Cancelling…</source>
        <translation>Cancelando…</translation>
    </message>
    <message>
        <source>HelixSR setup failed: {0}</source>
        <translation>Error en la configuración de HelixSR: {0}</translation>
    </message>
    <message>
        <source>HelixSR setup failed</source>
        <translation>Error en la configuración de HelixSR</translation>
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
        <translation>No se encontró ninguna biblioteca de Steam en este PC.</translation>
    </message>
    <message>
        <source>Looking for {dll} in {libraries} …</source>
        <translation>Buscando {dll} en {libraries} …</translation>
    </message>
    <message>
        <source>Copied to the clipboard</source>
        <translation>Copiado al portapapeles</translation>
    </message>
    <message>
        <source>Could not open</source>
        <translation>No se pudo abrir</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Resumen</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualizar</translation>
    </message>
    <message>
        <source>HelixSR payload</source>
        <translation>Paquete de HelixSR</translation>
    </message>
    <message>
        <source>Upscaler DLL</source>
        <translation>DLL de escalado</translation>
    </message>
    <message>
        <source>Weights</source>
        <translation>Pesos</translation>
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
        <translation>La página Configuración descarga una versión de HelixSR y compila por ti sus archivos de red (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) a partir de la DLL DLSS de NVIDIA. O hazlo a mano: extrae la versión, ejecuta allí una vez su &lt;code&gt;helixsr-setup.sh&lt;/code&gt; e importa aquí esa carpeta. Los archivos de red son propiedad de NVIDIA: se quedan en este PC y nunca forman parte de esta aplicación.</translation>
    </message>
    <message>
        <source>Get HelixSR…</source>
        <translation>Obtener HelixSR…</translation>
    </message>
    <message>
        <source>Open the Setup page: download the latest release and build the network files in one go.</source>
        <translation>Abre la página Configuración: descarga la última versión y compila los archivos de red de una vez.</translation>
    </message>
    <message>
        <source>Import release folder…</source>
        <translation>Importar carpeta de versión…</translation>
    </message>
    <message>
        <source>The folder the HelixSR zip was extracted to, after running helixsr-setup.sh there.</source>
        <translation>La carpeta donde se extrajo el zip de HelixSR, después de ejecutar allí helixsr-setup.sh.</translation>
    </message>
    <message>
        <source>Import release zip…</source>
        <translation>Importar zip de versión…</translation>
    </message>
    <message>
        <source>The release zip as downloaded; the network files still have to be built and imported from the extracted folder afterwards.</source>
        <translation>El zip de la versión tal como se descargó; los archivos de red aún deben compilarse e importarse después desde la carpeta extraída.</translation>
    </message>
    <message>
        <source>Open payload folder</source>
        <translation>Abrir carpeta del paquete</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>Instalaciones</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>Juego</translation>
    </message>
    <message>
        <source>Mode</source>
        <translation>Modo</translation>
    </message>
    <message>
        <source>State</source>
        <translation>Estado</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>Deployed</source>
        <translation>Instalado</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>Ubicación</translation>
    </message>
    <message>
        <source>Nothing deployed yet. Use the Deploy page.</source>
        <translation>Aún no hay nada instalado. Usa la página Instalar.</translation>
    </message>
    <message>
        <source>Open folder</source>
        <translation>Abrir carpeta</translation>
    </message>
    <message>
        <source>Forget entry</source>
        <translation>Olvidar entrada</translation>
    </message>
    <message>
        <source>Drop the entry from this list without touching the game. For deployments whose files are already gone.</source>
        <translation>Quita la entrada de esta lista sin tocar el juego. Para instalaciones cuyos archivos ya no existen.</translation>
    </message>
    <message>
        <source>Remove HelixSR from game</source>
        <translation>Quitar HelixSR del juego</translation>
    </message>
    <message>
        <source>Delete HelixSR's files there and put the game's original DLL back.</source>
        <translation>Elimina allí los archivos de HelixSR y restaura la DLL original del juego.</translation>
    </message>
    <message>
        <source>Present</source>
        <translation>Presente</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Falta</translation>
    </message>
    <message>
        <source>Default</source>
        <translation>Predeterminado</translation>
    </message>
    <message>
        <source>No helixsr.ini in the payload: HelixSR's defaults are used as the template.</source>
        <translation>No hay helixsr.ini en el paquete: se usan los valores predeterminados de HelixSR como plantilla.</translation>
    </message>
    <message>
        <source>HelixSR (version unknown)</source>
        <translation>HelixSR (versión desconocida)</translation>
    </message>
    <message>
        <source>{version} ready to deploy.</source>
        <translation>{version} listo para instalar.</translation>
    </message>
    <message>
        <source>{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted release and import the folder again.</source>
        <translation>{version} importado, pero faltan los archivos de red: ejecuta helixsr-setup.sh en la versión extraída e importa la carpeta de nuevo.</translation>
    </message>
    <message>
        <source>No payload yet: import an extracted HelixSR release.</source>
        <translation>Aún no hay paquete: importa una versión extraída de HelixSR.</translation>
    </message>
    <message>
        <source>Folder: {0}</source>
        <translation>Carpeta: {0}</translation>
    </message>
    <message>
        <source>Replaced DLL</source>
        <translation>DLL sustituida</translation>
    </message>
    <message>
        <source>OptiScaler folder</source>
        <translation>Carpeta de OptiScaler</translation>
    </message>
</context>
<context>
    <name>SetupPage</name>
    <message>
        <source>Unknown</source>
        <translation>Desconocido</translation>
    </message>
    <message>
        <source>Update</source>
        <translation>Actualización</translation>
    </message>
    <message>
        <source>Up to date</source>
        <translation>Actualizado</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>Configuración</translation>
    </message>
    <message>
        <source>One click does what the HelixSR README asks you to do by hand: download the release, fetch NVIDIA's DLSS DLL, Microsoft's shader compiler and (on Bazzite) a portable Python in parallel, run &lt;code&gt;helixsr-setup.sh&lt;/code&gt; and import the result as the payload. The DLSS DLL is used once and deleted; the network files it produces are NVIDIA's property and stay on this PC.</source>
        <translation>Un clic hace lo que el README de HelixSR pide hacer a mano: descargar la versión, obtener en paralelo la DLL DLSS de NVIDIA, el compilador de shaders de Microsoft y (en Bazzite) un Python portable, ejecutar &lt;code&gt;helixsr-setup.sh&lt;/code&gt; e importar el resultado como paquete. La DLL DLSS se usa una vez y se elimina; los archivos de red que produce son propiedad de NVIDIA y se quedan en este PC.</translation>
    </message>
    <message>
        <source>Releases</source>
        <translation>Versiones</translation>
    </message>
    <message>
        <source>Not checked</source>
        <translation>Sin comprobar</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>This app</source>
        <translation>Esta aplicación</translation>
    </message>
    <message>
        <source>Check now</source>
        <translation>Comprobar ahora</translation>
    </message>
    <message>
        <source>Ask GitHub for the latest HelixSR release and the latest release of this app</source>
        <translation>Consulta en GitHub la última versión de HelixSR y la última versión de esta aplicación</translation>
    </message>
    <message>
        <source>Check at start</source>
        <translation>Comprobar al iniciar</translation>
    </message>
    <message>
        <source>Look up both releases every time the app starts (one small request each)</source>
        <translation>Busca ambas versiones cada vez que se inicia la aplicación (una solicitud pequeña cada una)</translation>
    </message>
    <message>
        <source>Get HelixSR and build the network files</source>
        <translation>Obtener HelixSR y compilar los archivos de red</translation>
    </message>
    <message>
        <source>Use a {0} already on this PC:</source>
        <translation>Usar un {0} que ya esté en este PC:</translation>
    </message>
    <message>
        <source>Skips the 59 MB download from NVIDIA's GitHub. Only DLSS 310.7.0 (the exact build HelixSR pins) is accepted; Find looks through the Steam libraries for one.</source>
        <translation>Omite la descarga de 59 MB desde el GitHub de NVIDIA. Solo se acepta DLSS 310.7.0 (la compilación exacta que fija HelixSR); Buscar la busca en las bibliotecas de Steam.</translation>
    </message>
    <message>
        <source>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</source>
        <translation>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>Examinar…</translation>
    </message>
    <message>
        <source>Find in Steam</source>
        <translation>Buscar en Steam</translation>
    </message>
    <message>
        <source>Scan the Steam libraries for a DLSS 310.7.0 DLL (checks each file's checksum)</source>
        <translation>Escanea las bibliotecas de Steam en busca de una DLL DLSS 310.7.0 (comprueba la suma de cada archivo)</translation>
    </message>
    <message>
        <source>Download and build</source>
        <translation>Descargar y compilar</translation>
    </message>
    <message>
        <source>Download the latest release and everything the setup needs, run helixsr-setup.sh and import the result</source>
        <translation>Descarga la última versión y todo lo que necesita la configuración, ejecuta helixsr-setup.sh e importa el resultado</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation>Cancelar</translation>
    </message>
    <message>
        <source>Import built release</source>
        <translation>Importar versión compilada</translation>
    </message>
    <message>
        <source>Import the network files built in the work folder into the payload</source>
        <translation>Importa al paquete los archivos de red compilados en la carpeta de trabajo</translation>
    </message>
    <message>
        <source>Open work folder</source>
        <translation>Abrir carpeta de trabajo</translation>
    </message>
    <message>
        <source>Idle</source>
        <translation>Inactivo</translation>
    </message>
    <message>
        <source>Output of the downloads and of helixsr-setup.sh</source>
        <translation>Salida de las descargas y de helixsr-setup.sh</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</source>
        <translation> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;release page&lt;/a&gt;</source>
        <translation> — &lt;a href="{url}"&gt;página de la versión&lt;/a&gt;</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Comprobando…</translation>
    </message>
    <message>
        <source>Found {0} matching {1}: {2}</source>
        <translation>Se encontró {0} que coincide con {1}: {2}</translation>
    </message>
    <message>
        <source>No DLSS 310.7.0 {0} found in the Steam libraries; it will be downloaded.</source>
        <translation>No se encontró ningún {0} DLSS 310.7.0 en las bibliotecas de Steam; se descargará.</translation>
    </message>
    <message>
        <source>{done} / {total}  (%p%)</source>
        <translation>{done} / {total}  (%p%)</translation>
    </message>
    <message>
        <source>Downloading: {0}</source>
        <translation>Descargando: {0}</translation>
    </message>
    <message>
        <source>{0} — {1}:{2:02d} elapsed</source>
        <translation>{0} — {1}:{2:02d} transcurrido</translation>
    </message>
    <message>
        <source>{0} — took {1}:{2:02d}</source>
        <translation>{0} — tardó {1}:{2:02d}</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Desconocido</translation>
    </message>
</context>
<context>
    <name>acquire</name>
    <message>
        <source>GitHub answered {0}</source>
        <translation>GitHub respondió {0}</translation>
    </message>
    <message>
        <source>no connection ({0})</source>
        <translation>sin conexión ({0})</translation>
    </message>
    <message>
        <source>unexpected tag {0}</source>
        <translation>etiqueta inesperada {0}</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>no instalado</translation>
    </message>
    <message>
        <source>{0} (latest: unknown, {1})</source>
        <translation>{0} (última: desconocida, {1})</translation>
    </message>
    <message>
        <source>{0} (latest: unknown)</source>
        <translation>{0} (última: desconocida)</translation>
    </message>
    <message>
        <source>{0} → {1} available ({2})</source>
        <translation>{0} → {1} disponible ({2})</translation>
    </message>
    <message>
        <source>{0} (up to date, released {1})</source>
        <translation>{0} (actualizado, publicado {1})</translation>
    </message>
    <message>
        <source>{0}; latest release {1} ({2})</source>
        <translation>{0}; última versión {1} ({2})</translation>
    </message>
    <message>
        <source>{0}: server answered {1} for {2}</source>
        <translation>{0}: el servidor respondió {1} para {2}</translation>
    </message>
    <message>
        <source>{0}: download failed ({1})</source>
        <translation>{0}: descarga fallida ({1})</translation>
    </message>
    <message>
        <source>{0}: checksum mismatch, the download is not the file HelixSR expects. Nothing was kept.</source>
        <translation>{0}: la suma no coincide; la descarga no es el archivo que HelixSR espera. No se conservó nada.</translation>
    </message>
    <message>
        <source>No {0} in {1}: not a HelixSR release.</source>
        <translation>No hay {0} en {1}: no es una versión de HelixSR.</translation>
    </message>
    <message>
        <source>{0} contains an unsafe path: {1}</source>
        <translation>{0} contiene una ruta no segura: {1}</translation>
    </message>
    <message>
        <source>the shader compiler archive has no bin/x64 folder</source>
        <translation>el archivo del compilador de shaders no tiene carpeta bin/x64</translation>
    </message>
    <message>
        <source>unsafe path in {0}: {1}</source>
        <translation>ruta no segura en {0}: {1}</translation>
    </message>
    <message>
        <source>the portable Python archive did not produce python/bin/python3</source>
        <translation>el archivo de Python portable no produjo python/bin/python3</translation>
    </message>
    <message>
        <source>Cancelled.</source>
        <translation>Cancelado.</translation>
    </message>
    <message>
        <source>HelixSR {0} is built in {1}</source>
        <translation>HelixSR {0} está compilado en {1}</translation>
    </message>
    <message>
        <source>Could not look up the latest HelixSR release: {0}</source>
        <translation>No se pudo consultar la última versión de HelixSR: {0}</translation>
    </message>
    <message>
        <source>HelixSR {0} has no zip to download; see {1}</source>
        <translation>HelixSR {0} no tiene zip para descargar; consulta {1}</translation>
    </message>
    <message>
        <source>Downloading HelixSR {0}</source>
        <translation>Descargando HelixSR {0}</translation>
    </message>
    <message>
        <source>Using the already downloaded {0}</source>
        <translation>Usando el {0} ya descargado</translation>
    </message>
    <message>
        <source>Downloading {0}</source>
        <translation>Descargando {0}</translation>
    </message>
    <message>
        <source>Extracted to {0}</source>
        <translation>Extraído en {0}</translation>
    </message>
    <message>
        <source>The release has no {0}.</source>
        <translation>La versión no tiene {0}.</translation>
    </message>
    <message>
        <source>Could not read the pinned source(s) for {0} from the setup scripts; the script will download them itself.</source>
        <translation>No se pudieron leer las fuentes fijadas para {0} desde los scripts de configuración; el script las descargará por sí mismo.</translation>
    </message>
    <message>
        <source>Downloading {0} in parallel</source>
        <translation>Descargando {0} en paralelo</translation>
    </message>
    <message>
        <source>Shader compiler unpacked to {0}</source>
        <translation>Compilador de shaders descomprimido en {0}</translation>
    </message>
    <message>
        <source>Portable Python unpacked to {0}</source>
        <translation>Python portable descomprimido en {0}</translation>
    </message>
    <message>
        <source>Building the network files (about 5-6 minutes on a BC-250)</source>
        <translation>Compilando los archivos de red (unos 5-6 minutos en una BC-250)</translation>
    </message>
    <message>
        <source>Could not start {0}: {1}</source>
        <translation>No se pudo iniciar {0}: {1}</translation>
    </message>
    <message>
        <source>Deleted the downloaded {0}</source>
        <translation>Se eliminó el {0} descargado</translation>
    </message>
    <message>
        <source>{0} exited with code {1}; see the output above.</source>
        <translation>{0} salió con código {1}; consulta la salida anterior.</translation>
    </message>
    <message>
        <source>The setup finished but did not produce {0}</source>
        <translation>La configuración terminó pero no produjo {0}</translation>
    </message>
    <message>
        <source>no release tagged {0} yet</source>
        <translation>aún no hay ninguna versión con la etiqueta {0}</translation>
    </message>
</context>
<context>
    <name>backend</name>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} no existe.</translation>
    </message>
    <message>
        <source>{0} is not a zip archive or a folder.</source>
        <translation>{0} no es un archivo zip ni una carpeta.</translation>
    </message>
    <message>
        <source>No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release zip itself).</source>
        <translation>No se encontró {0} en {1}. Elige la carpeta donde se extrajo la versión de HelixSR (o el propio zip de la versión).</translation>
    </message>
    <message>
        <source>HelixSR deployed</source>
        <translation>HelixSR instalado</translation>
    </message>
    <message>
        <source>HelixSR deployed (other build)</source>
        <translation>HelixSR instalado (otra compilación)</translation>
    </message>
    <message>
        <source>HelixSR (no original kept)</source>
        <translation>HelixSR (sin original guardado)</translation>
    </message>
    <message>
        <source>Game's own DLL</source>
        <translation>DLL propia del juego</translation>
    </message>
    <message>
        <source>The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running its helixsr-setup.sh.</source>
        <translation>El paquete está incompleto; falta: {0}. Importa la versión extraída de HelixSR después de ejecutar su helixsr-setup.sh.</translation>
    </message>
    <message>
        <source>{0} is not an FSR 3.1 upscaler DLL ({1}).</source>
        <translation>{0} no es una DLL de escalado FSR 3.1 ({1}).</translation>
    </message>
    <message>
        <source>{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.</source>
        <translation>{0} no es HelixSR (no hay {1} junto a él y difiere del paquete). No se cambió nada.</translation>
    </message>
    <message>
        <source>{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone folder. Use Remove on the DLL instead.</source>
        <translation>{0} contiene el {1} propio de un juego (hay un {2}): es una DLL sustituida, no una carpeta independiente. Usa Quitar en la DLL en su lugar.</translation>
    </message>
    <message>
        <source>{0} is not HelixSR; nothing was changed.</source>
        <translation>{0} no es HelixSR; no se cambió nada.</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>Carpeta ausente</translation>
    </message>
    <message>
        <source>Removed</source>
        <translation>Quitado</translation>
    </message>
    <message>
        <source>In place</source>
        <translation>Presente</translation>
    </message>
    <message>
        <source>Network files missing</source>
        <translation>Faltan archivos de red</translation>
    </message>
    <message>
        <source>DLL missing</source>
        <translation>Falta DLL</translation>
    </message>
    <message>
        <source>Only the backup is left</source>
        <translation>Solo queda la copia</translation>
    </message>
    <message>
        <source>Original restored</source>
        <translation>Original restaurado</translation>
    </message>
    <message>
        <source>Older build</source>
        <translation>Compilación antigua</translation>
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
        <translation>&lt;p&gt;Instala &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, el escalador híbrido FSR/DLSS para Direct3D 12 ajustado para el &lt;b&gt;AMD BC-250&lt;/b&gt;, en juegos sobre &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR ejecuta la red DLSS Model E de NVIDIA como shaders de cómputo normales en una GPU AMD; los juegos se comunican con él como FSR 3.1. Esta aplicación solo copia, renombra y elimina archivos dentro de las carpetas de juego que le indiques y dentro de su propia carpeta de paquete. No toca nada del sistema y no necesita root.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;How HelixSR is installed (what the app does for you)&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Cómo se instala HelixSR (lo que la aplicación hace por ti)&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;The game's FSR 3.1 upscaler DLL, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (Unreal Engine games keep it under &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) or &lt;code&gt;{helixsr_dll}&lt;/code&gt;, is renamed to &lt;code&gt;*.original.dll&lt;/code&gt;. That file is the backup &lt;i&gt;and&lt;/i&gt; is still used: HelixSR forwards frame generation and other FidelityFX effects to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;La DLL de escalado FSR 3.1 del juego, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (los juegos Unreal Engine la guardan bajo &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) o &lt;code&gt;{helixsr_dll}&lt;/code&gt;, se renombra a &lt;code&gt;*.original.dll&lt;/code&gt;. Ese archivo es la copia de seguridad &lt;i&gt;y&lt;/i&gt; se sigue usando: HelixSR le reenvía la generación de fotogramas y otros efectos FidelityFX.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR's &lt;code&gt;{helixsr_dll}&lt;/code&gt; is copied in under the game's original file name, together with &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Se copia el &lt;code&gt;{helixsr_dll}&lt;/code&gt; de HelixSR con el nombre de archivo original del juego, junto con &lt;code&gt;{weights}&lt;/code&gt; y &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Optionally a &lt;code&gt;{ini}&lt;/code&gt; is written next to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Opcionalmente se escribe un &lt;code&gt;{ini}&lt;/code&gt; junto a él.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Start the game normally and select &lt;b&gt;AMD FSR&lt;/b&gt; as the upscaler. No launch options are needed.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Inicia el juego normalmente y selecciona &lt;b&gt;AMD FSR&lt;/b&gt; como escalador. No se necesitan opciones de lanzamiento.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Remove&lt;/b&gt; undoes it: HelixSR's files are deleted and the &lt;code&gt;.original.dll&lt;/code&gt; gets its name back.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Quitar&lt;/b&gt; lo deshace: se eliminan los archivos de HelixSR y &lt;code&gt;.original.dll&lt;/code&gt; recupera su nombre.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Setup&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Configuración&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Download and build&lt;/b&gt; does the HelixSR README's setup for you: it fetches the latest release zip from &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), reads the exact sources and SHA-256 sums the release's own setup scripts pin, downloads what this PC still needs &lt;i&gt;in parallel&lt;/i&gt; and verifies each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable Python (67 MB, numpy is added by the script). Then it runs &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; with its output on the page: the script builds &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutes, the shader compiler runs through your Proton) and the result is imported as the payload. The DLSS DLL is deleted afterwards. Everything is downloaded into &lt;code&gt;{work_dir}&lt;/code&gt; and &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (the script's own cache, reused next time).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Descargar y compilar&lt;/b&gt; hace por ti la configuración del README de HelixSR: obtiene el zip de la última versión desde &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), lee las fuentes exactas y las sumas SHA-256 que fijan los scripts de configuración de la propia versión, descarga lo que este PC aún necesita &lt;i&gt;en paralelo&lt;/i&gt; y verifica cada archivo: la DLL DLSS 310.7.0 de NVIDIA (59 MB, desde el GitHub de NVIDIA bajo licencia de NVIDIA), el DirectX Shader Compiler de Microsoft (25 MB) y, en sistemas de solo lectura como Bazzite, un Python portable (67 MB, el script añade numpy). Luego ejecuta &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; con su salida en la página: el script compila &lt;code&gt;{weights}&lt;/code&gt; y &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutos, el compilador de shaders se ejecuta a través de tu Proton) y el resultado se importa como paquete. La DLL DLSS se elimina después. Todo se descarga en &lt;code&gt;{work_dir}&lt;/code&gt; y &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (la caché propia del script, reutilizada la próxima vez).&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;If a game you own already ships DLSS 310.7.0, tick &lt;b&gt;Use a nvngx_dlss.dll already on this PC&lt;/b&gt; and let &lt;b&gt;Find in Steam&lt;/b&gt; locate it (checksums are compared, only the exact build HelixSR pins is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Si un juego que tienes ya incluye DLSS 310.7.0, marca &lt;b&gt;Usar un nvngx_dlss.dll que ya esté en este PC&lt;/b&gt; y deja que &lt;b&gt;Buscar en Steam&lt;/b&gt; lo localice (se comparan sumas, solo se ofrece la compilación exacta que fija HelixSR): así se omite la descarga de NVIDIA. Las descargas no son lo que lleva tiempo; lo es la compilación.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; compares the payload with the latest HelixSR release and this app with its latest release on GitHub, at start (one small request each, can be turned off) or with &lt;b&gt;Check now&lt;/b&gt;. A newer HelixSR shows on the Overview too; &lt;b&gt;Download and build&lt;/b&gt; again updates the payload, then deploy again per game (the Overview marks them &lt;i&gt;Older build&lt;/i&gt;).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Versiones&lt;/b&gt; compara el paquete con la última versión de HelixSR y esta aplicación con su última versión en GitHub, al iniciar (una solicitud pequeña cada una, se puede desactivar) o con &lt;b&gt;Comprobar ahora&lt;/b&gt;. Una versión más reciente de HelixSR también aparece en Resumen; &lt;b&gt;Descargar y compilar&lt;/b&gt; de nuevo actualiza el paquete, y luego instala de nuevo en cada juego (Resumen los marca como &lt;i&gt;Compilación antigua&lt;/i&gt;).&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Overview&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Resumen&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The &lt;b&gt;payload&lt;/b&gt; is your copy of a HelixSR release: the DLL, the two network files and the ini, kept in &lt;code&gt;{payload_dir}&lt;/code&gt;. It is filled by the Setup page, or by hand: extract a release, run &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in that folder once and &lt;b&gt;Import release folder…&lt;/b&gt;. The network files contain NVIDIA's network: they are for your own PC and are never part of this app or its releases. &lt;b&gt;Import release zip…&lt;/b&gt; takes the download as is, but the network files are still missing until the setup has run and the folder is imported.&lt;/p&gt;</source>
        <translation>&lt;p&gt;El &lt;b&gt;paquete&lt;/b&gt; es tu copia de una versión de HelixSR: la DLL, los dos archivos de red y el ini, guardados en &lt;code&gt;{payload_dir}&lt;/code&gt;. Lo llena la página Configuración, o a mano: extrae una versión, ejecuta &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; una vez en esa carpeta y usa &lt;b&gt;Importar carpeta de versión…&lt;/b&gt;. Los archivos de red contienen la red de NVIDIA: son para tu propio PC y nunca forman parte de esta aplicación ni de sus versiones. &lt;b&gt;Importar zip de versión…&lt;/b&gt; toma la descarga tal cual, pero los archivos de red siguen faltando hasta que se ejecute la configuración y se importe la carpeta.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Deployments&lt;/b&gt; lists every place the app put HelixSR, with its live state: &lt;i&gt;In place&lt;/i&gt;, &lt;i&gt;Older build&lt;/i&gt; (the payload has been updated since; deploy again to update the game), &lt;i&gt;Network files missing&lt;/i&gt;, &lt;i&gt;Original restored&lt;/i&gt; or &lt;i&gt;Removed&lt;/i&gt;. The list is kept in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Forget entry&lt;/b&gt; drops a line without touching the game.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Instalaciones&lt;/b&gt; lista todos los lugares donde la aplicación puso HelixSR, con su estado actual: &lt;i&gt;Presente&lt;/i&gt;, &lt;i&gt;Compilación antigua&lt;/i&gt; (el paquete se ha actualizado desde entonces; instala de nuevo para actualizar el juego), &lt;i&gt;Faltan archivos de red&lt;/i&gt;, &lt;i&gt;Original restaurado&lt;/i&gt; o &lt;i&gt;Quitado&lt;/i&gt;. La lista se guarda en &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Olvidar entrada&lt;/b&gt; quita una línea sin tocar el juego.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Deploy&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Instalar&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Pick a game from the Steam libraries found on this PC (&lt;code&gt;steamapps/common&lt;/code&gt; of every library in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) or &lt;b&gt;Browse…&lt;/b&gt; to any folder (Heroic, Lutris, Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's own file, HelixSR, and whether the network files are next to it. Select the one the game loads (usually the only one) and &lt;b&gt;Deploy HelixSR&lt;/b&gt;.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Elige un juego de las bibliotecas de Steam encontradas en este PC (&lt;code&gt;steamapps/common&lt;/code&gt; de cada biblioteca en &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) o usa &lt;b&gt;Examinar…&lt;/b&gt; para cualquier carpeta (Heroic, Lutris, Bottles). La carpeta se escanea en busca de DLL de escalado FSR 3.1; cada una muestra si es el archivo propio del juego, HelixSR, y si los archivos de red están junto a ella. Selecciona la que carga el juego (normalmente la única) y &lt;b&gt;Instalar HelixSR&lt;/b&gt;.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Stand-alone folder for OptiScaler&lt;/b&gt; is for games that do not ship FSR 3.1 as a separate DLL (DLSS, XeSS, FSR 2 / 3.0 games). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; routes their upscaler calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own (default &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) and shows the &lt;code&gt;OptiScaler.ini&lt;/code&gt; lines that point OptiScaler there (Windows paths; &lt;code&gt;Z:&lt;/code&gt; is the Linux root under Proton). Install OptiScaler for the game as its documentation describes, paste the lines, and pick &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; in OptiScaler's FFX Upscaler menu.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Carpeta independiente para OptiScaler&lt;/b&gt; es para juegos que no incluyen FSR 3.1 como DLL separada (juegos DLSS, XeSS, FSR 2 / 3.0). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; redirige sus llamadas de escalado a una DLL FSR 3.1. La aplicación escribe HelixSR con ambos nombres de FidelityFX en una carpeta propia (predeterminado &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) y muestra las líneas de &lt;code&gt;OptiScaler.ini&lt;/code&gt; que apuntan OptiScaler allí (rutas Windows; &lt;code&gt;Z:&lt;/code&gt; es la raíz de Linux bajo Proton). Instala OptiScaler para el juego como describe su documentación, pega las líneas y elige &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; en el menú FFX Upscaler de OptiScaler.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Deploying again over an existing deployment updates HelixSR's files and keeps the game's original.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Instalar de nuevo sobre una instalación existente actualiza los archivos de HelixSR y conserva el original del juego.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;th&gt;Sección&lt;/th&gt;&lt;th&gt;Clave&lt;/th&gt;&lt;th&gt;Predeterminado&lt;/th&gt;&lt;th&gt;Significado&lt;/th&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (as DLSS), &lt;i&gt;game&lt;/i&gt; = the game's FSR sharpness (or Sharpness if it sends none), &lt;i&gt;override&lt;/i&gt; = always Sharpness&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (como DLSS), &lt;i&gt;game&lt;/i&gt; = nitidez FSR del juego (o Sharpness si no envía ninguna), &lt;i&gt;override&lt;/i&gt; = siempre Sharpness&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, FidelityFX RCAS scale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, escala FidelityFX RCAS&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Less sharpening on fast-moving pixels: where the reduction starts and is complete (output pixels per frame), and how much is removed&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Menos nitidez en píxeles de movimiento rápido: dónde empieza y se completa la reducción (píxeles de salida por fotograma) y cuánto se elimina&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Run the Model E network; otherwise a placeholder upscale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Ejecuta la red Model E; si no, un escalado de sustitución&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: the main network at every ratio (about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); &lt;i&gt;nvidia&lt;/i&gt;: as DLSS selects; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: la red principal en toda relación (aprox. un 30 % más rápida que la red Ultra Performance de NVIDIA en GPU sin núcleos matriciales); &lt;i&gt;nvidia&lt;/i&gt;: como selecciona DLSS; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;For games whose jitter or motion vectors come out mirrored&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Para juegos cuyo jitter o vectores de movimiento salen reflejados&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convert render-resolution motion vectors to display resolution first (used anyway when the game's vectors include the jitter)&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convierte primero los vectores de movimiento de resolución de renderizado a resolución de pantalla (se usa igualmente cuando los vectores del juego incluyen el jitter)&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Writes &lt;code&gt;helixsr.log&lt;/code&gt; next to the DLL; it names the network that runs and reports missing network files&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Escribe &lt;code&gt;helixsr.log&lt;/code&gt; junto a la DLL; nombra la red que se ejecuta e informa de archivos de red ausentes&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL for the other FidelityFX effects (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; if present, else &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL para los otros efectos FidelityFX (generación de fotogramas): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; si existe; si no, &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;Una segunda DLL de escalado FidelityFX (p. ej., la de AMD con FSR 4) listada tras HelixSR en el menú de OptiScaler&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The page edits these values and shows the resulting file; the comments of the payload's own &lt;code&gt;{ini}&lt;/code&gt; are kept, only values change. &lt;b&gt;Save as payload default&lt;/b&gt; makes it the file Deploy starts from; &lt;b&gt;Write to game&lt;/b&gt; replaces the ini of a chosen deployment. Sharpening off costs nothing; on, about 0.4 ms at 4K on the BC-250.&lt;/p&gt;</source>
        <translation>&lt;p&gt;La página edita estos valores y muestra el archivo resultante; se conservan los comentarios del &lt;code&gt;{ini}&lt;/code&gt; propio del paquete, solo cambian los valores. &lt;b&gt;Guardar como predeterminado del paquete&lt;/b&gt; lo convierte en el archivo desde el que parte Instalar; &lt;b&gt;Escribir en el juego&lt;/b&gt; sustituye el ini de una instalación elegida. Nitidez desactivada no cuesta nada; activada, unos 0.4 ms a 4K en el BC-250.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Good to know&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Conviene saber&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 (gfx1013, Mesa RADV, Proton). Vulkan games are not supported.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR es solo para Direct3D 12 y para RDNA 1 y posteriores; se desarrolla y prueba en el BC-250 (gfx1013, Mesa RADV, Proton). Los juegos Vulkan no son compatibles.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Steam verifies game files on updates and may put the game's own DLL back. The Overview then shows &lt;i&gt;Original restored&lt;/i&gt; and the backup stays; deploy again.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Steam verifica los archivos del juego al actualizar y puede volver a poner la DLL propia del juego. Resumen mostrará entonces &lt;i&gt;Original restaurado&lt;/i&gt; y la copia se conservará; instala de nuevo.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Per-stage GPU timings: launch option &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; writes them to &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Tiempos de GPU por etapa: la opción de lanzamiento &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; los escribe en &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Deployments: &lt;code&gt;{deployments_file}&lt;/code&gt;. Window size and page are kept per user. Removing the app with &lt;code&gt;install.sh --uninstall&lt;/code&gt; leaves the payload alone.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Paquete: &lt;code&gt;{payload_dir}&lt;/code&gt;. Instalaciones: &lt;code&gt;{deployments_file}&lt;/code&gt;. El tamaño de ventana y la página se conservan por usuario. Quitar la aplicación con &lt;code&gt;install.sh --uninstall&lt;/code&gt; deja el paquete intacto.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Source and issues: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR itself: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; this app ships none of it).&lt;/p&gt;</source>
        <translation>&lt;p&gt;Código fuente e incidencias: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR en sí: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; esta aplicación no incluye nada de él).&lt;/p&gt;</translation>
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
