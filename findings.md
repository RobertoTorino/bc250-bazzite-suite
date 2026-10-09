# Findings

#### Docs and readme
All irrelevant information should be kept out of the docs and readme, so no decison making, plans or stuff like this: > **Status: migration step 3 of 8.** The portal works, and bazzite-test runs on the shared `bc250_core`. The other
> six apps still install and run as they did from their own repositories; they move onto core in steps 5 and 6.

They come in a separate document.


#### Errors during installation

n@bazzite:~/IdeaProjects/bc250-bazzite-suite/portal$ PYTHONPATH=../core python3 -m bc250_portal 
Traceback (most recent call last):
  File "<frozen runpy>", line 203, in _run_module_as_main
  File "<frozen runpy>", line 88, in _run_code
  File "/var/home/admin/IdeaProjects/bc250-bazzite-suite/portal/bc250_portal/__main__.py", line 11, in <module>
    from PyQt6.QtWidgets import QMessageBox
ModuleNotFoundError: No module named 'PyQt6'
admin@bazzite:~/IdeaProjects/bc250-bazzite-suite/portal$ chmod +x install.sh 
admin@bazzite:~/IdeaProjects/bc250-bazzite-suite/portal$ ./i
images/     install.sh  
admin@bazzite:~/IdeaProjects/bc250-bazzite-suite/portal$ ./install.sh 
==> Installing BC250 Bazzite Suite 0.1.0
==> Copying to /opt/bc250-bazzite-suite-v0.1.0 (sudo)
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
==> Creating the suite venv in /home/admin/.local/share/bc250-bazzite-suite/venv
==> Installing PyQt6 into the venv (downloads ~100 MB the first time)
==> Creating the launcher /home/admin/.local/bin/bc250-bazzite-suite
==> Adding the app menu entry
==> Adding the Desktop icon
==> Installing BC-250 Bazzite Test (local)
==> Note: this is not a release build (no bc250_gui/_build_info.py); the engine is not hash-checked.
==> Installing BC-250 Bazzite Test 0.1.0
==> Copying to /opt/bc250-bazzite-test-v0.1.0 (sudo)
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
/etc/sudoers.d/bc250-bisect:2:29: unknown defaults entry "verifytype"
==> Installing PyQt6 into the venv (downloads ~100 MB the first time)
==> Creating the launcher /home/admin/.local/bin/bc250-bazzite-test
==> Adding the app menu entry
==> Adding the Desktop icon
==> Done. Start "BC-250 Bazzite Test" from the app menu or the Desktop, or run: bc250-bazzite-test
==> Optional tools some tests use: /opt/bc250-bazzite-test/development/tools/install-requirements.sh
==> Done. Start "BC250 Bazzite Suite" from the app menu or the Desktop, or run: bc250-bazzite-suite

#### Tests
The extended system results goes back to default after running the performance benchmark again.

#### Results
[notice] A new release of pip is available: 26.0.1 -> 26.2.1
[notice] To update, run: /var/home/admin/IdeaProjects/bc250-bazzite-suite/.venv-linux/bin/python -m pip install --upgrade pip
admin@bazzite:/var/home/admin/IdeaProjects/bc250-bazzite-suite$ ./test.sh
== core
..................s..............................................                                            [100%]
64 passed, 1 skipped in 0.37s
== portal
................................                                                                             [100%]
32 passed in 0.53s
== tools
............................                                                                                 [100%]
28 passed in 0.66s
== apps/bazzite-test
...                                                                                                          [100%]
3 passed in 0.84s
== apps/governor
...................................................................................                          [100%]
83 passed in 2.89s
== apps/helixsr
.........................................................                                                    [100%]
57 passed in 0.80s

