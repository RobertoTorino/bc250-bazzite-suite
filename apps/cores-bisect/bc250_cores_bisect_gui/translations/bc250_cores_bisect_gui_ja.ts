<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="ja">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>このアプリについて</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>バージョン {0}</translation>
    </message>
    <message>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>bc250-cores-bisect.sh 用の PyQt6 設定画面です。オプションを選んで実行を開始すると、その後は手で入力した場合とまったく同じようにターミナルで処理が続きます。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>ライセンス: GNU GPLv3。</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>ヘルプ</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>bc250-cores-bisect.sh --help を読み取れませんでした。

代わりにターミナルから実行してください:
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>ヘルプ</translation>
    </message>
    <message>
        <source>About</source>
        <translation>このアプリについて</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>bc250-cores-bisect.sh の実行方法を選び、「開始」をクリックしてください。このウィンドウは閉じ、実際の実行はターミナルで続きます。スクリプトを手動で実行した場合とまったく同じです。</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>1 回の試行あたりの負荷時間（秒）:</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>1 回の試行あたりの CPU 負荷 (-t)。最小 {0}s、既定値 {1}s。</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>項目ごとのラウンド数:</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>項目ごとの試行回数 (-r)。交互に実行するため、発熱や時間帯が特定の項目に有利に働くことはありません。1 ラウンドだけでは、本当に不良なコアと偶発的な失敗を区別できません。</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>負荷ツール:</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify（既定）</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>mprime トーチャーテスト</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>両方（stress-ng の後に mprime）</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load: stress-ng は自身の計算結果を検証し、常に利用できます。mprime のトーチャーテストははるかに重い AVX/FMA 負荷で、こちらもすべての結果を検査するため、stress-ng が見逃す静かな計算誤りを検出できますが、別途インストールが必要です。「両方」は両者を順番に実行するため、1 回の試行に 2 倍の負荷時間がかかります。</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>rasdaemon でハードウェアエラーも数える</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon: 各試行の前後に ras-mc-ctl のエラーデータベースを読み取ります。rasdaemon はエラーを永続的に保存するため、ジャーナルが揮発性の場合や試行がクラッシュで終わった場合でもエラーが集計されます。rasdaemon サービスが動作している必要があります。</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>同一ブート（試行ごとに再起動しない）</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot: 大幅に高速ですが、各試行が直前の試行の状態を引き継ぐため、失敗を特定のコアのせいだと判断しにくくなります。</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>無人実行（確認なし・自動再起動・ログイン後に再開）</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto: 何も尋ねずに自動で再起動し、すべての項目が終わるまでログインのたびに処理を続けます。setpci と journalctl にパスワードなしの sudo が必要です。README を参照してください。</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>ログイン時に自動再開するサービスも導入する（無人実行との併用を推奨）</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>~/.config/systemd/user/bc250-cores-bisect-auto.service を作成して有効化し、再起動やログインのたびに実行が自動で再開されるようにします。README の --auto チェックリストと同じ内容です。すべての項目が完了すると、スクリプトがこのサービスを削除します。</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>リセット</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset: ~/.local/share/bc250-cores-bisect に保存されたすべての結果とログを完全に削除します。次回の実行は最初からやり直しになります。</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>状態を表示 (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>ここまでの結果を表示してレポートを書き出し、終了します。</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>Cores Bisect を開始</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>おおよその目安: 一般的なボードで約 {0:.1f} 時間（{1} 項目 x {2} ラウンド）{3}。実行は再開可能で、結果は試行ごとに保存されます。</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>、再起動を含む</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>bc250-cores-bisect のすべての結果を削除しますか?</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>~/.local/share/bc250-cores-bisect に保存されたすべての結果とログを完全に削除します (--reset)。この操作は取り消せず、バックアップもありません。スクリプトはターミナルでもう一度確認を求めます。</translation>
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
        <translation>次の設定で bc250-cores-bisect.sh を開始します:

  負荷時間: {t}s
  ラウンド数: {r}
  負荷ツール: {lt}
  rasdaemon: {ras}
  same-boot: {sb}
  無人実行: {au}

このウィンドウは閉じ、実行はターミナルで続きます。</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>ログイン時に自動再開するサービスをインストールできませんでした:
{0}

実行はこのまま開始されます。手動で設定するには README の --auto チェックリストを参照してください。</translation>
    </message>
</context>
</TS>
