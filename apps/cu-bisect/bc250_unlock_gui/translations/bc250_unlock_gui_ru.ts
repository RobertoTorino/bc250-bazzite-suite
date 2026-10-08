<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ru">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>О программе</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Применяет принятую маску сейчас и автоматически повторяет это при каждой следующей загрузке.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Отключает сервис разблокировки; после следующей перезагрузки плата вернётся к штатным 24 CU.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Показывает установленные маски, состояние службы и текущие маски (без прав root).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Повторно считывает результаты, записанные bc250-cu-bisect.sh, например после повторного теста.</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>Неверный пароль, попробуйте снова.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Сохраняет разблокировку CU, уже подтверждённую с помощью bc250-cu-bisect.sh, после перезагрузок.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Установить (применить сейчас и сохранить после перезагрузки)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Удалить (вернуться к заводским настройкам при следующей загрузке)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Обновить статус</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Перепроверить результаты бисекции</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>Здесь появится вывод bc250-cu-unlock.sh.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ ПРИНЯТО</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ ЕЩЁ НЕ ПРИНЯТО!</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: ошибка аутентификации.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} завершено, код выхода {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>Сбой {0} (код выхода {1}). См. вывод выше.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>Применить {0} ({1} CU) сейчас и оставить включённым при каждой загрузке?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>Отключить службу разблокировки? При следующей перезагрузке плата вернётся к заводским 24 CU.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>пароль администратора</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Для записи регистров GPU и установки службы systemd требуются права root, поэтому bc250-cu-unlock.sh запускается через sudo.
Ваш пароль передаётся только sudo и никогда не сохраняется.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>пароль sudo</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Графический интерфейс PyQt6 для bc250-cu-unlock.sh: сохраняет разблокировку вычислительных блоков BC-250, уже подтверждённую с помощью bc250-cu-bisect.sh, после перезагрузок.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Лицензия: GNU GPLv3.</translation>
    </message>
</context>
</TS>
