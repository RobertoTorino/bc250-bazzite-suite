# SPDX-License-Identifier: GPL-3.0-or-later
"""tools/ci_state.py: the state of every CI run on a commit, waiting while one runs, and its exit status."""

from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import ci_state  # noqa: E402


def run(branch="main", status="completed", conclusion="success"):
    return {"head_branch": branch, "status": status, "conclusion": conclusion, "html_url": f"https://x/{branch}"}


def test_state_of_the_runs():
    assert ci_state.state([]) == "none"
    assert ci_state.state([run(), run("portal-v1.0.0", status="in_progress", conclusion=None)]) == "running"
    assert ci_state.state([run(), run("portal-v1.0.0", conclusion="failure")]) == "failed"
    assert ci_state.state([run(), run("portal-v1.0.0", conclusion="skipped")]) == "passed"


def test_waits_while_ci_runs_then_answers(monkeypatch, capsys):
    monkeypatch.delenv("BC250_CI_STATE", raising=False)
    answers = iter([[], [run(status="in_progress", conclusion=None)], [run()]])
    clock, slept = [0.0], []

    def sleep(seconds):
        slept.append(seconds)
        clock[0] += seconds
    assert ci_state.check("abc1234", 60, fetch=lambda sha: next(answers), sleep=sleep, now=lambda: clock[0]) == 0
    assert slept == [ci_state.POLL_S, ci_state.POLL_S] and capsys.readouterr().out.startswith("passed\n")


def test_gives_up_after_the_wait_and_reports_failure_at_once(monkeypatch, capsys):
    monkeypatch.delenv("BC250_CI_STATE", raising=False)
    clock = [0.0]

    def sleep(seconds):
        clock[0] += seconds
    running = [run(status="queued", conclusion=None)]
    assert ci_state.check("abc1234", 1, fetch=lambda sha: running, sleep=sleep, now=lambda: clock[0]) == 2
    failed = [run(conclusion="failure")]
    assert ci_state.check("abc1234", 60, fetch=lambda sha: failed, sleep=lambda s: None, now=lambda: 0.0) == 1
    assert "failure  https://x/main" in capsys.readouterr().out


def test_unreachable_and_the_stub(monkeypatch):
    monkeypatch.delenv("BC250_CI_STATE", raising=False)

    def offline(sha):
        raise OSError("no network")
    assert ci_state.check("abc1234", 60, fetch=offline, sleep=lambda s: None) == 3
    monkeypatch.setenv("BC250_CI_STATE", "running")
    assert ci_state.check("abc1234", 60, fetch=offline, sleep=lambda s: None) == 2   # answers at once
