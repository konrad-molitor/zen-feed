const itemTemplate = require('../templates/itemTemplate');

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
    const generateItem = (feedItem) => {
        let item = {
            type: "element",
            name: "item",
            elements: []
        }
        //add title
        let titleElement = textElement("title", feedItem.title);
        item.elements.push(titleElement);
        //add link
        let linkElement = textElement("link", feedItem.link);
        item.elements.push(linkElement);
        return item;
    }
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

function filterContent(content){
    return content.filter(item => {
        for (attr in itemTemplate) {
            if (itemTemplate[attr].required && !item.hasOwnProperty(attr))
            return false;
        }
        return true;
    })
}

module.exports = {
    generateFeed,
    element,
    textElement,
    filterContent
}