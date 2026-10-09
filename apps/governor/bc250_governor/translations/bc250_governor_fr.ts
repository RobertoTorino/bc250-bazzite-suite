<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="fr">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>Température du GPU</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>Le GPU est à %1 °C (alerte réglée à %2 °C).</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Limitation par le gouverneur</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>Le GPU est à %1 °C, à la température de limitation du gouverneur (%2 °C) ou au-dessus ; la fréquence maximale est abaissée.</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>a échoué</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>est arrêté</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Le gouverneur %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>Le service du gouverneur %1 ; le GPU fonctionne aux fréquences par défaut du pilote. Voir la page Service.</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>Sauvegardes</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualiser</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>Avant chaque écriture, l'application copie %1 vers config.toml.bak-YYYYMMDD-HHMMSS à côté. Choisissez-en une pour voir les différences avec le fichier actuel ; Restaurer la remet en place (le fichier actuel est d'abord sauvegardé, rien n'est donc perdu).</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>Copies, les plus récentes en premier</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>Créée</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>Taille</translation>
    </message>
    <message>
        <source>File</source>
        <translation>Fichier</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>Aucune sauvegarde pour le moment.</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>Différence : sauvegarde → fichier actuel</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>Redémarrer le gouverneur après la restauration</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>Restaurer la sélection</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>Fait de la copie sélectionnée la configuration à nouveau (demande votre mot de passe).</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>Sélectionnez une sauvegarde pour la comparer avec le fichier actuel.</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>Impossible de lire %1 : %2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>Identique au fichier actuel.</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>Recharger depuis le disque</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annule les modifications de toutes les pages et réaffiche les valeurs de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Redémarrer le gouverneur après l'application</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Le gouverneur ne lit config.toml qu'au démarrage.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Appliquer les modifications</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Demande votre mot de passe une seule fois (pkexec), effectue une sauvegarde horodatée de config.toml et écrit %1. Les modifications en attente de l'autre page de configuration sont également écrites.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 est introuvable. Le gouverneur SMU Cyan Skillfish ne semble pas être installé.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 est installé, mais %2 n'existe pas.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Le gouverneur SMU Cyan Skillfish est installé et configuré.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'authentification a été annulée.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>Échec de pkexec (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Action de service non prise en charge : %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 n'a pas d'interface D-Bus.</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1 est introuvable. Le gouverneur SMU Cyan Skillfish ne semble pas être installé.</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 est installé, mais %2 n'existe pas.</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Le gouverneur SMU Cyan Skillfish est installé et configuré.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'authentification a été annulée.</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>Échec de pkexec (%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>Action de service non prise en charge : %1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 n'a pas d'interface D-Bus.</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>Échec de busctl (%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 n'est pas sur le bus système (gouverneur arrêté, ou [dbus] enabled = false).</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>Le gouverneur a répondu sur le bus, mais ses propriétés n'ont pas pu être lues.</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>L'authentification a été annulée.</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>Méthode d'utilisation du GPU non prise en charge : %1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>Source de température non prise en charge : %1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>gpu.set-method non pris en charge : %1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every doit être au moins 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals doit être au moins 1 µs</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust ne doit pas être plus court que sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples doit être 0 (désactivé) ou 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events doit être au moins 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal doit être positif</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst doit être supérieur à normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust ne peut pas être négatif</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>Les fréquences ne peuvent pas être négatives</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min ne doit pas dépasser frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target nécessite 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling doit être compris entre 0 et 100 °C</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery doit être inférieur à temperature.throttling (ou 0)</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>Utilisation du GPU</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>corriger l'utilisation du GPU dans gpu_metrics</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>Écrit la charge mesurée par le gouverneur dans une table gpu_metrics modifiée et la monte par bind-mount sur sysfs, afin que MangoHud, l'overlay de Steam, radeontop et cette application affichent un vrai pourcentage au lieu du bug à 655 %.</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>corriger la fréquence du GPU dans hwmon</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>Remplace freq1_input de hwmon par la fréquence lue depuis le SMU. Corrige le mauvais rapport de fréquence de sysfs, surtout après le déblocage 8 cœurs. Indépendant de fix-metrics.</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>Méthode de charge :</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>Source de température :</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>Vide la table de métriques corrigée tous les N cycles de mise à jour (10 par défaut).</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>appliquer fréquence/tension via :</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>les nouvelles valeurs</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>Seules les clés gérées par cette application ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) sont écrites ; toute autre ligne du fichier, y compris les commentaires et la table des points sûrs, reste inchangée. Avant chaque écriture, une copie nommée config.toml.bak-YYYYMMDD-HHMMSS est créée à côté.</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.toml n'existe pas encore ; l'application le crée)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recharger depuis le disque</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annule les modifications de toutes les pages et réaffiche les valeurs de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Redémarrer le gouverneur après l'application</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Le gouverneur ne lit config.toml qu'au démarrage.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Appliquer les modifications</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Demande votre mot de passe une seule fois (pkexec), effectue une sauvegarde horodatée de config.toml et écrit %1. Les modifications en attente de l'autre page de configuration sont également écrites.</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>Filtre :</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>texte ou expression régulière, insensible à la casse</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>Suivre</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>Continue de défiler jusqu'à la dernière ligne. Décochez pour lire sans être déplacé.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>Oublie les lignes affichées jusqu'ici ; les nouvelles entrées continuent d'arriver.</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — connexion…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>Suivi de journalctl -u %1 ; jusqu'à %2 lignes sont conservées.</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>code de sortie %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl s'est arrêté (%1). Votre utilisateur doit peut-être appartenir au groupe systemd-journal ou wheel pour lire les unités système. Nouvelle tentative dans %2 s…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl s'est terminé ; redémarrage dans %1 s…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>journalctl n'est pas disponible sur ce système ; le journal ne peut pas être affiché.</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (pris littéralement, pas une expression régulière valide)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%1 ligne(s) sur %2 correspondent%3.</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>le journal du noyau n'est pas lisible par cet utilisateur (ajoutez-le au groupe systemd-journal)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k s'est terminé avec le code %1</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl n'est pas disponible</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>Par jeu</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>Le gouverneur fournit un script qui applique l'un de ces réglages pour un seul programme et désactive le mode performance à sa fermeture, ce qui restaure aussi la plage normale. Choisissez ce que le jeu doit recevoir, puis copiez la ligne dans son lanceur.</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Pour :</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>Copier</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>Copie la ligne dans le presse-papiers.</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>Fréquence à fixer, MHz.</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>Limite inférieure, 0 = aucune limite.</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>Limite supérieure, 0 = aucune limite.</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Aucune limite</translation>
    </message>
    <message>
        <source>to</source>
        <translation>à</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>En dessous de cette charge, le gouverneur abaisse la fréquence.</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>Au-dessus de cette charge, le gouverneur augmente la fréquence.</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>Limite au-dessus de cette température.</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>Reprend les fréquences normales en dessous de cette température.</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> Fraction de 1, comme dans config.toml.</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>La limite inférieure est supérieure à la limite supérieure.</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>La cible de charge inférieure doit être inférieure à la cible supérieure.</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>La température de reprise doit être inférieure à la température de limitation.</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>Copié</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>Charge du GPU</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>Fréquence du GPU</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>Température du GPU</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>Puissance</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Mode performance</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Gouverneur</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>Copié : %1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Vue d'ensemble</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>Utilisation du GPU</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>Réglages</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>Points sûrs</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>Performance</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>Sauvegardes</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>Service</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>Paramètres</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Aide</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Prêt</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>Charge %1 %</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>Charge N/A</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>mode performance</translation>
    </message>
    <message>
        <source>running</source>
        <translation>en cours d'exécution</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>non installé</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>est arrêté</translation>
    </message>
    <message>
        <source>%1
