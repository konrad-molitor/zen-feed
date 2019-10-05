const express = require('express');
const zenFeed = require('../index');
const request = require('supertest');
const convert = require('xml-js');
const {generateFeed} = require('../modules/generateFeed');


const app = express();

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
    }
];

const config = {
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: async () => {
        return sampleItems;
    },
    useParser: false
}

zenFeed.configure(config);
app.use('/zen/rss.xml', (req, res, next) => zenFeed.feed(req, res, next));

// const server = app.listen(3000, () => {
//     console.log('App up and running on port 3000');
// });

describe('network', () => {
    test('should response with status 200', async () => {
        const response = await request(app).get('/zen/rss.xml');
        expect(response.statusCode).toBe(200);
    });
})

describe('content', () => {
    test('should respond with proper rss feed', async() => {
        let feedObj = generateFeed(config, sampleItems);
        const response = await request(app).get('/zen/rss.xml');
        expect(convert.xml2js(response.text)).toEqual(feedObj);
    })
})