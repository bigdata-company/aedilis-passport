var BearerStrategy = require('passport-http-bearer'),
    rest = require('restler'),
    util = require('util');

function AedilisStrategy(options) {
	var host = options.host || '127.0.0.1';
	var port = options.port || 8500;
	var kv_path = options.kv_path || '/v1/kv/_system/store/access_tokens/'

	BearerStrategy.Strategy.call(this, function(token, done) {
		rest.get('http://' + host + ':' + port + kv_path + token)
		.on('complete', function(result) {
            if (result instanceof Error) {
                done(result);
            } else {
                if (result.length == 0) {
                    return done(false, false);
                } else {
                    if (! result[0].Value) return done(false, null);
                    var buffer = new Buffer(result[0].Value, 'base64');

                    return done(false, JSON.parse(buffer.toString()).user);
                }
            }
        });
	});
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(AedilisStrategy, passport.BearerStrategy);

module.exports = AedilisStrategy;