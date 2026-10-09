<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="ja">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>GPU温度</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>GPUは%1 °Cです(アラート設定:%2 °C)。</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>ガバナーのスロットリング</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>GPUは%1 °Cで、ガバナーのスロットリング温度%2 °C以上です。最大クロックが引き下げられています。</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>失敗</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>ガバナー %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>ガバナーサービスは%1しています。GPUはドライバーの既定クロックで動作しています。サービスページを参照してください。</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>バックアップ</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>更新</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>書き込みのたびに、アプリは%1を隣にconfig.toml.bak-YYYYMMDD-HHMMSSとしてコピーします。1つ選ぶと現在のファイルとの差分を表示します。「復元」で元に戻せます(その前に現在のファイルをバックアップするため、何も失われません)。</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>コピー(新しい順)</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>作成日時</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>サイズ</translation>
    </message>
    <message>
        <source>File</source>
        <translation>ファイル</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>バックアップはまだありません。</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>差分:バックアップ → 現在のファイル</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>復元後にガバナーを再起動する</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>選択項目を復元</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>選択したコピーを再び設定として適用します(パスワードを求められます)。</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>バックアップを選択すると現在のファイルと比較できます。</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>%1を読み込めません:%2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>現在のファイルと同じです。</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>ディスクから再読み込み</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>すべてのページの編集を破棄し、config.tomlの値を再表示します。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>適用後にガバナーを再起動する</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>ガバナーは起動時にのみconfig.tomlを読み込みます。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>変更を適用</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>パスワードを一度だけ求め(pkexec)、config.tomlのタイムスタンプ付きバックアップを作成してから%1を書き込みます。他の設定ページの未適用の編集も一緒に書き込まれます。</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1が見つかりませんでした。Cyan Skillfish SMUガバナーはインストールされていないようです。</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1はインストールされていますが、%2が存在しません。</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan Skillfish SMUガバナーはインストール済みで設定されています。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>認証がキャンセルされました。</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexecが失敗しました(%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>サポートされていないサービス操作です:%1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1にはD-Busインターフェースがありません。</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>%1が見つかりませんでした。Cyan Skillfish SMUガバナーはインストールされていないようです。</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1はインストールされていますが、%2が存在しません。</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan Skillfish SMUガバナーはインストール済みで設定されています。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>認証がキャンセルされました。</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexecが失敗しました(%1)</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>サポートされていないサービス操作です:%1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1にはD-Busインターフェースがありません。</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctlが失敗しました(%1)</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1はシステムバスにありません(ガバナーが停止しているか、[dbus] enabled = falseです)。</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>ガバナーはバス上で応答しましたが、プロパティを読み取れませんでした。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>認証がキャンセルされました。</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>サポートされていないGPU使用率取得方法です:%1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>サポートされていない温度ソースです:%1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>サポートされていないgpu.set-methodです:%1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-everyは1以上である必要があります</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervalsは1 µs以上である必要があります</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjustはsampleより短くできません</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samplesは0(オフ)または1..%1である必要があります</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-eventsは1以上である必要があります</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normalは正の値である必要があります</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burstはnormalより大きい必要があります</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjustは負の値にできません</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>周波数は負の値にできません</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.minはfrequency-range.maxを超えてはいけません</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-targetは0 &lt;= lower &lt;= upper &lt; 1である必要があります</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttlingは0..100 °Cである必要があります</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recoveryはtemperature.throttling未満(または0)である必要があります</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>GPU使用率</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>gpu_metrics内のGPU使用率をパッチする</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>ガバナーが測定した負荷をパッチ済みのgpu_metricsテーブルに書き込み、sysfs上にバインドマウントします。これによりMangoHud、Steamのオーバーレイ、radeontop、そしてこのアプリが655%バグの代わりに実際のパーセンテージを表示します。</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>hwmon内のGPUクロックをパッチする</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>hwmonのfreq1_inputをSMUから読み取ったクロックに置き換えます。主に8コアアンロック後に発生するsysfsの誤った周波数報告を修正します。fix-metricsとは独立しています。</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>負荷取得方法:</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>温度ソース:</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>パッチ済みのメトリクステーブルをN更新サイクルごとにフラッシュします(既定10)。</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>クロック/電圧の適用方法:</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>新しい値</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>このアプリが管理するキー([gpu-usage]、[gpu]、[frequency-range]、[timing]、[frequency-thresholds]、[load-target]、[temperature]、[dbus])のみが書き込まれます。コメントやsafe-pointsテーブルを含む他のすべての行はそのまま残ります。書き込みのたびにconfig.toml.bak-YYYYMMDD-HHMMSSという名前のコピーが隣に作成されます。</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>(config.tomlはまだ存在しません。適用すると作成されます)</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>ディスクから再読み込み</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>すべてのページの編集を破棄し、config.tomlの値を再表示します。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>適用後にガバナーを再起動する</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>ガバナーは起動時にのみconfig.tomlを読み込みます。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>変更を適用</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>パスワードを一度だけ求め(pkexec)、config.tomlのタイムスタンプ付きバックアップを作成してから%1を書き込みます。他の設定ページの未適用の編集も一緒に書き込まれます。</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>フィルター:</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>テキストまたは正規表現(大文字小文字を区別しません)</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>追従</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>常に最新行までスクロールします。チェックを外すと移動せずに読めます。</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>消去</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>これまでに表示された行を破棄します。新しい項目は引き続き追加されます。</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — 接続中…</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>journalctl -u %1を追従中。最大%2行まで保持されます。</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>終了コード %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctlが停止しました(%1)。システムユニットを読むにはユーザーがsystemd-journalまたはwheelグループに所属している必要があるかもしれません。%2秒後に再試行します…</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctlが終了しました。%1秒後に再起動します…</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>このシステムではjournalctlが利用できないため、ジャーナルを表示できません。</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> (正規表現として無効なため、文字どおりに扱われます)</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%2行中%1行が一致%3。</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>このユーザーはカーネルログを読み取れません(systemd-journalグループに追加してください)</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -kが終了コード%1で終了しました</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctlが利用できません</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>ゲームごと</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>ガバナーには、単一のプログラムにこれらの設定のいずれかを適用し、終了時にパフォーマンスモードを再びオフにして通常の範囲に戻すラッパーが付属しています。ゲームに適用する設定を選び、その行をランチャーにコピーしてください。</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>対象:</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>コピー</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>この行をクリップボードにコピーします。</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>固定するクロック(MHz)。</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>下限。0 = 制限なし。</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>上限。0 = 制限なし。</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>制限なし</translation>
    </message>
    <message>
        <source>to</source>
        <translation>~</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>この負荷を下回るとガバナーはクロックを下げます。</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>この負荷を上回るとガバナーはクロックを上げます。</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>この温度を超えるとスロットリングします。</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>この温度を下回ると通常のクロックに戻ります。</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> config.tomlと同様に1に対する割合です。</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>下限が上限を超えています。</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>負荷ターゲットの下限は上限より小さくする必要があります。</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>回復温度はスロットリング温度より低くする必要があります。</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>コピーしました</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>GPU負荷</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>GPUクロック</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>GPU温度</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>電力</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>ガバナー</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>コピーしました:%1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>概要</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>GPU使用率</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>チューニング</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>セーフポイント</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>パフォーマンス</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>バックアップ</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>サービス</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>設定</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>ヘルプ</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>準備完了</translation>
    </message>
    <message>
        <source>Load %1%</source>
        <translation>負荷 %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>負荷 N/A</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>running</source>
        <translation>実行中</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>未インストール</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>%1
%2
Governor %3</source>
        <translation>%1
%2
ガバナー %3</translation>
    </message>
    <message>
        <source>Still running in the tray; use Quit in its menu to leave.</source>
        <translation>トレイで実行中です。終了するにはメニューの「終了」を使用してください。</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>未適用の変更が%1件あります。それでも閉じますか?</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>ガバナーサービスは実行されていません。</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>N/A</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>周波数センサーがありません。</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>温度センサーがありません。</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>gpu_metricsテーブルのaverage_socket_power(APU全体)。SMUは24.8固定小数点で報告しますが、ここではワットで表示します</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>gpu_metricsテーブルはソケット電力を報告していません。</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>制限なし</translation>
    </message>
    <message>
        <source>On</source>
        <translation>オン</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>オフ</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>現在の範囲 %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Busに到達できません。</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>見つかりません</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>実行中</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>失敗</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>停止</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> ページに</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> ページに</translation>
    </message>
    <message>
        <source> and </source>
        <translation> および </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>未適用の変更:%1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>無効な値</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>config.tomlを書き込めませんでした</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>設定を適用しました</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>、バックアップ:%1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>保存しましたが、再起動に失敗しました</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.tomlは更新されましたが、ガバナーを再起動できませんでした。

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>エラーテキストは返されませんでした。</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — 再起動に失敗しました</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>、ガバナーを再起動しました</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>セーフポイントを適用</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>%1個のセーフポイント(%2–%3 MHz)をconfig.tomlに書き込みますか?

ガバナーはこの曲線に沿ってスケーリングします。シリコンが耐えられないポイントは負荷時にボードをフリーズさせます。現在のファイルのバックアップを先に作成するので、バックアップページから復元できます。</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>セーフポイントを適用しました</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>保存されたものはありません</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>'%1'という名前のプロファイルはありません(既知:%2)。</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>プロファイル'%1'をフォームに読み込みました。適用すると書き込まれます</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>プロファイルを適用</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>'%1'を適用しますか?未適用の変更%2件は破棄されます。</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>無効なプロファイル</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>'%1'は適用できません:%2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>プロファイル'%1'を適用しました</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>プロファイル'%1'を適用し、ガバナーを再起動しました。</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>このコマンドをデスクトップのショートカット設定でキーに割り当ててください。実行中のアプリに届き、プロファイルを適用します。</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>プロファイルを保存</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>プロファイル名:</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>プロファイルを置き換え</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>'%1'は既に存在します。現在のフォームの値で置き換えますか?</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>プロファイル'%1'を保存しました</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>プロファイルを削除</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>プロファイル'%1'を削除しますか?</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>プロファイル'%1'を削除しました</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>%1を%2で置き換えますか?

現在のファイルを先にバックアップします。</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
その後ガバナーが再起動されます。</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>バックアップを復元</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>バックアップを復元できませんでした</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>%1を復元しました</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>ガバナー%1が利用可能です(インストール済み:%2)。サービスページを参照してください</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>ガバナーの更新%1が利用可能です。</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>テレメトリ履歴をエクスポート</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>CSVファイル (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>CSVファイルを書き込めませんでした</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>%1サンプル(%2–%3)を%4に書き込みました</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>以前のテレメトリエクスポートと比較</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>CSVファイル (*.csv);;すべてのファイル (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>CSVファイルを読み込めませんでした</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>比較するものがありません</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>このファイルには読み取り可能な時刻を持つサンプルがありません。</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>%2からの参照サンプル%1個を破線で描画しています</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>診断情報をエクスポート</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>テキストファイル (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>エクスポートに失敗しました</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>診断情報をエクスポートしました</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>%1に保存しました。

バグ報告に添付する前に内容を確認し、共有したくない内容は削除してください。</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1:完了</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1が失敗しました</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>パフォーマンスページでの'%1'によりテストが終了しました。</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1:完了</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1が失敗しました</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>ガバナーはエラーテキストを返しませんでした。</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>パフォーマンスモード オン</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>パフォーマンスモード オフ</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>固定周波数 %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>実行時範囲 %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>負荷ターゲット %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>未設定</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>温度 %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>実行時の値をチューニングページにコピーしました。適用すると保存されます</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>%1秒間</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>停止するまで</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> %1を実行して負荷をかける</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>セーフポイントをテスト</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>GPUを%2 mVで%1 MHz%3%4に固定しますか?

ガバナーはこの値をそのまま適用し、自動スケーリングを停止します。サーマルスロットリングは有効なままです。シリコンが耐えられないポイントは負荷時にボードをフリーズさせます。config.tomlへの書き込みは行われません。パスワードを求められます(TestModeインターフェースはroot専用です)。</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>テストモードが失敗しました</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>%1を起動できませんでした(%2)</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>テストモード:%1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>カーネルログでGPUエラーが発生したため中止しました</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>クラッシュしました</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>終了コード%1で終了しました</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>ポイントを固定している間に%1 %2</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>%1 MHz @ %2 mVのテスト、%4秒後に%3</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> %1負荷下で</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>最高%1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>クロック %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>クロック %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ カーネル:%1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> (他%1件)</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>カーネルログは監視されていません</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>カーネルログにGPUエラーはありません</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>。ガバナーは通常のスケーリングに戻りました。</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>タイマーにより終了しました</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>テストを終了できませんでした</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

サービスページでガバナーを再起動するとテストモードも終了します。</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>ガバナーが停止したため、テストも終了しました。</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>、残り%1秒</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1。</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1がGPUに負荷をかけています。</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> 自分でGPUに負荷をかけてください。</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> カーネルログを読み取れないため、ハング検出はできません。</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> カーネルログを監視中です。</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>%1 MHz @ %2 mV%3をテスト中です。%4%5 概要ページを確認してください。「テスト停止」で通常のスケーリングに戻ります。</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>概要</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>実行時の状態</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>ガバナーサービス</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metricsの上書き</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>GPU負荷センサー</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics(保存済み)</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>GPU負荷、クロック、温度</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>表示期間:</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>直近%1分のうちチャートに表示する範囲です。エクスポートには保持されているすべてのデータが含まれます。</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>CSVをエクスポート…</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>保持されているすべてのサンプル(時刻、負荷、クロック、温度、ソケット電力、パフォーマンスモード、実行時範囲)をCSVファイルとして保存します。</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>比較…</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>以前のCSVエクスポートを読み込み、ライブの線の背後に破線で描画します(最新サンプルが右端)。両セッションの平均値がチャートの下に表示されます。</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>消去</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>チャートから参照セッションを削除します。</translation>
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
        <translation>負荷 %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>温度 °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>クロック MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>負荷 % (参照)</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>温度 °C (参照)</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>クロック MHz (参照)</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metricsテーブル</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>BC-250は通常gpu_busy_percentセンサーを公開していませんが、fix-metricsがオンでサービスが実行中であれば、ガバナー自身が負荷を測定しパッチ済みのgpu_metricsテーブルに公開します。アプリはそこから読み取ります。センサーがない場合はN/Aと表示され、0%にはなりません。</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>未インストール</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>アクティブ</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>サブステート:%1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>失敗</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>ユニットが失敗しました。ジャーナルはサービスページを参照してください。</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>非アクティブ</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>不明</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>マウント済み</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>未マウント</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>fix-metricsがオンでサービスが実行中の間、ガバナーはパッチ済みのgpu_metricsテーブルをsysfsファイル上にバインドマウントします。</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>有効</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>無効</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>config.tomlに保存された値です。</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>利用不可</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>利用可能</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>負荷 %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>負荷 N/A</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>クロック %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>温度 %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>現在:%1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>。使用可能なGPU負荷センサーがありません:%1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>到達可能</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governorがシステムバス上で応答しています。</translation>
    </message>
    <message>
        <source>On</source>
        <translation>オン</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>オフ</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>現在の範囲 %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>制限なし</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>到達不可</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>不明</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>ガバナーが[dbus] enabledで実行されている必要があります。</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>GPU負荷、クロック、温度(直近%1)</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> (%1分%2秒を記録)</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>参照 %1 (%2):%3。</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> ライブ表示期間 (%1):%2。</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>/sys/class/drm/card*/device以下に読み取り可能なgpu_metrics v2.xテーブルがありません。</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> (パッチ済み)</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> (生データ)</translation>
    </message>
    <message>
        <source>none</source>
        <translation>なし</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>ガバナー(fix-metrics)が公開しているテーブルです。GFXアクティビティはガバナー自身の測定値です。</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>生のカーネルテーブルです。GFXアクティビティは壊れたファームウェア値(655%バグ)です。実際の値を得るにはfix-metricsを有効にしてください。</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>生のカーネルテーブルです。</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>パフォーマンス</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>更新</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>D-Bus(com.cyanskillfish.Governor)経由の実行時制御です。即座に適用され、パスワードは不要ですが、次回ガバナー再起動時に失われます。config.tomlは変更されません。値を永続化するにはチューニングページを使用してください。パフォーマンスモードはセーフポイントの全範囲を開放し、固定周波数はクロックを固定し、負荷ターゲットと温度しきい値はモードに触れずにガバナーのスケーリング方法を変更します。</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>実行時の状態</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>現在の範囲</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>開始時の範囲([frequency-range])</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>許容範囲(セーフポイント)</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>負荷ターゲット(下限 / 上限)</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>温度(スロットル / 回復)</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>操作</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>パフォーマンスモード:オフ</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled:オンにするとガバナーは許容範囲全体を使用し、負荷への反応が速くなります。オフにすると開始時の範囲に戻ります。</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>モード:</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency:ここで固定したクロックでパフォーマンスモードになります。許容範囲内である必要があります。</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>クロックを固定</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>固定周波数:</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>制限なし</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>現在の下限クロック。「制限なし」=最も低いセーフポイント。</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>現在の上限クロック。「制限なし」=最も高いセーフポイント。</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>範囲を設定</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max):一時的な範囲で、パフォーマンスモードは解除されます。</translation>
    </message>
    <message>
        <source>to</source>
        <translation>~</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>実行時範囲:</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>このGPU負荷を下回るとガバナーはクロックを段階的に下げます。</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>このGPU負荷を上回るとガバナーはクロックを段階的に上げます。</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>負荷ターゲットを設定</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper):次回再起動までガバナーがGPUを維持する負荷帯域です。パフォーマンスモードには影響しません。</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>負荷ターゲット:</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>この温度を超えるとガバナーは最大クロックを引き下げます。</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>未設定</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>この温度を下回ると再び全範囲が許可されます。「未設定」=ガバナー自身のヒステリシスを使用します。</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>温度を設定</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery):次回再起動まで有効です。パフォーマンスモードには影響しません。</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>温度:</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>実行時の値をチューニングページにコピー</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>現在の範囲、負荷ターゲット、温度をチューニングフォームに反映し、config.tomlに保存できるようにします。</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>到達可能</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governorがシステムバス上で応答しています。</translation>
    </message>
    <message>
        <source>On</source>
        <translation>オン</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>オフ</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>PerformanceModeインターフェースのEnabledプロパティです。</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>パフォーマンスモード:オン</translation>
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
        <translation>未設定</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>到達不可</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>不明</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>ガバナーサービスが実行されていません(サービスページ)。</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>config.tomlでD-Busがオフになっています。チューニングページで有効にして、再起動を伴って適用してください。</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>ガバナーがシステムバス上で応答しませんでした。</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>操作は無効です:%1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>負荷ターゲットの下限は上限より小さくする必要があります</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>回復温度はスロットリング温度より低い(または未設定)必要があります</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>プロファイル</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>このページとGPU使用率ページの名前付きスナップショットで、あなたのユーザーのみに保存されます。セーフポイントはプロファイルに含まれません。</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>フォームに読み込む</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>チューニングとGPU使用率のフォームに値を反映します。適用するまで何も書き込まれません。</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>今すぐ適用</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>プロファイルをconfig.tomlに書き込みます(先にバックアップ、パスワードは一度)。ガバナーを再起動します。設定ページの未適用の編集は破棄されます。</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>現在の値を名前を付けて保存…</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>現在フォームにある値(適用済みかどうかに関わらず)を名前を付けて保存します。</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>削除</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>ホットキーコマンドをコピー</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>実行中のアプリでこのプロファイルを適用するコマンドラインをクリップボードに置きます。システム設定 → ショートカット(KDE)またはキーボード → カスタムショートカット(GNOME)でキーに割り当てると、ウィンドウを開かずにプロファイルを切り替えられます。</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>プロファイルはまだありません。フォームを設定して「現在の値を名前を付けて保存…」を使用してください</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>セーフポイント</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>ディスクから再読み込み</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>%1の[[safe-points]]は、ガバナーがそれに沿ってスケーリングする周波数/電圧曲線を定義します。最も低いポイントと最も高いポイントの間の範囲を外れることはありません。[frequency-range]と実行時の制御はこの範囲にクランプされます。編集は慎重に行ってください。誤った電圧はボードをフリーズさせたり損傷させたりする可能性があります。適用時にはまずガバナーのルールとハードレール(%2–%3 mV、最大%4 MHz)をチェックし、バックアップを作成します。</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>ポイント</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>周波数</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>電圧</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>ポイントを追加</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>選択したポイントの後に、次のポイントとの中間に新しいポイントを追加します。</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>削除</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>並べ替え</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>行を周波数順に並べ替えます(適用時にはいずれにせよ行われます)。</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>曲線</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>セーフポイントを適用</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>[[safe-points]]ブロックをconfig.tomlに書き込みます(パスワードを求められ、先にバックアップを作成します)。</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>その後ガバナーを再起動する</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>ガバナーは起動時にのみconfig.tomlを読み込みます。</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>元に戻す</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>ファイル内のポイントに戻します。</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>出荷時の既定値</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>ガバナーのdefault-config.tomlで有効なポイント:%1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>保存前にポイントをテストする(実行時、root)</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>D-Bus経由のSetTestModeは、この周波数と電圧を今すぐ固定し、自動スケーリングを停止します。ガバナーのサーマルスロットリングは有効なままです。config.tomlへの書き込みは行われず、ガバナーは指定された値をそのまま適用するため、ハードレール内に留めてください。実行中はGPUに負荷をかけてください。「テスト停止」(またはタイマー)はパフォーマンスモードをオフにし、起動時の範囲での通常スケーリングに戻ります。シリコンが耐えられないポイントはボードをフリーズさせます。作業内容は保存しておいてください。</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>負荷:</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>PATH上に見つかったGPU負荷生成ツールで、テスト開始時に起動され、終了時に強制終了されます。ポイントが固定されている間に終了した場合は報告されます。</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>負荷ツール(vkmark、glmark2、vkcubeまたはglxgears)が見つかりません。テスト中は自分でゲームやベンチマークを実行してください。</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>選択した行から値が入力されています。自由に編集できます。</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>停止するまで</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>この時間が経過すると、アプリは自動的にテストを終了します(0 = 「テスト停止」でのみ終了)。</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>周波数:</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>電圧:</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>対象:</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>テスト開始</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>パスワードを求められます(pkexec)。TestModeインターフェースはroot専用です。</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>テスト停止</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>テーブルに追加</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>この周波数/電圧のペアを上のセーフポイントテーブルに追加します(周波数順に並べ替えられ、同じ周波数のポイントは置き換えられます)。保存するには適用してください。</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>自分のボードがどこまで対応できるか(より高い最高周波数、より低い電圧)を探るのは%1の仕事です。検証された負荷の下で一段階ずつテストし、結果をインストールできます。シリコンの耐性を理解している場合にのみ、ポイントを手動で編集してください。</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1個のポイント:%2 MHz @ %3 mVから%4 MHz @ %5 mVまで。</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>[[safe-points]]がありません。ガバナーは350 MHz @ 700 mVと2000 MHz @ 1000 mVにフォールバックします。</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>最高周波数を%1から%2 MHzに引き上げます</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>既存の%1個のポイントで電圧を下げます</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>この変更は%1します。不安定なポイントは負荷時にボードをフリーズさせる可能性があります。先にbc250-gpu-oc-bisectで検証してください。</translation>
    </message>
    <message>
        <source> and </source>
        <translation> および </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>制限なし</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>ガバナー(D-Bus):許容範囲 %1–%2 MHz、現在の範囲 %3–%4 MHz。</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHzは、多くのボードがハードロックする%2 MHzを超えています</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mVは%2 mVを超えています</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>上の曲線では%2 MHzで%1 mVになりますが、これはそれより低い値です</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>ガバナーのD-Busインターフェースに到達できません(サービス停止中、または[dbus] enabled = falseです)。</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>サービス</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>更新を確認</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>インストール済みのRPMをGitHub上の最新リリースと比較します。</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>診断情報をエクスポート…</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>バージョン情報、config.toml、サービス状態、ジャーナル、生のgpu_metricsテーブルをバグ報告用のテキストファイルに保存します。</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>更新</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>ユニットが見つかりました</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>アクティブ</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>起動時に有効</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metricsの上書き</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>バージョン</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>開始</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>再起動</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>起動時に有効化</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>起動時に無効化</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2(パスワードを求められます)。</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>ジャーナル(ライブ)</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>はい</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>いいえ — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>はい (%1)</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>いいえ (%1)</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>読み込まれていません</translation>
    </message>
    <message>
        <source>No</source>
        <translation>いいえ</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>リリースノート</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>リリース</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>パッケージがインストールされていません</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>確認中…</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>設定</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>これらの設定はガバナーではなくアプリに関するもので、ユーザーごとに保存されます。</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>システムトレイ</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>GPU負荷、クロック、温度をツールチップに表示するトレイアイコンを表示する</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>ウィンドウを閉じてもアプリはトレイで実行され続ける</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>トレイアイコンを左クリックするとウィンドウを表示/非表示にできます。メニューではパフォーマンスモードの切り替え(D-Busに到達可能な場合)とアプリの終了もできます。</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>このデスクトップにはシステムトレイがありません(GNOMEの場合はAppIndicator拡張機能をインストールしてください)。</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>ログイン時に起動</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>ログイン時にアプリを起動する</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>…ウィンドウを開かずにトレイに隠した状態で</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>ガバナーの更新</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>アプリ起動時に新しいガバナーのリリースを確認する</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>filippor/cyan-skillfish-governorの最新リリースについてapi.github.comに1回リクエストし、インストール済みのRPMと比較します。それ以外は何も送信されません。サービスページにも同じ確認をボタンとして用意しています。</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>アラート</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>GPU温度が次の値に達したら通知する</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>ガバナーが温度によりスロットリングを開始したら通知する</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>ガバナーサービスが自ら停止または失敗したら通知する</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>トレイアイコン経由でデスクトップ通知として表示されます(トレイがオフの場合はステータスバーに表示)。イベントごとに1件のメッセージが表示されます。温度アラートはGPUがしきい値より5 °C低くなると再度有効になり、同じアラートは最短でも5分間隔で繰り返されます。</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>%1を書き込めませんでした:%2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>エントリ:%1
コマンド:%2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>%1にデスクトップエントリを書き込みます。システム全体へのインストールは行いません。</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>不明</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>負荷ツールは既に実行中です。</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>%1がPATH上に見つかりませんでした。</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1は起動しませんでした:%2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>負荷 %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>クロック %1 MHz(最大%2)</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C(最大%2)</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>測定値なし</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>ウィンドウを隠す</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>プロファイルを適用</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>終了</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>ウィンドウを表示</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>チューニング</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>プリセット:</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>フォームの内容はどのプリセットとも一致しません。</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>下のフォームに値を反映します。適用するまで何も書き込まれません。</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>起動時のクロック制限</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>ガバナーが選択できる最も低いクロック。0(制限なし)=最も低いセーフポイント。</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>ガバナーが選択できる最も高いクロック。0(制限なし)=最も高いセーフポイント。</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>最小:</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>最大:</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>config.tomlのセーフポイントテーブルの範囲外の値は、ガバナーによってクランプされます。</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>クロックを変更するタイミング</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>この負荷を超えるとガバナーはクロックを上げます(上限)。</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>この負荷を下回るとガバナーはクロックを下げます(下限)。</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>引き上げ条件(超過時):</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>引き下げ条件(下回り時):</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>差が広いとクロックは安定し、狭いと負荷に追従しやすくなります。セクションがない場合のガバナーの既定値:95% / 80%。</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>サーマルスロットリング</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>このGPU温度を超えるとガバナーはクロックを下げます(既定85)。</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>未設定</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>この温度を下回るとスロットリングは終了します。スロットリング温度より低い必要があります。「未設定」の場合、config.tomlにキーは書き込まれません。</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>スロットル条件(超過時):</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>回復条件(下回り時):</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>実行時制御</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>システムバス上でcom.cyanskillfish.Governorを公開する</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>このアプリのパフォーマンスページと、cyan-skillfish-performance-mode起動ラッパーに必要です。</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>制御ループ</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>GPUビジーフラグをサンプリングする頻度(ガバナーの既定2000 µs、出荷時ファイル250 µs)。busy-flag負荷取得方法で使用されます。</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>クロックターゲットを再計算する頻度(ガバナーの既定はsampleの10倍、出荷時ファイル100 000 µs)。サンプリング間隔より短くできません。</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>サンプリング間隔:</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>調整間隔:</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>クロックがターゲットに向かって変化する速さ(既定1 MHz/ms)。</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>バーストモード中の変化速度。通常速度より大きい必要があります(ガバナーの既定は通常の200倍、出荷時ファイル50 MHz/ms)。</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>変化速度:</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>バースト変化速度:</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> サンプル</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>オフ</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>このビジーサンプルが連続した回数でバースト変化速度に切り替わります。これにより、突然GPUに負荷をかけるゲームでもクロックが素早く上がります(1..%1、オフの場合キーは書き込まれません。出荷時ファイル60)。</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>バースト開始条件:</translation>
    </message>
    <message>
        <source> events</source>
        <translation> イベント</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>負荷が下限ターゲットを下回った状態での調整サイクル数が経過するとクロックが段階的に下がります(ガバナーの既定10、出荷時ファイル5)。値が大きいほどクロックは下がりにくくなります。</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>引き下げ開始条件:</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>サンプリングと調整を速くすると反応は早くなりますが、CPU時間を消費します。バーストモードはゲーム開始時の遅延を短縮し、down-eventsを増やすと短い一時停止中にクロックが下がるのを防げます。</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>デッドバンド</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>バースト以外のクロック変更でこの値より小さいものは適用されません(既定10)。SMUへの絶え間ない微小な書き込みを回避します。</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>この値未満の変更を無視:</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>チューニングセクション</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>ガバナーはセーフポイントの範囲が%1–%2 MHzであると報告しています。範囲外の値はクランプされます。</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>ディスクから再読み込み</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>すべてのページの編集を破棄し、config.tomlの値を再表示します。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>適用後にガバナーを再起動する</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>ガバナーは起動時にのみconfig.tomlを読み込みます。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>変更を適用</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>パスワードを一度だけ求め(pkexec)、config.tomlのタイムスタンプ付きバックアップを作成してから%1を書き込みます。他の設定ページの未適用の編集も一緒に書き込まれます。</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>未インストール</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1(最新:不明 — %2)</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1(最新:不明)</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2が利用可能です(%3)</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1(最新版です、最新リリース%2)</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1(最新リリース:%2、%3)</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>timing.intervals.sampleの間隔でGPUの単一ビジービットをサンプリングします(既定)。最も低負荷で、どこでも動作します。</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>GPUを開いているすべてのプロセスをスキャンします。busy-flagよりCPU負荷が高くなります。</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>カーネル自身の負荷値を読み取ります。パッチ済みカーネルが必要ですが、標準のBazziteにはありません。</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl。ガバナー実行中はDRMデバイスハンドルを開いたままにします(既定)。</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>代わりにamdgpu hwmonのtemp1_inputを読み取るため、DRMクライアントを開いたままにしません。同じセンサーです。</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>SMUに直接アクセスします(bc250collectiveのAPI)。セーフポイントの電圧をクロックとともに適用します(既定)。</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>SMUの代わりにamdgpu sysfsインターフェース(pp_od_clk_voltage)経由で行います。</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>出荷時の既定値</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>静音</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>応答性重視</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>最大クロック</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>ガバナーパッケージがインストールするconfig.tomlの値です。</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>動作を維持できる範囲で最も低いクロックです。立ち上がりが遅く、最大1500 MHzに留まり、80 °Cでスロットリングします。</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>早めに立ち上がり、セーフ範囲全体を許可しますが、発熱と消費電力が増えます。</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>セーフ範囲の上限付近に留まり、サーマルスロットリングを有効にしたまま固定クロックに近い動作をします。</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>カスタム</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>制限なし</translation>
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
&lt;p&gt;&lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;(&lt;b&gt;AMD BC-250&lt;/b&gt;(Cyan Skillfish APU、gfx1013)の&lt;b&gt;Bazzite&lt;/b&gt;上でのGPUガバナー)
のための小さなフロントエンドです。ガバナーは既にインストールされている必要があります。このアプリは設定の一部のセクションを編集し、
systemdサービスを制御します。システムの他の部分には一切手を加えません。&lt;/p&gt;

&lt;h2&gt;概要&lt;/h2&gt;
&lt;p&gt;サービスが実行中かどうか、ガバナーのパッチ済み&lt;code&gt;gpu_metrics&lt;/code&gt;テーブルがsysfs上にマウントされているかどうか、
GPU負荷センサーが利用可能かどうかを表示し、GPU負荷(%)、温度(°C、左軸)、クロック(MHz、右軸)のチャートを示します。測定値が欠けている箇所は
空白のままになり、偽の0が表示されることはありません。アプリは実行中、直近1時間分のサンプル(2秒ごとに1つ)を保持します。&lt;b&gt;表示期間&lt;/b&gt;では
チャートに表示する範囲(2、10、30、60分)を選べ、&lt;b&gt;CSVをエクスポート…&lt;/b&gt;は保持されているすべてのサンプル(時刻、負荷、クロック、温度、
ソケット電力、パフォーマンスモード、実行時範囲)をファイルに書き出します。&lt;b&gt;比較…&lt;/b&gt;はそのようなファイルを読み込み、ライブの線の背後に
破線で描画し(最新サンプルが右端になる点はライブ表示と同じ)、両セッションの平均値とピーク値(負荷、クロック、温度、ソケット電力)をチャートの下に
表示します。これにより、プロファイルやセーフポイントの変更を以前の実行と比較して判断できます。&lt;b&gt;消去&lt;/b&gt;はこれを削除します。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;gpu_metricsテーブル&lt;/b&gt;のボックスは、カーネル(またはガバナー)が公開するテーブルをデコードします:アクティビティ、温度、
ソケット/GFX/CPU電力、GFX・SoC・メモリ・ファブリックの各クロック、スロットル状態、CPUコアクロックです。
&lt;i&gt;(パッチ済み)&lt;/i&gt;はガバナーのテーブルがマウントされていることを意味し、&lt;i&gt;(生データ)&lt;/i&gt;はカーネル自身のテーブルで、
BC-250ではGFXアクティビティが壊れた655%の値になっており、負荷としては使用されません。&lt;/p&gt;
&lt;p&gt;BC-250には通常&lt;code&gt;gpu_busy_percent&lt;/code&gt;センサーがありませんが、&lt;b&gt;fix-metrics&lt;/b&gt;がオンでサービスが実行中であれば、
ガバナー自身が負荷を測定し、sysfs上にマウントするパッチ済みの&lt;code&gt;gpu_metrics&lt;/code&gt;テーブルに公開します。アプリはそこから負荷を
読み取ります。&lt;code&gt;gpu_busy_percent&lt;/code&gt;と&lt;code&gt;radeontop&lt;/code&gt;はフォールバックです。どのソースもない場合は、誤解を招く0%ではなく
&lt;b&gt;N/A&lt;/b&gt;が表示され、ツールチップに何が不足しているかが示されます。GPUクロックと温度はamdgpu hwmonセンサーから取得され、
&lt;code&gt;fix-freq&lt;/code&gt;がオンの場合、クロックは実際のSMU値になります。&lt;/p&gt;

&lt;h2&gt;GPU使用率&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;%3&lt;/code&gt;の&lt;code&gt;[gpu-usage]&lt;/code&gt;セクションを編集します:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;キー&lt;/th&gt;&lt;th&gt;既定値&lt;/th&gt;&lt;th&gt;意味&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;測定した負荷をパッチ済みの&lt;code&gt;gpu_metrics&lt;/code&gt;
テーブルに書き込み、sysfs上にバインドマウントします。MangoHud、Steamのオーバーレイ、radeontopの655% GPU使用率を修正します。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;SMUから読み取ったクロックで&lt;code&gt;current_gfxclk_frequency&lt;/code&gt;も
パッチします。主に8コアアンロック後に発生する誤ったsysfs周波数を修正します。fix-metricsとは独立しています。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt;はGPUのビジービットをサンプリングします。
&lt;i&gt;process&lt;/i&gt;はGPUを使用するすべてのプロセスをスキャンします(よりCPU負荷が高い)。&lt;i&gt;kernel&lt;/i&gt;はパッチ済みカーネルが必要です。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;GPU温度の読み取り元:DRM ioctl(DRMハンドルを開いたままにする)、
またはhwmonの&lt;code&gt;temp1_input&lt;/code&gt;ファイル。同じセンサーです。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;パッチ済みテーブルをN更新サイクルごとにフラッシュします。&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;そして&lt;code&gt;[gpu]&lt;/code&gt;セクション:&lt;b&gt;set-method&lt;/b&gt;(&lt;i&gt;smu&lt;/i&gt;が既定で、SMUを直接介してクロックと電圧を適用します。
&lt;i&gt;kernel&lt;/i&gt;は代わりにamdgpu sysfsインターフェースを介します)。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;変更を適用&lt;/b&gt;(このページまたはチューニングページ)はパスワードを一度求めます(pkexec)。現在の
ファイルを&lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt;としてコピーし、両方のページの未適用の編集を書き込みます。既知の
キーのみが変更され、コメントを含む他のすべての行はそのまま保持されます。ガバナーは起動時にファイルを読み込むため、
そのオプションのチェックを外さない限り、その後サービスが再起動されます。&lt;/p&gt;

&lt;h2&gt;チューニング&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;%3&lt;/code&gt;の他のセクションを編集します:&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;セクション&lt;/th&gt;&lt;th&gt;キー&lt;/th&gt;&lt;th&gt;意味&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min, max&lt;/td&gt;&lt;td&gt;ガバナーが起動時に使用するクロック制限(MHz)。&lt;i&gt;制限なし&lt;/i&gt;
(0)は制限を設けません。セーフポイントテーブルの範囲外の値はガバナーによってクランプされます。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper, lower&lt;/td&gt;&lt;td&gt;負荷が&lt;i&gt;upper&lt;/i&gt;を超えるとクロックを上げ、
&lt;i&gt;lower&lt;/i&gt;を下回ると下げます。差が広いとクロックは安定し、狭いと負荷に追従しやすくなります。
セクションがない場合のガバナー自身の既定値は95% / 80%で、出荷時ファイルは65% / 50%を使用します。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling, throttling_recovery&lt;/td&gt;&lt;td&gt;最初の値(既定
85 °C)を超えるとスロットリングし、2番目の値(任意、&lt;i&gt;未設定&lt;/i&gt;)を下回ると回復します。2番目の値は1番目より低くする必要があります。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;システムバス上で&lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt;を公開します。
パフォーマンスページに必要です。出荷時ファイルではオンになっていますが、ガバナーの組み込みの既定はオフです。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample, intervals.adjust, ramp-rates.normal, ramp-rates.burst, burst-samples,
down-events&lt;/td&gt;&lt;td&gt;制御ループです:負荷のサンプリングとクロック調整の頻度(µs)、クロックがターゲットに
向かって変化する速さ(MHz/ms)、より速いバーストランプに切り替わるまでの連続ビジーサンプル数(&lt;i&gt;オフ&lt;/i&gt;の場合は
キーを書き込まない)、クロックが下がるまでの低負荷調整サイクル数です。ガバナーの既定値:2000 µs /
sampleの10倍、normalの1 / 200倍、オフ、10。出荷時ファイルは250 µs / 100 000 µs、1 / 50、60、5を使用します。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;MHz単位のデッドバンド:これより小さいバースト以外の
変更は適用されません(既定10)。&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;プリセット&lt;/b&gt;は周波数範囲、負荷ターゲット、温度を一度に設定します(timingは変更されません):&lt;i&gt;出荷時の既定値&lt;/i&gt;
(パッケージの設定)、&lt;i&gt;静音&lt;/i&gt;(クロックを低くし、立ち上がりを遅くする)、&lt;i&gt;応答性重視&lt;/i&gt;(早い立ち上がり、全範囲)、
&lt;i&gt;最大クロック&lt;/i&gt;(上限付近を維持)。値がどのプリセットとも異なるとコンボボックスは&lt;i&gt;カスタム&lt;/i&gt;を表示します。無効な組み合わせ
(minがmaxを超える、回復がスロットリングを下回らない、調整間隔がサンプルより短い、バースト速度が通常以下)はフォームの下に
表示され、適用をブロックします。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;プロファイル&lt;/b&gt;はこのページとGPU使用率ページのすべての値(セーフポイントは含まれません)の名前付きスナップショットで、
&lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt;にユーザーごとに保存されます。
&lt;i&gt;現在の値を名前を付けて保存…&lt;/i&gt;は現在フォームに表示されている値(適用済みかどうかに関わらず)を保存します。&lt;i&gt;フォームに読み込む&lt;/i&gt;は
両方のページに値を反映するので、通常どおり確認して適用できます。&lt;i&gt;今すぐ適用&lt;/i&gt;はプロファイルを&lt;code&gt;config.toml&lt;/code&gt;に書き込み
(先にバックアップ、パスワードは一度)、未適用の編集を破棄してガバナーを再起動します。トレイアイコンが有効な場合、
トレイメニューの&lt;i&gt;プロファイルを適用&lt;/i&gt;サブメニューでも、ウィンドウを開かずに同じことができます。&lt;b&gt;キーボードショートカット&lt;/b&gt;用に、
&lt;i&gt;ホットキーコマンドをコピー&lt;/i&gt;は&lt;code&gt;bc250-governor-manager --profile 'Name'&lt;/code&gt;をクリップボードに置きます。これを
システム設定 → ショートカット(KDE)またはキーボード → カスタムショートカット(GNOME)に割り当ててください。アプリはユーザーごとに
1つだけ実行され、そのコマンドはローカルソケット経由で実行中のインスタンスに届き、そこでプロファイルを適用します(パスワードは一度、
トレイ通知あり)。何も実行されていない場合はアプリを起動してから適用します。単なる2回目の起動はウィンドウを前面に出すだけです。
&lt;code&gt;--list-profiles&lt;/code&gt;は保存された名前を表示します。&lt;/p&gt;

&lt;h2&gt;セーフポイント&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;%3&lt;/code&gt;の&lt;code&gt;[[safe-points]]&lt;/code&gt;を、編集可能なテーブルと周波数/電圧曲線として表示します。
ガバナーはこの曲線に沿ってスケーリングし、その範囲を外れることはありません。&lt;code&gt;[frequency-range]&lt;/code&gt;と実行時の
制御はこの範囲にクランプされます。&lt;b&gt;ポイントを追加&lt;/b&gt;は次のポイントとの中間に挿入し、&lt;b&gt;削除&lt;/b&gt;は選択した
行を削除し、&lt;b&gt;出荷時の既定値&lt;/b&gt;はガバナー自身のテーブルを読み込み、&lt;b&gt;元に戻す&lt;/b&gt;はファイルの内容に戻します。
&lt;b&gt;セーフポイントを適用&lt;/b&gt;が有効になるには、リストがガバナーのルール(少なくとも2ポイント、周波数の重複なし、
周波数が上がるにつれて電圧が下がらないこと)と、bc250-gpu-oc-bisectと共有するハードレール
(700–1100 mV、最大2500 MHz)を満たす必要があります。2000 MHzまたは1000 mVを超える場合、あるいは変更が最高周波数を
引き上げる場合や既存の電圧を下げる場合は、警告が表示されます:不安定なポイントは負荷時にボードをフリーズさせます。適用時には
バックアップを作成し、パスワードを求めます。ボード自身の上限を安全に見つけるのは
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt;の仕事です。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;保存前にポイントをテストする&lt;/b&gt;は、ガバナーのroot専用&lt;code&gt;TestMode&lt;/code&gt; D-Busインターフェースを使用します
(&lt;code&gt;pkexec&lt;/code&gt;プロンプトが1回表示されます)。入力した周波数と電圧にGPUを固定し、自動スケーリングは停止しますが、
サーマルスロットリングは有効なままです。&lt;code&gt;config.toml&lt;/code&gt;への書き込みは行われません。フィールドには
選択した行の値が事前入力されます。2000 MHz / 1000 mVを超える場合や、電圧が上の曲線から得られる値を下回る場合は
警告が表示されます。&lt;b&gt;負荷&lt;/b&gt;はPATH上に見つかったGPU負荷生成ツール(優先順にvkmark、glmark2、
vkcube、glxgears)を選びます。テスト開始時に起動され、テスト終了時に強制終了されます。ポイントが固定されている間に
終了した場合は、その旨がステータスに表示されます。ツールがない場合は、自分でGPUに負荷をかけ概要ページを確認してください。
&lt;b&gt;テスト停止&lt;/b&gt;、タイマー(既定60秒、&lt;i&gt;停止するまで&lt;/i&gt;=0)、アプリを閉じること、またはパフォーマンスページでの
何らかの操作は、パフォーマンスモードをオフにすることでテストを終了させ、ガバナーは起動時の範囲での通常スケーリングに戻ります。
結果行には、ポイントを保持していた時間、最高温度、観測されたクロック範囲が表示されます。&lt;b&gt;テーブルに追加&lt;/b&gt;はテストした
ペアをセーフポイントテーブルに追加します(並べ替えられ、同じ周波数のポイントは置き換えられます)ので、適用できます。ポイントが
固定されている間、&lt;b&gt;カーネルログ&lt;/b&gt;(&lt;code&gt;journalctl -k -f&lt;/code&gt;)はamdgpuのトラブル(リングタイムアウト、GPUリセット、
&lt;code&gt;*ERROR*&lt;/code&gt;行、SMU障害)を監視します。そのような行が最初に現れるとテストは直ちに中止され、ボードがフリーズする前に
ポイントが解放され、結果にその内容が引用されます。問題がなかった場合もその旨が表示されます。カーネルリングを読むには
&lt;code&gt;systemd-journal&lt;/code&gt;(または&lt;code&gt;wheel&lt;/code&gt;)グループのメンバーシップが必要です。そうでない場合、ステータスには
ログが監視されていないと表示され、テストは監視なしで実行されます。シリコンが耐えられないポイントは、カーネルがログを記録するより
速くボードをフリーズさせる可能性があるため、先に作業内容を保存してください。D-Busを持つのはsmuガバナーのみです。&lt;/p&gt;

&lt;h2&gt;パフォーマンス&lt;/h2&gt;
&lt;p&gt;D-Bus経由でのガバナーの実行時制御で、ガバナー自身の
&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;ラッパーが行うことと全く同じです。変更は即座に適用され、パスワードは
不要ですが、次回ガバナー再起動時に失われます。&lt;code&gt;config.toml&lt;/code&gt;は変更されません。&lt;i&gt;実行時の値をチューニングページにコピー&lt;/i&gt;は
現在の範囲としきい値をチューニングページに引き継ぎ、保存できるようにします。&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;パフォーマンスモード&lt;/b&gt;はトグルです(オンの間は赤色):オンにすると許容(セーフポイント)範囲全体が開放され、オフにすると
&lt;code&gt;[frequency-range]&lt;/code&gt;の範囲に戻ります。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;クロックを固定&lt;/b&gt;は周波数を固定し、パフォーマンスモードをオンにします。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;範囲を設定&lt;/b&gt;は実行時のmin/maxを適用します。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;負荷ターゲットを設定&lt;/b&gt;と&lt;b&gt;温度を設定&lt;/b&gt;は、パフォーマンスモードや実行中のセーフポイントテストに触れることなく、
ガバナーがスケーリングに使用する負荷帯域(下限/上限 %)とスロットリング/回復温度を変更します。
フィールドはガバナーの現在の値に追従し、変更があると再入力されます。実現不可能な組み合わせ(下限が上限を下回らない、
回復がスロットリングを下回らない)はボタンを無効にします。&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;サービスが実行されていない場合、またはバス名が公開されていない場合は操作が無効になり、理由が操作欄の下に表示されます。
必要に応じてチューニングページで&lt;code&gt;[dbus] enabled&lt;/code&gt;を有効にし、ガバナーを再起動してください。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;ゲームごと&lt;/b&gt;は、ガバナーの&lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;ラッパー用の起動行を構築します:
通常のパフォーマンスモード、&lt;code&gt;--fixed-frequency&lt;/code&gt;、&lt;code&gt;--range&lt;/code&gt;、&lt;code&gt;--load-target&lt;/code&gt;、
&lt;code&gt;--temperature&lt;/code&gt;で、ガバナーの現在の値が事前入力され、Steam起動オプション用
(&lt;code&gt;… %command%&lt;/code&gt;)、Heroic/Lutrisラッパーコマンド、またはターミナル用に整形されます。&lt;b&gt;コピー&lt;/b&gt;で
クリップボードに置きます。ラッパーは設定を適用し、ゲームを実行し、終了時にパフォーマンスモードをオフに戻します。これにより
ガバナーも起動時の範囲に戻ります。上記の操作と同様にD-Busが有効である必要があります。&lt;/p&gt;

&lt;h2&gt;バックアップ&lt;/h2&gt;
&lt;p&gt;書き込みのたびに、設定の隣に&lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt;というコピーが作成されます。このページには
それらが一覧表示され、コピーと現在のファイルとの差分が示され、&lt;b&gt;選択項目を復元&lt;/b&gt;でコピーを元に戻せます(その前に現在の
ファイルがバックアップされ、パスワードは一度求められます)。そのオプションのチェックを外さない限り、その後ガバナーが再起動されます。&lt;/p&gt;

&lt;h2&gt;サービス&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;の開始、停止、再起動、有効化、無効化を行い、
&lt;code&gt;systemctl status&lt;/code&gt;の出力と&lt;b&gt;ライブジャーナル&lt;/b&gt;(&lt;code&gt;journalctl -u … -f&lt;/code&gt;、直近200行と、
ページ表示中に続くすべての行、最大2000行保持)を表示します。フィルター欄にはテキストまたは正規表現を入力できます
(大文字小文字は区別されません)。&lt;b&gt;追従&lt;/b&gt;のチェックを外すと、スクロールされずに読めます。システムユニットを読むには
ユーザーが&lt;code&gt;wheel&lt;/code&gt;または&lt;code&gt;systemd-journal&lt;/code&gt;グループに属している必要があり、Bazziteではこれが
標準です。各サービス操作ではパスワードが求められます。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;更新を確認&lt;/b&gt;は、インストール済みの&lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; RPMをGitHub上の
&lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;の最新
リリースと比較します(api.github.comへの1回のリクエスト。設定でオフにしない限り起動時にも実行されます)。新しいリリースが
ある場合はオレンジ色で表示され、リリースノートへのリンクが付きます。パッケージはインストールした方法で更新してください:
レイヤー化している場合は&lt;code&gt;rpm-ostree upgrade&lt;/code&gt;経由のCOPR &lt;code&gt;filippor/bazzite&lt;/code&gt;、または
リリースのtarballを使用します。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;診断情報をエクスポート…&lt;/b&gt;は、バグ報告用のテキストファイルを1つ書き出します:アプリ、ガバナー、Bazziteの各バージョン、
CPU/GPU、&lt;code&gt;config.toml&lt;/code&gt;とそのバックアップ、&lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;、直近300行の
ジャーナル、D-Busインターフェース、カーネルコマンドライン、amdgpuカーネルメッセージ、hwmonセンサー、そして生の
&lt;code&gt;gpu_metrics&lt;/code&gt;テーブル(解析済みと16進ダンプの両方)です。issueに添付する前にファイルを確認し、共有したくない
内容は削除してください。&lt;/p&gt;

&lt;h2&gt;設定&lt;/h2&gt;
&lt;p&gt;ユーザーごとに保存されるアプリ設定です。&lt;b&gt;システムトレイ&lt;/b&gt;:GPU負荷、クロック、温度、パフォーマンスモード、
ガバナーの状態をツールチップに表示するトレイアイコンを表示します。左クリックでウィンドウを表示/非表示にし、
メニューではパフォーマンスモードの切り替え(D-Busに到達可能な場合)と終了ができます。&lt;i&gt;ウィンドウを閉じてもアプリは
トレイで実行され続ける&lt;/i&gt;にチェックが入っている場合、ウィンドウの閉じるボタンは終了ではなくトレイに隠します。終了するには
トレイメニューを使用してください。&lt;b&gt;ログイン時に起動&lt;/b&gt;は&lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt;を
書き込みます(システム全体への影響はありません)。&lt;code&gt;--start-in-tray&lt;/code&gt;でトレイに隠した状態での起動も選べます。
BazziteのKDE Plasmaセッションにはネイティブのトレイがあるため、これはそのまま動作します。GNOMEセッションでは
AppIndicator拡張機能が必要です。&lt;b&gt;アラート&lt;/b&gt;はトレイアイコン経由のデスクトップ通知です(トレイがオフの場合のみ
ステータスバーに表示):選択した温度にGPUが達したとき、ガバナー自身のスロットリング温度にGPUが達したとき
(D-Busに到達可能な場合は実行時の値、それ以外は&lt;code&gt;config.toml&lt;/code&gt;内の値)、そしてアプリが実行中であることを
確認した後にガバナーサービスが停止または失敗したときです。温度アラートは閾値を超えるたびに1回発生し、
閾値より5 °C低くなると再度有効になります。同じアラートは最短でも5分間隔で繰り返されます。&lt;/p&gt;

&lt;h2&gt;旧式のttガバナー&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;--backend tt&lt;/code&gt;で起動した場合(または&lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;のみが
読み込まれている場合は自動的に)、アプリは代わりに&lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;を管理します。
このガバナーにはfix-metrics、周波数範囲、D-Bus、GitHubリリースがないため、GPU使用率ページとパフォーマンスページ、
該当するチューニングセクション、&lt;code&gt;down-events&lt;/code&gt;フィールド、更新確認は非表示になり、GPU負荷センサーは
利用不可のままです。&lt;code&gt;[timing]&lt;/code&gt;や&lt;code&gt;[frequency-thresholds]&lt;/code&gt;を含む他のすべては同じように動作します。&lt;/p&gt;

&lt;h2&gt;権限&lt;/h2&gt;
&lt;p&gt;アプリは通常のユーザーとして動作します。root権限が必要で&lt;code&gt;pkexec&lt;/code&gt;を経由するのは4つだけです:
バックアップ、&lt;code&gt;config.toml&lt;/code&gt;の書き込み、&lt;code&gt;systemctl&lt;/code&gt;操作、そしてセーフポイントテスト
(root専用のTestModeインターフェース上の&lt;code&gt;busctl&lt;/code&gt;)です。パスワードはデスクトップのpolkitエージェントが
処理し、アプリがそれを見ることはありません。&lt;/p&gt;

&lt;h2&gt;インストールと更新&lt;/h2&gt;
&lt;p&gt;リリースのtarballには&lt;code&gt;install.sh&lt;/code&gt;が含まれています。これはあなたのユーザーだけにアプリをインストールします
(&lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt;下にPyQt6を含む専用venv、ランチャー
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;、デスクトップエントリ、アイコン)。これによりアプリケーションメニューに
表示されます。新しいリリースから再度実行すると更新され、&lt;code&gt;./install.sh --uninstall&lt;/code&gt;で削除できます。
rpm-ostreeへのレイヤー化は一切行われず、ガバナーの設定が変更されることもありません。&lt;/p&gt;

&lt;h2&gt;リンク&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;このアプリ:&lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;ガバナー(filippor、SMUブランチ):&lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;GNU General Public License v3.0以降の下でライセンスされています。Interフォント(SIL Open Font License)が同梱されています。&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>テレメトリエクスポートではありません:'time'列がありません</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>テレメトリエクスポートではありません:列%1が不足しています</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>パフォーマンスモード</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>セーフポイントの全範囲を使用し、負荷への反応が速くなります。「オン」ボタンと同じです。</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>固定クロック</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency:このゲーム用にGPUクロックを固定します(許容範囲内である必要があります)。</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>クロック範囲</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range:一時的なmin/max。0 = 制限なし。</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>負荷ターゲット</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target:クロックの引き上げ/引き下げを決める下限/上限GPU負荷。</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature:スロットル/回復しきい値(°C)。</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Steam起動オプション</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → ゲーム → プロパティ → 一般 → 起動オプション。行全体を貼り付けてください。</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Heroic / Lutrisラッパー</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic:ゲーム設定 → 詳細設定 → ラッパーコマンド。Lutris:ランナーオプション → コマンドプレフィックス。ラッパー部分のみが必要で、ゲーム本体はランチャーが追加します。</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>ターミナル / スクリプト</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>&lt;program&gt;を実行したいコマンドに置き換えてください。</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>amdgpu hwmonセンサー</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metricsテーブル</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2分</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10分</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30分</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60分</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>ガバナーのパッチ済みgpu_metricsテーブルのaverage_gfx_activity。</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>amdgpu gpu_busy_percent sysfsセンサー。</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>フォールバック:radeontop。</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>テーブル</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>GFXアクティビティ</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>MMアクティビティ</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>GFX温度</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>SoC温度</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>ソケット電力</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>GFX電力</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>CPU電力</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>GFXクロック</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>平均GFXクロック</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>SoCクロック</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>メモリクロック</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>ファブリッククロック</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>スロットル状態</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>CPUコア</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>負荷値を公開するのはcyan-skillfish-governor-smu(fix-metrics)のみです。ttガバナーは公開しないため、これは利用不可のままです。</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>cyan-skillfish-governor-smuをインストールしてください。負荷を測定しgpu_metrics経由で公開します。</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>GPU使用率ページでfix-metricsを有効にし、再起動を伴って適用してください。</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>サービスページでガバナーサービスを開始してください。fix-metricsはオンですが、負荷を公開するものがありません。</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metricsはオンでサービスも実行中ですが、パッチ済みgpu_metricsがマウントされていません。ジャーナルを確認してください。</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>パッチ済みgpu_metricsテーブルに有効な負荷値がありません。サービスページのジャーナルを確認してください。</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1分%2秒</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1秒</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 W(生データ %2)</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 %(無効)</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C(最大)</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>制限なし</translation>
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
        <translation>少なくとも%1個のポイントが必要です。</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHzが2回出現しています。</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHzは1–%2 MHzの範囲外です。</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%2 MHzでの%1 mVは%3–%4 mVの範囲外です。</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%2 MHzでの%1 mVは%4 MHzでの%3 mVより低い値です。周波数が上がるにつれて電圧が下がってはいけません(ガバナーのルール)。</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHzは、多くのボードがハードロックを起こし始める%2 MHzを超えています。</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mVは%2 mVを超えています。温度と電源ユニットに注意してください。</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>なし(自分でGPUに負荷をかけてください)</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHubが%1と応答しました</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>接続できません(%1)</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>予期しないタグです:%1</translation>
    </message>
</context>
</TS>
