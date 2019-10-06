const {generateFeed} = require('../modules/generateFeed');
const {filterContent} = require('../modules/generateFeed');
const {generateItem} = require('../modules/generateFeed');
const itemTemplate = require('../templates/itemTemplate');
const categoryList = require('../templates/zenCategoriesList');
const {getXMLfeed} = require('../modules/generateFeed');
const convert = require('xml-js');
const sanitize = require('sanitize-html');
const sampleHtml = require('./sampleHtml');

const sanitizeConfig = {
    allowedTags: ['b',
     'i', 
     'em', 
     'strong', 
     'a', 
     'img', 
     'video', 
     'figure', 
     'figcaption', 
     'media:content',
     'media:description',
     'media:copyright',
     'span'
    ]
};

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

const findOneByName = (el, name) => {
    return el.elements.find(item => item.name === name);
}

const findByName = (el, name) => {
    return el.elements.filter(item => item.name === name);
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
                //expect(channelObject.elements.find(item => item.name === "title").elements[0].text).toBe(config.channelTitle);
                expect(findOneByName(channelObject, "title").elements[0].text).toBe(config.channelTitle);
            });
            test('link', () => {
                // expect(channelObject.elements.find(item => item.name === "link").elements[0].text).toBe(config.siteLink);
                expect(findOneByName(channelObject, "link").elements[0].text).toBe(config.siteLink);
            });
            test('description (if present)', () => {
                if (config.channelDescription) {
                    expect(findOneByName(channelObject, "description").elements[0].text).toBe(config.channelDescription);
                };
            });
            test('no description element if description not provided', () => {
                let newConfig = Object.assign({}, config);
                delete(newConfig.channelDescription);
                let newFeedObject = generateFeed(newConfig, sampleItems);
                let newChannelObject = newFeedObject.elements[0].elements[0];
                expect(findByName(newChannelObject, "description").length).toBe(0);
            });
            test('language (if present)', () => {                
                if (config.channelLanguage) {
                    expect(findOneByName(channelObject, "language").elements[0].text).toBe(config.channelLanguage);
                }
            });
            test('no language element if language not provided', () => {
                let newConfig = Object.assign({}, config);
                delete(newConfig.channelLanguage);
                let newFeedObject = generateFeed(newConfig, sampleItems);
                let newChannelObject = newFeedObject.elements[0].elements[0];
                expect(findByName(newChannelObject, "language").length).toBe(0);
            });
            test('item - should be at least one', () => {
                expect(findByName(channelObject, "item").length).toBeGreaterThanOrEqual(1);
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
            describe('item generation', () => {
                let sampleItem = sampleItems[0];            
                test('title', () => {
                    expect(findOneByName(generateItem(sampleItem), "title")
                        .elements[0].text)
                        .toBe(sampleItem.title);
                });
                test('link', () => {
                    expect(findOneByName(generateItem(sampleItem), "link")
                        .elements[0].text)
                        .toBe(sampleItem.link);
                })
                test('pdalink (if present)', () => {
                    expect(findOneByName(generateItem(sampleItem), "pdalink")
                    .elements[0].text)
                    .toBe(sampleItem.pdalink);
                });
                test('no pdalink elements if pdalink not present', () => {
                    let newItem = Object.assign({}, sampleItem);
                    delete newItem.pdalink;
                    expect(findByName(generateItem(newItem), "pdalink").length)
                        .toBe(0);
                })
                test('amplink (if present)', () => {
                    expect(findOneByName(generateItem(sampleItem), "amplink")
                    .elements[0].text)
                    .toBe(sampleItem.amplink);
                });
                test('no amplink elements if amplink not present', () => {
                    let newItem = Object.assign({}, sampleItem);
                    delete newItem.amplink;
                    expect(findByName(generateItem(newItem), "amplink").length)
                        .toBe(0);
                })
                test('media:rating (if present; should be ONLY "adult" | "nonadult")', () => {
                    expect(findOneByName(generateItem(sampleItem), "media:rating")
                        .elements[0].text)
                        .toBe(sampleItem.media_rating);
                });
                test('pubDate', () => {
                    expect(findOneByName(generateItem(sampleItem), "pubDate")
                    .elements[0].text)
                    .toBe((new Date(sampleItem.pubDate)).toUTCString());
                });
                test('author', () => {
                    expect(findOneByName(generateItem(sampleItem), "author")
                    .elements[0].text)
                    .toBe(sampleItem.author);
                });
                test('category (if present; should contain only items from categoryList)', () => {
                    let categories = findByName(generateItem(sampleItem), "category").map(item => item.elements[0].text);
                    expect(categories).toEqual(sampleItem.category);
                });
                test('enclosure (should contain at least one element)', () => {
                    expect(findByName(generateItem(sampleItem), "enclosure").length).toBeGreaterThanOrEqual(1);
                });
                test('description (if present)', () => {
                    expect(findOneByName(generateItem(sampleItem), "description")
                        .elements[0].cdata)
                        .toBe(sampleItem.description);
                });
                test('content:encoded w/o parser', () => {
                    if (!config.useParser) {
                        expect(findOneByName(generateItem(sampleItem), "content:encoded")
                        .elements[0].cdata)
                        .toBe(sampleItem.content_encoded);
                    }                    
                });
                test('content:encoded with parser', () => {
                    let newSampleItem = Object.assign({}, sampleItem);
                    newSampleItem.content_encoded = sampleHtml;
                    let item = generateItem(newSampleItem, true);
                    expect(findOneByName(item, "content:encoded")
                        .elements[0].cdata)
                        .toBe(sanitize(sampleHtml, sanitizeConfig));
                })
            });
        })
    })
});

describe('xml generation', () => {
    test('xml converted back to js-object should be equal passed object', () => {
        let feedObj = generateFeed(config, sampleItems);
        let resultXML = getXMLfeed(feedObj);
        //fs.writeFileSync('xml.xml', resultXML);
        expect(convert.xml2js(resultXML)).toEqual(feedObj);
    })
})