<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="zh">
<context>
    <name>DeployPage</name>
    <message>
        <source>Deploy</source>
        <translation>部署</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>游戏</translation>
    </message>
    <message>
        <source>Steam library:</source>
        <translation>Steam 库：</translation>
    </message>
    <message>
        <source>The folders under steamapps/common of every Steam library on this PC.</source>
        <translation>此电脑上每个 Steam 库的 steamapps/common 下的文件夹。</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>浏览…</translation>
    </message>
    <message>
        <source>Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix.</source>
        <translation>任意文件夹：Steam 之外的游戏，或 Heroic / Lutris / Bottles 前缀。</translation>
    </message>
    <message>
        <source>Folder:</source>
        <translation>文件夹：</translation>
    </message>
    <message>
        <source>Pick a game above or browse to its folder</source>
        <translation>在上方选择游戏，或浏览到其文件夹</translation>
    </message>
    <message>
        <source>Scan</source>
        <translation>扫描</translation>
    </message>
    <message>
        <source>FSR 3.1 upscaler DLLs in that folder</source>
        <translation>该文件夹中的 FSR 3.1 upscaler DLL</translation>
    </message>
    <message>
        <source>DLL</source>
        <translation>DLL</translation>
    </message>
    <message>
        <source>State</source>
        <translation>状态</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>网络文件</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>位置</translation>
    </message>
    <message>
        <source>Scan a game folder first.</source>
        <translation>请先扫描游戏文件夹。</translation>
    </message>
    <message>
        <source>How</source>
        <translation>方式</translation>
    </message>
    <message>
        <source>Replace the selected DLL (the game's file is kept as *.original.dll)</source>
        <translation>替换选中的 DLL（游戏文件保留为 *.original.dll）</translation>
    </message>
    <message>
        <source>Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)</source>
        <translation>用于 OptiScaler 的独立文件夹（DLSS / XeSS / FSR 2 游戏）</translation>
    </message>
    <message>
        <source>The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: under Engine/Plugins/…/Win64) or &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; above, then choose &lt;b&gt;AMD FSR&lt;/b&gt; in the game. No launch options.</source>
        <translation>HelixSR 推荐的安装方式：游戏调用 FSR 3.1，实际得到 HelixSR。请在上方选择游戏的 &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt;（Unreal：位于 Engine/Plugins/…/Win64 下）或 &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt;，然后在游戏中选择 &lt;b&gt;AMD FSR&lt;/b&gt;。无需启动选项。</translation>
    </message>
    <message>
        <source>Defaults to &lt;game&gt;/HelixSR</source>
        <translation>默认为 &lt;game&gt;/HelixSR</translation>
    </message>
    <message>
        <source>Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this folder with the lines below (Copy puts them on the clipboard).</source>
        <translation>按 OptiScaler 文档为游戏安装 OptiScaler，然后用下方几行让 OptiScaler.ini 指向此文件夹（“复制”会将它们放入剪贴板）。</translation>
    </message>
    <message>
        <source>Copy OptiScaler.ini lines</source>
        <translation>复制 OptiScaler.ini 行</translation>
    </message>
    <message>
        <source>Write helixsr.ini with the values of the helixsr.ini page</source>
        <translation>按 helixsr.ini 页面中的值写入 helixsr.ini</translation>
    </message>
    <message>
        <source>Unticked: the payload's helixsr.ini is copied if it has one, else none is written and HelixSR uses its defaults.</source>
        <translation>未勾选：如果载荷中有 helixsr.ini，则复制它；否则不写入，HelixSR 使用默认值。</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>移除 HelixSR</translation>
    </message>
    <message>
        <source>Delete HelixSR's files and put the game's original DLL back.</source>
        <translation>删除 HelixSR 的文件，并放回游戏的原始 DLL。</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>部署 HelixSR</translation>
    </message>
    <message>
        <source>Copy HelixSR into the game as chosen above.</source>
        <translation>按上方选择将 HelixSR 复制到游戏中。</translation>
    </message>
    <message>
        <source>— pick a game —</source>
        <translation>— 选择游戏 —</translation>
    </message>
    <message>
        <source>— no Steam library found —</source>
        <translation>— 未找到 Steam 库 —</translation>
    </message>
    <message>
        <source>No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a separate DLL: use the OptiScaler folder below, or check the game's folder.</source>
        <translation>此文件夹中没有 FSR 3.1 upscaler DLL。游戏可能未将 FSR 3.1 作为单独 DLL 提供：请使用下方的 OptiScaler 文件夹，或检查游戏文件夹。</translation>
    </message>
    <message>
        <source>{0} DLL(s) found; select the one the game loads (usually the only one, or the shallowest).</source>
        <translation>找到 {0} 个 DLL；请选择游戏会加载的那个（通常是唯一一个，或层级最浅的那个）。</translation>
    </message>
    <message>
        <source>Import a complete payload first.</source>
        <translation>请先导入完整载荷。</translation>
    </message>
    <message>
        <source>Write HelixSR under both FidelityFX names into the folder.</source>
        <translation>将 HelixSR 以两个 FidelityFX 名称写入该文件夹。</translation>
    </message>
    <message>
        <source>Select a DLL in the list.</source>
        <translation>请在列表中选择一个 DLL。</translation>
    </message>
    <message>
        <source>Replace {0} with HelixSR.</source>
        <translation>将 {0} 替换为 HelixSR。</translation>
    </message>
    <message>
        <source>Second upscaler:</source>
        <translation>第二个超分器：</translation>
    </message>
    <message>
        <source>Optional: AMD&apos;s amd_fidelityfx_upscaler_dx12.dll, e.g. with FSR 4</source>
        <translation>可选：AMD 的 amd_fidelityfx_upscaler_dx12.dll，例如带 FSR 4 的版本</translation>
    </message>
    <message>
        <source>Copied into the folder as {0}, with UpscalerDll in helixsr.ini pointing at it: OptiScaler&apos;s FFX Upscaler menu then lists its upscalers after HelixSR, and the one you pick runs in that DLL. Empty: HelixSR only.</source>
        <translation>以 {0} 的名称复制到文件夹中，并让 helixsr.ini 中的 UpscalerDll 指向它：OptiScaler 的“FFX Upscaler”菜单会在 HelixSR 之后列出它的超分器，所选的那个在该 DLL 中运行。留空：仅 HelixSR。</translation>
    </message>
</context><context>
    <name>HelpPage</name>
    <message>
        <source>Language:</source>
        <translation>语言：</translation>
    </message>
    <message>
        <source>System default</source>
        <translation>系统默认</translation>
    </message>
    <message>
        <source>Saved for the next start; the interface is built once in the language that is active then.</source>
        <translation>已保存供下次启动使用；界面会在启动时使用当时生效的语言构建一次。</translation>
    </message>
    <message>
        <source>Takes effect after a restart.</source>
        <translation>重启后生效。</translation>
    </message>
