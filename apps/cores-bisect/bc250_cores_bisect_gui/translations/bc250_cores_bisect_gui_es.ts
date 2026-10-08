<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>acerca de</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Versión {0}</translation>
    </message>
    <message>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Una pantalla de configuración en PyQt6 para bc250-cores-bisect.sh: elige tus opciones e inicia una ejecución, que después continúa en un terminal exactamente como si la hubieras escrito a mano.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencia: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>ayuda</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>No se pudo leer bc250-cores-bisect.sh --help.

Ejecútalo desde un terminal:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Ayuda</translation>
    </message>
    <message>
        <source>About</source>
        <translation>Acerca de</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Elige cómo quieres ejecutar bc250-cores-bisect.sh y luego pulsa Iniciar. Esta ventana se cierra y la ejecución real continúa en un terminal, igual que si lanzaras el script a mano.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Carga por intento (segundos):</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>Carga de CPU por intento (-t). Mínimo {0}s, predeterminado {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Rondas por elemento:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Intentos por elemento (-r), intercalados para que el calor o la hora del día no favorezcan a ningún elemento. Una sola ronda no permite distinguir un núcleo realmente defectuoso de un fallo aleatorio.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Herramienta de carga:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (predeterminado)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>prueba de tortura de mprime</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>ambas (stress-ng y después mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng verifica sus propios resultados y siempre está disponible. La prueba de tortura de mprime es una carga AVX/FMA mucho más dura que también comprueba cada resultado, así que detecta errores de cálculo silenciosos que a stress-ng se le escapan, pero hay que instalarlo aparte. «ambas» las ejecuta una tras otra, por lo que cada intento dura el doble de tiempo de carga.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Contar también los errores de hardware con rasdaemon</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: lee la base de datos de errores de ras-mc-ctl antes y después de cada intento. rasdaemon guarda los errores de forma persistente, así que se siguen contando aunque el journal sea volátil o el intento acabe en un cuelgue. Requiere que el servicio rasdaemon esté en marcha.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>Mismo arranque (no reiniciar entre intentos)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: mucho más rápido, pero entonces cada intento hereda el estado del anterior, así que es más difícil atribuir un fallo a un núcleo concreto.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Desatendido (sin preguntas, reinicio automático, se reanuda tras iniciar sesión)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: no pregunta nada, reinicia por su cuenta y sigue después de cada inicio de sesión hasta terminar todos los elementos. Necesita sudo sin contraseña para setpci y journalctl; consulta el README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Instalar también el servicio de inicio de sesión para reanudar automáticamente (recomendado con Desatendido)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Escribe y activa ~/.config/systemd/user/bc250-cores-bisect-auto.service para que la ejecución se relance sola tras cada reinicio o inicio de sesión, igual que en la lista de comprobación de --auto del README. El script lo elimina de nuevo cuando todos los elementos están terminados.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Restablecer</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: borra de forma permanente todos los resultados y registros guardados en ~/.local/share/bc250-cores-bisect, de modo que la siguiente ejecución empieza desde cero.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Mostrar estado (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Muestra los resultados obtenidos hasta ahora, escribe el informe y sale.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Iniciar Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Estimación aproximada: ~{0:.1f} h para una placa típica ({1} elementos x {2} rondas){3}. La ejecución se puede reanudar: los resultados se guardan después de cada intento.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, reinicios incluidos</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>¿Borrar todos los resultados de bc250-cores-bisect?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Esto borra de forma permanente todos los resultados y registros guardados en ~/.local/share/bc250-cores-bisect (--reset). No se puede deshacer y no hay copia de seguridad. El script te pedirá confirmación una vez más en el terminal.</translation>
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
        <translation>Iniciar bc250-cores-bisect.sh con:

  tiempo de carga: {t}s
  rondas: {r}
  herramienta de carga: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  desatendido: {au}

Esta ventana se cerrará y la ejecución continuará en un terminal.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>No se pudo instalar el servicio de inicio de sesión para reanudar automáticamente:
{0}

La ejecución se iniciará igualmente ahora; consulta la lista de comprobación de --auto del README para configurarlo a mano.</translation>
    </message>
</context>
</TS>
