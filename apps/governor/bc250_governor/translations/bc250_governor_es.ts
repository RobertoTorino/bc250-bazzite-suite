<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura de la GPU</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>La GPU está a %1 °C (alerta establecida en %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Limitación del governor</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>La GPU está a %1 °C, igual o por encima de la temperatura de limitación del governor de %2 °C; se está reduciendo el reloj máximo.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>con errores</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>detenido</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>El servicio del governor está %1; la GPU funciona con los relojes predeterminados del controlador. Consulte la página Servicio.</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Copias de seguridad</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualizar</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Antes de cada escritura, la aplicación copia %1 a config.toml.bak-YYYYMMDD-HHMMSS junto a él. Elija una copia para ver las diferencias con el archivo actual; Restaurar la repone (el archivo actual se respalda primero, así que no se pierde nada).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Copias, más recientes primero</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Creado</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Tamaño</translation>
    </message>
    <message>
        <source>File</source>
        <translation>Archivo</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Todavía no hay copias de seguridad.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Diferencia: copia de seguridad → archivo actual</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Reiniciar el governor después de restaurar</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Restaurar la seleccionada</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Convierte la copia seleccionada de nuevo en la configuración (pide su contraseña).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Seleccione una copia de seguridad para compararla con el archivo actual.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>No se puede leer %1: %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Idéntico al archivo actual.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Recargar desde el disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Descarta las ediciones de todas las páginas y vuelve a mostrar los valores de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Reiniciar el governor después de aplicar</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>El governor lee config.toml solo al iniciar.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Aplicar cambios</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Pide su contraseña una vez (pkexec), crea una copia de seguridad con marca de tiempo de config.toml y escribe %1. Las ediciones pendientes de la otra página de configuración también se escriben.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>No se encontró %1. El governor SMU de Cyan Skillfish no parece estar instalado.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 está instalado, pero %2 no existe.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>El governor SMU de Cyan Skillfish está instalado y configurado.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Se canceló la autenticación.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec falló (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Acción de servicio no compatible: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 no tiene interfaz D-Bus.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>No se encontró %1. El governor SMU de Cyan Skillfish no parece estar instalado.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 está instalado, pero %2 no existe.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>El governor SMU de Cyan Skillfish está instalado y configurado.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Se canceló la autenticación.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec falló (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Acción de servicio no compatible: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 no tiene interfaz D-Bus.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctl falló (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 no está en el bus del sistema (el governor está detenido, o [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>El governor respondió en el bus, pero no se pudieron leer sus propiedades.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Se canceló la autenticación.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Método de uso de GPU no compatible: %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Fuente de temperatura no compatible: %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>gpu.set-method no compatible: %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every debe ser al menos 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals debe ser al menos 1 µs</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust no debe ser más corto que sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples debe ser 0 (desactivado) o 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events debe ser al menos 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal debe ser positivo</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst debe ser mayor que normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust no puede ser negativo</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Las frecuencias no pueden ser negativas</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min no debe superar frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target necesita 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling debe ser 0..100 °C</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery debe ser menor que temperature.throttling (o 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>Uso de la GPU</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>parchear el uso de GPU en gpu_metrics</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Escribe la carga que mide el governor en una tabla gpu_metrics parcheada y la monta (bind-mount) sobre sysfs, de modo que MangoHud, la superposición de Steam, radeontop y esta aplicación muestren un porcentaje real en lugar del error del 655%.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>parchear el reloj de GPU en hwmon</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Sustituye el freq1_input de hwmon por el reloj leído desde el SMU. Corrige el informe de frecuencia incorrecto de sysfs, sobre todo tras el desbloqueo de 8 núcleos. Independiente de fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Método de carga:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Fuente de temperatura:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Vuelca la tabla de métricas parcheada cada N ciclos de actualización (10 por defecto).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>aplicar reloj/voltaje mediante:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>los valores nuevos</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Solo se escriben las claves que gestiona esta aplicación ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]); el resto de las líneas del archivo, incluidos los comentarios y la tabla de safe points, permanecen tal cual. Antes de cada escritura se crea junto a él una copia llamada config.toml.bak-YYYYMMDD-HHMMSS.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml todavía no existe; al aplicar se crea)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recargar desde el disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Descarta las ediciones de todas las páginas y vuelve a mostrar los valores de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Reiniciar el governor después de aplicar</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>El governor lee config.toml solo al iniciar.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Aplicar cambios</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Pide su contraseña una vez (pkexec), crea una copia de seguridad con marca de tiempo de config.toml y escribe %1. Las ediciones pendientes de la otra página de configuración también se escriben.</translation>
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
        <translation>texto o expresión regular, sin distinguir mayúsculas/minúsculas</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Seguir</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Mantiene el desplazamiento en la línea más reciente. Desmarque para leer sin que se mueva.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Borrar</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Olvida las líneas mostradas hasta ahora; las entradas nuevas siguen llegando.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — conectando…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>Siguiendo journalctl -u %1; se conservan hasta %2 líneas.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>código de salida %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl se detuvo (%1). Puede que su usuario necesite pertenecer al grupo systemd-journal o wheel para leer las unidades del sistema. Reintentando en %2 s…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl terminó; reiniciando en %1 s…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl no está disponible en este sistema; no se puede mostrar el journal.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (tomado literalmente, no es una expresión regular válida)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%1 de %2 líneas coinciden%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>este usuario no puede leer el registro del kernel (añádalo al grupo systemd-journal)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k terminó con el código %1</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl no está disponible</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Por juego</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>El governor incluye un script envoltorio que aplica uno de estos ajustes a un solo programa y desactiva el modo de rendimiento al salir, lo que también restaura el rango normal. Elija lo que debe recibir el juego y copie la línea en su lanzador.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Para:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Copiar</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Copia la línea al portapapeles.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Reloj a fijar, MHz.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Límite inferior, 0 = sin límite.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Límite superior, 0 = sin límite.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Sin límite</translation>
    </message>
    <message>
        <source>to</source>
        <translation>a</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>Por debajo de esta carga, el governor reduce el reloj.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Por encima de esta carga, el governor aumenta el reloj.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Limita por encima de esta temperatura.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Reanuda los relojes normales por debajo de esta temperatura.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Fracción de 1, como en config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>El límite inferior está por encima del límite superior.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>El objetivo de carga inferior debe ser menor que el superior.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>La recuperación debe estar por debajo de la temperatura de limitación.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Copiado</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>Carga de GPU</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>Reloj de GPU</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>Temperatura de la GPU</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Potencia</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modo de rendimiento</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Copiado: %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Resumen</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>Uso de la GPU</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Ajuste</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Safe points</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Rendimiento</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Copias de seguridad</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Servicio</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Configuración</translation>
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
        <source>Load %1%</source>
        <translation>Carga %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Carga N/D</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>modo de rendimiento</translation>
    </message>
    <message>
        <source>running</source>
        <translation>en ejecución</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>no instalado</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>detenido</translation>
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
        <translation>Sigue en ejecución en la bandeja; use Salir en su menú para cerrarlo.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 cambios sin aplicar. ¿Cerrar de todos modos?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>El servicio del governor no está en ejecución.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>N/D</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>No hay sensor de frecuencia.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>No hay sensor de temperatura.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power de la tabla gpu_metrics (APU completa); el SMU lo informa en punto fijo 24.8, mostrado aquí en vatios</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>La tabla gpu_metrics no informa potencia de socket.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>sin límite</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activado</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Desactivado</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Rango actual %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus no alcanzable.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Ausente</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>En ejecución</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Con errores</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Detenido</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> páginas tienen</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> página tiene</translation>
    </message>
    <message>
        <source> and </source>
        <translation> y </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Cambios sin aplicar: %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Valores no válidos</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>No se pudo escribir config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Configuración aplicada</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, copia de seguridad: %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Guardado, pero el reinicio falló</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml se actualizó, pero no se pudo reiniciar el governor.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>No se devolvió ningún texto de error.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — el reinicio falló</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, governor reiniciado</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Aplicar safe points</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>¿Escribir %1 safe points (%2–%3 MHz) en config.toml?

El governor escalará siguiendo esta curva. Un punto que el silicio no puede sostener bloquea la placa bajo carga; primero se hace una copia de seguridad del archivo actual, que puede restaurarse desde la página Copias de seguridad.</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Safe points aplicados</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>ninguno guardado</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>No hay ningún perfil llamado '%1' (conocidos: %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Perfil '%1' cargado en los formularios; aplique para escribirlo</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Aplicar perfil</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>¿Aplicar '%1'? Los %2 cambios sin aplicar se descartarán.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Perfil no válido</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>'%1' no se puede aplicar: %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Perfil '%1' aplicado</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Perfil '%1' aplicado, governor reiniciado.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Asigne ese comando a una tecla en los ajustes de atajos de su escritorio; llega a la aplicación en ejecución y aplica el perfil.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Guardar perfil</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Nombre del perfil:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Reemplazar perfil</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>'%1' ya existe. ¿Reemplazarlo con los valores actuales del formulario?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Perfil '%1' guardado</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Eliminar perfil</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>¿Eliminar el perfil '%1'?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Perfil '%1' eliminado</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>¿Reemplazar %1 con %2?

Primero se hace una copia de seguridad del archivo actual.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
El governor se reinicia a continuación.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Restaurar copia de seguridad</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>No se pudo restaurar la copia de seguridad</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>Restaurado %1</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Governor %1 disponible (instalado %2); consulte la página Servicio</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Hay disponible una actualización del governor %1.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Exportar historial de telemetría</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>Archivos CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>No se pudo escribir el archivo CSV</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 muestras (%2–%3) escritas en %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Comparar con una exportación de telemetría anterior</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>Archivos CSV (*.csv);;Todos los archivos (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>No se pudo leer el archivo CSV</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Nada que comparar</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>El archivo no contiene muestras con una hora legible.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 muestras de referencia de %2 dibujadas en línea discontinua</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Exportar diagnósticos</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>Archivos de texto (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Error al exportar</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Diagnósticos exportados</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Guardado en %1.

Léalo antes de adjuntarlo a un informe de errores y elimine cualquier cosa que no desee compartir.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1: hecho</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1 falló</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>La prueba terminó debido a '%1' en la página Rendimiento.</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1: hecho</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1 falló</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>El governor no devolvió ningún texto de error.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Modo de rendimiento activado</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Modo de rendimiento desactivado</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Frecuencia fija %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Rango en tiempo de ejecución %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Objetivo de carga %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>no establecido</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Temperatura %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Valores en tiempo de ejecución copiados a la página Ajuste; aplique para guardarlos</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>durante %1 s</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>hasta que la detenga</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> y ejecute %1 para generar carga</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Probar un safe point</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>¿Fijar la GPU a %1 MHz a %2 mV %3%4?

El governor aplica este par tal cual y detiene su escalado automático; la limitación térmica sigue activa. Un punto que el silicio no puede sostener bloquea la placa bajo carga. No se escribe nada en config.toml. Se le pedirá su contraseña (la interfaz TestMode es exclusiva de root).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>El modo de prueba falló</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>No se pudo iniciar %1 (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Modo de prueba: %1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>abortado tras un error de GPU en el registro del kernel</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>falló</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>terminó con el código %1</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2 mientras el punto estaba fijado</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Prueba de %1 MHz @ %2 mV %3 tras %4 s</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> bajo carga de %1</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>pico %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>reloj %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>reloj %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ kernel: %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+%1 más)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>registro del kernel no vigilado</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>sin errores de GPU en el registro del kernel</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. El governor vuelve a escalar con normalidad.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>finalizado por el temporizador</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>No se pudo finalizar la prueba</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Reiniciar el governor en la página Servicio también finaliza el modo de prueba.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>El governor se detuvo; la prueba terminó con él.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, quedan %1 s</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 está cargando la GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Genere carga en la GPU usted mismo.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Registro del kernel no legible, sin detección de bloqueos.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Registro del kernel vigilado.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Probando %1 MHz @ %2 mV%3.%4%5 Observe el Resumen; Detener prueba vuelve al escalado normal.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Resumen</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>Estado en tiempo de ejecución</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Servicio del governor</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>sobrescritura de gpu_metrics</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>Sensor de carga de GPU</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (guardado)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modo de rendimiento</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>Carga, reloj y temperatura de la GPU</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Ventana:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Cuánto de los últimos %1 minutos muestra el gráfico; la exportación siempre contiene todo lo conservado.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>Exportar CSV…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Guarda cada muestra conservada (hora, carga, reloj, temperatura, potencia de socket, modo de rendimiento, rango en tiempo de ejecución) como archivo CSV.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Comparar…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Carga una exportación CSV anterior y la dibuja en línea discontinua detrás de las líneas en vivo, con la muestra más reciente en el borde derecho, y los promedios de ambas sesiones debajo del gráfico.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Borrar</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Quita la sesión de referencia del gráfico.</translation>
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
        <translation>Carga %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Temperatura °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Reloj MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Carga % (ref)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Temperatura °C (ref)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Reloj MHz (ref)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>tabla gpu_metrics</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>El BC-250 normalmente no expone un sensor gpu_busy_percent, pero el governor mide la carga por sí mismo y la publica en su tabla gpu_metrics parcheada mientras fix-metrics está activado y el servicio se ejecuta. La aplicación la lee de ahí; un sensor ausente se muestra como N/D, nunca como 0%.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>No instalado</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Activo</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>SubState: %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Con errores</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>La unidad falló; consulte el journal en la página Servicio.</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Inactivo</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>desconocido</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Montado</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>No montado</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>El governor monta (bind-mount) su tabla gpu_metrics parcheada sobre el archivo sysfs mientras fix-metrics está activado y el servicio se ejecuta.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Activado</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Desactivado</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Valor guardado en config.toml.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>No disponible</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Disponible</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>carga %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>carga N/D</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>reloj %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>temperatura %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Actual: %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. No hay sensor de carga de GPU utilizable: %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Alcanzable</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor responde en el bus del sistema.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activado</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Desactivado</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Rango actual %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>sin límite</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>No alcanzable</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Desconocido</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Requiere que el governor se ejecute con [dbus] enabled.</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>Carga, reloj y temperatura de la GPU, últimos %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (%1 min %2 s registrados)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Referencia %1 (%2): %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Ventana en vivo (%1): %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>No hay una tabla gpu_metrics v2.x legible bajo /sys/class/drm/card*/device.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (parcheada)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (en bruto)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>ninguno</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Tabla tal como la publica el governor (fix-metrics): la actividad GFX es su propia medición.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Tabla en bruto del kernel: la actividad GFX es el valor roto del firmware (el error del 655%); active fix-metrics para obtener uno real.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Tabla en bruto del kernel.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Rendimiento</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualizar</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Controles en tiempo de ejecución mediante D-Bus (com.cyanskillfish.Governor): se aplican de inmediato, no requieren contraseña y se pierden en el siguiente reinicio del governor. config.toml no se modifica; use la página Ajuste para guardar los valores de forma permanente. El modo de rendimiento abre todo el rango de los safe points; una frecuencia fija bloquea el reloj; el objetivo de carga y los umbrales de temperatura cambian cómo escala el governor sin tocar el modo.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>Estado en tiempo de ejecución</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modo de rendimiento</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Rango actual</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Rango al inicio ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Rango permitido (safe points)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Objetivo de carga (inferior / superior)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Temperatura (limitación / recuperación)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Controles</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Modo de rendimiento: desactivado</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled: on permite que el governor use todo el rango permitido y reaccione más rápido a la carga; off vuelve al rango con el que inició el governor.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Modo:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency: modo de rendimiento con el reloj fijado aquí. Debe estar dentro del rango permitido.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Fijar reloj</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Frecuencia fija:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Sin límite</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Límite inferior de reloj por ahora; Sin límite = el safe point más bajo.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Límite superior de reloj por ahora; Sin límite = el safe point más alto.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Establecer rango</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max): un rango temporal, sale del modo de rendimiento.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>a</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Rango en tiempo de ejecución:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>Por debajo de esta carga de GPU, el governor reduce el reloj.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Por encima de esta carga de GPU, el governor aumenta el reloj.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Establecer objetivo de carga</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper): la banda de carga en la que el governor mantiene la GPU, hasta el siguiente reinicio. No afecta al modo de rendimiento.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Objetivo de carga:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Por encima de esta temperatura, el governor reduce el reloj máximo.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>No establecido</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>Por debajo de esta temperatura se vuelve a permitir todo el rango; No establecido = la histéresis propia del governor.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Establecer temperaturas</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery): hasta el siguiente reinicio. No afecta al modo de rendimiento.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Temperatura:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Copiar valores en tiempo de ejecución a la página Ajuste</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Coloca el rango actual, el objetivo de carga y las temperaturas en el formulario de Ajuste para que pueda guardarlos en config.toml.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Alcanzable</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor responde en el bus del sistema.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activado</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Desactivado</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Propiedad Enabled de la interfaz PerformanceMode.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Modo de rendimiento: activado</translation>
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
        <translation>no establecido</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>No alcanzable</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Desconocido</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>El servicio del governor no está en ejecución (página Servicio).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus está desactivado en config.toml: actívelo en la página Ajuste y aplique con un reinicio.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>El governor no respondió en el bus del sistema.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>Los controles están desactivados: %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>el objetivo de carga inferior debe ser menor que el superior</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>la recuperación debe estar por debajo de la temperatura de limitación (o No establecido)</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>Perfiles</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>Instantáneas con nombre de esta página y de la página Uso de la GPU, guardadas solo para su usuario. Los safe points no forman parte de un perfil.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>Cargar en los formularios</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Rellena los formularios de Ajuste y Uso de la GPU; no se escribe nada hasta que aplique.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Aplicar ahora</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Escribe el perfil en config.toml (copia de seguridad primero, una sola solicitud de contraseña) y reinicia el governor. Las ediciones pendientes en las páginas de configuración se descartan.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Guardar actual como…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Guarda los valores de los formularios tal como están ahora (aplicados o no) bajo un nombre.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Eliminar</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Copiar comando de atajo</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Pone en el portapapeles una línea de comando que aplica este perfil en la aplicación en ejecución. Asígnela a una tecla en Configuración del sistema → Atajos (KDE) o Teclado → Atajos personalizados (GNOME) para cambiar de perfil sin abrir la ventana.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Todavía no hay perfiles: configure los formularios y use Guardar actual como…</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Safe points</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recargar desde el disco</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>Los [[safe-points]] de %1 definen la curva de frecuencia/voltaje según la cual escala el governor. Nunca sale del rango entre el punto más bajo y el más alto; [frequency-range] y los controles en tiempo de ejecución quedan limitados a él. Edite con cuidado: unos voltajes incorrectos pueden bloquear o dañar la placa. Aplicar comprueba primero las reglas del governor y los límites rígidos (%2–%3 mV, hasta %4 MHz), y hace una copia de seguridad.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Puntos</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Frecuencia</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Voltaje</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Añadir punto</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Añade un punto después del seleccionado, a mitad de camino hacia el siguiente.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Quitar</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Ordenar</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Ordena las filas por frecuencia (Aplicar lo hace de todos modos).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Curva</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Aplicar safe points</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Escribe los bloques [[safe-points]] en config.toml (pide su contraseña, hace primero una copia de seguridad).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Reiniciar el governor después</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>El governor lee config.toml solo al iniciar.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Revertir</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Vuelve a los puntos del archivo.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valores predeterminados de fábrica</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>Los puntos activos del default-config.toml del governor: %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Probar un punto antes de guardarlo (en tiempo de ejecución, root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode mediante D-Bus fija esta frecuencia y voltaje de inmediato y detiene el escalado automático; la limitación térmica del governor sigue activa. No se escribe nada en config.toml y el governor aplica el par tal cual, así que manténgase dentro de los límites rígidos. Genere carga en la GPU mientras se ejecuta. Detener prueba (o el temporizador) desactiva el modo de rendimiento, lo que vuelve al escalado normal con el rango de inicio. Un punto que el silicio no puede sostener bloquea la placa; guarde su trabajo antes.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Carga:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Un generador de carga de GPU encontrado en PATH, iniciado con la prueba y terminado cuando acaba. Si muere mientras el punto está fijado, se informa de ello.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>No se encontró ninguna herramienta de carga (vkmark, glmark2, vkcube o glxgears): ejecute usted mismo un juego o benchmark durante la prueba.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Precargado desde la fila seleccionada; edítelo libremente.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>Hasta que se detenga</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>La aplicación finaliza la prueba por sí misma tras este tiempo (0 = solo con Detener prueba).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Frecuencia:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Voltaje:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Para:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Iniciar prueba</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Pide su contraseña (pkexec): la interfaz TestMode es exclusiva de root.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Detener prueba</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Añadir a la tabla</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Coloca este par de frecuencia/voltaje en la tabla de safe points de arriba (ordenada por frecuencia, reemplazando un punto en la misma frecuencia). Aplique para guardar.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Averiguar hasta dónde puede llegar su propia placa (mayor frecuencia máxima, voltajes menores) es tarea de %1: prueba un paso a la vez bajo una carga verificada y puede instalar el resultado. Edite los puntos a mano solo si sabe lo que tolera el silicio.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 puntos: %2 MHz @ %3 mV hasta %4 MHz @ %5 mV.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>No hay [[safe-points]]; el governor recurriría a 350 MHz @ 700 mV y 2000 MHz @ 1000 mV.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>eleva la frecuencia máxima de %1 a %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>reduce el voltaje en %1 punto(s) existente(s)</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Este cambio %1: un punto inestable puede bloquear la placa bajo carga. Verifíquelo primero con bc250-gpu-oc-bisect.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> y </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>sin límite</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor (D-Bus): rango permitido %1–%2 MHz, rango actual %3–%4 MHz.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz está por encima de %2 MHz, donde muchas placas se bloquean por completo</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV está por encima de %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>la curva de arriba daría %1 mV a %2 MHz; esto es menor</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>La interfaz D-Bus del governor no es alcanzable (servicio detenido o [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Servicio</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Buscar actualizaciones</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Compara el RPM instalado con la última versión publicada en GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Exportar diagnósticos…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Guarda versiones, config.toml, el estado del servicio, el journal y la tabla gpu_metrics en bruto en un archivo de texto para un informe de errores.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualizar</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Unidad encontrada</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Activo</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Activado en el arranque</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>sobrescritura de gpu_metrics</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Versión</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Iniciar</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Detener</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Reiniciar</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Activar en el arranque</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Desactivar en el arranque</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (pide su contraseña).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Journal (en vivo)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Sí</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>No — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Sí (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>No (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>no cargado</translation>
    </message>
    <message>
        <source>No</source>
        <translation>No</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>notas de la versión</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>versiones</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Paquete no instalado</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Comprobando…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Configuración</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Estos ajustes afectan a la aplicación, no al governor. Se guardan por usuario.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Bandeja del sistema</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Mostrar un icono en la bandeja con la carga, el reloj y la temperatura de la GPU en su descripción emergente</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Cerrar la ventana mantiene la aplicación en ejecución en la bandeja</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Haga clic izquierdo en el icono de la bandeja para mostrar u ocultar la ventana; el menú también alterna el modo de rendimiento (cuando D-Bus es alcanzable) y cierra la aplicación.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>Este escritorio no ofrece bandeja del sistema (en GNOME, instale la extensión AppIndicator).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Iniciar al acceder</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Iniciar la aplicación al iniciar sesión</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…oculta en la bandeja, sin abrir la ventana</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Actualizaciones del governor</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Buscar una versión más reciente del governor al iniciar la aplicación</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Una solicitud a api.github.com para la última versión de filippor/cyan-skillfish-governor, comparada con el RPM instalado. No se envía nada más. La página Servicio tiene la misma comprobación como botón.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Alertas</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Notificar cuando la temperatura de la GPU alcance</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Notificar cuando el governor empiece a limitar por temperatura</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Notificar cuando el servicio del governor se detenga o falle por sí solo</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Se muestran como notificaciones de escritorio a través del icono de la bandeja (en la barra de estado cuando la bandeja está desactivada). Un mensaje por evento: una alerta de temperatura se rearma una vez que la GPU se ha enfriado 5 °C por debajo de su umbral, y la misma alerta se repite como mucho cada 5 minutos.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>No se pudo escribir %1: %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Entrada: %1
Comando: %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Escribe una entrada de escritorio en %1; no se instala nada a nivel de todo el sistema.</translation>
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
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Ya hay una herramienta de carga en ejecución.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>No se encontró %1 en PATH.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 no se inició: %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>carga %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>reloj %1 MHz (máx. %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (máx. %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>sin lecturas</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Ocultar ventana</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Modo de rendimiento</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Aplicar perfil</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Salir</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Mostrar ventana</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Ajuste</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Preajuste:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>El formulario no coincide con ningún preajuste.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Rellena el formulario de abajo; no se escribe nada hasta que aplique.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>límites de reloj al inicio</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Reloj más bajo que puede elegir el governor. 0 (Sin límite) = safe point más bajo.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Reloj más alto que puede elegir el governor. 0 (Sin límite) = safe point más alto.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Mínimo:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Máximo:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>Los valores fuera de la tabla de safe points de config.toml quedan limitados por el governor.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>cuándo cambiar el reloj</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>Carga de GPU por encima de la cual el governor sube el reloj (superior).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>Carga de GPU por debajo de la cual el governor baja el reloj (inferior).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Subir por encima de:</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Bajar por debajo de:</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Un margen amplio mantiene el reloj estable; un margen estrecho sigue la carga de cerca. Valores predeterminados del governor cuando falta la sección: 95 % / 80 %.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>limitación térmica</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Por encima de esta temperatura de GPU, el governor reduce el reloj (85 por defecto).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>No establecido</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>Por debajo de esta temperatura termina la limitación. Debe ser menor que la temperatura de limitación; No establecido deja la clave fuera de config.toml.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Limitar por encima de:</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Recuperar por debajo de:</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>control en tiempo de ejecución</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>publicar com.cyanskillfish.Governor en el bus del sistema</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Necesario para la página Rendimiento de esta aplicación y para el envoltorio de lanzamiento cyan-skillfish-performance-mode.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>bucle de control</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>con qué frecuencia se muestrea el indicador de ocupación de la GPU (2000 µs por defecto del governor, 250 µs en el archivo de fábrica). Usado por el método de carga busy-flag.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>con qué frecuencia se recalcula el objetivo de reloj (10 × sample por defecto del governor, 100 000 µs en el archivo de fábrica). No debe ser más corto que el intervalo de muestreo.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Muestrear cada:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Ajustar cada:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>con qué rapidez se mueve el reloj hacia su objetivo (1 MHz/ms por defecto).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>tasa de subida en modo ráfaga; debe ser superior a la tasa normal (200 × normal por defecto del governor, 50 MHz/ms en el archivo de fábrica).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Tasa de subida:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Tasa de subida en ráfaga:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> muestras</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Desactivado</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>este número de muestras de ocupación seguidas cambia a la tasa de subida en ráfaga, de modo que un juego que carga la GPU de repente obtiene su reloj rápidamente (1..%1; Desactivado deja la clave fuera, 60 en el archivo de fábrica).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Ráfaga después de:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> eventos</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>ciclos de ajuste con la carga por debajo del objetivo inferior antes de que el reloj baje (10 por defecto del governor, 5 en el archivo de fábrica). Mayor = reloj más persistente.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Bajar después de:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Un muestreo y ajuste más rápidos reaccionan antes pero cuestan tiempo de CPU. El modo ráfaga acorta el retraso cuando arranca un juego; más down-events evitan que el reloj baje durante pausas cortas.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>banda muerta</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>un cambio de reloj sin ráfaga menor que esto no se aplica (10 por defecto). Evita escrituras mínimas constantes al SMU.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Ignorar cambios por debajo de:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>las secciones de ajuste</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>El governor informa de un rango de safe points de %1–%2 MHz; los valores fuera de él quedan limitados.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recargar desde el disco</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Descarta las ediciones de todas las páginas y vuelve a mostrar los valores de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Reiniciar el governor después de aplicar</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>El governor lee config.toml solo al iniciar.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Aplicar cambios</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Pide su contraseña una vez (pkexec), crea una copia de seguridad con marca de tiempo de config.toml y escribe %1. Las ediciones pendientes de la otra página de configuración también se escriben.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>no instalado</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (última versión: desconocida — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (última versión: desconocida)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2 disponible (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (actualizado, última versión %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (última versión: %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Muestrea el único bit de ocupación de la GPU en timing.intervals.sample (predeterminado). El más económico, funciona en todas partes.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Escanea todos los procesos que mantienen la GPU abierta. Más trabajo de CPU que busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Lee la propia cifra de carga del kernel. Necesita un kernel parcheado, que el Bazzite de serie no tiene.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>ioctl AMDGPU_INFO_SENSOR_GPU_TEMP; mantiene abierto un identificador de dispositivo DRM mientras se ejecuta el governor (predeterminado).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Lee en su lugar el temp1_input de hwmon de amdgpu, así que no queda ningún cliente DRM abierto. El mismo sensor.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Se comunica directamente con el SMU (API de bc250collective); aplica el voltaje de los safe points junto con el reloj (predeterminado).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Pasa por la interfaz sysfs de amdgpu (pp_od_clk_voltage) en lugar del SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valores predeterminados de fábrica</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Silencioso</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Reactivo</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Reloj máximo</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>Los valores del config.toml que instala el paquete del governor.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>Los relojes más bajos que aún siguen el ritmo: sube tarde, llega como máximo a 1500 MHz, limita a 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Sube pronto y permite todo el rango seguro, a costa de más calor y potencia.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Se mantiene cerca de la parte alta del rango seguro; parecido a un reloj fijo, dejando activa la limitación térmica.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Personalizado</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Sin límite</translation>
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
&lt;a href="https://github.com/RobertoTorino/bc250-gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
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
&lt;p&gt;Un pequeño front-end para &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, el governor de GPU del &lt;b&gt;AMD BC-250&lt;/b&gt;
(APU Cyan Skillfish, gfx1013) en &lt;b&gt;Bazzite&lt;/b&gt;. El governor debe estar ya instalado; esta aplicación
edita una sección de su configuración y controla su servicio systemd. No se toca nada más en el
sistema.&lt;/p&gt;

&lt;h2&gt;Resumen&lt;/h2&gt;
&lt;p&gt;Muestra si el servicio se ejecuta, si la tabla &lt;code&gt;gpu_metrics&lt;/code&gt; parcheada del governor está
montada sobre sysfs, si hay disponible un sensor de carga de GPU, y un gráfico de la carga de GPU (%), la temperatura (°C, eje
izquierdo) y el reloj (MHz, eje derecho). Una lectura ausente deja un hueco, nunca un cero falso. La aplicación conserva la última hora
de muestras (una cada dos segundos) mientras se ejecuta; &lt;b&gt;Ventana&lt;/b&gt; elige cuánto de ella muestra el gráfico (2, 10, 30 o
60 minutos) y &lt;b&gt;Exportar CSV…&lt;/b&gt; escribe cada muestra conservada (hora, carga, reloj, temperatura, potencia de socket,
modo de rendimiento, rango en tiempo de ejecución) en un archivo. &lt;b&gt;Comparar…&lt;/b&gt; carga un archivo de ese tipo y lo dibuja en línea discontinua detrás
de las líneas en vivo (muestra más reciente en el borde derecho, igual que la ventana en vivo) y coloca los promedios y
picos de ambas sesiones debajo del gráfico (carga, reloj, temperatura, potencia de socket), de modo que un cambio de perfil o de safe point pueda juzgarse
frente a una ejecución anterior; &lt;b&gt;Borrar&lt;/b&gt; lo elimina.&lt;/p&gt;
&lt;p&gt;El recuadro de &lt;b&gt;tabla gpu_metrics&lt;/b&gt; descodifica la tabla que expone el kernel (o el governor): actividades, temperaturas,
potencia de socket/GFX/CPU, los relojes de GFX, SoC, memoria y fabric, el estado de limitación y los relojes de los núcleos de CPU.
&lt;i&gt;(parcheada)&lt;/i&gt; significa que está montada la tabla del governor; &lt;i&gt;(en bruto)&lt;/i&gt; es la propia tabla del kernel, cuya actividad GFX
en un BC-250 es el valor roto del 655% y no se usa como carga.&lt;/p&gt;
&lt;p&gt;El BC-250 normalmente no tiene sensor &lt;code&gt;gpu_busy_percent&lt;/code&gt;, pero el governor mide la carga por sí mismo y,
con &lt;b&gt;fix-metrics&lt;/b&gt; activado, la publica en la tabla &lt;code&gt;gpu_metrics&lt;/code&gt; parcheada que monta sobre sysfs. La aplicación
lee la carga de ahí; &lt;code&gt;gpu_busy_percent&lt;/code&gt; y &lt;code&gt;radeontop&lt;/code&gt; son alternativas de reserva. Sin ninguna
fuente muestra &lt;b&gt;N/D&lt;/b&gt;, nunca un 0% engañoso, y la descripción emergente indica qué falta. El reloj y la temperatura de la GPU provienen de los sensores
hwmon de amdgpu; con &lt;code&gt;fix-freq&lt;/code&gt; activado, el reloj es el valor real del SMU.&lt;/p&gt;

&lt;h2&gt;Uso de la GPU&lt;/h2&gt;
&lt;p&gt;Edita la sección &lt;code&gt;[gpu-usage]&lt;/code&gt; de &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Clave&lt;/th&gt;&lt;th&gt;Predeterminado&lt;/th&gt;&lt;th&gt;Significado&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Escribe la carga medida en una tabla &lt;code&gt;gpu_metrics&lt;/code&gt; parcheada
y la monta (bind-mount) sobre sysfs. Corrige el uso de GPU del 655% de MangoHud, la superposición de Steam y radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Parchea también &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; con el reloj leído
desde el SMU. Corrige la frecuencia incorrecta de sysfs, sobre todo tras el desbloqueo de 8 núcleos. Independiente de fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; muestrea el bit de ocupación de la GPU;
&lt;i&gt;process&lt;/i&gt; escanea todos los procesos que usan la GPU (más trabajo de CPU); &lt;i&gt;kernel&lt;/i&gt; necesita un kernel parcheado.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Dónde se lee la temperatura de la GPU: el ioctl de DRM (mantiene abierto un
identificador de DRM) o el archivo &lt;code&gt;temp1_input&lt;/code&gt; de hwmon. El mismo sensor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Vuelca la tabla parcheada cada N ciclos de actualización.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;Y la sección &lt;code&gt;[gpu]&lt;/code&gt;: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, el valor predeterminado, aplica el reloj y el voltaje directamente
a través del SMU; &lt;i&gt;kernel&lt;/i&gt; pasa en su lugar por la interfaz sysfs de amdgpu).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Aplicar cambios&lt;/b&gt; (en esta página o en Ajuste) pide su contraseña una vez (pkexec). Copia el archivo actual
en &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; y escribe las ediciones pendientes de ambas páginas. Solo cambian las claves
conocidas; el resto de las líneas del archivo, incluidos los comentarios, se conservan. El governor lee el archivo al iniciar, así que
el servicio se reinicia después, a menos que desmarque esa opción.&lt;/p&gt;

&lt;h2&gt;Ajuste&lt;/h2&gt;
&lt;p&gt;Edita las demás secciones de &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Sección&lt;/th&gt;&lt;th&gt;Claves&lt;/th&gt;&lt;th&gt;Significado&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Límites de reloj en MHz con los que inicia el governor. &lt;i&gt;Sin límite&lt;/i&gt;
(0) deja el límite abierto; los valores fuera de la tabla de safe points quedan limitados por el governor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Sube el reloj cuando la carga está por encima de &lt;i&gt;upper&lt;/i&gt;,
lo baja cuando está por debajo de &lt;i&gt;lower&lt;/i&gt;. Un margen amplio mantiene el reloj estable, uno estrecho sigue la carga de cerca.
Los valores predeterminados propios del governor cuando falta la sección son 95% / 80%; el archivo de fábrica usa 65% / 50%.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Limita por encima del primer valor (85 °C
por defecto); se recupera por debajo del segundo, que es opcional (&lt;i&gt;No establecido&lt;/i&gt;) y debe ser menor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Publica &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; en el bus del sistema. La
página Rendimiento lo necesita; el archivo de fábrica lo activa, el valor predeterminado propio del governor es desactivado.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;El bucle de control: con qué frecuencia se muestrea la carga y se ajusta el reloj (µs), con qué rapidez el reloj
se mueve hacia su objetivo (MHz/ms), cuántas muestras de ocupación seguidas cambian a la rampa rápida de ráfaga (&lt;i&gt;Desactivado&lt;/i&gt; deja
fuera la clave), y cuántos ciclos de ajuste con carga baja pasan antes de que el reloj baje. Valores predeterminados del governor: 2000 µs /
10 × sample, 1 / 200 × normal, desactivado, 10; el archivo de fábrica usa 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Banda muerta en MHz: un cambio sin ráfaga menor que esto
no se aplica (10 por defecto).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Preajustes&lt;/b&gt; rellenan de una vez el rango de frecuencia, el objetivo de carga y la temperatura (timing se deja intacto): &lt;i&gt;Valores predeterminados de fábrica&lt;/i&gt; (la configuración del paquete), &lt;i&gt;Silencioso&lt;/i&gt; (relojes más
bajos, subida tardía), &lt;i&gt;Reactivo&lt;/i&gt; (subida temprana, rango completo) y &lt;i&gt;Reloj máximo&lt;/i&gt; (se mantiene cerca del máximo).
El cuadro desplegable muestra &lt;i&gt;Personalizado&lt;/i&gt; en cuanto un valor difiere de todos los preajustes. Las combinaciones no válidas (mínimo por encima
del máximo, recuperación no por debajo de la limitación, intervalo de ajuste más corto que el de muestreo, tasa de ráfaga no superior a la normal) se señalan
bajo el formulario y bloquean Aplicar.&lt;/p&gt;
&lt;p&gt;Los &lt;b&gt;perfiles&lt;/b&gt; son instantáneas con nombre de todos los valores de esta página y de la página Uso de la GPU (los safe points no
están incluidos), guardadas para su usuario en &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Guardar actual como…&lt;/i&gt; guarda lo que muestran los formularios ahora mismo, aplicado o no. &lt;i&gt;Cargar en los formularios&lt;/i&gt; rellena ambas
páginas para que pueda revisar y aplicar como de costumbre; &lt;i&gt;Aplicar ahora&lt;/i&gt; escribe el perfil en &lt;code&gt;config.toml&lt;/code&gt;
(copia de seguridad primero, una sola solicitud de contraseña), descarta las ediciones pendientes y reinicia el governor. Con el icono de la bandeja activado, el
submenú &lt;i&gt;Aplicar perfil&lt;/i&gt; del menú de la bandeja hace lo mismo sin abrir la ventana. Para un &lt;b&gt;atajo de teclado&lt;/b&gt;,
&lt;i&gt;Copiar comando de atajo&lt;/i&gt; pone &lt;code&gt;bc250-governor-manager --profile 'Nombre'&lt;/code&gt; en el portapapeles; asígnelo en
Configuración del sistema → Atajos (KDE) o Teclado → Atajos personalizados (GNOME). La aplicación se ejecuta una vez por usuario: ese comando
llega a la instancia en ejecución a través de un socket local y aplica el perfil ahí (una solicitud de contraseña, aviso en la
bandeja), o inicia la aplicación y lo aplica cuando no hay nada en ejecución. Un segundo lanzamiento simple solo muestra la ventana.
&lt;code&gt;--list-profiles&lt;/code&gt; imprime los nombres guardados.&lt;/p&gt;

&lt;h2&gt;Safe points&lt;/h2&gt;
&lt;p&gt;Los &lt;code&gt;[[safe-points]]&lt;/code&gt; de &lt;code&gt;%3&lt;/code&gt; como una tabla editable y una curva de frecuencia/voltaje.
El governor escala siguiendo esta curva y nunca sale de su rango; &lt;code&gt;[frequency-range]&lt;/code&gt; y los controles en tiempo de ejecución
quedan limitados a él. &lt;b&gt;Añadir punto&lt;/b&gt; inserta a mitad de camino hacia el siguiente punto, &lt;b&gt;Quitar&lt;/b&gt; elimina la fila
seleccionada, &lt;b&gt;Valores predeterminados de fábrica&lt;/b&gt; carga la propia tabla del governor, &lt;b&gt;Revertir&lt;/b&gt; vuelve al archivo. Antes
de que se habilite &lt;b&gt;Aplicar safe points&lt;/b&gt;, la lista debe superar las reglas del governor (al menos dos puntos, frecuencias
únicas, el voltaje nunca disminuye al subir la frecuencia) y los límites rígidos compartidos con bc250-gpu-oc-bisect
(700–1100 mV, hasta 2500 MHz). Por encima de 2000 MHz o 1000 mV, o cuando un cambio eleva la frecuencia máxima o reduce un
voltaje existente, aparece una advertencia: un punto inestable bloquea la placa bajo carga. Aplicar hace una copia de seguridad y
pide su contraseña; encontrar con seguridad el límite propio de una placa es tarea de
&lt;a href="https://github.com/RobertoTorino/bc250-gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Probar un punto antes de guardarlo&lt;/b&gt; usa la interfaz D-Bus &lt;code&gt;TestMode&lt;/code&gt; del governor, exclusiva de root
(una solicitud de &lt;code&gt;pkexec&lt;/code&gt;): la GPU se fija a la frecuencia y el voltaje que introduzca y el escalado
automático se detiene, mientras la limitación térmica sigue activa. No se escribe nada en &lt;code&gt;config.toml&lt;/code&gt;. Los
campos se precargan desde la fila seleccionada; aparece una advertencia por encima de 2000 MHz / 1000 mV o cuando el voltaje es
inferior al que daría la curva de arriba. &lt;b&gt;Carga&lt;/b&gt; elige un generador de carga de GPU encontrado en PATH (vkmark, glmark2,
vkcube o glxgears, en ese orden de preferencia); se inicia con la prueba y se termina cuando esta acaba,
y si muere mientras el punto está fijado, el estado lo indica. Si no hay ninguno, genere carga en la GPU usted mismo y observe el
Resumen. &lt;b&gt;Detener prueba&lt;/b&gt;, el temporizador (60 s por defecto, &lt;i&gt;Hasta que se detenga&lt;/i&gt; = 0), cerrar la aplicación, o cualquier acción en
la página Rendimiento finaliza la prueba desactivando el modo de rendimiento, lo que devuelve al governor al escalado
normal con su rango de inicio. La línea de resultado informa entonces de cuánto tiempo se mantuvo el punto, la temperatura máxima
y el rango de reloj observado; &lt;b&gt;Añadir a la tabla&lt;/b&gt; coloca el par probado en la tabla de safe points (ordenada, reemplazando
un punto en la misma frecuencia) para que pueda aplicarlo. Mientras un punto está fijado se vigila el &lt;b&gt;registro del kernel&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) en busca de problemas de amdgpu (tiempos de espera del anillo, reinicios de GPU, líneas
&lt;code&gt;*ERROR*&lt;/code&gt;, fallos del SMU); la primera línea de ese tipo aborta la prueba de inmediato, liberando el punto antes de que la placa se bloquee,
y se cita en el resultado. Una ejecución limpia también lo indica. Leer el anillo del kernel requiere pertenecer al grupo
&lt;code&gt;systemd-journal&lt;/code&gt; (o &lt;code&gt;wheel&lt;/code&gt;); de lo contrario el estado indica que el registro no se vigila y
la prueba se ejecuta a ciegas. Un punto que el silicio no puede sostener puede bloquear la placa más rápido de lo que el kernel puede registrarlo,
así que guarde su trabajo primero. Solo el governor smu tiene D-Bus.&lt;/p&gt;

&lt;h2&gt;Rendimiento&lt;/h2&gt;
&lt;p&gt;Control en tiempo de ejecución del governor mediante D-Bus, exactamente lo que hace el propio envoltorio
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; del governor. Los cambios se aplican de inmediato, no requieren contraseña y se
pierden en el siguiente reinicio del governor; &lt;code&gt;config.toml&lt;/code&gt; no se modifica. &lt;i&gt;Copiar valores en tiempo de ejecución a la página Ajuste&lt;/i&gt;
traslada el rango y los umbrales actuales a la página Ajuste para que pueda guardarlos.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Modo de rendimiento&lt;/b&gt; es un interruptor (rojo mientras está activado): activado abre todo el rango permitido (safe points); desactivado vuelve
al rango de &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Fijar reloj&lt;/b&gt; fija la frecuencia y activa el modo de rendimiento.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Establecer rango&lt;/b&gt; aplica un mínimo/máximo en tiempo de ejecución.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Establecer objetivo de carga&lt;/b&gt; y &lt;b&gt;Establecer temperaturas&lt;/b&gt; cambian la banda de carga (% inferior/superior) y las temperaturas
de limitación/recuperación con las que escala el governor, sin tocar el modo de rendimiento ni una prueba de safe point en curso.
Los campos siguen los valores actuales del governor y se rellenan de nuevo cuando cambian; los pares imposibles (inferior no
por debajo de superior, recuperación no por debajo de la limitación) desactivan el botón.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Los controles se desactivan cuando el servicio no está en ejecución o el nombre del bus no está publicado; el motivo se muestra
bajo los controles. Active &lt;code&gt;[dbus] enabled&lt;/code&gt; en la página Ajuste y reinicie el governor si es necesario.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Por juego&lt;/b&gt; construye la línea de lanzamiento para el envoltorio &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; del governor:
modo de rendimiento simple, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; o
&lt;code&gt;--temperature&lt;/code&gt;, precargada con los números actuales del governor, formateada para las opciones de lanzamiento de Steam
(&lt;code&gt;… %command%&lt;/code&gt;), un comando envoltorio de Heroic/Lutris, o un terminal. &lt;b&gt;Copiar&lt;/b&gt; la pone en el portapapeles.
El envoltorio aplica el ajuste, ejecuta el juego, y desactiva el modo de rendimiento al salir, lo que también devuelve al
governor a su rango de inicio. Necesita D-Bus activado, igual que los controles de arriba.&lt;/p&gt;

&lt;h2&gt;Copias de seguridad&lt;/h2&gt;
&lt;p&gt;Cada escritura crea una copia &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; junto a la configuración. La página las lista,
muestra la diferencia entre una copia y el archivo actual, y &lt;b&gt;Restaurar la seleccionada&lt;/b&gt; repone la copia (primero se respalda el archivo
actual, se pide la contraseña una vez). El governor se reinicia después, a menos que desmarque esa opción.&lt;/p&gt;

&lt;h2&gt;Servicio&lt;/h2&gt;
&lt;p&gt;Inicia, detiene, reinicia, activa o desactiva &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, con la salida de
&lt;code&gt;systemctl status&lt;/code&gt; y un &lt;b&gt;journal en vivo&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, las últimas 200 líneas y
todo lo que sigue mientras se muestra la página, hasta 2000 conservadas). El cuadro de filtro acepta texto o una expresión
regular, sin distinguir mayúsculas/minúsculas; desmarque &lt;b&gt;Seguir&lt;/b&gt; para leer sin que se desplace. Leer unidades del sistema requiere que su
usuario esté en el grupo &lt;code&gt;wheel&lt;/code&gt; o &lt;code&gt;systemd-journal&lt;/code&gt;, lo cual es el caso en Bazzite. Cada acción del
servicio pide su contraseña.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Buscar actualizaciones&lt;/b&gt; compara el RPM &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; instalado con la última
versión de &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
en GitHub (una solicitud a api.github.com; también se ejecuta al iniciar a menos que se desactive en Configuración). Una versión más reciente se
muestra en naranja con un enlace a sus notas. Actualice el paquete de la forma en que lo instaló: COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; mediante &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; si está en capas, o el archivo tar de la versión.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Exportar diagnósticos…&lt;/b&gt; escribe un archivo de texto para un informe de errores: versiones de la aplicación, el governor y Bazzite, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; y sus copias de seguridad, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, las últimas 300 líneas
del journal, la interfaz D-Bus, la línea de comandos del kernel, los mensajes del kernel de amdgpu, los sensores hwmon, y la tabla
&lt;code&gt;gpu_metrics&lt;/code&gt; en bruto (analizada y como volcado hexadecimal). Lea el archivo y elimine lo que no desee
compartir antes de adjuntarlo a un issue.&lt;/p&gt;

&lt;h2&gt;Configuración&lt;/h2&gt;
&lt;p&gt;Ajustes de la aplicación, guardados por usuario. &lt;b&gt;Bandeja del sistema&lt;/b&gt;: muestra un icono de bandeja cuya descripción emergente lleva la carga, el reloj,
la temperatura, el modo de rendimiento y el estado del governor de la GPU; el clic izquierdo muestra u oculta la ventana, el menú alterna el
modo de rendimiento (cuando D-Bus es alcanzable) y cierra la aplicación. Con &lt;i&gt;Cerrar la ventana mantiene la aplicación en ejecución en la
bandeja&lt;/i&gt; marcado, el botón de cerrar ventana la oculta en la bandeja en lugar de cerrarla; use el menú de la bandeja para cerrarla.
&lt;b&gt;Iniciar al acceder&lt;/b&gt; escribe &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (nada
a nivel de todo el sistema), opcionalmente iniciando oculta en la bandeja con &lt;code&gt;--start-in-tray&lt;/code&gt;. La sesión KDE Plasma
de Bazzite tiene una bandeja nativa, así que esto funciona de serie; una sesión GNOME necesitaría la extensión AppIndicator.
Las &lt;b&gt;alertas&lt;/b&gt; son notificaciones de escritorio a través del icono de la bandeja (solo en la barra de estado cuando la bandeja está desactivada): que la GPU alcance
una temperatura que elija, que la GPU alcance la propia temperatura de limitación del governor (el valor en tiempo de ejecución cuando D-Bus
es alcanzable, si no el de &lt;code&gt;config.toml&lt;/code&gt;), y que el servicio del governor se detenga o falle después de que la
aplicación lo haya visto en ejecución. Una alerta de temperatura se dispara una vez por cruce y se rearma 5 °C por debajo de su umbral; la
misma alerta se repite como mucho cada 5 minutos.&lt;/p&gt;

&lt;h2&gt;El governor tt anterior&lt;/h2&gt;
&lt;p&gt;Iniciado con &lt;code&gt;--backend tt&lt;/code&gt; (o automáticamente cuando solo está cargado &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;),
la aplicación gestiona en su lugar &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. Ese governor no tiene
fix-metrics, rango de frecuencia, D-Bus ni versiones en GitHub, así que las páginas Uso de la GPU y Rendimiento, esas secciones de Ajuste,
el campo &lt;code&gt;down-events&lt;/code&gt; y la comprobación de actualizaciones están ocultos, y el sensor de carga de GPU permanece
no disponible. Todo lo demás, incluidos &lt;code&gt;[timing]&lt;/code&gt; y &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, funciona
igual.&lt;/p&gt;

&lt;h2&gt;Privilegios&lt;/h2&gt;
&lt;p&gt;La aplicación se ejecuta como su usuario normal. Solo cuatro cosas necesitan root y pasan por &lt;code&gt;pkexec&lt;/code&gt;:
la copia de seguridad, la escritura de &lt;code&gt;config.toml&lt;/code&gt;, las acciones de &lt;code&gt;systemctl&lt;/code&gt; y la prueba de safe point
(&lt;code&gt;busctl&lt;/code&gt; sobre la interfaz TestMode, exclusiva de root). La contraseña la gestiona
el agente polkit del escritorio; la aplicación nunca la ve.&lt;/p&gt;

&lt;h2&gt;Instalación y actualización&lt;/h2&gt;
&lt;p&gt;El archivo tar de la versión contiene &lt;code&gt;install.sh&lt;/code&gt;. Instala la aplicación solo para su usuario (un venv privado
con PyQt6 bajo &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, el lanzador
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, una entrada de escritorio y el icono), de modo que aparece en el
menú de aplicaciones. Ejecútelo de nuevo desde una versión más reciente para actualizar; &lt;code&gt;./install.sh --uninstall&lt;/code&gt; la elimina.
No se añade nada en capas con rpm-ostree y la configuración del governor nunca se toca.&lt;/p&gt;

&lt;h2&gt;Enlaces&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Esta aplicación: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;El governor (filippor, rama SMU): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Publicado bajo la licencia GNU General Public License v3.0 o posterior. Se incluye la fuente Inter (SIL Open Font License).&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>no es una exportación de telemetría: falta la columna 'time'</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>no es una exportación de telemetría: falta(n) la(s) columna(s) %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Modo de rendimiento</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Todo el rango de safe points, reacción más rápida a la carga. Igual que el botón Activado.</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Reloj fijo</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency: fija el reloj de la GPU para este juego (debe estar dentro del rango permitido).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Rango de reloj</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range: un mínimo/máximo temporal, 0 = sin límite.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Objetivo de carga</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target: carga de GPU inferior/superior que impulsa la subida y bajada de reloj.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Temperatura</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature: umbrales de limitación/recuperación en °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Opciones de lanzamiento de Steam</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → juego → Propiedades → General → Opciones de lanzamiento. Pegue la línea completa.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Envoltorio de Heroic/Lutris</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic: ajustes del juego → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Solo hace falta la parte del envoltorio; el lanzador añade el juego mismo.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Terminal/script</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>Sustituya &lt;program&gt; por el comando a ejecutar.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>sensor hwmon de amdgpu</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>tabla gpu_metrics</translation>
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
        <translation>average_gfx_activity de la tabla gpu_metrics parcheada del governor.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>sensor sysfs gpu_busy_percent de amdgpu.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Alternativa de reserva: radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Tabla</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>Actividad GFX</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>Actividad MM</translation>
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
        <translation>Potencia de socket</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>Potencia GFX</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>Potencia CPU</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>Reloj GFX</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Reloj GFX medio</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>Reloj SoC</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Reloj de memoria</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Reloj fabric</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>Estado de limitación</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>Núcleos de CPU</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Solo cyan-skillfish-governor-smu publica una cifra de carga (fix-metrics); el governor tt no lo hace, así que esto permanece no disponible.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>Instale cyan-skillfish-governor-smu; mide la carga y la publica mediante gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>Active fix-metrics en la página Uso de la GPU y aplique con un reinicio.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Inicie el servicio del governor en la página Servicio; fix-metrics está activado pero nada publica la carga.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics está activado y el servicio se ejecuta, pero no hay ningún gpu_metrics parcheado montado: consulte el journal.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>La tabla gpu_metrics parcheada no contiene ningún valor de carga válido; consulte el journal en la página Servicio.</translation>
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
        <translation>%1 W (bruto %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (no válido)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C máx.</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>sin límite</translation>
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
        <translation>Se necesitan al menos %1 puntos.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz aparece dos veces.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz está fuera de 1–%2 MHz.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 mV a %2 MHz está fuera de %3–%4 mV.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 mV a %2 MHz es menor que %3 mV a %4 MHz; el voltaje no debe disminuir al subir la frecuencia (regla del governor).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz está por encima de %2 MHz, donde muchas placas empiezan a bloquearse por completo.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV está por encima de %2 mV; vigile la temperatura y la fuente de alimentación.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Ninguna (genere carga en la GPU usted mismo)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub respondió %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>sin conexión (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>etiqueta inesperada %1</translation>
    </message>
</context>
</TS>
