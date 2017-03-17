import { NgModule, ModuleWithProviders } from '@angular/core';
import { EmbedVideoService } from './src/embed-video.service';

export * from './src/embed-video.service';

@NgModule({})
export class EmbedVideo {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: EmbedVideo,
			providers: [EmbedVideoService]
		};
	}
}