</context><context>
    <name>IniPage</name>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>HelixSR defaults</source>
        <translation>HelixSR 默认值</translation>
    </message>
    <message>
        <source>Reset every field to the value HelixSR uses when the key is missing.</source>
        <translation>将每个字段重置为缺少该键时 HelixSR 使用的值。</translation>
    </message>
    <message>
        <source>Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a game that already has HelixSR.</source>
        <translation>HelixSR 从其 DLL 旁的 helixsr.ini 读取的可选设置；每个键都有默认值。这些值会在“部署”时（勾选后）写入，可保存为载荷默认值，也可推送到已有 HelixSR 的游戏。</translation>
    </message>
    <message>
        <source>off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, or Sharpness below if it sends none. override: always Sharpness below.</source>
        <translation>off：从不锐化（DLSS 的网络也不锐化）。game：使用游戏的 FSR 锐度；若游戏未发送，则使用下方 Sharpness。override：始终使用下方 Sharpness。</translation>
    </message>
    <message>
        <source>0 = none, 1 = strongest RCAS (FidelityFX scale).</source>
        <translation>0 = 无，1 = 最强 RCAS（FidelityFX 标度）。</translation>
    </message>
    <message>
        <source>Less sharpening on fast-moving pixels</source>
        <translation>快速移动像素降低锐化</translation>
    </message>
    <message>
        <source>Motion in output pixels per frame where the reduction starts.</source>
        <translation>输出像素/帧中的运动量，达到该值时开始降低。</translation>
    </message>
    <message>
        <source>Motion where the reduction is complete.</source>
        <translation>降低完成时的运动量。</translation>
    </message>
    <message>
        <source>Fraction of sharpening removed at and above MotionLimit.</source>
        <translation>在 MotionLimit 及以上移除的锐化比例。</translation>
    </message>
    <message>
        <source>Write helixsr.log next to the DLL</source>
        <translation>在 DLL 旁写入 helixsr.log</translation>
    </message>
    <message>
        <source>Run the Model E network</source>
        <translation>运行 Model E 网络</translation>
    </message>
    <message>
        <source>Off, or while the network files are missing, a placeholder upscale is used.</source>
        <translation>关闭时，或网络文件缺失时，会使用占位放大。</translation>
    </message>
    <message>
        <source>auto: the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one.</source>
        <translation>auto：所有缩放比例都使用主网络（在没有矩阵核心的 GPU 上比 Ultra Performance 网络更快）。nvidia：按 DLSS 的选择。也可强制指定一个。</translation>
    </message>
    <message>
        <source>Jitter comes out mirrored</source>
        <translation>Jitter 输出为镜像</translation>
    </message>
    <message>
        <source>Motion vectors come out mirrored</source>
        <translation>Motion vectors 输出为镜像</translation>
    </message>
    <message>
        <source>Convert render-resolution motion vectors first</source>
        <translation>先转换渲染分辨率的 Motion vectors</translation>
    </message>
    <message>
        <source>Used anyway when the game's vectors include the jitter; otherwise NVIDIA's render-resolution path is faster.</source>
        <translation>当游戏的向量包含 jitter 时无论如何都会使用；否则 NVIDIA 的渲染分辨率路径更快。</translation>
    </message>
    <message>
        <source>auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll</source>
        <translation>auto：amd_fidelityfx_dx12.original.dll，否则为 …framegeneration_dx12.dll</translation>
    </message>
    <message>
        <source>DLL that serves FidelityFX effects other than upscaling (frame generation).</source>
        <translation>提供除 upscaling 以外的 FidelityFX 效果（frame generation）的 DLL。</translation>
    </message>
    <message>
        <source>empty: HelixSR only</source>
        <translation>空：仅 HelixSR</translation>
    </message>
    <message>
        <source>A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu. A bare name is looked up next to HelixSR.</source>
        <translation>第二个 FidelityFX upscaler DLL（例如带 FSR 4 的 AMD DLL），在 OptiScaler 菜单中列在 HelixSR 之后。裸文件名会在 HelixSR 旁查找。</translation>
    </message>
    <message>
        <source>Resulting file</source>
        <translation>生成的文件</translation>
    </message>
    <message>
        <source>Save as payload default</source>
        <translation>保存为载荷默认值</translation>
    </message>
    <message>
        <source>Write this file into the payload folder: it is what Deploy copies when the helixsr.ini tick box there is off, and what this page starts from.</source>
        <translation>将此文件写入载荷文件夹：当“部署”页的 helixsr.ini 复选框关闭时会复制它，本页面也从它开始。</translation>
    </message>
    <message>
        <source>Push to:</source>
        <translation>推送到：</translation>
    </message>
    <message>
        <source>Write to game</source>
        <translation>写入游戏</translation>
    </message>
    <message>
        <source>Overwrite the helixsr.ini of that deployment with this file.</source>
        <translation>用此文件覆盖该部署的 helixsr.ini。</translation>
    </message>
</context><context>
    <name>MainWindow</name>
    <message>
        <source>HelixSR payload</source>
        <translation>HelixSR 载荷</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>网络文件</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>部署</translation>
    </message>
    <message>
        <source>Steam games</source>
        <translation>Steam 游戏</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>概览</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>设置</translation>
    </message>
    <message>
        <source>Deploy</source>
        <translation>部署</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>帮助</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>就绪</translation>
    </message>
    <message>
        <source>Setup running</source>
        <translation>设置正在运行</translation>
    </message>
    <message>
        <source>The HelixSR setup is still running. Cancel it and quit?</source>
        <translation>HelixSR 设置仍在运行。要取消并退出吗？</translation>
    </message>
    <message>
        <source>Imported</source>
        <translation>已导入</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>缺失</translation>
    </message>
    <message>
        <source>helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh</source>
        <translation>来自 helixsr-setup.sh 的 helixsr_weights.bin 和 helixsr_kernels.pak</translation>
    </message>
    <message>
        <source>HelixSR in place / known deployments</source>
        <translation>已安装的 HelixSR / 已知部署</translation>
    </message>
    <message>
        <source>No Steam library found</source>
        <translation>未找到 Steam 库</translation>
    </message>
    <message>
        <source>Extracted HelixSR release folder</source>
        <translation>已解压的 HelixSR release 文件夹</translation>
    </message>
    <message>
        <source>HelixSR release zip</source>
        <translation>HelixSR release zip</translation>
    </message>
    <message>
        <source>Zip archives (*.zip)</source>
        <translation>Zip 归档 (*.zip)</translation>
    </message>
    <message>
        <source>Import failed</source>
        <translation>导入失败</translation>
    </message>
    <message>
        <source>Imported {0} file(s): {1}.</source>
        <translation>已导入 {0} 个文件：{1}。</translation>
    </message>
    <message>
        <source>

Still missing: {0}. Run helixsr-setup.sh in the extracted release folder, then import that folder.</source>
        <translation>

