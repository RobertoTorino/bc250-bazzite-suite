<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="zh">
<context>
    <name>AlertMonitor</name>
    <message>
        <source>GPU temperature</source>
        <translation>GPU 温度</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C (alert set at %2 °C).</source>
        <translation>GPU 当前温度为 %1 °C（提醒阈值为 %2 °C）。</translation>
    </message>
    <message>
        <source>Governor throttling</source>
        <translation>Governor 降频</translation>
    </message>
    <message>
        <source>The GPU is at %1 °C, at or above the governor's throttling temperature of %2 °C; the maximum clock is being lowered.</source>
        <translation>GPU 当前温度为 %1 °C，已达到或超过 governor 的降频温度 %2 °C；最高时钟正在被降低。</translation>
    </message>
    <message>
        <source>failed</source>
        <translation>失败</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>已停止</translation>
    </message>
    <message>
        <source>Governor %1</source>
        <translation>Governor %1</translation>
    </message>
    <message>
        <source>The governor service has %1; the GPU runs at the driver's default clocks. See the Service page.</source>
        <translation>governor 服务%1；GPU 以驱动程序的默认时钟运行。请查看“服务”页面。</translation>
    </message>
</context>
<context>
    <name>BackupsPage</name>
    <message>
        <source>Backups</source>
        <translation>备份</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <source>Before every write the app copies %1 to config.toml.bak-YYYYMMDD-HHMMSS next to it. Pick one to see what differs from the current file; Restore puts it back (the current file is backed up first, so nothing is lost).</source>
        <translation>每次写入前，应用都会在 %1 旁边复制一份为 config.toml.bak-YYYYMMDD-HHMMSS。选择一份即可查看它与当前文件的差异；“恢复”会把它还原回去（当前文件会先被备份，因此不会丢失任何内容）。</translation>
    </message>
    <message>
        <source>Copies, newest first</source>
        <translation>副本（最新优先）</translation>
    </message>
    <message>
        <source>Created</source>
        <translation>创建时间</translation>
    </message>
    <message>
        <source>Size</source>
        <translation>大小</translation>
    </message>
    <message>
        <source>File</source>
        <translation>文件</translation>
    </message>
    <message>
        <source>No backups yet.</source>
        <translation>尚无备份。</translation>
    </message>
    <message>
        <source>Difference: backup → current file</source>
        <translation>差异：备份 → 当前文件</translation>
    </message>
    <message>
        <source>Restart the governor after restoring</source>
        <translation>恢复后重启 governor</translation>
    </message>
    <message>
        <source>Restore selected</source>
        <translation>恢复所选项</translation>
    </message>
    <message>
        <source>Make the selected copy the config again (asks for your password).</source>
        <translation>将所选副本重新设为配置（需要输入密码）。</translation>
    </message>
    <message>
        <source>Select a backup to compare it with the current file.</source>
        <translation>选择一份备份以与当前文件进行比较。</translation>
    </message>
    <message>
        <source>Cannot read %1: %2</source>
        <translation>无法读取 %1：%2</translation>
    </message>
    <message>
        <source>Identical to the current file.</source>
        <translation>与当前文件相同。</translation>
    </message>
</context>
<context>
    <name>ConfigPage</name>
    <message>
        <source>Reload from disk</source>
        <translation>从磁盘重新加载</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>放弃所有页面上的编辑，并重新显示 config.toml 的值。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>应用后重启 governor</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>governor 仅在启动时读取 config.toml。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>应用更改</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>会请求一次密码（pkexec），为 config.toml 创建带时间戳的备份并写入 %1。另一配置页面上待处理的编辑也会一并写入。</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>未找到 %1。Cyan Skillfish SMU governor 似乎未安装。</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 已安装，但 %2 不存在。</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan Skillfish SMU governor 已安装并已配置。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>身份验证已取消。</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec 失败（%1）</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>不支持的服务操作：%1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 没有 D-Bus 接口。</translation>
    </message>
</context>
<context>
    <name>CyanSkillfishTtBackend</name>
    <message>
        <source>%1 was not found. The Cyan Skillfish SMU governor does not appear to be installed.</source>
        <translation>未找到 %1。Cyan Skillfish SMU governor 似乎未安装。</translation>
    </message>
    <message>
        <source>%1 is installed, but %2 does not exist.</source>
        <translation>%1 已安装，但 %2 不存在。</translation>
    </message>
    <message>
        <source>Cyan Skillfish SMU governor is installed and configured.</source>
        <translation>Cyan Skillfish SMU governor 已安装并已配置。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>身份验证已取消。</translation>
    </message>
    <message>
        <source>pkexec failed (%1)</source>
        <translation>pkexec 失败（%1）</translation>
    </message>
    <message>
        <source>Unsupported service action: %1</source>
        <translation>不支持的服务操作：%1</translation>
    </message>
    <message>
        <source>%1 has no D-Bus interface.</source>
        <translation>%1 没有 D-Bus 接口。</translation>
    </message>
</context>
<context>
    <name>GovernorBus</name>
    <message>
        <source>busctl failed (%1)</source>
        <translation>busctl 失败（%1）</translation>
    </message>
    <message>
        <source>%1 is not on the system bus (governor stopped, or [dbus] enabled = false).</source>
        <translation>%1 不在系统总线上（governor 已停止，或 [dbus] enabled = false）。</translation>
    </message>
    <message>
        <source>The governor answered on the bus, but its properties could not be read.</source>
        <translation>governor 在总线上做出了应答，但无法读取其属性。</translation>
    </message>
    <message>
        <source>Authentication was cancelled.</source>
        <translation>身份验证已取消。</translation>
    </message>
</context>
<context>
    <name>GovernorConfig</name>
    <message>
        <source>Unsupported GPU usage method: %1</source>
        <translation>不支持的 GPU 使用率检测方式：%1</translation>
    </message>
    <message>
        <source>Unsupported temperature source: %1</source>
        <translation>不支持的温度来源：%1</translation>
    </message>
    <message>
        <source>Unsupported gpu.set-method: %1</source>
        <translation>不支持的 gpu.set-method：%1</translation>
    </message>
    <message>
        <source>flush-every must be at least 1</source>
        <translation>flush-every 必须至少为 1</translation>
    </message>
    <message>
        <source>timing.intervals must be at least 1 µs</source>
        <translation>timing.intervals 必须至少为 1 µs</translation>
    </message>
    <message>
        <source>timing.intervals.adjust must not be shorter than sample</source>
        <translation>timing.intervals.adjust 不能短于 sample</translation>
    </message>
    <message>
        <source>timing.burst-samples must be 0 (off) or 1..%1</source>
        <translation>timing.burst-samples 必须为 0（关闭）或 1..%1</translation>
    </message>
    <message>
        <source>timing.down-events must be at least 1</source>
        <translation>timing.down-events 必须至少为 1</translation>
    </message>
    <message>
        <source>timing.ramp-rates.normal must be positive</source>
        <translation>timing.ramp-rates.normal 必须为正数</translation>
    </message>
    <message>
        <source>timing.ramp-rates.burst must be greater than normal</source>
        <translation>timing.ramp-rates.burst 必须大于 normal</translation>
    </message>
    <message>
        <source>frequency-thresholds.adjust cannot be negative</source>
        <translation>frequency-thresholds.adjust 不能为负数</translation>
    </message>
    <message>
        <source>Frequencies cannot be negative</source>
        <translation>频率不能为负数</translation>
    </message>
    <message>
        <source>frequency-range.min must not exceed frequency-range.max</source>
        <translation>frequency-range.min 不能超过 frequency-range.max</translation>
    </message>
    <message>
        <source>load-target needs 0 &lt;= lower &lt;= upper &lt; 1</source>
        <translation>load-target 需要满足 0 &lt;= lower &lt;= upper &lt; 1</translation>
    </message>
    <message>
        <source>temperature.throttling must be 0..100 °C</source>
        <translation>temperature.throttling 必须在 0..100 °C 之间</translation>
    </message>
    <message>
        <source>temperature.throttling_recovery must be below temperature.throttling (or 0)</source>
        <translation>temperature.throttling_recovery 必须低于 temperature.throttling（或为 0）</translation>
    </message>
</context>
<context>
    <name>GpuUsagePage</name>
    <message>
        <source>GPU Usage</source>
        <translation>GPU 使用率</translation>
    </message>
    <message>
        <source>patch GPU usage in gpu_metrics</source>
        <translation>在 gpu_metrics 中修正 GPU 使用率</translation>
    </message>
    <message>
        <source>Writes the load the governor measures into a patched gpu_metrics table and bind-mounts it over sysfs, so MangoHud, Steam's overlay, radeontop and this app show a real percentage instead of the 655% bug.</source>
        <translation>将 governor 测得的负载写入一个已修正的 gpu_metrics 表，并将其绑定挂载到 sysfs 上，使 MangoHud、Steam 的叠加层、radeontop 及本应用显示真实的百分比，而不是 655% 的错误值。</translation>
    </message>
    <message>
        <source>patch the GPU clock in hwmon</source>
        <translation>在 hwmon 中修正 GPU 时钟</translation>
    </message>
    <message>
        <source>Replaces the hwmon freq1_input with the clock read from the SMU. Fixes the wrong frequency reporting of sysfs, mainly after the 8-core unlock. Independent of fix-metrics.</source>
        <translation>用从 SMU 读取的时钟值替换 hwmon 的 freq1_input。修正 sysfs 报告的错误频率，主要出现在解锁 8 核之后。与 fix-metrics 相互独立。</translation>
    </message>
    <message>
        <source>Load method:</source>
        <translation>负载检测方式：</translation>
    </message>
    <message>
        <source>Temperature source:</source>
        <translation>温度来源：</translation>
    </message>
    <message>
        <source>Flush the patched metrics table every N update cycles (default 10).</source>
        <translation>每 N 个更新周期刷新一次已修正的指标表（默认 10）。</translation>
    </message>
    <message>
        <source>apply clock/voltage via:</source>
        <translation>通过以下方式应用时钟/电压：</translation>
    </message>
    <message>
        <source>the new values</source>
        <translation>新的值</translation>
    </message>
    <message>
        <source>Only the keys this app manages ([gpu-usage], [gpu], [frequency-range], [timing], [frequency-thresholds], [load-target], [temperature], [dbus]) are written; every other line of the file, including comments and the safe-points table, stays as it is. Before each write a copy named config.toml.bak-YYYYMMDD-HHMMSS is made next to it.</source>
        <translation>仅写入本应用管理的键（[gpu-usage]、[gpu]、[frequency-range]、[timing]、[frequency-thresholds]、[load-target]、[temperature]、[dbus]）；文件中其余所有行，包括注释和安全点表，均保持不变。每次写入前，会在其旁边创建一份名为 config.toml.bak-YYYYMMDD-HHMMSS 的副本。</translation>
    </message>
    <message>
        <source>(config.toml does not exist yet; applying creates it)</source>
        <translation>（config.toml 尚不存在；应用后会创建它）</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>从磁盘重新加载</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>放弃所有页面上的编辑，并重新显示 config.toml 的值。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>应用后重启 governor</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>governor 仅在启动时读取 config.toml。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>应用更改</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>会请求一次密码（pkexec），为 config.toml 创建带时间戳的备份并写入 %1。另一配置页面上待处理的编辑也会一并写入。</translation>
    </message>
</context>
<context>
    <name>JournalView</name>
    <message>
        <source>Filter:</source>
        <translation>筛选：</translation>
    </message>
    <message>
        <source>text or regular expression, case-insensitive</source>
        <translation>文本或正则表达式，不区分大小写</translation>
    </message>
    <message>
        <source>Follow</source>
        <translation>跟随</translation>
    </message>
    <message>
        <source>Keep scrolling to the newest line. Untick to read without being moved.</source>
        <translation>持续滚动到最新一行。取消勾选可在不被移动的情况下阅读。</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <source>Forget the lines shown so far; new entries keep coming in.</source>
        <translation>清除目前显示的行；新条目会持续进入。</translation>
    </message>
    <message>
        <source>journalctl -u %1 -f — connecting…</source>
        <translation>journalctl -u %1 -f — 正在连接……</translation>
    </message>
    <message>
        <source>Following journalctl -u %1; up to %2 lines are kept.</source>
        <translation>正在跟随 journalctl -u %1；最多保留 %2 行。</translation>
    </message>
    <message>
        <source>exit code %1</source>
        <translation>退出代码 %1</translation>
    </message>
    <message>
        <source>journalctl stopped (%1). Your user may need to be in the systemd-journal or wheel group to read system units. Retrying in %2 s…</source>
        <translation>journalctl 已停止（%1）。您的用户可能需要加入 systemd-journal 或 wheel 用户组才能读取系统单元。将在 %2 秒后重试……</translation>
    </message>
    <message>
        <source>journalctl ended; restarting in %1 s…</source>
        <translation>journalctl 已结束；将在 %1 秒后重启……</translation>
    </message>
    <message>
        <source>journalctl is not available on this system; the journal cannot be shown.</source>
        <translation>此系统上没有 journalctl；无法显示日志。</translation>
    </message>
    <message>
        <source> (taken literally, not a valid regular expression)</source>
        <translation> （按字面处理，不是有效的正则表达式）</translation>
    </message>
    <message>
        <source>%1 of %2 lines match%3.</source>
        <translation>%2 行中有 %1 行匹配%3。</translation>
    </message>
</context>
<context>
    <name>KernelWatch</name>
    <message>
        <source>the kernel log is not readable by this user (add it to the systemd-journal group)</source>
        <translation>此用户无法读取内核日志（请将其加入 systemd-journal 用户组）</translation>
    </message>
    <message>
        <source>journalctl -k exited with code %1</source>
        <translation>journalctl -k 以代码 %1 退出</translation>
    </message>
    <message>
        <source>journalctl is not available</source>
        <translation>journalctl 不可用</translation>
    </message>
