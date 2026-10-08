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
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>Une interface de configuration PyQt6 pour bc250-cores-bisect.sh : choisissez vos options et lancez une exécution, qui se poursuit ensuite dans un terminal exactement comme si vous l'aviez tapée à la main.</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>Licence : GNU GPLv3.</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>aide</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>Impossible de lire bc250-cores-bisect.sh --help.

Lancez-le plutôt depuis un terminal :
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>Aide</translation>
    </message>
    <message>
        <source>About</source>
        <translation>À propos</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>Choisissez comment lancer bc250-cores-bisect.sh, puis cliquez sur Démarrer. Cette fenêtre se ferme et l'exécution réelle se poursuit dans un terminal, exactement comme si vous lanciez le script à la main.</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>Charge par tentative (secondes) :</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>Charge CPU par tentative (-t). Minimum {0}s, valeur par défaut {1}s.</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>Tours par élément :</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>Tentatives par élément (-r), entrelacées pour que la chaleur ou l'heure de la journée ne favorise aucun élément. Un seul tour ne permet pas de distinguer un cœur réellement défectueux d'un échec aléatoire.</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>Outil de charge :</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify (par défaut)</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>test de torture mprime</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>les deux (stress-ng, puis mprime)</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load : stress-ng vérifie ses propres résultats et est toujours disponible. Le test de torture de mprime est une charge AVX/FMA bien plus lourde qui contrôle elle aussi chaque résultat ; il détecte donc les erreurs de calcul silencieuses que stress-ng laisse passer, mais il doit être installé séparément. « les deux » les exécute l'un après l'autre, une tentative dure donc deux fois le temps de charge.</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>Compter aussi les erreurs matérielles avec rasdaemon</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon : lit la base d'erreurs de ras-mc-ctl avant et après chaque tentative. rasdaemon conserve les erreurs de façon persistante, elles sont donc toujours comptées lorsque le journal est volatile ou que la tentative se termine par un plantage. Nécessite que le service rasdaemon soit actif.</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>Même démarrage (ne pas redémarrer entre les tentatives)</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot : beaucoup plus rapide, mais chaque tentative hérite alors de l'état de la précédente, ce qui rend plus difficile d'imputer un échec à un cœur précis.</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>Sans surveillance (aucune question, redémarrage automatique, reprise après connexion)</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto : ne pose aucune question, redémarre tout seul et continue après chaque connexion jusqu'à ce que tous les éléments soient terminés. Nécessite un sudo sans mot de passe pour setpci et journalctl – voir le README.</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>Installer aussi le service de session pour la reprise automatique (recommandé avec Sans surveillance)</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>Écrit et active ~/.config/systemd/user/bc250-cores-bisect-auto.service afin que l'exécution se relance d'elle-même après chaque redémarrage ou connexion, comme dans la liste de contrôle --auto du README. Le script le supprime à nouveau une fois tous les éléments terminés.</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>Réinitialiser</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset : supprime définitivement tous les résultats et journaux enregistrés dans ~/.local/share/bc250-cores-bisect, la prochaine exécution repart donc de zéro.</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>Afficher l'état (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>Affiche les résultats obtenus jusqu'ici, écrit le rapport, puis quitte.</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Démarrer Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>Estimation approximative : ~{0:.1f} h pour une carte typique ({1} éléments x {2} tours){3}. L'exécution est reprenable : les résultats sont enregistrés après chaque tentative.</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>, redémarrages compris</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>Supprimer tous les résultats de bc250-cores-bisect ?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>Cela supprime définitivement chaque résultat et journal enregistré dans ~/.local/share/bc250-cores-bisect (--reset). L'opération est irréversible et il n'y a aucune sauvegarde. Le script vous demandera encore une confirmation dans le terminal.</translation>
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
        <translation>Démarrer bc250-cores-bisect.sh avec :

  temps de charge : {t}s
  tours : {r}
  outil de charge : {lt}
  rasdaemon : {ras}
  same-boot : {sb}
  sans surveillance : {au}

Cette fenêtre va se fermer et l'exécution se poursuivra dans un terminal.</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>Impossible d'installer le service de session pour la reprise automatique :
{0}

L'exécution démarre quand même maintenant ; voir la liste de contrôle --auto du README pour le configurer à la main.</translation>
    </message>
</context>
</TS>
