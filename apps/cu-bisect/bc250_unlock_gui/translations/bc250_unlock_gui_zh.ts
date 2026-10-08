<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE TS>
<TS version="2.1" language="zh_CN">
<context>
    <name>MainWindow</name>
    <message>
        <source>About</source>
        <translation>关于</translation>
    </message>
    <message>
        <source>Apply the accepted mask now and reapply it automatically on every future boot.</source>
        <translation>立即应用已接受的掩码，并在以后每次启动时自动重新应用。</translation>
    </message>
    <message>
        <source>Disable the unlock service; the board returns to the stock 24 CUs from the next reboot.</source>
        <translation>禁用解锁服务；主板将从下次重启起恢复为出厂的 24 个 CU。</translation>
    </message>
    <message>
        <source>Show the installed masks, service state and live masks (no root needed).</source>
        <translation>显示已安装的掩码、服务状态和实时掩码（无需 root 权限）。</translation>
    </message>
    <message>
        <source>Re-read bc250-cu-bisect.sh's recorded results, e.g. after running another retest.</source>
        <translation>重新读取 bc250-cu-bisect.sh 记录的结果，例如在再次重测之后。</translation>
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
        <source>Incorrect password, try again.</source>
        <translation>密码错误，请重试。</translation>
    </message>

    <message>
        <location filename="../main_window.py" line="72" />
        <source>Keeps a CU unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>在重启后仍保留您已通过 bc250-cu-bisect.sh 验证过的 CU 解锁设置。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="92" />
        <source>Install (apply now + keep after reboot)</source>
        <translation>安装（立即应用并在重启后保留）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="94" />
        <source>Uninstall (back to stock next boot)</source>
        <translation>卸载（下次启动恢复出厂设置）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="96" />
        <source>Refresh status</source>
        <translation>刷新状态</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="98" />
        <source>Re-check bisect results</source>
        <translation>重新检查对分结果</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="109" />
        <source>Output of bc250-cu-unlock.sh appears here.</source>
        <translation>bc250-cu-unlock.sh 的输出会显示在这里。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="120" />
        <source>✔ ACCEPTED</source>
        <translation>✔ 已接受</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="124" />
        <source>✘ NOT ACCEPTED YET!</source>
        <translation>✘ 尚未接受！</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="142" />
        <source>sudo: authentication failed.</source>
        <translation>sudo：身份验证失败。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="149" />
        <source>({0} finished, exit code {1})</source>
        <translation>（{0} 已完成，退出代码 {1}）</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="152" />
        <source>{0} failed (exit code {1}). See the output above.</source>
        <translation>{0} 失败（退出代码 {1}）。请查看上方输出。</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="177" />
        <source>Apply {0} ({1} CUs) now and keep it enabled on every boot?</source>
        <translation>是否立即应用 {0}（{1} 个 CU）并在每次启动时保持启用？</translation>
    </message>
    <message>
        <location filename="../main_window.py" line="187" />
        <source>Disable the unlock service? The board goes back to the stock 24 CUs from the next reboot.</source>
        <translation>是否禁用解锁服务？下次重启后主板将恢复为出厂的 24 个 CU。</translation>
    </message>
</context>
<context>
    <name>SudoDialog</name>
    <message>
        <location filename="../widgets.py" line="13" />
        <source>administrator password</source>
        <translation>管理员密码</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="16" />
        <source>Writing GPU registers and installing the systemd service need root, so this runs bc250-cu-unlock.sh through sudo.
Your password is passed to sudo only and is never stored.</source>
        <translation>写入 GPU 寄存器和安装 systemd 服务需要 root 权限，因此将通过 sudo 运行 bc250-cu-unlock.sh。
您的密码仅传递给 sudo，绝不会被存储。</translation>
    </message>
    <message>
        <location filename="../widgets.py" line="29" />
        <source>sudo password</source>
        <translation>sudo 密码</translation>
    </message>
</context>
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
        <source>A PyQt6 front-end for bc250-cu-unlock.sh: keeps a BC-250 compute-unit unlock you already validated with bc250-cu-bisect.sh across reboots.</source>
        <translation>bc250-cu-unlock.sh 的 PyQt6 前端：让您已通过 bc250-cu-bisect.sh 验证的 BC-250 计算单元解锁在重启后依然保持生效。</translation>
    </message>
    <message>
        <source>License: GNU GPLv3.</source>
        <translation>许可证：GNU GPLv3。</translation>
    </message>
</context>
</TS>
