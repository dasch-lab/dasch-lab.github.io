---
public: true
eleventyNavigation:
  parent: 'Overview'
  key: 'Add Users and Groups'
---

# How to add a user

```bash
$ sudo adduser username
```

# How to create a directory

```bash
$ sudo mkdir dirname
```

# How to add a group

```bash
$ sudo groupadd groupname
```

# How to add a user to a group

```bash
$ sudo usermod -aG groupname username 
```

# How to check which groups a user belongs to

```bash
$ groups username 
```

# How to check which users belong to a group

```bash
$ grep groupname /etc/group
```

# How to give rights to owner, groups and others

```bash
$ sudo chmod 775 groupname/
```

# How to change the ownership of the specified directory 

## Detailed Explanation
- User Ownership Change: The specified username will become the owner of the directory. The owner has certain permissions over the directory, which typically include the ability to read, write, and execute (depending on the directory's permissions).
- Group Ownership Change: The specified groupname will become the group associated with the directory. Group members can have their own set of permissions over the directory, separate from those of the owner and others.

```bash
$ sudo chown username:groupname dirname
```

# How to set the setgid (set group ID) bit on the specified directory (dirname)

When the setgid bit is set on a directory, it has the following effects:

- New Files and Subdirectories Inherit the Group Ownership:
Any new files or subdirectories created within the directory will inherit the group ownership of the directory itself, rather than the primary group of the user who created the file or subdirectory.
This ensures consistent group ownership for all files and subdirectories, which can be useful for collaborative environments where multiple users need to work on the same set of files and directories.

- Facilitates Group Collaboration:
When multiple users are part of the same group, setting the setgid bit on a shared directory ensures that all new files and subdirectories have the same group ownership. This makes it easier to manage permissions and access for group members.

```bash
$ sudo chmod g+s dirname/
```
