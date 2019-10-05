const configTemplate = require('../templates/configTemplate');

const configCheck = (config) => {
    if ((typeof config) !== 'object' || config === null || Array.isArray(config)) {
        throw new Error('Config should be an object.');
    };
    for (parameter in configTemplate){
        if (configTemplate[parameter].required && !config.hasOwnProperty(parameter)) {
            throw new Error(`${parameter} is required.`);
        }
    }
    for (parameter in config){
        if ((typeof config[parameter]) !== configTemplate[parameter].type) {
            throw new Error(`${parameter} must be type of ${configTemplate[parameter].type}.`);
        }
    }
    return true;
}
module.exports = configCheck;