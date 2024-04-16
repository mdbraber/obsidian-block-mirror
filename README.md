# obsidian-block-mirror
Plugin to mirror blocks. Create an empty block in one file (e.g. `^abc`) and when you create a block with the same block id in another file, e.g.  `- [ ] Task ^abc`. The plugin will mirror the task to the first file. For now it will update any changes from the current files to all other files that contain the same block id.
