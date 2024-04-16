# obsidian-block-mirror
Plugin to mirror blocks.

Example: Create a single-line block in one file (e.g. with the content `- [ ] Task ^abc`) and copy the block (just simple copy-paste) including the block id to another file. The plugin will mirror any changes to the line with the block id, e.g. when you're changing te task to `- [x] Task ^abc` it will be reflected in both files (also e.g. when using the Tasks plugin to change the task). For now it will update any changes from the current files to all other files that contain the same block id. 

## Installation
This plugin is currently a proof-of-concept! ⚠️ Use at your own risk ⚠️. This plugin writes to your vault and could be doing things wrong and overwrite every file in your vault. Best tried on a demo vault!

- Make sure your NodeJS is at least v16 (node --version).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

## Caveats / bugs
- I think the block identifier can be anywhere in the line (have not checked), but it ignores block identifiers e.g. in internal links. It uses the `cachedMetadata.blocks` to find blocks based on what Obsidian thinks is a block
- Obsidian only considers specific things as 'blocks' (e.g. tasks, list items, heading, but not multiple lines in the same paragraph)
- When using with tasks and crossing off many items at the same time (and with multiple files open that contain mirrored blocks) it can create a race condition
- Currently it only considers single-line blocks

It's just a proof-of-concept for now, so there are probably a ton of things you could consider a bug, be careful!

## Idea
See this discussion: https://forum.obsidian.md/t/synced-lines-or-blocks-for-obsidian/80354

Noteplan has a great feature Synced Lines: *A Synced Line is a single line of text, such as a task, quote, bullet point, etc. that is mirrored across notes. If you paste that Synced Line into another note and change the content of that line of text in any of the notes, NotePlan will sync this change to all connected copies.* Check out this page for more background: https://help.noteplan.co/article/138-synced-blocks

This borders on discussion of '[editable transclusions](https://forum.obsidian.md/t/edit-transcluded-embedded-notes-blocks-in-place-likely-requires-wyswyg-first/15339)' although this is a bit more straightforward. But I think this is still a great idea worth pursueing: use a block reference as a unique identifier and keep a line (or possibly block) synced across a vault. Most important might be the performance needed.

## History (before this repo)
I've done some digging and think it would be possible to recreate Synced Lines in Obsidian, e.g. @TfTHacker has created a great (API) infrastructure with the [Strange New Worlds plugin](https://github.com/TfTHacker/obsidian42-strange-new-worlds) that possibly could be reused. In Discord user 'boninall' has also created [something that looks a lot like Synced Lines](https://discord.com/channels/686053708261228577/855181471643861002/threads/1186842745499816006). There's a (currently) empty Github repository for that idea here: https://github.com/Quorafind/Obsidian-Block-Reference
