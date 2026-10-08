<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="pl">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>O programie</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Stosuje zaakceptowaną maskę od razu i automatycznie ponawia to przy każdym kolejnym uruchomieniu.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Wyłącza usługę odblokowania; płyta wraca do fabrycznych 24 CU od następnego restartu.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Pokazuje zainstalowane maski, stan usługi i maski na żywo (bez uprawnień roota).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Ponownie odczytuje zapisane wyniki bc250-cu-bisect.sh, np. po kolejnym teście.</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>Nieprawidłowe hasło, spróbuj ponownie.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Zachowuje odblokowanie CU już zweryfikowane za pomocą bc250-cu-bisect.sh po ponownych uruchomieniach.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Zainstaluj (zastosuj teraz i zachowaj po restarcie)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Odinstaluj (powrót do ustawień fabrycznych po następnym uruchomieniu)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Odśwież stan</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Sprawdź ponownie wyniki bisekcji</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>Tutaj pojawi się wynik działania bc250-cu-unlock.sh.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ ZAAKCEPTOWANO</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ JESZCZE NIE ZAAKCEPTOWANO!</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: błąd uwierzytelniania.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} zakończone, kod wyjścia {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} nie powiodło się (kod wyjścia {1}). Zobacz dane wyjściowe powyżej.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>Zastosować {0} ({1} CU) teraz i pozostawić włączone przy każdym uruchomieniu?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>Wyłączyć usługę odblokowania? Płyta wróci do fabrycznych 24 CU po następnym restarcie.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>hasło administratora</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>Zapisywanie rejestrów GPU i instalacja usługi systemd wymagają uprawnień roota, dlatego bc250-cu-unlock.sh jest uruchamiane przez sudo.
Twoje hasło trafia wyłącznie do sudo i nigdy nie jest zapisywane.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>hasło sudo</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Nakładka PyQt6 dla bc250-cu-unlock.sh: utrzymuje odblokowanie jednostek obliczeniowych BC-250 zweryfikowane już za pomocą bc250-cu-bisect.sh po restartach.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licencja: GNU GPLv3.</translation>
    </message>
</context>
</TS>
