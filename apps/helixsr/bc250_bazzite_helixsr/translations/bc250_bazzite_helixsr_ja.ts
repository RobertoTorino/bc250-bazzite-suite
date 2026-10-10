<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="ja">
<context>
    <name>DeployPage</name>
    <message>
        <source>Deploy</source>
        <translation>配置</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>ゲーム</translation>
    </message>
    <message>
        <source>Steam library:</source>
        <translation>Steam ライブラリ：</translation>
    </message>
    <message>
        <source>The folders under steamapps/common of every Steam library on this PC.</source>
        <translation>この PC 上の各 Steam ライブラリの steamapps/common 配下のフォルダーです。</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>参照…</translation>
    </message>
    <message>
        <source>Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix.</source>
        <translation>任意のフォルダー：Steam 以外のゲーム、または Heroic / Lutris / Bottles のプレフィックス。</translation>
    </message>
    <message>
        <source>Folder:</source>
        <translation>フォルダー：</translation>
    </message>
    <message>
        <source>Pick a game above or browse to its folder</source>
        <translation>上でゲームを選ぶか、そのフォルダーを参照してください</translation>
    </message>
    <message>
        <source>Scan</source>
        <translation>スキャン</translation>
    </message>
    <message>
        <source>FSR 3.1 upscaler DLLs in that folder</source>
        <translation>このフォルダー内の FSR 3.1 アップスケーラー DLL</translation>
    </message>
    <message>
        <source>DLL</source>
        <translation>DLL</translation>
    </message>
    <message>
        <source>State</source>
        <translation>状態</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>ネットワークファイル</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>場所</translation>
    </message>
    <message>
        <source>Scan a game folder first.</source>
        <translation>先にゲームフォルダーをスキャンしてください。</translation>
    </message>
    <message>
        <source>How</source>
        <translation>方法</translation>
    </message>
    <message>
        <source>Replace the selected DLL (the game's file is kept as *.original.dll)</source>
        <translation>選択した DLL を置き換える（ゲームのファイルは *.original.dll として保持）</translation>
    </message>
    <message>
        <source>Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)</source>
        <translation>OptiScaler 用のスタンドアロンフォルダー（DLSS / XeSS / FSR 2 ゲーム）</translation>
    </message>
    <message>
        <source>The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: under Engine/Plugins/…/Win64) or &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; above, then choose &lt;b&gt;AMD FSR&lt;/b&gt; in the game. No launch options.</source>
        <translation>HelixSR 本来の導入方法です。ゲームが FSR 3.1 を呼び出すと HelixSR が使われます。上でゲームの &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt;（Unreal: Engine/Plugins/…/Win64 配下）または &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; を選び、ゲーム内で &lt;b&gt;AMD FSR&lt;/b&gt; を選択してください。起動オプションは不要です。</translation>
    </message>
    <message>
        <source>Defaults to &lt;game&gt;/HelixSR</source>
        <translation>既定は &lt;game&gt;/HelixSR</translation>
    </message>
    <message>
        <source>Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this folder with the lines below (Copy puts them on the clipboard).</source>
        <translation>OptiScaler のドキュメントに従ってゲームへインストールし、下の行で OptiScaler.ini からこのフォルダーを参照させます（コピーでクリップボードに入ります）。</translation>
    </message>
    <message>
        <source>Copy OptiScaler.ini lines</source>
        <translation>OptiScaler.ini 行をコピー</translation>
    </message>
    <message>
        <source>Write helixsr.ini with the values of the helixsr.ini page</source>
        <translation>helixsr.ini ページの値で helixsr.ini を書き込む</translation>
    </message>
    <message>
        <source>Unticked: the payload's helixsr.ini is copied if it has one, else none is written and HelixSR uses its defaults.</source>
        <translation>オフの場合：ペイロードに helixsr.ini があればコピーし、なければ何も書き込まず HelixSR の既定値を使用します。</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>HelixSR を削除</translation>
    </message>
    <message>
        <source>Delete HelixSR's files and put the game's original DLL back.</source>
        <translation>HelixSR のファイルを削除し、ゲームの元の DLL を戻します。</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>HelixSR を配置</translation>
    </message>
    <message>
        <source>Copy HelixSR into the game as chosen above.</source>
        <translation>上で選んだ方法で HelixSR をゲームにコピーします。</translation>
    </message>
    <message>
        <source>— pick a game —</source>
        <translation>— ゲームを選択 —</translation>
    </message>
    <message>
        <source>— no Steam library found —</source>
        <translation>— Steam ライブラリが見つかりません —</translation>
    </message>
    <message>
        <source>No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a separate DLL: use the OptiScaler folder below, or check the game's folder.</source>
        <translation>このフォルダーに FSR 3.1 アップスケーラー DLL がありません。ゲームが FSR 3.1 を別 DLL として同梱していない可能性があります。下の OptiScaler フォルダーを使うか、ゲームのフォルダーを確認してください。</translation>
    </message>
    <message>
        <source>{0} DLL(s) found; select the one the game loads (usually the only one, or the shallowest).</source>
        <translation>{0} 個の DLL が見つかりました。ゲームが読み込むものを選択してください（通常は 1 つだけ、または最も浅い場所のもの）。</translation>
    </message>
    <message>
        <source>Import a complete payload first.</source>
        <translation>先に完全なペイロードをインポートしてください。</translation>
    </message>
    <message>
        <source>Write HelixSR under both FidelityFX names into the folder.</source>
        <translation>フォルダーに両方の FidelityFX 名で HelixSR を書き込みます。</translation>
    </message>
    <message>
        <source>Select a DLL in the list.</source>
        <translation>一覧から DLL を選択してください。</translation>
    </message>
    <message>
        <source>Replace {0} with HelixSR.</source>
        <translation>{0} を HelixSR に置き換えます。</translation>
    </message>
    <message>
        <source>Second upscaler:</source>
        <translation>2 つ目のアップスケーラー:</translation>
    </message>
    <message>
        <source>Optional: AMD&apos;s amd_fidelityfx_upscaler_dx12.dll, e.g. with FSR 4</source>
        <translation>任意: AMD の amd_fidelityfx_upscaler_dx12.dll（例: FSR 4 入り）</translation>
    </message>
    <message>
        <source>Copied into the folder as {0}, with UpscalerDll in helixsr.ini pointing at it: OptiScaler&apos;s FFX Upscaler menu then lists its upscalers after HelixSR, and the one you pick runs in that DLL. Empty: HelixSR only.</source>
        <translation>{0} としてフォルダーにコピーされ、helixsr.ini の UpscalerDll がそれを指します。OptiScaler の「FFX Upscaler」メニューでは HelixSR の後にそのアップスケーラーが並び、選んだものはその DLL で動作します。空欄: HelixSR のみ。</translation>
    </message>
</context><context>
    <name>HelpPage</name>
    <message>
        <source>Language:</source>
        <translation>言語：</translation>
    </message>
    <message>
        <source>System default</source>
        <translation>システム既定</translation>
    </message>
    <message>
        <source>Saved for the next start; the interface is built once in the language that is active then.</source>
        <translation>次回起動用に保存されます。インターフェイスは、その時点で有効な言語で一度だけ構築されます。</translation>
    </message>
    <message>
        <source>Takes effect after a restart.</source>
        <translation>再起動後に有効になります。</translation>
    </message>