仍缺失：{0}。请在已解压的 release 文件夹中运行 helixsr-setup.sh，然后导入该文件夹。</translation>
    </message>
    <message>
        <source>Payload incomplete</source>
        <translation>载荷不完整</translation>
    </message>
    <message>
        <source>Could not write</source>
        <translation>无法写入</translation>
    </message>
    <message>
        <source>Saved {0}</source>
        <translation>已保存 {0}</translation>
    </message>
    <message>
        <source>Game folder</source>
        <translation>游戏文件夹</translation>
    </message>
    <message>
        <source>Folder for HelixSR (OptiScaler)</source>
        <translation>HelixSR 文件夹（OptiScaler）</translation>
    </message>
    <message>
        <source>{0} is not a folder.</source>
        <translation>{0} 不是文件夹。</translation>
    </message>
    <message>
        <source>Could not scan {0}: {1}</source>
        <translation>无法扫描 {0}：{1}</translation>
    </message>
    <message>
        <source>The helixsr.ini page has invalid values; fix them or untick writing the ini.</source>
        <translation>helixsr.ini 页面有无效值；请修正它们，或取消勾选写入 ini。</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>部署 HelixSR</translation>
    </message>
    <message>
        <source>Rename
{path}
to {original} and put HelixSR in its place?</source>
        <translation>将
{path}
重命名为 {original}，并将 HelixSR 放到其位置？</translation>
    </message>
    <message>
        <source>Deploy failed</source>
        <translation>部署失败</translation>
    </message>
    <message>
        <source>HelixSR deployed: {0} file(s) written to {1}</source>
        <translation>HelixSR 已部署：已将 {0} 个文件写入 {1}</translation>
    </message>
    <message>
        <source>HelixSR folder ready</source>
        <translation>HelixSR 文件夹已就绪</translation>
    </message>
    <message>
        <source>HelixSR is in
{folder}

Now point OptiScaler at it: the OptiScaler.ini lines on the Deploy page (Copy button) go into the game's OptiScaler.ini.</source>
        <translation>HelixSR 位于
{folder}

现在让 OptiScaler 指向它：“部署”页上的 OptiScaler.ini 行（“复制”按钮）应写入游戏的 OptiScaler.ini。</translation>
    </message>
    <message>
        <source>Delete HelixSR's files next to
{0}
and rename the game's .original.dll back?</source>
        <translation>删除
{0}
旁的 HelixSR 文件，并将游戏的 .original.dll 重命名回来？</translation>
    </message>
    <message>
        <source>Delete HelixSR's files in
{0}?</source>
        <translation>删除
{0}
中的 HelixSR 文件？</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>移除 HelixSR</translation>
    </message>
    <message>
        <source>Remove failed</source>
        <translation>移除失败</translation>
    </message>
    <message>
        <source>Removed {0} file(s); HelixSR is gone from {1}</source>
        <translation>已移除 {0} 个文件；HelixSR 已从 {1} 移除</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>文件夹已消失</translation>
    </message>
    <message>
        <source>{0} does not exist any more.</source>
        <translation>{0} 已不再存在。</translation>
    </message>
    <message>
        <source>Wrote {0}</source>
        <translation>已写入 {0}</translation>
    </message>
    <message>
        <source>Update check: {0}</source>
        <translation>更新检查：{0}</translation>
    </message>
    <message>
        <source>HelixSR {version} is out ({published}); the payload has {installed}. Get HelixSR… updates it.</source>
        <translation>HelixSR {version} 已发布（{published}）；载荷中为 {installed}。获取 HelixSR… 会更新它。</translation>
    </message>
    <message>
        <source>Latest HelixSR release: {version} ({published}).</source>
        <translation>最新 HelixSR release：{version}（{published}）。</translation>
    </message>
    <message>
        <source>{app} {version} is available: {url}</source>
        <translation>{app} {version} 可用：{url}</translation>
    </message>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} 不存在。</translation>
    </message>
    <message>
        <source>Payload is current</source>
        <translation>载荷已是最新</translation>
    </message>
    <message>
        <source>The payload already has HelixSR {version} with its network files. Download and build again anyway?</source>
        <translation>载荷已经包含带网络文件的 HelixSR {version}。仍要重新下载并构建吗？</translation>
    </message>
    <message>
        <source>(unknown version)</source>
        <translation>（未知版本）</translation>
    </message>
    <message>
        <source>Nothing to do: the payload already has HelixSR {version} with its network files. Use Deploy to install it into a game.</source>
        <translation>无需操作：载荷已经包含带网络文件的 HelixSR {version}。请使用“部署”将它安装到游戏中。</translation>
    </message>
    <message>
        <source>Payload is already current.</source>
        <translation>载荷已经是最新。</translation>
    </message>
    <message>
        <source>HelixSR setup running…</source>
        <translation>HelixSR 设置正在运行…</translation>
    </message>
    <message>
        <source>Cancelling…</source>
        <translation>正在取消…</translation>
    </message>
    <message>
        <source>HelixSR setup failed: {0}</source>
        <translation>HelixSR 设置失败：{0}</translation>
    </message>
    <message>
        <source>HelixSR setup failed</source>
        <translation>HelixSR 设置失败</translation>
    </message>
    <message>
        <source>{message} ({seconds:.0f} s)</source>
        <translation>{message}（{seconds:.0f} s）</translation>
    </message>
    <message>
        <source>NVIDIA {0} (310.7.0)</source>
        <translation>NVIDIA {0} (310.7.0)</translation>
    </message>
    <message>
        <source>No Steam library found on this PC.</source>
        <translation>此电脑上未找到 Steam 库。</translation>
    </message>
    <message>
        <source>Looking for {dll} in {libraries} …</source>
        <translation>正在 {libraries} 中查找 {dll} …</translation>
    </message>
    <message>
        <source>Copied to the clipboard</source>
        <translation>已复制到剪贴板</translation>
    </message>
    <message>
        <source>Could not open</source>
        <translation>无法打开</translation>
    </message>
    <message>
        <source>Second FidelityFX upscaler DLL (e.g. AMD&apos;s with FSR 4)</source>
        <translation>第二个 FidelityFX 超分器 DLL（例如 AMD 带 FSR 4 的版本）</translation>
    </message>
    <message>
        <source>DLL files (*.dll)</source>
        <translation>DLL 文件 (*.dll)</translation>
    </message>
    <message>
        <source>The second upscaler is in the folder as {0}; OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR.</source>
        <translation>第二个超分器以 {0} 的名称放在文件夹中；OptiScaler 的“FFX Upscaler”菜单会在 HelixSR 之后列出它的超分器。</translation>
    </message>
