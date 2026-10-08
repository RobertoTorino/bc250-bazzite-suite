<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ru">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>Температура GPU</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>Температура GPU: %1 °C (порог оповещения: %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Троттлинг governor</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>Температура GPU %1 °C — на уровне или выше температуры троттлинга governor (%2 °C); максимальная частота снижается.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>сбой</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>остановка</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor: %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>Служба governor перешла в состояние «%1»; GPU работает на частотах драйвера по умолчанию. См. страницу «Служба».</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Резервные копии</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Перед каждой записью приложение копирует %1 в config.toml.bak-YYYYMMDD-HHMMSS рядом с ним. Выберите копию, чтобы увидеть отличия от текущего файла; «Восстановить» вернёт её (текущий файл сначала резервируется, поэтому ничего не теряется).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Копии, сначала новые</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Создана</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Размер</translation>
    </message>
    <message>
        <source>File</source>
        <translation>Файл</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Резервных копий пока нет.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Отличия: резервная копия → текущий файл</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Перезапустить governor после восстановления</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Восстановить выбранное</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Сделать выбранную копию текущей конфигурацией (запрашивается пароль).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Выберите резервную копию, чтобы сравнить её с текущим файлом.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>Не удалось прочитать %1: %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Идентично текущему файлу.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Перечитать с диска</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Отменить изменения на всех страницах и снова показать значения из config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Перезапустить governor после применения</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor читает config.toml только при запуске.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Применить изменения</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Один раз запрашивает пароль (pkexec), делает резервную копию config.toml с меткой времени и записывает %1. Несохранённые изменения на другой странице конфигурации также записываются.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 не найден. Похоже, governor Cyan Skillfish SMU не установлен.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 установлен, но %2 не существует.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Governor Cyan Skillfish SMU установлен и настроен.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Аутентификация отменена.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>Ошибка pkexec (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Неподдерживаемое действие службы: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 не имеет интерфейса D-Bus.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 не найден. Похоже, governor Cyan Skillfish SMU не установлен.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 установлен, но %2 не существует.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Governor Cyan Skillfish SMU установлен и настроен.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Аутентификация отменена.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>Ошибка pkexec (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Неподдерживаемое действие службы: %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 не имеет интерфейса D-Bus.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>Ошибка busctl (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 отсутствует на системной шине (governor остановлен, либо [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>Governor ответил на шине, но прочитать его свойства не удалось.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>Аутентификация отменена.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Неподдерживаемый метод определения нагрузки GPU: %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Неподдерживаемый источник температуры: %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>Неподдерживаемое значение gpu.set-method: %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every должно быть не меньше 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals должно быть не меньше 1 мкс</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust не должно быть короче sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples должно быть 0 (выключено) или 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events должно быть не меньше 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal должно быть положительным</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst должно быть больше normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust не может быть отрицательным</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Частоты не могут быть отрицательными</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min не должно превышать frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target требует 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling должно быть 0..100 °C</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery должно быть ниже temperature.throttling (или 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>Использование GPU</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>исправлять нагрузку GPU в gpu_metrics</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Записывает измеренную governor нагрузку в исправленную таблицу gpu_metrics и монтирует её поверх sysfs, чтобы MangoHud, оверлей Steam, radeontop и это приложение показывали реальный процент вместо бага с 655%.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>исправлять частоту GPU в hwmon</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Заменяет hwmon freq1_input частотой, считанной из SMU. Исправляет неверные показания частоты в sysfs, в основном после разблокировки 8 ядер. Не зависит от fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Метод определения нагрузки:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Источник температуры:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Сбрасывать исправленную таблицу метрик каждые N циклов обновления (по умолчанию 10).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>применять частоту/напряжение через:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>новые значения</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Записываются только ключи, которыми управляет это приложение ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]); все остальные строки файла, включая комментарии и таблицу safe-points, остаются без изменений. Перед каждой записью рядом создаётся копия с именем config.toml.bak-YYYYMMDD-HHMMSS.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml ещё не существует; применение создаст его)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Перечитать с диска</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Отменить изменения на всех страницах и снова показать значения из config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Перезапустить governor после применения</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor читает config.toml только при запуске.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Применить изменения</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Один раз запрашивает пароль (pkexec), делает резервную копию config.toml с меткой времени и записывает %1. Несохранённые изменения на другой странице конфигурации также записываются.</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>Фильтр:</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>текст или регулярное выражение, без учёта регистра</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Следовать</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Прокручивать до самой новой строки. Снимите флажок, чтобы читать без прокрутки.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Очистить</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Забыть показанные строки; новые записи продолжат поступать.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — подключение…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>Отслеживается journalctl -u %1; хранится до %2 строк.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>код выхода %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl остановлен (%1). Возможно, вашему пользователю нужно состоять в группе systemd-journal или wheel для чтения системных юнитов. Повтор через %2 с…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl завершился; перезапуск через %1 с…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl недоступен в этой системе; журнал не может быть показан.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (воспринято буквально, не является корректным регулярным выражением)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>Совпадает %1 из %2 строк%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>журнал ядра недоступен для чтения этим пользователем (добавьте его в группу systemd-journal)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k завершился с кодом %1</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl недоступен</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Для каждой игры</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>Governor поставляется с обёрткой, которая применяет одну из этих настроек для отдельной программы и отключает режим производительности при её завершении, возвращая обычный диапазон. Выберите, что должна получить игра, и скопируйте строку в её лаунчер.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Для:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Копировать</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Скопировать строку в буфер обмена.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Частота для фиксации, МГц.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Нижний предел, 0 = без ограничения.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Верхний предел, 0 = без ограничения.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Без ограничения</translation>
    </message>
    <message>
        <source>to</source>
        <translation>до</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>Ниже этой нагрузки governor снижает частоту.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Выше этой нагрузки governor повышает частоту.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Троттлинг выше этой температуры.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Возврат к обычным частотам ниже этой температуры.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Доля от 1, как в config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>Нижний предел выше верхнего.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>Нижняя цель нагрузки должна быть ниже верхней.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>Температура восстановления должна быть ниже температуры троттлинга.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Скопировано</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>Нагрузка GPU</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>Частота GPU</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>Температура GPU</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Мощность</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Режим производительности</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Скопировано: %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Обзор</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>Использование GPU</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Настройка</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Безопасные точки</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Производительность</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Резервные копии</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Служба</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Параметры</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Справка</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Готово</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>Нагрузка %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Нагрузка Н/Д</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>режим производительности</translation>
    </message>
    <message>
        <source>running</source>
        <translation>работает</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>не установлен</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>остановка</translation>
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
        <translation>Приложение по-прежнему работает в трее; чтобы выйти, используйте «Выход» в его меню.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 несохранённых изменений. Всё равно закрыть?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>Служба governor не запущена.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>Н/Д</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>Нет датчика частоты.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>Нет датчика температуры.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power из таблицы gpu_metrics (весь APU); SMU сообщает это значение в формате с фиксированной точкой 24.8, здесь показано в ваттах</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>Таблица gpu_metrics не сообщает мощность сокета.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>без ограничения</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Вкл</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Выкл</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Текущий диапазон %1–%2 МГц</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus недоступна.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Отсутствует</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>Работает</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Остановлена</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> страниц имеют</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> страница имеет</translation>
    </message>
    <message>
        <source> and </source>
        <translation> и </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Несохранённые изменения: %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Недопустимые значения</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>Не удалось записать config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Конфигурация применена</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, резервная копия: %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Сохранено, но перезапуск не удался</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml обновлён, но перезапустить governor не удалось.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>Текст ошибки не был возвращён.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — перезапуск не удался</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, governor перезапущен</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Применить безопасные точки</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>Записать %1 безопасных точек (%2–%3 МГц) в config.toml?

Governor будет масштабировать частоту вдоль этой кривой. Точка, которую кристалл не может удержать, приводит к зависанию платы под нагрузкой; сначала создаётся резервная копия текущего файла, которую можно восстановить на странице «Резервные копии».</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Безопасные точки применены</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>ничего не сохранено</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>Нет профиля с именем «%1» (известны: %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Профиль «%1» загружен в формы; примените, чтобы записать его</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Применить профиль</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>Применить «%1»? %2 несохранённых изменений будут отменены.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Недопустимый профиль</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>«%1» не может быть применён: %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Профиль «%1» применён</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Профиль «%1» применён, governor перезапущен.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Назначьте эту команду клавише в параметрах сочетаний клавиш вашего окружения рабочего стола; она обратится к запущенному приложению и применит профиль.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Сохранить профиль</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Имя профиля:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Заменить профиль</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>«%1» уже существует. Заменить его текущими значениями формы?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Профиль «%1» сохранён</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Удалить профиль</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>Удалить профиль «%1»?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Профиль «%1» удалён</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>Заменить %1 на %2?

Сначала будет создана резервная копия текущего файла.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
После этого governor будет перезапущен.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Восстановить резервную копию</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>Не удалось восстановить резервную копию</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>Восстановлено %1</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Доступна версия governor %1 (установлена %2); см. страницу «Служба»</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Доступно обновление governor %1.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Экспорт истории телеметрии</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>Файлы CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>Не удалось записать файл CSV</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 отсчётов (%2–%3) записано в %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Сравнить с более ранним экспортом телеметрии</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>Файлы CSV (*.csv);;Все файлы (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>Не удалось прочитать файл CSV</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Нечего сравнивать</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>Файл не содержит отсчётов с читаемым временем.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 опорных отсчётов из %2 нарисованы пунктиром</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Экспорт диагностики</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>Текстовые файлы (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Экспорт не удался</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Диагностика экспортирована</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Сохранено в %1.

Прочитайте файл перед тем, как прикреплять его к отчёту об ошибке, и удалите всё, чем вы не хотите делиться.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1: выполнено</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>Ошибка systemctl %1</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>Тест завершён из-за «%1» на странице «Производительность».</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1: выполнено</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>Ошибка %1</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>Governor не вернул текст ошибки.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Режим производительности включён</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Режим производительности выключен</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Фиксированная частота %1 МГц</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Диапазон времени выполнения %1–%2 МГц</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Целевая нагрузка %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>не задано</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Температура %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Значения времени выполнения скопированы на страницу «Настройка»; примените их, чтобы сохранить</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>на %1 с</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>до остановки</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> и запустите %1 для нагрузки</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Проверить безопасную точку</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>Зафиксировать GPU на %1 МГц при %2 мВ %3%4?

Governor применяет эту пару значений как есть и останавливает автоматическое масштабирование; тепловой троттлинг остаётся активным. Точка, которую кристалл не может удержать, приводит к зависанию платы под нагрузкой. В config.toml ничего не записывается. У вас запросят пароль (интерфейс TestMode доступен только root).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>Ошибка тестового режима</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>Не удалось запустить %1 (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Тестовый режим: %1 МГц @ %2 мВ</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>прерван после ошибки GPU в журнале ядра</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>аварийно завершился</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>завершился с кодом %1</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2, пока точка была зафиксирована</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Тест %1 МГц @ %2 мВ %3 через %4 с</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> под нагрузкой %1</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>пик %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>частота %1–%2 МГц</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>частота %1 МГц</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ ядро: %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+ещё %1)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>журнал ядра не отслеживается</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>ошибок GPU в журнале ядра нет</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. Governor снова масштабирует частоту в обычном режиме.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>завершено по таймеру</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>Не удалось завершить тест</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Перезапуск governor на странице «Служба» также завершает тестовый режим.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>Governor остановлен; тест завершился вместе с ним.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, осталось %1 с</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 нагружает GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Нагрузите GPU самостоятельно.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Журнал ядра недоступен для чтения, обнаружение зависаний отключено.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Журнал ядра отслеживается.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Тестирование %1 МГц @ %2 мВ%3.%4%5 Следите за страницей «Обзор»; «Остановить тест» вернёт обычное масштабирование.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Обзор</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>Состояние во время выполнения</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Служба governor</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Подмена gpu_metrics</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>Датчик нагрузки GPU</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (сохранено)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Режим производительности</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>Нагрузка, частота и температура GPU</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Окно:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Какую часть последних %1 минут показывает график; экспорт всегда содержит все сохранённые данные.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>Экспорт CSV…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Сохраняет каждый сохранённый отсчёт (время, нагрузка, частота, температура, мощность сокета, режим производительности, диапазон времени выполнения) в файл CSV.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Сравнить…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Загружает более ранний экспорт CSV и рисует его пунктиром позади текущих линий, самый новый отсчёт у правого края, со средними значениями обеих сессий под графиком.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Очистить</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Удалить опорную сессию с графика.</translation>
    </message>
    <message>
        <source>% / °C</source>
        <translation>% / °C</translation>
    </message>
    <message>
        <source>MHz</source>
        <translation>МГц</translation>
    </message>
    <message>
        <source>Load %</source>
        <translation>Нагрузка %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Температура °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Частота МГц</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Нагрузка % (опора)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Температура °C (опора)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Частота МГц (опора)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Таблица gpu_metrics</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>BC-250 обычно не предоставляет датчик gpu_busy_percent, но governor сам измеряет нагрузку и публикует её в исправленной таблице gpu_metrics, пока включён fix-metrics и служба работает. Приложение читает значение оттуда; отсутствующий датчик показывается как Н/Д, а не как 0%.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>Не установлен</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Активна</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>Подсостояние: %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Ошибка</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>Юнит завершился с ошибкой; журнал см. на странице «Служба».</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Неактивна</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>неизвестно</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Смонтировано</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>Не смонтировано</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>Governor монтирует свою исправленную таблицу gpu_metrics поверх файла sysfs, пока включён fix-metrics и служба работает.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Включено</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Отключено</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Значение сохранено в config.toml.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>Недоступно</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Доступно</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>нагрузка %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>нагрузка Н/Д</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>частота %1 МГц</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>температура %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Текущее: %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. Нет пригодного датчика нагрузки GPU: %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Доступна</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor отвечает на системной шине.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Вкл</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Выкл</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Текущий диапазон %1–%2 МГц</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>без ограничения</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Недоступна</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Неизвестно</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Требуется запущенный governor с [dbus] enabled.</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>Нагрузка, частота и температура GPU за последние %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (записано %1 мин %2 с)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Опора %1 (%2): %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Текущее окно (%1): %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>Нет читаемой таблицы gpu_metrics v2.x в /sys/class/drm/card*/device.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (исправлено)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (исходно)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>нет</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Таблица, публикуемая governor (fix-metrics): активность GFX — это его собственное измерение.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Исходная таблица ядра: активность GFX — это неверное значение из прошивки (баг с 655%); включите fix-metrics, чтобы получить реальное значение.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Исходная таблица ядра.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Производительность</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Управление во время выполнения через D-Bus (com.cyanskillfish.Governor): изменения применяются немедленно, не требуют пароля и теряются при следующем перезапуске governor. config.toml не изменяется; для сохранения значений используйте страницу «Настройка». Режим производительности открывает весь диапазон безопасных точек; фиксированная частота закрепляет частоту; целевая нагрузка и пороги температуры меняют масштабирование governor, не затрагивая режим.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>Состояние во время выполнения</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Режим производительности</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Текущий диапазон</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Диапазон при запуске ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Допустимый диапазон (безопасные точки)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Целевая нагрузка (нижняя / верхняя)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Температура (троттлинг / восстановление)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Управление</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Режим производительности: выключен</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled: включение позволяет governor использовать весь допустимый диапазон и быстрее реагировать на нагрузку; выключение возвращает диапазон, с которым governor запустился.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Режим:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency: режим производительности с частотой, зафиксированной здесь. Должна находиться в пределах допустимого диапазона.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Зафиксировать частоту</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Фиксированная частота:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Без ограничения</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Нижний предел частоты сейчас; «Без ограничения» = самая низкая безопасная точка.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Верхний предел частоты сейчас; «Без ограничения» = самая высокая безопасная точка.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Задать диапазон</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max): временный диапазон, выходит из режима производительности.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>до</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Диапазон времени выполнения:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>Ниже этой нагрузки GPU governor снижает частоту.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Выше этой нагрузки GPU governor повышает частоту.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Задать целевую нагрузку</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper): диапазон нагрузки, в котором governor удерживает GPU до следующего перезапуска. Не затрагивает режим производительности.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Целевая нагрузка:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Выше этой температуры governor снижает максимальную частоту.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Не задано</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>Ниже этой температуры снова разрешён весь диапазон; «Не задано» = собственный гистерезис governor.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Задать температуры</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery): до следующего перезапуска. Не затрагивает режим производительности.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Температура:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Скопировать значения времени выполнения на страницу «Настройка»</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Переносит текущий диапазон, целевую нагрузку и температуры в форму «Настройка», чтобы вы могли сохранить их в config.toml.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Доступна</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor отвечает на системной шине.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Вкл</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Выкл</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Свойство Enabled интерфейса PerformanceMode.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Режим производительности: включён</translation>
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
        <translation>не задано</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Недоступна</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Неизвестно</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>Служба governor не запущена (страница «Служба»).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus отключена в config.toml: включите её на странице «Настройка» и примените с перезапуском.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>Governor не ответил на системной шине.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>Элементы управления отключены: %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>нижняя целевая нагрузка должна быть ниже верхней</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>температура восстановления должна быть ниже температуры троттлинга (или «Не задано»)</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>Профили</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>Именованные снимки этой страницы и страницы «Использование GPU», хранящиеся только для вашего пользователя. Безопасные точки не входят в профиль.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>Загрузить в формы</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Заполняет формы «Настройка» и «Использование GPU»; ничего не записывается, пока вы не примените.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Применить сейчас</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Записывает профиль в config.toml (сначала резервная копия, один запрос пароля) и перезапускает governor. Несохранённые изменения на страницах конфигурации отменяются.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Сохранить текущее как…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Сохраняет текущие значения форм (применённые или нет) под указанным именем.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Удалить</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Скопировать команду для горячей клавиши</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Помещает в буфер обмена команду, которая применяет этот профиль в уже запущенном приложении. Назначьте её клавише в «Параметры системы → Комбинации клавиш» (KDE) или «Клавиатура → Личные комбинации клавиш» (GNOME), чтобы переключать профили без открытия окна.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Профилей пока нет: заполните формы и воспользуйтесь «Сохранить текущее как…»</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Безопасные точки</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Перечитать с диска</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>[[safe-points]] файла %1 определяют кривую частота/напряжение, вдоль которой масштабирует governor. Он никогда не выходит за пределы диапазона между самой низкой и самой высокой точкой; [frequency-range] и элементы управления во время выполнения ограничиваются этим диапазоном. Редактируйте осторожно: неверные напряжения могут привести к зависанию или повреждению платы. Применение сначала проверяет правила governor и жёсткие пределы (%2–%3 мВ, до %4 МГц) и делает резервную копию.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Точки</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Частота</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Напряжение</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Добавить точку</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Добавляет точку после выбранной, на середине пути к следующей.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Удалить</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Сортировать</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Упорядочить строки по частоте (при применении это выполняется в любом случае).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Кривая</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Применить безопасные точки</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Записывает блоки [[safe-points]] в config.toml (запрашивает пароль, сначала делает резервную копию).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Перезапустить governor после этого</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>Governor читает config.toml только при запуске.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Отменить</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Вернуться к точкам из файла.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Значения по умолчанию из пакета</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>Активные точки из default-config.toml governor: %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Проверить точку перед сохранением (во время выполнения, root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode через D-Bus немедленно фиксирует эту частоту и напряжение и останавливает автоматическое масштабирование; тепловой троттлинг governor остаётся активным. В config.toml ничего не записывается, а governor применяет пару значений как есть, поэтому оставайтесь в пределах жёстких ограничений. Нагрузите GPU, пока тест выполняется. «Остановить тест» (или таймер) выключает режим производительности, возвращая обычное масштабирование с начальным диапазоном. Точка, которую кристалл не может удержать, приводит к зависанию платы; заранее сохраните свою работу.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Нагрузка:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Генератор нагрузки GPU, найденный в PATH, запускается вместе с тестом и завершается по его окончании. Если он завершится аварийно, пока точка зафиксирована, об этом будет сообщено.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>Инструмент нагрузки не найден (vkmark, glmark2, vkcube или glxgears): запустите игру или бенчмарк самостоятельно во время теста.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Предзаполнено из выбранной строки; редактируйте свободно.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>До остановки</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>Приложение само завершает тест по истечении этого времени (0 = только командой «Остановить тест»).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Частота:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Напряжение:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Для:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Начать тест</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Запрашивает пароль (pkexec): интерфейс TestMode доступен только root.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Остановить тест</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Добавить в таблицу</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Помещает эту пару частота/напряжение в таблицу безопасных точек выше (с сортировкой по частоте, заменяя точку с той же частотой). Примените, чтобы сохранить.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Определить, насколько далеко может зайти конкретно ваша плата (более высокая максимальная частота, более низкие напряжения) — задача для %1: он тестирует по одному шагу под проверенной нагрузкой и может установить результат. Редактируйте точки вручную, только если вы знаете, что выдерживает кристалл.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 точек: %2 МГц @ %3 мВ до %4 МГц @ %5 мВ.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>Нет [[safe-points]]; governor вернётся к значениям по умолчанию 350 МГц @ 700 мВ и 2000 МГц @ 1000 мВ.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>повышает максимальную частоту с %1 до %2 МГц</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>понижает напряжение в %1 существующей точке(ах)</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Это изменение %1: нестабильная точка может привести к зависанию платы под нагрузкой. Сначала проверьте её с помощью bc250-gpu-oc-bisect.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> и </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>без ограничения</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor (D-Bus): допустимый диапазон %1–%2 МГц, текущий диапазон %3–%4 МГц.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 МГц выше %2 МГц, при которых многие платы намертво зависают</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 мВ выше %2 мВ</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>кривая выше дала бы %1 мВ при %2 МГц; это значение ниже</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>Интерфейс D-Bus governor недоступен (служба остановлена или [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Служба</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Проверить обновления</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Сравнить установленный RPM с последним выпуском на GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Экспорт диагностики…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Сохранить версии, config.toml, состояние службы, журнал и исходную таблицу gpu_metrics в текстовый файл для отчёта об ошибке.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Юнит найден</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Активна</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Включён при загрузке</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Подмена gpu_metrics</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Версия</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Запустить</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Остановить</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Перезапустить</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Включить при загрузке</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Отключить при загрузке</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (запрашивает пароль).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Журнал (в реальном времени)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Да</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>Нет — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Да (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>Нет (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>не загружен</translation>
    </message>
    <message>
        <source>No</source>
        <translation>Нет</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>примечания к выпуску</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>выпуски</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Пакет не установлен</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Проверка…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Параметры</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Эти параметры относятся к приложению, а не к governor. Они хранятся для каждого пользователя отдельно.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Системный трей</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Показывать значок в трее со всплывающей подсказкой о нагрузке, частоте и температуре GPU</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Закрытие окна оставляет приложение работающим в трее</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Щёлкните левой кнопкой по значку в трее, чтобы показать или скрыть окно; меню также переключает режим производительности (если D-Bus доступна) и закрывает приложение.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>Это окружение рабочего стола не предоставляет системный трей (в GNOME установите расширение AppIndicator).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Запускать при входе в систему</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Запускать приложение при входе в систему</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…скрыто в трее, без открытия окна</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Обновления governor</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Проверять наличие новой версии governor при запуске приложения</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Один запрос к api.github.com о последнем выпуске filippor/cyan-skillfish-governor, сравниваемом с установленным RPM. Больше ничего не отправляется. На странице «Служба» есть такая же проверка в виде кнопки.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Оповещения</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Уведомлять, когда температура GPU достигает</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Уведомлять, когда governor начинает троттлинг по температуре</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Уведомлять, когда служба governor самопроизвольно останавливается или завершается с ошибкой</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Показывается в виде уведомлений рабочего стола через значок в трее (в строке состояния, если трей выключен). Одно сообщение на событие: оповещение о температуре взводится снова, когда GPU остынет на 5 °C ниже порога, и одно и то же оповещение повторяется не чаще, чем раз в 5 минут.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Не удалось записать %1: %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Запись: %1
Команда: %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Записывает запись .desktop в %1; ничего не устанавливается во всю систему.</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Неизвестно</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Инструмент нагрузки уже запущен.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1 не найден в PATH.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 не запустился: %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>нагрузка %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>частота %1 МГц (макс. %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (макс. %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 Вт</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>нет показаний</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Скрыть окно</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Режим производительности</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Применить профиль</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Выход</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Показать окно</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Настройка</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Пресет:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>Форма не соответствует ни одному пресету.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Заполняет форму ниже; ничего не записывается, пока вы не примените.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>ограничения частоты при запуске</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Самая низкая частота, которую может выбрать governor. 0 («Без ограничения») = самая низкая безопасная точка.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Самая высокая частота, которую может выбрать governor. 0 («Без ограничения») = самая высокая безопасная точка.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Минимум:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Максимум:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>Значения за пределами таблицы безопасных точек config.toml ограничиваются governor.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>когда менять частоту</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>Нагрузка GPU, выше которой governor повышает частоту (верхняя).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>Нагрузка GPU, ниже которой governor снижает частоту (нижняя).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Повышать выше:</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Понижать ниже:</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Широкий промежуток удерживает частоту стабильной; узкий — точнее следует за нагрузкой. Значения governor по умолчанию при отсутствии секции: 95 % / 80 %.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>тепловой троттлинг</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Выше этой температуры GPU governor снижает частоту (по умолчанию 85).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Не задано</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>Ниже этой температуры троттлинг прекращается. Должна быть ниже температуры троттлинга; «Не задано» не добавляет ключ в config.toml.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Троттлинг выше:</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Восстановление ниже:</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>управление во время выполнения</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>публиковать com.cyanskillfish.Governor на системной шине</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Требуется странице «Производительность» этого приложения и обёртке запуска cyan-skillfish-performance-mode.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>контур управления</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>как часто опрашивается флаг занятости GPU (по умолчанию governor 2000 мкс, в поставляемом файле 250 мкс). Используется методом нагрузки busy-flag.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>как часто пересчитывается целевая частота (по умолчанию governor 10 × sample, в поставляемом файле 100 000 мкс). Не должно быть короче интервала выборки.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Опрашивать каждые:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Корректировать каждые:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>как быстро частота движется к целевому значению (по умолчанию 1 МГц/мс).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>скорость изменения в режиме burst; должна быть выше обычной скорости (по умолчанию governor 200 × normal, в поставляемом файле 50 МГц/мс).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Скорость изменения:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Скорость изменения burst:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> отсчётов</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Выкл</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>столько отсчётов занятости подряд переключают на скорость изменения burst, чтобы игра, внезапно нагрузившая GPU, быстро получила нужную частоту (1..%1; «Выкл» не добавляет ключ, в поставляемом файле 60).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Burst после:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> событий</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>циклов коррекции с нагрузкой ниже нижней цели, прежде чем частота снизится (по умолчанию governor 10, в поставляемом файле 5). Больше = «липче» частота.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Снижать после:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Более частые опрос и коррекция реагируют быстрее, но расходуют время ЦП. Режим burst сокращает задержку при запуске игры; увеличение down-events не даёт частоте снижаться во время коротких пауз.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>мёртвая зона</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>изменение частоты вне режима burst меньше этого значения не применяется (по умолчанию 10). Позволяет избежать постоянных мелких записей в SMU.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Игнорировать изменения меньше:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>секции настройки</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>Governor сообщает диапазон безопасных точек %1–%2 МГц; значения за его пределами ограничиваются.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Перечитать с диска</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Отменить изменения на всех страницах и снова показать значения из config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Перезапустить governor после применения</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Governor читает config.toml только при запуске.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Применить изменения</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Один раз запрашивает пароль (pkexec), делает резервную копию config.toml с меткой времени и записывает %1. Несохранённые изменения на другой странице конфигурации также записываются.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>не установлен</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (последняя версия: неизвестна — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (последняя версия: неизвестна)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → доступна %2 (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (актуально, последний выпуск %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (последний выпуск: %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Опрашивает единственный бит занятости GPU с интервалом timing.intervals.sample (по умолчанию). Самый дешёвый способ, работает везде.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Сканирует все процессы, удерживающие GPU открытым. Требует больше ресурсов ЦП, чем busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Читает собственное значение нагрузки от ядра. Требует исправленное ядро, которого нет в стандартном Bazzite.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; держит открытым дескриптор устройства DRM, пока работает governor (по умолчанию).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Вместо этого читает amdgpu hwmon temp1_input, поэтому клиент DRM не остаётся открытым. Тот же датчик.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Напрямую обращается к SMU (API от bc250collective); применяет напряжение безопасных точек вместе с частотой (по умолчанию).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Использует интерфейс sysfs amdgpu (pp_od_clk_voltage) вместо SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Значения по умолчанию из пакета</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Тихий</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Отзывчивый</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Максимальная частота</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>Значения из config.toml, устанавливаемого пакетом governor.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>Самые низкие частоты, которых всё ещё достаточно: позднее повышение, максимум 1500 МГц, троттлинг при 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Раннее повышение частоты и весь безопасный диапазон ценой большего тепла и энергопотребления.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Держится у верхней границы безопасного диапазона; близко к фиксированной частоте, но с включённым тепловым троттлингом.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Особый</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Без ограничения</translation>
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
&lt;p&gt;Небольшая оболочка для &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, governor GPU платы &lt;b&gt;AMD BC-250&lt;/b&gt;
(APU Cyan Skillfish, gfx1013) в &lt;b&gt;Bazzite&lt;/b&gt;. Governor должен быть уже установлен; это приложение
редактирует один раздел его конфигурации и управляет его службой systemd. Больше ничего в системе
не затрагивается.&lt;/p&gt;

&lt;h2&gt;Обзор&lt;/h2&gt;
&lt;p&gt;Показывает, работает ли служба, смонтирована ли исправленная таблица &lt;code&gt;gpu_metrics&lt;/code&gt; governor
поверх sysfs, доступен ли датчик нагрузки GPU, а также график нагрузки GPU (%), температуры (°C, левая
ось) и частоты (МГц, правая ось). Отсутствующее показание оставляет разрыв, а не ложный ноль. Пока приложение
работает, оно хранит данные за последний час (один отсчёт каждые две секунды); &lt;b&gt;Окно&lt;/b&gt; задаёт, какую часть
из них показывает график (2, 10, 30 или 60 минут), а &lt;b&gt;Экспорт CSV…&lt;/b&gt; записывает каждый сохранённый отсчёт
(время, нагрузка, частота, температура, мощность сокета, режим производительности, диапазон времени выполнения)
в файл. &lt;b&gt;Сравнить…&lt;/b&gt; загружает такой файл обратно и рисует его пунктиром позади текущих линий
(самый новый отсчёт у правого края, как у текущего окна), а также показывает средние значения и пики обеих
сессий под графиком (нагрузка, частота, температура, мощность сокета), чтобы можно было оценить изменение профиля
или безопасной точки на фоне более раннего запуска; &lt;b&gt;Очистить&lt;/b&gt; убирает её.&lt;/p&gt;
&lt;p&gt;Блок &lt;b&gt;Таблица gpu_metrics&lt;/b&gt; расшифровывает таблицу, которую предоставляет ядро (или governor): активности,
температуры, мощность сокета/GFX/CPU, частоты GFX, SoC, памяти и fabric, состояние троттлинга и частоты ядер CPU.
&lt;i&gt;(исправлено)&lt;/i&gt; означает, что смонтирована таблица governor; &lt;i&gt;(исходно)&lt;/i&gt; — это собственная таблица ядра,
чья активность GFX на BC-250 является неверным значением 655% и не используется как нагрузка.&lt;/p&gt;
&lt;p&gt;BC-250 обычно не имеет датчика &lt;code&gt;gpu_busy_percent&lt;/code&gt;, но governor сам измеряет нагрузку и при включённом
&lt;b&gt;fix-metrics&lt;/b&gt; публикует её в исправленной таблице &lt;code&gt;gpu_metrics&lt;/code&gt;, которую монтирует поверх sysfs.
Приложение читает нагрузку оттуда; &lt;code&gt;gpu_busy_percent&lt;/code&gt; и &lt;code&gt;radeontop&lt;/code&gt; служат запасными
вариантами. При отсутствии любого источника показывается &lt;b&gt;Н/Д&lt;/b&gt;, а не вводящий в заблуждение 0%, а всплывающая
подсказка сообщает, чего не хватает. Частота и температура GPU берутся из датчиков amdgpu hwmon; при включённом
&lt;code&gt;fix-freq&lt;/code&gt; частота — это реальное значение от SMU.&lt;/p&gt;

&lt;h2&gt;Использование GPU&lt;/h2&gt;
&lt;p&gt;Редактирует раздел &lt;code&gt;[gpu-usage]&lt;/code&gt; файла &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Ключ&lt;/th&gt;&lt;th&gt;По умолчанию&lt;/th&gt;&lt;th&gt;Значение&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Записывать измеренную нагрузку в исправленную таблицу
&lt;code&gt;gpu_metrics&lt;/code&gt; и монтировать её поверх sysfs. Исправляет значение нагрузки GPU 655% в MangoHud,
оверлее Steam и radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Также исправлять &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; частотой,
считанной из SMU. Исправляет неверную частоту в sysfs, в основном после разблокировки 8 ядер. Не зависит от
fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; опрашивает бит занятости GPU;
&lt;i&gt;process&lt;/i&gt; сканирует все процессы, использующие GPU (больше нагрузки на CPU); &lt;i&gt;kernel&lt;/i&gt; требует
исправленное ядро.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Откуда читается температура GPU: ioctl DRM (держит открытым дескриптор
DRM) или файл hwmon &lt;code&gt;temp1_input&lt;/code&gt;. Один и тот же датчик.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Сбрасывать исправленную таблицу каждые N циклов обновления.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;И раздел &lt;code&gt;[gpu]&lt;/code&gt;: &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, по умолчанию, применяет частоту и напряжение
напрямую через SMU; &lt;i&gt;kernel&lt;/i&gt; вместо этого использует интерфейс sysfs amdgpu).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Применить изменения&lt;/b&gt; (на этой странице или на «Настройка») один раз запрашивает пароль (pkexec). Копирует
текущий файл в &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; и записывает несохранённые изменения обеих страниц.
Меняются только известные ключи; все остальные строки файла, включая комментарии, сохраняются. Governor читает
файл только при запуске, поэтому служба перезапускается после этого, если не снять этот флажок.&lt;/p&gt;

&lt;h2&gt;Настройка&lt;/h2&gt;
&lt;p&gt;Редактирует остальные разделы файла &lt;code&gt;%3&lt;/code&gt;:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Раздел&lt;/th&gt;&lt;th&gt;Ключи&lt;/th&gt;&lt;th&gt;Значение&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Ограничения частоты в МГц, с которыми запускается
governor. &lt;i&gt;Без ограничения&lt;/i&gt; (0) оставляет предел открытым; значения за пределами таблицы безопасных точек
ограничиваются governor.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Повышать частоту, когда нагрузка выше &lt;i&gt;upper&lt;/i&gt;,
снижать, когда она ниже &lt;i&gt;lower&lt;/i&gt;. Широкий промежуток удерживает частоту стабильной, узкий — точнее следует
за нагрузкой. Собственные значения governor по умолчанию при отсутствии раздела — 95% / 80%; в поставляемом файле
используются 65% / 50%.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Троттлинг выше первого значения
(по умолчанию 85 °C); восстановление ниже второго, которое необязательно (&lt;i&gt;Не задано&lt;/i&gt;) и должно быть ниже.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Публиковать &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; на системной
шине. Требуется странице «Производительность»; в поставляемом файле включено, встроенное значение governor по
умолчанию — выключено.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst,
burst-samples, down-events&lt;/td&gt;&lt;td&gt;Контур управления: как часто опрашивается нагрузка и корректируется частота
(мкс), как быстро частота движется к цели (МГц/мс), сколько отсчётов занятости подряд переключают на более быструю
скорость burst (&lt;i&gt;Выкл&lt;/i&gt; не добавляет ключ) и сколько циклов коррекции при низкой нагрузке проходит, прежде чем
частота снизится. Значения governor по умолчанию: 2000 мкс / 10 × sample, 1 / 200 × normal, выкл, 10; в
поставляемом файле используются 250 мкс / 100 000 мкс, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Мёртвая зона в МГц: изменение вне режима burst
меньше этого значения не применяется (по умолчанию 10).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Пресеты&lt;/b&gt; заполняют сразу диапазон частот, целевую нагрузку и температуру (timing не затрагивается):
&lt;i&gt;Значения по умолчанию из пакета&lt;/i&gt; (конфигурация пакета), &lt;i&gt;Тихий&lt;/i&gt; (более низкие частоты, позднее
повышение), &lt;i&gt;Отзывчивый&lt;/i&gt; (раннее повышение, весь диапазон) и &lt;i&gt;Максимальная частота&lt;/i&gt; (держится у
верхней границы). Поле со списком показывает &lt;i&gt;Особый&lt;/i&gt;, как только значение отличается от всех пресетов.
Недопустимые сочетания (min выше max, восстановление не ниже троттлинга, интервал коррекции короче интервала
опроса, скорость burst не выше обычной) отмечаются под формой и блокируют применение.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Профили&lt;/b&gt; — это именованные снимки всех значений этой страницы и страницы «Использование GPU» (безопасные
точки в них не входят), хранящиеся для вашего пользователя в
&lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;. &lt;i&gt;Сохранить текущее как…&lt;/i&gt; сохраняет то, что сейчас
показывают формы, применено это или нет. &lt;i&gt;Загрузить в формы&lt;/i&gt; заполняет обе страницы, чтобы вы могли
просмотреть и применить как обычно; &lt;i&gt;Применить сейчас&lt;/i&gt; записывает профиль в &lt;code&gt;config.toml&lt;/code&gt;
(сначала резервная копия, один запрос пароля), отменяет несохранённые изменения и перезапускает governor. При
включённом значке в трее подменю &lt;i&gt;Применить профиль&lt;/i&gt; меню трея делает то же самое без открытия окна. Для
&lt;b&gt;горячей клавиши&lt;/b&gt; пункт &lt;i&gt;Скопировать команду для горячей клавиши&lt;/i&gt; помещает в буфер обмена
&lt;code&gt;bc250-governor-manager --profile 'Name'&lt;/code&gt;; назначьте её в «Параметры системы → Комбинации клавиш» (KDE)
или «Клавиатура → Личные комбинации клавиш» (GNOME). Приложение запускается в одном экземпляре на пользователя:
эта команда обращается к уже запущенному экземпляру через локальный сокет и применяет профиль там (один запрос
пароля, уведомление в трее) либо запускает приложение и применяет профиль, если ничего не запущено. Обычный
повторный запуск просто поднимает окно наверх. &lt;code&gt;--list-profiles&lt;/code&gt; выводит сохранённые имена.&lt;/p&gt;

&lt;h2&gt;Безопасные точки&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;[[safe-points]]&lt;/code&gt; файла &lt;code&gt;%3&lt;/code&gt; в виде редактируемой таблицы и кривой частота/напряжение.
Governor масштабирует вдоль этой кривой и никогда не выходит за её диапазон; &lt;code&gt;[frequency-range]&lt;/code&gt; и
элементы управления во время выполнения ограничиваются им. &lt;b&gt;Добавить точку&lt;/b&gt; вставляет точку на середине пути
к следующей, &lt;b&gt;Удалить&lt;/b&gt; удаляет выбранную строку, &lt;b&gt;Значения по умолчанию из пакета&lt;/b&gt; загружает собственную
таблицу governor, &lt;b&gt;Отменить&lt;/b&gt; возвращает к файлу. Прежде чем станет доступно &lt;b&gt;Применить безопасные точки&lt;/b&gt;,
список должен пройти проверку правил governor (не менее двух точек, уникальные частоты, напряжение никогда не
снижается с ростом частоты) и жёсткие ограничения, общие с bc250-gpu-oc-bisect (700–1100 мВ, до 2500 МГц). Выше
2000 МГц или 1000 мВ, либо при изменении, повышающем максимальную частоту или понижающем существующее напряжение,
появляется предупреждение: нестабильная точка приводит к зависанию платы под нагрузкой. Применение делает
резервную копию и запрашивает пароль; безопасно определить собственный предел платы — задача
&lt;a href="https://github.com/RobertoTorino/bc250-gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Проверить точку перед сохранением&lt;/b&gt; использует доступный только root интерфейс D-Bus governor
&lt;code&gt;TestMode&lt;/code&gt; (один запрос &lt;code&gt;pkexec&lt;/code&gt;): GPU фиксируется на введённых вами частоте и напряжении,
автоматическое масштабирование останавливается, а тепловой троттлинг остаётся активным. В &lt;code&gt;config.toml&lt;/code&gt;
ничего не записывается. Поля предзаполняются из выбранной строки; предупреждение появляется выше 2000 МГц / 1000 мВ
или когда напряжение ниже того, что дала бы кривая выше. &lt;b&gt;Нагрузка&lt;/b&gt; выбирает найденный в PATH генератор
нагрузки GPU (vkmark, glmark2, vkcube или glxgears, в этом порядке предпочтения); он запускается вместе с тестом
и завершается по его окончании, а если он аварийно завершится, пока точка зафиксирована, об этом сообщается в
статусе. Без него нагрузите GPU самостоятельно и следите за страницей «Обзор». &lt;b&gt;Остановить тест&lt;/b&gt;, таймер
(по умолчанию 60 с, &lt;i&gt;До остановки&lt;/i&gt; = 0), закрытие приложения или любое действие на странице «Производительность»
завершают тест, выключая режим производительности, что возвращает governor к обычному масштабированию с начальным
диапазоном. Строка результата затем сообщает, как долго точка удерживалась, пиковую температуру и диапазон частот;
&lt;b&gt;Добавить в таблицу&lt;/b&gt; помещает проверенную пару в таблицу безопасных точек (с сортировкой, заменяя точку с той
же частотой), чтобы вы могли её применить. Пока точка зафиксирована, отслеживается &lt;b&gt;журнал ядра&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) на предмет проблем amdgpu (тайм-ауты ring, сбросы GPU, строки &lt;code&gt;*ERROR*&lt;/code&gt;,
отказы SMU); первая такая строка немедленно прерывает тест, освобождая точку до того, как плата зависнет, и
приводится в результате. Чистый запуск также сообщается. Для чтения кольца ядра требуется членство в группе
&lt;code&gt;systemd-journal&lt;/code&gt; (или &lt;code&gt;wheel&lt;/code&gt;); иначе статус сообщает, что журнал не отслеживается, и тест
выполняется вслепую. Точка, которую кристалл не может удержать, может всё равно привести к зависанию платы быстрее,
чем ядро успеет её залогировать, поэтому сначала сохраните свою работу. D-Bus есть только у governor smu.&lt;/p&gt;

&lt;h2&gt;Производительность&lt;/h2&gt;
&lt;p&gt;Управление governor во время выполнения через D-Bus — именно то, что делает собственная обёртка governor
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;. Изменения применяются немедленно, не требуют пароля и теряются при
следующем перезапуске governor; &lt;code&gt;config.toml&lt;/code&gt; не затрагивается. &lt;i&gt;Скопировать значения времени
выполнения на страницу «Настройка»&lt;/i&gt; переносит текущий диапазон и пороги на страницу «Настройка», чтобы вы могли
их сохранить.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Режим производительности&lt;/b&gt; — переключатель (красный, когда включён): включение открывает весь допустимый
(по безопасным точкам) диапазон; выключение возвращает диапазон &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Зафиксировать частоту&lt;/b&gt; закрепляет частоту и включает режим производительности.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Задать диапазон&lt;/b&gt; применяет временный min/max.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Задать целевую нагрузку&lt;/b&gt; и &lt;b&gt;Задать температуры&lt;/b&gt; меняют диапазон нагрузки (нижний/верхний %) и
температуры троттлинга/восстановления, с которыми масштабирует governor, не затрагивая режим производительности
или выполняющийся тест безопасной точки. Поля следуют за текущими значениями governor и заполняются заново при их
изменении; невозможные пары (нижнее не ниже верхнего, восстановление не ниже троттлинга) отключают кнопку.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Элементы управления отключены, если служба не запущена или имя шины не опубликовано; причина показывается под
элементами управления. Включите &lt;code&gt;[dbus] enabled&lt;/code&gt; на странице «Настройка» и при необходимости
перезапустите governor.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Для каждой игры&lt;/b&gt; формирует строку запуска для обёртки governor
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;: обычный режим производительности, &lt;code&gt;--fixed-frequency&lt;/code&gt;,
&lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; или &lt;code&gt;--temperature&lt;/code&gt;, предзаполненные текущими числами
governor, отформатированные для параметров запуска Steam (&lt;code&gt;… %command%&lt;/code&gt;), команды обёртки
Heroic/Lutris или терминала. &lt;b&gt;Копировать&lt;/b&gt; помещает это в буфер обмена. Обёртка применяет настройку, запускает
игру и выключает режим производительности при её завершении, что также возвращает governor к начальному диапазону.
Для этого нужна включённая D-Bus, как и для элементов управления выше.&lt;/p&gt;

&lt;h2&gt;Резервные копии&lt;/h2&gt;
&lt;p&gt;Каждая запись создаёт копию &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; рядом с конфигурацией. Страница
отображает их список, показывает отличие между копией и текущим файлом, а &lt;b&gt;Восстановить выбранное&lt;/b&gt; возвращает
копию (текущий файл сначала резервируется, пароль запрашивается один раз). После этого governor перезапускается,
если не снять этот флажок.&lt;/p&gt;

&lt;h2&gt;Служба&lt;/h2&gt;
&lt;p&gt;Запуск, остановка, перезапуск, включение или отключение &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, с
выводом &lt;code&gt;systemctl status&lt;/code&gt; и &lt;b&gt;журналом в реальном времени&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;,
последние 200 строк и всё, что появляется, пока страница открыта, хранится до 2000 строк). Поле фильтра принимает
текст или регулярное выражение, без учёта регистра; снимите флажок &lt;b&gt;Следовать&lt;/b&gt;, чтобы читать без прокрутки.
Для чтения системных юнитов нужно членство пользователя в группе &lt;code&gt;wheel&lt;/code&gt; или &lt;code&gt;systemd-journal&lt;/code&gt;,
что выполняется в Bazzite. Каждое действие службы запрашивает пароль.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Проверить обновления&lt;/b&gt; сравнивает установленный RPM &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; с последним
выпуском &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
на GitHub (один запрос к api.github.com; также выполняется при запуске, если не отключено в «Параметры»). Более
новый выпуск показывается оранжевым со ссылкой на его примечания. Обновляйте пакет тем же способом, каким вы его
установили: COPR &lt;code&gt;filippor/bazzite&lt;/code&gt; через &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; при наслоении, либо архив
выпуска.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Экспорт диагностики…&lt;/b&gt; записывает один текстовый файл для отчёта об ошибке: версии приложения, governor и
Bazzite, CPU/GPU, &lt;code&gt;config.toml&lt;/code&gt; и его резервные копии, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;,
последние 300 строк журнала, интерфейс D-Bus, командную строку ядра, сообщения ядра amdgpu, датчики hwmon и
исходную таблицу &lt;code&gt;gpu_metrics&lt;/code&gt; (разобранную и в виде шестнадцатеричного дампа). Прочитайте файл и
удалите всё, чем вы не хотите делиться, прежде чем прикреплять его к issue.&lt;/p&gt;

&lt;h2&gt;Параметры&lt;/h2&gt;
&lt;p&gt;Параметры приложения, хранятся для каждого пользователя. &lt;b&gt;Системный трей&lt;/b&gt;: показывать значок в трее,
всплывающая подсказка которого содержит нагрузку, частоту, температуру GPU, режим производительности и состояние
governor; щелчок левой кнопкой показывает или скрывает окно, меню переключает режим производительности (если
D-Bus доступна) и закрывает приложение. При включённом флажке &lt;i&gt;Закрытие окна оставляет приложение работающим в
трее&lt;/i&gt; кнопка закрытия окна прячет его в трей вместо выхода; для выхода используйте меню трея. &lt;b&gt;Запускать при
входе в систему&lt;/b&gt; записывает &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (ничего во всю
систему), при желании запускаясь скрытым в трее с &lt;code&gt;--start-in-tray&lt;/code&gt;. В сеансе KDE Plasma в Bazzite есть
встроенный трей, поэтому это работает «из коробки»; в сеансе GNOME потребуется расширение AppIndicator.
&lt;b&gt;Оповещения&lt;/b&gt; — это уведомления рабочего стола через значок в трее (только строка состояния, если трей
выключен): достижение GPU выбранной вами температуры, достижение GPU собственной температуры троттлинга governor
(значение времени выполнения, если доступна D-Bus, иначе — значение из &lt;code&gt;config.toml&lt;/code&gt;), а также остановка
или сбой службы governor после того, как приложение видело её запущенной. Оповещение о температуре срабатывает один
раз за пересечение порога и взводится снова на 5 °C ниже него; одно и то же оповещение повторяется не чаще, чем
раз в 5 минут.&lt;/p&gt;

&lt;h2&gt;Старый governor tt&lt;/h2&gt;
&lt;p&gt;Запущенное с &lt;code&gt;--backend tt&lt;/code&gt; (или автоматически, когда загружен только
&lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;), приложение вместо этого управляет
&lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. У этого governor нет fix-metrics, диапазона частот,
D-Bus или выпусков на GitHub, поэтому страницы «Использование GPU» и «Производительность», соответствующие
разделы «Настройка», поле &lt;code&gt;down-events&lt;/code&gt; и проверка обновлений скрыты, а датчик нагрузки GPU остаётся
недоступным. Всё остальное, включая &lt;code&gt;[timing]&lt;/code&gt; и &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, работает так же.&lt;/p&gt;

&lt;h2&gt;Привилегии&lt;/h2&gt;
&lt;p&gt;Приложение работает от имени вашего обычного пользователя. Только четыре действия требуют root и проходят через
&lt;code&gt;pkexec&lt;/code&gt;: резервное копирование, запись &lt;code&gt;config.toml&lt;/code&gt;, действия &lt;code&gt;systemctl&lt;/code&gt; и
тест безопасной точки (&lt;code&gt;busctl&lt;/code&gt; на доступном только root интерфейсе TestMode). Пароль обрабатывается
агентом polkit рабочего стола; приложение никогда его не видит.&lt;/p&gt;

&lt;h2&gt;Установка и обновление&lt;/h2&gt;
&lt;p&gt;Архив выпуска содержит &lt;code&gt;install.sh&lt;/code&gt;. Он устанавливает приложение только для вашего пользователя
(отдельное venv с PyQt6 в &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, лаунчер
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, запись .desktop и значок), поэтому оно появляется в меню
приложений. Запустите его снова из более новой версии, чтобы обновиться, &lt;code&gt;./install.sh --uninstall&lt;/code&gt;
удаляет приложение. Ничего не наслаивается через rpm-ostree, и конфигурация governor никогда не затрагивается.&lt;/p&gt;

&lt;h2&gt;Ссылки&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Это приложение: &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;Governor (filippor, ветка SMU): &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Распространяется по лицензии GNU General Public License v3.0 или более поздней. Шрифт Inter (SIL Open Font
License) включён в комплект.&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>это не экспорт телеметрии: нет столбца «time»</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>это не экспорт телеметрии: отсутствуют столбцы %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Режим производительности</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Весь диапазон безопасных точек, более быстрая реакция на нагрузку. То же, что и кнопка «Вкл».</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Фиксированная частота</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency: зафиксировать частоту GPU для этой игры (должна находиться в допустимом диапазоне).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Диапазон частот</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range: временный min/max, 0 = без ограничения.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Целевая нагрузка</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target: нижняя/верхняя нагрузка GPU, определяющая повышение и понижение частоты.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Температура</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature: пороги троттлинга / восстановления в °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Параметры запуска Steam</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → игра → «Свойства» → «Общие» → «Параметры запуска». Вставьте всю строку.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Обёртка Heroic / Lutris</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic: настройки игры → «Дополнительно» → «Команда-обёртка». Lutris: параметры раннера → «Префикс команды». Нужна только часть обёртки; сам лаунчер добавит запуск игры.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Терминал / скрипт</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>Замените &lt;program&gt; на команду для запуска.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>Датчик amdgpu hwmon</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Таблица gpu_metrics</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2 мин</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10 мин</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30 мин</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60 мин</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>average_gfx_activity из исправленной таблицы gpu_metrics governor.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>Датчик sysfs amdgpu gpu_busy_percent.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Запасной вариант: radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Таблица</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>Активность GFX</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>Активность MM</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>Температура GFX</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>Температура SoC</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>Мощность сокета</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>Мощность GFX</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>Мощность CPU</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>Частота GFX</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Средняя частота GFX</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>Частота SoC</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Частота памяти</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Частота fabric</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>Состояние троттлинга</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>Ядра CPU</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Только cyan-skillfish-governor-smu публикует значение нагрузки (fix-metrics); governor tt этого не делает, поэтому это остаётся недоступным.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>Установите cyan-skillfish-governor-smu; он измеряет нагрузку и публикует её через gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>Включите fix-metrics на странице «Использование GPU» и примените с перезапуском.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Запустите службу governor на странице «Служба»; fix-metrics включён, но нагрузку никто не публикует.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics включён и служба работает, но исправленная gpu_metrics не смонтирована: проверьте журнал.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>Исправленная таблица gpu_metrics не содержит корректного значения нагрузки; проверьте журнал на странице «Служба».</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1 мин %2 с</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1 с</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 Вт (исходно %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (недопустимо)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 МГц</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C макс.</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>без ограничения</translation>
    </message>
    <message>
        <source>%1 – %2 MHz</source>
        <translation>%1 – %2 МГц</translation>
    </message>
</context>
<context>
    <name>safepoints_page</name>
    <message>
        <source>At least %1 points are needed.</source>
        <translation>Требуется не менее %1 точек.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 МГц встречается дважды.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 МГц вне диапазона 1–%2 МГц.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 мВ при %2 МГц вне диапазона %3–%4 мВ.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 мВ при %2 МГц ниже, чем %3 мВ при %4 МГц; напряжение не должно снижаться с ростом частоты (правило governor).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 МГц выше %2 МГц, при которых многие платы начинают намертво зависать.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 мВ выше %2 мВ; следите за температурой и блоком питания.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Нет (нагрузите GPU самостоятельно)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub ответил %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>нет соединения (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>неожиданный тег %1</translation>
    </message>
</context>
</TS>
