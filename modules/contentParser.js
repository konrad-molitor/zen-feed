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
        ],
        transformTags: {
            'iframe': function(tagName, attribs) {
                // lot of pain down there
                // and, I guess, we have two problems now...
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (rx.test(attribs.src)) {
                   const videoId = attribs.src.match(rx)[1];
                   let title = `https://www.youtube.com/watch?v=${videoId}`;
                   return {
                        tagName: 'a',
                        attribs: {
                            href: `https://www.youtube.com/watch?v=${videoId}`
                        },
                        text: title
                    }
                } else {
                    return '';
                }                
            }
        }
    }
    const result = sanitinize(html, parseConfig);
    return result;
}

module.exports = parse;