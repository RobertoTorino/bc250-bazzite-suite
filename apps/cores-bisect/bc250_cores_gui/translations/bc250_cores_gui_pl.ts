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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Nakładka PyQt6 dla bc250-cores-unlock.sh: utrzymuje po restartach odblokowanie rdzeni 8C/16T w BC-250, zweryfikowane już za pomocą bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencja: GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = zawsze włączony (6C/12T)   ok = zaliczył każdą rundę   xx = zawsze zawodzi   ?? = losowo   .. = jeszcze nietestowany</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>O programie</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Zachowuje po ponownych uruchomieniach odblokowanie rdzeni 8C/16T zweryfikowane już za pomocą bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Zainstaluj (zachowaj 8C/16T po każdym uruchomieniu)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Włącza usługę roota, która po zimnym starcie ponownie stosuje odblokowanie i raz wykonuje ciepły restart.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Odinstaluj (stock po następnym wyłączeniu)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Usuwa usługę. Odblokowanie pozostaje aktywne do następnego pełnego wyłączenia (zimnego startu).</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Odśwież stan</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Pokazuje maskę obecności rdzeni, wątki oraz stan usługi i guard.</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>Stan z sudo</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>Uruchamia sprawdzenie stanu jako root (pyta o hasło sudo), dzięki czemu pokazuje też maskę obecności rdzeni.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Sprawdź ponownie wyniki bisekcji</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Ponownie odczytuje wyniki zapisane przez bc250-cores-bisect.sh, np. po ukończeniu kolejnych rund.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>Tutaj pojawi się wynik działania bc250-cores-unlock.sh.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ ZAAKCEPTOWANO</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ JESZCZE NIE ZAAKCEPTOWANO!</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>Trwa — instalowanie…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>Trwa — odinstalowywanie…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>Trwa…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo: błąd uwierzytelniania.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Nieprawidłowe hasło, spróbuj ponownie.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} zakończone, kod wyjścia {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} nie powiodło się (kod wyjścia {1}). Zobacz dane wyjściowe powyżej.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>Czy wszystkie 8 rdzeni (16 wątków) ma pozostać włączone przy każdym uruchomieniu?

Usługa roota sprawdza maskę rdzeni przy każdym uruchomieniu. Po zimnym starcie ponownie stosuje odblokowanie i raz wykonuje ciepły restart. Jeśli odblokowanie nie jest teraz aktywne, po instalacji wykonaj ciepły restart, aby uruchomić rdzenie.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>Usunąć usługę odblokowania? 8 rdzeni pozostanie włączonych do następnego pełnego wyłączenia (zimnego startu); potem płyta wróci do stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>hasło administratora</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Zapis do SMU mailbox i instalacja usługi systemd wymagają uprawnień roota, dlatego bc250-cores-unlock.sh jest uruchamiane przez sudo.
Twoje hasło trafia wyłącznie do sudo i nigdy nie jest zapisywane.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>hasło sudo</translation>
    </message>
</context>
</TS>
