import { async, inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { EmbedVideoService } from '../src/embed-video.service';
import { HttpClientModule } from '@angular/common/http';

describe('EmbedVideoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        EmbedVideoService
      ]
    });
  });

  it('is defined',
    inject([EmbedVideoService], (embedVideoService) => {

      expect(embedVideoService).toBeDefined();
    }));

  it('converts vimeo.com url',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed('http://vimeo.com/19339941')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://player.vimeo.com/video/19339941" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
      )
    }));

  it('converts youtube.com url',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed('https://www.youtube.com/watch?v=twE64AuqE9A')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.youtube.com/embed/twE64AuqE9A" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('converts youtu.be url',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed('http://youtu.be/9XeNNqeHVDw#aid=P-Do3JLm4A0')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('converts dailymotion.com url',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed('https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('converts dai.ly url',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed('http://dai.ly/x20qnej')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('converts vimeo id',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_vimeo('19339941')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://player.vimeo.com/video/19339941" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
      )
    }));

  it('converts youtube id',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_youtube('9XeNNqeHVDw')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('converts dailymotion id',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_dailymotion('x20qnej')).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('accepts query param youtube',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_youtube('9XeNNqeHVDw', { query: { rel: 0, showinfo: 0 } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw?rel=0&showinfo=0" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('accepts attributes youtube',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_youtube('9XeNNqeHVDw', { query: { rel: 0, showinfo: 0 }, attr: { width: 400, height: 200 } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.youtube.com/embed/9XeNNqeHVDw?rel=0&showinfo=0" width="400" height="200" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('accepts query param vimeo',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_vimeo('19339941', { query: { portrait: 0, color: '333' } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://player.vimeo.com/video/19339941?portrait=0&color=333" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
      )
    }));

  it('accepts attributes vimeo',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_vimeo('19339941', { query: { portrait: 0, color: '333' }, attr: { width: 400, height: 200 } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://player.vimeo.com/video/19339941?portrait=0&color=333" width="400" height="200" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
      )
    }));

  it('accepts query param dailymotion',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_dailymotion('x20qnej', { query: { autoPlay: 1, start: 66 } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.dailymotion.com/embed/video/x20qnej?autoPlay=1&start=66" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('accepts attributes dailymotion',
    inject([EmbedVideoService, DomSanitizer], (embedVideoService, sanitizer) => {

      expect(embedVideoService.embed_dailymotion('x20qnej', { query: { autoPlay: 1, start: 66 }, attr: { width: 400, height: 200 } })).toEqual(
        sanitizer.bypassSecurityTrustHtml('<iframe src="https://www.dailymotion.com/embed/video/x20qnej?autoPlay=1&start=66" width="400" height="200" frameborder="0" allowfullscreen></iframe>')
      )
    }));

  it('gets vimeo thumbnail',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://vimeo.com/19339941').then((image) => {
        expect(image.link).toEqual('https://i.vimeocdn.com/video/122513613_640.jpg');
        expect(image.html).toEqual('<img src="https://i.vimeocdn.com/video/122513613_640.jpg"/>');
      });
    })));

  it('gets vimeo thumbnail with options',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://vimeo.com/19339941', { image: 'thumbnail_small' }).then((image) => {
        expect(image.link).toEqual('https://i.vimeocdn.com/video/122513613_100x75.jpg');
        expect(image.html).toEqual('<img src="https://i.vimeocdn.com/video/122513613_100x75.jpg"/>');
      });
    })));

  it('gets default vimeo thumbnail with invalid options',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://vimeo.com/19339941', { image: 'stupid-format' }).then((image) => {
        expect(image.link).toEqual('https://i.vimeocdn.com/video/122513613_640.jpg');
        expect(image.html).toEqual('<img src="https://i.vimeocdn.com/video/122513613_640.jpg"/>');
      });
    })));

  it('gets youtube thumbnail (prove backwards compatibility)',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://youtu.be/ZeLnjXTNq6Q', { image: 'maxresdefault' }).then((image) => {
        expect(image.link).toEqual('https://img.youtube.com/vi/ZeLnjXTNq6Q/maxresdefault.jpg');
        expect(image.html).toEqual('<img src="https://img.youtube.com/vi/ZeLnjXTNq6Q/maxresdefault.jpg"/>');
      });
    })));

  it('gets dailymotion thumbnail',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport').then((image) => {
        expect(image.link).toEqual('http://s1.dmcdn.net/IgPVQ/x480-ktj.jpg');
        expect(image.html).toEqual('<img src="http://s1.dmcdn.net/IgPVQ/x480-ktj.jpg"/>');
      });
    })));

  it('gets dailymotion thumbnail with options',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport', { image: 'thumbnail_720_url' }).then((image) => {
        expect(image.link).toEqual('http://s1.dmcdn.net/IgPVQ/x720-d_h.jpg');
        expect(image.html).toEqual('<img src="http://s1.dmcdn.net/IgPVQ/x720-d_h.jpg"/>');
      });
    })));

  it('gets dailymotion thumbnail (dai.ly)',
    async(inject([EmbedVideoService], (embedVideoService) => {

      embedVideoService.embed_image('http://dai.ly/x20qnej').then((image) => {
        expect(image.link).toEqual('http://s1.dmcdn.net/IgPVQ/x480-ktj.jpg');
        expect(image.html).toEqual('<img src="http://s1.dmcdn.net/IgPVQ/x480-ktj.jpg"/>');
      });
    })));
});