</context><context>
    <name>IniPage</name>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>HelixSR defaults</source>
        <translation>HelixSR 既定値</translation>
    </message>
    <message>
        <source>Reset every field to the value HelixSR uses when the key is missing.</source>
        <translation>すべての項目を、キーがないときに HelixSR が使う値へリセットします。</translation>
    </message>
    <message>
        <source>Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a game that already has HelixSR.</source>
        <translation>HelixSR が DLL の隣の helixsr.ini から読み取る任意設定です。各キーには既定値があります。これらの値は配置時（そこでチェックされている場合）に書き込まれ、ペイロードの既定値として保存したり、既に HelixSR が入っているゲームへ反映したりできます。</translation>
    </message>
    <message>
        <source>off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, or Sharpness below if it sends none. override: always Sharpness below.</source>
        <translation>off：シャープ化しません（DLSS のネットワークもしません）。game：ゲームの FSR シャープネス、送られない場合は下の Sharpness。override：常に下の Sharpness。</translation>
    </message>
    <message>
        <source>0 = none, 1 = strongest RCAS (FidelityFX scale).</source>
        <translation>0 = なし、1 = 最強の RCAS（FidelityFX スケール）。</translation>
    </message>
    <message>
        <source>Less sharpening on fast-moving pixels</source>
        <translation>高速に動くピクセルのシャープ化を弱める</translation>
    </message>
    <message>
        <source>Motion in output pixels per frame where the reduction starts.</source>
        <translation>軽減が始まる動き量（フレームあたりの出力ピクセル）。</translation>
    </message>
    <message>
        <source>Motion where the reduction is complete.</source>
        <translation>軽減が完了する動き量。</translation>
    </message>
    <message>
        <source>Fraction of sharpening removed at and above MotionLimit.</source>
        <translation>MotionLimit 以上で取り除くシャープ化の割合。</translation>
    </message>
    <message>
        <source>Write helixsr.log next to the DLL</source>
        <translation>DLL の隣に helixsr.log を書き込む</translation>
    </message>
    <message>
        <source>Run the Model E network</source>
        <translation>Model E ネットワークを実行する</translation>
    </message>
    <message>
        <source>Off, or while the network files are missing, a placeholder upscale is used.</source>
        <translation>オフ、またはネットワークファイルがない間は、プレースホルダーのアップスケールを使用します。</translation>
    </message>
    <message>
        <source>auto: the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one.</source>
        <translation>auto：すべてのスケール比で main ネットワーク（行列コアのない GPU では Ultra Performance ネットワークより高速）。nvidia：DLSS の選択に従う。またはどちらかを強制します。</translation>
    </message>
    <message>
        <source>Jitter comes out mirrored</source>
        <translation>ジッターが反転して出力される</translation>
    </message>
    <message>
        <source>Motion vectors come out mirrored</source>
        <translation>モーションベクトルが反転して出力される</translation>
    </message>
    <message>
        <source>Convert render-resolution motion vectors first</source>
        <translation>先にレンダー解像度のモーションベクトルを変換する</translation>
    </message>
    <message>
        <source>Used anyway when the game's vectors include the jitter; otherwise NVIDIA's render-resolution path is faster.</source>
        <translation>ゲームのベクトルにジッターが含まれる場合はいずれにせよ使用されます。それ以外では NVIDIA のレンダー解像度パスの方が高速です。</translation>
    </message>
    <message>
        <source>auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll</source>
        <translation>auto：amd_fidelityfx_dx12.original.dll、それ以外は …framegeneration_dx12.dll</translation>
    </message>
    <message>
        <source>DLL that serves FidelityFX effects other than upscaling (frame generation).</source>
        <translation>アップスケール以外の FidelityFX エフェクト（フレーム生成）を担当する DLL。</translation>
    </message>
    <message>
        <source>empty: HelixSR only</source>
        <translation>empty：HelixSR のみ</translation>
    </message>
    <message>
        <source>A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu. A bare name is looked up next to HelixSR.</source>
        <translation>OptiScaler のメニューで HelixSR の後に並ぶ 2 つ目の FidelityFX アップスケーラー DLL（例：FSR 4 対応の AMD 版）。単なる名前の場合は HelixSR の隣を探します。</translation>
    </message>
    <message>
        <source>Resulting file</source>
        <translation>生成されるファイル</translation>
    </message>
    <message>
        <source>Save as payload default</source>
        <translation>ペイロード既定値として保存</translation>
    </message>
    <message>
        <source>Write this file into the payload folder: it is what Deploy copies when the helixsr.ini tick box there is off, and what this page starts from.</source>
        <translation>このファイルをペイロードフォルダーへ書き込みます。配置ページで helixsr.ini のチェックがオフのときにコピーされ、このページの開始値にもなります。</translation>
    </message>
    <message>
        <source>Push to:</source>
        <translation>反映先：</translation>
    </message>
    <message>
        <source>Write to game</source>
        <translation>ゲームへ書き込み</translation>
    </message>
    <message>
        <source>Overwrite the helixsr.ini of that deployment with this file.</source>
        <translation>その配置の helixsr.ini をこのファイルで上書きします。</translation>
    </message>
</context><context>
    <name>MainWindow</name>
    <message>
        <source>HelixSR payload</source>
        <translation>HelixSR ペイロード</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>ネットワークファイル</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>配置一覧</translation>
    </message>
    <message>
        <source>Steam games</source>
        <translation>Steam ゲーム</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>概要</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>セットアップ</translation>
    </message>
    <message>
        <source>Deploy</source>
        <translation>配置</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
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
        <source>Setup running</source>
        <translation>セットアップ実行中</translation>
    </message>
    <message>
        <source>The HelixSR setup is still running. Cancel it and quit?</source>
        <translation>HelixSR セットアップがまだ実行中です。キャンセルして終了しますか？</translation>
    </message>
    <message>
        <source>Imported</source>
        <translation>インポート済み</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>不足</translation>
    </message>
    <message>
        <source>helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh</source>
        <translation>helixsr-setup.sh で作成される helixsr_weights.bin と helixsr_kernels.pak</translation>
    </message>
    <message>
        <source>HelixSR in place / known deployments</source>
        <translation>導入済み HelixSR / 既知の配置</translation>
    </message>
    <message>
        <source>No Steam library found</source>
        <translation>Steam ライブラリが見つかりません</translation>
    </message>
    <message>
        <source>Extracted HelixSR release folder</source>
        <translation>展開済み HelixSR リリースフォルダー</translation>
    </message>
    <message>
        <source>HelixSR release zip</source>
        <translation>HelixSR リリース zip</translation>
    </message>
    <message>
        <source>Zip archives (*.zip)</source>
        <translation>Zip アーカイブ（*.zip）</translation>
    </message>
    <message>
        <source>Import failed</source>
        <translation>インポートに失敗しました</translation>
    </message>
    <message>
        <source>Imported {0} file(s): {1}.</source>
        <translation>{0} 個のファイルをインポートしました：{1}。</translation>
    </message>
    <message>
        <source>

Still missing: {0}. Run helixsr-setup.sh in the extracted release folder, then import that folder.</source>
        <translation>

