const zenFeed = require('../index');

const config = {
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: () => {},
    useParser: false
}
module.exports = describe('Base', () => {
    describe('Basic setup', () => {
        test('import should return an object', () => {
            expect(typeof zenFeed).toBe('object');
        });
        test('.feed should return a function', () => {
            expect(typeof zenFeed.feed).toBe('function');
        });
        test('.feed should call next() callback', () => {
            let myMock = jest.fn()
            zenFeed.feed(null, null, myMock);
            expect(myMock).toBeCalled();
        });
        test('.feed should accept 3 arguments', () => {
            expect(zenFeed.feed.length).toBe(3);
        });
        test('.configure should return a function',() => {
            expect(typeof(zenFeed.configure)).toBe('function');
        });
        test('should save config object', () => {
            zenFeed.configure(config);
            expect(zenFeed.config).toEqual(config);
        });
    });
    describe('Config', () => {
        describe('should throw an exception if received non-object', () => {
            let badConfigs = [
                        1,
                        'test',
                        true,
                        null,
                        undefined,
                        []
                    ];
            badConfigs.forEach(config => (
                test(`${config} - ${typeof config} argument`, () => {
                    function badCfg(){
                        zenFeed.configure(config);
                    }
                    expect(badCfg).toThrowError('Config should be an object.');
                })
            ));
        });
        describe('should throw an exception if required parameter missing', () => {
            let badConfigs = [];
            for (parameter in zenFeed.configTemplate){
                if (zenFeed.configTemplate[parameter].required){
                    let cfg = Object.assign({}, config);
                    delete cfg[parameter];
                    badConfigs.push({cfg, parameter});
                }            
            }
            badConfigs.forEach(config => {
                test(`${config.parameter} is missing`, () => {
                    function badCfg() {
                        zenFeed.configure(config.cfg);
                    }
                    expect(badCfg).toThrowError(`${config.parameter} is required.`);
                })
            })
        })
        describe("should throw an exception if parameter value doesn't match specified type",() => {
            let badConfigs = [];
            for (parameter in zenFeed.configTemplate){
                let cfg = Object.assign({}, config);
                cfg[parameter] = 1;
                badConfigs.push({cfg, parameter, type: zenFeed.configTemplate[parameter].type});
            };
            badConfigs.forEach(config => {
                test(`${config.parameter} is ${typeof config.cfg[config.parameter]} instead of ${config.type}`, () => {
                    function badCfg() {
                        zenFeed.configure(config.cfg)
                    }
                    expect(badCfg).toThrowError(`${config.parameter} must be type of ${config.type}.`);
                })            
            });
        });
    });
    
})


