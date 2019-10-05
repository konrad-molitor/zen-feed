// Zen-feed by Ismail Valiev (Konrad Molitor) 2019
// Distributed under the terms of MIT License
// https://github.com/konrad-molitor/zen-feed
const convert = require('xml-js');

const configTemplate = require('./templates/configTemplate');
const itemTemplate = require('./templates/itemTemplate');

const feed = {
    feed: makeFeed,
    configure,
    configTemplate,
    itemTemplate,
    filterContent,
    generateFeed
}

async function makeFeed (req, res, next){
    if (!this.config)
        next(new Error('No config provided! Call .config({config}) first.'));
    else {
        let feedContentData = await this.config.getFeedContent();
        if (!feedContentData) {
            next(new Error('getFeedContent() returned nothing.'));
        } else if (Array.isArray(feedContentData) && feedContentData.length === 0) {
            next(new Error('getFeedContent() returned empty array.'));
        } else if (!Array.isArray(feedContentData)) {
            next(new Error(`getFeedContent() returned ${typeof feedContentData} instead of array.`));
        } else if (feedContentData.some(item => typeof(item) !== 'object')){
            next(new Error('getFeedContent() should return array of objects.'));
        }
        next()
    }    
}

function generateFeed(config, items){
    let feed = {
        elements: [
            {
                name: "rss",
                type: "element",
                attributes: {
                    version: config.rssVersion,
                    'xmlns:atom': "http://www.w3.org/2005/Atom",
                    'xmlns:content': "http://purl.org/rss/1.0/modules/content/",
                    'xmlns:dc': "http://purl.org/dc/elements/1.1/",
                    'xmlns:georss': "http://www.georss.org/georss",
                    'xmlns:media': "http://search.yahoo.com/mrss/"
                },
                elements: []
            }
        ]
    }
    const textElement  = (name, text) => {
        return {
            name,
            type: "element",
            elements: [
                {
                    text,
                    type: "text"
                }
            ]
        }
    };
    let channelElement = {
        name: "channel",
        type: "element",
        elements: []
    };
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
    //console.debug(JSON.stringify(feed, null, 4));
    return feed;
}

function filterContent(content){
    return content.filter(item => {
        for (attr in this.itemTemplate) {
            if (this.itemTemplate[attr].required && !item.hasOwnProperty(attr))
            return false;
        }
        return true;
    })
}

function configure(config){
    if ((typeof config) !== 'object' || config === null || Array.isArray(config)) 
        throw new Error('Config should be an object.')
    for (parameter in this.configTemplate){
        if (this.configTemplate[parameter].required && !config.hasOwnProperty(parameter)) 
            throw new Error(`${parameter} is required.`)
    }
    for (parameter in config){
        if ((typeof config[parameter]) !== this.configTemplate[parameter].type) 
            throw new Error(`${parameter} must be type of ${this.configTemplate[parameter].type}.`);
    }
    this.config = config;
}

module.exports = feed;
