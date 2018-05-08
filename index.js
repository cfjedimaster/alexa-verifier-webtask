const alexaVerifier = require('alexa-verifier');
const rawBody = require('raw-body');

module.exports = function() {

    return function alexaVerifierMiddleware(req, res, next) {
		
		let signaturechainurl = req.headers.signaturecertchainurl;
        let signature = req.headers.signature;

		return rawBody(req, {encoding:'utf-8'}, (err, body) => {
			alexaVerifier(signaturechainurl, signature, body, function(err) {
				if(err) return next(err);
				req.webtaskContext.body = JSON.parse(body);
				return next();
			});
		});

    };
}
