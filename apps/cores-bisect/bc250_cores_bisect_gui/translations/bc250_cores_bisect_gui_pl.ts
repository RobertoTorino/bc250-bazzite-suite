<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="pl">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>o programie</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Wersja {0}</translation>
    </message>
    <message>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Ekran konfiguracji PyQt6 dla bc250-cores-bisect.sh: wybierz opcje i uruchom przebieg, który następnie trwa dalej w terminalu dokładnie tak, jakby został wpisany ręcznie.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencja: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>pomoc</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>Nie udało się odczytać bc250-cores-bisect.sh --help.

Uruchom go zamiast tego w terminalu:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Pomoc</translation>
    </message>
    <message>
        <source>About</source>
        <translation>O programie</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Wybierz, jak ma działać bc250-cores-bisect.sh, a następnie kliknij Start. To okno zostanie zamknięte, a właściwy przebieg będzie kontynuowany w terminalu, dokładnie tak jak przy ręcznym uruchomieniu skryptu.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Obciążenie na próbę (sekundy):</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>Obciążenie CPU na próbę (-t). Minimum {0}s, domyślnie {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Rundy na element:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Próby na element (-r), przeplatane tak, aby temperatura ani pora dnia nie faworyzowały żadnego elementu. Pojedyncza runda nie pozwala odróżnić naprawdę wadliwego rdzenia od losowej awarii.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Narzędzie obciążające:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (domyślnie)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>test wytrzymałościowy mprime</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>oba (stress-ng, potem mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng sam weryfikuje swoje wyniki i jest zawsze dostępny. Test wytrzymałościowy mprime to znacznie cięższe obciążenie AVX/FMA, które również sprawdza każdy wynik, więc wychwytuje ciche błędy obliczeń pomijane przez stress-ng — trzeba go jednak zainstalować osobno. „oba” uruchamia je jeden po drugim, więc próba trwa dwa razy dłużej.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Licz także błędy sprzętowe przy użyciu rasdaemon</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: odczytuje bazę błędów ras-mc-ctl przed każdą próbą i po niej. rasdaemon zapisuje błędy trwale, więc są one liczone również wtedy, gdy dziennik jest ulotny lub próba kończy się awarią. Wymaga działającej usługi rasdaemon.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>To samo uruchomienie (bez restartu między próbami)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: znacznie szybciej, ale każda próba dziedziczy wtedy stan poprzedniej, więc trudniej przypisać awarię konkretnemu rdzeniowi.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Bez nadzoru (bez pytań, automatyczny restart, wznawianie po zalogowaniu)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: o nic nie pyta, samodzielnie restartuje i kontynuuje po każdym zalogowaniu, aż wszystkie elementy zostaną ukończone. Wymaga sudo bez hasła dla setpci i journalctl — zobacz README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Zainstaluj także usługę logowania do automatycznego wznawiania (zalecane przy trybie Bez nadzoru)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Zapisuje i włącza ~/.config/systemd/user/bc250-cores-bisect-auto.service, dzięki czemu przebieg uruchamia się ponownie po każdym restarcie i zalogowaniu, tak jak w liście kontrolnej --auto w README. Skrypt usuwa ją ponownie, gdy wszystkie elementy są ukończone.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Resetuj</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: trwale usuwa wszystkie zapisane wyniki i dzienniki w ~/.local/share/bc250-cores-bisect, więc następny przebieg zaczyna się od zera.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Pokaż stan (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Pokazuje dotychczasowe wyniki, zapisuje raport i kończy działanie.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Uruchom Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Szacunkowo: ~{0:.1f} h dla typowej płyty ({1} elementów x {2} rund){3}. Przebieg można wznowić — wyniki są zapisywane po każdej próbie.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, wliczając restarty</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>Usunąć wszystkie wyniki bc250-cores-bisect?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Spowoduje to trwałe usunięcie każdego zapisanego wyniku i dziennika w ~/.local/share/bc250-cores-bisect (--reset). Nie można tego cofnąć i nie ma kopii zapasowej. Skrypt i tak poprosi jeszcze raz o potwierdzenie w terminalu.</translation>
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
        <translation>Uruchomić bc250-cores-bisect.sh z ustawieniami:

  czas obciążenia: {t}s
  rundy: {r}
  narzędzie obciążające: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  bez nadzoru: {au}

To okno zostanie zamknięte, a przebieg będzie kontynuowany w terminalu.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>Nie udało się zainstalować usługi logowania do automatycznego wznawiania:
{0}

Przebieg i tak zostanie teraz uruchomiony; zobacz listę kontrolną --auto w README, aby skonfigurować ją ręcznie.</translation>
    </message>
</context>
</TS>