</context><context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>概览</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <source>HelixSR payload</source>
        <translation>HelixSR 载荷</translation>
    </message>
    <message>
        <source>Upscaler DLL</source>
        <translation>Upscaler DLL</translation>
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
        <translation>“设置”页会下载 HelixSR release，并从 NVIDIA 的 DLSS DLL 为你构建网络文件（&lt;code&gt;{weights}&lt;/code&gt;、&lt;code&gt;{kernels}&lt;/code&gt;）。也可以手动完成：解压 release，在那里运行一次 &lt;code&gt;helixsr-setup.sh&lt;/code&gt;，然后在此导入该文件夹。网络文件是 NVIDIA 的财产：它们只保留在此电脑上，绝不会成为此应用的一部分。</translation>
    </message>
    <message>
        <source>Get HelixSR…</source>
        <translation>获取 HelixSR…</translation>
    </message>
    <message>
        <source>Open the Setup page: download the latest release and build the network files in one go.</source>
        <translation>打开“设置”页：一次完成下载最新 release 并构建网络文件。</translation>
    </message>
    <message>
        <source>Import release folder…</source>
        <translation>导入 release 文件夹…</translation>
    </message>
    <message>
        <source>The folder the HelixSR zip was extracted to, after running helixsr-setup.sh there.</source>
        <translation>HelixSR zip 解压到的文件夹，且已在其中运行 helixsr-setup.sh。</translation>
    </message>
    <message>
        <source>Import release zip…</source>
        <translation>导入 release zip…</translation>
    </message>
    <message>
        <source>The release zip as downloaded; the network files still have to be built and imported from the extracted folder afterwards.</source>
        <translation>下载得到的 release zip；之后仍需从解压后的文件夹构建并导入网络文件。</translation>
    </message>
    <message>
        <source>Open payload folder</source>
        <translation>打开载荷文件夹</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>部署</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>游戏</translation>
    </message>
    <message>
        <source>Mode</source>
        <translation>模式</translation>
    </message>
    <message>
        <source>State</source>
        <translation>状态</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>Deployed</source>
        <translation>已部署</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>位置</translation>
    </message>
    <message>
        <source>Nothing deployed yet. Use the Deploy page.</source>
        <translation>尚未部署任何内容。请使用“部署”页。</translation>
    </message>
    <message>
        <source>Open folder</source>
        <translation>打开文件夹</translation>
    </message>
    <message>
        <source>Forget entry</source>
        <translation>忘记条目</translation>
    </message>
    <message>
        <source>Drop the entry from this list without touching the game. For deployments whose files are already gone.</source>
        <translation>仅从此列表中删除该条目，不修改游戏。用于文件已经不存在的部署。</translation>
    </message>
    <message>
        <source>Remove HelixSR from game</source>
        <translation>从游戏中移除 HelixSR</translation>
    </message>
    <message>
        <source>Delete HelixSR's files there and put the game's original DLL back.</source>
        <translation>删除那里的 HelixSR 文件，并放回游戏的原始 DLL。</translation>
    </message>
    <message>
        <source>Present</source>
        <translation>存在</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>缺失</translation>
    </message>
    <message>
        <source>Default</source>
        <translation>默认</translation>
    </message>
    <message>
        <source>No helixsr.ini in the payload: HelixSR's defaults are used as the template.</source>
        <translation>载荷中没有 helixsr.ini：使用 HelixSR 的默认值作为模板。</translation>
    </message>
    <message>
        <source>HelixSR (version unknown)</source>
        <translation>HelixSR（版本未知）</translation>
    </message>
    <message>
        <source>{version} ready to deploy.</source>
        <translation>{version} 可部署。</translation>
    </message>
    <message>
        <source>{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted release and import the folder again.</source>
        <translation>已导入 {version}，但网络文件缺失：请在解压后的 release 中运行 helixsr-setup.sh，然后再次导入该文件夹。</translation>
    </message>
    <message>
        <source>No payload yet: import an extracted HelixSR release.</source>
        <translation>尚无载荷：请导入已解压的 HelixSR release。</translation>
    </message>
    <message>
        <source>Folder: {0}</source>
        <translation>文件夹：{0}</translation>
    </message>
    <message>
        <source>Replaced DLL</source>
        <translation>已替换 DLL</translation>
    </message>
    <message>
        <source>OptiScaler folder</source>
        <translation>OptiScaler 文件夹</translation>
    </message>
</context><context>
    <name>SetupPage</name>
    <message>
        <source>Unknown</source>
        <translation>未知</translation>
    </message>
    <message>
        <source>Update</source>
        <translation>更新</translation>
    </message>
    <message>
        <source>Up to date</source>
        <translation>已是最新</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>设置</translation>
    </message>
    <message>
        <source>One click does what the HelixSR README asks you to do by hand: download the release, fetch NVIDIA's DLSS DLL, Microsoft's shader compiler and (on Bazzite) a portable Python in parallel, run &lt;code&gt;helixsr-setup.sh&lt;/code&gt; and import the result as the payload. The DLSS DLL is used once and deleted; the network files it produces are NVIDIA's property and stay on this PC.</source>
        <translation>一键完成 HelixSR README 要求手动执行的步骤：下载 release，并行获取 NVIDIA 的 DLSS DLL、Microsoft 的 shader compiler，以及（在 Bazzite 上）便携式 Python，运行 &lt;code&gt;helixsr-setup.sh&lt;/code&gt;，再将结果导入为载荷。DLSS DLL 只使用一次后删除；它生成的网络文件是 NVIDIA 的财产，并保留在此电脑上。</translation>
    </message>
    <message>
        <source>Releases</source>
        <translation>Release</translation>
    </message>
    <message>
        <source>Not checked</source>
        <translation>未检查</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>This app</source>
        <translation>此应用</translation>
    </message>
    <message>
        <source>Check now</source>
        <translation>立即检查</translation>
    </message>
    <message>
        <source>Ask GitHub for the latest HelixSR release and the latest release of this app</source>
        <translation>向 GitHub 查询最新 HelixSR release 和此应用的最新 release</translation>
    </message>
    <message>
        <source>Check at start</source>
        <translation>启动时检查</translation>
    </message>
    <message>
        <source>Look up both releases every time the app starts (one small request each)</source>
        <translation>每次应用启动时查询两个 release（各一次小请求）</translation>
    </message>
    <message>
        <source>Get HelixSR and build the network files</source>
        <translation>获取 HelixSR 并构建网络文件</translation>
    </message>
    <message>
        <source>Use a {0} already on this PC:</source>
        <translation>使用此电脑上已有的 {0}：</translation>
    </message>
    <message>
        <source>Skips the 59 MB download from NVIDIA's GitHub. Only DLSS 310.7.0 (the exact build HelixSR pins) is accepted; Find looks through the Steam libraries for one.</source>
        <translation>跳过从 NVIDIA 的 GitHub 下载 59 MB。仅接受 DLSS 310.7.0（HelixSR 固定的精确构建）；“查找”会在 Steam 库中寻找一个。</translation>
    </message>
    <message>
        <source>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</source>
        <translation>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>浏览…</translation>
    </message>
    <message>
        <source>Find in Steam</source>
        <translation>在 Steam 中查找</translation>
    </message>
    <message>
        <source>Scan the Steam libraries for a DLSS 310.7.0 DLL (checks each file's checksum)</source>
        <translation>扫描 Steam 库中的 DLSS 310.7.0 DLL（检查每个文件的校验和）</translation>
    </message>
    <message>
        <source>Download and build</source>
        <translation>下载并构建</translation>
    </message>
    <message>
        <source>Download the latest release and everything the setup needs, run helixsr-setup.sh and import the result</source>
        <translation>下载最新 release 和设置所需的一切，运行 helixsr-setup.sh 并导入结果</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation>取消</translation>
    </message>
    <message>
        <source>Import built release</source>
        <translation>导入已构建的 release</translation>
    </message>
    <message>
        <source>Import the network files built in the work folder into the payload</source>
        <translation>将工作文件夹中构建好的网络文件导入载荷</translation>
    </message>
    <message>
        <source>Open work folder</source>
        <translation>打开工作文件夹</translation>
    </message>
    <message>
        <source>Idle</source>
        <translation>空闲</translation>
    </message>
    <message>
        <source>Output of the downloads and of helixsr-setup.sh</source>
        <translation>下载和 helixsr-setup.sh 的输出</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</source>
        <translation> — &lt;a href=&quot;{url}&quot;&gt;{name}&lt;/a&gt;（{size}）</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;release page&lt;/a&gt;</source>
        <translation> — &lt;a href=&quot;{url}&quot;&gt;release 页面&lt;/a&gt;</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>正在检查…</translation>
    </message>
    <message>
        <source>Found {0} matching {1}: {2}</source>
        <translation>找到 {0} 个匹配的 {1}：{2}</translation>
    </message>
    <message>
        <source>No DLSS 310.7.0 {0} found in the Steam libraries; it will be downloaded.</source>
        <translation>在 Steam 库中未找到 DLSS 310.7.0 {0}；将下载它。</translation>
    </message>
    <message>
        <source>{done} / {total}  (%p%)</source>
        <translation>{done} / {total}  (%p%)</translation>
    </message>
    <message>
        <source>Downloading: {0}</source>
        <translation>正在下载：{0}</translation>
    </message>
    <message>
        <source>{0} — {1}:{2:02d} elapsed</source>
        <translation>{0} — 已用时 {1}:{2:02d}</translation>
    </message>
    <message>
        <source>{0} — took {1}:{2:02d}</source>
        <translation>{0} — 用时 {1}:{2:02d}</translation>
    </message>
</context><context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>未知</translation>
    </message>
</context><context>
    <name>acquire</name>
    <message>
        <source>GitHub answered {0}</source>
        <translation>GitHub 返回 {0}</translation>
    </message>
    <message>
        <source>no connection ({0})</source>
        <translation>无连接（{0}）</translation>
    </message>
    <message>
        <source>unexpected tag {0}</source>
        <translation>意外标签 {0}</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>未安装</translation>
    </message>
    <message>
        <source>{0} (latest: unknown, {1})</source>
        <translation>{0}（最新：未知，{1}）</translation>
    </message>
    <message>
        <source>{0} (latest: unknown)</source>
        <translation>{0}（最新：未知）</translation>
    </message>
    <message>
        <source>{0} → {1} available ({2})</source>
        <translation>{0} → {1} 可用（{2}）</translation>
    </message>
    <message>
        <source>{0} (up to date, released {1})</source>
        <translation>{0}（已是最新，发布于 {1}）</translation>
    </message>
    <message>
        <source>{0}; latest release {1} ({2})</source>
        <translation>{0}；最新 release {1}（{2}）</translation>
    </message>
    <message>
        <source>{0}: server answered {1} for {2}</source>
        <translation>{0}：服务器对 {2} 返回 {1}</translation>
    </message>
    <message>
        <source>{0}: download failed ({1})</source>
        <translation>{0}：下载失败（{1}）</translation>
    </message>
    <message>
        <source>{0}: checksum mismatch, the download is not the file HelixSR expects. Nothing was kept.</source>
        <translation>{0}：校验和不匹配，下载的不是 HelixSR 预期的文件。未保留任何内容。</translation>
    </message>
    <message>
        <source>No {0} in {1}: not a HelixSR release.</source>
        <translation>{1} 中没有 {0}：不是 HelixSR release。</translation>
    </message>
    <message>
        <source>{0} contains an unsafe path: {1}</source>
        <translation>{0} 包含不安全路径：{1}</translation>
    </message>
    <message>
        <source>the shader compiler archive has no bin/x64 folder</source>
        <translation>shader compiler 归档没有 bin/x64 文件夹</translation>
    </message>
    <message>
        <source>unsafe path in {0}: {1}</source>
        <translation>{0} 中的不安全路径：{1}</translation>
    </message>
    <message>
        <source>the portable Python archive did not produce python/bin/python3</source>
        <translation>便携式 Python 归档未生成 python/bin/python3</translation>
    </message>
    <message>
        <source>Cancelled.</source>
        <translation>已取消。</translation>
    </message>
    <message>
        <source>HelixSR {0} is built in {1}</source>
        <translation>HelixSR {0} 已构建在 {1}</translation>
    </message>
    <message>
        <source>Could not look up the latest HelixSR release: {0}</source>
        <translation>无法查询最新 HelixSR release：{0}</translation>
    </message>
    <message>
        <source>HelixSR {0} has no zip to download; see {1}</source>
        <translation>HelixSR {0} 没有可下载的 zip；请查看 {1}</translation>
    </message>
    <message>
        <source>Downloading HelixSR {0}</source>
        <translation>正在下载 HelixSR {0}</translation>
    </message>
    <message>
        <source>Using the already downloaded {0}</source>
        <translation>使用已下载的 {0}</translation>
    </message>
    <message>
        <source>Downloading {0}</source>
        <translation>正在下载 {0}</translation>
    </message>
    <message>
        <source>Extracted to {0}</source>
        <translation>已解压到 {0}</translation>
    </message>
    <message>
        <source>The release has no {0}.</source>
        <translation>release 中没有 {0}。</translation>
    </message>
    <message>
        <source>Could not read the pinned source(s) for {0} from the setup scripts; the script will download them itself.</source>
        <translation>无法从设置脚本读取 {0} 的固定来源；脚本会自行下载它们。</translation>
    </message>
    <message>
        <source>Downloading {0} in parallel</source>
        <translation>正在并行下载 {0}</translation>
    </message>
    <message>
        <source>Shader compiler unpacked to {0}</source>
        <translation>Shader compiler 已解包到 {0}</translation>
    </message>
    <message>
        <source>Portable Python unpacked to {0}</source>
        <translation>便携式 Python 已解包到 {0}</translation>
    </message>
    <message>
        <source>Building the network files (about 5-6 minutes on a BC-250)</source>
        <translation>正在构建网络文件（在 BC-250 上约 5-6 分钟）</translation>
    </message>
    <message>
        <source>Could not start {0}: {1}</source>
        <translation>无法启动 {0}：{1}</translation>
    </message>
    <message>
        <source>Deleted the downloaded {0}</source>
        <translation>已删除下载的 {0}</translation>
    </message>
    <message>
        <source>{0} exited with code {1}; see the output above.</source>
        <translation>{0} 退出，代码 {1}；请查看上方输出。</translation>
    </message>
    <message>
        <source>The setup finished but did not produce {0}</source>
        <translation>设置已完成，但未生成 {0}</translation>
    </message>
    <message>
        <source>no release tagged {0} yet</source>
        <translation>尚无标记为 {0} 的版本</translation>
    </message>
</context><context>
    <name>backend</name>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} 不存在。</translation>
    </message>
    <message>
        <source>{0} is not a zip archive or a folder.</source>
        <translation>{0} 不是 zip 归档或文件夹。</translation>
    </message>
    <message>
        <source>No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release zip itself).</source>
        <translation>在 {1} 中未找到 {0}。请选择 HelixSR release 解压到的文件夹（或 release zip 本身）。</translation>
    </message>
    <message>
        <source>HelixSR deployed</source>
        <translation>HelixSR 已部署</translation>
    </message>
    <message>
        <source>HelixSR deployed (other build)</source>
        <translation>HelixSR 已部署（其他构建）</translation>
    </message>
    <message>
        <source>HelixSR (no original kept)</source>
        <translation>HelixSR（未保留原始文件）</translation>
    </message>
    <message>
        <source>Game's own DLL</source>
        <translation>游戏自带 DLL</translation>
    </message>
    <message>
        <source>The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running its helixsr-setup.sh.</source>
        <translation>载荷不完整，缺失：{0}。请在运行其 helixsr-setup.sh 后导入解压出的 HelixSR release。</translation>
    </message>
    <message>
        <source>{0} is not an FSR 3.1 upscaler DLL ({1}).</source>
        <translation>{0} 不是 FSR 3.1 upscaler DLL（{1}）。</translation>
    </message>
    <message>
        <source>{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.</source>
        <translation>{0} 不是 HelixSR（旁边没有 {1}，且它与载荷不同）。未更改任何内容。</translation>
    </message>
    <message>
        <source>{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone folder. Use Remove on the DLL instead.</source>
        <translation>{0} 包含游戏自带的 {1}（存在 {2}）：这是替换式 DLL，不是独立文件夹。请改为对该 DLL 使用“移除”。</translation>
    </message>
    <message>
        <source>{0} is not HelixSR; nothing was changed.</source>
        <translation>{0} 不是 HelixSR；未更改任何内容。</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>文件夹已消失</translation>
    </message>
    <message>
        <source>Removed</source>
        <translation>已移除</translation>
    </message>
    <message>
        <source>In place</source>
        <translation>已就位</translation>
    </message>
    <message>
        <source>Network files missing</source>
        <translation>网络文件缺失</translation>
    </message>
    <message>
        <source>DLL missing</source>
        <translation>DLL 缺失</translation>
    </message>
    <message>
        <source>Only the backup is left</source>
        <translation>仅剩备份</translation>
    </message>
    <message>
        <source>Original restored</source>
        <translation>原始已还原</translation>
    </message>
    <message>
        <source>Older build</source>
        <translation>旧构建</translation>
    </message>
    <message>
        <source>{0} is HelixSR itself; pick another FidelityFX upscaler DLL, e.g. AMD&apos;s with FSR 4.</source>
        <translation>{0} 就是 HelixSR 本身；请选择另一个 FidelityFX 超分器 DLL，例如 AMD 带 FSR 4 的版本。</translation>
    </message>
</context><context>
    <name>help</name>
    <message>
        <source>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</source>
        <translation>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Installs &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, the FSR/DLSS hybrid upscaler for Direct3D 12 tuned for the &lt;b&gt;AMD BC-250&lt;/b&gt;, into games on &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR runs NVIDIA's DLSS Model E network as plain compute shaders on an AMD GPU; games talk to it as FSR 3.1. This app only copies, renames and deletes files inside the game folders you point it at and inside its own payload folder. Nothing on the system is touched, no root is needed.&lt;/p&gt;</source>
        <translation>&lt;p&gt;将 &lt;a href=&quot;{helixsr_url}&quot;&gt;HelixSR&lt;/a&gt;（针对 &lt;b&gt;AMD BC-250&lt;/b&gt; 调校的 Direct3D 12 FSR/DLSS 混合 upscaler）安装到 &lt;b&gt;Bazzite&lt;/b&gt; 上的游戏中。HelixSR 在 AMD GPU 上以普通计算着色器运行 NVIDIA 的 DLSS Model E 网络；游戏则把它当作 FSR 3.1 交互。此应用只会在你指定的游戏文件夹和自身载荷文件夹内复制、重命名和删除文件。不会触碰系统，无需 root。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;How HelixSR is installed (what the app does for you)&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;HelixSR 的安装方式（此应用为你做什么）&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;The game's FSR 3.1 upscaler DLL, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (Unreal Engine games keep it under &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) or &lt;code&gt;{helixsr_dll}&lt;/code&gt;, is renamed to &lt;code&gt;*.original.dll&lt;/code&gt;. That file is the backup &lt;i&gt;and&lt;/i&gt; is still used: HelixSR forwards frame generation and other FidelityFX effects to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;游戏的 FSR 3.1 upscaler DLL &lt;code&gt;{upscaler_dll}&lt;/code&gt;（Unreal Engine 游戏将其放在 &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt; 下）或 &lt;code&gt;{helixsr_dll}&lt;/code&gt; 会被重命名为 &lt;code&gt;*.original.dll&lt;/code&gt;。该文件既是备份，&lt;i&gt;也&lt;/i&gt;仍会被使用：HelixSR 会把 frame generation 和其他 FidelityFX 效果转发给它。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR's &lt;code&gt;{helixsr_dll}&lt;/code&gt; is copied in under the game's original file name, together with &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR 的 &lt;code&gt;{helixsr_dll}&lt;/code&gt; 会按游戏原文件名复制进去，并一起复制 &lt;code&gt;{weights}&lt;/code&gt; 和 &lt;code&gt;{kernels}&lt;/code&gt;。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Optionally a &lt;code&gt;{ini}&lt;/code&gt; is written next to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;可选地在旁边写入 &lt;code&gt;{ini}&lt;/code&gt;。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Start the game normally and select &lt;b&gt;AMD FSR&lt;/b&gt; as the upscaler. No launch options are needed.&lt;/li&gt;</source>
        <translation>&lt;li&gt;正常启动游戏，并选择 &lt;b&gt;AMD FSR&lt;/b&gt; 作为 upscaler。无需启动选项。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Remove&lt;/b&gt; undoes it: HelixSR's files are deleted and the &lt;code&gt;.original.dll&lt;/code&gt; gets its name back.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;移除&lt;/b&gt;会撤销这些操作：删除 HelixSR 的文件，并将 &lt;code&gt;.original.dll&lt;/code&gt; 改回原名。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Setup&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;设置&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Download and build&lt;/b&gt; does the HelixSR README's setup for you: it fetches the latest release zip from &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), reads the exact sources and SHA-256 sums the release's own setup scripts pin, downloads what this PC still needs &lt;i&gt;in parallel&lt;/i&gt; and verifies each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable Python (67 MB, numpy is added by the script). Then it runs &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; with its output on the page: the script builds &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutes, the shader compiler runs through your Proton) and the result is imported as the payload. The DLSS DLL is deleted afterwards. Everything is downloaded into &lt;code&gt;{work_dir}&lt;/code&gt; and &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (the script's own cache, reused next time).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;下载并构建&lt;/b&gt;会为你执行 HelixSR README 中的设置流程：从 &lt;a href=&quot;{releases_url}&quot;&gt;GitHub&lt;/a&gt; 获取最新 release zip（2 MB），读取 release 自带设置脚本固定的精确来源和 SHA-256 校验和，并行下载此电脑仍需要的内容并校验每个文件：NVIDIA 的 DLSS 310.7.0 DLL（59 MB，来自 NVIDIA 的 GitHub，受 NVIDIA 许可证约束）、Microsoft 的 DirectX Shader Compiler（25 MB），以及在 Bazzite 等只读系统上的便携式 Python（67 MB，脚本会添加 numpy）。然后在页面中显示输出并运行 &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt;：脚本会构建 &lt;code&gt;{weights}&lt;/code&gt; 和 &lt;code&gt;{kernels}&lt;/code&gt;（5-6 分钟，shader compiler 会通过你的 Proton 运行），结果会作为载荷导入。之后会删除 DLSS DLL。所有内容都会下载到 &lt;code&gt;{work_dir}&lt;/code&gt; 和 &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt;（脚本自己的缓存，下次复用）。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;If a game you own already ships DLSS 310.7.0, tick &lt;b&gt;Use a nvngx_dlss.dll already on this PC&lt;/b&gt; and let &lt;b&gt;Find in Steam&lt;/b&gt; locate it (checksums are compared, only the exact build HelixSR pins is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.&lt;/p&gt;</source>
        <translation>&lt;p&gt;如果你拥有的某个游戏已经自带 DLSS 310.7.0，请勾选 &lt;b&gt;使用此电脑上已有的 nvngx_dlss.dll&lt;/b&gt;，并让 &lt;b&gt;在 Steam 中查找&lt;/b&gt; 定位它（会比较校验和，只提供 HelixSR 固定的精确构建）：这样可跳过 NVIDIA 的下载。耗时的不是下载，而是构建。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; compares the payload with the latest HelixSR release and this app with its latest release on GitHub, at start (one small request each, can be turned off) or with &lt;b&gt;Check now&lt;/b&gt;. A newer HelixSR shows on the Overview too; &lt;b&gt;Download and build&lt;/b&gt; again updates the payload, then deploy again per game (the Overview marks them &lt;i&gt;Older build&lt;/i&gt;).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; 会将载荷与最新 HelixSR release 比较，并将此应用与 GitHub 上的最新 release 比较：可在启动时比较（各一次小请求，可关闭），也可用 &lt;b&gt;立即检查&lt;/b&gt;。较新的 HelixSR 也会显示在“概览”中；再次 &lt;b&gt;下载并构建&lt;/b&gt; 会更新载荷，然后需要为每个游戏重新部署（“概览”会将它们标为 &lt;i&gt;旧构建&lt;/i&gt;）。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Overview&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;概览&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The &lt;b&gt;payload&lt;/b&gt; is your copy of a HelixSR release: the DLL, the two network files and the ini, kept in &lt;code&gt;{payload_dir}&lt;/code&gt;. It is filled by the Setup page, or by hand: extract a release, run &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in that folder once and &lt;b&gt;Import release folder…&lt;/b&gt;. The network files contain NVIDIA's network: they are for your own PC and are never part of this app or its releases. &lt;b&gt;Import release zip…&lt;/b&gt; takes the download as is, but the network files are still missing until the setup has run and the folder is imported.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;载荷&lt;/b&gt; 是你的一份 HelixSR release 副本：DLL、两个网络文件和 ini，保存在 &lt;code&gt;{payload_dir}&lt;/code&gt;。它由“设置”页填充，也可手动完成：解压 release，在该文件夹中运行一次 &lt;code&gt;./helixsr-setup.sh&lt;/code&gt;，然后 &lt;b&gt;导入 release 文件夹…&lt;/b&gt;。网络文件包含 NVIDIA 的网络：它们仅供你自己的电脑使用，绝不会成为此应用或其 release 的一部分。&lt;b&gt;导入 release zip…&lt;/b&gt; 会原样接受下载文件，但在运行设置并导入文件夹前仍缺少网络文件。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Deployments&lt;/b&gt; lists every place the app put HelixSR, with its live state: &lt;i&gt;In place&lt;/i&gt;, &lt;i&gt;Older build&lt;/i&gt; (the payload has been updated since; deploy again to update the game), &lt;i&gt;Network files missing&lt;/i&gt;, &lt;i&gt;Original restored&lt;/i&gt; or &lt;i&gt;Removed&lt;/i&gt;. The list is kept in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Forget entry&lt;/b&gt; drops a line without touching the game.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;部署&lt;/b&gt; 会列出此应用放置 HelixSR 的每个位置及其实时状态：&lt;i&gt;已就位&lt;/i&gt;、&lt;i&gt;旧构建&lt;/i&gt;（载荷之后已更新；请再次部署以更新游戏）、&lt;i&gt;网络文件缺失&lt;/i&gt;、&lt;i&gt;原始已还原&lt;/i&gt; 或 &lt;i&gt;已移除&lt;/i&gt;。列表保存在 &lt;code&gt;{deployments_file}&lt;/code&gt;；&lt;b&gt;忘记条目&lt;/b&gt; 只删除一行，不会触碰游戏。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Deploy&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;部署&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Pick a game from the Steam libraries found on this PC (&lt;code&gt;steamapps/common&lt;/code&gt; of every library in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) or &lt;b&gt;Browse…&lt;/b&gt; to any folder (Heroic, Lutris, Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's own file, HelixSR, and whether the network files are next to it. Select the one the game loads (usually the only one) and &lt;b&gt;Deploy HelixSR&lt;/b&gt;.&lt;/p&gt;</source>
        <translation>&lt;p&gt;从此电脑找到的 Steam 库（&lt;code&gt;libraryfolders.vdf&lt;/code&gt; 中每个库的 &lt;code&gt;steamapps/common&lt;/code&gt;）选择游戏，或用 &lt;b&gt;浏览…&lt;/b&gt; 选择任意文件夹（Heroic、Lutris、Bottles）。会扫描该文件夹中的 FSR 3.1 upscaler DLL；每个 DLL 都会显示它是游戏自带文件还是 HelixSR，以及网络文件是否在旁边。选择游戏会加载的那个（通常是唯一一个），然后点击 &lt;b&gt;部署 HelixSR&lt;/b&gt;。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Stand-alone folder for OptiScaler&lt;/b&gt; is for games that do not ship FSR 3.1 as a separate DLL (DLSS, XeSS, FSR 2 / 3.0 games). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; routes their upscaler calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own (default &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) and shows the &lt;code&gt;OptiScaler.ini&lt;/code&gt; lines that point OptiScaler there (Windows paths; &lt;code&gt;Z:&lt;/code&gt; is the Linux root under Proton). Install OptiScaler for the game as its documentation describes, paste the lines, and pick &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; in OptiScaler's FFX Upscaler menu.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;用于 OptiScaler 的独立文件夹&lt;/b&gt; 适用于未将 FSR 3.1 作为单独 DLL 提供的游戏（DLSS、XeSS、FSR 2 / 3.0 游戏）。&lt;a href=&quot;{optiscaler_url}&quot;&gt;OptiScaler&lt;/a&gt; 会把它们的 upscaler 调用路由到 FSR 3.1 DLL。此应用会将 HelixSR 以两个 FidelityFX 名称写入单独文件夹（默认 &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;），并显示指向该处的 &lt;code&gt;OptiScaler.ini&lt;/code&gt; 行（Windows 路径；&lt;code&gt;Z:&lt;/code&gt; 是 Proton 下的 Linux 根目录）。请按 OptiScaler 文档为游戏安装 OptiScaler，粘贴这些行，并在 OptiScaler 的 FFX Upscaler 菜单中选择 &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt;。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Deploying again over an existing deployment updates HelixSR's files and keeps the game's original.&lt;/p&gt;</source>
        <translation>&lt;p&gt;在现有部署上再次部署会更新 HelixSR 的文件，并保留游戏原始文件。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;th&gt;节&lt;/th&gt;&lt;th&gt;键&lt;/th&gt;&lt;th&gt;默认值&lt;/th&gt;&lt;th&gt;含义&lt;/th&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (as DLSS), &lt;i&gt;game&lt;/i&gt; = the game's FSR sharpness (or Sharpness if it sends none), &lt;i&gt;override&lt;/i&gt; = always Sharpness&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt;（同 DLSS）、&lt;i&gt;game&lt;/i&gt; = 游戏的 FSR 锐度（若未发送则使用 Sharpness）、&lt;i&gt;override&lt;/i&gt; = 始终使用 Sharpness&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, FidelityFX RCAS scale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1，FidelityFX RCAS 标度&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Less sharpening on fast-moving pixels: where the reduction starts and is complete (output pixels per frame), and how much is removed&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;快速移动像素降低锐化：降低开始和完成的位置（输出像素/帧），以及移除量&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Run the Model E network; otherwise a placeholder upscale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;运行 Model E 网络；否则使用占位放大&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: the main network at every ratio (about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); &lt;i&gt;nvidia&lt;/i&gt;: as DLSS selects; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;：所有比例都用主网络（在没有矩阵核心的 GPU 上比 NVIDIA 的 Ultra Performance 网络快约 30 %）；&lt;i&gt;nvidia&lt;/i&gt;：按 DLSS 选择；&lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;For games whose jitter or motion vectors come out mirrored&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;用于 jitter 或 motion vectors 输出为镜像的游戏&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convert render-resolution motion vectors to display resolution first (used anyway when the game's vectors include the jitter)&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;先将渲染分辨率的 motion vectors 转换为显示分辨率（当游戏的向量包含 jitter 时无论如何都会使用）&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Writes &lt;code&gt;helixsr.log&lt;/code&gt; next to the DLL; it names the network that runs and reports missing network files&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;在 DLL 旁写入 &lt;code&gt;helixsr.log&lt;/code&gt;；其中会记录运行的网络并报告缺失的网络文件&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL for the other FidelityFX effects (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; if present, else &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;用于其他 FidelityFX 效果（frame generation）的 DLL：若存在则用 &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt;，否则用 &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;第二个 FidelityFX upscaler DLL（例如带 FSR 4 的 AMD DLL），在 OptiScaler 菜单中列在 HelixSR 之后&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The page edits these values and shows the resulting file; the comments of the payload's own &lt;code&gt;{ini}&lt;/code&gt; are kept, only values change. &lt;b&gt;Save as payload default&lt;/b&gt; makes it the file Deploy starts from; &lt;b&gt;Write to game&lt;/b&gt; replaces the ini of a chosen deployment. Sharpening off costs nothing; on, about 0.4 ms at 4K on the BC-250.&lt;/p&gt;</source>
        <translation>&lt;p&gt;此页面编辑这些值并显示生成的文件；载荷自带 &lt;code&gt;{ini}&lt;/code&gt; 的注释会保留，只更改值。&lt;b&gt;保存为载荷默认值&lt;/b&gt; 会使它成为“部署”开始使用的文件；&lt;b&gt;写入游戏&lt;/b&gt; 会替换选定部署的 ini。关闭锐化没有开销；开启后在 BC-250 的 4K 下约 0.4 ms。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Good to know&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;须知&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 (gfx1013, Mesa RADV, Proton). Vulkan games are not supported.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR 仅支持 Direct3D 12，且适用于 RDNA 1 及更新架构；它在 BC-250（gfx1013、Mesa RADV、Proton）上开发和测试。不支持 Vulkan 游戏。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Steam verifies game files on updates and may put the game's own DLL back. The Overview then shows &lt;i&gt;Original restored&lt;/i&gt; and the backup stays; deploy again.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Steam 在更新时会验证游戏文件，并可能把游戏自带 DLL 放回去。“概览”随后会显示 &lt;i&gt;原始已还原&lt;/i&gt;，备份会保留；请再次部署。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Per-stage GPU timings: launch option &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; writes them to &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;各阶段 GPU 计时：启动选项 &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; 会将它们写入 &lt;code&gt;helixsr.log&lt;/code&gt;。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Deployments: &lt;code&gt;{deployments_file}&lt;/code&gt;. Window size and page are kept per user. Removing the app with &lt;code&gt;install.sh --uninstall&lt;/code&gt; leaves the payload alone.&lt;/li&gt;</source>
        <translation>&lt;li&gt;载荷：&lt;code&gt;{payload_dir}&lt;/code&gt;。部署：&lt;code&gt;{deployments_file}&lt;/code&gt;。窗口大小和页面按用户保留。用 &lt;code&gt;install.sh --uninstall&lt;/code&gt; 移除此应用不会动载荷。&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Source and issues: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR itself: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; this app ships none of it).&lt;/p&gt;</source>
        <translation>&lt;p&gt;源码和问题：&lt;a href=&quot;{repo_url}&quot;&gt;{repo_url}&lt;/a&gt;。HelixSR 本身：&lt;a href=&quot;{helixsr_url}&quot;&gt;{helixsr_url}&lt;/a&gt;（HelixSR Freeware License；此应用不随附其中任何内容）。&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Second upscaler&lt;/b&gt; (optional, OptiScaler folder only): pick another FidelityFX upscaler DLL, for example AMD&apos;s &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; with FSR 4. It is copied into the folder as &lt;code&gt;{second}&lt;/code&gt; and &lt;code&gt;UpscalerDll&lt;/code&gt; in its helixsr.ini points at it, so OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR and the one you pick runs in that DLL.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;第二个超分器&lt;/b&gt;（可选，仅 OptiScaler 文件夹）：选择另一个 FidelityFX 超分器 DLL，例如 AMD 带 FSR 4 的 &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt;。它会以 &lt;code&gt;{second}&lt;/code&gt; 的名称复制到文件夹中，并让其 helixsr.ini 中的 &lt;code&gt;UpscalerDll&lt;/code&gt; 指向它，这样 OptiScaler 的“FFX Upscaler”菜单会在 HelixSR 之后列出它的超分器，所选的那个在该 DLL 中运行。&lt;/p&gt;</translation>
    </message>
</context><context>
    <name>setup_page</name>
    <message>
        <source>{0:.1f} MB</source>
        <translation>{0:.1f} MB</translation>
    </message>
</context></TS>