</context>
<context>
    <name>LaunchOptionsBox</name>
    <message>
        <source>Per game</source>
        <translation>按游戏设置</translation>
    </message>
    <message>
        <source>The governor ships a wrapper that applies one of these settings for a single program and turns performance mode off again when it exits, which also restores the normal range. Pick what the game should get, copy the line into its launcher.</source>
        <translation>governor 自带一个包装脚本，可为单个程序应用以下设置之一，并在该程序退出时再次关闭性能模式，从而恢复正常范围。选择要为该游戏设置的内容，并将该行复制到其启动器中。</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>对象：</translation>
    </message>
    <message>
        <source>Copy</source>
        <translation>复制</translation>
    </message>
    <message>
        <source>Copy the line to the clipboard.</source>
        <translation>将该行复制到剪贴板。</translation>
    </message>
    <message>
        <source>Clock to pin, MHz.</source>
        <translation>要固定的时钟，单位 MHz。</translation>
    </message>
    <message>
        <source>Lower limit, 0 = no limit.</source>
        <translation>下限，0 = 无限制。</translation>
    </message>
    <message>
        <source>Upper limit, 0 = no limit.</source>
        <translation>上限，0 = 无限制。</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>无限制</translation>
    </message>
    <message>
        <source>to</source>
        <translation>至</translation>
    </message>
    <message>
        <source>Below this load the governor clocks down.</source>
        <translation>低于此负载时，governor 会降低时钟。</translation>
    </message>
    <message>
        <source>Above this load the governor clocks up.</source>
        <translation>高于此负载时，governor 会提高时钟。</translation>
    </message>
    <message>
        <source>Throttle above this temperature.</source>
        <translation>高于此温度时降频。</translation>
    </message>
    <message>
        <source>Resume normal clocks below this temperature.</source>
        <translation>低于此温度时恢复正常时钟。</translation>
    </message>
    <message>
        <source> Fraction of 1, as in config.toml.</source>
        <translation> 以 1 为基准的小数，与 config.toml 中一致。</translation>
    </message>
    <message>
        <source>The lower limit is above the upper limit.</source>
        <translation>下限高于上限。</translation>
    </message>
    <message>
        <source>The lower load target must be below the upper one.</source>
        <translation>负载目标下限必须低于上限。</translation>
    </message>
    <message>
        <source>Recovery must be below the throttling temperature.</source>
        <translation>恢复温度必须低于降频温度。</translation>
    </message>
    <message>
        <source>Copied</source>
        <translation>已复制</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>GPU load</source>
        <translation>GPU 负载</translation>
    </message>
    <message>
        <source>GPU clock</source>
        <translation>GPU 时钟</translation>
    </message>
    <message>
        <source>GPU temperature</source>
        <translation>GPU 温度</translation>
    </message>
    <message>
        <source>Power</source>
        <translation>功率</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>Governor</source>
        <translation>Governor</translation>
    </message>
    <message>
        <source>Copied: %1</source>
        <translation>已复制：%1</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>概览</translation>
    </message>
    <message>
        <source>GPU Usage</source>
        <translation>GPU 使用率</translation>
    </message>
    <message>
        <source>Tuning</source>
        <translation>调校</translation>
    </message>
    <message>
        <source>Safe points</source>
        <translation>安全点</translation>
    </message>
    <message>
        <source>Performance</source>
        <translation>性能</translation>
    </message>
    <message>
        <source>Backups</source>
        <translation>备份</translation>
    </message>
    <message>
        <source>Service</source>
        <translation>服务</translation>
    </message>
    <message>
        <source>Settings</source>
        <translation>设置</translation>
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
        <source>Load %1%</source>
        <translation>负载 %1%</translation>
    </message>
    <message>
        <source>Load N/A</source>
        <translation>负载 不可用</translation>
    </message>
    <message>
        <source>performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>running</source>
        <translation>运行中</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>未安装</translation>
    </message>
    <message>
        <source>stopped</source>
        <translation>已停止</translation>
    </message>
    <message>
        <source>%1
%2
Governor %3</source>
        <translation>%1
%2
Governor %3</translation>
    </message>
    <message>
        <source>Still running in the tray; use Quit in its menu to leave.</source>
        <translation>仍在系统托盘中运行；使用其菜单中的“退出”来关闭。</translation>
    </message>
    <message>
        <source>%1 unapplied changes. Close anyway?</source>
        <translation>%1 项未应用的更改。仍要关闭吗？</translation>
    </message>
    <message>
        <source>The governor service is not running.</source>
        <translation>governor 服务未在运行。</translation>
    </message>
    <message>
        <source>N/A</source>
        <translation>不可用</translation>
    </message>
    <message>
        <source>No frequency sensor.</source>
        <translation>没有频率传感器。</translation>
    </message>
    <message>
        <source>No temperature sensor.</source>
        <translation>没有温度传感器。</translation>
    </message>
    <message>
        <source>average_socket_power of the gpu_metrics table (whole APU); the SMU reports it in 24.8 fixed point, shown here in watts</source>
        <translation>gpu_metrics 表中的 average_socket_power（整个 APU）；SMU 以 24.8 定点格式报告，此处以瓦特显示</translation>
    </message>
    <message>
        <source>The gpu_metrics table reports no socket power.</source>
        <translation>gpu_metrics 表未报告插槽功率。</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>无限制</translation>
    </message>
    <message>
        <source>On</source>
        <translation>开</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>关</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>当前范围 %1–%2 MHz</translation>
    </message>
    <message>
        <source>D-Bus not reachable.</source>
        <translation>D-Bus 不可达。</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>缺失</translation>
    </message>
    <message>
        <source>Running</source>
        <translation>运行中</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>失败</translation>
    </message>
    <message>
        <source>Stopped</source>
        <translation>已停止</translation>
    </message>
    <message>
        <source> pages have</source>
        <translation> 个页面存在</translation>
    </message>
    <message>
        <source> page has</source>
        <translation> 个页面存在</translation>
    </message>
    <message>
        <source> and </source>
        <translation> 和 </translation>
    </message>
    <message>
        <source>Unapplied changes: %1</source>
        <translation>未应用的更改：%1</translation>
    </message>
    <message>
        <source>Invalid values</source>
        <translation>值无效</translation>
    </message>
    <message>
        <source>Could not write config.toml</source>
        <translation>无法写入 config.toml</translation>
    </message>
    <message>
        <source>Configuration applied</source>
        <translation>配置已应用</translation>
    </message>
    <message>
        <source>, backup: %1</source>
        <translation>，备份：%1</translation>
    </message>
    <message>
        <source>Saved, but the restart failed</source>
        <translation>已保存，但重启失败</translation>
    </message>
    <message>
        <source>config.toml was updated, but the governor could not be restarted.

</source>
        <translation>config.toml 已更新，但 governor 无法重启。

</translation>
    </message>
    <message>
        <source>No error text was returned.</source>
        <translation>未返回错误文本。</translation>
    </message>
    <message>
        <source> — restart failed</source>
        <translation> — 重启失败</translation>
    </message>
    <message>
        <source>, governor restarted</source>
        <translation>，governor 已重启</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>应用安全点</translation>
    </message>
    <message>
        <source>Write %1 safe points (%2–%3 MHz) to config.toml?

The governor will scale along this curve. A point the silicon cannot hold freezes the board under load; a backup of the current file is made first and can be restored from the Backups page.</source>
        <translation>要将 %1 个安全点（%2–%3 MHz）写入 config.toml 吗？

governor 将沿此曲线调节。若某个点超出芯片承受能力，负载下会导致主板死机；当前文件会先被备份，可从“备份”页面恢复。</translation>
    </message>
    <message>
        <source>Safe points applied</source>
        <translation>安全点已应用</translation>
    </message>
    <message>
        <source>none saved</source>
        <translation>未保存任何内容</translation>
    </message>
    <message>
        <source>No profile named '%1' (known: %2).</source>
        <translation>没有名为“%1”的配置方案（已知的有：%2）。</translation>
    </message>
    <message>
        <source>Profile '%1' loaded into the forms; apply to write it</source>
        <translation>配置方案“%1”已载入表单；应用即可写入</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>应用配置方案</translation>
    </message>
    <message>
        <source>Apply '%1'? The %2 unapplied changes, they are discarded.</source>
        <translation>应用“%1”吗？%2 项未应用的更改将被丢弃。</translation>
    </message>
    <message>
        <source>Invalid profile</source>
        <translation>配置方案无效</translation>
    </message>
    <message>
        <source>'%1' cannot be applied: %2</source>
        <translation>无法应用“%1”：%2</translation>
    </message>
    <message>
        <source>Profile '%1' applied</source>
        <translation>配置方案“%1”已应用</translation>
    </message>
    <message>
        <source>Profile '%1' applied, governor restarted.</source>
        <translation>配置方案“%1”已应用，governor 已重启。</translation>
    </message>
    <message>
        <source>Bind that command to a key in your desktop's shortcut settings; it reaches the running app and applies the profile.</source>
        <translation>将此命令绑定到桌面环境快捷键设置中的某个按键；它会连接到正在运行的应用并应用该配置方案。</translation>
    </message>
    <message>
        <source>Save profile</source>
        <translation>保存配置方案</translation>
    </message>
    <message>
        <source>Profile name:</source>
        <translation>配置方案名称：</translation>
    </message>
    <message>
        <source>Replace profile</source>
        <translation>替换配置方案</translation>
    </message>
    <message>
        <source>'%1' exists. Replace it with the current form values?</source>
        <translation>“%1”已存在。要用当前表单的值替换它吗？</translation>
    </message>
    <message>
        <source>Profile '%1' saved</source>
        <translation>配置方案“%1”已保存</translation>
    </message>
    <message>
        <source>Delete profile</source>
        <translation>删除配置方案</translation>
    </message>
    <message>
        <source>Delete profile '%1'?</source>
        <translation>删除配置方案“%1”吗？</translation>
    </message>
    <message>
        <source>Profile '%1' deleted</source>
        <translation>配置方案“%1”已删除</translation>
    </message>
    <message>
        <source>Replace %1 with %2?

The current file is backed up first.</source>
        <translation>要用 %2 替换 %1 吗？

当前文件会先被备份。</translation>
    </message>
    <message>
        <source>
The governor is restarted afterwards.</source>
        <translation>
之后将重启 governor。</translation>
    </message>
    <message>
        <source>Restore backup</source>
        <translation>恢复备份</translation>
    </message>
    <message>
        <source>Could not restore the backup</source>
        <translation>无法恢复备份</translation>
    </message>
    <message>
        <source>Restored %1</source>
        <translation>已恢复 %1</translation>
    </message>
    <message>
        <source>Governor %1 is available (installed %2); see the Service page</source>
        <translation>Governor %1 可用（已安装 %2）；请查看“服务”页面</translation>
    </message>
    <message>
        <source>Governor update %1 is available.</source>
        <translation>Governor 更新 %1 可用。</translation>
    </message>
    <message>
        <source>Export telemetry history</source>
        <translation>导出遥测历史记录</translation>
    </message>
    <message>
        <source>CSV files (*.csv)</source>
        <translation>CSV 文件 (*.csv)</translation>
    </message>
    <message>
        <source>Could not write the CSV file</source>
        <translation>无法写入 CSV 文件</translation>
    </message>
    <message>
        <source>%1 samples (%2–%3) written to %4</source>
        <translation>已将 %1 个样本（%2–%3）写入 %4</translation>
    </message>
    <message>
        <source>Compare with an earlier telemetry export</source>
        <translation>与之前导出的遥测数据比较</translation>
    </message>
    <message>
        <source>CSV files (*.csv);;All files (*)</source>
        <translation>CSV 文件 (*.csv);;所有文件 (*)</translation>
    </message>
    <message>
        <source>Could not read the CSV file</source>
        <translation>无法读取 CSV 文件</translation>
    </message>
    <message>
        <source>Nothing to compare</source>
        <translation>没有可比较的内容</translation>
    </message>
    <message>
        <source>The file holds no samples with a readable time.</source>
        <translation>此文件不包含任何具有可读时间的样本。</translation>
    </message>
    <message>
        <source>%1 reference samples from %2 drawn dashed</source>
        <translation>已以虚线绘制来自 %2 的 %1 个参考样本</translation>
    </message>
    <message>
        <source>Export diagnostics</source>
        <translation>导出诊断信息</translation>
    </message>
    <message>
        <source>Text files (*.txt)</source>
        <translation>文本文件 (*.txt)</translation>
    </message>
    <message>
        <source>Export failed</source>
        <translation>导出失败</translation>
    </message>
    <message>
        <source>Diagnostics exported</source>
        <translation>诊断信息已导出</translation>
    </message>
    <message>
        <source>Saved to %1.

Read it before attaching it to a bug report and remove anything you do not want to share.</source>
        <translation>已保存到 %1。

在将其附加到错误报告之前请先阅读，并删除您不想分享的内容。</translation>
    </message>
    <message>
        <source>systemctl %1: done</source>
        <translation>systemctl %1：已完成</translation>
    </message>
    <message>
        <source>systemctl %1 failed</source>
        <translation>systemctl %1 失败</translation>
    </message>
    <message>
        <source>The test ended because of '%1' on the Performance page.</source>
        <translation>由于“性能”页面上的“%1”，测试已结束。</translation>
    </message>
    <message>
        <source>%1: done</source>
        <translation>%1：已完成</translation>
    </message>
    <message>
        <source>%1 failed</source>
        <translation>%1 失败</translation>
    </message>
    <message>
        <source>The governor returned no error text.</source>
        <translation>governor 未返回错误文本。</translation>
    </message>
    <message>
        <source>Performance mode on</source>
        <translation>性能模式已开启</translation>
    </message>
    <message>
        <source>Performance mode off</source>
        <translation>性能模式已关闭</translation>
    </message>
    <message>
        <source>Fixed frequency %1 MHz</source>
        <translation>固定频率 %1 MHz</translation>
    </message>
    <message>
        <source>Runtime range %1–%2 MHz</source>
        <translation>运行时范围 %1–%2 MHz</translation>
    </message>
    <message>
        <source>Load target %1–%2 %</source>
        <translation>负载目标 %1–%2 %</translation>
    </message>
    <message>
        <source>not set</source>
        <translation>未设置</translation>
    </message>
    <message>
        <source>Temperature %1 °C / %2</source>
        <translation>温度 %1 °C / %2</translation>
    </message>
    <message>
        <source>Runtime values copied to the Tuning page; apply to save them</source>
        <translation>运行时的值已复制到“调校”页面；应用即可保存</translation>
    </message>
    <message>
        <source>for %1 s</source>
        <translation>持续 %1 秒</translation>
    </message>
    <message>
        <source>until you stop it</source>
        <translation>直到您停止它</translation>
    </message>
    <message>
        <source> and run %1 for load</source>
        <translation> 并运行 %1 以产生负载</translation>
    </message>
    <message>
        <source>Test a safe point</source>
        <translation>测试一个安全点</translation>
    </message>
    <message>
        <source>Pin the GPU to %1 MHz at %2 mV %3%4?

