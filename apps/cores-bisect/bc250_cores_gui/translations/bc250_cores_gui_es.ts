<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Un frontend de PyQt6 para bc250-cores-unlock.sh: mantiene entre reinicios el desbloqueo de núcleos 8C/16T de la BC-250 que ya validaste con bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencia: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = siempre activo (6C/12T)   ok = superó todas las rondas   xx = falla siempre   ?? = aleatorio   .. = aún sin probar</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Acerca de</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Mantiene entre reinicios el desbloqueo de núcleos 8C/16T que ya validaste con bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Instalar (mantener 8C/16T tras cada arranque)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Activa el servicio root que vuelve a aplicar el desbloqueo tras un arranque en frío y reinicia en caliente una vez.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Desinstalar (stock tras el próximo apagado)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Elimina el servicio. El desbloqueo sigue activo hasta el próximo apagado completo (arranque en frío).</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Actualizar estado</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Muestra la máscara de presencia de núcleos, los hilos y el estado del servicio y del guard.</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>Estado con sudo</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>Ejecuta el estado como root (pide la contraseña de sudo), así también muestra la máscara de presencia de núcleos.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Volver a comprobar resultados de bisección</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Vuelve a leer los resultados registrados por bc250-cores-bisect.sh, por ejemplo tras completar más rondas.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>La salida de bc250-cores-unlock.sh aparece aquí.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ ACEPTADO</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ ¡AÚN NO ACEPTADO!</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>Trabajando — instalando…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>Trabajando — desinstalando…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>Trabajando…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo: fallo de autenticación.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Contraseña incorrecta, inténtalo de nuevo.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} terminado, código de salida {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} falló (código de salida {1}). Consulta la salida de arriba.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>¿Mantener los 8 núcleos (16 hilos) activados en cada arranque?

Un servicio root comprueba la máscara de núcleos en cada arranque. Tras un arranque en frío vuelve a aplicar el desbloqueo y reinicia en caliente una vez. Si el desbloqueo no está activo ahora mismo, reinicia (en caliente) después de instalarlo para levantar los núcleos.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>¿Eliminar el servicio de desbloqueo? Los 8 núcleos seguirán activados hasta el próximo apagado completo (arranque en frío); después la placa volverá al stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>contraseña de administrador</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Escribir en la SMU mailbox e instalar el servicio systemd requiere privilegios de root, por lo que esto ejecuta bc250-cores-unlock.sh mediante sudo.
Tu contraseña se pasa solo a sudo y nunca se almacena.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>contraseña de sudo</translation>
    </message>
</context>
</TS>
