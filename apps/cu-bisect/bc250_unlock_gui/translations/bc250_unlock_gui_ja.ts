<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="ja">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>このアプリについて</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>承認済みのマスクを今すぐ適用し、以後の起動時にも自動的に再適用します。</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>アンロックサービスを無効にします。次回の再起動から標準の24 CUに戻ります。</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>インストール済みのマスク、サービスの状態、実際のマスクを表示します（root権限は不要です）。</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>bc250-cu-bisect.sh が記録した結果を再読み込みします（再テスト後など）。</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>パスワードが違います。もう一度お試しください。</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>bc250-cu-bisect.sh で検証済みの CU アンロックを再起動後も維持します。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>インストール（今すぐ適用し、再起動後も維持）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>アンインストール（次回起動時に初期状態に戻す）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>状態を更新</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>ビセクション結果を再確認</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>bc250-cu-unlock.sh の出力はここに表示されます。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ 承認済み</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ まだ承認されていません！</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo: 認証に失敗しました。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>（{0} が完了しました、終了コード {1}）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} に失敗しました（終了コード {1}）。上記の出力を確認してください。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>{0}（{1} 個の CU）を今すぐ適用し、起動のたびに有効にしますか？</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>アンロックサービスを無効にしますか？ 次回再起動時に基板は初期状態の 24 CU に戻ります。</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>管理者パスワード</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>GPU レジスタの書き込みと systemd サービスのインストールには root 権限が必要なため、bc250-cu-unlock.sh は sudo 経由で実行されます。
パスワードは sudo にのみ渡され、保存されることはありません。</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>sudo パスワード</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>bc250-cu-unlock.sh 用の PyQt6 フロントエンドです。bc250-cu-bisect.sh で検証済みの BC-250 コンピュートユニットのアンロックを再起動後も維持します。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>ライセンス: GNU GPLv3。</translation>
    </message>
</context>
</TS>