The governor applies this pair as given and stops its automatic scaling; thermal throttling stays active. A point the silicon cannot hold freezes the board under load. Nothing is written to config.toml. You will be asked for your password (the TestMode interface is root-only).</source>
        <translation>要将 GPU 固定为 %1 MHz、%2 mV %3%4 吗？

governor 会按原样应用此组合并停止自动调节；热降频仍保持生效。若芯片无法承受此点，负载下会导致主板死机。不会写入 config.toml。系统会要求您输入密码（TestMode 接口仅限 root）。</translation>
    </message>
    <message>
        <source>Test mode failed</source>
        <translation>测试模式失败</translation>
    </message>
    <message>
        <source>%1 could not be started (%2)</source>
        <translation>无法启动 %1（%2）</translation>
    </message>
    <message>
        <source>Test mode: %1 MHz @ %2 mV</source>
        <translation>测试模式：%1 MHz @ %2 mV</translation>
    </message>
    <message>
        <source>aborted after a GPU error in the kernel log</source>
        <translation>因内核日志中出现 GPU 错误而中止</translation>
    </message>
    <message>
        <source>crashed</source>
        <translation>已崩溃</translation>
    </message>
    <message>
        <source>exited with code %1</source>
        <translation>以代码 %1 退出</translation>
    </message>
    <message>
        <source>%1 %2 while the point was pinned</source>
        <translation>固定该点期间 %1 %2</translation>
    </message>
    <message>
        <source>Test of %1 MHz @ %2 mV %3 after %4 s</source>
        <translation>%1 MHz @ %2 mV 的测试 %3，持续 %4 秒后结束</translation>
    </message>
    <message>
        <source> under %1 load</source>
        <translation> 在 %1 负载下</translation>
    </message>
    <message>
        <source>peak %1 °C</source>
        <translation>峰值 %1 °C</translation>
    </message>
    <message>
        <source>clock %1–%2 MHz</source>
        <translation>时钟 %1–%2 MHz</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>时钟 %1 MHz</translation>
    </message>
    <message>
        <source>⚠ kernel: %1</source>
        <translation>⚠ 内核：%1</translation>
    </message>
    <message>
        <source> (+%1 more)</source>
        <translation> （另有 %1 条）</translation>
    </message>
    <message>
        <source>kernel log not watched</source>
        <translation>未监控内核日志</translation>
    </message>
    <message>
        <source>no GPU errors in the kernel log</source>
        <translation>内核日志中没有 GPU 错误</translation>
    </message>
    <message>
        <source>. The governor scales normally again.</source>
        <translation>。governor 已恢复正常调节。</translation>
    </message>
    <message>
        <source>ended by the timer</source>
        <translation>由计时器结束</translation>
    </message>
    <message>
        <source>Could not end the test</source>
        <translation>无法结束测试</translation>
    </message>
    <message>
        <source>

Restarting the governor on the Service page also ends test mode.</source>
        <translation>

在“服务”页面重启 governor 也会结束测试模式。</translation>
    </message>
    <message>
        <source>The governor stopped; the test ended with it.</source>
        <translation>governor 已停止；测试也随之结束。</translation>
    </message>
    <message>
        <source>, %1 s left</source>
        <translation>，剩余 %1 秒</translation>
    </message>
    <message>
        <source> ⚠ %1.</source>
        <translation> ⚠ %1。</translation>
    </message>
    <message>
        <source> %1 is loading the GPU.</source>
        <translation> %1 正在为 GPU 施加负载。</translation>
    </message>
    <message>
        <source> Load the GPU yourself.</source>
        <translation> 请自行为 GPU 施加负载。</translation>
    </message>
    <message>
        <source> Kernel log not readable, no hang detection.</source>
        <translation> 无法读取内核日志，不进行卡死检测。</translation>
    </message>
    <message>
        <source> Kernel log watched.</source>
        <translation> 正在监控内核日志。</translation>
    </message>
    <message>
        <source>Testing %1 MHz @ %2 mV%3.%4%5 Watch the Overview; Stop test returns to normal scaling.</source>
        <translation>正在测试 %1 MHz @ %2 mV%3。%4%5 请观察“概览”页面；点击“停止测试”可恢复正常调节。</translation>
    </message>
</context>
<context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>概览</translation>
    </message>
    <message>
        <source>Runtime status</source>
        <translation>运行时状态</translation>
    </message>
    <message>
        <source>Governor service</source>
        <translation>Governor 服务</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metrics 覆盖</translation>
    </message>
    <message>
        <source>GPU load sensor</source>
        <translation>GPU 负载传感器</translation>
    </message>
    <message>
        <source>fix-metrics (saved)</source>
        <translation>fix-metrics（已保存）</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature</source>
        <translation>GPU 负载、时钟与温度</translation>
    </message>
    <message>
        <source>Window:</source>
        <translation>窗口：</translation>
    </message>
    <message>
        <source>How much of the last %1 minutes the chart shows; the export always contains everything kept.</source>
        <translation>图表显示最近 %1 分钟中的多少内容；导出始终包含保留的全部数据。</translation>
    </message>
    <message>
        <source>Export CSV…</source>
        <translation>导出 CSV……</translation>
    </message>
    <message>
        <source>Saves every kept sample (time, load, clock, temperature, socket power, performance mode, runtime range) as a CSV file.</source>
        <translation>将保留的每个样本（时间、负载、时钟、温度、插槽功率、性能模式、运行时范围）保存为 CSV 文件。</translation>
    </message>
    <message>
        <source>Compare…</source>
        <translation>比较……</translation>
    </message>
    <message>
        <source>Load an earlier CSV export and draw it dashed behind the live lines, newest sample at the right edge, with both sessions' averages below the chart.</source>
        <translation>载入之前导出的 CSV 文件，并以虚线绘制在实时曲线之后，最新样本位于右边缘，两个会话的平均值显示在图表下方。</translation>
    </message>
    <message>
        <source>Clear</source>
        <translation>清除</translation>
    </message>
    <message>
        <source>Remove the reference session from the chart.</source>
        <translation>从图表中移除参考会话。</translation>
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
        <translation>负载 %</translation>
    </message>
    <message>
        <source>Temperature °C</source>
        <translation>温度 °C</translation>
    </message>
    <message>
        <source>Clock MHz</source>
        <translation>时钟 MHz</translation>
    </message>
    <message>
        <source>Load % (ref)</source>
        <translation>负载 %（参考）</translation>
    </message>
    <message>
        <source>Temperature °C (ref)</source>
        <translation>温度 °C（参考）</translation>
    </message>
    <message>
        <source>Clock MHz (ref)</source>
        <translation>时钟 MHz（参考）</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metrics 表</translation>
    </message>
    <message>
        <source>BC-250 usually exposes no gpu_busy_percent sensor, but the governor measures the load itself and publishes it in its patched gpu_metrics table while fix-metrics is on and the service runs. The app reads it from there; a missing sensor is shown as N/A, never as 0%.</source>
        <translation>BC-250 通常不提供 gpu_busy_percent 传感器，但在 fix-metrics 开启且服务运行时，governor 会自行测量负载并发布到其修正后的 gpu_metrics 表中。本应用从该处读取；传感器缺失时显示为“不可用”，而不是 0%。</translation>
    </message>
    <message>
        <source>Not installed</source>
        <translation>未安装</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>活动</translation>
    </message>
    <message>
        <source>SubState: %1</source>
        <translation>子状态：%1</translation>
    </message>
    <message>
        <source>Failed</source>
        <translation>失败</translation>
    </message>
    <message>
        <source>The unit failed; see the Service page for the journal.</source>
        <translation>该单元已失败；请在“服务”页面查看日志。</translation>
    </message>
    <message>
        <source>Inactive</source>
        <translation>未活动</translation>
    </message>
    <message>
        <source>unknown</source>
        <translation>未知</translation>
    </message>
    <message>
        <source>Mounted</source>
        <translation>已挂载</translation>
    </message>
    <message>
        <source>Not mounted</source>
        <translation>未挂载</translation>
    </message>
    <message>
        <source>The governor bind-mounts its patched gpu_metrics table over the sysfs file while fix-metrics is on and the service runs.</source>
        <translation>在 fix-metrics 开启且服务运行时，governor 会将其修正后的 gpu_metrics 表绑定挂载到 sysfs 文件上。</translation>
    </message>
    <message>
        <source>Enabled</source>
        <translation>已启用</translation>
    </message>
    <message>
        <source>Disabled</source>
        <translation>已禁用</translation>
    </message>
    <message>
        <source>Value saved in config.toml.</source>
        <translation>值已保存在 config.toml 中。</translation>
    </message>
    <message>
        <source>Unavailable</source>
        <translation>不可用</translation>
    </message>
    <message>
        <source>Available</source>
        <translation>可用</translation>
    </message>
    <message>
        <source>load %1%</source>
        <translation>负载 %1%</translation>
    </message>
    <message>
        <source>load N/A</source>
        <translation>负载 不可用</translation>
    </message>
    <message>
        <source>clock %1 MHz</source>
        <translation>时钟 %1 MHz</translation>
    </message>
    <message>
        <source>temperature %1 °C</source>
        <translation>温度 %1 °C</translation>
    </message>
    <message>
        <source>Current: %1</source>
        <translation>当前：%1</translation>
    </message>
    <message>
        <source>. No usable GPU load sensor: %1</source>
        <translation>。没有可用的 GPU 负载传感器：%1</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>可达</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor 在系统总线上做出了应答。</translation>
    </message>
    <message>
        <source>On</source>
        <translation>开</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>关</translation>
    </message>
    <message>
        <source>Current range %1–%2 MHz</source>
        <translation>当前范围 %1–%2 MHz</translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>无限制</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>不可达</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>未知</translation>
    </message>
    <message>
        <source>Needs the governor running with [dbus] enabled.</source>
        <translation>需要 governor 在 [dbus] enabled 的情况下运行。</translation>
    </message>
    <message>
        <source>GPU load, clock and temperature, last %1</source>
        <translation>GPU 负载、时钟与温度，最近 %1</translation>
    </message>
    <message>
        <source> (%1 min %2 s recorded)</source>
        <translation> （已记录 %1 分 %2 秒）</translation>
    </message>
    <message>
        <source>Reference %1 (%2): %3.</source>
        <translation>参考 %1（%2）：%3。</translation>
    </message>
    <message>
        <source> Live window (%1): %2.</source>
        <translation> 实时窗口（%1）：%2。</translation>
    </message>
    <message>
        <source>No readable gpu_metrics v2.x table under /sys/class/drm/card*/device.</source>
        <translation>在 /sys/class/drm/card*/device 下没有可读的 gpu_metrics v2.x 表。</translation>
    </message>
    <message>
        <source> (patched)</source>
        <translation> （已修正）</translation>
    </message>
    <message>
        <source> (raw)</source>
        <translation> （原始）</translation>
    </message>
    <message>
        <source>none</source>
        <translation>无</translation>
    </message>
    <message>
        <source>Table as published by the governor (fix-metrics): the GFX activity is its own measurement.</source>
        <translation>由 governor 发布的表（fix-metrics）：GFX 活动是它自己测量的结果。</translation>
    </message>
    <message>
        <source>Raw kernel table: the GFX activity is the broken firmware value (the 655% bug); enable fix-metrics to get a real one.</source>
        <translation>原始内核表：GFX 活动是损坏的固件值（655% 错误）；启用 fix-metrics 可获得真实的值。</translation>
    </message>
    <message>
        <source>Raw kernel table.</source>
        <translation>原始内核表。</translation>
    </message>
