<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ru">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>о программе</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Версия {0}</translation>
    </message>
    <message>
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Графический интерфейс PyQt6 для bc250-cores-unlock.sh: сохраняет после перезагрузок разблокировку ядер 8C/16T на BC-250, уже подтверждённую с помощью bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Лицензия: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = всегда включено (6C/12T)   ok = прошло все раунды   xx = всегда сбоит   ?? = случайно   .. = ещё не проверялось</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>О программе</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Сохраняет после перезагрузок разблокировку ядер 8C/16T, уже подтверждённую с помощью bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Установить (сохранять 8C/16T после каждой загрузки)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Включает службу root, которая после холодного старта повторно применяет разблокировку и один раз выполняет тёплую перезагрузку.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Удалить (stock после следующего выключения)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Удаляет службу. Разблокировка остаётся активной до следующего полного выключения (холодного старта).</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Обновить статус</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Показывает маску присутствия ядер, потоки, а также состояние службы и guard.</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>Статус с sudo</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>Запускает проверку статуса от root (запрашивает пароль sudo), чтобы показать и маску присутствия ядер.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Перепроверить результаты бисекции</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Повторно считывает результаты, записанные bc250-cores-bisect.sh, например после завершения новых раундов.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>Здесь появится вывод bc250-cores-unlock.sh.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ ПРИНЯТО</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ ЕЩЁ НЕ ПРИНЯТО!</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>Выполняется — установка…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>Выполняется — удаление…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>Выполняется…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo: ошибка аутентификации.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Неверный пароль, попробуйте снова.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} завершено, код выхода {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>Сбой {0} (код выхода {1}). См. вывод выше.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>Оставлять все 8 ядер (16 потоков) включёнными при каждой загрузке?

Служба root проверяет маску ядер при каждой загрузке. После холодного старта она повторно применяет разблокировку и один раз выполняет тёплую перезагрузку. Если разблокировка сейчас не активна, после установки выполните тёплую перезагрузку, чтобы поднять ядра.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>Удалить службу разблокировки? 8 ядер останутся включёнными до следующего полного выключения (холодного старта); после этого плата вернётся к stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>пароль администратора</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Для записи в SMU mailbox и установки службы systemd требуются права root, поэтому bc250-cores-unlock.sh запускается через sudo.
Ваш пароль передаётся только sudo и никогда не сохраняется.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>пароль sudo</translation>
    </message>
</context>
</TS>
