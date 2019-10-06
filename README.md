[![Known Vulnerabilities](https://snyk.io/test/github/konrad-molitor/zen-feed/badge.svg)](https://snyk.io/test/github/konrad-molitor/zen-feed)
[![Build Status](https://travis-ci.org/konrad-molitor/zen-feed.svg?branch=master)](https://travis-ci.org/konrad-molitor/zen-feed)
[![Coverage Status](https://coveralls.io/repos/github/konrad-molitor/zen-feed/badge.svg)](https://coveralls.io/github/konrad-molitor/zen-feed)

# Zen-feed
[Express.js](https://expressjs.com/) middleware for creating Yandex Zen RSS feed.

## Features

* Forms RSS feed as mentioned in [official Yandex.Zen documentation](https://yandex.ru/support/zen/website/rss-modify.html).

* Sanitizing your data to fit [official Yandex.Zen documentation](https://yandex.ru/support/zen/website/rss-modify.html).


## Installation

> This is an Express.js middleware.

Via NPM: 

```npm install zen-feed```

## Configuration


In your express application: 

    const zenFeed = require('zen-feed');

    zenFeed.configure(config); // call this before using middleware

    app.use('/path/to/feed.rss', (req, res, next) => zenFeed.feed(req, res, next));

```config``` should be supplied before calling ```zenFeed.feed```

Config format:

    const config = {
        rssVersion: "2.0", 
        channelTitle: "My marvelous site", 
        siteLink: "http://mysite.site", 
        channelDescription: "This is awesome site!",
        channelLanguage: "ru",
        getFeedContent: function(){...}, // see getFeedContent() section
        useParser: false 
    }

## Config options

| Option | Type | Description | Required? |
|--------|------|-------------|-----------|
| ```rssVersion```| String | RSS version (use "2.0")|**Yes**|
|```channelTitle```| String | Site name | **Yes** |
|```sitelink```| String | Site URL | **Yes**|
|```channelDescription```| String | Short site description | No |
|```channelLanguage```| String | Feed language in [ISO 639-1](http://www.loc.gov/standards/iso639-2/php/code_list.php) format | No |
|```getFeedContent```| Function | See getFeedContent() section | **Yes** |
|```useParser``` | Boolean | Option to use built-in parser to sanitize HTML-content. (See Sanitize section) | **Yes** |

## getFeedContent()

In order for this middleware to actually work, you should provide **async** function ```getFeedContent```. 
This function should return an array of publications to be included in feed. Every publication should be represented as ```Object```. It should look like this:

    const sampleItems = [
        {
            title: "Test publication",
            link: "http://testsite.site/test",
            pdalink: "http://m.testsite.site/test",
            amplink: "http://testsite.site/amp/test",
            media_rating: "nonadult",
            pubDate: (new Date("July 20, 69 00:20:18 GMT+00:00")).getTime(),
            author: "Test author",
            category: [
                "Технологии",
                "Наука"
            ],
            enclosure: [
                "http://testsite.site/imgs/test.jpg"
            ],
            description: "Test description",
            content_encoded: `
                Test publication text
                We have cookies!
                `
        },
        {
            title: "Another test publication",
            link: "http://testsite.site/another-test",
            ...
        },
    ];


### Item format
| Field | Type | Description | Required? |
|-------|------|-------------|-----------|
|```title```| String | Publication title |**Yes**|
|```link```| String | Publication URL on your site | **Yes**|
|```pdalink```| String | Mobile version (URL) (if exists) | No |
|```amplink```| String | AMP-version (URL) (if exists) | No |
|```media_rating```| String | Media rating. Should take one of two values: ```"adult"``` or ```"nonadult``` | No |
|```pubDate```| Number | Publication date in milliseconds since Unix Epoch. (```Date.getTime()```) | **Yes** |
|```author```| String | Publication author | **Yes**|
|```category```| Array (of String) | Categories of publication. Can only contain items from [official documentation](https://yandex.ru/support/zen/website/rss-modify.html).| No |
|```enclosure```| Array (of Strings) | **Must** contain URLs of **all** media objects (images, videos, etc...) used in publication text. Provide full URLs with file extension for correct MIME-type detection. | **Yes**|
|```description```| String (CDATA) | Short publication description. | No |
|```content_encoded```| String (CDATA) | Full publication text. Must be sanitized HTML (as seen in [official documentation](https://yandex.ru/support/zen/website/rss-modify.html)), otherwise you can use built-in parser. |**Yes**|

## Sanitize

Sanitizing your content simply gets rid of all HTML-elements except for:
* ```i```
* ```em```
* ```strong```
* ```a```
* ```img```
* ```video```
* ```figure```
* ```figcaption```
* ```media:content```
* ```media:description```
* ```media:copyright```
* ```span```
* ```strike```
> **Be warned**: it will cut out all ```iframe``` tags, usually used to embed Youtube/Vimeo/etc players. If sanitizing HTML with built in parser breaks your content, turn it off by using ```useParser: false``` in config object, then do sanitize your content yourself in getFeedContent()

## Testing
[Jest.js](https://jestjs.io/) used for testing. Tests can be found in ```/tests``` directory.
* ```npm run test``` - basic test-run
* ```npm run test-watch``` - Watch files for changes and rerun tests related to changed files. (```jest --watch```)
* ```npm run test-coverage``` - Displays test coverage information (```jest --coverage```)
* ```npm run test-verbose``` - Test run with verbose output (```jest --verbose```)

## PRs
Pull requests are welcome.

## License
&copy; Ismail Valiev (Konrad Molitor), 2019.
Distributed under the terms of MIT License.