</context>
<context>
    <name>PerformancePage</name>
    <message>
        <source>Performance</source>
        <translation>性能</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <source>Runtime controls over D-Bus (com.cyanskillfish.Governor): they apply immediately, need no password and are lost at the next governor restart. config.toml is unchanged; use the Tuning page to persist values. Performance mode opens the full safe-points range; a fixed frequency pins the clock; the load target and temperature thresholds change how the governor scales without touching the mode.</source>
        <translation>通过 D-Bus（com.cyanskillfish.Governor）进行的运行时控制：立即生效，无需密码，但在下次重启 governor 时会丢失。config.toml 保持不变；请使用“调校”页面来持久保存这些值。性能模式会开放完整的安全点范围；固定频率会锁定时钟；负载目标和温度阈值会改变 governor 的调节方式，而不涉及模式本身。</translation>
    </message>
    <message>
        <source>Runtime state</source>
        <translation>运行时状态</translation>
    </message>
    <message>
        <source>D-Bus</source>
        <translation>D-Bus</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>Current range</source>
        <translation>当前范围</translation>
    </message>
    <message>
        <source>Range at start ([frequency-range])</source>
        <translation>启动时的范围（[frequency-range]）</translation>
    </message>
    <message>
        <source>Allowed range (safe points)</source>
        <translation>允许范围（安全点）</translation>
    </message>
    <message>
        <source>Load target (lower / upper)</source>
        <translation>负载目标（下限 / 上限）</translation>
    </message>
    <message>
        <source>Temperature (throttle / recover)</source>
        <translation>温度（降频 / 恢复）</translation>
    </message>
    <message>
        <source>Controls</source>
        <translation>控制</translation>
    </message>
    <message>
        <source>Performance mode: off</source>
        <translation>性能模式：关闭</translation>
    </message>
    <message>
        <source>SetEnabled: on lets the governor use the whole allowed range and react faster to load; off returns to the range the governor started with.</source>
        <translation>SetEnabled：开启后 governor 可使用整个允许范围，并更快地响应负载变化；关闭后恢复到 governor 启动时的范围。</translation>
    </message>
    <message>
        <source>Mode:</source>
        <translation>模式：</translation>
    </message>
    <message>
        <source>SetFixedFrequency: performance mode with the clock pinned here. Must lie inside the allowed range.</source>
        <translation>SetFixedFrequency：带固定时钟的性能模式，此处固定该时钟。必须位于允许范围之内。</translation>
    </message>
    <message>
        <source>Pin clock</source>
        <translation>固定时钟</translation>
    </message>
    <message>
        <source>Fixed frequency:</source>
        <translation>固定频率：</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>无限制</translation>
    </message>
    <message>
        <source>Lower clock limit for now; No limit = the lowest safe point.</source>
        <translation>当前的时钟下限；“无限制”= 最低的安全点。</translation>
    </message>
    <message>
        <source>Upper clock limit for now; No limit = the highest safe point.</source>
        <translation>当前的时钟上限；“无限制”= 最高的安全点。</translation>
    </message>
    <message>
        <source>Set range</source>
        <translation>设置范围</translation>
    </message>
    <message>
        <source>SetRange(min, max): a temporary range, leaves performance mode.</source>
        <translation>SetRange(min, max)：一个临时范围，会退出性能模式。</translation>
    </message>
    <message>
        <source>to</source>
        <translation>至</translation>
    </message>
    <message>
        <source>Runtime range:</source>
        <translation>运行时范围：</translation>
    </message>
    <message>
        <source>Below this GPU load the governor steps the clock down.</source>
        <translation>低于此 GPU 负载时，governor 会逐步降低时钟。</translation>
    </message>
    <message>
        <source>Above this GPU load the governor steps the clock up.</source>
        <translation>高于此 GPU 负载时，governor 会逐步提高时钟。</translation>
    </message>
    <message>
        <source>Set load target</source>
        <translation>设置负载目标</translation>
    </message>
    <message>
        <source>SetLoadTarget(lower, upper): the load band the governor keeps the GPU in, until the next restart. Does not touch performance mode.</source>
        <translation>SetLoadTarget(lower, upper)：governor 使 GPU 保持在此负载区间内，直到下次重启。不影响性能模式。</translation>
    </message>
    <message>
        <source>Load target:</source>
        <translation>负载目标：</translation>
    </message>
    <message>
        <source>Above this temperature the governor lowers the maximum clock.</source>
        <translation>高于此温度时，governor 会降低最高时钟。</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>未设置</translation>
    </message>
    <message>
        <source>Below this temperature the full range is allowed again; Not set = the governor's own hysteresis.</source>
        <translation>低于此温度时，将再次允许完整范围；“未设置”= governor 自身的迟滞逻辑。</translation>
    </message>
    <message>
        <source>Set temperatures</source>
        <translation>设置温度</translation>
    </message>
    <message>
        <source>SetTemperatureThresholds(throttling, recovery): until the next restart. Does not touch performance mode.</source>
        <translation>SetTemperatureThresholds(throttling, recovery)：持续到下次重启。不影响性能模式。</translation>
    </message>
    <message>
        <source>Temperature:</source>
        <translation>温度：</translation>
    </message>
    <message>
        <source>Copy runtime values to the Tuning page</source>
        <translation>将运行时的值复制到“调校”页面</translation>
    </message>
    <message>
        <source>Puts the current range, load target and temperatures into the Tuning form so you can save them to config.toml.</source>
        <translation>将当前的范围、负载目标和温度值填入“调校”表单，以便您将其保存到 config.toml。</translation>
    </message>
    <message>
        <source>Reachable</source>
        <translation>可达</translation>
    </message>
    <message>
        <source>com.cyanskillfish.Governor answers on the system bus.</source>
        <translation>com.cyanskillfish.Governor 在系统总线上做出了应答。</translation>
    </message>
    <message>
        <source>On</source>
        <translation>开</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>关</translation>
    </message>
    <message>
        <source>Enabled property of the PerformanceMode interface.</source>
        <translation>PerformanceMode 接口的 Enabled 属性。</translation>
    </message>
    <message>
        <source>Performance mode: on</source>
        <translation>性能模式：开启</translation>
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
        <translation>未设置</translation>
    </message>
    <message>
        <source>%1 °C / %2</source>
        <translation>%1 °C / %2</translation>
    </message>
    <message>
        <source>Unreachable</source>
        <translation>不可达</translation>
    </message>
    <message>
        <source>Unknown</source>
        <translation>未知</translation>
    </message>
    <message>
        <source>The governor service is not running (Service page).</source>
        <translation>governor 服务未在运行（见“服务”页面）。</translation>
    </message>
    <message>
        <source>D-Bus is off in config.toml: enable it on the Tuning page and apply with a restart.</source>
        <translation>config.toml 中 D-Bus 已关闭：请在“调校”页面启用它，并在应用时重启。</translation>
    </message>
    <message>
        <source>The governor did not answer on the system bus.</source>
        <translation>governor 未在系统总线上做出应答。</translation>
    </message>
    <message>
        <source>Controls are disabled: %1</source>
        <translation>控件已禁用：%1</translation>
    </message>
    <message>
        <source>the lower load target must be below the upper one</source>
        <translation>负载目标下限必须低于上限</translation>
    </message>
    <message>
        <source>recovery must be below the throttling temperature (or Not set)</source>
        <translation>恢复温度必须低于降频温度（或设为“未设置”）</translation>
    </message>
</context>
<context>
    <name>ProfilesBox</name>
    <message>
        <source>Profiles</source>
        <translation>配置方案</translation>
    </message>
    <message>
        <source>Named snapshots of this page and the GPU Usage page, stored for your user only. Safe points are not part of a profile.</source>
        <translation>本页面与“GPU 使用率”页面的命名快照，仅为当前用户存储。安全点不属于配置方案的一部分。</translation>
    </message>
    <message>
        <source>Load into forms</source>
        <translation>载入表单</translation>
    </message>
    <message>
        <source>Fills the Tuning and GPU Usage forms; nothing is written until you apply.</source>
        <translation>填充“调校”和“GPU 使用率”表单；在您应用之前不会写入任何内容。</translation>
    </message>
    <message>
        <source>Apply now</source>
        <translation>立即应用</translation>
    </message>
    <message>
        <source>Writes the profile to config.toml (backup first, one password prompt) and restarts the governor. Pending edits on the config pages are discarded.</source>
        <translation>将配置方案写入 config.toml（先备份，需输入一次密码）并重启 governor。配置页面上待处理的编辑将被丢弃。</translation>
    </message>
    <message>
        <source>Save current as…</source>
        <translation>将当前内容另存为……</translation>
    </message>
    <message>
        <source>Stores the values in the forms right now (applied or not) under a name.</source>
        <translation>以指定名称保存表单当前的值（无论是否已应用）。</translation>
    </message>
    <message>
        <source>Delete</source>
        <translation>删除</translation>
    </message>
    <message>
        <source>Copy hotkey command</source>
        <translation>复制快捷键命令</translation>
    </message>
    <message>
        <source>Puts a command line on the clipboard that applies this profile in the running app. Bind it to a key in System Settings → Shortcuts (KDE) or Keyboard → Custom Shortcuts (GNOME) to switch profiles without opening the window.</source>
        <translation>将一条命令行复制到剪贴板，该命令可在正在运行的应用中应用此配置方案。将其绑定到“系统设置 → 快捷键”（KDE）或“键盘 → 自定义快捷键”（GNOME）中的某个按键，即可在不打开窗口的情况下切换配置方案。</translation>
    </message>
    <message>
        <source>No profiles yet: set the forms up and use Save current as…</source>
        <translation>尚无配置方案：请先设置好表单，然后使用“将当前内容另存为……”</translation>
    </message>
</context>
<context>
    <name>SafePointsPage</name>
    <message>
        <source>Safe points</source>
        <translation>安全点</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>从磁盘重新加载</translation>
    </message>
    <message>
        <source>The [[safe-points]] of %1 define the frequency/voltage curve the governor scales along. It never leaves the range between the lowest and the highest point; [frequency-range] and the runtime controls are clamped to it. Edit with care: wrong voltages can freeze or damage the board. Apply checks the governor's rules and the hard rails (%2–%3 mV, up to %4 MHz) first and makes a backup.</source>
        <translation>%1 中的 [[safe-points]] 定义了 governor 调节所依据的频率/电压曲线。governor 永远不会超出最低点与最高点之间的范围；[frequency-range] 及运行时控制都会被限制在此范围内。请谨慎编辑：错误的电压可能导致主板死机甚至损坏。应用前会先检查 governor 的规则及硬性边界（%2–%3 mV，最高 %4 MHz），并进行备份。</translation>
    </message>
    <message>
        <source>Points</source>
        <translation>点</translation>
    </message>
    <message>
        <source>Frequency</source>
        <translation>频率</translation>
    </message>
    <message>
        <source>Voltage</source>
        <translation>电压</translation>
    </message>
    <message>
        <source>Add point</source>
        <translation>添加点</translation>
    </message>
    <message>
        <source>Adds a point after the selected one, halfway to the next.</source>
        <translation>在所选点之后插入一个新点，位于其与下一个点之间的中点处。</translation>
    </message>
    <message>
        <source>Remove</source>
        <translation>移除</translation>
    </message>
    <message>
        <source>Sort</source>
        <translation>排序</translation>
    </message>
    <message>
        <source>Order the rows by frequency (Apply does this anyway).</source>
        <translation>按频率对各行排序（应用时无论如何都会执行此操作）。</translation>
    </message>
    <message>
        <source>Curve</source>
        <translation>曲线</translation>
    </message>
    <message>
        <source>Apply safe points</source>
        <translation>应用安全点</translation>
    </message>
    <message>
        <source>Writes the [[safe-points]] blocks to config.toml (asks for your password, makes a backup first).</source>
        <translation>将 [[safe-points]] 块写入 config.toml（会要求输入密码，并先进行备份）。</translation>
    </message>
    <message>
        <source>Restart the governor afterwards</source>
        <translation>之后重启 governor</translation>
    </message>
    <message>
        <source>The governor reads config.toml only at start.</source>
        <translation>governor 仅在启动时读取 config.toml。</translation>
    </message>
    <message>
        <source>Revert</source>
        <translation>还原</translation>
    </message>
    <message>
        <source>Back to the points in the file.</source>
        <translation>恢复为文件中的点。</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>出厂默认值</translation>
    </message>
    <message>
        <source>The active points of the governor's default-config.toml: %1</source>
        <translation>governor 的 default-config.toml 中的现用点：%1</translation>
    </message>
    <message>
        <source>Test a point before saving it (runtime, root)</source>
        <translation>保存前先测试一个点（运行时，需 root）</translation>
    </message>
    <message>
        <source>SetTestMode over D-Bus pins this frequency and voltage right now and stops the automatic scaling; the governor's thermal throttling stays active. Nothing is written to config.toml and the governor applies the pair as given, so stay inside the hard rails. Put the GPU under load while it runs. Stop test (or the timer) switches performance mode off, which returns to normal scaling with the start-up range. A point the silicon cannot hold freezes the board; have your work saved.</source>
        <translation>通过 D-Bus 调用 SetTestMode 会立即固定此频率和电压，并停止自动调节；governor 的热降频仍保持生效。不会写入 config.toml，且 governor 会按原样应用此组合，因此请务必保持在硬性边界之内。运行期间请为 GPU 施加负载。“停止测试”（或计时器）会关闭性能模式，恢复为使用启动范围的正常调节。若芯片无法承受此点，会导致主板死机；请先保存好您的工作。</translation>
    </message>
    <message>
        <source>Load:</source>
        <translation>负载：</translation>
    </message>
    <message>
        <source>A GPU load generator found on PATH, started with the test and killed when it ends. If it dies while the point is pinned, that is reported.</source>
        <translation>在 PATH 中找到的 GPU 负载生成工具，会随测试一同启动，并在测试结束时终止。若在固定该点期间它意外退出，系统会予以报告。</translation>
    </message>
    <message>
        <source>No load tool found (vkmark, glmark2, vkcube or glxgears): run a game or benchmark yourself during the test.</source>
        <translation>未找到负载工具（vkmark、glmark2、vkcube 或 glxgears）：请在测试期间自行运行一个游戏或基准测试。</translation>
    </message>
    <message>
        <source>Prefilled from the selected row; edit freely.</source>
        <translation>根据所选行预先填充；可自由编辑。</translation>
    </message>
    <message>
        <source>Until stopped</source>
        <translation>直到停止为止</translation>
    </message>
    <message>
        <source>The app ends the test by itself after this time (0 = only by Stop test).</source>
        <translation>应用会在此时间后自行结束测试（0 = 仅通过“停止测试”结束）。</translation>
    </message>
    <message>
        <source>Frequency:</source>
        <translation>频率：</translation>
    </message>
    <message>
        <source>Voltage:</source>
        <translation>电压：</translation>
    </message>
    <message>
        <source>For:</source>
        <translation>对象：</translation>
    </message>
    <message>
        <source>Start test</source>
        <translation>开始测试</translation>
    </message>
    <message>
        <source>Asks for your password (pkexec): the TestMode interface is root-only.</source>
        <translation>会要求输入密码（pkexec）：TestMode 接口仅限 root。</translation>
    </message>
    <message>
        <source>Stop test</source>
        <translation>停止测试</translation>
    </message>
    <message>
        <source>Add to table</source>
        <translation>添加到表格</translation>
    </message>
    <message>
        <source>Puts this frequency/voltage pair into the safe-points table above (sorted by frequency, replacing a point at the same frequency). Apply to save.</source>
        <translation>将此频率/电压组合添加到上方的安全点表中（按频率排序，相同频率的点会被替换）。应用以保存。</translation>
    </message>
    <message>
        <source>Finding how far your own board can go (higher top frequency, lower voltages) is a job for %1: it tests one step at a time under a verified load and can install the result. Edit the points by hand only if you know what the silicon tolerates.</source>
        <translation>探明自己主板能达到的极限（更高的最高频率、更低的电压）是 %1 的工作：它会在经过验证的负载下逐步测试，并可以安装测试结果。只有在了解芯片承受能力的情况下，才应手动编辑这些点。</translation>
    </message>
    <message>
        <source>%1 points: %2 MHz @ %3 mV up to %4 MHz @ %5 mV.</source>
        <translation>%1 个点：从 %2 MHz @ %3 mV 到 %4 MHz @ %5 mV。</translation>
    </message>
    <message>
        <source>No [[safe-points]]; the governor would fall back to 350 MHz @ 700 mV and 2000 MHz @ 1000 mV.</source>
        <translation>没有 [[safe-points]]；governor 将回退到 350 MHz @ 700 mV 和 2000 MHz @ 1000 mV。</translation>
    </message>
    <message>
        <source>raises the top frequency from %1 to %2 MHz</source>
        <translation>将最高频率从 %1 提高到 %2 MHz</translation>
    </message>
    <message>
        <source>lowers the voltage at %1 existing point(s)</source>
        <translation>降低了 %1 个现有点的电压</translation>
    </message>
    <message>
        <source>This change %1: an unstable point can freeze the board under load. Verify it with bc250-gpu-oc-bisect first.</source>
        <translation>此更改%1：不稳定的点可能在负载下导致主板死机。请先使用 bc250-gpu-oc-bisect 进行验证。</translation>
    </message>
    <message>
        <source> and </source>
        <translation> 和 </translation>
    </message>
    <message>
        <source>no limit</source>
        <translation>无限制</translation>
    </message>
    <message>
        <source>Governor (D-Bus): allowed range %1–%2 MHz, current range %3–%4 MHz.</source>
        <translation>Governor（D-Bus）：允许范围 %1–%2 MHz，当前范围 %3–%4 MHz。</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards hard-lock</source>
        <translation>%1 MHz 高于 %2 MHz，许多主板在此频率以上会硬锁死</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV</source>
        <translation>%1 mV 高于 %2 mV</translation>
    </message>
    <message>
        <source>the curve above would give %1 mV at %2 MHz; this is lower</source>
        <translation>按上方曲线，在 %2 MHz 处应为 %1 mV；此值更低</translation>
    </message>
    <message>
        <source>The governor's D-Bus interface is not reachable (service stopped or [dbus] enabled = false).</source>
        <translation>governor 的 D-Bus 接口不可达（服务已停止，或 [dbus] enabled = false）。</translation>
    </message>
