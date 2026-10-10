<?xml version="1.0" encoding="utf-8"?>
<!-- SPDX-License-Identifier: GPL-3.0-or-later -->

<!DOCTYPE TS>
<TS version="2.1" language="ru">
<context>
    <name>DeployPage</name>
    <message>
        <source>Deploy</source>
        <translation>Развертывание</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>Игра</translation>
    </message>
    <message>
        <source>Steam library:</source>
        <translation>Библиотека Steam:</translation>
    </message>
    <message>
        <source>The folders under steamapps/common of every Steam library on this PC.</source>
        <translation>Папки в steamapps/common каждой библиотеки Steam на этом ПК.</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>Обзор…</translation>
    </message>
    <message>
        <source>Any folder: a game outside Steam, or a Heroic / Lutris / Bottles prefix.</source>
        <translation>Любая папка: игра вне Steam или префикс Heroic / Lutris / Bottles.</translation>
    </message>
    <message>
        <source>Folder:</source>
        <translation>Папка:</translation>
    </message>
    <message>
        <source>Pick a game above or browse to its folder</source>
        <translation>Выберите игру выше или укажите ее папку</translation>
    </message>
    <message>
        <source>Scan</source>
        <translation>Сканировать</translation>
    </message>
    <message>
        <source>FSR 3.1 upscaler DLLs in that folder</source>
        <translation>DLL апскейлера FSR 3.1 в этой папке</translation>
    </message>
    <message>
        <source>DLL</source>
        <translation>DLL</translation>
    </message>
    <message>
        <source>State</source>
        <translation>Состояние</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>Файлы сети</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>Расположение</translation>
    </message>
    <message>
        <source>Scan a game folder first.</source>
        <translation>Сначала просканируйте папку игры.</translation>
    </message>
    <message>
        <source>How</source>
        <translation>Способ</translation>
    </message>
    <message>
        <source>Replace the selected DLL (the game's file is kept as *.original.dll)</source>
        <translation>Заменить выбранную DLL (файл игры сохраняется как *.original.dll)</translation>
    </message>
    <message>
        <source>Stand-alone folder for OptiScaler (DLSS / XeSS / FSR 2 games)</source>
        <translation>Отдельная папка для OptiScaler (игры с DLSS / XeSS / FSR 2)</translation>
    </message>
    <message>
        <source>The way HelixSR is meant to be installed: the game calls FSR 3.1 and gets HelixSR. Pick the game's &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: under Engine/Plugins/…/Win64) or &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt; above, then choose &lt;b&gt;AMD FSR&lt;/b&gt; in the game. No launch options.</source>
        <translation>Штатный способ установки HelixSR: игра вызывает FSR 3.1 и получает HelixSR. Выберите выше файл игры &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; (Unreal: в Engine/Plugins/…/Win64) или &lt;code&gt;amd_fidelityfx_dx12.dll&lt;/code&gt;, затем выберите &lt;b&gt;AMD FSR&lt;/b&gt; в игре. Параметры запуска не нужны.</translation>
    </message>
    <message>
        <source>Defaults to &lt;game&gt;/HelixSR</source>
        <translation>По умолчанию &lt;game&gt;/HelixSR</translation>
    </message>
    <message>
        <source>Install OptiScaler for the game as its documentation describes, then point its OptiScaler.ini at this folder with the lines below (Copy puts them on the clipboard).</source>
        <translation>Установите OptiScaler для игры по его документации, затем укажите эту папку в OptiScaler.ini строками ниже (кнопка копирования помещает их в буфер обмена).</translation>
    </message>
    <message>
        <source>Copy OptiScaler.ini lines</source>
        <translation>Скопировать строки OptiScaler.ini</translation>
    </message>
    <message>
        <source>Write helixsr.ini with the values of the helixsr.ini page</source>
        <translation>Записать helixsr.ini со значениями со страницы helixsr.ini</translation>
    </message>
    <message>
        <source>Unticked: the payload's helixsr.ini is copied if it has one, else none is written and HelixSR uses its defaults.</source>
        <translation>Если флажок снят: копируется helixsr.ini из комплекта, если он есть; иначе файл не записывается, и HelixSR использует значения по умолчанию.</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>Удалить HelixSR</translation>
    </message>
    <message>
        <source>Delete HelixSR's files and put the game's original DLL back.</source>
        <translation>Удалить файлы HelixSR и вернуть исходную DLL игры.</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>Развернуть HelixSR</translation>
    </message>
    <message>
        <source>Copy HelixSR into the game as chosen above.</source>
        <translation>Скопировать HelixSR в игру выбранным выше способом.</translation>
    </message>
    <message>
        <source>— pick a game —</source>
        <translation>— выберите игру —</translation>
    </message>
    <message>
        <source>— no Steam library found —</source>
        <translation>— библиотека Steam не найдена —</translation>
    </message>
    <message>
        <source>No FSR 3.1 upscaler DLL in this folder. The game may not ship FSR 3.1 as a separate DLL: use the OptiScaler folder below, or check the game's folder.</source>
        <translation>В этой папке нет DLL апскейлера FSR 3.1. Возможно, игра не поставляет FSR 3.1 отдельной DLL: используйте папку OptiScaler ниже или проверьте папку игры.</translation>
    </message>
    <message>
        <source>{0} DLL(s) found; select the one the game loads (usually the only one, or the shallowest).</source>
        <translation>Найдено DLL: {0}. Выберите ту, которую загружает игра (обычно единственную или ближайшую к корню).</translation>
    </message>
    <message>
        <source>Import a complete payload first.</source>
        <translation>Сначала импортируйте полный комплект.</translation>
    </message>
    <message>
        <source>Write HelixSR under both FidelityFX names into the folder.</source>
        <translation>Записать HelixSR в папку под обоими именами FidelityFX.</translation>
    </message>
    <message>
        <source>Select a DLL in the list.</source>
        <translation>Выберите DLL в списке.</translation>
    </message>
    <message>
        <source>Replace {0} with HelixSR.</source>
        <translation>Заменить {0} на HelixSR.</translation>
    </message>
    <message>
        <source>Second upscaler:</source>
        <translation>Второй апскейлер:</translation>
    </message>
    <message>
        <source>Optional: AMD&apos;s amd_fidelityfx_upscaler_dx12.dll, e.g. with FSR 4</source>
        <translation>Необязательно: amd_fidelityfx_upscaler_dx12.dll от AMD, например с FSR 4</translation>
    </message>
    <message>
        <source>Copied into the folder as {0}, with UpscalerDll in helixsr.ini pointing at it: OptiScaler&apos;s FFX Upscaler menu then lists its upscalers after HelixSR, and the one you pick runs in that DLL. Empty: HelixSR only.</source>
        <translation>Копируется в папку как {0}, а UpscalerDll в helixsr.ini указывает на неё: меню «FFX Upscaler» в OptiScaler показывает её апскейлеры после HelixSR, и выбранный работает в этой DLL. Пусто: только HelixSR.</translation>
    </message>
</context><context>
    <name>HelpPage</name>
    <message>
        <source>Language:</source>
        <translation>Язык:</translation>
    </message>
    <message>
        <source>System default</source>
        <translation>Системный по умолчанию</translation>
    </message>
    <message>
        <source>Saved for the next start; the interface is built once in the language that is active then.</source>
        <translation>Сохраняется для следующего запуска; интерфейс создается один раз на языке, активном в этот момент.</translation>
    </message>
    <message>
        <source>Takes effect after a restart.</source>
        <translation>Вступит в силу после перезапуска.</translation>
    </message>
</context><context>
    <name>IniPage</name>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>HelixSR defaults</source>
        <translation>Значения HelixSR по умолчанию</translation>
    </message>
    <message>
        <source>Reset every field to the value HelixSR uses when the key is missing.</source>
        <translation>Сбросить все поля к значениям, которые HelixSR использует при отсутствии ключа.</translation>
    </message>
    <message>
        <source>Optional settings HelixSR reads from a helixsr.ini next to its DLL; every key has a default. These values are written on Deploy (when ticked there), can be saved as the payload's default, or pushed to a game that already has HelixSR.</source>
        <translation>Необязательные параметры, которые HelixSR читает из helixsr.ini рядом со своей DLL; у каждого ключа есть значение по умолчанию. Эти значения записываются при развертывании (если там установлен флажок), могут быть сохранены как настройки комплекта по умолчанию или отправлены в игру, где HelixSR уже установлен.</translation>
    </message>
    <message>
        <source>off: never sharpen (DLSS's network does not). game: the game's FSR sharpness, or Sharpness below if it sends none. override: always Sharpness below.</source>
        <translation>off: никогда не повышать резкость (сеть DLSS этого не делает). game: резкость FSR из игры или Sharpness ниже, если игра ее не передает. override: всегда Sharpness ниже.</translation>
    </message>
    <message>
        <source>0 = none, 1 = strongest RCAS (FidelityFX scale).</source>
        <translation>0 = нет, 1 = максимальная RCAS (шкала FidelityFX).</translation>
    </message>
    <message>
        <source>Less sharpening on fast-moving pixels</source>
        <translation>Меньше резкости на быстро движущихся пикселях</translation>
    </message>
    <message>
        <source>Motion in output pixels per frame where the reduction starts.</source>
        <translation>Движение в выходных пикселях за кадр, при котором начинается снижение.</translation>
    </message>
    <message>
        <source>Motion where the reduction is complete.</source>
        <translation>Движение, при котором снижение становится полным.</translation>
    </message>
    <message>
        <source>Fraction of sharpening removed at and above MotionLimit.</source>
        <translation>Доля убираемой резкости при MotionLimit и выше.</translation>
    </message>
    <message>
        <source>Write helixsr.log next to the DLL</source>
        <translation>Записывать helixsr.log рядом с DLL</translation>
    </message>
    <message>
        <source>Run the Model E network</source>
        <translation>Запускать сеть Model E</translation>
    </message>
    <message>
        <source>Off, or while the network files are missing, a placeholder upscale is used.</source>
        <translation>Если выключено или отсутствуют файлы сети, используется заглушка апскейла.</translation>
    </message>
    <message>
        <source>auto: the main network at every scale ratio (faster than the Ultra Performance network on GPUs without matrix cores). nvidia: as DLSS selects it. Or force one.</source>
        <translation>auto: основная сеть при любом коэффициенте масштабирования (быстрее сети Ultra Performance на GPU без матричных ядер). nvidia: как выбирает DLSS. Можно также задать принудительно.</translation>
    </message>
    <message>
        <source>Jitter comes out mirrored</source>
        <translation>Jitter получается зеркальным</translation>
    </message>
    <message>
        <source>Motion vectors come out mirrored</source>
        <translation>Векторы движения получаются зеркальными</translation>
    </message>
    <message>
        <source>Convert render-resolution motion vectors first</source>
        <translation>Сначала преобразовать векторы движения из разрешения рендера</translation>
    </message>
    <message>
        <source>Used anyway when the game's vectors include the jitter; otherwise NVIDIA's render-resolution path is faster.</source>
        <translation>Все равно используется, если векторы игры включают jitter; иначе путь NVIDIA для разрешения рендера быстрее.</translation>
    </message>
    <message>
        <source>auto: amd_fidelityfx_dx12.original.dll, else …framegeneration_dx12.dll</source>
        <translation>auto: amd_fidelityfx_dx12.original.dll, иначе …framegeneration_dx12.dll</translation>
    </message>
    <message>
        <source>DLL that serves FidelityFX effects other than upscaling (frame generation).</source>
        <translation>DLL, обслуживающая эффекты FidelityFX кроме апскейлинга (генерацию кадров).</translation>
    </message>
    <message>
        <source>empty: HelixSR only</source>
        <translation>пусто: только HelixSR</translation>
    </message>
    <message>
        <source>A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu. A bare name is looked up next to HelixSR.</source>
        <translation>Вторая DLL апскейлера FidelityFX (например, AMD с FSR 4), отображаемая после HelixSR в меню OptiScaler. Простое имя ищется рядом с HelixSR.</translation>
    </message>
    <message>
        <source>Resulting file</source>
        <translation>Итоговый файл</translation>
    </message>
    <message>
        <source>Save as payload default</source>
        <translation>Сохранить как стандарт комплекта</translation>
    </message>
    <message>
        <source>Write this file into the payload folder: it is what Deploy copies when the helixsr.ini tick box there is off, and what this page starts from.</source>
        <translation>Записать этот файл в папку комплекта: именно его копирует развертывание, когда флажок helixsr.ini там снят, и с него начинается эта страница.</translation>
    </message>
    <message>
        <source>Push to:</source>
        <translation>Отправить в:</translation>
    </message>
    <message>
        <source>Write to game</source>
        <translation>Записать в игру</translation>
    </message>
    <message>
        <source>Overwrite the helixsr.ini of that deployment with this file.</source>
        <translation>Перезаписать helixsr.ini этого развертывания этим файлом.</translation>
    </message>
</context><context>
    <name>MainWindow</name>
    <message>
        <source>HelixSR payload</source>
        <translation>Комплект HelixSR</translation>
    </message>
    <message>
        <source>Network files</source>
        <translation>Файлы сети</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>Развертывания</translation>
    </message>
    <message>
        <source>Steam games</source>
        <translation>Игры Steam</translation>
    </message>
    <message>
        <source>Overview</source>
        <translation>Обзор</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>Настройка</translation>
    </message>
    <message>
        <source>Deploy</source>
        <translation>Развертывание</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>Help</source>
        <translation>Справка</translation>
    </message>
    <message>
        <source>Ready</source>
        <translation>Готово</translation>
    </message>
    <message>
        <source>Setup running</source>
        <translation>Настройка выполняется</translation>
    </message>
    <message>
        <source>The HelixSR setup is still running. Cancel it and quit?</source>
        <translation>Настройка HelixSR еще выполняется. Отменить ее и выйти?</translation>
    </message>
    <message>
        <source>Imported</source>
        <translation>Импортировано</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Отсутствует</translation>
    </message>
    <message>
        <source>helixsr_weights.bin and helixsr_kernels.pak from helixsr-setup.sh</source>
        <translation>helixsr_weights.bin и helixsr_kernels.pak из helixsr-setup.sh</translation>
    </message>
    <message>
        <source>HelixSR in place / known deployments</source>
        <translation>HelixSR установлен / известные развертывания</translation>
    </message>
    <message>
        <source>No Steam library found</source>
        <translation>Библиотека Steam не найдена</translation>
    </message>
    <message>
        <source>Extracted HelixSR release folder</source>
        <translation>Распакованная папка релиза HelixSR</translation>
    </message>
    <message>
        <source>HelixSR release zip</source>
        <translation>ZIP релиза HelixSR</translation>
    </message>
    <message>
        <source>Zip archives (*.zip)</source>
        <translation>ZIP-архивы (*.zip)</translation>
    </message>
    <message>
        <source>Import failed</source>
        <translation>Не удалось импортировать</translation>
    </message>
    <message>
        <source>Imported {0} file(s): {1}.</source>
        <translation>Импортировано файлов: {0}: {1}.</translation>
    </message>
    <message>
        <source>

Still missing: {0}. Run helixsr-setup.sh in the extracted release folder, then import that folder.</source>
        <translation>

По-прежнему отсутствует: {0}. Запустите helixsr-setup.sh в распакованной папке релиза, затем импортируйте эту папку.</translation>
    </message>
    <message>
        <source>Payload incomplete</source>
        <translation>Комплект неполный</translation>
    </message>
    <message>
        <source>Could not write</source>
        <translation>Не удалось записать</translation>
    </message>
    <message>
        <source>Saved {0}</source>
        <translation>Сохранено {0}</translation>
    </message>
    <message>
        <source>Game folder</source>
        <translation>Папка игры</translation>
    </message>
    <message>
        <source>Folder for HelixSR (OptiScaler)</source>
        <translation>Папка для HelixSR (OptiScaler)</translation>
    </message>
    <message>
        <source>{0} is not a folder.</source>
        <translation>{0} не является папкой.</translation>
    </message>
    <message>
        <source>Could not scan {0}: {1}</source>
        <translation>Не удалось просканировать {0}: {1}</translation>
    </message>
    <message>
        <source>The helixsr.ini page has invalid values; fix them or untick writing the ini.</source>
        <translation>На странице helixsr.ini есть недопустимые значения; исправьте их или снимите флажок записи ini.</translation>
    </message>
    <message>
        <source>Deploy HelixSR</source>
        <translation>Развернуть HelixSR</translation>
    </message>
    <message>
        <source>Rename
{path}
to {original} and put HelixSR in its place?</source>
        <translation>Переименовать
{path}
в {original} и поместить HelixSR на его место?</translation>
    </message>
    <message>
        <source>Deploy failed</source>
        <translation>Не удалось развернуть</translation>
    </message>
    <message>
        <source>HelixSR deployed: {0} file(s) written to {1}</source>
        <translation>HelixSR развернут: файлов записано: {0} в {1}</translation>
    </message>
    <message>
        <source>HelixSR folder ready</source>
        <translation>Папка HelixSR готова</translation>
    </message>
    <message>
        <source>HelixSR is in
{folder}

Now point OptiScaler at it: the OptiScaler.ini lines on the Deploy page (Copy button) go into the game's OptiScaler.ini.</source>
        <translation>HelixSR находится в
{folder}

Теперь укажите его в OptiScaler: строки OptiScaler.ini на странице развертывания (кнопка копирования) нужно вставить в OptiScaler.ini игры.</translation>
    </message>
    <message>
        <source>Delete HelixSR's files next to
{0}
and rename the game's .original.dll back?</source>
        <translation>Удалить файлы HelixSR рядом с
{0}
и вернуть имя .original.dll игры?</translation>
    </message>
    <message>
        <source>Delete HelixSR's files in
{0}?</source>
        <translation>Удалить файлы HelixSR в
{0}?</translation>
    </message>
    <message>
        <source>Remove HelixSR</source>
        <translation>Удалить HelixSR</translation>
    </message>
    <message>
        <source>Remove failed</source>
        <translation>Не удалось удалить</translation>
    </message>
    <message>
        <source>Removed {0} file(s); HelixSR is gone from {1}</source>
        <translation>Удалено файлов: {0}; HelixSR удален из {1}</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>Папка удалена</translation>
    </message>
    <message>
        <source>{0} does not exist any more.</source>
        <translation>{0} больше не существует.</translation>
    </message>
    <message>
        <source>Wrote {0}</source>
        <translation>Записано {0}</translation>
    </message>
    <message>
        <source>Update check: {0}</source>
        <translation>Проверка обновлений: {0}</translation>
    </message>
    <message>
        <source>HelixSR {version} is out ({published}); the payload has {installed}. Get HelixSR… updates it.</source>
        <translation>Вышел HelixSR {version} ({published}); в комплекте {installed}. «Получить HelixSR…» обновит его.</translation>
    </message>
    <message>
        <source>Latest HelixSR release: {version} ({published}).</source>
        <translation>Последний релиз HelixSR: {version} ({published}).</translation>
    </message>
    <message>
        <source>{app} {version} is available: {url}</source>
        <translation>Доступен {app} {version}: {url}</translation>
    </message>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} не существует.</translation>
    </message>
    <message>
        <source>Payload is current</source>
        <translation>Комплект актуален</translation>
    </message>
    <message>
        <source>The payload already has HelixSR {version} with its network files. Download and build again anyway?</source>
        <translation>В комплекте уже есть HelixSR {version} с файлами сети. Все равно скачать и собрать заново?</translation>
    </message>
    <message>
        <source>(unknown version)</source>
        <translation>(неизвестная версия)</translation>
    </message>
    <message>
        <source>Nothing to do: the payload already has HelixSR {version} with its network files. Use Deploy to install it into a game.</source>
        <translation>Действия не требуются: в комплекте уже есть HelixSR {version} с файлами сети. Используйте развертывание, чтобы установить его в игру.</translation>
    </message>
    <message>
        <source>Payload is already current.</source>
        <translation>Комплект уже актуален.</translation>
    </message>
    <message>
        <source>HelixSR setup running…</source>
        <translation>Настройка HelixSR выполняется…</translation>
    </message>
    <message>
        <source>Cancelling…</source>
        <translation>Отмена…</translation>
    </message>
    <message>
        <source>HelixSR setup failed: {0}</source>
        <translation>Настройка HelixSR не удалась: {0}</translation>
    </message>
    <message>
        <source>HelixSR setup failed</source>
        <translation>Настройка HelixSR не удалась</translation>
    </message>
    <message>
        <source>{message} ({seconds:.0f} s)</source>
        <translation>{message} ({seconds:.0f} s)</translation>
    </message>
    <message>
        <source>NVIDIA {0} (310.7.0)</source>
        <translation>NVIDIA {0} (310.7.0)</translation>
    </message>
    <message>
        <source>No Steam library found on this PC.</source>
        <translation>На этом ПК не найдена библиотека Steam.</translation>
    </message>
    <message>
        <source>Looking for {dll} in {libraries} …</source>
        <translation>Поиск {dll} в {libraries} …</translation>
    </message>
    <message>
        <source>Copied to the clipboard</source>
        <translation>Скопировано в буфер обмена</translation>
    </message>
    <message>
        <source>Could not open</source>
        <translation>Не удалось открыть</translation>
    </message>
    <message>
        <source>Second FidelityFX upscaler DLL (e.g. AMD&apos;s with FSR 4)</source>
        <translation>Вторая DLL апскейлера FidelityFX (например, от AMD с FSR 4)</translation>
    </message>
    <message>
        <source>DLL files (*.dll)</source>
        <translation>Файлы DLL (*.dll)</translation>
    </message>
    <message>
        <source>The second upscaler is in the folder as {0}; OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR.</source>
        <translation>Второй апскейлер лежит в папке как {0}; меню «FFX Upscaler» в OptiScaler показывает его апскейлеры после HelixSR.</translation>
    </message>
</context><context>
    <name>OverviewPage</name>
    <message>
        <source>Overview</source>
        <translation>Обзор</translation>
    </message>
    <message>
        <source>Refresh</source>
        <translation>Обновить</translation>
    </message>
    <message>
        <source>HelixSR payload</source>
        <translation>Комплект HelixSR</translation>
    </message>
    <message>
        <source>Upscaler DLL</source>
        <translation>DLL апскейлера</translation>
    </message>
    <message>
        <source>Weights</source>
        <translation>Веса</translation>
    </message>
    <message>
        <source>Kernels</source>
        <translation>Ядра</translation>
    </message>
    <message>
        <source>helixsr.ini</source>
        <translation>helixsr.ini</translation>
    </message>
    <message>
        <source>The Setup page downloads a HelixSR release and builds its network files (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) from NVIDIA's DLSS DLL for you. Or do it by hand: extract the release, run its &lt;code&gt;helixsr-setup.sh&lt;/code&gt; there once and import that folder here. The network files are NVIDIA's property: they stay on this PC and are never part of this app.</source>
        <translation>Страница настройки скачивает релиз HelixSR и собирает для вас файлы сети (&lt;code&gt;{weights}&lt;/code&gt;, &lt;code&gt;{kernels}&lt;/code&gt;) из DLL DLSS от NVIDIA. Можно сделать вручную: распакуйте релиз, один раз запустите там &lt;code&gt;helixsr-setup.sh&lt;/code&gt; и импортируйте эту папку здесь. Файлы сети являются собственностью NVIDIA: они остаются на этом ПК и никогда не входят в состав этого приложения.</translation>
    </message>
    <message>
        <source>Get HelixSR…</source>
        <translation>Получить HelixSR…</translation>
    </message>
    <message>
        <source>Open the Setup page: download the latest release and build the network files in one go.</source>
        <translation>Открыть страницу настройки: скачать последний релиз и сразу собрать файлы сети.</translation>
    </message>
    <message>
        <source>Import release folder…</source>
        <translation>Импортировать папку релиза…</translation>
    </message>
    <message>
        <source>The folder the HelixSR zip was extracted to, after running helixsr-setup.sh there.</source>
        <translation>Папка, куда был распакован ZIP HelixSR, после запуска в ней helixsr-setup.sh.</translation>
    </message>
    <message>
        <source>Import release zip…</source>
        <translation>Импортировать ZIP релиза…</translation>
    </message>
    <message>
        <source>The release zip as downloaded; the network files still have to be built and imported from the extracted folder afterwards.</source>
        <translation>ZIP релиза как скачан; файлы сети все равно нужно затем собрать и импортировать из распакованной папки.</translation>
    </message>
    <message>
        <source>Open payload folder</source>
        <translation>Открыть папку комплекта</translation>
    </message>
    <message>
        <source>Deployments</source>
        <translation>Развертывания</translation>
    </message>
    <message>
        <source>Game</source>
        <translation>Игра</translation>
    </message>
    <message>
        <source>Mode</source>
        <translation>Режим</translation>
    </message>
    <message>
        <source>State</source>
        <translation>Состояние</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>Deployed</source>
        <translation>Развернуто</translation>
    </message>
    <message>
        <source>Location</source>
        <translation>Расположение</translation>
    </message>
    <message>
        <source>Nothing deployed yet. Use the Deploy page.</source>
        <translation>Пока ничего не развернуто. Используйте страницу развертывания.</translation>
    </message>
    <message>
        <source>Open folder</source>
        <translation>Открыть папку</translation>
    </message>
    <message>
        <source>Forget entry</source>
        <translation>Забыть запись</translation>
    </message>
    <message>
        <source>Drop the entry from this list without touching the game. For deployments whose files are already gone.</source>
        <translation>Удалить запись из списка, не трогая игру. Для развертываний, файлы которых уже удалены.</translation>
    </message>
    <message>
        <source>Remove HelixSR from game</source>
        <translation>Удалить HelixSR из игры</translation>
    </message>
    <message>
        <source>Delete HelixSR's files there and put the game's original DLL back.</source>
        <translation>Удалить там файлы HelixSR и вернуть исходную DLL игры.</translation>
    </message>
    <message>
        <source>Present</source>
        <translation>Есть</translation>
    </message>
    <message>
        <source>Missing</source>
        <translation>Отсутствует</translation>
    </message>
    <message>
        <source>Default</source>
        <translation>По умолчанию</translation>
    </message>
    <message>
        <source>No helixsr.ini in the payload: HelixSR's defaults are used as the template.</source>
        <translation>В комплекте нет helixsr.ini: как шаблон используются значения HelixSR по умолчанию.</translation>
    </message>
    <message>
        <source>HelixSR (version unknown)</source>
        <translation>HelixSR (версия неизвестна)</translation>
    </message>
    <message>
        <source>{version} ready to deploy.</source>
        <translation>{version} готов к развертыванию.</translation>
    </message>
    <message>
        <source>{version} imported, but the network files are missing: run helixsr-setup.sh in the extracted release and import the folder again.</source>
        <translation>{version} импортирован, но файлы сети отсутствуют: запустите helixsr-setup.sh в распакованном релизе и импортируйте папку снова.</translation>
    </message>
    <message>
        <source>No payload yet: import an extracted HelixSR release.</source>
        <translation>Комплекта еще нет: импортируйте распакованный релиз HelixSR.</translation>
    </message>
    <message>
        <source>Folder: {0}</source>
        <translation>Папка: {0}</translation>
    </message>
    <message>
        <source>Replaced DLL</source>
        <translation>Замененная DLL</translation>
    </message>
    <message>
        <source>OptiScaler folder</source>
        <translation>Папка OptiScaler</translation>
    </message>
</context><context>
    <name>SetupPage</name>
    <message>
        <source>Unknown</source>
        <translation>Неизвестно</translation>
    </message>
    <message>
        <source>Update</source>
        <translation>Обновление</translation>
    </message>
    <message>
        <source>Up to date</source>
        <translation>Актуально</translation>
    </message>
    <message>
        <source>Setup</source>
        <translation>Настройка</translation>
    </message>
    <message>
        <source>One click does what the HelixSR README asks you to do by hand: download the release, fetch NVIDIA's DLSS DLL, Microsoft's shader compiler and (on Bazzite) a portable Python in parallel, run &lt;code&gt;helixsr-setup.sh&lt;/code&gt; and import the result as the payload. The DLSS DLL is used once and deleted; the network files it produces are NVIDIA's property and stay on this PC.</source>
        <translation>Один щелчок выполняет то, что README HelixSR предлагает делать вручную: скачать релиз, параллельно получить DLL DLSS от NVIDIA, компилятор шейдеров Microsoft и (на Bazzite) переносимый Python, запустить &lt;code&gt;helixsr-setup.sh&lt;/code&gt; и импортировать результат как комплект. DLL DLSS используется один раз и удаляется; созданные из нее файлы сети являются собственностью NVIDIA и остаются на этом ПК.</translation>
    </message>
    <message>
        <source>Releases</source>
        <translation>Релизы</translation>
    </message>
    <message>
        <source>Not checked</source>
        <translation>Не проверено</translation>
    </message>
    <message>
        <source>HelixSR</source>
        <translation>HelixSR</translation>
    </message>
    <message>
        <source>This app</source>
        <translation>Это приложение</translation>
    </message>
    <message>
        <source>Check now</source>
        <translation>Проверить сейчас</translation>
    </message>
    <message>
        <source>Ask GitHub for the latest HelixSR release and the latest release of this app</source>
        <translation>Запросить у GitHub последний релиз HelixSR и последний релиз этого приложения</translation>
    </message>
    <message>
        <source>Check at start</source>
        <translation>Проверять при запуске</translation>
    </message>
    <message>
        <source>Look up both releases every time the app starts (one small request each)</source>
        <translation>Искать оба релиза при каждом запуске приложения (по одному небольшому запросу)</translation>
    </message>
    <message>
        <source>Get HelixSR and build the network files</source>
        <translation>Получить HelixSR и собрать файлы сети</translation>
    </message>
    <message>
        <source>Use a {0} already on this PC:</source>
        <translation>Использовать {0}, уже имеющийся на этом ПК:</translation>
    </message>
    <message>
        <source>Skips the 59 MB download from NVIDIA's GitHub. Only DLSS 310.7.0 (the exact build HelixSR pins) is accepted; Find looks through the Steam libraries for one.</source>
        <translation>Пропускает скачивание 59 МБ с GitHub NVIDIA. Принимается только DLSS 310.7.0 (точная сборка, закрепленная HelixSR); поиск просматривает библиотеки Steam.</translation>
    </message>
    <message>
        <source>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</source>
        <translation>…/steamapps/common/&lt;game&gt;/nvngx_dlss.dll</translation>
    </message>
    <message>
        <source>Browse…</source>
        <translation>Обзор…</translation>
    </message>
    <message>
        <source>Find in Steam</source>
        <translation>Найти в Steam</translation>
    </message>
    <message>
        <source>Scan the Steam libraries for a DLSS 310.7.0 DLL (checks each file's checksum)</source>
        <translation>Просканировать библиотеки Steam на DLL DLSS 310.7.0 (проверяется контрольная сумма каждого файла)</translation>
    </message>
    <message>
        <source>Download and build</source>
        <translation>Скачать и собрать</translation>
    </message>
    <message>
        <source>Download the latest release and everything the setup needs, run helixsr-setup.sh and import the result</source>
        <translation>Скачать последний релиз и все необходимое для настройки, запустить helixsr-setup.sh и импортировать результат</translation>
    </message>
    <message>
        <source>Cancel</source>
        <translation>Отменить</translation>
    </message>
    <message>
        <source>Import built release</source>
        <translation>Импортировать собранный релиз</translation>
    </message>
    <message>
        <source>Import the network files built in the work folder into the payload</source>
        <translation>Импортировать файлы сети, собранные в рабочей папке, в комплект</translation>
    </message>
    <message>
        <source>Open work folder</source>
        <translation>Открыть рабочую папку</translation>
    </message>
    <message>
        <source>Idle</source>
        <translation>Ожидание</translation>
    </message>
    <message>
        <source>Output of the downloads and of helixsr-setup.sh</source>
        <translation>Вывод загрузок и helixsr-setup.sh</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</source>
        <translation> — &lt;a href="{url}"&gt;{name}&lt;/a&gt; ({size})</translation>
    </message>
    <message>
        <source> — &lt;a href="{url}"&gt;release page&lt;/a&gt;</source>
        <translation> — &lt;a href="{url}"&gt;страница релиза&lt;/a&gt;</translation>
    </message>
    <message>
        <source>Checking…</source>
        <translation>Проверка…</translation>
    </message>
    <message>
        <source>Found {0} matching {1}: {2}</source>
        <translation>Найдено {0}, соответствующее {1}: {2}</translation>
    </message>
    <message>
        <source>No DLSS 310.7.0 {0} found in the Steam libraries; it will be downloaded.</source>
        <translation>В библиотеках Steam не найден {0} DLSS 310.7.0; он будет скачан.</translation>
    </message>
    <message>
        <source>{done} / {total}  (%p%)</source>
        <translation>{done} / {total}  (%p%)</translation>
    </message>
    <message>
        <source>Downloading: {0}</source>
        <translation>Загрузка: {0}</translation>
    </message>
    <message>
        <source>{0} — {1}:{2:02d} elapsed</source>
        <translation>{0} — прошло {1}:{2:02d}</translation>
    </message>
    <message>
        <source>{0} — took {1}:{2:02d}</source>
        <translation>{0} — заняло {1}:{2:02d}</translation>
    </message>
</context><context>
    <name>StatusPill</name>
    <message>
        <source>Unknown</source>
        <translation>Неизвестно</translation>
    </message>
</context><context>
    <name>acquire</name>
    <message>
        <source>GitHub answered {0}</source>
        <translation>GitHub ответил {0}</translation>
    </message>
    <message>
        <source>no connection ({0})</source>
        <translation>нет подключения ({0})</translation>
    </message>
    <message>
        <source>unexpected tag {0}</source>
        <translation>неожиданный тег {0}</translation>
    </message>
    <message>
        <source>not installed</source>
        <translation>не установлено</translation>
    </message>
    <message>
        <source>{0} (latest: unknown, {1})</source>
        <translation>{0} (последняя версия неизвестна, {1})</translation>
    </message>
    <message>
        <source>{0} (latest: unknown)</source>
        <translation>{0} (последняя версия неизвестна)</translation>
    </message>
    <message>
        <source>{0} → {1} available ({2})</source>
        <translation>доступно {0} → {1} ({2})</translation>
    </message>
    <message>
        <source>{0} (up to date, released {1})</source>
        <translation>{0} (актуально, выпущено {1})</translation>
    </message>
    <message>
        <source>{0}; latest release {1} ({2})</source>
        <translation>{0}; последний релиз {1} ({2})</translation>
    </message>
    <message>
        <source>{0}: server answered {1} for {2}</source>
        <translation>{0}: сервер ответил {1} для {2}</translation>
    </message>
    <message>
        <source>{0}: download failed ({1})</source>
        <translation>{0}: загрузка не удалась ({1})</translation>
    </message>
    <message>
        <source>{0}: checksum mismatch, the download is not the file HelixSR expects. Nothing was kept.</source>
        <translation>{0}: контрольная сумма не совпадает, скачанный файл не тот, который ожидает HelixSR. Ничего не сохранено.</translation>
    </message>
    <message>
        <source>No {0} in {1}: not a HelixSR release.</source>
        <translation>В {1} нет {0}: это не релиз HelixSR.</translation>
    </message>
    <message>
        <source>{0} contains an unsafe path: {1}</source>
        <translation>{0} содержит небезопасный путь: {1}</translation>
    </message>
    <message>
        <source>the shader compiler archive has no bin/x64 folder</source>
        <translation>в архиве компилятора шейдеров нет папки bin/x64</translation>
    </message>
    <message>
        <source>unsafe path in {0}: {1}</source>
        <translation>небезопасный путь в {0}: {1}</translation>
    </message>
    <message>
        <source>the portable Python archive did not produce python/bin/python3</source>
        <translation>архив переносимого Python не создал python/bin/python3</translation>
    </message>
    <message>
        <source>Cancelled.</source>
        <translation>Отменено.</translation>
    </message>
    <message>
        <source>HelixSR {0} is built in {1}</source>
        <translation>HelixSR {0} собран в {1}</translation>
    </message>
    <message>
        <source>Could not look up the latest HelixSR release: {0}</source>
        <translation>Не удалось найти последний релиз HelixSR: {0}</translation>
    </message>
    <message>
        <source>HelixSR {0} has no zip to download; see {1}</source>
        <translation>У HelixSR {0} нет ZIP для загрузки; см. {1}</translation>
    </message>
    <message>
        <source>Downloading HelixSR {0}</source>
        <translation>Загрузка HelixSR {0}</translation>
    </message>
    <message>
        <source>Using the already downloaded {0}</source>
        <translation>Используется уже скачанный {0}</translation>
    </message>
    <message>
        <source>Downloading {0}</source>
        <translation>Загрузка {0}</translation>
    </message>
    <message>
        <source>Extracted to {0}</source>
        <translation>Распаковано в {0}</translation>
    </message>
    <message>
        <source>The release has no {0}.</source>
        <translation>В релизе нет {0}.</translation>
    </message>
    <message>
        <source>Could not read the pinned source(s) for {0} from the setup scripts; the script will download them itself.</source>
        <translation>Не удалось прочитать закрепленные источники для {0} из скриптов настройки; скрипт скачает их сам.</translation>
    </message>
    <message>
        <source>Downloading {0} in parallel</source>
        <translation>Параллельная загрузка {0}</translation>
    </message>
    <message>
        <source>Shader compiler unpacked to {0}</source>
        <translation>Компилятор шейдеров распакован в {0}</translation>
    </message>
    <message>
        <source>Portable Python unpacked to {0}</source>
        <translation>Переносимый Python распакован в {0}</translation>
    </message>
    <message>
        <source>Building the network files (about 5-6 minutes on a BC-250)</source>
        <translation>Сборка файлов сети (около 5-6 минут на BC-250)</translation>
    </message>
    <message>
        <source>Could not start {0}: {1}</source>
        <translation>Не удалось запустить {0}: {1}</translation>
    </message>
    <message>
        <source>Deleted the downloaded {0}</source>
        <translation>Скачанный {0} удален</translation>
    </message>
    <message>
        <source>{0} exited with code {1}; see the output above.</source>
        <translation>{0} завершился с кодом {1}; см. вывод выше.</translation>
    </message>
    <message>
        <source>The setup finished but did not produce {0}</source>
        <translation>Настройка завершилась, но не создала {0}</translation>
    </message>
    <message>
        <source>no release tagged {0} yet</source>
        <translation>пока нет релиза с тегом {0}</translation>
    </message>
</context><context>
    <name>backend</name>
    <message>
        <source>{0} does not exist.</source>
        <translation>{0} не существует.</translation>
    </message>
    <message>
        <source>{0} is not a zip archive or a folder.</source>
        <translation>{0} не является ZIP-архивом или папкой.</translation>
    </message>
    <message>
        <source>No {0} found in {1}. Pick the folder the HelixSR release was extracted to (or the release zip itself).</source>
        <translation>В {1} не найден {0}. Выберите папку, куда был распакован релиз HelixSR (или сам ZIP релиза).</translation>
    </message>
    <message>
        <source>HelixSR deployed</source>
        <translation>HelixSR развернут</translation>
    </message>
    <message>
        <source>HelixSR deployed (other build)</source>
        <translation>HelixSR развернут (другая сборка)</translation>
    </message>
    <message>
        <source>HelixSR (no original kept)</source>
        <translation>HelixSR (исходник не сохранен)</translation>
    </message>
    <message>
        <source>Game's own DLL</source>
        <translation>Собственная DLL игры</translation>
    </message>
    <message>
        <source>The payload is incomplete, missing: {0}. Import the extracted HelixSR release after running its helixsr-setup.sh.</source>
        <translation>Комплект неполный, отсутствует: {0}. Импортируйте распакованный релиз HelixSR после запуска его helixsr-setup.sh.</translation>
    </message>
    <message>
        <source>{0} is not an FSR 3.1 upscaler DLL ({1}).</source>
        <translation>{0} не является DLL апскейлера FSR 3.1 ({1}).</translation>
    </message>
    <message>
        <source>{0} is not HelixSR (no {1} next to it and it differs from the payload). Nothing was changed.</source>
        <translation>{0} не является HelixSR (рядом нет {1}, и файл отличается от комплекта). Ничего не изменено.</translation>
    </message>
    <message>
        <source>{0} holds a game's own {1} (there is a {2}): this is a replaced DLL, not a stand-alone folder. Use Remove on the DLL instead.</source>
        <translation>{0} содержит собственный {1} игры (есть {2}): это замененная DLL, а не отдельная папка. Вместо этого используйте удаление для DLL.</translation>
    </message>
    <message>
        <source>{0} is not HelixSR; nothing was changed.</source>
        <translation>{0} не является HelixSR; ничего не изменено.</translation>
    </message>
    <message>
        <source>Folder gone</source>
        <translation>Папка удалена</translation>
    </message>
    <message>
        <source>Removed</source>
        <translation>Удалено</translation>
    </message>
    <message>
        <source>In place</source>
        <translation>На месте</translation>
    </message>
    <message>
        <source>Network files missing</source>
        <translation>Нет файлов сети</translation>
    </message>
    <message>
        <source>DLL missing</source>
        <translation>Нет DLL</translation>
    </message>
    <message>
        <source>Only the backup is left</source>
        <translation>Осталась только копия</translation>
    </message>
    <message>
        <source>Original restored</source>
        <translation>Исходник возвращен</translation>
    </message>
    <message>
        <source>Older build</source>
        <translation>Старая сборка</translation>
    </message>
    <message>
        <source>{0} is HelixSR itself; pick another FidelityFX upscaler DLL, e.g. AMD&apos;s with FSR 4.</source>
        <translation>{0} — это сам HelixSR; выберите другую DLL апскейлера FidelityFX, например от AMD с FSR 4.</translation>
    </message>
</context><context>
    <name>help</name>
    <message>
        <source>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</source>
        <translation>&lt;h1&gt;{app_name} &lt;small&gt;v{version}&lt;/small&gt;&lt;/h1&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Installs &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, the FSR/DLSS hybrid upscaler for Direct3D 12 tuned for the &lt;b&gt;AMD BC-250&lt;/b&gt;, into games on &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR runs NVIDIA's DLSS Model E network as plain compute shaders on an AMD GPU; games talk to it as FSR 3.1. This app only copies, renames and deletes files inside the game folders you point it at and inside its own payload folder. Nothing on the system is touched, no root is needed.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Устанавливает &lt;a href="{helixsr_url}"&gt;HelixSR&lt;/a&gt;, гибридный апскейлер FSR/DLSS для Direct3D 12, настроенный для &lt;b&gt;AMD BC-250&lt;/b&gt;, в игры на &lt;b&gt;Bazzite&lt;/b&gt;. HelixSR запускает сеть NVIDIA DLSS Model E как обычные вычислительные шейдеры на GPU AMD; для игр он выглядит как FSR 3.1. Это приложение только копирует, переименовывает и удаляет файлы в указанных вами папках игр и в собственной папке комплекта. Система не затрагивается, root не нужен.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;How HelixSR is installed (what the app does for you)&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Как устанавливается HelixSR (что приложение делает за вас)&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;The game's FSR 3.1 upscaler DLL, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (Unreal Engine games keep it under &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) or &lt;code&gt;{helixsr_dll}&lt;/code&gt;, is renamed to &lt;code&gt;*.original.dll&lt;/code&gt;. That file is the backup &lt;i&gt;and&lt;/i&gt; is still used: HelixSR forwards frame generation and other FidelityFX effects to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;DLL апскейлера FSR 3.1 игры, &lt;code&gt;{upscaler_dll}&lt;/code&gt; (игры Unreal Engine хранят ее в &lt;code&gt;Engine/Plugins/…/ThirdParty/Win64&lt;/code&gt;) или &lt;code&gt;{helixsr_dll}&lt;/code&gt;, переименовывается в &lt;code&gt;*.original.dll&lt;/code&gt;. Этот файл служит резервной копией &lt;i&gt;и&lt;/i&gt; продолжает использоваться: HelixSR передает ему генерацию кадров и другие эффекты FidelityFX.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR's &lt;code&gt;{helixsr_dll}&lt;/code&gt; is copied in under the game's original file name, together with &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;&lt;code&gt;{helixsr_dll}&lt;/code&gt; из HelixSR копируется под исходным именем файла игры вместе с &lt;code&gt;{weights}&lt;/code&gt; и &lt;code&gt;{kernels}&lt;/code&gt;.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Optionally a &lt;code&gt;{ini}&lt;/code&gt; is written next to it.&lt;/li&gt;</source>
        <translation>&lt;li&gt;При необходимости рядом записывается &lt;code&gt;{ini}&lt;/code&gt;.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Start the game normally and select &lt;b&gt;AMD FSR&lt;/b&gt; as the upscaler. No launch options are needed.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Запустите игру обычным способом и выберите &lt;b&gt;AMD FSR&lt;/b&gt; как апскейлер. Параметры запуска не нужны.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Remove&lt;/b&gt; undoes it: HelixSR's files are deleted and the &lt;code&gt;.original.dll&lt;/code&gt; gets its name back.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Удалить&lt;/b&gt; отменяет установку: файлы HelixSR удаляются, а &lt;code&gt;.original.dll&lt;/code&gt; получает свое имя обратно.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Setup&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Настройка&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Download and build&lt;/b&gt; does the HelixSR README's setup for you: it fetches the latest release zip from &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 MB), reads the exact sources and SHA-256 sums the release's own setup scripts pin, downloads what this PC still needs &lt;i&gt;in parallel&lt;/i&gt; and verifies each file: NVIDIA's DLSS 310.7.0 DLL (59 MB, from NVIDIA's GitHub under NVIDIA's license), Microsoft's DirectX Shader Compiler (25 MB) and, on read-only systems such as Bazzite, a portable Python (67 MB, numpy is added by the script). Then it runs &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; with its output on the page: the script builds &lt;code&gt;{weights}&lt;/code&gt; and &lt;code&gt;{kernels}&lt;/code&gt; (5-6 minutes, the shader compiler runs through your Proton) and the result is imported as the payload. The DLSS DLL is deleted afterwards. Everything is downloaded into &lt;code&gt;{work_dir}&lt;/code&gt; and &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (the script's own cache, reused next time).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Скачать и собрать&lt;/b&gt; выполняет за вас настройку из README HelixSR: получает последний ZIP релиза с &lt;a href="{releases_url}"&gt;GitHub&lt;/a&gt; (2 МБ), читает точные источники и суммы SHA-256, закрепленные скриптами настройки самого релиза, &lt;i&gt;параллельно&lt;/i&gt; скачивает то, чего еще не хватает на этом ПК, и проверяет каждый файл: DLL NVIDIA DLSS 310.7.0 (59 МБ, с GitHub NVIDIA по лицензии NVIDIA), Microsoft DirectX Shader Compiler (25 МБ) и, на системах только для чтения вроде Bazzite, переносимый Python (67 МБ, numpy добавляется скриптом). Затем запускается &lt;code&gt;helixsr-setup.sh --yes&lt;/code&gt; с выводом на странице: скрипт собирает &lt;code&gt;{weights}&lt;/code&gt; и &lt;code&gt;{kernels}&lt;/code&gt; (5-6 минут, компилятор шейдеров запускается через ваш Proton), а результат импортируется как комплект. DLL DLSS после этого удаляется. Все скачивается в &lt;code&gt;{work_dir}&lt;/code&gt; и &lt;code&gt;~/.local/share/HelixSR&lt;/code&gt; (собственный кэш скрипта, повторно используемый в следующий раз).&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;If a game you own already ships DLSS 310.7.0, tick &lt;b&gt;Use a nvngx_dlss.dll already on this PC&lt;/b&gt; and let &lt;b&gt;Find in Steam&lt;/b&gt; locate it (checksums are compared, only the exact build HelixSR pins is offered): that skips NVIDIA's download. The downloads are not what takes time; the build is.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Если в вашей игре уже есть DLSS 310.7.0, установите флажок &lt;b&gt;Использовать nvngx_dlss.dll, уже имеющийся на этом ПК&lt;/b&gt; и позвольте &lt;b&gt;Найти в Steam&lt;/b&gt; обнаружить его (контрольные суммы сравниваются, предлагается только точная сборка, закрепленная HelixSR): это пропустит загрузку с NVIDIA. Время занимает не загрузка, а сборка.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Releases&lt;/b&gt; compares the payload with the latest HelixSR release and this app with its latest release on GitHub, at start (one small request each, can be turned off) or with &lt;b&gt;Check now&lt;/b&gt;. A newer HelixSR shows on the Overview too; &lt;b&gt;Download and build&lt;/b&gt; again updates the payload, then deploy again per game (the Overview marks them &lt;i&gt;Older build&lt;/i&gt;).&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Релизы&lt;/b&gt; сравнивают комплект с последним релизом HelixSR, а это приложение — с его последним релизом на GitHub: при запуске (по одному небольшому запросу, можно отключить) или кнопкой &lt;b&gt;Проверить сейчас&lt;/b&gt;. Более новый HelixSR также отображается в обзоре; повторное &lt;b&gt;Скачать и собрать&lt;/b&gt; обновит комплект, после чего нужно снова развернуть его для каждой игры (в обзоре они помечаются как &lt;i&gt;Старая сборка&lt;/i&gt;).&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Overview&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Обзор&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The &lt;b&gt;payload&lt;/b&gt; is your copy of a HelixSR release: the DLL, the two network files and the ini, kept in &lt;code&gt;{payload_dir}&lt;/code&gt;. It is filled by the Setup page, or by hand: extract a release, run &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; in that folder once and &lt;b&gt;Import release folder…&lt;/b&gt;. The network files contain NVIDIA's network: they are for your own PC and are never part of this app or its releases. &lt;b&gt;Import release zip…&lt;/b&gt; takes the download as is, but the network files are still missing until the setup has run and the folder is imported.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Комплект&lt;/b&gt; — это ваша копия релиза HelixSR: DLL, два файла сети и ini, хранящиеся в &lt;code&gt;{payload_dir}&lt;/code&gt;. Он заполняется страницей настройки или вручную: распакуйте релиз, один раз запустите &lt;code&gt;./helixsr-setup.sh&lt;/code&gt; в этой папке и нажмите &lt;b&gt;Импортировать папку релиза…&lt;/b&gt;. Файлы сети содержат сеть NVIDIA: они предназначены для вашего ПК и никогда не входят в состав этого приложения или его релизов. &lt;b&gt;Импортировать ZIP релиза…&lt;/b&gt; принимает скачанный файл как есть, но файлы сети будут отсутствовать, пока не будет выполнена настройка и импортирована папка.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Deployments&lt;/b&gt; lists every place the app put HelixSR, with its live state: &lt;i&gt;In place&lt;/i&gt;, &lt;i&gt;Older build&lt;/i&gt; (the payload has been updated since; deploy again to update the game), &lt;i&gt;Network files missing&lt;/i&gt;, &lt;i&gt;Original restored&lt;/i&gt; or &lt;i&gt;Removed&lt;/i&gt;. The list is kept in &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Forget entry&lt;/b&gt; drops a line without touching the game.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Развертывания&lt;/b&gt; перечисляют все места, куда приложение поместило HelixSR, с текущим состоянием: &lt;i&gt;На месте&lt;/i&gt;, &lt;i&gt;Старая сборка&lt;/i&gt; (комплект с тех пор обновлен; разверните снова, чтобы обновить игру), &lt;i&gt;Нет файлов сети&lt;/i&gt;, &lt;i&gt;Исходник возвращен&lt;/i&gt; или &lt;i&gt;Удалено&lt;/i&gt;. Список хранится в &lt;code&gt;{deployments_file}&lt;/code&gt;; &lt;b&gt;Забыть запись&lt;/b&gt; удаляет строку, не трогая игру.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Deploy&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Развертывание&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Pick a game from the Steam libraries found on this PC (&lt;code&gt;steamapps/common&lt;/code&gt; of every library in &lt;code&gt;libraryfolders.vdf&lt;/code&gt;) or &lt;b&gt;Browse…&lt;/b&gt; to any folder (Heroic, Lutris, Bottles). The folder is scanned for FSR 3.1 upscaler DLLs; each one shows whether it is the game's own file, HelixSR, and whether the network files are next to it. Select the one the game loads (usually the only one) and &lt;b&gt;Deploy HelixSR&lt;/b&gt;.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Выберите игру из библиотек Steam, найденных на этом ПК (&lt;code&gt;steamapps/common&lt;/code&gt; каждой библиотеки в &lt;code&gt;libraryfolders.vdf&lt;/code&gt;), или нажмите &lt;b&gt;Обзор…&lt;/b&gt; и укажите любую папку (Heroic, Lutris, Bottles). Папка сканируется на DLL апскейлера FSR 3.1; для каждой показывается, является ли она собственным файлом игры или HelixSR и есть ли рядом файлы сети. Выберите ту, которую загружает игра (обычно единственную), и нажмите &lt;b&gt;Развернуть HelixSR&lt;/b&gt;.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Stand-alone folder for OptiScaler&lt;/b&gt; is for games that do not ship FSR 3.1 as a separate DLL (DLSS, XeSS, FSR 2 / 3.0 games). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; routes their upscaler calls to an FSR 3.1 DLL. The app writes HelixSR under both FidelityFX names into a folder of its own (default &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) and shows the &lt;code&gt;OptiScaler.ini&lt;/code&gt; lines that point OptiScaler there (Windows paths; &lt;code&gt;Z:&lt;/code&gt; is the Linux root under Proton). Install OptiScaler for the game as its documentation describes, paste the lines, and pick &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; in OptiScaler's FFX Upscaler menu.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Отдельная папка для OptiScaler&lt;/b&gt; предназначена для игр, которые не поставляют FSR 3.1 отдельной DLL (игры с DLSS, XeSS, FSR 2 / 3.0). &lt;a href="{optiscaler_url}"&gt;OptiScaler&lt;/a&gt; перенаправляет их вызовы апскейлера в DLL FSR 3.1. Приложение записывает HelixSR под обоими именами FidelityFX в отдельную папку (по умолчанию &lt;code&gt;&amp;lt;game&amp;gt;/HelixSR&lt;/code&gt;) и показывает строки &lt;code&gt;OptiScaler.ini&lt;/code&gt;, указывающие OptiScaler туда (пути Windows; &lt;code&gt;Z:&lt;/code&gt; — корень Linux в Proton). Установите OptiScaler для игры по его документации, вставьте строки и выберите &lt;b&gt;FSR HelixSR (3.1.5)&lt;/b&gt; в меню FFX Upscaler OptiScaler.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Deploying again over an existing deployment updates HelixSR's files and keeps the game's original.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Повторное развертывание поверх существующего обновляет файлы HelixSR и сохраняет исходный файл игры.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;helixsr.ini&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;th&gt;Section&lt;/th&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Default&lt;/th&gt;&lt;th&gt;Meaning&lt;/th&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;th&gt;Раздел&lt;/th&gt;&lt;th&gt;Ключ&lt;/th&gt;&lt;th&gt;По умолчанию&lt;/th&gt;&lt;th&gt;Значение&lt;/th&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (as DLSS), &lt;i&gt;game&lt;/i&gt; = the game's FSR sharpness (or Sharpness if it sends none), &lt;i&gt;override&lt;/i&gt; = always Sharpness&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Mode&lt;/td&gt;&lt;td&gt;off&lt;/td&gt;&lt;td&gt;&lt;i&gt;off&lt;/i&gt; (как DLSS), &lt;i&gt;game&lt;/i&gt; = резкость FSR из игры (или Sharpness, если игра ее не передает), &lt;i&gt;override&lt;/i&gt; = всегда Sharpness&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, FidelityFX RCAS scale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;Sharpness&lt;/td&gt;&lt;td&gt;0.3&lt;/td&gt;&lt;td&gt;0-1, шкала FidelityFX RCAS&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Less sharpening on fast-moving pixels: where the reduction starts and is complete (output pixels per frame), and how much is removed&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Sharpening]&lt;/td&gt;&lt;td&gt;MotionAdaptive, MotionThreshold, MotionLimit, MotionReduction&lt;/td&gt;&lt;td&gt;true, 2, 16, 0.6&lt;/td&gt;&lt;td&gt;Меньше резкости на быстро движущихся пикселях: где снижение начинается и становится полным (выходные пиксели за кадр) и какая доля убирается&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Run the Model E network; otherwise a placeholder upscale&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Запускать сеть Model E; иначе используется заглушка апскейла&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: the main network at every ratio (about 30 % faster than NVIDIA's Ultra Performance network on GPUs without matrix cores); &lt;i&gt;nvidia&lt;/i&gt;: as DLSS selects; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;Network&lt;/td&gt;&lt;td&gt;auto&lt;/td&gt;&lt;td&gt;&lt;i&gt;auto&lt;/i&gt;: основная сеть при любом коэффициенте (примерно на 30 % быстрее сети Ultra Performance от NVIDIA на GPU без матричных ядер); &lt;i&gt;nvidia&lt;/i&gt;: как выбирает DLSS; &lt;i&gt;main&lt;/i&gt; / &lt;i&gt;ultraperformance&lt;/i&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;For games whose jitter or motion vectors come out mirrored&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;InvertJitter, InvertMotionVectors&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Для игр, где jitter или векторы движения получаются зеркальными&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Convert render-resolution motion vectors to display resolution first (used anyway when the game's vectors include the jitter)&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[ModelE]&lt;/td&gt;&lt;td&gt;MotionVectorFrontEnd&lt;/td&gt;&lt;td&gt;false&lt;/td&gt;&lt;td&gt;Сначала преобразовать векторы движения из разрешения рендера в разрешение вывода (все равно используется, когда векторы игры включают jitter)&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Writes &lt;code&gt;helixsr.log&lt;/code&gt; next to the DLL; it names the network that runs and reports missing network files&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Log]&lt;/td&gt;&lt;td&gt;Enabled&lt;/td&gt;&lt;td&gt;true&lt;/td&gt;&lt;td&gt;Записывает &lt;code&gt;helixsr.log&lt;/code&gt; рядом с DLL; указывает запущенную сеть и сообщает об отсутствующих файлах сети&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL for the other FidelityFX effects (frame generation): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt; if present, else &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;Dll&lt;/td&gt;&lt;td&gt;(auto)&lt;/td&gt;&lt;td&gt;DLL для других эффектов FidelityFX (генерации кадров): &lt;code&gt;amd_fidelityfx_dx12.original.dll&lt;/code&gt;, если есть, иначе &lt;code&gt;amd_fidelityfx_framegeneration_dx12.dll&lt;/code&gt;&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;A second FidelityFX upscaler DLL (e.g. AMD's with FSR 4) listed after HelixSR in OptiScaler's menu&lt;/td&gt;&lt;/tr&gt;</source>
        <translation>&lt;tr&gt;&lt;td&gt;[Forwarding]&lt;/td&gt;&lt;td&gt;UpscalerDll&lt;/td&gt;&lt;td&gt;(empty)&lt;/td&gt;&lt;td&gt;Вторая DLL апскейлера FidelityFX (например, AMD с FSR 4), отображаемая после HelixSR в меню OptiScaler&lt;/td&gt;&lt;/tr&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;The page edits these values and shows the resulting file; the comments of the payload's own &lt;code&gt;{ini}&lt;/code&gt; are kept, only values change. &lt;b&gt;Save as payload default&lt;/b&gt; makes it the file Deploy starts from; &lt;b&gt;Write to game&lt;/b&gt; replaces the ini of a chosen deployment. Sharpening off costs nothing; on, about 0.4 ms at 4K on the BC-250.&lt;/p&gt;</source>
        <translation>&lt;p&gt;Страница редактирует эти значения и показывает итоговый файл; комментарии собственного &lt;code&gt;{ini}&lt;/code&gt; комплекта сохраняются, меняются только значения. &lt;b&gt;Сохранить как стандарт комплекта&lt;/b&gt; делает его файлом, с которого начинается развертывание; &lt;b&gt;Записать в игру&lt;/b&gt; заменяет ini выбранного развертывания. Отключенная резкость ничего не стоит; включенная — около 0.4 ms в 4K на BC-250.&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;h2&gt;Good to know&lt;/h2&gt;</source>
        <translation>&lt;h2&gt;Полезно знать&lt;/h2&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;HelixSR is Direct3D 12 only and for RDNA 1 and newer; it is developed and tested on the BC-250 (gfx1013, Mesa RADV, Proton). Vulkan games are not supported.&lt;/li&gt;</source>
        <translation>&lt;li&gt;HelixSR работает только с Direct3D 12 и RDNA 1 или новее; он разрабатывается и тестируется на BC-250 (gfx1013, Mesa RADV, Proton). Игры Vulkan не поддерживаются.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Steam verifies game files on updates and may put the game's own DLL back. The Overview then shows &lt;i&gt;Original restored&lt;/i&gt; and the backup stays; deploy again.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Steam проверяет файлы игры при обновлениях и может вернуть собственную DLL игры. Тогда в обзоре будет показано &lt;i&gt;Исходник возвращен&lt;/i&gt;, а резервная копия останется; разверните снова.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Per-stage GPU timings: launch option &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; writes them to &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Времена этапов GPU: параметр запуска &lt;code&gt;HELIXSR_PROFILE=1 %command%&lt;/code&gt; записывает их в &lt;code&gt;helixsr.log&lt;/code&gt;.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;li&gt;Payload: &lt;code&gt;{payload_dir}&lt;/code&gt;. Deployments: &lt;code&gt;{deployments_file}&lt;/code&gt;. Window size and page are kept per user. Removing the app with &lt;code&gt;install.sh --uninstall&lt;/code&gt; leaves the payload alone.&lt;/li&gt;</source>
        <translation>&lt;li&gt;Комплект: &lt;code&gt;{payload_dir}&lt;/code&gt;. Развертывания: &lt;code&gt;{deployments_file}&lt;/code&gt;. Размер окна и страница сохраняются для каждого пользователя. Удаление приложения через &lt;code&gt;install.sh --uninstall&lt;/code&gt; не трогает комплект.&lt;/li&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;Source and issues: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. HelixSR itself: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; this app ships none of it).&lt;/p&gt;</source>
        <translation>&lt;p&gt;Исходный код и ошибки: &lt;a href="{repo_url}"&gt;{repo_url}&lt;/a&gt;. Сам HelixSR: &lt;a href="{helixsr_url}"&gt;{helixsr_url}&lt;/a&gt; (HelixSR Freeware License; это приложение не поставляет его файлы).&lt;/p&gt;</translation>
    </message>
    <message>
        <source>&lt;p&gt;&lt;b&gt;Second upscaler&lt;/b&gt; (optional, OptiScaler folder only): pick another FidelityFX upscaler DLL, for example AMD&apos;s &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; with FSR 4. It is copied into the folder as &lt;code&gt;{second}&lt;/code&gt; and &lt;code&gt;UpscalerDll&lt;/code&gt; in its helixsr.ini points at it, so OptiScaler&apos;s FFX Upscaler menu lists its upscalers after HelixSR and the one you pick runs in that DLL.&lt;/p&gt;</source>
        <translation>&lt;p&gt;&lt;b&gt;Второй апскейлер&lt;/b&gt; (необязательно, только папка OptiScaler): выберите другую DLL апскейлера FidelityFX, например &lt;code&gt;amd_fidelityfx_upscaler_dx12.dll&lt;/code&gt; от AMD с FSR 4. Она копируется в папку как &lt;code&gt;{second}&lt;/code&gt;, а &lt;code&gt;UpscalerDll&lt;/code&gt; в её helixsr.ini указывает на неё, поэтому меню «FFX Upscaler» в OptiScaler показывает её апскейлеры после HelixSR, и выбранный работает в этой DLL.&lt;/p&gt;</translation>
    </message>
</context><context>
    <name>setup_page</name>
    <message>
        <source>{0:.1f} MB</source>
        <translation>{0:.1f} МБ</translation>
    </message>
</context></TS>
