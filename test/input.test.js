const express = require('express');
const zenFeed = require('../index');
const request = require('supertest');

const config = {
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: () => {},
    useParser: false
};

const app = express();

zenFeed.configure({
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: () => {},
    useParser: false
});

app.get('/feed/rss.xml', zenFeed.feed);

const server = app.listen(3000, 'localhost', () => {});

describe('when config not provided', () => {
    beforeEach(() => {
        zenFeed.config = undefined;
    })
    afterEach(() => {
        zenFeed.configure(config);
        app.get('/feed/rss.xml', zenFeed.feed);
    })
    test('should call next(err) when next callback provided', async () => {
        let myMock = jest.fn();
        await zenFeed.feed(null, null, myMock);
        expect(myMock).toBeCalledWith(Error('No config provided! Call .config({config}) first.'));
    });
});

describe("when getFeedContent doesn't return proper data", () => {
    test('should return next(err) if returned nothing', async () => {
        let myMock = jest.fn();
        await zenFeed.feed(null, null, myMock);
        expect(myMock).toBeCalledWith(Error('getFeedContent() returned nothing.'))
    });
    test('should return next(err) if returned array is empty', async () => {
        let newConfig = Object.assign({}, config);
        newConfig.getFeedContent = async () => {return []};
        zenFeed.configure(newConfig);
        let myMock = jest.fn();
        await zenFeed.feed(null, null, myMock);
        expect(myMock).toBeCalledWith(Error('getFeedContent() returned empty array.'))
    });
    test('should return next(err) if returned content is not an array', async () => {
        let newConfig = Object.assign({}, config);
        newConfig.getFeedContent = async () => {return {}};
        zenFeed.configure(newConfig);
        let myMock = jest.fn();
        await zenFeed.feed(null, null, myMock);
        expect(myMock).toBeCalledWith(Error(`getFeedContent() returned ${typeof {}} instead of array.`));
    });
    test('should return next(err) if items of returned array are not objects', async () => {
        let newConfig = Object.assign({}, config);
        newConfig.getFeedContent = async () => {return [
            {},
            [],
            'string',
            123
        ]};
        zenFeed.configure(newConfig);
        let myMock = jest.fn();
        await zenFeed.feed(null, null, myMock);
        expect(myMock).toBeCalledWith(Error(`getFeedContent() should return array of objects.`));
    });

})