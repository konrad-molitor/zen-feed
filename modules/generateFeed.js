const itemTemplate = require('../templates/itemTemplate');
const categoriesList = require('../templates/zenCategoriesList');
const mime = require('mime');
const convert = require('xml-js');

const generateFeed = function (config, items) {
    let feed = element(null, null, null, []);
    feed.elements.push(element("rss", "element", {
                        version: config.rssVersion,
                        'xmlns:atom': "http://www.w3.org/2005/Atom",
                        'xmlns:content': "http://purl.org/rss/1.0/modules/content/",
                        'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                        'xmlns:georss': "http://www.georss.org/georss",
                        'xmlns:media': "http://search.yahoo.com/mrss/"
                    }, []));
    let channelElement = element("channel", "element", null, []);
    // add title
    let titleElement = textElement("title", config.channelTitle)
    channelElement.elements.push(titleElement);
    //add siteLink
    let siteLinkElement = textElement("link", config.siteLink)
    channelElement.elements.push(siteLinkElement);
    // add description if provided
    if (config.channelDescription && config.channelDescription.length !== 0){
        let descriptionElement = textElement("description", config.channelDescription);
        channelElement.elements.push(descriptionElement);
    }
    // add language if provided
    if (config.channelLanguage && config.channelLanguage.length === 2) {
        let languageElement = textElement("language", config.channelLanguage);
        channelElement.elements.push(languageElement);
    }
    // add items
    for (item of items){
        let itemElement = generateItem(item);
        channelElement.elements.push(itemElement);
    }
    feed.elements[0].elements.push(channelElement);
    return feed;
}

function element(name, type, attributes, elements){
    let result = {};
    if (attributes) result.attributes = attributes;
    if (name) result.name = name;
    if (type) result.type = type;
    if (elements) result.elements = elements;
    return result;
}

function textElement(name, text) {
    let result = element(name, "element", null, []);
    result.elements.push({
        text,
        type: "text"
    });
    return result;
}

function generateItem(feedItem, useParser) {
    let item = element("item", "element", null, []);
    //add title
    let titleElement = textElement("title", feedItem.title);
    item.elements.push(titleElement);
    //add link
    let linkElement = textElement("link", feedItem.link);
    item.elements.push(linkElement);
    //add pdalink if present
    if (feedItem.pdalink) {
        let pdalinkElement = textElement("pdalink", feedItem.pdalink);
        item.elements.push(pdalinkElement);
    }
    //add amplink if present
    if (feedItem.amplink) {
        let ampLinkElement = textElement("amplink", feedItem.amplink);
        item.elements.push(ampLinkElement);
    }
    //add media:rating if present and contains correct value (othervise pass it)
    if (feedItem.media_rating && ['adult', 'nonadult'].includes(feedItem.media_rating)){
        let media_ratingElement = textElement("media:rating", feedItem.media_rating);
        media_ratingElement.attributes = {scheme: "urn:simple"}
        item.elements.push(media_ratingElement);
    }
    //add pubDate in rfc-882 (UTCString)
    let pubDateElement = textElement("pubDate", (new Date(feedItem.pubDate)).toUTCString());
    item.elements.push(pubDateElement);
    //add author
    let authorElement = textElement("author", feedItem.author);
    item.elements.push(authorElement);
    //add categories
    for (cat of feedItem.category){
        if (categoriesList.includes(cat)) {
            let catElement = textElement("category", cat);
            item.elements.push(catElement);
        }
    }
    //add enclosure
    for (enc of feedItem.enclosure) {
        let enclosureElement = element("enclosure",
        "element",
        {
            url: enc,
            type: mime.getType(enc.split('.')[enc.split('.').length-1])
        })
        item.elements.push(enclosureElement);
    }
    //add description (if present)
    if (feedItem.description) {
        let descriptionElement = element("description", "element", null, []);
        descriptionElement.elements.push({
            type: "cdata",
            cdata: feedItem.description
        })
        item.elements.push(descriptionElement);
    }
    //add content:encoded (full text)
    // if not using built-in parser
    if (useParser) {
        console.log('Zen-Feed: built-in parser not implemented yet.');
    }
    let content_encodedElement = element("content:encoded", "element", null, []);
    content_encodedElement.elements.push({
        type: "cdata",
        cdata: feedItem.content_encoded
    });
    item.elements.push(content_encodedElement);
    return item;
}

function filterContent(content){
    return content.filter(item => {
        for (attr in itemTemplate) {
            if (itemTemplate[attr].required && !item.hasOwnProperty(attr))
            return false;
        }
        return true;
    })
}

function getXMLfeed(feedObj){
    let xml = convert.js2xml(feedObj, {compact: false, spaces: 4});
    return xml;
}

function serveRss(config, items){
    let filteredItems = filterContent(items);
    let feed = generateFeed(config, filteredItems);
    let xml = getXMLfeed(feed);
    return xml;
}

module.exports = {
    generateFeed,
    element,
    textElement,
    filterContent,
    generateItem,
    getXMLfeed,
    serveRss
}