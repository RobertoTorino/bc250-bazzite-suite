# SPDX-License-Identifier: GPL-3.0-or-later
"""Help page content."""

from __future__ import annotations

from PyQt6.QtCore import QCoreApplication, pyqtSignal
from PyQt6.QtWidgets import QComboBox, QHBoxLayout, QLabel, QTextBrowser, QVBoxLayout, QWidget

from . import APP_NAME, HELIXSR_RELEASES_URL, HELIXSR_URL, LANGUAGES, OPTISCALER_URL, REPO_URL, __version__
from .backend import HELIXSR_DLL, INI, KERNELS, UPSCALER_DLL, WEIGHTS


def help_html(payload_dir: str, deployments_file: str,
              work_dir: str = "~/.local/share/bc250-bazzite-helixsr-gui/work") -> str:
    """The Help page. Every paragraph is one translatable message; placeholders are filled afterwards so that
    translators never see paths or URLs."""
    values = dict(app_name=APP_NAME, version=__version__, helixsr_url=HELIXSR_URL, releases_url=HELIXSR_RELEASES_URL,
                  optiscaler_url=OPTISCALER_URL, repo_url=REPO_URL, upscaler_dll=UPSCALER_DLL, helixsr_dll=HELIXSR_DLL,
                  weights=WEIGHTS, kernels=KERNELS, ini=INI, payload_dir=payload_dir,
                  deployments_file=deployments_file, work_dir=work_dir)
    parts = [
        QCoreApplication.translate("help",
            '<h1>{app_name} <small>v{version}</small></h1>'),
        QCoreApplication.translate("help",
            '<p>Installs <a href="{helixsr_url}">HelixSR</a>, the FSR/DLSS hybrid upscaler for Direct3D 12 tuned '
            "for the <b>AMD BC-250</b>, into games on <b>Bazzite</b>. HelixSR runs NVIDIA's DLSS Model E network "
            'as plain compute shaders on an AMD GPU; games talk to it as FSR 3.1. This app only copies, renames '
            'and deletes files inside the game folders you point it at and inside its own payload folder. Nothing'
            ' on the system is touched, no root is needed.</p>'),
        QCoreApplication.translate("help",
            '<h2>How HelixSR is installed (what the app does for you)</h2>'),
        '<ol>',
        QCoreApplication.translate("help",
            "<li>The game's FSR 3.1 upscaler DLL, <code>{upscaler_dll}</code> (Unreal Engine games keep it under "
            '<code>Engine/Plugins/…/ThirdParty/Win64</code>) or <code>{helixsr_dll}</code>, is renamed to '
            '<code>*.original.dll</code>. That file is the backup <i>and</i> is still used: HelixSR forwards '
            'frame generation and other FidelityFX effects to it.</li>'),
        QCoreApplication.translate("help",
            "<li>HelixSR's <code>{helixsr_dll}</code> is copied in under the game's original file name, together "
            'with <code>{weights}</code> and <code>{kernels}</code>.</li>'),
        QCoreApplication.translate("help",
            '<li>Optionally a <code>{ini}</code> is written next to it.</li>'),
        QCoreApplication.translate("help",
            '<li>Start the game normally and select <b>AMD FSR</b> as the upscaler. No launch options are '
            'needed.</li>'),
        '</ol>',
        QCoreApplication.translate("help",
            "<p><b>Remove</b> undoes it: HelixSR's files are deleted and the <code>.original.dll</code> gets its "
            'name back.</p>'),
        QCoreApplication.translate("help",
            '<h2>Setup</h2>'),
        QCoreApplication.translate("help",
            "<p><b>Download and build</b> does the HelixSR README's setup for you: it fetches the latest release "
            'zip from <a href="{releases_url}">GitHub</a> (2 MB), reads the exact sources and SHA-256 sums the '
            "release's own setup scripts pin, downloads what this PC still needs <i>in parallel</i> and verifies "
            "each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), "
            "Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable "
            'Python (67 MB, numpy is added by the script). Then it runs <code>helixsr-setup.sh --yes</code> with '
            'its output on the page: the script builds <code>{weights}</code> and <code>{kernels}</code> (2-3 '
            'minutes, the shader compiler runs through your Proton) and the result is imported as the payload. '
            'The DLSS DLL is deleted afterwards. Everything is downloaded into <code>{work_dir}</code> and '
            "<code>~/.local/share/HelixSR</code> (the script's own cache, reused next time).</p>"),
        QCoreApplication.translate("help",
            '<p>If a game you own already ships DLSS 310.7.0, tick <b>Use a nvngx_dlss.dll already on this PC</b>'
            ' and let <b>Find in Steam</b> locate it (checksums are compared, only the exact build HelixSR pins '
            "is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.</p>"),
        QCoreApplication.translate("help",
            '<p><b>Releases</b> compares the payload with the latest HelixSR release and this app with its latest'
            ' release on GitHub, at start (one small request each, can be turned off) or with <b>Check now</b>. A'
            ' newer HelixSR shows on the Overview too; <b>Download and build</b> again updates the payload, then '
            'deploy again per game (the Overview marks them <i>Older build</i>).</p>'),
        QCoreApplication.translate("help",
            '<h2>Overview</h2>'),
        QCoreApplication.translate("help",
            '<p>The <b>payload</b> is your copy of a HelixSR release: the DLL, the two network files and the ini,'
            ' kept in <code>{payload_dir}</code>. It is filled by the Setup page, or by hand: extract a release, '
            'run <code>./helixsr-setup.sh</code> in that folder once and <b>Import release folder…</b>. The '
            "network files contain NVIDIA's network: they are for your own PC and are never part of this app or "
            'its releases. <b>Import release zip…</b> takes the download as is, but the network files are still '
            'missing until the setup has run and the folder is imported.</p>'),
        QCoreApplication.translate("help",
            '<p><b>Deployments</b> lists every place the app put HelixSR, with its live state: <i>In place</i>, '
            '<i>Older build</i> (the payload has been updated since; deploy again to update the game), <i>Network'
            ' files missing</i>, <i>Original restored</i> or <i>Removed</i>. The list is kept in '
            '<code>{deployments_file}</code>; <b>Forget entry</b> drops a line without touching the game.</p>'),
        QCoreApplication.translate("help",
            '<h2>Deploy</h2>'),
        QCoreApplication.translate("help",
            '<p>Pick a game from the Steam libraries found on this PC (<code>steamapps/common</code> of every '
            'library in <code>libraryfolders.vdf</code>) or <b>Browse…</b> to any folder (Heroic, Lutris, '
            "Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's "
            'own file, HelixSR, and whether the network files are next to it. Select the one the game loads '
            '(usually the only one) and <b>Deploy HelixSR</b>.</p>'),
        QCoreApplication.translate("help",
            '<p><b>Stand-alone folder for OptiScaler</b> is for games that do not ship FSR 3.1 as a separate DLL '
            '(DLSS, XeSS, FSR 2 / 3.0 games). <a href="{optiscaler_url}">OptiScaler</a> routes their upscaler '
            'calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own'
            ' (default <code>&lt;game&gt;/HelixSR</code>) and shows the <code>OptiScaler.ini</code> lines that '
            'point OptiScaler there (Windows paths; <code>Z:</code> is the Linux root under Proton). Install '
            'OptiScaler for the game as its documentation describes, paste the lines, and pick <b>FSR HelixSR '
            "(3.1.5)</b> in OptiScaler's FFX Upscaler menu.</p>"),
        QCoreApplication.translate("help",
            "<p>Deploying again over an existing deployment updates HelixSR's files and keeps the game's "
            'original.</p>'),
        QCoreApplication.translate("help",
            '<h2>helixsr.ini</h2>'),
        '<table cellpadding="4" cellspacing="0" border="1" width="100%">',
        QCoreApplication.translate("help",
            '<tr><th>Section</th><th>Key</th><th>Default</th><th>Meaning</th></tr>'),
        QCoreApplication.translate("help",
            "<tr><td>[Sharpening]</td><td>Mode</td><td>off</td><td><i>off</i> (as DLSS), <i>game</i> = the game's"
            ' FSR sharpness (or Sharpness if it sends none), <i>override</i> = always Sharpness</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[Sharpening]</td><td>Sharpness</td><td>0.3</td><td>0-1, FidelityFX RCAS scale</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[Sharpening]</td><td>MotionAdaptive, MotionThreshold, MotionLimit, '
            'MotionReduction</td><td>true, 2, 16, 0.6</td><td>Less sharpening on fast-moving pixels: where the '
            'reduction starts and is complete (output pixels per frame), and how much is removed</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[ModelE]</td><td>Enabled</td><td>true</td><td>Run the Model E network; otherwise a '
            'placeholder upscale</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[ModelE]</td><td>Network</td><td>auto</td><td><i>auto</i>: the main network at every ratio '
            "(about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); "
            '<i>nvidia</i>: as DLSS selects; <i>main</i> / <i>ultraperformance</i></td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[ModelE]</td><td>InvertJitter, InvertMotionVectors</td><td>false</td><td>For games whose '
            'jitter or motion vectors come out mirrored</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[ModelE]</td><td>MotionVectorFrontEnd</td><td>false</td><td>Convert render-resolution motion'
            " vectors to display resolution first (used anyway when the game's vectors include the "
            'jitter)</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[Log]</td><td>Enabled</td><td>true</td><td>Writes <code>helixsr.log</code> next to the DLL; '
            'it names the network that runs and reports missing network files</td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[Forwarding]</td><td>Dll</td><td>(auto)</td><td>DLL for the other FidelityFX effects (frame '
            'generation): <code>amd_fidelityfx_dx12.original.dll</code> if present, else '
            '<code>amd_fidelityfx_framegeneration_dx12.dll</code></td></tr>'),
        QCoreApplication.translate("help",
            '<tr><td>[Forwarding]</td><td>UpscalerDll</td><td>(empty)</td><td>A second FidelityFX upscaler DLL '
            "(e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu</td></tr>"),
        '</table>',
        QCoreApplication.translate("help",
            "<p>The page edits these values and shows the resulting file; the comments of the payload's own "
            '<code>{ini}</code> are kept, only values change. <b>Save as payload default</b> makes it the file '
            'Deploy starts from; <b>Write to game</b> replaces the ini of a chosen deployment. Sharpening off '
            'costs nothing; on, about 0.4 ms at 4K on the BC-250.</p>'),
        QCoreApplication.translate("help",
            '<h2>Good to know</h2>'),
        '<ul>',
        QCoreApplication.translate("help",
            '<li>HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 '
            '(gfx1013, Mesa RADV, Proton). Vulkan games are not supported.</li>'),
        QCoreApplication.translate("help",
            "<li>Steam verifies game files on updates and may put the game's own DLL back. The Overview then "
            'shows <i>Original restored</i> and the backup stays; deploy again.</li>'),
        QCoreApplication.translate("help",
            '<li>Per-stage GPU timings: launch option <code>HELIXSR_PROFILE=1 %command%</code> writes them to '
            '<code>helixsr.log</code>.</li>'),
        QCoreApplication.translate("help",
            '<li>Payload: <code>{payload_dir}</code>. Deployments: <code>{deployments_file}</code>. Window size '
            'and page are kept per user. Removing the app with <code>install.sh --uninstall</code> leaves the '
            'payload alone.</li>'),
        '</ul>',
        QCoreApplication.translate("help",
            '<p>Source and issues: <a href="{repo_url}">{repo_url}</a>. HelixSR itself: <a '
            'href="{helixsr_url}">{helixsr_url}</a> (HelixSR Freeware License; this app ships none of it).</p>'),
    ]
    return "\n".join(part.format(**values) for part in parts) + "\n"

