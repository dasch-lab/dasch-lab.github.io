---
public: true
eleventyNavigation:
  parent: "Overview"
  key: "Screen - Terminal multiplexer"
---

# Screen

Screen is a `terminal multiplexer`. Processes running in **screen** will continue to run when their window is not visible even if you get disconnected.

<!-- <br/><br/>

When **screen** is called, it creates a single window with a shell in it (or the specified command) and then gets out of your way so that you can use the program as you normally would. Programs continue to run when their window is currently not visible and even when the whole screen session is detached from the user’s terminal.

<br/><br/> -->

You can check if `screen` is installed on your system by typing:

```bash
$ screen --version
```

---

## Command list

1. #### Starting a new screen session:

```bash
$ screen -S <session-name>
```

2. #### List all the sessions:

```
$ screen ls
```

3. #### Attach to a session:

```
$ screen -r <session-name>
```

4. #### Detach from the `screen` session:

```
Ctrl+a d
```

5. #### Kill the session:

```
exit
```

---

## Further reading

1. How To Use Linux Screen: <https://linuxize.com/post/how-to-use-linux-screen>