</context>
<context>
    <name>ServicePage</name>
    <message>
        <source>Service</source>
        <translation>服务</translation>
    </message>
    <message>
        <source>Check for updates</source>
        <translation>检查更新</translation>
    </message>
    <message>
        <source>Compare the installed RPM with the latest release on GitHub.</source>
        <translation>将已安装的 RPM 与 GitHub 上的最新版本进行比较。</translation>
    </message>
    <message>
        <source>Export diagnostics…</source>
        <translation>导出诊断信息……</translation>
    </message>
    <message>
        <source>Save versions, config.toml, service status, journal and the raw gpu_metrics table to a text file for a bug report.</source>
        <translation>将版本信息、config.toml、服务状态、日志以及原始 gpu_metrics 表保存到一个文本文件中，用于错误报告。</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>刷新</translation>
    </message>
    <message>
        <source>Unit found</source>
        <translation>已找到单元</translation>
    </message>
    <message>
        <source>Active</source>
        <translation>活动</translation>
    </message>
    <message>
        <source>Enabled at boot</source>
        <translation>开机时已启用</translation>
    </message>
    <message>
        <source>gpu_metrics override</source>
        <translation>gpu_metrics 覆盖</translation>
    </message>
    <message>
        <source>Version</source>
        <translation>版本</translation>
    </message>
    <message>
        <source>Start</source>
        <translation>启动</translation>
    </message>
    <message>
        <source>Stop</source>
        <translation>停止</translation>
    </message>
    <message>
        <source>Restart</source>
        <translation>重启</translation>
    </message>
    <message>
        <source>Enable at boot</source>
        <translation>设为开机启用</translation>
    </message>
    <message>
        <source>Disable at boot</source>
        <translation>设为开机禁用</translation>
    </message>
    <message>
        <source>%1 %2 (asks for your password).</source>
        <translation>%1 %2（会要求输入密码）。</translation>
    </message>
    <message>
        <source>systemctl status</source>
        <translation>systemctl status</translation>
    </message>
    <message>
        <source>Journal (live)</source>
        <translation>日志（实时）</translation>
    </message>
    <message>
        <source>Yes</source>
        <translation>是</translation>
    </message>
    <message>
        <source>No — %1</source>
        <translation>否 — %1</translation>
    </message>
    <message>
        <source>Yes (%1)</source>
        <translation>是（%1）</translation>
    </message>
    <message>
        <source>No (%1)</source>
        <translation>否（%1）</translation>
    </message>
    <message>
        <source>not loaded</source>
        <translation>未加载</translation>
    </message>
    <message>
        <source>No</source>
        <translation>否</translation>
    </message>
    <message>
        <source>release notes</source>
        <translation>发行说明</translation>
    </message>
    <message>
        <source>releases</source>
        <translation>发行版本</translation>
    </message>
    <message>
        <source>Package not installed</source>
        <translation>软件包未安装</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>正在检查……</translation>
    </message>
</context>
<context>
    <name>SettingsPage</name>
    <message>
        <source>Settings</source>
        <translation>设置</translation>
    </message>
    <message>
        <source>These settings concern the app, not the governor. They are stored per user.</source>
        <translation>这些设置仅涉及本应用，与 governor 无关，按用户单独存储。</translation>
    </message>
    <message>
        <source>System tray</source>
        <translation>系统托盘</translation>
    </message>
    <message>
        <source>Show a tray icon with the GPU load, clock and temperature in its tooltip</source>
        <translation>显示系统托盘图标，其工具提示中包含 GPU 负载、时钟和温度</translation>
    </message>
    <message>
        <source>Closing the window keeps the app running in the tray</source>
        <translation>关闭窗口后应用仍在系统托盘中运行</translation>
    </message>
    <message>
        <source>Left-click the tray icon to show or hide the window; the menu also toggles performance mode (when D-Bus is reachable) and quits the app.</source>
        <translation>左键单击托盘图标可显示或隐藏窗口；菜单还可切换性能模式（在 D-Bus 可达时）并退出应用。</translation>
    </message>
    <message>
        <source>This desktop offers no system tray (on GNOME, install the AppIndicator extension).</source>
        <translation>此桌面环境不提供系统托盘（在 GNOME 上，请安装 AppIndicator 扩展）。</translation>
    </message>
    <message>
        <source>Start at login</source>
        <translation>登录时启动</translation>
    </message>
    <message>
        <source>Start the app when I log in</source>
        <translation>我登录时启动此应用</translation>
    </message>
    <message>
        <source>…hidden in the tray, without opening the window</source>
        <translation>……隐藏于托盘中，不打开窗口</translation>
    </message>
    <message>
        <source>Governor updates</source>
        <translation>Governor 更新</translation>
    </message>
    <message>
        <source>Check for a newer governor release when the app starts</source>
        <translation>应用启动时检查是否有较新的 governor 版本</translation>
    </message>
    <message>
        <source>One request to api.github.com for the latest release of filippor/cyan-skillfish-governor, compared with the installed RPM. Nothing else is sent. The Service page has the same check as a button.</source>
        <translation>向 api.github.com 发送一次请求，获取 filippor/cyan-skillfish-governor 的最新版本，并与已安装的 RPM 进行比较。不会发送其他任何内容。“服务”页面上有一个按钮可执行相同的检查。</translation>
    </message>
    <message>
        <source>Alerts</source>
        <translation>提醒</translation>
    </message>
    <message>
        <source>Notify when the GPU temperature reaches</source>
        <translation>当 GPU 温度达到以下值时通知</translation>
    </message>
    <message>
        <source>Notify when the governor starts throttling for temperature</source>
        <translation>当 governor 因温度开始降频时通知</translation>
    </message>
    <message>
        <source>Notify when the governor service stops or fails on its own</source>
        <translation>当 governor 服务自行停止或失败时通知</translation>
    </message>
    <message>
        <source>Shown as desktop notifications through the tray icon (in the status bar when the tray is off). One message per event: a temperature alert re-arms once the GPU has cooled 5 °C below its threshold, and the same alert repeats at most every 5 minutes.</source>
        <translation>通过托盘图标显示为桌面通知（托盘关闭时显示在状态栏中）。每个事件仅显示一条消息：温度提醒会在 GPU 降温至阈值以下 5 °C 后重新激活，且同一提醒最多每 5 分钟重复一次。</translation>
    </message>
    <message>
        <source>Could not write %1: %2</source>
        <translation>无法写入 %1：%2</translation>
    </message>
    <message>
        <source>Entry: %1
Command: %2</source>
        <translation>条目：%1
命令：%2</translation>
    </message>
    <message>
        <source>Writes a desktop entry to %1; nothing is installed system-wide.</source>
        <translation>将桌面条目写入 %1；不会进行任何系统级安装。</translation>
    </message>
</context>
<context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>未知</translation>
    </message>
</context>
<context>
    <name>StressRunner</name>
    <message>
        <source>A load tool is already running.</source>
        <translation>已有一个负载工具正在运行。</translation>
    </message>
    <message>
        <source>%1 was not found on PATH.</source>
        <translation>在 PATH 中未找到 %1。</translation>
    </message>
    <message>
        <source>%1 did not start: %2</source>
        <translation>%1 未能启动：%2</translation>
    </message>
</context>
<context>
    <name>Summary</name>
    <message>
        <source>load %1 %</source>
        <translation>负载 %1 %</translation>
    </message>
    <message>
        <source>clock %1 MHz (max %2)</source>
        <translation>时钟 %1 MHz（最高 %2）</translation>
    </message>
    <message>
        <source>%1 °C (max %2)</source>
        <translation>%1 °C（最高 %2）</translation>
    </message>
    <message>
        <source>%1 W</source>
        <translation>%1 W</translation>
    </message>
    <message>
        <source>no readings</source>
        <translation>无读数</translation>
    </message>
</context>
<context>
    <name>Tray</name>
    <message>
        <source>Hide window</source>
        <translation>隐藏窗口</translation>
    </message>
    <message>
        <source>Performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>Apply profile</source>
        <translation>应用配置方案</translation>
    </message>
    <message>
        <source>Quit</source>
        <translation>退出</translation>
    </message>
    <message>
        <source>Show window</source>
        <translation>显示窗口</translation>
    </message>
</context>
<context>
    <name>TuningPage</name>
    <message>
        <source>Tuning</source>
        <translation>调校</translation>
    </message>
    <message>
        <source>Preset:</source>
        <translation>预设：</translation>
    </message>
    <message>
        <source>The form does not match any preset.</source>
        <translation>表单内容与任何预设都不匹配。</translation>
    </message>
    <message>
        <source>Fills the form below; nothing is written until you apply.</source>
        <translation>填充下方表单；在您应用之前不会写入任何内容。</translation>
    </message>
    <message>
        <source>clock limits at start</source>
        <translation>启动时的时钟限制</translation>
    </message>
    <message>
        <source>Lowest clock the governor may choose. 0 (No limit) = lowest safe point.</source>
        <translation>governor 可以选择的最低时钟。0（无限制）= 最低的安全点。</translation>
    </message>
    <message>
        <source>Highest clock the governor may choose. 0 (No limit) = highest safe point.</source>
        <translation>governor 可以选择的最高时钟。0（无限制）= 最高的安全点。</translation>
    </message>
    <message>
        <source>Minimum:</source>
        <translation>最小值：</translation>
    </message>
    <message>
        <source>Maximum:</source>
        <translation>最大值：</translation>
    </message>
    <message>
        <source>Values outside the safe-points table of config.toml are clamped by the governor.</source>
        <translation>超出 config.toml 安全点表范围的值会被 governor 限制在范围内。</translation>
    </message>
    <message>
        <source>when to change the clock</source>
        <translation>何时改变时钟</translation>
    </message>
    <message>
        <source>GPU load above which the governor raises the clock (upper).</source>
        <translation>高于此 GPU 负载时，governor 会提高时钟（上限）。</translation>
    </message>
    <message>
        <source>GPU load below which the governor lowers the clock (lower).</source>
        <translation>低于此 GPU 负载时，governor 会降低时钟（下限）。</translation>
    </message>
    <message>
        <source>Ramp up above:</source>
        <translation>高于此值时升频：</translation>
    </message>
    <message>
        <source>Ramp down below:</source>
        <translation>低于此值时降频：</translation>
    </message>
    <message>
        <source>A wide gap keeps the clock steady; a narrow gap follows the load closely. Governor defaults when the section is missing: 95 % / 80 %.</source>
        <translation>较大的间隔可使时钟保持稳定；较小的间隔会更紧密地跟随负载变化。当该节缺失时，governor 的默认值为 95% / 80%。</translation>
    </message>
    <message>
        <source>thermal throttling</source>
        <translation>热降频</translation>
    </message>
    <message>
        <source>Above this GPU temperature the governor lowers the clock (default 85).</source>
        <translation>高于此 GPU 温度时，governor 会降低时钟（默认 85）。</translation>
    </message>
    <message>
        <source>Not set</source>
        <translation>未设置</translation>
    </message>
    <message>
        <source>Below this temperature throttling ends. Must be lower than the throttling temperature; Not set leaves the key out of config.toml.</source>
        <translation>低于此温度时降频结束。必须低于降频温度；设为“未设置”会使该键不出现在 config.toml 中。</translation>
    </message>
    <message>
        <source>Throttle above:</source>
        <translation>高于此值时降频：</translation>
    </message>
    <message>
        <source>Recover below:</source>
        <translation>低于此值时恢复：</translation>
    </message>
    <message>
        <source>runtime control</source>
        <translation>运行时控制</translation>
    </message>
    <message>
        <source>publish com.cyanskillfish.Governor on the system bus</source>
        <translation>在系统总线上发布 com.cyanskillfish.Governor</translation>
    </message>
    <message>
        <source>Needed by the Performance page of this app and by the cyan-skillfish-performance-mode launch wrapper.</source>
        <translation>本应用的“性能”页面以及 cyan-skillfish-performance-mode 启动包装脚本都需要此项。</translation>
    </message>
    <message>
        <source>control loop</source>
        <translation>控制回路</translation>
    </message>
    <message>
        <source>how often the GPU busy flag is sampled (governor default 2000 µs, shipped file 250 µs). Used by the busy-flag load method.</source>
        <translation>GPU 忙碌标志的采样频率（governor 默认值 2000 µs，出厂文件为 250 µs）。供 busy-flag 负载检测方式使用。</translation>
    </message>
    <message>
        <source>how often the clock target is recomputed (governor default 10 × sample, shipped file 100 000 µs). Must not be shorter than the sample interval.</source>
        <translation>重新计算时钟目标的频率（governor 默认值为 sample 的 10 倍，出厂文件为 100 000 µs）。不能短于采样间隔。</translation>
    </message>
    <message>
        <source>Sample every:</source>
        <translation>采样间隔：</translation>
    </message>
    <message>
        <source>Adjust every:</source>
        <translation>调整间隔：</translation>
    </message>
    <message>
        <source>how fast the clock moves towards its target (default 1 MHz/ms).</source>
        <translation>时钟向目标值变化的速度（默认 1 MHz/ms）。</translation>
    </message>
    <message>
        <source>ramp rate while in burst mode; must be above the normal rate (governor default 200 × normal, shipped file 50 MHz/ms).</source>
        <translation>突发模式下的变化速率；必须高于正常速率（governor 默认值为 normal 的 200 倍，出厂文件为 50 MHz/ms）。</translation>
    </message>
    <message>
        <source>Ramp rate:</source>
        <translation>变化速率：</translation>
    </message>
    <message>
        <source>Burst ramp rate:</source>
        <translation>突发变化速率：</translation>
    </message>
    <message>
        <source> samples</source>
        <translation> 个样本</translation>
    </message>
    <message>
        <source>Off</source>
        <translation>关</translation>
    </message>
    <message>
        <source>this many busy samples in a row switch to the burst ramp rate, so a game that suddenly loads the GPU gets its clock quickly (1..%1; Off leaves the key out, shipped file 60).</source>
        <translation>连续出现这么多个忙碌样本时，将切换到突发变化速率，使突然为 GPU 施加负载的游戏能快速获得其时钟（1..%1；“关闭”会使该键不出现，出厂文件为 60）。</translation>
    </message>
    <message>
        <source>Burst after:</source>
        <translation>触发突发条件：</translation>
    </message>
    <message>
        <source> events</source>
        <translation> 次事件</translation>
    </message>
    <message>
        <source>adjust cycles with the load below the lower target before the clock steps down (governor default 10, shipped file 5). Higher = stickier clock.</source>
        <translation>在时钟降频之前，负载低于下限目标的调整周期数（governor 默认值 10，出厂文件为 5）。数值越高，时钟越“粘滞”。</translation>
    </message>
    <message>
        <source>Step down after:</source>
        <translation>降频条件：</translation>
    </message>
    <message>
        <source>Faster sampling and adjusting react sooner but cost CPU time. Burst mode shortens the lag when a game starts; more down-events stop the clock from dropping during short pauses.</source>
        <translation>更快的采样和调整响应更迅速，但会消耗更多 CPU 时间。突发模式可缩短游戏启动时的延迟；更多的降频事件数可防止时钟在短暂停顿期间下降。</translation>
    </message>
    <message>
        <source>dead band</source>
        <translation>死区</translation>
    </message>
    <message>
        <source>a non-burst clock change smaller than this is not applied (default 10). Avoids constant tiny SMU writes.</source>
        <translation>小于此值的非突发时钟变化不会被应用（默认 10）。可避免频繁的微小 SMU 写入。</translation>
    </message>
    <message>
        <source>Ignore changes below:</source>
        <translation>忽略低于此值的变化：</translation>
    </message>
    <message>
        <source>the tuning sections</source>
        <translation>调校各节</translation>
    </message>
    <message>
        <source>The governor reports a safe-points range of %1–%2 MHz; values outside it are clamped.</source>
        <translation>governor 报告的安全点范围为 %1–%2 MHz；超出此范围的值会被限制。</translation>
    </message>
    <message>
        <source>Reload from disk</source>
        <translation>从磁盘重新加载</translation>
    </message>
    <message>
        <source>Discard the edits on every page and show the values of config.toml again.</source>
        <translation>放弃所有页面上的编辑，并重新显示 config.toml 的值。</translation>
    </message>
    <message>
        <source>Restart the governor after applying</source>
        <translation>应用后重启 governor</translation>
    </message>
    <message>
        <source>The governor reads config.toml at start only.</source>
        <translation>governor 仅在启动时读取 config.toml。</translation>
    </message>
    <message>
        <source>Apply changes</source>
        <translation>应用更改</translation>
    </message>
    <message>
        <source>Asks for your password once (pkexec), makes a timestamped backup of config.toml and writes %1. Pending edits on the other config page are written too.</source>
        <translation>会请求一次密码（pkexec），为 config.toml 创建带时间戳的备份并写入 %1。另一配置页面上待处理的编辑也会一并写入。</translation>
    </message>
