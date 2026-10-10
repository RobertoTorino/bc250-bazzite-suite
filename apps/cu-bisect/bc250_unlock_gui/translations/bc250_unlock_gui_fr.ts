<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="fr">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>À propos</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>Applique le masque accepté maintenant et le réapplique automatiquement à chaque futur démarrage.</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>Désactive le service de déverrouillage ; la carte revient aux 24 CU d'origine dès le prochain redémarrage.</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>Affiche les masques installés, l'état du service et les masques en direct (aucun droit root requis).</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>Relit les résultats enregistrés par bc250-cu-bisect.sh, par exemple après un autre nouveau test.</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>En cours — installation…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>En cours — désinstallation…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>En cours…</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Mot de passe incorrect, réessayez.</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Conserve un déverrouillage de CU déjà validé avec bc250-cu-bisect.sh après les redémarrages.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>Installer (appliquer maintenant et conserver après redémarrage)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>Désinstaller (retour à la configuration d'origine au prochain démarrage)</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>Actualiser l'état</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>Revérifier les résultats de la bissection</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>La sortie de bc250-cu-unlock.sh apparaît ici.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ ACCEPTÉ</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ PAS ENCORE ACCEPTÉ !</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo : échec de l'authentification.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>({0} terminé, code de sortie {1})</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} a échoué (code de sortie {1}). Voir la sortie ci-dessus.</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>Appliquer {0} ({1} CU) maintenant et le conserver activé à chaque démarrage ?</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>Désactiver le service de déverrouillage ? La carte revient aux 24 CU d'origine au prochain redémarrage.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>mot de passe administrateur</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>L'écriture des registres GPU et l'installation du service systemd nécessitent les droits root ; ceci exécute donc bc250-cu-unlock.sh via sudo.
Votre mot de passe est transmis uniquement à sudo et n'est jamais stocké.</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>mot de passe sudo</translation>
    </message>
</context>
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>à propos</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>Version {0}</translation>
    </message>
    <message>
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>Une interface PyQt6 pour bc250-cu-unlock.sh : conserve un déverrouillage des unités de calcul BC-250 déjà validé avec bc250-cu-bisect.sh après chaque redémarrage.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licence : GNU GPLv3.</translation>
    </message>
</context>
</TS>
