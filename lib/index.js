
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var fmt = require('util').format;
var mapper = require('./mapper');

/**
 * Expose `Iron IO`
 */

var Iron = module.exports = integration('Iron.io')
  .endpoint('https://mq-aws-us-east-1.iron.io:443')
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.projectId')
  .ensure('settings.token')
  .mapper(mapper)
  .retries(2);

/**
 * Add methods.
 *
 * TODO: batch send
 */

Iron.prototype.identify = sendRequest;
Iron.prototype.screen = sendRequest;
Iron.prototype.alias = sendRequest;
Iron.prototype.track = sendRequest;
Iron.prototype.page = sendRequest;

/**
 * Send request with `payload`, `settings`, `fn`.
 *
 * @param {Facade} payload
 * @param {Function} fn
 * @api public
 */

function sendRequest(payload, fn){
  var url = fmt('/1/projects/%s/queues/segment/messages', this.settings.projectId);
  return this
    .post(url)
    .query({ oauth: this.settings.token })
    .type('json')
    .send(payload)
    .end(this.handle(fn));
}
