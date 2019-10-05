const {generateFeed} = require('../modules/generateFeed');
const {filterContent} = require('../modules/generateFeed');
const itemTemplate = require('../templates/itemTemplate');

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
        desription: "Test description",
        content_encoded: `<![CDATA[
            Test publication text
            ]]>`
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

describe('Generating feed object', () => {
    let rssObject;
    let channelObject;
    beforeAll(() => {
        rssObject = generateFeed(config, sampleItems);
        channelObject = rssObject.elements[0].elements[0];
    })
    describe('channel info', () => {
        test('rss', () => {
            expect(rssObject['elements'][0]['name']).toBe('rss');
        });
        test('rss version', () => {
            expect(rssObject['elements'][0]['attributes']['version']).toBe(config.rssVersion);
        });
        describe('channel element', () => {
            test('channel element present', () => {
                expect(rssObject.elements[0].elements.filter(item => item.name === "channel").length).toBe(1);
            });
            test('title', () => {
                expect(channelObject.elements.find(item => item.name === "title").elements[0].text).toBe(config.channelTitle);
            });
            test('link', () => {
                expect(channelObject.elements.find(item => item.name === "link").elements[0].text).toBe(config.siteLink);
            });
            test('description (if present)', () => {
                if (config.channelDescription) {
                    expect(channelObject.elements.find(item => item.name === "description").elements[0].text).toBe(config.channelDescription);
                };
            });
            test('no description element if description not provided', () => {
                let newConfig = Object.assign({}, config);
                delete(newConfig.channelDescription);
                let newFeedObject = generateFeed(newConfig, sampleItems);
                let newChannelObject = newFeedObject.elements[0].elements[0];
                expect(newChannelObject.elements.filter(item => item.name === "description").length).toBe(0);
            });
            test('language (if present)', () => {                
                if (config.channelLanguage) {
                    expect(channelObject.elements.find(item => item.name === "language").elements[0].text).toBe(config.channelLanguage);
                }
            });
            test('no language element if language not provided', () => {
                let newConfig = Object.assign({}, config);
                delete(newConfig.channelLanguage);
                let newFeedObject = generateFeed(newConfig, sampleItems);
                let newChannelObject = newFeedObject.elements[0].elements[0];
                expect(newChannelObject.elements.filter(item => item.name === "language").length).toBe(0);
            });
            test('item - should be at least one', () => {
                expect(channelObject.elements.filter(item => item.name === "item").length).toBeGreaterThanOrEqual(1);
            });
        });        
        describe('items', () => {
            describe('Content filtering', () => {
                test('should filter incoming items with no mandatory fields', async () => {
                    let sampleContent = [];
                    for (attr in itemTemplate) {
                        let newItem = Object.assign({}, sampleItems[0]);
                        if (itemTemplate[attr].required === true){
                            delete newItem[attr];
                        }
                        sampleContent.push(newItem);
                    }
                    let optionalFieldsCount = 0;
                    for (attr in itemTemplate) {
                        if (itemTemplate[attr].required === false)
                            optionalFieldsCount++                           
                    }
                    expect(filterContent(sampleContent).length).toBe(optionalFieldsCount);
                });
            });
            // let items;
            // beforeAll(() => {
            //     items = channelObject.elements.filter(item => item.name === "item");
            // })
            // const checkForSingleElement = (item, name) => {
            //     if (item.elements.filter(el => el.name === name).length === 1) return true;
            //         else return false;
            // }
            // test('title', () => {
            //     expect(items.every(item => checkForSingleElement(item, "title"))).toBeTruthy();
            // });
            // test('link', () => {
            //     expect(items.every(item => checkForSingleElement(item, "link"))).toBeTruthy();
            // });
            // test.todo('pdalink (if present)');
            // test.todo('amplink (if present)');
            // test.todo('media:rating (if present; should be ONLY "adult" | "nonadult")');
            // test.todo('pubDate');
            // test.todo('author');
            // test.todo('category (if present; should contain only items from categoryList)');
            // test.todo('enclosure (should contain at least one element)');
            // test.todo('description (if present)');
            // test.todo('content:encoded');
        })
    })
});