</context>
<context>
    <name>UpdateResult</name>
    <message>
        <source>not installed</source>
        <translation>未安装</translation>
    </message>
    <message>
        <source>%1 (latest: unknown — %2)</source>
        <translation>%1（最新版本：未知 — %2）</translation>
    </message>
    <message>
        <source>%1 (latest: unknown)</source>
        <translation>%1（最新版本：未知）</translation>
    </message>
    <message>
        <source>%1 → %2 available (%3)</source>
        <translation>%1 → %2 可用（%3）</translation>
    </message>
    <message>
        <source>%1 (up to date, latest release %2)</source>
        <translation>%1（已是最新，最新版本为 %2）</translation>
    </message>
    <message>
        <source>%1 (latest release: %2, %3)</source>
        <translation>%1（最新版本：%2，%3）</translation>
    </message>
</context>
<context>
    <name>config_pages</name>
    <message>
        <source>Samples the GPU's single busy bit at timing.intervals.sample (default). Cheapest, works everywhere.</source>
        <translation>以 timing.intervals.sample 的频率采样 GPU 的单个忙碌位（默认）。开销最小，适用于任何情况。</translation>
    </message>
    <message>
        <source>Scans every process that holds the GPU open. More CPU work than busy-flag.</source>
        <translation>扫描每个打开了 GPU 的进程。比 busy-flag 消耗更多 CPU。</translation>
    </message>
    <message>
        <source>Reads the kernel's own load figure. Needs a patched kernel, which stock Bazzite does not have.</source>
        <translation>读取内核自身的负载数值。需要经过修补的内核，而原生 Bazzite 没有此内核。</translation>
    </message>
    <message>
        <source>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl; keeps a DRM device handle open while the governor runs (default).</source>
        <translation>AMDGPU_INFO_SENSOR_GPU_TEMP ioctl；governor 运行期间会保持一个 DRM 设备句柄处于打开状态（默认）。</translation>
    </message>
    <message>
        <source>Reads the amdgpu hwmon temp1_input instead, so no DRM client stays open. Same sensor.</source>
        <translation>改为读取 amdgpu hwmon 的 temp1_input，因此不会保持任何 DRM 客户端打开。传感器相同。</translation>
    </message>
    <message>
        <source>Talks to the SMU directly (bc250collective's API); applies the safe-points voltage with the clock (default).</source>
        <translation>直接与 SMU 通信（使用 bc250collective 的 API）；随时钟一起应用安全点电压（默认）。</translation>
    </message>
    <message>
        <source>Goes through the amdgpu sysfs interface (pp_od_clk_voltage) instead of the SMU.</source>
        <translation>通过 amdgpu sysfs 接口（pp_od_clk_voltage）而非 SMU。</translation>
    </message>
    <message>
        <source>Shipped defaults</source>
        <translation>出厂默认值</translation>
    </message>
    <message>
        <source>Quiet</source>
        <translation>安静</translation>
    </message>
    <message>
        <source>Responsive</source>
        <translation>灵敏</translation>
    </message>
    <message>
        <source>Maximum clock</source>
        <translation>最高时钟</translation>
    </message>
    <message>
        <source>The values of the config.toml the governor package installs.</source>
        <translation>governor 软件包安装的 config.toml 中的值。</translation>
    </message>
    <message>
        <source>Lowest clocks that still keep up: ramps up late, tops out at 1500 MHz, throttles at 80 °C.</source>
        <translation>仍能维持运行的最低时钟：升频较晚，最高为 1500 MHz，80 °C 时降频。</translation>
    </message>
    <message>
        <source>Ramps up early and allows the full safe range, at the cost of more heat and power.</source>
        <translation>较早升频并允许使用完整的安全范围，代价是更高的发热和功耗。</translation>
    </message>
    <message>
        <source>Stays near the top of the safe range; close to a fixed clock while leaving thermal throttling on.</source>
        <translation>保持在安全范围的较高水平；接近固定时钟，同时保留热降频功能。</translation>
    </message>
    <message>
        <source>Custom</source>
        <translation>自定义</translation>
    </message>
    <message>
        <source>No limit</source>
        <translation>无限制</translation>
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
        <translation>&lt;h1&gt;%1 &lt;small&gt;v%2&lt;/small&gt;&lt;/h1&gt;
&lt;p&gt;这是 &lt;b&gt;cyan-skillfish-governor-smu&lt;/b&gt;（&lt;b&gt;AMD BC-250&lt;/b&gt;（Cyan Skillfish APU，gfx1013）在 &lt;b&gt;Bazzite&lt;/b&gt;
上使用的 GPU governor）的一个小型前端。该 governor 必须已经安装；本应用编辑其配置的一个节，并控制其
systemd 服务。系统上的其他任何内容都不会被触碰。&lt;/p&gt;

&lt;h2&gt;概览&lt;/h2&gt;
&lt;p&gt;显示服务是否正在运行、governor 已修正的 &lt;code&gt;gpu_metrics&lt;/code&gt; 表是否挂载在 sysfs 之上、GPU 负载
传感器是否可用，以及一张显示 GPU 负载（%）、温度（°C，左侧坐标轴）和时钟（MHz，右侧坐标轴）的图表。
缺失的读数会留出空白，而不会显示虚假的 0。应用在运行期间会保留最近一小时的样本（每两秒一个）；
&lt;b&gt;窗口&lt;/b&gt; 用于选择图表显示其中多长的时间范围（2、10、30 或 60 分钟），&lt;b&gt;导出 CSV……&lt;/b&gt; 会将保留的
每个样本（时间、负载、时钟、温度、插槽功率、性能模式、运行时范围）写入文件。&lt;b&gt;比较……&lt;/b&gt; 会重新
载入这样的文件，并以虚线绘制在实时曲线之后（最新样本位于右边缘，与实时窗口相同），并在图表下方显示
两个会话的平均值和峰值（负载、时钟、温度、插槽功率），以便将配置方案或安全点的更改与之前的运行进行
比较；&lt;b&gt;清除&lt;/b&gt; 会移除它。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;gpu_metrics 表&lt;/b&gt; 区域会解析内核（或 governor）公开的表：各项活动、温度、插槽/GFX/CPU 功率、
GFX、SoC、显存与 Fabric 时钟、降频状态以及 CPU 核心时钟。&lt;i&gt;（已修正）&lt;/i&gt; 表示挂载的是 governor 的
表；&lt;i&gt;（原始）&lt;/i&gt; 是内核自身的表，其在 BC-250 上的 GFX 活动是损坏的 655% 值，不会用作负载数据。&lt;/p&gt;
&lt;p&gt;BC-250 通常没有 &lt;code&gt;gpu_busy_percent&lt;/code&gt; 传感器，但在 &lt;b&gt;fix-metrics&lt;/b&gt; 开启时，governor 会
自行测量负载，并将其发布到它挂载在 sysfs 之上的已修正 &lt;code&gt;gpu_metrics&lt;/code&gt; 表中。应用从该处读取
负载；&lt;code&gt;gpu_busy_percent&lt;/code&gt; 和 &lt;code&gt;radeontop&lt;/code&gt; 是备用方案。若没有任何来源，则显示为
&lt;b&gt;不可用&lt;/b&gt;，而不是具有误导性的 0%，工具提示会说明缺少的内容。GPU 时钟与温度来自 amdgpu hwmon
传感器；在 &lt;code&gt;fix-freq&lt;/code&gt; 开启时，时钟为真实的 SMU 值。&lt;/p&gt;

&lt;h2&gt;GPU 使用率&lt;/h2&gt;
&lt;p&gt;编辑 &lt;code&gt;%3&lt;/code&gt; 的 &lt;code&gt;[gpu-usage]&lt;/code&gt; 节：&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;键&lt;/th&gt;&lt;th&gt;默认值&lt;/th&gt;&lt;th&gt;含义&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-metrics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;将测得的负载写入一个已修正的 &lt;code&gt;gpu_metrics&lt;/code&gt;
表，并将其绑定挂载到 sysfs 上。修正 MangoHud、Steam 叠加层和 radeontop 中 655% 的 GPU 使用率问题。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;fix-freq&lt;/b&gt;&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;同时用从 SMU 读取的时钟修正 &lt;code&gt;current_gfxclk_frequency&lt;/code&gt;。
修正 sysfs 报告的错误频率，主要出现在解锁 8 核之后。与 fix-metrics 相互独立。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;method&lt;/b&gt;&lt;/td&gt;&lt;td&gt;busy-flag&lt;/td&gt;&lt;td&gt;&lt;i&gt;busy-flag&lt;/i&gt; 采样 GPU 的忙碌位；
&lt;i&gt;process&lt;/i&gt; 扫描每个使用 GPU 的进程（消耗更多 CPU）；&lt;i&gt;kernel&lt;/i&gt; 需要经过修补的内核。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;temp-read&lt;/b&gt;&lt;/td&gt;&lt;td&gt;drm&lt;/td&gt;&lt;td&gt;GPU 温度的读取位置：DRM ioctl（会保持一个 DRM 句柄
处于打开状态）或 hwmon 的 &lt;code&gt;temp1_input&lt;/code&gt; 文件。传感器相同。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;flush-every&lt;/b&gt;&lt;/td&gt;&lt;td&gt;10&lt;/td&gt;&lt;td&gt;每 N 个更新周期刷新一次已修正的表。&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;以及 &lt;code&gt;[gpu]&lt;/code&gt; 节：&lt;b&gt;set-method&lt;/b&gt;（&lt;i&gt;smu&lt;/i&gt;，默认值，直接通过 SMU 应用时钟和电压；
&lt;i&gt;kernel&lt;/i&gt; 则改为通过 amdgpu sysfs 接口）。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;应用更改&lt;/b&gt;（在本页面或“调校”页面上）会请求一次密码（pkexec）。它会将当前文件复制为
&lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt;，并写入两个页面上待处理的编辑。只有已知的键会被更改；
文件的其余所有行，包括注释，都会保留。governor 仅在启动时读取该文件，因此除非您取消勾选该选项，
否则之后会重启服务。&lt;/p&gt;

&lt;h2&gt;调校&lt;/h2&gt;
&lt;p&gt;编辑 &lt;code&gt;%3&lt;/code&gt; 的其他各节：&lt;/p&gt;
&lt;table cellpadding="4" cellspacing="0" border="1" width="100%"&gt;
&lt;tr&gt;&lt;th&gt;节&lt;/th&gt;&lt;th&gt;键&lt;/th&gt;&lt;th&gt;含义&lt;/th&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-range]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;min、max&lt;/td&gt;&lt;td&gt;governor 启动时使用的时钟限制，单位 MHz。
&lt;i&gt;无限制&lt;/i&gt;（0）表示不设限制；超出安全点表范围的值会被 governor 限制在范围内。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[load-target]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;upper、lower&lt;/td&gt;&lt;td&gt;当负载高于 &lt;i&gt;upper&lt;/i&gt; 时升频，
低于 &lt;i&gt;lower&lt;/i&gt; 时降频。较大的间隔可使时钟保持稳定，较小的间隔会更紧密地跟随负载。
当该节缺失时，governor 自身的默认值为 95% / 80%；出厂文件使用 65% / 50%。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[temperature]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;throttling、throttling_recovery&lt;/td&gt;&lt;td&gt;高于第一个值时降频
（默认 85 °C）；低于第二个值时恢复，该值为可选项（&lt;i&gt;未设置&lt;/i&gt;），且必须更低。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[dbus]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;enabled&lt;/td&gt;&lt;td&gt;在系统总线上发布 &lt;code&gt;com.cyanskillfish.Governor&lt;/code&gt;。
“性能”页面需要此项；出厂文件会将其开启，而 governor 的内置默认值为关闭。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[timing]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;intervals.sample、intervals.adjust、ramp-rates.normal、ramp-rates.burst、
burst-samples、down-events&lt;/td&gt;&lt;td&gt;控制回路：负载采样与时钟调整的频率（µs）、时钟向目标值移动的速度
（MHz/ms）、连续多少个忙碌样本会切换到更快的突发变化速率（&lt;i&gt;关闭&lt;/i&gt; 表示不设该键），以及在时钟降频前
会经过多少个低负载调整周期。Governor 默认值：2000 µs / 10 倍 sample、1 / 200 倍 normal、关闭、10；
出厂文件使用 250 µs / 100 000 µs、1 / 50、60、5。&lt;/td&gt;&lt;/tr&gt;
&lt;tr&gt;&lt;td&gt;&lt;b&gt;[frequency-thresholds]&lt;/b&gt;&lt;/td&gt;&lt;td&gt;adjust&lt;/td&gt;&lt;td&gt;死区，单位 MHz：小于此值的非突发变化
不会被应用（默认 10）。&lt;/td&gt;&lt;/tr&gt;
&lt;/table&gt;
&lt;p&gt;&lt;b&gt;预设&lt;/b&gt; 会一次性填入频率范围、负载目标和温度（timing 不受影响）：&lt;i&gt;出厂默认值&lt;/i&gt;（软件包自带的
配置）、&lt;i&gt;安静&lt;/i&gt;（时钟较低，升频较晚）、&lt;i&gt;灵敏&lt;/i&gt;（升频较早，完整范围）以及 &lt;i&gt;最高时钟&lt;/i&gt;
（保持在接近顶部的水平）。一旦某个值与所有预设都不同，下拉框就会显示 &lt;i&gt;自定义&lt;/i&gt;。无效的组合（最小值
高于最大值、恢复温度未低于降频温度、调整间隔短于采样间隔、突发速率未高于正常速率）会在表单下方被标记
出来，并阻止应用。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;配置方案&lt;/b&gt; 是本页面与“GPU 使用率”页面上每个值的命名快照（不包含安全点），为当前用户存储在
&lt;code&gt;~/.config/bc250-governor-manager/profiles.json&lt;/code&gt; 中。&lt;i&gt;将当前内容另存为……&lt;/i&gt; 会保存表单当前
显示的内容，无论是否已应用。&lt;i&gt;载入表单&lt;/i&gt; 会填充这两个页面，以便您照常查看和应用；&lt;i&gt;立即应用&lt;/i&gt; 会
将配置方案写入 &lt;code&gt;config.toml&lt;/code&gt;（先备份，需输入一次密码），丢弃待处理的编辑并重启 governor。
在托盘图标开启的情况下，托盘菜单的 &lt;i&gt;应用配置方案&lt;/i&gt; 子菜单可在不打开窗口的情况下执行同样的操作。
对于 &lt;b&gt;键盘快捷键&lt;/b&gt;，&lt;i&gt;复制快捷键命令&lt;/i&gt; 会将 &lt;code&gt;bc250-governor-manager --profile 'Name'&lt;/code&gt;
复制到剪贴板；将其绑定到“系统设置 → 快捷键”（KDE）或“键盘 → 自定义快捷键”（GNOME）中。本应用每个用户
仅运行一个实例：该命令会通过本地套接字连接到正在运行的实例并在那里应用配置方案（需输入一次密码，并有
托盘通知），或者在没有实例运行时启动应用并应用该配置方案。普通的二次启动只会唤起窗口。
&lt;code&gt;--list-profiles&lt;/code&gt; 会打印已保存的名称。&lt;/p&gt;

