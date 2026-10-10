<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

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
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Окно настройки на PyQt6 для bc250-cores-bisect.sh: выберите параметры и запустите проверку, которая затем продолжится в терминале точно так же, как если бы вы ввели команду вручную.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Лицензия: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>справка</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>Не удалось прочитать вывод bc250-cores-bisect.sh --help.

Запустите его в терминале:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Справка</translation>
    </message>
    <message>
        <source>About</source>
        <translation>О программе</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Выберите, как запустить bc250-cores-bisect.sh, и нажмите «Старт». Это окно закроется, а сама проверка продолжится в терминале — точно так же, как при ручном запуске скрипта.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Нагрузка на попытку (секунды):</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>Нагрузка на CPU за попытку (-t). Минимум {0}s, по умолчанию {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Раундов на пункт:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Попыток на пункт (-r), чередуются, чтобы нагрев и время суток не давали преимущества какому-либо пункту. По одному раунду нельзя отличить действительно неисправное ядро от случайного сбоя.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Инструмент нагрузки:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (по умолчанию)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>стресс-тест mprime</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>оба (stress-ng, затем mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng проверяет собственные результаты и доступен всегда. Стресс-тест mprime — гораздо более тяжёлая нагрузка AVX/FMA, которая тоже проверяет каждый результат, поэтому он обнаруживает скрытые ошибки вычислений, пропускаемые stress-ng, но его нужно устанавливать отдельно. «оба» запускает их один за другим, поэтому попытка длится вдвое дольше.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Также считать аппаратные ошибки через rasdaemon</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: читает базу ошибок ras-mc-ctl до и после каждой попытки. rasdaemon хранит ошибки постоянно, поэтому они учитываются даже тогда, когда журнал хранится только в памяти или попытка заканчивается крахом. Требуется запущенная служба rasdaemon.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>Та же загрузка системы (без перезагрузки между попытками)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: намного быстрее, но тогда каждая попытка наследует состояние предыдущей, поэтому сбой труднее связать с конкретным ядром.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Без присмотра (без вопросов, автоперезагрузка, продолжение после входа)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: ничего не спрашивает, перезагружается самостоятельно и продолжает после каждого входа в систему, пока не будут выполнены все пункты. Требуется sudo без пароля для setpci и journalctl — см. README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Также установить службу автопродолжения при входе (рекомендуется вместе с режимом «Без присмотра»)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Создаёт и включает ~/.config/systemd/user/bc250-cores-bisect-auto.service, чтобы проверка перезапускалась сама после каждой перезагрузки и входа в систему — как в контрольном списке --auto из README. Скрипт удалит службу, как только все пункты будут выполнены.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Сброс</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: безвозвратно удаляет все сохранённые результаты и журналы в ~/.local/share/bc250-cores-bisect, так что следующий запуск начнётся с нуля.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Показать статус (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Показывает полученные результаты, записывает отчёт и завершает работу.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Запустить Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Грубая оценка: ~{0:.1f} ч для типичной платы ({1} пунктов x {2} раунда){3}. Проверку можно продолжить позже — результаты сохраняются после каждой попытки.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, с учётом перезагрузок</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>Удалить все результаты bc250-cores-bisect?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Это безвозвратно удалит все сохранённые результаты и журналы в ~/.local/share/bc250-cores-bisect (--reset). Отменить это невозможно, резервной копии нет. Скрипт всё равно ещё раз попросит подтверждение в терминале.</translation>
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
        <translation>Запустить bc250-cores-bisect.sh со следующими параметрами:

  время нагрузки: {t}s
  раунды: {r}
  инструмент нагрузки: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  без присмотра: {au}

Это окно закроется, и проверка продолжится в терминале.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>Не удалось установить службу автопродолжения при входе:
{0}

Проверка всё равно начнётся сейчас; настроить её вручную поможет контрольный список --auto в README.</translation>
    </message>
</context>
</TS>
