const sanitinize = require('sanitize-html');

const parse = (html) => {
    const parseConfig = {
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
         'span',
         'strike'
        ]
    }
    const result = sanitinize(html, parseConfig);
    return result;
}

module.exports = parse;