&lt;h2&gt;安全点&lt;/h2&gt;
&lt;p&gt;&lt;code&gt;%3&lt;/code&gt; 的 &lt;code&gt;[[safe-points]]&lt;/code&gt; 以可编辑表格及频率/电压曲线的形式呈现。
governor 会沿此曲线调节，且永远不会超出其范围；&lt;code&gt;[frequency-range]&lt;/code&gt; 及运行时控制都会被限制
在此范围内。&lt;b&gt;添加点&lt;/b&gt; 会插入到与下一个点之间的中点处，&lt;b&gt;移除&lt;/b&gt; 会删除所选行，&lt;b&gt;出厂默认值&lt;/b&gt;
会载入 governor 自身的表，&lt;b&gt;还原&lt;/b&gt; 会恢复为文件中的内容。在 &lt;b&gt;应用安全点&lt;/b&gt; 可用之前，该列表必须
通过 governor 的规则检查（至少两个点、频率唯一、电压不随频率升高而下降）以及与 bc250-gpu-oc-bisect 共享
的硬性边界（700–1100 mV，最高 2500 MHz）。高于 2000 MHz 或 1000 mV 时，或当某项更改提高了最高频率或
降低了现有电压时，会出现警告：不稳定的点会在负载下导致主板死机。应用时会进行备份并要求输入密码；安全地
探明主板自身的极限是
&lt;a href="https://github.com/RobertoTorino/bc250-bazzite-suite/tree/main/apps/gpu-oc-bisect"&gt;bc250-gpu-oc-bisect&lt;/a&gt; 的工作。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;保存前先测试一个点&lt;/b&gt; 使用 governor 仅限 root 的 &lt;code&gt;TestMode&lt;/code&gt; D-Bus 接口（需一次
&lt;code&gt;pkexec&lt;/code&gt; 提示）：GPU 会被固定为您输入的频率和电压，自动调节随之停止，而热降频仍保持生效。
不会写入 &lt;code&gt;config.toml&lt;/code&gt;。字段会根据所选行预先填充；当高于 2000 MHz / 1000 mV，或电压低于上方
曲线给出的值时，会出现警告。&lt;b&gt;负载&lt;/b&gt; 会在 PATH 中选取一个 GPU 负载生成工具（依次优先选用 vkmark、
glmark2、vkcube 或 glxgears）；它会随测试一同启动，并在测试结束时终止，若它在该点被固定期间意外退出，
状态中会予以说明。若没有此类工具，请自行为 GPU 施加负载并观察“概览”页面。&lt;b&gt;停止测试&lt;/b&gt;、计时器
（默认 60 秒，&lt;i&gt;直到停止为止&lt;/i&gt; = 0）、关闭应用，或在“性能”页面上的任何操作，都会通过关闭性能模式来
结束测试，governor 随之恢复为使用其启动范围的正常调节。随后结果行会报告该点保持了多久、观测到的峰值
温度以及时钟范围；&lt;b&gt;添加到表格&lt;/b&gt; 会将测试过的组合放入安全点表中（经过排序，相同频率的点会被替换），
以便您应用它。在某个点被固定期间，系统会监控 &lt;b&gt;内核日志&lt;/b&gt;（&lt;code&gt;journalctl -k -f&lt;/code&gt;），以发现
amdgpu 故障（环超时、GPU 重置、&lt;code&gt;*ERROR*&lt;/code&gt; 行、SMU 失败）；一旦出现此类日志行，测试会立即中止，
在主板死机之前释放该点，并在结果中引用该日志行。正常完成的测试也会予以说明。读取内核环缓冲区需要加入
&lt;code&gt;systemd-journal&lt;/code&gt;（或 &lt;code&gt;wheel&lt;/code&gt;）用户组；否则状态会提示未监控日志，测试将在无监控的
情况下运行。芯片无法承受的点仍可能比内核记录日志的速度更快地导致主板死机，因此请先保存好您的工作。
只有 smu governor 才具有 D-Bus。&lt;/p&gt;

&lt;h2&gt;性能&lt;/h2&gt;
&lt;p&gt;通过 D-Bus 对 governor 进行运行时控制，与 governor 自身的 &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt;
包装脚本所做的完全相同。这些更改会立即生效，无需密码，但在下次重启 governor 时会丢失；
&lt;code&gt;config.toml&lt;/code&gt; 不受影响。&lt;i&gt;将运行时的值复制到“调校”页面&lt;/i&gt; 会将当前的范围和阈值带入
“调校”页面，以便您保存它们。&lt;/p&gt;
&lt;ul&gt;
&lt;li&gt;&lt;b&gt;性能模式&lt;/b&gt; 是一个切换开关（开启时为红色）：开启时会开放完整的允许（安全点）范围；关闭时则
恢复为 &lt;code&gt;[frequency-range]&lt;/code&gt; 的范围。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;固定时钟&lt;/b&gt; 会锁定频率并开启性能模式。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;设置范围&lt;/b&gt; 应用一个运行时的最小值/最大值。&lt;/li&gt;
&lt;li&gt;&lt;b&gt;设置负载目标&lt;/b&gt; 和 &lt;b&gt;设置温度&lt;/b&gt; 会改变 governor 据以调节的负载区间（下限/上限 %）以及降频/
恢复温度，而不影响性能模式或正在运行的安全点测试。这些字段会跟随 governor 的当前值，并在其发生变化时
重新填充；不可能的组合（下限未低于上限、恢复温度未低于降频温度）会禁用该按钮。&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;当服务未在运行或总线名称未发布时，这些控件会被禁用；原因会显示在控件下方。请在“调校”页面启用
&lt;code&gt;[dbus] enabled&lt;/code&gt;，并在需要时重启 governor。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;按游戏设置&lt;/b&gt; 会为 governor 的 &lt;code&gt;cyan-skillfish-performance-mode&lt;/code&gt; 包装脚本构建启动行：
普通性能模式、&lt;code&gt;--fixed-frequency&lt;/code&gt;、&lt;code&gt;--range&lt;/code&gt;、&lt;code&gt;--load-target&lt;/code&gt; 或
&lt;code&gt;--temperature&lt;/code&gt;，并以 governor 当前的数值预先填充，格式可用于 Steam 启动选项
（&lt;code&gt;… %command%&lt;/code&gt;）、Heroic/Lutris 包装命令，或终端。&lt;b&gt;复制&lt;/b&gt; 会将其放入剪贴板。该包装脚本
会应用该设置、运行游戏，并在游戏退出时关闭性能模式，这也会使 governor 回到其启动范围。它需要像上方的
控件一样启用 D-Bus。&lt;/p&gt;

&lt;h2&gt;备份&lt;/h2&gt;
&lt;p&gt;每次写入都会在配置文件旁边创建一份副本 &lt;code&gt;config.toml.bak-YYYYMMDD-HHMMSS&lt;/code&gt;。本页面会列出
这些副本，显示某份副本与当前文件之间的差异，&lt;b&gt;恢复所选项&lt;/b&gt; 会将该副本还原回去（当前文件会先被备份，
只需输入一次密码）。除非您取消勾选该选项，否则之后会重启 governor。&lt;/p&gt;

&lt;h2&gt;服务&lt;/h2&gt;
&lt;p&gt;启动、停止、重启、启用或禁用 &lt;code&gt;cyan-skillfish-governor-smu.service&lt;/code&gt;，并显示
&lt;code&gt;systemctl status&lt;/code&gt; 的输出以及 &lt;b&gt;实时日志&lt;/b&gt;（&lt;code&gt;journalctl -u … -f&lt;/code&gt;，最近 200 行，
以及在本页面显示期间持续产生的所有内容，最多保留 2000 行）。筛选框接受文本或正则表达式，不区分大小写；
取消勾选 &lt;b&gt;跟随&lt;/b&gt; 可在不被滚动的情况下阅读。读取系统单元需要您的用户加入 &lt;code&gt;wheel&lt;/code&gt; 或
&lt;code&gt;systemd-journal&lt;/code&gt; 用户组，Bazzite 上默认已满足此条件。每次服务操作都会要求输入密码。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;检查更新&lt;/b&gt; 会将已安装的 &lt;code&gt;cyan-skillfish-governor-smu&lt;/code&gt; RPM 与 GitHub 上
&lt;a href="https://github.com/filippor/cyan-skillfish-governor/releases"&gt;filippor/cyan-skillfish-governor&lt;/a&gt;
的最新版本进行比较（向 api.github.com 发送一次请求；除非在“设置”中关闭，否则启动时也会执行此检查）。
较新的版本会以橙色显示，并附有其发行说明的链接。请按照您安装该软件包时所用的方式进行更新：若为分层安装，
则通过 &lt;code&gt;rpm-ostree upgrade&lt;/code&gt; 使用 COPR &lt;code&gt;filippor/bazzite&lt;/code&gt;；否则使用发行版压缩包。&lt;/p&gt;
&lt;p&gt;&lt;b&gt;导出诊断信息……&lt;/b&gt; 会为错误报告写入一个文本文件：应用、governor 和 Bazzite 的版本、CPU/GPU 信息、
&lt;code&gt;config.toml&lt;/code&gt; 及其备份、&lt;code&gt;systemctl status&lt;/code&gt;/&lt;code&gt;cat&lt;/code&gt;、最近 300 行日志、
D-Bus 接口、内核命令行、amdgpu 内核消息、hwmon 传感器，以及原始 &lt;code&gt;gpu_metrics&lt;/code&gt; 表（解析后的
内容及十六进制转储）。在将该文件附加到工单之前，请先阅读并删除您不想分享的内容。&lt;/p&gt;

