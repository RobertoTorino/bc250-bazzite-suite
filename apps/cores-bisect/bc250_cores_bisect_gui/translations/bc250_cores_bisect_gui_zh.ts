<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="zh">
<context>
    <name>AboutDialog</name>
    <message>
        <source>about</source>
        <translation>关于</translation>
    </message>
    <message>
        <source>Version {0}</source>
        <translation>版本 {0}</translation>
    </message>
    <message>
        <source>A PyQt6 setup screen for bc250-cores-bisect.sh: pick your options and start a run, which then continues in a terminal exactly as if typed by hand.</source>
        <translation>bc250-cores-bisect.sh 的 PyQt6 设置界面：选择所需选项并启动运行，随后将在终端中继续，与手动输入命令完全相同。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>许可证：GNU GPLv3。</translation>
    </message>
</context>
<context>
    <name>HelpDialog</name>
    <message>
        <source>help</source>
        <translation>帮助</translation>
    </message>
    <message>
        <source>Could not read bc250-cores-bisect.sh --help.

Run it from a terminal instead:
  bash {0} --help</source>
        <translation>无法读取 bc250-cores-bisect.sh --help。

请改在终端中运行：
  bash {0} --help</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>Help</source>
        <translation>帮助</translation>
    </message>
    <message>
        <source>About</source>
        <translation>关于</translation>
    </message>
    <message>
        <source>Choose how you want to run bc250-cores-bisect.sh, then click Start. This window closes and the real run continues in a terminal, exactly like running the script by hand.</source>
        <translation>选择 bc250-cores-bisect.sh 的运行方式，然后点击“开始”。本窗口将关闭，实际运行会在终端中继续，与手动运行脚本完全一样。</translation>
    </message>
    <message>
        <source>Load per attempt (seconds):</source>
        <translation>每次尝试的负载时长（秒）：</translation>
    </message>
    <message>
        <source>CPU load per attempt (-t). Minimum {0}s, default {1}s.</source>
        <translation>每次尝试的 CPU 负载时长 (-t)。最少 {0}s，默认 {1}s。</translation>
    </message>
    <message>
        <source>Rounds per item:</source>
        <translation>每个项目的轮数：</translation>
    </message>
    <message>
        <source>Attempts per item (-r), interleaved so heat/time-of-day don&apos;t favour one item. A single round cannot tell a genuinely bad core from a random failure.</source>
        <translation>每个项目的尝试次数 (-r)，交错进行，使温度和时段不会偏向某个项目。仅一轮无法区分真正有缺陷的核心与随机故障。</translation>
    </message>
    <message>
        <source>Load tool:</source>
        <translation>负载工具：</translation>
    </message>
    <message>
        <source>stress-ng --verify (default)</source>
        <translation>stress-ng --verify（默认）</translation>
    </message>
    <message>
        <source>mprime torture test</source>
        <translation>mprime 拷机测试</translation>
    </message>
    <message>
        <source>both (stress-ng, then mprime)</source>
        <translation>两者（先 stress-ng，再 mprime）</translation>
    </message>
    <message>
        <source>--load: stress-ng verifies its own results and is always available. mprime&apos;s torture test is a much heavier AVX/FMA load that also checks every result, so it catches silent miscalculation stress-ng misses - but it has to be installed separately. &apos;both&apos; runs them one after the other, so an attempt takes twice the load time.</source>
        <translation>--load：stress-ng 会校验自己的计算结果，并且始终可用。mprime 的拷机测试是重得多的 AVX/FMA 负载，同样会检查每一个结果，因此能发现 stress-ng 漏掉的静默计算错误，但需要单独安装。“两者”会依次运行二者，因此一次尝试会花费两倍的负载时间。</translation>
    </message>
    <message>
        <source>Also count hardware errors with rasdaemon</source>
        <translation>同时使用 rasdaemon 统计硬件错误</translation>
    </message>
    <message>
        <source>--rasdaemon: read ras-mc-ctl&apos;s error database before and after every attempt. rasdaemon stores errors persistently, so they are still counted when the journal is volatile or the attempt ends in a crash. Needs the rasdaemon service running.</source>
        <translation>--rasdaemon：在每次尝试前后读取 ras-mc-ctl 的错误数据库。rasdaemon 会持久保存错误，因此即使日志是易失的，或尝试以崩溃告终，错误仍会被计入。需要 rasdaemon 服务处于运行状态。</translation>
    </message>
    <message>
        <source>Same boot (don&apos;t reboot between attempts)</source>
        <translation>同一次启动（尝试之间不重启）</translation>
    </message>
    <message>
        <source>--same-boot: much faster, but every attempt then inherits the previous one&apos;s state, so a failure is harder to pin on one core.</source>
        <translation>--same-boot：速度快得多，但每次尝试都会继承上一次的状态，因此更难把故障归咎于某个核心。</translation>
    </message>
    <message>
        <source>Unattended (no prompts, auto-reboot, resumes after login)</source>
        <translation>无人值守（不提示、自动重启、登录后继续）</translation>
    </message>
    <message>
        <source>--auto: don&apos;t ask anything, reboot on its own, and keep going after every login until every item is done. Needs passwordless sudo for setpci and journalctl - see README.</source>
        <translation>--auto：不做任何询问，自行重启，并在每次登录后继续，直到所有项目完成。需要为 setpci 和 journalctl 配置免密 sudo，参见 README。</translation>
    </message>
    <message>
        <source>Also install the auto-resume login service (recommended with Unattended)</source>
        <translation>同时安装登录自动续跑服务（建议与“无人值守”一起使用）</translation>
    </message>
    <message>
        <source>Writes and enables ~/.config/systemd/user/bc250-cores-bisect-auto.service, so the run relaunches itself after every reboot/login, same as the README&apos;s --auto checklist. The script removes it again once every item is done.</source>
        <translation>写入并启用 ~/.config/systemd/user/bc250-cores-bisect-auto.service，使运行在每次重启或登录后自动重新开始，与 README 中的 --auto 检查清单一致。所有项目完成后，脚本会再次将其移除。</translation>
    </message>
    <message>
        <source>Reset</source>
        <translation>重置</translation>
    </message>
    <message>
        <source>--reset: permanently deletes all saved results and logs in ~/.local/share/bc250-cores-bisect, so the next run starts from scratch.</source>
        <translation>--reset：永久删除 ~/.local/share/bc250-cores-bisect 中保存的全部结果和日志，下次运行将从头开始。</translation>
    </message>
    <message>
        <source>Show status (--status)</source>
        <translation>显示状态 (--status)</translation>
    </message>
    <message>
        <source>Show the results so far and write the report, then exit.</source>
        <translation>显示目前为止的结果并写入报告，然后退出。</translation>
    </message>
    <message>
        <source>Start Cores Bisect</source>
        <translation>开始 Cores Bisect</translation>
    </message>
    <message>
        <source>Rough estimate: ~{0:.1f} h for a typical board ({1} items x {2} rounds){3}. The run is resumable - results are saved after every attempt.</source>
        <translation>粗略估计：典型主板约需 ~{0:.1f} 小时（{1} 个项目 x {2} 轮）{3}。运行可以续跑——每次尝试后都会保存结果。</translation>
    </message>
    <message>
        <source>, reboots included</source>
        <translation>，含重启时间</translation>
    </message>
    <message>
        <source>Delete all bc250-cores-bisect results?</source>
        <translation>删除所有 bc250-cores-bisect 结果？</translation>
    </message>
    <message>
        <source>This permanently deletes every saved result and log in ~/.local/share/bc250-cores-bisect (--reset). This cannot be undone and there is no backup. The script will still ask you to confirm once more in the terminal.</source>
        <translation>此操作会永久删除 ~/.local/share/bc250-cores-bisect 中保存的每一条结果和日志 (--reset)。该操作无法撤销，也没有备份。脚本仍会在终端中再次请求确认。</translation>
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
        <translation>使用以下设置启动 bc250-cores-bisect.sh：

  负载时间：{t}s
  轮数：{r}
  负载工具：{lt}
  rasdaemon：{ras}
  same-boot：{sb}
  无人值守：{au}

本窗口将关闭，运行将在终端中继续。</translation>
    </message>
    <message>
        <source>Could not install the auto-resume login service:
{0}

The run will still start now; see the README&apos;s --auto checklist to set it up by hand.</source>
        <translation>无法安装登录自动续跑服务：
{0}

本次运行仍会立即开始；请参见 README 中的 --auto 检查清单手动设置。</translation>
    </message>
</context>
</TS>
