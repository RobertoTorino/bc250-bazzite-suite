<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="es">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>Acerca de</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Aplica la máscara aceptada ahora y la vuelve a aplicar automáticamente en cada arranque futuro.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Desactiva el servicio de desbloqueo; la placa vuelve a las 24 CU de fábrica a partir del próximo reinicio.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Muestra las máscaras instaladas, el estado del servicio y las máscaras en vivo (no requiere root).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Vuelve a leer los resultados registrados por bc250-cu-bisect.sh, por ejemplo tras otra repetición de la prueba.</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>Contraseña incorrecta, inténtalo de nuevo.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Mantiene un desbloqueo de CU que ya validaste con bc250-cu-bisect.sh entre reinicios.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Instalar (aplicar ahora y mantener tras reiniciar)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Desinstalar (volver a configuración de fábrica en el próximo arranque)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Actualizar estado</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Volver a comprobar resultados de bisección</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>La salida de bc250-cu-unlock.sh aparece aquí.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ ACEPTADO</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ ¡AÚN NO ACEPTADO!</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: fallo de autenticación.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} terminado, código de salida {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} falló (código de salida {1}). Consulta la salida de arriba.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>¿Aplicar {0} ({1} CUs) ahora y mantenerlo activado en cada arranque?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>¿Deshabilitar el servicio de desbloqueo? La placa volverá a las 24 CUs de fábrica en el próximo reinicio.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>contraseña de administrador</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Escribir en los registros de la GPU e instalar el servicio systemd requiere privilegios de root, por lo que esto ejecuta bc250-cu-unlock.sh mediante sudo.
Tu contraseña se pasa solo a sudo y nunca se almacena.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>contraseña de sudo</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Un frontend de PyQt6 para bc250-cu-unlock.sh: mantiene un desbloqueo de unidades de cómputo de BC-250 que ya validaste con bc250-cu-bisect.sh entre reinicios.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencia: GNU GPLv3.</translation>
    </message>
</context>
</TS>
