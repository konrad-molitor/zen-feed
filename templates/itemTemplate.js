const itemTemplate = {
    title: {                    // Item title
        type: 'string',
        required: true
    },
    link: {                     // Publication URL
        type: 'string',
        required: true
    },
    pdalink: {                  // Mobile version URL
        type: 'string',
        required: false
    },
    amplink: {                  // AMP version URL
        type: 'string',
        required: false
    },
    media_rating: {             // Media rating. Can contain ONLY 'adult' OR 'nonadult'
        type: 'string',
        required: false,
        values: ['adult', 'nonadult']
    },
    pubDate: {                  // Publication date (UNIX time). Will be translated to RFC822 : DDD, dd mmm yyyy hh:mm:ss +hh(offset)
        type: 'number',
        required: true
    },
    author: {                   // Publication author
        type: 'string',
        required: true
    },
    category: {                 // Must be an array, can contain items from categoryList
        type: 'object',
        required: false
    },
    enclosure: {                // Must be an array, must contain URLs and mime types of all used media content
        type: 'object',         // if useParser === true, will be fullfilled automatically if not provided
        required: true
    },
    description: {              // Short publication description
        type: 'string',
        required: false
    },
    content_encoded: {          // Full publication text/or video clip
        type: 'string',
        required: true
    }
}

module.exports = itemTemplate;