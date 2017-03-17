import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmbedVideoService } from './src/embed-video.service';

export * from './src/embed-video.service';

@NgModule({
	imports: [CommonModule],
	declarations: [],
	exports: [],
	providers: [EmbedVideoService]
})
export class EmbedVideo {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EmbedVideo,
			providers: [EmbedVideoService]
		};
	}
}
