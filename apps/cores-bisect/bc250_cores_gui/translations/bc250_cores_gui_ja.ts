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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>bc250-cores-unlock.sh 用の PyQt6 フロントエンドです。bc250-cores-bisect.sh で検証済みの BC-250 の 8C/16T コアアンロックを再起動後も維持します。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>ライセンス: GNU GPLv3。</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = 常に有効 (6C/12T)   ok = 全ラウンド合格   xx = 毎回失敗   ?? = 不安定   .. = 未テスト</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>このアプリについて</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>bc250-cores-bisect.sh で検証済みの 8C/16T コアアンロックを再起動後も維持します。</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>インストール（起動のたびに 8C/16T を維持）</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>コールドブート後にアンロックを再適用し、一度だけウォーム再起動する root サービスを有効にします。</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>アンインストール（次回の電源オフ後に stock へ）</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>サービスを削除します。アンロックは次回の完全な電源オフ（コールドブート）まで有効なままです。</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>状態を更新</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>コアの存在マスク、スレッド数、サービスと guard の状態を表示します。</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>sudo で状態を表示</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>状態を root で実行します（sudo パスワードを求めます）。コアの存在マスクも表示されます。</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>ビセクション結果を再確認</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>bc250-cores-bisect.sh が記録した結果を再読み込みします（さらにラウンドが完了した後など）。</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>bc250-cores-unlock.sh の出力はここに表示されます。</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ 承認済み</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ まだ承認されていません！</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>処理中 — インストールしています…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>処理中 — アンインストールしています…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>処理中…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo: 認証に失敗しました。</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>パスワードが違います。もう一度お試しください。</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>（{0} が完了しました、終了コード {1}）</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} に失敗しました（終了コード {1}）。上記の出力を確認してください。</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>起動のたびに 8 個のコア（16 スレッド）をすべて有効にしますか？

root サービスが起動のたびにコアマスクを確認します。コールドブート後はアンロックを再適用し、一度だけウォーム再起動します。現在アンロックが有効でない場合は、インストール後に（ウォーム）再起動してコアを有効にしてください。</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>アンロックサービスを削除しますか？ 8 個のコアは次回の完全な電源オフ（コールドブート）まで有効なままで、その後基板は stock の 6C/12T に戻ります。</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>管理者パスワード</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>SMU mailbox への書き込みと systemd サービスのインストールには root 権限が必要なため、bc250-cores-unlock.sh は sudo 経由で実行されます。
パスワードは sudo にのみ渡され、保存されることはありません。</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>sudo パスワード</translation>
    </message>
</context>
</TS>
