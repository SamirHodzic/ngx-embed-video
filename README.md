# ngx-embed-video

> Get embed code for embedding youtube/vimeo/dailymotion/\* video in websites from URL or ID in Angular 6+.
> Currently supports YouTube, Vimeo and Dailymotion. Feel free to make pull request to add others!

[![npm-url][npm-url-svg]][npm-url]
[![npm-url][down-url-svg]][npm-url]
[![build-url][build-url-svg]][build-url]
[![Dependencies][dependencies]][dependencies-url]

Play with `ngx-embed-video` live on [stackblitz.com/ngx-embed-video-example](https://stackblitz.com/edit/ngx-embed-video-example).

## Installation

To install ngx-embed-video library, run:

```bash
$ npm install ngx-embed-video --save
```

## Consuming EmbedVideo library

and then in your Angular `AppModule`:

```typescript
import { HttpClientModule } from '@angular/common/http';
import { EmbedVideo } from 'ngx-embed-video';

@NgModule({
  imports: [HttpClientModule, EmbedVideo.forRoot()]
})
export class AppModule {}
```

Once your library is imported, you can use it in your Angular application.

Example usage:

```typescript
import { Component } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-component',
  templateUrl: './template.html'
})
export class AppComponent {
  vimeoUrl = 'https://vimeo.com/197933516';
  youtubeUrl = 'https://www.youtube.com/watch?v=iHhcHTlGtRs';
  dailymotionUrl =
    'https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport';

  vimeoId = '197933516';
  youtubeId = 'iHhcHTlGtRs';
  dailymotionId = 'x20qnej';

  constructor(private embedService: EmbedVideoService) {
    console.log(this.embedService.embed(this.vimeoUrl));
    console.log(this.embedService.embed(this.youtubeUrl));
    console.log(this.embedService.embed(this.dailymotionUrl));

    console.log(this.embedService.embed_vimeo(this.vimeoId));
    console.log(this.embedService.embed_youtube(this.youtubeId));
    console.log(this.embedService.embed_dailymotion(this.dailymotionId));
  }
}
```

Example output:

```html
<iframe
  src="https://player.vimeo.com/video/197933516"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>
<iframe
  src="https://www.youtube.com/embed/iHhcHTlGtRs"
  frameborder="0"
  allowfullscreen
></iframe>
<iframe
  src="https://www.dailymotion.com/embed/video/x20qnej"
  frameborder="0"
  allowfullscreen
></iframe>

<iframe
  src="https://player.vimeo.com/video/197933516"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>
<iframe
  src="https://www.youtube.com/embed/iHhcHTlGtRs"
  frameborder="0"
  allowfullscreen
></iframe>
<iframe
  src="https://www.dailymotion.com/embed/video/x20qnej"
  frameborder="0"
  allowfullscreen
></iframe>
```

Example usage with sanitized innerHtml iframe:

```typescript
import { Component } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-component',
  template: '<div [innerHtml]="iframe_html"></div>',
})
export class AppComponent {
  iframe_html: any;
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";

  constructor(
    private embedService: EmbedVideoService
  ) {
    this.iframe_html = this.embedService.embed(youtubeUrl);
  )
}
```

## Usage

### embed(url, [options])

Return an HTML fragment embed code (string) for the given video URL.

### embed_vimeo(id, [options])

Return an HTML fragment embed code (string) for the given _vimeo_ video ID.

### embed_youtube(id, [options])

Return an HTML fragment embed code (string) for the given _youtube_ video ID.

### embed_dailymotion(id, [options])

Return an HTML fragment embed code (string) for the given _dailymotion_ video ID.

### embed_image(url, [options])

Returns an HTML `<img>` tag (string) for the given url and the `link` in a callback.

```js
{
  link: //img.youtube.com/vi/iHhcHTlGtRs/default.jpg,
  http: html: <img src="http://img.youtube.com/vi/iHhcHTlGtRs/default.jpg" />;
}
```

## Options

### query

Object to be serialized as a querystring and appended to the embedded content url.

#### Example

```typescript
this.embedService.embed_vimeo('197933516', {
  query: { portrait: 0, color: '333' }
});
```

Output:

```html
<iframe
  src="https://player.vimeo.com/video/197933516?portrait=0&color=333"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>
```

### attributes

Object to add additional attributes (any) to the iframe

#### Example

```typescript
this.embedService.embed('https://youtu.be/iHhcHTlGtRs', {
  query: { portrait: 0, color: '333' },
  attr: { width: 400, height: 200 }
});
```

Output:

```html
<iframe
  src="https://www.youtube.com/embed/iHhcHTlGtRs?portrait=0&color=333"
  frameborder="0"
  allowfullscreen
  width="400"
  height="200"
></iframe>
```

#### Youtube Image options

- default
- mqdefault
- hqdefault
- sddefault
- maxresdefault

```typescript
this.embedService
  .embed_image(
    'https://www.youtube.com/watch?v=iHhcHTlGtRs', 
    { image: 'mqdefault' }
  )
  .then(res => {
    this.thumbnail = res.html;
  });
```

#### Vimeo Image options

- thumbnail_small
- thumbnail_medium
- thumbnail_large

```typescript
this.embedService
  .embed_image(
    'https://vimeo.com/197933516', 
    { image: 'thumbnail_medium' }
  )
  .then(res => {
    this.thumbnail = res.html;
  });
```

#### Dailymotion Image options

- thumbnail_60_url
- thumbnail_120_url
- thumbnail_180_url
- thumbnail_240_url
- thumbnail_360_url
- thumbnail_480_url
- thumbnail_720_url
- thumbnail_1080_url

```typescript
this.embedService
  .embed_image(
    'https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport',
    { image: 'thumbnail_720_url' }
  )
  .then(res => {
    this.thumbnail = res.html;
  });
```

## License

MIT

[build-url]: https://travis-ci.org/SamirHodzic/ngx-embed-video
[build-url-svg]: https://travis-ci.org/SamirHodzic/ngx-embed-video.svg?branch=master
[down-url-svg]: https://img.shields.io/npm/dt/ngx-embed-video.svg
[dependencies]: https://david-dm.org/samirhodzic/ngx-embed-video.svg
[dependencies-url]: https://david-dm.org/samirhodzic/ngx-embed-video
[npm-url-svg]: https://img.shields.io/npm/v/ngx-embed-video.svg
[npm-url]: https://www.npmjs.com/package/ngx-embed-video
