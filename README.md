# ngx-embed-video

> Get embed code for embedding youtube/vimeo/dailymotion/* video in websites from URL or ID in Angular 2.
> Currently supports YouTube, Vimeo and Dailymotion. Feel free to make pull request to add others!

[![build-url][build-url-svg]][build-url]
[![npm-url][npm-url-svg]][npm-url]
[![npm-url][down-url-svg]][npm-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]
[![Dependencies][dependencies]][dependencies-url]

## Installation

To install ngx-embed-video library, run:

```bash
$ npm install ngx-embed-video --save
```

## Consuming EmbedVideo library

and then in your Angular `AppModule`:

```typescript
import { HttpModule } from '@angular/http';
import { EmbedVideo } from 'ngx-embed-video';

@NgModule({
  imports: [
    HttpModule,

    EmbedVideo.forRoot()
  ]
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
  templateUrl: './template.html',
})
export class AppComponent {
  vimeoUrl = "https://vimeo.com/197933516";
  youtubeUrl = "https://www.youtube.com/watch?v=iHhcHTlGtRs";
  dailymotionUrl = "https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport";

  vimeoId = "197933516";
  youtubeId = "iHhcHTlGtRs";
  dailymotionId = "x20qnej";

  constructor(
    private embedService: EmbedVideoService
  ) {
    console.log(this.embedService.embed(vimeoUrl));
    console.log(this.embedService.embed(youtubeUrl));
    console.log(this.embedService.embed(dailymotionUrl));

    console.log(this.embedService.embed_vimeo(vimeoId));
    console.log(this.embedService.embed_youtube(youtubeId));
    console.log(this.embedService.embed_dailymotion(dailymotionId));
  }
}
```

Example output:

```html
<iframe src="//player.vimeo.com/video/197933516" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<iframe src="//www.youtube.com/embed/iHhcHTlGtRs" frameborder="0" allowfullscreen></iframe>
<iframe src="//www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>

<iframe src="//player.vimeo.com/video/197933516" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<iframe src="//www.youtube.com/embed/iHhcHTlGtRs" frameborder="0" allowfullscreen></iframe>
<iframe src="//www.dailymotion.com/embed/video/x20qnej" frameborder="0" allowfullscreen></iframe>
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
  link: http://img.youtube.com/vi/iHhcHTlGtRs/default.jpg,
  html: <img src="http://img.youtube.com/vi/iHhcHTlGtRs/default.jpg"/>
}
```

## Options

### query

Object to be serialized as a querystring and appended to the embedded content url.


#### Example

```js
this.embedService.embed_vimeo("197933516", { query: { portrait: 0, color: '333' } })
```

Output:

```html
<iframe src="//player.vimeo.com/video/197933516?portrait=0&color=333" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
```
### attributes

Object to add additional attributes (any) to the iframe

#### Example

```js
this.embedService.embed('https://youtu.be/iHhcHTlGtRs', { query: { portrait: 0, color: '333' }, attr: { width: 400, height: 200 } })
```

Output:
```html
<iframe src="//www.youtube.com/embed/iHhcHTlGtRs?portrait=0&color=333" frameborder="0" allowfullscreen width="400" height="200"></iframe>
```

#### Youtube Image options

* default
* mqdefault
* hqdefault
* sddefault
* maxresdefault

```js
this.embedService.embed_image('https://www.youtube.com/watch?v=iHhcHTlGtRs', { image: 'mqdefault' })
```

#### Vimeo Image options

* thumbnail_small
* thumbnail_medium
* thumbnail_large

```js
this.embedService.embed_image('https://vimeo.com/197933516', { image: 'thumbnail_medium' })
```

#### Dailymotion Image options

* thumbnail_60_url
* thumbnail_120_url
* thumbnail_180_url
* thumbnail_240_url
* thumbnail_360_url
* thumbnail_480_url
* thumbnail_720_url
* thumbnail_1080_url

```js
this.embedService.embed_image('https://www.dailymotion.com/video/x20qnej_red-bull-presents-wild-ride-bmx-mtb-dirt_sport', { image: 'thumbnail_720_url' })
```


## License

MIT - [SamirH](mailto:samir.sgd@gmail.com)


[build-url]: https://travis-ci.org/SamirHodzic/ngx-embed-video
[build-url-svg]: https://travis-ci.org/SamirHodzic/ngx-embed-video.svg?branch=master
[down-url-svg]: https://img.shields.io/npm/dt/ngx-embed-video.svg
[dependencies]: https://david-dm.org/samirhodzic/ngx-embed-video.svg
[dependencies-url]: https://david-dm.org/samirhodzic/ngx-embed-video
[dev-dependencies]: https://david-dm.org/samirhodzic/ngx-embed-video/dev-status.svg
[dev-dependencies-url]: https://david-dm.org/samirhodzic/ngx-embed-video?type=dev
[npm-url-svg]: https://badge.fury.io/js/ngx-embed-video.svg
[npm-url]: https://www.npmjs.com/package/ngx-embed-video
