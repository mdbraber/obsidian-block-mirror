import { TFile, CachedMetadata, BlockCache, Plugin } from "obsidian";

export default class BlockMirrorPlugin extends Plugin {
	async onload() {
		this.registerEvent(
			this.app.metadataCache.on("changed", async (current_file: TFile, data: string, cache: CachedMetadata) => {
				const current_blocks = cache.blocks ?? {};
				if (current_blocks != {}) {
					const current_contents = data.split("\n");
					const files = this.app.vault.getMarkdownFiles();
					files.forEach(async (file) => {
						if (file === current_file) return;
						const file_cache = this.app.metadataCache.getFileCache(file);
						if (file_cache && file_cache.blocks) {
							const matched_blocks = Object.values(file_cache.blocks).filter((block: BlockCache) =>
								Object.keys(current_blocks).includes(block.id),
							);
							for (const matched_block of matched_blocks) {
								const current_block = Object.values(current_blocks).find(
									(block: BlockCache) => block.id == matched_block.id,
								);
								if (current_block) {
									const matched_contents = (await app.vault.adapter.read(file.path)).split("\n");
									const updated_line = current_contents[current_block.position.start.line];
									const replace_line = matched_contents.splice(
										matched_block.position.start.line,
										1,
										updated_line,
									)[0];
									if (replace_line != updated_line) {
										await app.vault.adapter.write(file.path, matched_contents.join("\n"));
									}
								}
							}
						}
					});
				}
			}),
		);
	}
}