%2
Governor %3</source>
        <translation>%1
%2
Gouverneur %3</translation>
    </message>
    <message>
        <source>Still running in the tray; use Quit in its menu to leave.</source>
        <translation>Toujours en cours d'exécution dans la zone de notification ; utilisez Quitter dans son menu pour fermer.</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 modifications non appliquées. Fermer quand même ?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>Le service du gouverneur n'est pas en cours d'exécution.</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>N/A</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>Aucun capteur de fréquence.</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>Aucun capteur de température.</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>average_socket_power de la table gpu_metrics (APU entier) ; le SMU le rapporte en virgule fixe 24.8, affiché ici en watts</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>La table gpu_metrics ne rapporte aucune puissance du socket.</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>aucune limite</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activé</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Désactivé</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Plage actuelle %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus inaccessible.</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Absent</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>En cours d'exécution</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Échec</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>Arrêté</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> pages ont</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> page a</translation>
    </message>
    <message>
        <source> and </source>
        <translation> et </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>Modifications non appliquées : %1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>Valeurs invalides</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>Impossible d'écrire config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>Configuration appliquée</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>, sauvegarde : %1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>Enregistré, mais le redémarrage a échoué</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml a été mis à jour, mais le gouverneur n'a pas pu être redémarré.

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>Aucun texte d'erreur n'a été renvoyé.</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — échec du redémarrage</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>, gouverneur redémarré</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Appliquer les points sûrs</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>Écrire %1 points sûrs (%2–%3 MHz) dans config.toml ?

Le gouverneur suivra cette courbe. Un point que la puce ne peut pas tenir fige la carte sous charge ; une sauvegarde du fichier actuel est d'abord effectuée et peut être restaurée depuis la page Sauvegardes.</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>Points sûrs appliqués</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>aucun enregistré</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>Aucun profil nommé « %1 » (connus : %2).</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>Profil « %1 » chargé dans les formulaires ; appliquez pour l'écrire</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Appliquer le profil</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>Appliquer « %1 » ? Les %2 modifications non appliquées seront perdues.</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>Profil invalide</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>« %1 » ne peut pas être appliqué : %2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>Profil « %1 » appliqué</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>Profil « %1 » appliqué, gouverneur redémarré.</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>Associez cette commande à une touche dans les paramètres de raccourcis de votre bureau ; elle atteint l'application en cours d'exécution et applique le profil.</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>Enregistrer le profil</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>Nom du profil :</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>Remplacer le profil</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>« %1 » existe déjà. Le remplacer par les valeurs actuelles du formulaire ?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>Profil « %1 » enregistré</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>Supprimer le profil</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>Supprimer le profil « %1 » ?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>Profil « %1 » supprimé</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>Remplacer %1 par %2 ?

