module.exports = function(wallaby) {
    return {
        files: [
            'server.js',
            'config/**/*.js',
            'lib/**/*.js',
            'test/utils/**/*.js',
            'test/fixtures/**/*'
        ],

        tests: [
            'test/specs/**/*-spec.js'
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel({
                babel: require('babel-core')
            })
        },

        env: {
            type: 'node',
            params: {
                env: 'NODE_ENV=test',
                runner: '--harmony'
            }
        },

        testFramework: 'mocha'
    };
};