まだ不足しています：{0}。展開したリリースフォルダーで helixsr-setup.sh を実行してから、そのフォルダーをインポートしてください。</translation>
    </message>
    <message>
        <source>Payload incomplete</source>
        <translation>ペイロードが不完全です</translation>
    </message>
    <message>
        <source>Could not write</source>
        <translation>書き込めませんでした</translation>
    </message>
    <message>
        <source>Saved {0}</source>
        <translation>{0} を保存しました</translation>
    </message>
    <message>
        <source>Game folder</source>
        <translation>ゲームフォルダー</translation>
    </message>
    <message>
        <source>Folder for HelixSR (OptiScaler)</source>
        <translation>HelixSR 用フォルダー（OptiScaler）</translation>
    </message>
    <message>
        <source>{0} is not a folder.</source>
        <translation>{0} はフォルダーではありません。</translation>
    </message>
    <message>
        <source>Could not scan {0}: {1}</source>
        <translation>{0} をスキャンできませんでした：{1}</translation>
    </message>
    <message>
        <source>The helixsr.ini page has invalid values; fix them or untick writing the ini.</source>
        <translation>helixsr.ini ページに無効な値があります。修正するか、ini の書き込みチェックを外してください。</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>HelixSR を配置</translation>
    </message>
    <message>
        <source>Rename
{path}
to {original} and put HelixSR in its place?</source>
        <translation>名前を変更：
{path}
→ {original}
その場所へ HelixSR を配置しますか？</translation>
    </message>
    <message>
        <source>Deploy failed</source>
        <translation>配置に失敗しました</translation>
    </message>
    <message>
        <source>HelixSR deployed: {0} file(s) written to {1}</source>
        <translation>HelixSR を配置しました：{0} 個のファイルを {1} に書き込みました</translation>
    </message>
    <message>
        <source>HelixSR folder ready</source>
        <translation>HelixSR フォルダーの準備完了</translation>
    </message>
    <message>
        <source>HelixSR is in
{folder}

Now point OptiScaler at it: the OptiScaler.ini lines on the Deploy page (Copy button) go into the game's OptiScaler.ini.</source>
        <translation>HelixSR は
{folder}

にあります。次に OptiScaler から参照させます。配置ページの OptiScaler.ini 行（コピーボタン）をゲームの OptiScaler.ini に入れてください。</translation>
    </message>
    <message>
        <source>Delete HelixSR's files next to
{0}
and rename the game's .original.dll back?</source>
        <translation>次の隣にある HelixSR のファイルを削除し、
{0}
ゲームの .original.dll を元の名前に戻しますか？</translation>
    </message>
    <message>
        <source>Delete HelixSR's files in
{0}?</source>
        <translation>次の場所にある HelixSR のファイルを削除しますか？
{0}？</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>HelixSR を削除</translation>
    </message>
    <message>
        <source>Remove failed</source>
        <translation>削除に失敗しました</translation>
    </message>
    <message>
        <source>Removed {0} file(s); HelixSR is gone from {1}</source>
        <translation>{0} 個のファイルを削除しました。{1} から HelixSR は削除されました</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>フォルダーなし</translation>
    </message>
    <message>
        <source>{0} does not exist any more.</source>
        <translation>{0} はもう存在しません。</translation>
    </message>
    <message>
        <source>Wrote {0}</source>
        <translation>{0} を書き込みました</translation>
    </message>
    <message>
        <source>Update check: {0}</source>
        <translation>更新確認：{0}</translation>
    </message>
    <message>
        <source>HelixSR {version} is out ({published}); the payload has {installed}. Get HelixSR… updates it.</source>
        <translation>HelixSR {version} が公開されています（{published}）。ペイロードは {installed} です。「HelixSR を取得…」で更新できます。</translation>
    </message>
    <message>
        <source>Latest HelixSR release: {version} ({published}).</source>
        <translation>最新の HelixSR リリース：{version}（{published}）。</translation>
    </message>
    <message>
        <source>{app} {version} is available: {url}</source>
        <translation>{app} {version} が利用可能です：{url}</translation>
    </message>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} は存在しません。</translation>
    </message>
    <message>
        <source>Payload is current</source>
        <translation>ペイロードは最新です</translation>
    </message>
    <message>
        <source>The payload already has HelixSR {version} with its network files. Download and build again anyway?</source>
        <translation>ペイロードには既に HelixSR {version} とネットワークファイルがあります。それでも再度ダウンロードしてビルドしますか？</translation>
    </message>
    <message>
        <source>(unknown version)</source>
        <translation>（バージョン不明）</translation>
    </message>
    <message>
        <source>Nothing to do: the payload already has HelixSR {version} with its network files. Use Deploy to install it into a game.</source>
        <translation>実行することはありません。ペイロードには既に HelixSR {version} とネットワークファイルがあります。ゲームへ導入するには配置を使ってください。</translation>
    </message>
    <message>
        <source>Payload is already current.</source>
        <translation>ペイロードは既に最新です。</translation>
    </message>
    <message>
        <source>HelixSR setup running…</source>
        <translation>HelixSR セットアップを実行中…</translation>
    </message>
    <message>
        <source>Cancelling…</source>
        <translation>キャンセル中…</translation>
    </message>
    <message>
        <source>HelixSR setup failed: {0}</source>
        <translation>HelixSR セットアップに失敗しました：{0}</translation>
    </message>
    <message>
        <source>HelixSR setup failed</source>
        <translation>HelixSR セットアップに失敗しました</translation>
    </message>
    <message>
        <source>{message} ({seconds:.0f} s)</source>
        <translation>{message}（{seconds:.0f} s）</translation>
    </message>
    <message>
        <source>NVIDIA {0} (310.7.0)</source>
        <translation>NVIDIA {0}（310.7.0）</translation>
    </message>
    <message>
        <source>No Steam library found on this PC.</source>
        <translation>この PC に Steam ライブラリが見つかりません。</translation>
    </message>
    <message>
        <source>Looking for {dll} in {libraries} …</source>
        <translation>{libraries} で {dll} を検索中…</translation>
    </message>
    <message>
        <source>Copied to the clipboard</source>
        <translation>クリップボードにコピーしました</translation>
    </message>
    <message>
        <source>Could not open</source>
        <translation>開けませんでした</translation>
    </message>
    <message>
        <source>Second FidelityFX upscaler DLL (e.g. AMD&apos;s with FSR 4)</source>
        <translation>2 つ目の FidelityFX アップスケーラー DLL（例: AMD の FSR 4 入り）</translation>
    </message>
    <message>
        <source>DLL files (*.dll)</source>
        <translation>DLL ファイル (*.dll)</translation>
    </message>
    <message>
        <source>The second upscaler is in the folder as {0}; OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR.</source>
        <translation>2 つ目のアップスケーラーは {0} としてフォルダーにあります。OptiScaler の「FFX Upscaler」メニューでは HelixSR の後に並びます。</translation>
    </message>
