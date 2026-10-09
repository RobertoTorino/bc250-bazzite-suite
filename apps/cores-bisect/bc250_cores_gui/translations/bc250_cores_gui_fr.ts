<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="fr">
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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Une interface PyQt6 pour bc250-cores-unlock.sh : conserve après chaque redémarrage le déverrouillage des cœurs 8C/16T de la BC-250 déjà validé avec bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licence : GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = toujours activé (6C/12T)   ok = a réussi à chaque tour   xx = échoue à chaque fois   ?? = aléatoire   .. = pas encore testé</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>À propos</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>Conserve après les redémarrages le déverrouillage des cœurs 8C/16T déjà validé avec bc250-cores-bisect.sh.</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>Installer (conserver 8C/16T à chaque démarrage)</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>Active le service root qui réapplique le déverrouillage après un démarrage à froid et effectue une fois un redémarrage à chaud.</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>Désinstaller (stock après la prochaine extinction)</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>Supprime le service. Le déverrouillage reste actif jusqu'à la prochaine extinction complète (démarrage à froid).</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>Actualiser l'état</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>Affiche le masque de présence des cœurs, les threads ainsi que l'état du service et du guard.</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>État avec sudo</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>Exécute l'état en root (demande le mot de passe sudo), pour afficher aussi le masque de présence des cœurs.</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>Revérifier les résultats de la bissection</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>Relit les résultats enregistrés par bc250-cores-bisect.sh, par exemple après la fin de nouveaux tours.</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>La sortie de bc250-cores-unlock.sh apparaît ici.</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ ACCEPTÉ</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ PAS ENCORE ACCEPTÉ !</translation>
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
        <source>sudo: authentication failed.</source>
        <translation>sudo : échec de l'authentification.</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>Mot de passe incorrect, réessayez.</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>({0} terminé, code de sortie {1})</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} a échoué (code de sortie {1}). Voir la sortie ci-dessus.</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>Garder les 8 cœurs (16 threads) activés à chaque démarrage ?

Un service root vérifie le masque des cœurs à chaque démarrage. Après un démarrage à froid, il réapplique le déverrouillage et effectue une fois un redémarrage à chaud. Si le déverrouillage n'est pas actif pour le moment, redémarrez (à chaud) après l'installation pour activer les cœurs.</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>Supprimer le service de déverrouillage ? Les 8 cœurs restent activés jusqu'à la prochaine extinction complète (démarrage à froid) ; ensuite la carte revient au stock 6C/12T.</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>mot de passe administrateur</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>L'écriture de la SMU mailbox et l'installation du service systemd nécessitent les droits root ; ceci exécute donc bc250-cores-unlock.sh via sudo.
Votre mot de passe est transmis uniquement à sudo et n'est jamais stocké.</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>mot de passe sudo</translation>
    </message>
</context>
</TS>
