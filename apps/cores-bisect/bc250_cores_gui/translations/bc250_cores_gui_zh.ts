<?xml version="1.0" encoding="utf-8"?>
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
        <source>A PyQt6 front-end for bc250-cores-unlock.sh: keeps the BC-250 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>bc250-cores-unlock.sh 的 PyQt6 前端：让您已通过 bc250-cores-bisect.sh 验证的 BC-250 8C/16T 核心解锁在重启后依然保持生效。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>许可证：GNU GPLv3。</translation>
    </message>
</context>
<context>
    <name>CoreMapWidget</name>
    <message>
        <source>stock = always enabled (6C/12T)   ok = passed every round   xx = fails every time   ?? = random   .. = not tested yet</source>
        <translation>stock = 始终启用（6C/12T）   ok = 每轮均通过   xx = 每次都失败   ?? = 随机   .. = 尚未测试</translation>
    </message>
</context>
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>关于</translation>
    </message>
    <message>
        <source>Keeps the 8C/16T core unlock you already validated with bc250-cores-bisect.sh across reboots.</source>
        <translation>在重启后仍保留您已通过 bc250-cores-bisect.sh 验证的 8C/16T 核心解锁。</translation>
    </message>
    <message>
        <source>Install (keep 8C/16T after every boot)</source>
        <translation>安装（每次启动后保持 8C/16T）</translation>
    </message>
    <message>
        <source>Enable the root service that re-applies the unlock after a cold boot and warm-reboots once.</source>
        <translation>启用 root 服务，在冷启动后重新应用解锁并执行一次热重启。</translation>
    </message>
    <message>
        <source>Uninstall (stock after next power off)</source>
        <translation>卸载（下次关机后恢复 stock）</translation>
    </message>
    <message>
        <source>Remove the service. The unlock stays active until the next full power off (cold boot).</source>
        <translation>移除该服务。解锁将保持生效，直到下次完全关机（冷启动）为止。</translation>
    </message>
    <message>
        <source>Refresh status</source>
        <translation>刷新状态</translation>
    </message>
    <message>
        <source>Show the core presence mask, threads, service and guard state.</source>
        <translation>显示核心存在掩码、线程数以及服务和 guard 状态。</translation>
    </message>
    <message>
        <source>Status with sudo</source>
        <translation>使用 sudo 查看状态</translation>
    </message>
    <message>
        <source>Run the status as root (asks for the sudo password), so it also shows the core presence mask.</source>
        <translation>以 root 身份运行状态检查（会要求输入 sudo 密码），这样也会显示核心存在掩码。</translation>
    </message>
    <message>
        <source>Re-check bisect results</source>
        <translation>重新检查对分结果</translation>
    </message>
    <message>
        <source>Re-read bc250-cores-bisect.sh&apos;s recorded results, e.g. after more rounds finished.</source>
        <translation>重新读取 bc250-cores-bisect.sh 记录的结果，例如在完成更多轮次之后。</translation>
    </message>
    <message>
        <source>Output of bc250-cores-unlock.sh appears here.</source>
        <translation>bc250-cores-unlock.sh 的输出会显示在这里。</translation>
    </message>
    <message>
        <source>✔ ACCEPTED</source>
        <translation>✔ 已接受</translation>
    </message>
    <message>
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ 尚未接受！</translation>
    </message>
    <message>
        <source>Working — installing…</source>
        <translation>正在处理 — 安装中…</translation>
    </message>
    <message>
        <source>Working — uninstalling…</source>
        <translation>正在处理 — 卸载中…</translation>
    </message>
    <message>
        <source>Working…</source>
        <translation>正在处理…</translation>
    </message>
    <message>
        <source>sudo: authentication failed.</source>
        <translation>sudo：身份验证失败。</translation>
    </message>
    <message>
        <source>Incorrect password, try again.</source>
        <translation>密码错误，请重试。</translation>
    </message>
    <message>
        <source>({0} finished, exit code {1})</source>
        <translation>（{0} 已完成，退出代码 {1}）</translation>
    </message>
    <message>
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} 失败（退出代码 {1}）。请查看上方输出。</translation>
    </message>
    <message>
        <source>Keep all 8 cores (16 threads) enabled on every boot?

A root service checks the core mask at every boot. After a cold boot it re-applies the unlock and warm-reboots once. If the unlock isn&apos;t active right now, reboot (warm) after installing to bring the cores up.</source>
        <translation>是否在每次启动时都保持全部 8 个核心（16 个线程）启用？

root 服务会在每次启动时检查核心掩码。冷启动后它会重新应用解锁并执行一次热重启。如果解锁当前未生效，请在安装后执行热重启以启用这些核心。</translation>
    </message>
    <message>
        <source>Remove the unlock service? The 8 cores stay enabled until the next full power off (cold boot); after that the board is back to the stock 6C/12T.</source>
        <translation>是否移除解锁服务？这 8 个核心将保持启用，直到下次完全关机（冷启动）为止；之后主板将恢复为 stock 6C/12T。</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <source>administrator password</source>
        <translation>管理员密码</translation>
    </message>
    <message>
        <source>Writing the SMU mailbox and installing the systemd service need root, so this runs bc250-cores-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>写入 SMU mailbox 和安装 systemd 服务需要 root 权限，因此将通过 sudo 运行 bc250-cores-unlock.sh。
您的密码仅传递给 sudo，绝不会被存储。</translation>
    </message>
    <message>
        <source>sudo password</source>
        <translation>sudo 密码</translation>
    </message>
</context>
</TS>