</context><context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>概要</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>更新</translation>
    </message>
    <message>
        <source>HelixSR payload</source>
        <translation>HelixSR ペイロード</translation>
    </message>
    <message>
        <source>Upscaler DLL</source>
        <translation>アップスケーラー DLL</translation>
    </message>
    <message>
        <source>Weights</source>
        <translation>Weights</translation>
    </message>
    <message>
        <source>Kernels</source>
        <translation>Kernels</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>The Setup page downloads a HelixSR release and builds its network files (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) from NVIDIA's DLSS DLL for you. Or do it by hand: extract the release, run its &lt;code&gt;helixsr-setup.sh&lt;/code&gt; there once and import that folder here. The network files are NVIDIA's property: they stay on this PC and are never part of this app.</source>
        <translation>セットアップページでは HelixSR リリースをダウンロードし、NVIDIA の DLSS DLL からネットワークファイル（&lt;code&gt;{weights}&lt;/code&gt;、&lt;code&gt;{kernels}&lt;/code&gt;）をビルドします。手動でもできます。リリースを展開し、その場所で &lt;code&gt;helixsr-setup.sh&lt;/code&gt; を一度実行してから、ここでそのフォルダーをインポートしてください。ネットワークファイルは NVIDIA の所有物です。この PC に残り、このアプリの一部にはなりません。</translation>
    </message>
    <message>
        <source>Get HelixSR…</source>
        <translation>HelixSR を取得…</translation>
    </message>
    <message>
        <source>Open the Setup page: download the latest release and build the network files in one go.</source>
        <translation>セットアップページを開き、最新リリースのダウンロードとネットワークファイルのビルドを一度に行います。</translation>
    </message>
    <message>
        <source>Import release folder…</source>
        <translation>リリースフォルダーをインポート…</translation>
    </message>
    <message>
        <source>The folder the HelixSR zip was extracted to, after running helixsr-setup.sh there.</source>
        <translation>HelixSR zip を展開し、そこで helixsr-setup.sh を実行した後のフォルダー。</translation>
    </message>
    <message>
        <source>Import release zip…</source>
        <translation>リリース zip をインポート…</translation>
    </message>
    <message>
        <source>The release zip as downloaded; the network files still have to be built and imported from the extracted folder afterwards.</source>
        <translation>ダウンロードしたままのリリース zip。ネットワークファイルは後でビルドし、展開したフォルダーからインポートする必要があります。</translation>
    </message>
    <message>
        <source>Open payload folder</source>
        <translation>ペイロードフォルダーを開く</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>配置一覧</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>ゲーム</translation>
    </message>
    <message>
        <source>Mode</source>
        <translation>モード</translation>
    </message>
    <message>
        <source>State</source>
        <translation>状態</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>Deployed</source>
        <translation>配置済み</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>場所</translation>
    </message>
    <message>
        <source>Nothing deployed yet. Use the Deploy page.</source>
        <translation>まだ何も配置されていません。配置ページを使ってください。</translation>
    </message>
    <message>
        <source>Open folder</source>
        <translation>フォルダーを開く</translation>
    </message>
    <message>
        <source>Forget entry</source>
        <translation>項目を忘れる</translation>
    </message>
    <message>
        <source>Drop the entry from this list without touching the game. For deployments whose files are already gone.</source>
        <translation>ゲームには触れず、この一覧から項目を削除します。ファイルが既に消えている配置向けです。</translation>
    </message>
    <message>
        <source>Remove HelixSR from game</source>
        <translation>ゲームから HelixSR を削除</translation>
    </message>
    <message>
        <source>Delete HelixSR's files there and put the game's original DLL back.</source>
        <translation>その場所の HelixSR ファイルを削除し、ゲームの元の DLL を戻します。</translation>
    </message>
    <message>
        <source>Present</source>
        <translation>あり</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>不足</translation>
    </message>
    <message>
        <source>Default</source>
        <translation>既定</translation>
    </message>
    <message>
        <source>No helixsr.ini in the payload: HelixSR's defaults are used as the template.</source>
        <translation>ペイロードに helixsr.ini がありません。HelixSR の既定値をテンプレートとして使用します。</translation>
    </message>
    <message>
        <source>HelixSR (version unknown)</source>
        <translation>HelixSR（バージョン不明）</translation>
    </message>
    <message>
        <source>{version} ready to deploy.</source>
        <translation>{version} は配置可能です。</translation>
    </message>
    <message>
        <source>{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted release and import the folder again.</source>
        <translation>{version} はインポート済みですが、ネットワークファイルが不足しています。展開したリリースで helixsr-setup.sh を実行し、フォルダーを再度インポートしてください。</translation>
    </message>
    <message>
        <source>No payload yet: import an extracted HelixSR release.</source>
        <translation>ペイロードがまだありません。展開した HelixSR リリースをインポートしてください。</translation>
    </message>
    <message>
        <source>Folder: {0}</source>
        <translation>フォルダー：{0}</translation>
    </message>
    <message>
        <source>Replaced DLL</source>
        <translation>置換済み DLL</translation>
    </message>
    <message>
        <source>OptiScaler folder</source>
        <translation>OptiScaler フォルダー</translation>
    </message>
</context><context>
    <name>SetupPage</name>
    <message>
        <source>Unknown</source>
        <translation>不明</translation>
    </message>
    <message>
        <source>Update</source>
        <translation>更新あり</translation>
    </message>
    <message>
        <source>Up to date</source>
        <translation>最新</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>セットアップ</translation>
    </message>
    <message>
        <source>One click does what the HelixSR README asks you to do by hand: download the release, fetch NVIDIA's DLSS DLL, Microsoft's shader compiler and (on Bazzite) a portable Python in parallel, run &lt;code&gt;helixsr-setup.sh&lt;/code&gt; and import the result as the payload. The DLSS DLL is used once and deleted; the network files it produces are NVIDIA's property and stay on this PC.</source>
        <translation>ワンクリックで HelixSR README の手動手順を実行します。リリースをダウンロードし、NVIDIA の DLSS DLL、Microsoft の shader compiler、（Bazzite では）ポータブル Python を並行取得し、&lt;code&gt;helixsr-setup.sh&lt;/code&gt; を実行して結果をペイロードとしてインポートします。DLSS DLL は一度だけ使われて削除されます。生成されるネットワークファイルは NVIDIA の所有物で、この PC に残ります。</translation>
    </message>
    <message>
        <source>Releases</source>
        <translation>リリース</translation>
    </message>
    <message>
        <source>Not checked</source>
        <translation>未確認</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>This app</source>
        <translation>このアプリ</translation>
    </message>
    <message>
        <source>Check now</source>
        <translation>今すぐ確認</translation>
    </message>
    <message>
        <source>Ask GitHub for the latest HelixSR release and the latest release of this app</source>
        <translation>GitHub に最新の HelixSR リリースとこのアプリの最新リリースを問い合わせます</translation>
    </message>
    <message>
        <source>Check at start</source>
        <translation>起動時に確認</translation>
    </message>
    <message>
        <source>Look up both releases every time the app starts (one small request each)</source>
        <translation>アプリ起動時に両方のリリースを確認します（それぞれ小さなリクエスト 1 回）</translation>
    </message>
    <message>
        <source>Get HelixSR and build the network files</source>
        <translation>HelixSR を取得してネットワークファイルをビルド</translation>
    </message>
    <message>
        <source>Use a {0} already on this PC:</source>
        <translation>この PC 上の既存の {0} を使う：</translation>
    </message>
    <message>
        <source>Skips the 59 MB download from NVIDIA's GitHub. Only DLSS 310.7.0 (the exact build HelixSR pins) is accepted; Find looks through the Steam libraries for one.</source>
        <translation>NVIDIA の GitHub からの 59 MB ダウンロードを省略します。DLSS 310.7.0（HelixSR が固定している正確なビルド）のみ受け付けます。「Steam で検索」は Steam ライブラリ内を探します。</translation>
    </message>
    <message>
        <source>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</source>
        <translation>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>参照…</translation>
    </message>
    <message>
        <source>Find in Steam</source>
        <translation>Steam で検索</translation>
    </message>
    <message>
        <source>Scan the Steam libraries for a DLSS 310.7.0 DLL (checks each file's checksum)</source>
        <translation>Steam ライブラリで DLSS 310.7.0 DLL を探します（各ファイルのチェックサムを確認）</translation>
    </message>
    <message>
        <source>Download and build</source>
        <translation>ダウンロードしてビルド</translation>
    </message>
    <message>
        <source>Download the latest release and everything the setup needs, run helixsr-setup.sh and import the result</source>
        <translation>最新リリースとセットアップに必要なものをすべてダウンロードし、helixsr-setup.sh を実行して結果をインポートします</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation>キャンセル</translation>
    </message>
    <message>
        <source>Import built release</source>
        <translation>ビルド済みリリースをインポート</translation>
    </message>
    <message>
        <source>Import the network files built in the work folder into the payload</source>
        <translation>作業フォルダーでビルドされたネットワークファイルをペイロードへインポートします</translation>
    </message>
    <message>
        <source>Open work folder</source>
        <translation>作業フォルダーを開く</translation>
    </message>
    <message>
        <source>Idle</source>
        <translation>待機中</translation>
    </message>
    <message>
        <source>Output of the downloads and of helixsr-setup.sh</source>
        <translation>ダウンロードと helixsr-setup.sh の出力</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</source>
        <translation> — &lt;a href=&quot;{url}&quot;&gt;{name}&lt;/a&gt;（{size}）</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;release page&lt;/a&gt;</source>
        <translation> — &lt;a href=&quot;{url}&quot;&gt;リリースページ&lt;/a&gt;</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>確認中…</translation>
    </message>
    <message>
        <source>Found {0} matching {1}: {2}</source>
        <translation>{1} に一致する {0} が見つかりました：{2}</translation>
    </message>
    <message>
        <source>No DLSS 310.7.0 {0} found in the Steam libraries; it will be downloaded.</source>
        <translation>Steam ライブラリに DLSS 310.7.0 {0} が見つかりませんでした。ダウンロードします。</translation>
    </message>
    <message>
        <source>{done} / {total}  (%p%)</source>
        <translation>{done} / {total}  (%p%)</translation>
    </message>
    <message>
        <source>Downloading: {0}</source>
        <translation>ダウンロード中：{0}</translation>
    </message>
    <message>
        <source>{0} — {1}:{2:02d} elapsed</source>
        <translation>{0} — 経過 {1}:{2:02d}</translation>
    </message>
    <message>
        <source>{0} — took {1}:{2:02d}</source>
        <translation>{0} — 所要時間 {1}:{2:02d}</translation>
    </message>
</context><context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>不明</translation>
    </message>
</context><context>
    <name>acquire</name>
    <message>
        <source>GitHub answered {0}</source>
        <translation>GitHub が {0} を返しました</translation>
    </message>
    <message>
        <source>no connection ({0})</source>
        <translation>接続なし（{0}）</translation>
    </message>
    <message>
        <source>unexpected tag {0}</source>
        <translation>予期しないタグ {0}</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>未インストール</translation>
    </message>
    <message>
        <source>{0} (latest: unknown, {1})</source>
        <translation>{0}（最新版：不明、{1}）</translation>
    </message>
    <message>
        <source>{0} (latest: unknown)</source>
        <translation>{0}（最新版：不明）</translation>
    </message>
    <message>
        <source>{0} → {1} available ({2})</source>
        <translation>{0} → {1} が利用可能（{2}）</translation>
    </message>
    <message>
        <source>{0} (up to date, released {1})</source>
        <translation>{0}（最新、リリース日 {1}）</translation>
    </message>
    <message>
        <source>{0}; latest release {1} ({2})</source>
        <translation>{0}；最新リリース {1}（{2}）</translation>
    </message>
    <message>
        <source>{0}: server answered {1} for {2}</source>
        <translation>{0}：{2} に対してサーバーが {1} を返しました</translation>
    </message>
    <message>
        <source>{0}: download failed ({1})</source>
        <translation>{0}：ダウンロードに失敗しました（{1}）</translation>
    </message>
    <message>
        <source>{0}: checksum mismatch, the download is not the file HelixSR expects. Nothing was kept.</source>
        <translation>{0}：チェックサムが一致しません。ダウンロードされたものは HelixSR が想定するファイルではありません。何も保持しませんでした。</translation>
    </message>
    <message>
        <source>No {0} in {1}: not a HelixSR release.</source>
        <translation>{1} に {0} がありません。HelixSR リリースではありません。</translation>
    </message>
    <message>
        <source>{0} contains an unsafe path: {1}</source>
        <translation>{0} に安全でないパスが含まれています：{1}</translation>
    </message>
    <message>
        <source>the shader compiler archive has no bin/x64 folder</source>
        <translation>shader compiler アーカイブに bin/x64 フォルダーがありません</translation>
    </message>
    <message>
        <source>unsafe path in {0}: {1}</source>
        <translation>{0} 内の安全でないパス：{1}</translation>
    </message>
    <message>
        <source>the portable Python archive did not produce python/bin/python3</source>
        <translation>ポータブル Python アーカイブから python/bin/python3 が作成されませんでした</translation>
    </message>
    <message>
        <source>Cancelled.</source>
        <translation>キャンセルしました。</translation>
    </message>
    <message>
        <source>HelixSR {0} is built in {1}</source>
        <translation>HelixSR {0} は {1} にビルドされました</translation>
    </message>
    <message>
        <source>Could not look up the latest HelixSR release: {0}</source>
        <translation>最新の HelixSR リリースを確認できませんでした：{0}</translation>
    </message>
    <message>
        <source>HelixSR {0} has no zip to download; see {1}</source>
        <translation>HelixSR {0} にはダウンロードできる zip がありません。{1} を参照してください</translation>
    </message>
    <message>
        <source>Downloading HelixSR {0}</source>
        <translation>HelixSR {0} をダウンロード中</translation>
    </message>
    <message>
        <source>Using the already downloaded {0}</source>
        <translation>ダウンロード済みの {0} を使用中</translation>
    </message>
    <message>
        <source>Downloading {0}</source>
        <translation>{0} をダウンロード中</translation>
    </message>
    <message>
        <source>Extracted to {0}</source>
        <translation>{0} に展開しました</translation>
    </message>
    <message>
        <source>The release has no {0}.</source>
        <translation>このリリースには {0} がありません。</translation>
    </message>
    <message>
        <source>Could not read the pinned source(s) for {0} from the setup scripts; the script will download them itself.</source>
        <translation>セットアップスクリプトから {0} の固定ソースを読み取れませんでした。スクリプト自身がダウンロードします。</translation>
    </message>
    <message>
        <source>Downloading {0} in parallel</source>
        <translation>{0} を並行ダウンロード中</translation>
    </message>
    <message>
        <source>Shader compiler unpacked to {0}</source>
        <translation>shader compiler を {0} に展開しました</translation>
    </message>
    <message>
        <source>Portable Python unpacked to {0}</source>
        <translation>ポータブル Python を {0} に展開しました</translation>
    </message>
    <message>
        <source>Building the network files (about 5-6 minutes on a BC-250)</source>
        <translation>ネットワークファイルをビルド中（BC-250 で約 5〜6 分）</translation>
    </message>
    <message>
        <source>Could not start {0}: {1}</source>
        <translation>{0} を開始できませんでした：{1}</translation>
    </message>
    <message>
        <source>Deleted the downloaded {0}</source>
        <translation>ダウンロードした {0} を削除しました</translation>
    </message>
    <message>
        <source>{0} exited with code {1}; see the output above.</source>
        <translation>{0} はコード {1} で終了しました。上の出力を確認してください。</translation>
    </message>
    <message>
        <source>The setup finished but did not produce {0}</source>
        <translation>セットアップは完了しましたが、{0} が作成されませんでした</translation>
    </message>
    <message>
        <source>no release tagged {0} yet</source>
        <translation>{0} のタグが付いたリリースはまだありません</translation>
    </message>
</context><context>
    <name>backend</name>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} は存在しません。</translation>
    </message>
    <message>
        <source>{0} is not a zip archive or a folder.</source>
        <translation>{0} は zip アーカイブでもフォルダーでもありません。</translation>
    </message>
    <message>
        <source>No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release zip itself).</source>
        <translation>{1} に {0} が見つかりません。HelixSR リリースの展開先フォルダー（またはリリース zip 自体）を選択してください。</translation>
    </message>
    <message>
        <source>HelixSR deployed</source>
        <translation>HelixSR 配置済み</translation>
    </message>
    <message>
        <source>HelixSR deployed (other build)</source>
        <translation>HelixSR 配置済み（別ビルド）</translation>
    </message>
    <message>
        <source>HelixSR (no original kept)</source>
        <translation>HelixSR（元ファイルなし）</translation>
    </message>
    <message>
        <source>Game's own DLL</source>
        <translation>ゲーム本来の DLL</translation>
    </message>
    <message>
        <source>The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running its helixsr-setup.sh.</source>
        <translation>ペイロードが不完全です。不足：{0}。展開した HelixSR リリースで helixsr-setup.sh を実行してからインポートしてください。</translation>
    </message>
    <message>
        <source>{0} is not an FSR 3.1 upscaler DLL ({1}).</source>
        <translation>{0} は FSR 3.1 アップスケーラー DLL ではありません（{1}）。</translation>
    </message>
    <message>
        <source>{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.</source>
        <translation>{0} は HelixSR ではありません（隣に {1} がなく、ペイロードとも異なります）。何も変更していません。</translation>
    </message>
    <message>
        <source>{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone folder. Use Remove on the DLL instead.</source>
        <translation>{0} にはゲーム本来の {1} が入っています（{2} があります）。これは置換済み DLL であり、スタンドアロンフォルダーではありません。代わりに DLL に対して削除を使ってください。</translation>
    </message>
    <message>
        <source>{0} is not HelixSR; nothing was changed.</source>
        <translation>{0} は HelixSR ではありません。何も変更していません。</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>フォルダーなし</translation>
    </message>
    <message>
        <source>Removed</source>
        <translation>削除済み</translation>
    </message>
    <message>
        <source>In place</source>
        <translation>配置済み</translation>
    </message>
    <message>
        <source>Network files missing</source>
        <translation>ネットワークファイル不足</translation>
    </message>
    <message>
        <source>DLL missing</source>
        <translation>DLL 不足</translation>
    </message>
    <message>
        <source>Only the backup is left</source>
        <translation>バックアップのみ</translation>
    </message>
    <message>
        <source>Original restored</source>
        <translation>元に復元済み</translation>
    </message>
    <message>
        <source>Older build</source>
        <translation>旧ビルド</translation>
    </message>
    <message>
        <source>{0} is HelixSR itself; pick another FidelityFX upscaler DLL, e.g. AMD&apos;s with FSR 4.</source>
        <translation>{0} は HelixSR そのものです。別の FidelityFX アップスケーラー DLL（例: AMD の FSR 4 入り）を選んでください。</translation>
    </message>
</context><context>
    <name>help</name>
    <message>
        <source>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</source>
        <translation>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Installs &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, the FSR/DLSS hybrid upscaler for Direct3D 12 tuned for the &lt;b&gt;AMD BC-250&lt;/b&gt;, into games on &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR runs NVIDIA's DLSS Model E network as plain compute shaders on an AMD GPU; games talk to it as FSR 3.1. This app only copies, renames and deletes files inside the game folders you point it at and inside its own payload folder. Nothing on the system is touched, no root is needed.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;a href=&quot;{helixsr_url}&quot;&gt;HelixSR&lt;/a&gt;（&lt;b&gt;AMD BC-250&lt;/b&gt; 向けに調整された Direct3D 12 用 FSR/DLSS ハイブリッドアップスケーラー）を、&lt;b&gt;Bazzite&lt;/b&gt; 上のゲームへ導入します。HelixSR は NVIDIA の DLSS Model E ネットワークを AMD GPU 上の通常の compute shader として実行し、ゲームからは FSR 3.1 として見えます。このアプリは、指定されたゲームフォルダー内と自身のペイロードフォルダー内でファイルをコピー、名前変更、削除するだけです。システムには触れず、root も不要です。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;How HelixSR is installed (what the app does for you)&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;HelixSR の導入方法（アプリが行うこと）&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;The game's FSR 3.1 upscaler DLL, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (Unreal Engine games keep it under &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) or &lt;code&gt;{helixsr_dll}&lt;/code&gt;, is renamed to &lt;code&gt;*.original.dll&lt;/code&gt;. That file is the backup &lt;i&gt;and&lt;/i&gt; is still used: HelixSR forwards frame generation and other FidelityFX effects to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;ゲームの FSR 3.1 アップスケーラー DLL、&lt;code&gt;{upscaler_dll}&lt;/code&gt;（Unreal Engine ゲームでは &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt; 配下）または &lt;code&gt;{helixsr_dll}&lt;/code&gt; を、&lt;code&gt;*.original.dll&lt;/code&gt; に名前変更します。このファイルはバックアップであり、&lt;i&gt;かつ&lt;/i&gt;引き続き使用されます。HelixSR はフレーム生成やその他の FidelityFX エフェクトをそこへ転送します。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR's &lt;code&gt;{helixsr_dll}&lt;/code&gt; is copied in under the game's original file name, together with &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR の &lt;code&gt;{helixsr_dll}&lt;/code&gt; をゲームの元のファイル名でコピーし、&lt;code&gt;{weights}&lt;/code&gt; と &lt;code&gt;{kernels}&lt;/code&gt; も一緒に配置します。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Optionally a &lt;code&gt;{ini}&lt;/code&gt; is written next to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;任意で、その隣に &lt;code&gt;{ini}&lt;/code&gt; を書き込みます。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Start the game normally and select &lt;b&gt;AMD FSR&lt;/b&gt; as the upscaler. No launch options are needed.&lt;/li&gt;</source>
        <translation>&lt;li&gt;ゲームを通常どおり起動し、アップスケーラーとして &lt;b&gt;AMD FSR&lt;/b&gt; を選択します。起動オプションは不要です。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Remove&lt;/b&gt; undoes it: HelixSR's files are deleted and the &lt;code&gt;.original.dll&lt;/code&gt; gets its name back.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;削除&lt;/b&gt;で元に戻します。HelixSR のファイルを削除し、&lt;code&gt;.original.dll&lt;/code&gt; を元の名前に戻します。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Setup&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;セットアップ&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Download and build&lt;/b&gt; does the HelixSR README's setup for you: it fetches the latest release zip from &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), reads the exact sources and SHA-256 sums the release's own setup scripts pin, downloads what this PC still needs &lt;i&gt;in parallel&lt;/i&gt; and verifies each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable Python (67 MB, numpy is added by the script). Then it runs &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; with its output on the page: the script builds &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutes, the shader compiler runs through your Proton) and the result is imported as the payload. The DLSS DLL is deleted afterwards. Everything is downloaded into &lt;code&gt;{work_dir}&lt;/code&gt; and &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (the script's own cache, reused next time).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;ダウンロードしてビルド&lt;/b&gt;は、HelixSR README のセットアップを代わりに実行します。&lt;a href=&quot;{releases_url}&quot;&gt;GitHub&lt;/a&gt; から最新リリース zip（2 MB）を取得し、リリース付属のセットアップスクリプトが固定している正確なソースと SHA-256 を読み取り、この PC にまだ必要なものを&lt;i&gt;並行して&lt;/i&gt;ダウンロードして各ファイルを検証します。NVIDIA の DLSS 310.7.0 DLL（59 MB、NVIDIA の GitHub から NVIDIA のライセンスの下で取得）、Microsoft の DirectX Shader Compiler（25 MB）、Bazzite のような読み取り専用システムではポータブル Python（67 MB、numpy はスクリプトが追加）です。次にページへ出力を表示しながら &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; を実行します。スクリプトは &lt;code&gt;{weights}&lt;/code&gt; と &lt;code&gt;{kernels}&lt;/code&gt; をビルドし（5〜6 分、shader compiler は Proton 経由で実行）、結果をペイロードとしてインポートします。DLSS DLL は後で削除されます。すべて &lt;code&gt;{work_dir}&lt;/code&gt; と &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt;（スクリプト自身のキャッシュ。次回再利用）へダウンロードされます。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;If a game you own already ships DLSS 310.7.0, tick &lt;b&gt;Use a nvngx_dlss.dll already on this PC&lt;/b&gt; and let &lt;b&gt;Find in Steam&lt;/b&gt; locate it (checksums are compared, only the exact build HelixSR pins is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.&lt;/p&gt;</source>
        <translation>&lt;p&gt;所有しているゲームが既に DLSS 310.7.0 を同梱している場合は、&lt;b&gt;この PC 上の既存の nvngx_dlss.dll を使う&lt;/b&gt;にチェックし、&lt;b&gt;Steam で検索&lt;/b&gt;で見つけさせてください（チェックサムを比較し、HelixSR が固定している正確なビルドだけを提示します）。これで NVIDIA からのダウンロードを省略できます。時間がかかるのはダウンロードではなくビルドです。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; compares the payload with the latest HelixSR release and this app with its latest release on GitHub, at start (one small request each, can be turned off) or with &lt;b&gt;Check now&lt;/b&gt;. A newer HelixSR shows on the Overview too; &lt;b&gt;Download and build&lt;/b&gt; again updates the payload, then deploy again per game (the Overview marks them &lt;i&gt;Older build&lt;/i&gt;).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;リリース&lt;/b&gt;では、起動時（それぞれ小さなリクエスト 1 回。オフにできます）または &lt;b&gt;今すぐ確認&lt;/b&gt;で、ペイロードと最新 HelixSR リリース、このアプリと GitHub 上の最新リリースを比較します。新しい HelixSR は概要にも表示されます。もう一度 &lt;b&gt;ダウンロードしてビルド&lt;/b&gt;するとペイロードが更新されるので、ゲームごとに再配置してください（概要では &lt;i&gt;旧ビルド&lt;/i&gt; と表示されます）。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Overview&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;概要&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The &lt;b&gt;payload&lt;/b&gt; is your copy of a HelixSR release: the DLL, the two network files and the ini, kept in &lt;code&gt;{payload_dir}&lt;/code&gt;. It is filled by the Setup page, or by hand: extract a release, run &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in that folder once and &lt;b&gt;Import release folder…&lt;/b&gt;. The network files contain NVIDIA's network: they are for your own PC and are never part of this app or its releases. &lt;b&gt;Import release zip…&lt;/b&gt; takes the download as is, but the network files are still missing until the setup has run and the folder is imported.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;ペイロード&lt;/b&gt;は HelixSR リリースの手元のコピーです。DLL、2 つのネットワークファイル、ini を含み、&lt;code&gt;{payload_dir}&lt;/code&gt; に保存されます。セットアップページで作成するか、手動でリリースを展開し、そのフォルダーで &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; を一度実行してから &lt;b&gt;リリースフォルダーをインポート…&lt;/b&gt; します。ネットワークファイルには NVIDIA のネットワークが含まれます。自分の PC 用であり、このアプリやそのリリースの一部には決してなりません。&lt;b&gt;リリース zip をインポート…&lt;/b&gt;はダウンロードしたものをそのまま取り込みますが、セットアップを実行してフォルダーをインポートするまではネットワークファイルが不足したままです。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Deployments&lt;/b&gt; lists every place the app put HelixSR, with its live state: &lt;i&gt;In place&lt;/i&gt;, &lt;i&gt;Older build&lt;/i&gt; (the payload has been updated since; deploy again to update the game), &lt;i&gt;Network files missing&lt;/i&gt;, &lt;i&gt;Original restored&lt;/i&gt; or &lt;i&gt;Removed&lt;/i&gt;. The list is kept in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Forget entry&lt;/b&gt; drops a line without touching the game.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;配置一覧&lt;/b&gt;には、アプリが HelixSR を置いたすべての場所と現在の状態（&lt;i&gt;配置済み&lt;/i&gt;、&lt;i&gt;旧ビルド&lt;/i&gt;（その後ペイロードが更新されています。ゲームを更新するには再配置してください）、&lt;i&gt;ネットワークファイル不足&lt;/i&gt;、&lt;i&gt;元に復元済み&lt;/i&gt;、&lt;i&gt;削除済み&lt;/i&gt;）が表示されます。一覧は &lt;code&gt;{deployments_file}&lt;/code&gt; に保存されます。&lt;b&gt;項目を忘れる&lt;/b&gt;はゲームに触れずに行を削除します。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Deploy&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;配置&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Pick a game from the Steam libraries found on this PC (&lt;code&gt;steamapps/common&lt;/code&gt; of every library in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) or &lt;b&gt;Browse…&lt;/b&gt; to any folder (Heroic, Lutris, Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's own file, HelixSR, and whether the network files are next to it. Select the one the game loads (usually the only one) and &lt;b&gt;Deploy HelixSR&lt;/b&gt;.&lt;/p&gt;</source>
        <translation>&lt;p&gt;この PC で見つかった Steam ライブラリ（&lt;code&gt;libraryfolders.vdf&lt;/code&gt; 内の各ライブラリの &lt;code&gt;steamapps/common&lt;/code&gt;）からゲームを選ぶか、&lt;b&gt;参照…&lt;/b&gt;で任意のフォルダー（Heroic、Lutris、Bottles）を選びます。フォルダー内の FSR 3.1 アップスケーラー DLL がスキャンされ、それぞれゲーム本来のファイルか、HelixSR か、隣にネットワークファイルがあるかが表示されます。ゲームが読み込むもの（通常は 1 つだけ）を選択し、&lt;b&gt;HelixSR を配置&lt;/b&gt;します。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Stand-alone folder for OptiScaler&lt;/b&gt; is for games that do not ship FSR 3.1 as a separate DLL (DLSS, XeSS, FSR 2 / 3.0 games). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; routes their upscaler calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own (default &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) and shows the &lt;code&gt;OptiScaler.ini&lt;/code&gt; lines that point OptiScaler there (Windows paths; &lt;code&gt;Z:&lt;/code&gt; is the Linux root under Proton). Install OptiScaler for the game as its documentation describes, paste the lines, and pick &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; in OptiScaler's FFX Upscaler menu.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;OptiScaler 用のスタンドアロンフォルダー&lt;/b&gt;は、FSR 3.1 を別 DLL として同梱していないゲーム（DLSS、XeSS、FSR 2 / 3.0 ゲーム）向けです。&lt;a href=&quot;{optiscaler_url}&quot;&gt;OptiScaler&lt;/a&gt; はそれらのアップスケーラー呼び出しを FSR 3.1 DLL へルーティングします。アプリは専用フォルダー（既定 &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;）に両方の FidelityFX 名で HelixSR を書き込み、OptiScaler からそこを指す &lt;code&gt;OptiScaler.ini&lt;/code&gt; 行を表示します（Windows パス。&lt;code&gt;Z:&lt;/code&gt; は Proton 下の Linux ルート）。OptiScaler のドキュメントに従ってゲームへインストールし、行を貼り付け、OptiScaler の FFX Upscaler メニューで &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; を選択してください。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Deploying again over an existing deployment updates HelixSR's files and keeps the game's original.&lt;/p&gt;</source>
        <translation>&lt;p&gt;既存の配置に再度配置すると、ゲームの元ファイルを保持したまま HelixSR のファイルを更新します。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;th&gt;セクション&lt;/th&gt;&lt;th&gt;キー&lt;/th&gt;&lt;th&gt;既定値&lt;/th&gt;&lt;th&gt;意味&lt;/th&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (as DLSS), &lt;i&gt;game&lt;/i&gt; = the game's FSR sharpness (or Sharpness if it sends none), &lt;i&gt;override&lt;/i&gt; = always Sharpness&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt;（DLSS と同じ）、&lt;i&gt;game&lt;/i&gt; = ゲームの FSR シャープネス（送られない場合は Sharpness）、&lt;i&gt;override&lt;/i&gt; = 常に Sharpness&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, FidelityFX RCAS scale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0〜1、FidelityFX RCAS スケール&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Less sharpening on fast-moving pixels: where the reduction starts and is complete (output pixels per frame), and how much is removed&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;高速に動くピクセルのシャープ化を弱めます。軽減が始まり完了する位置（フレームあたりの出力ピクセル）と、取り除く量を指定します&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Run the Model E network; otherwise a placeholder upscale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Model E ネットワークを実行します。無効時はプレースホルダーのアップスケール&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: the main network at every ratio (about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); &lt;i&gt;nvidia&lt;/i&gt;: as DLSS selects; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;：すべての比率で main ネットワーク（行列コアのない GPU では NVIDIA の Ultra Performance ネットワークより約 30 % 高速）。&lt;i&gt;nvidia&lt;/i&gt;：DLSS の選択に従う。&lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;For games whose jitter or motion vectors come out mirrored&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;ジッターまたはモーションベクトルが反転して出力されるゲーム用&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convert render-resolution motion vectors to display resolution first (used anyway when the game's vectors include the jitter)&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;レンダー解像度のモーションベクトルを先に表示解像度へ変換します（ゲームのベクトルにジッターが含まれる場合はいずれにせよ使用）&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Writes &lt;code&gt;helixsr.log&lt;/code&gt; next to the DLL; it names the network that runs and reports missing network files&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;DLL の隣に &lt;code&gt;helixsr.log&lt;/code&gt; を書き込みます。実行されるネットワーク名と不足しているネットワークファイルを報告します&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL for the other FidelityFX effects (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; if present, else &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;他の FidelityFX エフェクト（フレーム生成）用 DLL。存在する場合は &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt;、それ以外は &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;OptiScaler のメニューで HelixSR の後に並ぶ 2 つ目の FidelityFX アップスケーラー DLL（例：FSR 4 対応の AMD 版）&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The page edits these values and shows the resulting file; the comments of the payload's own &lt;code&gt;{ini}&lt;/code&gt; are kept, only values change. &lt;b&gt;Save as payload default&lt;/b&gt; makes it the file Deploy starts from; &lt;b&gt;Write to game&lt;/b&gt; replaces the ini of a chosen deployment. Sharpening off costs nothing; on, about 0.4 ms at 4K on the BC-250.&lt;/p&gt;</source>
        <translation>&lt;p&gt;このページではこれらの値を編集し、生成されるファイルを表示します。ペイロード自身の &lt;code&gt;{ini}&lt;/code&gt; のコメントは保持され、値だけが変わります。&lt;b&gt;ペイロード既定値として保存&lt;/b&gt;すると、配置が開始時に使うファイルになります。&lt;b&gt;ゲームへ書き込み&lt;/b&gt;は選択した配置の ini を置き換えます。シャープ化オフならコストはありません。オンでは BC-250 の 4K で約 0.4 ms です。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Good to know&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;知っておくとよいこと&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 (gfx1013, Mesa RADV, Proton). Vulkan games are not supported.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR は Direct3D 12 専用で、RDNA 1 以降向けです。BC-250（gfx1013、Mesa RADV、Proton）で開発およびテストされています。Vulkan ゲームはサポートされません。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Steam verifies game files on updates and may put the game's own DLL back. The Overview then shows &lt;i&gt;Original restored&lt;/i&gt; and the backup stays; deploy again.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Steam は更新時にゲームファイルを検証し、ゲーム本来の DLL を戻すことがあります。その場合、概要には &lt;i&gt;元に復元済み&lt;/i&gt; と表示され、バックアップは残ります。再度配置してください。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Per-stage GPU timings: launch option &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; writes them to &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;ステージごとの GPU 時間：起動オプション &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; により &lt;code&gt;helixsr.log&lt;/code&gt; へ書き込まれます。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Deployments: &lt;code&gt;{deployments_file}&lt;/code&gt;. Window size and page are kept per user. Removing the app with &lt;code&gt;install.sh --uninstall&lt;/code&gt; leaves the payload alone.&lt;/li&gt;</source>
        <translation>&lt;li&gt;ペイロード：&lt;code&gt;{payload_dir}&lt;/code&gt;。配置一覧：&lt;code&gt;{deployments_file}&lt;/code&gt;。ウィンドウサイズとページはユーザーごとに保持されます。&lt;code&gt;install.sh --uninstall&lt;/code&gt; でアプリを削除しても、ペイロードはそのまま残ります。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Source and issues: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR itself: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; this app ships none of it).&lt;/p&gt;</source>
        <translation>&lt;p&gt;ソースと issue：&lt;a href=&quot;{repo_url}&quot;&gt;{repo_url}&lt;/a&gt;。HelixSR 本体：&lt;a href=&quot;{helixsr_url}&quot;&gt;{helixsr_url}&lt;/a&gt;（HelixSR Freeware License。このアプリには同梱されていません）。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Second upscaler&lt;/b&gt; (optional, OptiScaler folder only): pick another FidelityFX upscaler DLL, for example AMD&apos;s &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; with FSR 4. It is copied into the folder as &lt;code&gt;{second}&lt;/code&gt; and &lt;code&gt;UpscalerDll&lt;/code&gt; in its helixsr.ini points at it, so OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR and the one you pick runs in that DLL.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;2 つ目のアップスケーラー&lt;/b&gt;（任意、OptiScaler フォルダーのみ）: 別の FidelityFX アップスケーラー DLL（例: FSR 4 入りの AMD の &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt;）を選びます。&lt;code&gt;{second}&lt;/code&gt; としてフォルダーにコピーされ、その helixsr.ini の &lt;code&gt;UpscalerDll&lt;/code&gt; がそれを指すので、OptiScaler の「FFX Upscaler」メニューでは HelixSR の後にそのアップスケーラーが並び、選んだものはその DLL で動作します。&lt;/p&gt;</translation>
    </message>
</context><context>
    <name>setup_page</name>
    <message>
        <source>{0:.1f} MB</source>
        <translation>{0:.1f} MB</translation>
    </message>
</context></TS>