Le fichier actuel est d'abord sauvegardé.</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
Le gouverneur est ensuite redémarré.</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>Restaurer la sauvegarde</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>Impossible de restaurer la sauvegarde</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>%1 restauré</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Le gouverneur %1 est disponible (installé : %2) ; voir la page Service</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Une mise à jour du gouverneur (%1) est disponible.</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>Exporter l'historique de télémétrie</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>Fichiers CSV (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>Impossible d'écrire le fichier CSV</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1 échantillons (%2–%3) écrits dans %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>Comparer avec un export de télémétrie antérieur</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>Fichiers CSV (*.csv);;Tous les fichiers (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>Impossible de lire le fichier CSV</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>Rien à comparer</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>Le fichier ne contient aucun échantillon avec une heure lisible.</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%1 échantillons de référence du %2 tracés en pointillés</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>Exporter les diagnostics</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>Fichiers texte (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>Échec de l'export</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>Diagnostics exportés</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>Enregistré dans %1.

Lisez-le avant de le joindre à un rapport de bogue et retirez tout ce que vous ne souhaitez pas partager.</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1 : terminé</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>Échec de systemctl %1</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>Le test s'est terminé à cause de « %1 » sur la page Performance.</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1 : terminé</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>Échec de %1</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>Le gouverneur n'a renvoyé aucun texte d'erreur.</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>Mode performance activé</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>Mode performance désactivé</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>Fréquence fixe %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>Plage d'exécution %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>Cible de charge %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>non défini</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>Température %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>Valeurs d'exécution copiées vers la page Réglages ; appliquez pour les enregistrer</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>pendant %1 s</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>jusqu'à ce que vous l'arrêtiez</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> et exécuter %1 pour la charge</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>Tester un point sûr</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>Fixer le GPU à %1 MHz sous %2 mV %3%4 ?

Le gouverneur applique cette paire telle quelle et arrête sa mise à l'échelle automatique ; la limitation thermique reste active. Un point que la puce ne peut pas tenir fige la carte sous charge. Rien n'est écrit dans config.toml. Votre mot de passe vous sera demandé (l'interface TestMode est réservée au superutilisateur).</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>Échec du mode de test</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>%1 n'a pas pu être démarré (%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>Mode de test : %1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>interrompu après une erreur GPU dans le journal du noyau</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>a planté</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>s'est terminé avec le code %1</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>%1 %2 pendant que le point était fixé</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>Test de %1 MHz @ %2 mV %3 après %4 s</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> sous charge %1</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>pic %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>fréquence %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>fréquence %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ noyau : %1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (+%1 de plus)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>journal du noyau non surveillé</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>aucune erreur GPU dans le journal du noyau</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>. Le gouverneur met à nouveau l'échelle normalement.</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>terminé par la minuterie</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>Impossible de terminer le test</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

Redémarrer le gouverneur depuis la page Service met aussi fin au mode de test.</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>Le gouverneur s'est arrêté ; le test s'est terminé avec lui.</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>, %1 s restantes</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1.</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 charge le GPU.</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> Chargez le GPU vous-même.</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> Journal du noyau illisible, pas de détection de blocage.</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> Journal du noyau surveillé.</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>Test de %1 MHz @ %2 mV%3.%4%5 Surveillez la Vue d'ensemble ; Arrêter le test revient à la mise à l'échelle normale.</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Vue d'ensemble</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>État d'exécution</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Service du gouverneur</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Substitution de gpu_metrics</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>Capteur de charge du GPU</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics (enregistré)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Mode performance</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>Charge, fréquence et température du GPU</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>Fenêtre :</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>Quelle part des %1 dernières minutes le graphique affiche ; l'export contient toujours tout ce qui est conservé.</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>Exporter en CSV…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>Enregistre chaque échantillon conservé (heure, charge, fréquence, température, puissance du socket, mode performance, plage d'exécution) dans un fichier CSV.</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>Comparer…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>Charge un export CSV antérieur et le trace en pointillés derrière les courbes en direct, l'échantillon le plus récent au bord droit, avec les moyennes des deux sessions sous le graphique.</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>Effacer</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>Retire la session de référence du graphique.</translation>
    </message>
    <message>
        <source>% / °C</source>
        <translation>% / °C</translation>
    </message>
    <message>
        <source>MHz</source>
        <translation>MHz</translation>
    </message>
    <message>
        <source>Load %</source>
        <translation>Charge %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>Température °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>Fréquence MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>Charge % (réf)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>Température °C (réf)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>Fréquence MHz (réf)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Table gpu_metrics</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>Le BC-250 n'expose généralement aucun capteur gpu_busy_percent, mais le gouverneur mesure lui-même la charge et la publie dans sa table gpu_metrics modifiée tant que fix-metrics est activé et que le service fonctionne. L'application la lit depuis là ; un capteur absent s'affiche comme N/A, jamais comme 0 %.</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>Non installé</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Actif</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>Sous-état : %1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>Échec</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>L'unité a échoué ; voir le journal sur la page Service.</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>Inactif</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>inconnu</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>Monté</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>Non monté</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>Le gouverneur monte par bind-mount sa table gpu_metrics modifiée sur le fichier sysfs tant que fix-metrics est activé et que le service fonctionne.</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>Activé</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>Désactivé</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>Valeur enregistrée dans config.toml.</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>Indisponible</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>Disponible</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>charge %1 %</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>charge N/A</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>fréquence %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>température %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>Actuel : %1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>. Aucun capteur de charge GPU utilisable : %1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Accessible</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor répond sur le bus système.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activé</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Désactivé</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>Plage actuelle %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>aucune limite</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Inaccessible</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Inconnu</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>Nécessite que le gouverneur fonctionne avec [dbus] enabled.</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>Charge, fréquence et température du GPU, dernières %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (%1 min %2 s enregistrées)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>Référence %1 (%2) : %3.</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> Fenêtre en direct (%1) : %2.</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>Aucune table gpu_metrics v2.x lisible sous /sys/class/drm/card*/device.</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (modifiée)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (brute)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>aucun</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>Table telle que publiée par le gouverneur (fix-metrics) : l'activité GFX est sa propre mesure.</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>Table brute du noyau : l'activité GFX est la valeur erronée du micrologiciel (le bug à 655 %) ; activez fix-metrics pour en obtenir une réelle.</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>Table brute du noyau.</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>Performance</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualiser</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>Contrôles d'exécution via D-Bus (com.cyanskillfish.Governor) : ils s'appliquent immédiatement, ne demandent pas de mot de passe et sont perdus au prochain redémarrage du gouverneur. config.toml reste inchangé ; utilisez la page Réglages pour rendre les valeurs persistantes. Le mode performance ouvre toute la plage des points sûrs ; une fréquence fixe bloque la fréquence ; la cible de charge et les seuils de température modifient la façon dont le gouverneur ajuste sans toucher au mode.</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>État d'exécution</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Mode performance</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>Plage actuelle</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>Plage au démarrage ([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>Plage autorisée (points sûrs)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>Cible de charge (inférieure / supérieure)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>Température (limitation / reprise)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>Contrôles</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>Mode performance : désactivé</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled : activé permet au gouverneur d'utiliser toute la plage autorisée et de réagir plus vite à la charge ; désactivé revient à la plage avec laquelle le gouverneur a démarré.</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>Mode :</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency : mode performance avec la fréquence fixée ici. Doit se situer dans la plage autorisée.</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>Fixer la fréquence</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>Fréquence fixe :</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Aucune limite</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>Limite de fréquence inférieure actuelle ; Aucune limite = le point sûr le plus bas.</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>Limite de fréquence supérieure actuelle ; Aucune limite = le point sûr le plus haut.</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>Définir la plage</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max) : une plage temporaire, quitte le mode performance.</translation>
    </message>
    <message>
        <source>to</source>
        <translation>à</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>Plage d'exécution :</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>En dessous de cette charge GPU, le gouverneur abaisse la fréquence.</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>Au-dessus de cette charge GPU, le gouverneur augmente la fréquence.</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>Définir la cible de charge</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper) : la bande de charge dans laquelle le gouverneur maintient le GPU, jusqu'au prochain redémarrage. Ne modifie pas le mode performance.</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>Cible de charge :</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>Au-dessus de cette température, le gouverneur abaisse la fréquence maximale.</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Non défini</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>En dessous de cette température, toute la plage est à nouveau autorisée ; Non défini = l'hystérésis propre du gouverneur.</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>Définir les températures</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery) : jusqu'au prochain redémarrage. Ne modifie pas le mode performance.</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>Température :</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>Copier les valeurs d'exécution vers la page Réglages</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>Place la plage actuelle, la cible de charge et les températures dans le formulaire Réglages afin de les enregistrer dans config.toml.</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>Accessible</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor répond sur le bus système.</translation>
    </message>
    <message>
        <source>On</source>
        <translation>Activé</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Désactivé</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>Propriété Enabled de l'interface PerformanceMode.</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>Mode performance : activé</translation>
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
        <translation>non défini</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>Inaccessible</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>Inconnu</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>Le service du gouverneur n'est pas en cours d'exécution (page Service).</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>D-Bus est désactivé dans config.toml : activez-le sur la page Réglages et appliquez avec un redémarrage.</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>Le gouverneur n'a pas répondu sur le bus système.</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>Les contrôles sont désactivés : %1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>la cible de charge inférieure doit être inférieure à la cible supérieure</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>la température de reprise doit être inférieure à la température de limitation (ou Non défini)</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>Profils</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>Instantanés nommés de cette page et de la page Utilisation du GPU, stockés pour votre utilisateur uniquement. Les points sûrs ne font pas partie d'un profil.</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>Charger dans les formulaires</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>Remplit les formulaires Réglages et Utilisation du GPU ; rien n'est écrit tant que vous n'appliquez pas.</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>Appliquer maintenant</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>Écrit le profil dans config.toml (sauvegarde d'abord, une demande de mot de passe) et redémarre le gouverneur. Les modifications en attente sur les pages de configuration sont perdues.</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>Enregistrer l'état actuel sous…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>Enregistre les valeurs actuelles des formulaires (appliquées ou non) sous un nom.</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>Supprimer</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>Copier la commande du raccourci</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>Place dans le presse-papiers une ligne de commande qui applique ce profil dans l'application en cours d'exécution. Associez-la à une touche dans Paramètres système → Raccourcis (KDE) ou Clavier → Raccourcis personnalisés (GNOME) pour changer de profil sans ouvrir la fenêtre.</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>Aucun profil pour le moment : configurez les formulaires et utilisez Enregistrer l'état actuel sous…</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>Points sûrs</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recharger depuis le disque</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>Les [[safe-points]] de %1 définissent la courbe fréquence/tension que suit le gouverneur. Il ne sort jamais de la plage entre le point le plus bas et le plus haut ; [frequency-range] et les contrôles d'exécution y sont bornés. Modifiez avec prudence : de mauvaises tensions peuvent figer ou endommager la carte. Appliquer vérifie d'abord les règles du gouverneur et les limites strictes (%2–%3 mV, jusqu'à %4 MHz) et effectue une sauvegarde.</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>Points</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>Fréquence</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>Tension</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>Ajouter un point</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>Ajoute un point après celui sélectionné, à mi-chemin du suivant.</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>Retirer</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>Trier</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>Ordonne les lignes par fréquence (Appliquer le fait de toute façon).</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>Courbe</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>Appliquer les points sûrs</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>Écrit les blocs [[safe-points]] dans config.toml (demande votre mot de passe, effectue d'abord une sauvegarde).</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>Redémarrer le gouverneur ensuite</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>Le gouverneur ne lit config.toml qu'au démarrage.</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>Rétablir</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>Revient aux points du fichier.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valeurs par défaut fournies</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>Les points actifs du default-config.toml du gouverneur : %1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>Tester un point avant de l'enregistrer (exécution, superutilisateur)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>SetTestMode via D-Bus fixe immédiatement cette fréquence et cette tension et arrête la mise à l'échelle automatique ; la limitation thermique du gouverneur reste active. Rien n'est écrit dans config.toml et le gouverneur applique la paire telle quelle, restez donc dans les limites strictes. Mettez le GPU sous charge pendant son exécution. Arrêter le test (ou la minuterie) désactive le mode performance, ce qui revient à la mise à l'échelle normale avec la plage de démarrage. Un point que la puce ne peut pas tenir fige la carte ; enregistrez votre travail au préalable.</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>Charge :</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>Un générateur de charge GPU trouvé dans PATH, démarré avec le test et arrêté à sa fin. S'il se termine pendant que le point est fixé, cela est signalé.</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>Aucun outil de charge trouvé (vkmark, glmark2, vkcube ou glxgears) : lancez vous-même un jeu ou un benchmark pendant le test.</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>Pré-rempli depuis la ligne sélectionnée ; modifiable librement.</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>Jusqu'à l'arrêt</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>L'application termine le test d'elle-même après ce délai (0 = uniquement via Arrêter le test).</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>Fréquence :</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>Tension :</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>Pour :</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>Démarrer le test</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>Demande votre mot de passe (pkexec) : l'interface TestMode est réservée au superutilisateur.</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>Arrêter le test</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>Ajouter à la table</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>Place cette paire fréquence/tension dans la table des points sûrs ci-dessus (triée par fréquence, remplaçant un point à la même fréquence). Appliquez pour enregistrer.</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>Déterminer jusqu'où votre propre carte peut aller (fréquence maximale plus élevée, tensions plus basses) est le travail de %1 : il teste pas à pas sous une charge vérifiée et peut installer le résultat. Ne modifiez les points à la main que si vous savez ce que la puce tolère.</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 points : %2 MHz @ %3 mV jusqu'à %4 MHz @ %5 mV.</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>Aucun [[safe-points]] ; le gouverneur reviendrait à 350 MHz @ 700 mV et 2000 MHz @ 1000 mV.</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>augmente la fréquence maximale de %1 à %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>abaisse la tension sur %1 point(s) existant(s)</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>Ce changement %1 : un point instable peut figer la carte sous charge. Vérifiez-le d'abord avec bc250-gpu-oc-bisect.</translation>
    </message>
    <message>
        <source> and </source>
        <translation> et </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>aucune limite</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Gouverneur (D-Bus) : plage autorisée %1–%2 MHz, plage actuelle %3–%4 MHz.</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz est au-dessus de %2 MHz, où de nombreuses cartes se bloquent irrémédiablement</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV est au-dessus de %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>la courbe ci-dessus donnerait %1 mV à %2 MHz ; ceci est inférieur</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>L'interface D-Bus du gouverneur est inaccessible (service arrêté ou [dbus] enabled = false).</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>Service</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>Vérifier les mises à jour</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>Compare le RPM installé avec la dernière version sur GitHub.</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>Exporter les diagnostics…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>Enregistre les versions, config.toml, l'état du service, le journal et la table gpu_metrics brute dans un fichier texte pour un rapport de bogue.</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Actualiser</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>Unité trouvée</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>Actif</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>Activé au démarrage</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>Substitution de gpu_metrics</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>Version</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>Démarrer</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>Arrêter</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>Redémarrer</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>Activer au démarrage</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>Désactiver au démarrage</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2 (demande votre mot de passe).</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>Journal (en direct)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>Oui</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>Non — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>Oui (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>Non (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>non chargé</translation>
    </message>
    <message>
        <source>No</source>
        <translation>Non</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>notes de version</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>versions</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>Paquet non installé</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Vérification…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>Paramètres</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>Ces paramètres concernent l'application, pas le gouverneur. Ils sont stockés par utilisateur.</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>Zone de notification</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>Afficher une icône dans la zone de notification avec la charge, la fréquence et la température du GPU dans son infobulle</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>Fermer la fenêtre laisse l'application s'exécuter dans la zone de notification</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>Cliquez avec le bouton gauche sur l'icône pour afficher ou masquer la fenêtre ; le menu permet aussi de basculer le mode performance (si D-Bus est accessible) et de quitter l'application.</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>Ce bureau n'offre pas de zone de notification (sous GNOME, installez l'extension AppIndicator).</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>Démarrer à la connexion</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>Démarrer l'application à ma connexion</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…masquée dans la zone de notification, sans ouvrir la fenêtre</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Mises à jour du gouverneur</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>Vérifier une nouvelle version du gouverneur au démarrage de l'application</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>Une requête vers api.github.com pour la dernière version de filippor/cyan-skillfish-governor, comparée au RPM installé. Rien d'autre n'est envoyé. La page Service propose la même vérification sous forme de bouton.</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>Alertes</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>Notifier quand la température du GPU atteint</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>Notifier quand le gouverneur commence à limiter pour cause de température</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>Notifier quand le service du gouverneur s'arrête ou échoue de lui-même</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>Affichées sous forme de notifications système via l'icône de la zone de notification (dans la barre d'état si la zone de notification est désactivée). Un message par événement : une alerte de température se réarme une fois que le GPU a refroidi de 5 °C sous son seuil, et la même alerte se répète au plus toutes les 5 minutes.</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>Impossible d'écrire %1 : %2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>Entrée : %1
Commande : %2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>Écrit une entrée desktop dans %1 ; rien n'est installé au niveau du système.</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Inconnu</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>Un outil de charge est déjà en cours d'exécution.</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1 est introuvable dans PATH.</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 n'a pas démarré : %2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>charge %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>fréquence %1 MHz (max %2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C (max %2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>aucune mesure</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>Masquer la fenêtre</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>Mode performance</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>Appliquer le profil</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>Quitter</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>Afficher la fenêtre</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>Réglages</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>Préréglage :</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>Le formulaire ne correspond à aucun préréglage.</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>Remplit le formulaire ci-dessous ; rien n'est écrit tant que vous n'appliquez pas.</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>limites de fréquence au démarrage</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>Fréquence la plus basse que le gouverneur peut choisir. 0 (Aucune limite) = point sûr le plus bas.</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>Fréquence la plus haute que le gouverneur peut choisir. 0 (Aucune limite) = point sûr le plus haut.</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>Minimum :</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>Maximum :</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>Les valeurs en dehors de la table des points sûrs de config.toml sont bornées par le gouverneur.</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>quand changer la fréquence</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>Charge GPU au-dessus de laquelle le gouverneur augmente la fréquence (supérieure).</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>Charge GPU en dessous de laquelle le gouverneur abaisse la fréquence (inférieure).</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>Augmenter au-dessus de :</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>Diminuer en dessous de :</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>Un écart large maintient la fréquence stable ; un écart étroit suit la charge de près. Valeurs par défaut du gouverneur si la section est absente : 95 % / 80 %.</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>limitation thermique</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>Au-dessus de cette température GPU, le gouverneur abaisse la fréquence (85 par défaut).</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>Non défini</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>En dessous de cette température, la limitation cesse. Doit être inférieure à la température de limitation ; Non défini omet la clé de config.toml.</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>Limiter au-dessus de :</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>Reprendre en dessous de :</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>contrôle d'exécution</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>publier com.cyanskillfish.Governor sur le bus système</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>Nécessaire à la page Performance de cette application et au script de lancement cyan-skillfish-performance-mode.</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>boucle de contrôle</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>fréquence d'échantillonnage de l'indicateur d'occupation du GPU (défaut du gouverneur 2000 µs, fichier fourni 250 µs). Utilisé par la méthode de charge busy-flag.</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>fréquence de recalcul de la fréquence cible (défaut du gouverneur 10 × sample, fichier fourni 100 000 µs). Ne doit pas être plus court que l'intervalle d'échantillonnage.</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>Échantillonner toutes les :</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>Ajuster toutes les :</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>vitesse à laquelle la fréquence se rapproche de sa cible (1 MHz/ms par défaut).</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>vitesse de variation en mode rafale ; doit être supérieure à la vitesse normale (défaut du gouverneur 200 × normal, fichier fourni 50 MHz/ms).</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>Vitesse de variation :</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>Vitesse de variation en rafale :</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> échantillons</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>Désactivé</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>ce nombre d'échantillons d'occupation consécutifs bascule vers la vitesse de variation en rafale, afin qu'un jeu qui charge soudainement le GPU obtienne rapidement sa fréquence (1..%1 ; Désactivé omet la clé, fichier fourni 60).</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>Rafale après :</translation>
    </message>
    <message>
        <source> events</source>
        <translation> événements</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>cycles d'ajustement avec une charge sous la cible inférieure avant que la fréquence ne baisse (défaut du gouverneur 10, fichier fourni 5). Plus élevé = fréquence plus persistante.</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>Baisser après :</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>Un échantillonnage et un ajustement plus rapides réagissent plus tôt mais coûtent du temps CPU. Le mode rafale réduit le délai au démarrage d'un jeu ; plus d'événements de baisse empêchent la fréquence de chuter pendant de courtes pauses.</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>bande morte</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>un changement de fréquence hors rafale plus petit que cette valeur n'est pas appliqué (10 par défaut). Évite de constantes petites écritures SMU.</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>Ignorer les changements en dessous de :</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>les sections de réglage</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>Le gouverneur rapporte une plage de points sûrs de %1–%2 MHz ; les valeurs en dehors sont bornées.</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>Recharger depuis le disque</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>Annule les modifications de toutes les pages et réaffiche les valeurs de config.toml.</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>Redémarrer le gouverneur après l'application</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>Le gouverneur ne lit config.toml qu'au démarrage.</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>Appliquer les modifications</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>Demande votre mot de passe une seule fois (pkexec), effectue une sauvegarde horodatée de config.toml et écrit %1. Les modifications en attente de l'autre page de configuration sont également écrites.</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>non installé</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1 (dernière version : inconnue — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1 (dernière version : inconnue)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2 disponible (%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1 (à jour, dernière version %2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1 (dernière version : %2, %3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>Échantillonne l'unique bit d'occupation du GPU selon timing.intervals.sample (par défaut). Le moins coûteux, fonctionne partout.</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>Parcourt tous les processus qui gardent le GPU ouvert. Plus coûteux en CPU que busy-flag.</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>Lit la valeur de charge propre au noyau. Nécessite un noyau modifié, que Bazzite standard n'a pas.</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>ioctl AMDGPU_INFO_SENSOR_GPU_TEMP ; garde un descripteur de périphérique DRM ouvert tant que le gouverneur fonctionne (par défaut).</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>Lit plutôt temp1_input de hwmon d'amdgpu, de sorte qu'aucun client DRM ne reste ouvert. Même capteur.</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>Communique directement avec le SMU (API de bc250collective) ; applique la tension des points sûrs avec la fréquence (par défaut).</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>Passe par l'interface sysfs d'amdgpu (pp_od_clk_voltage) au lieu du SMU.</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>Valeurs par défaut fournies</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>Silencieux</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>Réactif</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>Fréquence maximale</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>Les valeurs du config.toml installé par le paquet du gouverneur.</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>Fréquences les plus basses qui suivent encore : monte tardivement, plafonne à 1500 MHz, limite à 80 °C.</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>Monte tôt et autorise toute la plage sûre, au prix de plus de chaleur et de puissance.</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>Reste proche du haut de la plage sûre ; proche d'une fréquence fixe tout en laissant la limitation thermique active.</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>Personnalisé</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>Aucune limite</translation>
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
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
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
&lt;p&gt;Une petite interface pour &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;, le gouverneur GPU de l'&lt;b&gt;AMD BC-250&lt;/b&gt;
(APU Cyan Skillfish, gfx1013) sur &lt;b&gt;Bazzite&lt;/b&gt;. Le gouverneur doit déjà être installé ; cette application
modifie une section de sa configuration et contrôle son service systemd. Rien d'autre sur le système
n'est touché.&lt;/p&gt;

&lt;h2&gt;Vue d'ensemble&lt;/h2&gt;
&lt;p&gt;Indique si le service fonctionne, si la table &lt;code&gt;gpu_metrics&lt;/code&gt; modifiée par le gouverneur est
montée sur sysfs, si un capteur de charge du GPU est disponible, et affiche un graphique de la charge du GPU (%), de la température (°C, axe
de gauche) et de la fréquence (MHz, axe de droite). Une mesure absente laisse un vide, jamais un faux zéro. L'application conserve la dernière heure
d'échantillons (un toutes les deux secondes) pendant son fonctionnement ; &lt;b&gt;Fenêtre&lt;/b&gt; choisit la part du graphique affichée (2, 10, 30 ou
60 minutes) et &lt;b&gt;Exporter en CSV…&lt;/b&gt; écrit chaque échantillon conservé (heure, charge, fréquence, température, puissance du socket,
mode performance, plage d'exécution) dans un fichier. &lt;b&gt;Comparer…&lt;/b&gt; recharge un tel fichier et le trace en pointillés derrière
les courbes en direct (échantillon le plus récent au bord droit, comme la fenêtre en direct) et place les moyennes et
les pics des deux sessions sous le graphique (charge, fréquence, température, puissance du socket), afin de juger un changement de profil
ou de point sûr par rapport à une exécution antérieure ; &lt;b&gt;Effacer&lt;/b&gt; le retire.&lt;/p&gt;
&lt;p&gt;Le cadre &lt;b&gt;Table gpu_metrics&lt;/b&gt; décode la table exposée par le noyau (ou le gouverneur) : activités, températures,
puissance socket/GFX/CPU, les fréquences GFX, SoC, mémoire et Fabric, l'état de limitation et les fréquences des cœurs CPU.
&lt;i&gt;(modifiée)&lt;/i&gt; signifie que la table du gouverneur est montée ; &lt;i&gt;(brute)&lt;/i&gt; est la table propre du noyau, dont l'activité GFX
sur un BC-250 est la valeur erronée à 655 % et n'est pas utilisée comme charge.&lt;/p&gt;
&lt;p&gt;Le BC-250 n'a généralement pas de capteur &lt;code&gt;gpu_busy_percent&lt;/code&gt;, mais le gouverneur mesure lui-même la charge et,
avec &lt;b&gt;fix-metrics&lt;/b&gt; activé, la publie dans la table &lt;code&gt;gpu_metrics&lt;/code&gt; modifiée qu'il monte sur sysfs. L'application
lit la charge depuis là ; &lt;code&gt;gpu_busy_percent&lt;/code&gt; et &lt;code&gt;radeontop&lt;/code&gt; sont des solutions de repli. Sans aucune
source, elle affiche &lt;b&gt;N/A&lt;/b&gt;, jamais un 0 % trompeur, et l'infobulle indique ce qui manque. La fréquence et la température du GPU proviennent des capteurs
hwmon d'amdgpu ; avec &lt;code&gt;fix-freq&lt;/code&gt; activé, la fréquence est la valeur SMU réelle.&lt;/p&gt;

&lt;h2&gt;Utilisation du GPU&lt;/h2&gt;
&lt;p&gt;Modifie la section &lt;code&gt;[gpu-usage]&lt;/code&gt; de &lt;code&gt;%3&lt;/code&gt; :&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Clé&lt;/th&gt;&lt;th&gt;Défaut&lt;/th&gt;&lt;th&gt;Signification&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Écrit la charge mesurée dans une table &lt;code&gt;gpu_metrics&lt;/code&gt; modifiée
et la monte par bind-mount sur sysfs. Corrige l'utilisation GPU à 655 % de MangoHud, l'overlay Steam et radeontop.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Modifie aussi &lt;code&gt;current_gfxclk_frequency&lt;/code&gt; avec la fréquence lue
depuis le SMU. Corrige la mauvaise fréquence sysfs, surtout après le déblocage 8 cœurs. Indépendant de fix-metrics.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; échantillonne le bit d'occupation du GPU ;
&lt;i&gt;process&lt;/i&gt; parcourt tous les processus qui utilisent le GPU (plus coûteux en CPU) ; &lt;i&gt;kernel&lt;/i&gt; nécessite un noyau modifié.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;Où la température du GPU est lue : l'ioctl DRM (garde un descripteur DRM
ouvert) ou le fichier hwmon &lt;code&gt;temp1_input&lt;/code&gt;. Même capteur.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;Vide la table modifiée tous les N cycles de mise à jour.&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;Et la section &lt;code&gt;[gpu]&lt;/code&gt; : &lt;b&gt;set-method&lt;/b&gt; (&lt;i&gt;smu&lt;/i&gt;, par défaut, applique la fréquence et la tension via
le SMU directement ; &lt;i&gt;kernel&lt;/i&gt; passe plutôt par l'interface sysfs d'amdgpu).&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Appliquer les modifications&lt;/b&gt; (sur cette page ou sur Réglages) demande votre mot de passe une fois (pkexec). Elle copie le
fichier actuel vers &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; et écrit les modifications en attente des deux pages. Seules les clés
connues changent ; toute autre ligne du fichier, y compris les commentaires, est conservée. Le gouverneur lit le fichier au démarrage,
le service est donc redémarré ensuite, sauf si vous décochez cette option.&lt;/p&gt;

&lt;h2&gt;Réglages&lt;/h2&gt;
&lt;p&gt;Modifie les autres sections de &lt;code&gt;%3&lt;/code&gt; :&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Clés&lt;/th&gt;&lt;th&gt;Signification&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;Limites de fréquence en MHz avec lesquelles le gouverneur démarre. &lt;i&gt;Aucune limite&lt;/i&gt;
(0) laisse la limite ouverte ; les valeurs en dehors de la table des points sûrs sont bornées par le gouverneur.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;Augmente la fréquence quand la charge est au-dessus de &lt;i&gt;upper&lt;/i&gt;,
la diminue quand elle est en dessous de &lt;i&gt;lower&lt;/i&gt;. Un écart large maintient la fréquence stable, un écart étroit suit la charge de près.
Les valeurs par défaut du gouverneur quand la section est absente sont 95 % / 80 % ; le fichier fourni utilise 65 % / 50 %.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;Limite au-dessus de la première valeur (85 °C
par défaut) ; reprend en dessous de la seconde, qui est optionnelle (&lt;i&gt;Non défini&lt;/i&gt;) et doit être inférieure.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;Publie &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt; sur le bus système. La
page Performance en a besoin ; le fichier fourni l'active, la valeur par défaut intégrée du gouverneur est désactivée.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;La boucle de contrôle : la fréquence d'échantillonnage de la charge et d'ajustement de la fréquence (µs), la vitesse à laquelle la fréquence
se rapproche de sa cible (MHz/ms), combien d'échantillons d'occupation consécutifs basculent vers la rampe rapide en rafale (&lt;i&gt;Désactivé&lt;/i&gt; omet
la clé), et combien de cycles d'ajustement à faible charge passent avant que la fréquence ne baisse. Valeurs par défaut du gouverneur : 2000 µs /
10 × sample, 1 / 200 × normal, désactivé, 10 ; le fichier fourni utilise 250 µs / 100 000 µs, 1 / 50, 60, 5.&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;Bande morte en MHz : un changement hors rafale plus petit que cela n'est
pas appliqué (10 par défaut).&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;Les préréglages&lt;/b&gt; remplissent d'un coup la plage de fréquence, la cible de charge et la température (le minutage n'est pas touché) : &lt;i&gt;Valeurs par défaut fournies&lt;/i&gt; (la configuration du paquet), &lt;i&gt;Silencieux&lt;/i&gt; (fréquences
plus basses, montée tardive), &lt;i&gt;Réactif&lt;/i&gt; (montée précoce, plage complète) et &lt;i&gt;Fréquence maximale&lt;/i&gt; (reste près du sommet).
La liste déroulante affiche &lt;i&gt;Personnalisé&lt;/i&gt; dès qu'une valeur diffère de tous les préréglages. Les combinaisons invalides (min au-dessus
du max, reprise pas en dessous de la limitation, intervalle d'ajustement plus court que l'échantillonnage, vitesse de rafale pas supérieure à la normale) sont signalées
sous le formulaire et bloquent Appliquer.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Les profils&lt;/b&gt; sont des instantanés nommés de toutes les valeurs de cette page et de la page Utilisation du GPU (les points sûrs ne sont pas
inclus), stockés pour votre utilisateur dans &lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;.
&lt;i&gt;Enregistrer l'état actuel sous…&lt;/i&gt; stocke ce que les formulaires affichent à cet instant, appliqué ou non. &lt;i&gt;Charger dans les formulaires&lt;/i&gt; remplit les deux
pages afin que vous puissiez vérifier et appliquer comme d'habitude ; &lt;i&gt;Appliquer maintenant&lt;/i&gt; écrit le profil dans &lt;code&gt;config.toml&lt;/code&gt;
(sauvegarde d'abord, une demande de mot de passe), annule les modifications en attente et redémarre le gouverneur. Avec l'icône de la zone de notification activée, le
sous-menu &lt;i&gt;Appliquer le profil&lt;/i&gt; du menu de la zone de notification fait de même sans ouvrir la fenêtre. Pour un &lt;b&gt;raccourci clavier&lt;/b&gt;,
&lt;i&gt;Copier la commande du raccourci&lt;/i&gt; place &lt;code&gt;bc250-governor-manager --profile 'Nom'&lt;/code&gt; dans le presse-papiers ; associez-le dans
Paramètres système → Raccourcis (KDE) ou Clavier → Raccourcis personnalisés (GNOME). L'application s'exécute une fois par utilisateur : cette commande
atteint l'instance en cours d'exécution via une socket locale et y applique le profil (une demande de mot de passe, notification dans la
zone de notification), ou démarre l'application et l'applique si rien n'est en cours d'exécution. Un simple second lancement ne fait que ramener la fenêtre au premier plan.
&lt;code&gt;--list-profiles&lt;/code&gt; affiche les noms enregistrés.&lt;/p&gt;

&lt;h2&gt;Points sûrs&lt;/h2&gt;
&lt;p&gt;Les &lt;code&gt;[[safe-points]]&lt;/code&gt; de &lt;code&gt;%3&lt;/code&gt; sous forme de table modifiable et de courbe fréquence/tension.
Le gouverneur suit cette courbe et ne sort jamais de sa plage ; &lt;code&gt;[frequency-range]&lt;/code&gt; et les contrôles d'exécution
y sont bornés. &lt;b&gt;Ajouter un point&lt;/b&gt; l'insère à mi-chemin du suivant, &lt;b&gt;Retirer&lt;/b&gt; supprime la ligne
sélectionnée, &lt;b&gt;Valeurs par défaut fournies&lt;/b&gt; charge la table propre du gouverneur, &lt;b&gt;Rétablir&lt;/b&gt; revient au fichier. Avant que
&lt;b&gt;Appliquer les points sûrs&lt;/b&gt; soit activé, la liste doit respecter les règles du gouverneur (au moins deux points, fréquences
uniques, tension ne baissant jamais quand la fréquence augmente) et les limites strictes partagées avec bc250-gpu-oc-bisect
(700–1100 mV, jusqu'à 2500 MHz). Au-dessus de 2000 MHz ou 1000 mV, ou quand un changement augmente la fréquence maximale ou abaisse une
tension existante, un avertissement apparaît : un point instable fige la carte sous charge. Appliquer effectue une sauvegarde et
demande votre mot de passe ; trouver en toute sécurité le plafond propre d'une carte est le travail de
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Tester un point avant de l'enregistrer&lt;/b&gt; utilise l'interface D-Bus &lt;code&gt;TestMode&lt;/code&gt; du gouverneur, réservée au superutilisateur
(une demande &lt;code&gt;pkexec&lt;/code&gt;) : le GPU est fixé à la fréquence et à la tension que vous saisissez, et la mise à l'échelle
automatique s'arrête, tandis que la limitation thermique reste active. Rien n'est écrit dans &lt;code&gt;config.toml&lt;/code&gt;. Les
champs sont pré-remplis depuis la ligne sélectionnée ; un avertissement apparaît au-dessus de 2000 MHz / 1000 mV ou quand la tension est
inférieure à ce que la courbe ci-dessus donnerait. &lt;b&gt;Charge&lt;/b&gt; choisit un générateur de charge GPU trouvé dans PATH (vkmark, glmark2,
vkcube ou glxgears, dans cet ordre de préférence) ; il est démarré avec le test et arrêté à la fin du test,
et s'il se termine pendant que le point est fixé, l'état le signale. À défaut, chargez le GPU vous-même et surveillez la
Vue d'ensemble. &lt;b&gt;Arrêter le test&lt;/b&gt;, la minuterie (60 s par défaut, &lt;i&gt;Jusqu'à l'arrêt&lt;/i&gt; = 0), la fermeture de l'application, ou toute action sur
la page Performance termine le test en désactivant le mode performance, ce qui ramène le gouverneur à la mise à l'échelle
normale avec sa plage de démarrage. La ligne de résultat indique alors combien de temps le point a été maintenu, la température maximale
et la plage de fréquence observée ; &lt;b&gt;Ajouter à la table&lt;/b&gt; place la paire testée dans la table des points sûrs (triée, en remplaçant
un point à la même fréquence) afin que vous puissiez l'appliquer. Pendant qu'un point est fixé, le &lt;b&gt;journal du noyau&lt;/b&gt;
(&lt;code&gt;journalctl -k -f&lt;/code&gt;) est surveillé pour détecter des problèmes amdgpu (délais d'anneau dépassés, réinitialisations du GPU, lignes
&lt;code&gt;*ERROR*&lt;/code&gt;, échecs SMU) ; la première ligne de ce type interrompt le test immédiatement, libérant le point avant que la carte ne se fige,
et est citée dans le résultat. Une exécution propre le signale également. Lire l'anneau du noyau nécessite d'appartenir au groupe
&lt;code&gt;systemd-journal&lt;/code&gt; (ou &lt;code&gt;wheel&lt;/code&gt; ) ; sinon l'état indique que le journal n'est pas surveillé et
le test se déroule à l'aveugle. Un point que la puce ne peut pas tenir peut quand même figer la carte plus vite que le noyau ne peut le consigner,
enregistrez donc votre travail au préalable. Seul le gouverneur smu dispose de D-Bus.&lt;/p&gt;

&lt;h2&gt;Performance&lt;/h2&gt;
&lt;p&gt;Contrôle d'exécution du gouverneur via D-Bus, exactement ce que fait le script
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; propre au gouverneur. Les changements s'appliquent immédiatement, ne demandent pas de mot de passe et sont
perdus au prochain redémarrage du gouverneur ; &lt;code&gt;config.toml&lt;/code&gt; n'est pas touché. &lt;i&gt;Copier les valeurs d'exécution vers la page Réglages&lt;/i&gt;
transfère la plage et les seuils actuels vers la page Réglages afin que vous puissiez les enregistrer.&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;Mode performance&lt;/b&gt; est un bouton bascule (rouge quand activé) : activé ouvre toute la plage autorisée (points sûrs) ; désactivé revient
à la plage de &lt;code&gt;[frequency-range]&lt;/code&gt;.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Fixer la fréquence&lt;/b&gt; bloque la fréquence et active le mode performance.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Définir la plage&lt;/b&gt; applique un min/max d'exécution.&lt;/li&gt;
&lt;li&gt;&lt;b&gt;Définir la cible de charge&lt;/b&gt; et &lt;b&gt;Définir les températures&lt;/b&gt; modifient la bande de charge (% inférieur/supérieur) et les températures de
limitation / reprise avec lesquelles le gouverneur ajuste, sans toucher au mode performance ni à un test de point sûr en cours.
Les champs suivent les valeurs actuelles du gouverneur et sont réactualisés quand elles changent ; les paires impossibles (inférieure pas
sous la supérieure, reprise pas sous la limitation) désactivent le bouton.&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Les contrôles sont désactivés quand le service n'est pas en cours d'exécution ou que le nom de bus n'est pas publié ; la raison est affichée
sous les contrôles. Activez &lt;code&gt;[dbus] enabled&lt;/code&gt; sur la page Réglages et redémarrez le gouverneur si nécessaire.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Par jeu&lt;/b&gt; construit la ligne de lancement pour le script &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; du gouverneur :
mode performance simple, &lt;code&gt;--fixed-frequency&lt;/code&gt;, &lt;code&gt;--range&lt;/code&gt;, &lt;code&gt;--load-target&lt;/code&gt; ou
&lt;code&gt;--temperature&lt;/code&gt;, pré-rempli avec les valeurs actuelles du gouverneur, formaté pour les options de lancement Steam
(&lt;code&gt;… %command%&lt;/code&gt;), une commande enveloppante Heroic/Lutris, ou un terminal. &lt;b&gt;Copier&lt;/b&gt; le place dans le presse-papiers.
Le script applique le réglage, lance le jeu, et désactive le mode performance à sa fermeture, ce qui remet aussi le
gouverneur sur sa plage de démarrage. Il nécessite D-Bus activé, comme les contrôles ci-dessus.&lt;/p&gt;

&lt;h2&gt;Sauvegardes&lt;/h2&gt;
&lt;p&gt;Chaque écriture crée une copie &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt; à côté de la configuration. La page les liste,
affiche la différence entre une copie et le fichier actuel, et &lt;b&gt;Restaurer la sélection&lt;/b&gt; remet la copie en place (le fichier
actuel est d'abord sauvegardé, mot de passe demandé une fois). Le gouverneur est ensuite redémarré, sauf si vous décochez cette option.&lt;/p&gt;

&lt;h2&gt;Service&lt;/h2&gt;
&lt;p&gt;Démarre, arrête, redémarre, active ou désactive &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;, avec la sortie de
&lt;code&gt;systemctl status&lt;/code&gt; et un &lt;b&gt;journal en direct&lt;/b&gt; (&lt;code&gt;journalctl -u … -f&lt;/code&gt;, les 200 dernières lignes et
tout ce qui suit tant que la page est affichée, jusqu'à 2000 conservées). Le champ de filtre accepte du texte ou une expression
régulière, insensible à la casse ; décochez &lt;b&gt;Suivre&lt;/b&gt; pour lire sans défilement automatique. Lire les unités système nécessite que votre
utilisateur appartienne au groupe &lt;code&gt;wheel&lt;/code&gt; ou &lt;code&gt;systemd-journal&lt;/code&gt;, ce qui est le cas sur Bazzite. Chaque action de
service demande votre mot de passe.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Vérifier les mises à jour&lt;/b&gt; compare le RPM &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; installé avec la dernière
version de &lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
sur GitHub (une requête vers api.github.com ; exécutée aussi au démarrage sauf désactivation dans Paramètres). Une version plus récente est
affichée en orange avec un lien vers ses notes. Mettez à jour le paquet de la façon dont vous l'avez installé : COPR
&lt;code&gt;filippor/bazzite&lt;/code&gt; via &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; en superposition, ou l'archive de version.&lt;/p&gt;
&lt;p&gt;&lt;b&gt;Exporter les diagnostics…&lt;/b&gt; écrit un fichier texte pour un rapport de bogue : versions de l'application, du gouverneur et de Bazzite, CPU/GPU,
&lt;code&gt;config.toml&lt;/code&gt; et ses sauvegardes, &lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;, les 300 dernières lignes de journal,
l'interface D-Bus, la ligne de commande du noyau, les messages noyau d'amdgpu, les capteurs hwmon, et la table
&lt;code&gt;gpu_metrics&lt;/code&gt; brute (analysée et en vidage hexadécimal). Lisez le fichier et retirez ce que vous ne souhaitez pas
partager avant de le joindre à un rapport.&lt;/p&gt;

&lt;h2&gt;Paramètres&lt;/h2&gt;
&lt;p&gt;Paramètres de l'application, stockés par utilisateur. &lt;b&gt;Zone de notification&lt;/b&gt; : affiche une icône dont l'infobulle porte la charge, la fréquence,
la température, le mode performance et l'état du GPU ; un clic gauche affiche ou masque la fenêtre, le menu bascule le
mode performance (si D-Bus est accessible) et quitte. Avec &lt;i&gt;Fermer la fenêtre laisse l'application s'exécuter dans la
zone de notification&lt;/i&gt; coché, le bouton de fermeture de la fenêtre masque vers la zone de notification au lieu de quitter ; utilisez le menu de la zone de notification pour quitter.
&lt;b&gt;Démarrer à la connexion&lt;/b&gt; écrit &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt; (rien au niveau
du système), en démarrant éventuellement masquée dans la zone de notification avec &lt;code&gt;--start-in-tray&lt;/code&gt;. La session KDE Plasma de Bazzite
dispose d'une zone de notification native, donc cela fonctionne d'emblée ; une session GNOME nécessiterait l'extension AppIndicator.
&lt;b&gt;Les alertes&lt;/b&gt; sont des notifications système via l'icône de la zone de notification (barre d'état uniquement si la zone de notification est désactivée) : le GPU atteignant
une température que vous choisissez, le GPU atteignant la propre température de limitation du gouverneur (la valeur d'exécution si D-Bus
est accessible, sinon celle de &lt;code&gt;config.toml&lt;/code&gt;), et le service du gouverneur s'arrêtant ou échouant après que l'
application l'a vu en cours d'exécution. Une alerte de température se déclenche une fois par franchissement et se réarme 5 °C sous son seuil ; la
même alerte se répète au plus toutes les 5 minutes.&lt;/p&gt;

&lt;h2&gt;L'ancien gouverneur tt&lt;/h2&gt;
&lt;p&gt;Démarrée avec &lt;code&gt;--backend tt&lt;/code&gt; (ou automatiquement quand seul &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;
est chargé), l'application gère à la place &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;. Ce gouverneur n'a
pas de fix-metrics, de plage de fréquence, de D-Bus ni de versions GitHub, donc les pages Utilisation du GPU et Performance, ces sections
de Réglages, le champ &lt;code&gt;down-events&lt;/code&gt; et la vérification des mises à jour sont masqués et le capteur de charge du GPU reste
indisponible. Tout le reste, y compris &lt;code&gt;[timing]&lt;/code&gt; et &lt;code&gt;[frequency-thresholds]&lt;/code&gt;, fonctionne de la
même façon.&lt;/p&gt;

&lt;h2&gt;Privilèges&lt;/h2&gt;
&lt;p&gt;L'application s'exécute avec votre utilisateur normal. Seules quatre choses nécessitent le superutilisateur et passent par &lt;code&gt;pkexec&lt;/code&gt; :
la sauvegarde, l'écriture de &lt;code&gt;config.toml&lt;/code&gt;, les actions &lt;code&gt;systemctl&lt;/code&gt; et le test de point sûr
(&lt;code&gt;busctl&lt;/code&gt; sur l'interface TestMode réservée au superutilisateur). Le mot de passe est géré
par l'agent polkit du bureau ; l'application ne le voit jamais.&lt;/p&gt;

&lt;h2&gt;Installation et mise à jour&lt;/h2&gt;
&lt;p&gt;L'archive de version contient &lt;code&gt;install.sh&lt;/code&gt;. Elle installe l'application pour votre utilisateur uniquement (un venv privé
avec PyQt6 sous &lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;, le lanceur
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;, une entrée desktop et l'icône), de sorte qu'elle apparaît dans le
menu des applications. Relancez-la depuis une version plus récente pour mettre à jour, &lt;code&gt;./install.sh --uninstall&lt;/code&gt; la supprime.
Rien n'est superposé avec rpm-ostree et la configuration du gouverneur n'est jamais touchée.&lt;/p&gt;

&lt;h2&gt;Liens&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;Cette application : &lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;Le gouverneur (filippor, branche SMU) : &lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Sous licence GNU General Public License v3.0 ou ultérieure. La police Inter (SIL Open Font License) est incluse.&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>ce n'est pas un export de télémétrie : pas de colonne « time »</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>ce n'est pas un export de télémétrie : colonne(s) manquante(s) %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>Mode performance</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>Toute la plage des points sûrs, réaction plus rapide à la charge. Identique au bouton Activé.</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>Fréquence fixe</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency : fixe la fréquence du GPU pour ce jeu (doit se situer dans la plage autorisée).</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>Plage de fréquence</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range : un min/max temporaire, 0 = aucune limite.</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>Cible de charge</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target : charge GPU inférieure/supérieure qui pilote la montée et la baisse de fréquence.</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>Température</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature : seuils de limitation / reprise en °C.</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Options de lancement Steam</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → jeu → Propriétés → Général → Options de lancement. Collez la ligne entière.</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Script enveloppant Heroic / Lutris</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic : paramètres du jeu → Avancé → Commande enveloppante. Lutris : options du lanceur → Préfixe de commande. Seule la partie enveloppante est nécessaire ; le lanceur ajoute le jeu lui-même.</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>Terminal / script</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>Remplacez &lt;program&gt; par la commande à exécuter.</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>Capteur hwmon d'amdgpu</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>Table gpu_metrics</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2 min</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10 min</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30 min</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60 min</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>average_gfx_activity de la table gpu_metrics modifiée du gouverneur.</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>Capteur sysfs gpu_busy_percent d'amdgpu.</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>Repli : radeontop.</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>Table</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>Activité GFX</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>Activité MM</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>Température GFX</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>Température SoC</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>Puissance du socket</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>Puissance GFX</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>Puissance CPU</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>Fréquence GFX</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>Fréquence GFX moyenne</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>Fréquence SoC</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>Fréquence mémoire</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Fréquence Fabric</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>État de limitation</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>Cœurs CPU</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>Seul cyan-skillfish-governor-smu publie une valeur de charge (fix-metrics) ; le gouverneur tt ne le fait pas, cela reste donc indisponible.</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>Installez cyan-skillfish-governor-smu ; il mesure la charge et la publie via gpu_metrics.</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>Activez fix-metrics sur la page Utilisation du GPU et appliquez avec un redémarrage.</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>Démarrez le service du gouverneur sur la page Service ; fix-metrics est activé mais rien ne publie la charge.</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics est activé et le service fonctionne, mais aucun gpu_metrics modifié n'est monté : vérifiez le journal.</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>La table gpu_metrics modifiée ne contient aucune valeur de charge valide ; vérifiez le journal sur la page Service.</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1 min %2 s</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1 s</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 W (brut %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 % (invalide)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C max</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>aucune limite</translation>
    </message>
    <message>
        <source>%1 – %2 MHz</source>
        <translation>%1 – %2 MHz</translation>
    </message>
</context>
<context>
    <name>safepoints_page</name>
    <message>
        <source>At least %1 points are needed.</source>
        <translation>Au moins %1 points sont nécessaires.</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz apparaît deux fois.</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz est en dehors de 1–%2 MHz.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%1 mV à %2 MHz est en dehors de %3–%4 mV.</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%1 mV à %2 MHz est inférieur à %3 mV à %4 MHz ; la tension ne doit pas baisser quand la fréquence augmente (règle du gouverneur).</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz est au-dessus de %2 MHz, où de nombreuses cartes commencent à se bloquer irrémédiablement.</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV est au-dessus de %2 mV ; surveillez la température et l'alimentation.</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>Aucun (chargez le GPU vous-même)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub a répondu %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>aucune connexion (%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>balise inattendue %1</translation>
    </message>
</context>
</TS>
