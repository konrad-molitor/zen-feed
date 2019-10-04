// Zen-feed by Ismail Valiev (Konrad Molitor) 2019
// Distributed under the terms of MIT License
// https://github.com/konrad-molitor/zen-feed

const configTemplate = {
    rssVersion: {
        required: true,
        type: 'string'
    },
    channelTitle: {
        required: true,
        type: 'string'
    },
    siteLink: {
        required: true,
        type: 'string'
    },
    channelDescription: {
        required: false,
        type: 'string'
    },
    channelLanguage: {
        required: false,
        type: 'string'
    },
    getFeedContent: {
        required: true,
        type: 'function'
    },
    useParser: {
        required: true,
        type: 'boolean'
    }
}

const feed = {
    feed: makeFeed,
    configure,
    configTemplate
}

async function makeFeed (req, res, next){
    if (!this.config && next)
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