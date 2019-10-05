const zenFeed = require('../index');

const config = {
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: () => {},
    useParser: false
}
module.exports = describe('Base', () => {
    describe('Basic setup', () => {
        test('import should return an object', () => {
            expect(typeof zenFeed).toBe('object');
        });
        test('.feed should return a function', () => {
            expect(typeof zenFeed.feed).toBe('function');
        });
        test('.feed should call next() callback', () => {
            let myMock = jest.fn()
            zenFeed.feed(null, null, myMock);
            expect(myMock).toBeCalled();
        });
        test('.feed should accept 3 arguments', () => {
            expect(zenFeed.feed.length).toBe(3);
        });
        test('.configure should return a function',() => {
            expect(typeof(zenFeed.configure)).toBe('function');
        });
        test('should save config object', () => {
            zenFeed.configure(config);
            expect(zenFeed.config).toEqual(config);
        });
    });    
})


