---
public: true
eleventyNavigation:
  parent: "Overview"
  key: "Tmux - Terminal multiplexer"
---

# Tmux

Tmux is a `terminal multiplexer` an alternative to Screen. Tmux sessions are persistent, which means that programs running in Tmux will continue to run even if you get disconnected.

<!-- <br/><br/> -->

---

## Command list

1. #### Create a new named session

```
$ tmux new -s <session-name>
```

2. #### List sessions

```
$ tmux ls
```

3. #### Attach to a session

```
$ tmux a -t <session-name>
```

4. #### Detach from the `screen` session:

```
Ctrl+b d
```

5. #### Kill the session:

```
$ tmux kill-session -t <session-name>
```

---

## Further reading

1. Getting Started With Tmux: <https://linuxize.com/post/getting-started-with-tmux>

2. Tmux Commands Examples: <https://ostechnix.com/tmux-command-examples-to-manage-multiple-terminal-sessions>