class HelpView(QTextBrowser):
    def __init__(self, payload_dir: str, deployments_file: str, work_dir: str = "", parent: QWidget | None = None):
        super().__init__(parent)
        self.setOpenExternalLinks(True)
        self.setHtml(help_html(payload_dir, deployments_file, work_dir) if work_dir
                     else help_html(payload_dir, deployments_file))


class HelpPage(QWidget):
    """The help text with a language picker above it. The choice is saved by the main window and applied at the
    next start: Qt widgets built with tr() do not re-translate themselves while they are shown."""

    language_changed = pyqtSignal(str)                                  # "" = follow the system locale

    def __init__(self, payload_dir: str, deployments_file: str, work_dir: str = "", current: str = "",
                 parent: QWidget | None = None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        row = QHBoxLayout()
        row.addWidget(QLabel(self.tr("Language:")))
        self.language = QComboBox()
        self.language.addItem(self.tr("System default"), "")
        for code, name in LANGUAGES.items():
            self.language.addItem(name, code)
        index = self.language.findData(current) if current else 0
        self.language.setCurrentIndex(max(index, 0))
        self.language.setToolTip(self.tr("Saved for the next start; the interface is built once in the language "
                                         "that is active then."))
        row.addWidget(self.language)
        self.restart_hint = QLabel(self.tr("Takes effect after a restart."))
        self.restart_hint.setVisible(False)
        row.addWidget(self.restart_hint)
        row.addStretch(1)
        layout.addLayout(row)
        self.view = HelpView(payload_dir, deployments_file, work_dir)
        layout.addWidget(self.view, 1)
        self.language.currentIndexChanged.connect(self._picked)

    def _picked(self, index: int) -> None:
        self.restart_hint.setVisible(True)
        self.language_changed.emit(self.language.itemData(index) or "")
