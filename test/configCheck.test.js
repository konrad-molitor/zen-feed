const configCheck = require('../modules/configCheck');
const configTemplate = require('../templates/configTemplate');

const config = {
    rssVersion: "2.0",
    channelTitle: "Test channel title",
    siteLink: "http://testsite.test",
    channelDescription: "Test channel description",
    channelLanguage: "ru",
    getFeedContent: () => {},
    useParser: false
}

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
                    configCheck(config);
                }
                expect(badCfg).toThrowError('Config should be an object.');
            })
        ));
    });
    describe('should throw an exception if required parameter missing', () => {
        let badConfigs = [];
        for (parameter in configTemplate){
            if (configTemplate[parameter].required){
                let cfg = Object.assign({}, config);
                delete cfg[parameter];
                badConfigs.push({cfg, parameter});
            }            
        }
        badConfigs.forEach(config => {
            test(`${config.parameter} is missing`, () => {
                function badCfg() {
                    configCheck(config.cfg);
                }
                expect(badCfg).toThrowError(`${config.parameter} is required.`);
            })
        })
    })
    describe("should throw an exception if parameter value doesn't match specified type",() => {
        let badConfigs = [];
        for (parameter in configTemplate){
            let cfg = Object.assign({}, config);
            cfg[parameter] = 1;
            badConfigs.push({cfg, parameter, type: configTemplate[parameter].type});
        };
        badConfigs.forEach(config => {
            test(`${config.parameter} is ${typeof config.cfg[config.parameter]} instead of ${config.type}`, () => {
                function badCfg() {
                    configCheck(config.cfg)
                }
                expect(badCfg).toThrowError(`${config.parameter} must be type of ${config.type}.`);
            })            
        });
    });
});