&lt;h2&gt;设置&lt;/h2&gt;
&lt;p&gt;应用设置，按用户单独存储。&lt;b&gt;系统托盘&lt;/b&gt;：显示一个托盘图标，其工具提示中包含 GPU 负载、时钟、温度、
性能模式和 governor 状态；左键单击可显示或隐藏窗口，菜单可切换性能模式（在 D-Bus 可达时）并退出。勾选
&lt;i&gt;关闭窗口后应用仍在系统托盘中运行&lt;/i&gt; 后，窗口关闭按钮会隐藏到托盘而不是退出；请使用托盘菜单退出。
&lt;b&gt;登录时启动&lt;/b&gt; 会写入 &lt;code&gt;~/.config/autostart/bc250-governor-manager.desktop&lt;/code&gt;（不涉及任何
系统级内容），并可选择通过 &lt;code&gt;--start-in-tray&lt;/code&gt; 以隐藏在托盘中的方式启动。Bazzite 的 KDE Plasma
会话自带原生托盘，因此开箱即用；GNOME 会话则需要 AppIndicator 扩展。&lt;b&gt;提醒&lt;/b&gt; 是通过托盘图标发出的
桌面通知（托盘关闭时仅显示在状态栏中）：GPU 达到您选择的温度、GPU 达到 governor 自身的降频温度（在
D-Bus 可达时为运行时的值，否则为 &lt;code&gt;config.toml&lt;/code&gt; 中的值），以及在应用观察到 governor 服务正在
运行之后该服务停止或失败。温度提醒每次越过阈值时触发一次，并在降温至阈值以下 5 °C 后重新激活；同一提醒
最多每 5 分钟重复一次。&lt;/p&gt;

&lt;h2&gt;较旧的 tt governor&lt;/h2&gt;
&lt;p&gt;使用 &lt;code&gt;--backend tt&lt;/code&gt; 启动时（或在仅加载了 &lt;code&gt;cyan-skillfish-governor-tt.service&lt;/code&gt;
时自动如此），应用将改为管理 &lt;code&gt;/etc/cyan-skillfish-governor-tt/config.toml&lt;/code&gt;。该 governor 没有
fix-metrics、频率范围、D-Bus 或 GitHub 发行版本，因此“GPU 使用率”和“性能”页面、那些“调校”节、
&lt;code&gt;down-events&lt;/code&gt; 字段以及更新检查都会被隐藏，GPU 负载传感器也始终不可用。其余所有内容，包括
&lt;code&gt;[timing]&lt;/code&gt; 和 &lt;code&gt;[frequency-thresholds]&lt;/code&gt;，均工作如常。&lt;/p&gt;

&lt;h2&gt;权限&lt;/h2&gt;
&lt;p&gt;应用以您的普通用户身份运行。只有四项操作需要 root 权限，并通过 &lt;code&gt;pkexec&lt;/code&gt; 执行：备份、
写入 &lt;code&gt;config.toml&lt;/code&gt;、&lt;code&gt;systemctl&lt;/code&gt; 操作以及安全点测试（在仅限 root 的 TestMode
接口上使用 &lt;code&gt;busctl&lt;/code&gt;）。密码由桌面环境的 polkit 代理处理；应用本身永远不会获知密码内容。&lt;/p&gt;

&lt;h2&gt;安装与更新&lt;/h2&gt;
&lt;p&gt;发行版压缩包中包含 &lt;code&gt;install.sh&lt;/code&gt;。它仅为您的用户安装此应用（在
&lt;code&gt;~/.local/share/bc250-governor-manager&lt;/code&gt; 下创建一个包含 PyQt6 的私有 venv、启动器
&lt;code&gt;~/.local/bin/bc250-governor-manager&lt;/code&gt;、一个桌面条目以及图标），使其出现在应用菜单中。
从较新的发行版本再次运行它即可更新，&lt;code&gt;./install.sh --uninstall&lt;/code&gt; 可将其移除。不会使用
rpm-ostree 进行任何分层操作，governor 的配置也永远不会被触碰。&lt;/p&gt;

&lt;h2&gt;链接&lt;/h2&gt;
&lt;ul&gt;
&lt;li&gt;本应用：&lt;a href="%4"&gt;%4&lt;/a&gt;&lt;/li&gt;
&lt;li&gt;governor（filippor，SMU 分支）：&lt;a href="%5"&gt;%5&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;基于 GNU 通用公共许可证 v3.0 或更高版本授权。附带了 Inter 字体（SIL 开放字体许可证）。&lt;/p&gt;
</translation>
    </message>
</context>
<context>
    <name>history</name>
    <message>
        <source>not a telemetry export: no 'time' column</source>
        <translation>不是遥测导出文件：缺少“time”列</translation>
    </message>
    <message>
        <source>not a telemetry export: missing column(s) %1</source>
        <translation>不是遥测导出文件：缺少列 %1</translation>
    </message>
</context>
<context>
    <name>launch_options</name>
    <message>
        <source>Performance mode</source>
        <translation>性能模式</translation>
    </message>
    <message>
        <source>Whole safe-points range, faster reaction to load. Same as the On button.</source>
        <translation>整个安全点范围，对负载反应更快。与“开”按钮作用相同。</translation>
    </message>
    <message>
        <source>Fixed clock</source>
        <translation>固定时钟</translation>
    </message>
    <message>
        <source>--fixed-frequency: pin the GPU clock for this game (must lie in the allowed range).</source>
        <translation>--fixed-frequency：为此游戏固定 GPU 时钟（必须位于允许范围内）。</translation>
    </message>
    <message>
        <source>Clock range</source>
        <translation>时钟范围</translation>
    </message>
    <message>
        <source>--range: a temporary min/max, 0 = no limit.</source>
        <translation>--range：临时的最小值/最大值，0 = 无限制。</translation>
    </message>
    <message>
        <source>Load target</source>
        <translation>负载目标</translation>
    </message>
    <message>
        <source>--load-target: lower/upper GPU load that drives up- and downclocking.</source>
        <translation>--load-target：驱动升频与降频的 GPU 负载下限/上限。</translation>
    </message>
    <message>
        <source>Temperature</source>
        <translation>温度</translation>
    </message>
    <message>
        <source>--temperature: throttle / recovery thresholds in °C.</source>
        <translation>--temperature：降频 / 恢复阈值，单位 °C。</translation>
    </message>
    <message>
        <source>Steam launch options</source>
        <translation>Steam 启动选项</translation>
    </message>
    <message>
        <source>Steam → game → Properties → General → Launch options. Paste the whole line.</source>
        <translation>Steam → 游戏 → 属性 → 常规 → 启动选项。粘贴整行内容。</translation>
    </message>
    <message>
        <source>Heroic / Lutris wrapper</source>
        <translation>Heroic / Lutris 包装脚本</translation>
    </message>
    <message>
        <source>Heroic: game settings → Advanced → Wrapper command. Lutris: Runner options → Command prefix. Only the wrapper part is needed; the launcher appends the game itself.</source>
        <translation>Heroic：游戏设置 → 高级 → Wrapper command。Lutris：Runner options → Command prefix。只需要包装脚本部分；启动器会自行附加游戏本身。</translation>
    </message>
    <message>
        <source>Terminal / script</source>
        <translation>终端 / 脚本</translation>
    </message>
    <message>
        <source>Replace &lt;program&gt; with the command to run.</source>
        <translation>将 &lt;program&gt; 替换为要运行的命令。</translation>
    </message>
</context>
<context>
    <name>main_window</name>
    <message>
        <source>amdgpu hwmon sensor</source>
        <translation>amdgpu hwmon 传感器</translation>
    </message>
    <message>
        <source>gpu_metrics table</source>
        <translation>gpu_metrics 表</translation>
    </message>
</context>
<context>
    <name>pages</name>
    <message>
        <source>2 min</source>
        <translation>2 分钟</translation>
    </message>
    <message>
        <source>10 min</source>
        <translation>10 分钟</translation>
    </message>
    <message>
        <source>30 min</source>
        <translation>30 分钟</translation>
    </message>
    <message>
        <source>60 min</source>
        <translation>60 分钟</translation>
    </message>
    <message>
        <source>average_gfx_activity of the governor's patched gpu_metrics table.</source>
        <translation>governor 已修正的 gpu_metrics 表中的 average_gfx_activity。</translation>
    </message>
    <message>
        <source>amdgpu gpu_busy_percent sysfs sensor.</source>
        <translation>amdgpu gpu_busy_percent sysfs 传感器。</translation>
    </message>
    <message>
        <source>Fallback: radeontop.</source>
        <translation>备用方案：radeontop。</translation>
    </message>
    <message>
        <source>Table</source>
        <translation>表</translation>
    </message>
    <message>
        <source>GFX activity</source>
        <translation>GFX 活动</translation>
    </message>
    <message>
        <source>MM activity</source>
        <translation>MM 活动</translation>
    </message>
    <message>
        <source>GFX temp</source>
        <translation>GFX 温度</translation>
    </message>
    <message>
        <source>SoC temp</source>
        <translation>SoC 温度</translation>
    </message>
    <message>
        <source>Socket power</source>
        <translation>插槽功率</translation>
    </message>
    <message>
        <source>GFX power</source>
        <translation>GFX 功率</translation>
    </message>
    <message>
        <source>CPU power</source>
        <translation>CPU 功率</translation>
    </message>
    <message>
        <source>GFX clock</source>
        <translation>GFX 时钟</translation>
    </message>
    <message>
        <source>Avg GFX clock</source>
        <translation>平均 GFX 时钟</translation>
    </message>
    <message>
        <source>SoC clock</source>
        <translation>SoC 时钟</translation>
    </message>
    <message>
        <source>Memory clock</source>
        <translation>显存时钟</translation>
    </message>
    <message>
        <source>Fabric clock</source>
        <translation>Fabric 时钟</translation>
    </message>
    <message>
        <source>Throttle status</source>
        <translation>降频状态</translation>
    </message>
    <message>
        <source>CPU cores</source>
        <translation>CPU 核心</translation>
    </message>
    <message>
        <source>Only cyan-skillfish-governor-smu publishes a load figure (fix-metrics); the tt governor does not, so this stays unavailable.</source>
        <translation>只有 cyan-skillfish-governor-smu 会发布负载数值（fix-metrics）；tt governor 不会，因此此处始终不可用。</translation>
    </message>
    <message>
        <source>Install cyan-skillfish-governor-smu; it measures the load and publishes it via gpu_metrics.</source>
        <translation>请安装 cyan-skillfish-governor-smu；它会测量负载并通过 gpu_metrics 发布。</translation>
    </message>
    <message>
        <source>Enable fix-metrics on the GPU Usage page and apply with a restart.</source>
        <translation>请在“GPU 使用率”页面启用 fix-metrics，并在应用时重启。</translation>
    </message>
    <message>
        <source>Start the governor service on the Service page; fix-metrics is on but nothing publishes the load.</source>
        <translation>请在“服务”页面启动 governor 服务；fix-metrics 已开启，但没有任何内容发布负载数据。</translation>
    </message>
    <message>
        <source>fix-metrics is on and the service runs, but no patched gpu_metrics is mounted: check the journal.</source>
        <translation>fix-metrics 已开启且服务正在运行，但未挂载已修正的 gpu_metrics：请检查日志。</translation>
    </message>
    <message>
        <source>The patched gpu_metrics table holds no valid load value; check the Service page journal.</source>
        <translation>已修正的 gpu_metrics 表中没有有效的负载值；请查看“服务”页面的日志。</translation>
    </message>
    <message>
        <source>%1 min %2 s</source>
        <translation>%1 分 %2 秒</translation>
    </message>
    <message>
        <source>%1 s</source>
        <translation>%1 秒</translation>
    </message>
    <message>
        <source>%1 W (raw %2)</source>
        <translation>%1 W（原始 %2）</translation>
    </message>
    <message>
        <source>%1 % (invalid)</source>
        <translation>%1 %（无效）</translation>
    </message>
    <message>
        <source>%1× %2–%3 MHz</source>
        <translation>%1× %2–%3 MHz</translation>
    </message>
    <message>
        <source>%1 °C max</source>
        <translation>%1 °C（最高）</translation>
    </message>
</context>
<context>
    <name>performance_page</name>
    <message>
        <source>no limit</source>
        <translation>无限制</translation>
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
        <translation>至少需要 %1 个点。</translation>
    </message>
    <message>
        <source>%1 MHz appears twice.</source>
        <translation>%1 MHz 出现了两次。</translation>
    </message>
    <message>
        <source>%1 MHz is outside 1–%2 MHz.</source>
        <translation>%1 MHz 超出了 1–%2 MHz 的范围。</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is outside %3–%4 mV.</source>
        <translation>%2 MHz 处的 %1 mV 超出了 %3–%4 mV 的范围。</translation>
    </message>
    <message>
        <source>%1 mV at %2 MHz is lower than %3 mV at %4 MHz; voltage must not drop as the frequency rises (governor rule).</source>
        <translation>%2 MHz 处的 %1 mV 低于 %4 MHz 处的 %3 mV；随着频率升高，电压不得下降（governor 规则）。</translation>
    </message>
    <message>
        <source>%1 MHz is above %2 MHz, where many boards start to hard-lock.</source>
        <translation>%1 MHz 高于 %2 MHz，许多主板从该频率起开始出现硬锁死。</translation>
    </message>
    <message>
        <source>%1 mV is above %2 mV; keep an eye on temperature and the PSU.</source>
        <translation>%1 mV 高于 %2 mV；请留意温度和电源（PSU）状况。</translation>
    </message>
</context>
<context>
    <name>stress</name>
    <message>
        <source>None (load the GPU yourself)</source>
        <translation>无（请自行为 GPU 施加负载）</translation>
    </message>
</context>
<context>
    <name>update_check</name>
    <message>
        <source>GitHub answered %1</source>
        <translation>GitHub 返回了 %1</translation>
    </message>
    <message>
        <source>no connection (%1)</source>
        <translation>无连接（%1）</translation>
    </message>
    <message>
        <source>unexpected tag %1</source>
        <translation>意外的标签 %1</translation>
    </message>
</context>
</TS>
