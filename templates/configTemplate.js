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

module.exports = configTemplate;