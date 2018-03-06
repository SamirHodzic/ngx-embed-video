import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EmbedVideoService {
  private validYouTubeOptions = [
    'default',
    'mqdefault',
    'hqdefault',
    'sddefault',
    'maxresdefault'
  ];
  private validVimeoOptions = [
    'thumbnail_small',
    'thumbnail_medium',
    'thumbnail_large'
  ];
  private validDailyMotionOptions = [
    'thumbnail_60_url',
    'thumbnail_120_url',
    'thumbnail_180_url',
    'thumbnail_240_url',
    'thumbnail_360_url',
    'thumbnail_480_url',
    'thumbnail_720_url',
    'thumbnail_1080_url'
  ];

  constructor(
    private http: Http,
    private sanitizer: DomSanitizer
  ) { }

  public embed(url: any, options?: any): any {
    let id;
    url = new URL(url);

    id = this.detectYoutube(url);
    if (id) {
      return this.embed_youtube(id, options);
    }

    id = this.detectVimeo(url);
    if (id) {
      return this.embed_vimeo(id, options);
    }

    id = this.detectDailymotion(url);
    if (id) {
      return this.embed_dailymotion(id, options);
    }
  }

  public embed_youtube(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return this.sanitize_iframe('<iframe src="https://www.youtube.com/embed/'
      + id + options.query + '"' + options.attr
      + ' frameborder="0" allowfullscreen></iframe>');
  }

  public embed_vimeo(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return this.sanitize_iframe('<iframe src="https://player.vimeo.com/video/'
      + id + options.query + '"' + options.attr
      + ' frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
  }

  public embed_dailymotion(id: string, options?: any): string {
    options = this.parseOptions(options);
    let queryString;

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    return this.sanitize_iframe('<iframe src="https://www.dailymotion.com/embed/video/'
      + id + options.query + '"' + options.attr
      + ' frameborder="0" allowfullscreen></iframe>');
  }

  public embed_image(url: any, options?: any): any {
    let id;

    url = new URL(url);

    id = this.detectYoutube(url);
    if (id) {
      return this.embed_youtube_image(id, options);
    }

    id = this.detectVimeo(url);
    if (id) {
      return this.embed_vimeo_image(id, options);
    }

    id = this.detectDailymotion(url);
    if (id) {
      return this.embed_dailymotion_image(id, options);
    }
  }

  private embed_youtube_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }
    options = options || {};

    options.image = this.validYouTubeOptions.indexOf(options.image) > 0 ? options.image : 'default';

    let src = 'https://img.youtube.com/vi/' + id + '/' + options.image + '.jpg';

    let result = {
      link: src,
      html: '<img src="' + src + '"/>'
    };

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  }

  private embed_vimeo_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }

    options = options || {};

    options.image = this.validVimeoOptions.indexOf(options.image) >= 0 ? options.image : 'thumbnail_large';

    return this.http.get('https://vimeo.com/api/v2/video/' + id + '.json')
      .map(res => {
        return {
          'link': res.json()[0][options.image],
          'html': '<img src="' + res.json()[0][options.image] + '"/>'
        };
      })
      .toPromise()
      .catch(error => console.log(error));
  }

  private embed_dailymotion_image(id: string, options?: any): any {
    if (typeof options === 'function') {
      options = {};
    }

    options = options || {};

    options.image = this.validDailyMotionOptions.indexOf(options.image) >= 0 ? options.image : 'thumbnail_480_url';

    return this.http.get('https://api.dailymotion.com/video/' + id + '?fields=' + options.image)
      .map(res => {
        return {
          'link': res.json()[options.image],
          'html': '<img src="' + res.json()[options.image] + '"/>'
        };
      })
      .toPromise()
      .catch(error => console.log(error));
  }

  private parseOptions(options: any): any {
    let queryString = '',
      attributes = '';

    if (options && options.hasOwnProperty('query')) {
      queryString = '?' + this.serializeQuery(options.query);
    }

    if (options && options.hasOwnProperty('attr')) {
      let temp = <any>[];

      Object.keys(options.attr).forEach(function (key) {
        temp.push(key + '="' + (options.attr[key]) + '"');
      });

      attributes = ' ' + temp.join(' ');
    }
    return {
      query: queryString,
      attr: attributes
    };
  }

  private serializeQuery(query: any): any {
    let queryString: any = [];

    for (let p in query) {
      if (query.hasOwnProperty(p)) {
        queryString.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]));
      }
    }

    return queryString.join('&');
  }

  private sanitize_iframe(iframe: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(iframe);
  }

  private detectVimeo(url: any): string {
    return (url.hostname === 'vimeo.com') ? url.pathname.split('/')[1] : null;
  }

  private detectYoutube(url: any): string {
    if (url.hostname.indexOf('youtube.com') > -1) {
      return url.search.split('=')[1];
    }

    if (url.hostname === 'youtu.be') {
      return url.pathname.split('/')[1];
    }

    return '';
  }

  private detectDailymotion(url: any): string {
    if (url.hostname.indexOf('dailymotion.com') > -1) {
      return url.pathname.split('/')[2].split('_')[0];
    }

    if (url.hostname === 'dai.ly') {
      return url.pathname.split('/')[1];
    }

    return '';
  }
}
