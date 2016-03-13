/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
import devConfig from './env/development';
import testConfig from './env/test';
import prodConfig from './env/production';

var localConfig = {
    development: devConfig,
    test: testConfig,
    production: prodConfig
}[process.env.NODE_ENV || 'development'];

export default localConfig;
