// Zen-feed by Ismail Valiev (Konrad Molitor) 2019
// Distributed under the terms of MIT License
// https://github.com/konrad-molitor/zen-feed
const convert = require('xml-js');

const configCheck = require('./modules/configCheck');
const {generateFeed} = require('./modules/generateFeed');

const feed = {
    feed: makeFeed,
    configure,
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

function configure(config) {
    try {
        if (configCheck(config)) {
            this.config = config;
        } else {
            throw new Error('Configure failed because unknown reason.');
        }
    } catch (err) {
        throw (err);
    }
}

module.exports = feed;
