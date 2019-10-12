const parse = require('../modules/contentParser');
const cheerio = require('cheerio');
const sampleHtml = require('./sampleHtml');
const fs = require('fs');




describe('sanitizing', () => {
    //fs.writeFileSync('sanitized.html', parse(sampleHtml));
    test('should return string', () => {
        expect(typeof parse(sampleHtml)).toBe('string');
    });
    test('should not contain divs', () => {
        const sanitized = parse(sampleHtml);
        let $ = cheerio.load(sanitized);
        let divs = $('div');
        expect(divs.length).toBe(0);
    });
    test('should convert youtube iframe to link', () => {
        const sanitized = parse(sampleHtml);
        let $ = cheerio.load(sanitized);
        let anchors = $('a[href^="https://www.youtube.com/watch?v=TtZ1Mk3-vlQ"]');
        expect(anchors.length).toBe(1);
    });
    test('should not handle any other iframes', () => {
        const sanitized = parse(sampleHtml);
        let $ = cheerio.load(sanitized);
        let anchors = $('a[href^="https://google.com"]');
        expect(anchors.length).toBe(0);
    });
    test('Youtube link should contain video title', () => {
        const sanitized = parse(sampleHtml);
        let $ = cheerio.load(sanitized);
        let anchors = $('a[href^="https://www.youtube.com/watch?v=TtZ1Mk3-vlQ"]');      
        expect(anchors[0].children[0].data).toBe("https://www.youtube.com/watch?v=TtZ1Mk3-vlQ");
    });
})