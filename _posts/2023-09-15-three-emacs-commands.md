---
tags: emacs
---

Three commands I wish I knew sooner to write emacs-lisp.

- `toggle-debug-on-error`: I enable it when a plugin or my own code is throwing an error. The stack trace makes it easy to find the root cause of the problem.
- `ielm`: launch it, and combine it with `ielm-change-working-buffer` and `ielm-display-working-buffer`. Makes it a dream to write extensions.
- `ert`: built-in unit tester. I write specs as part of my config. They are load automatically. I run them with `ert`. You can select `t` to run everything or pick a particular test. The result window also has nice keybindings like `r` to rerun and `.` to jump to the failing spec.
