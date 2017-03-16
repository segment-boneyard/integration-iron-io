
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
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.projectId')
  .ensure('settings.token')
  .ensure('settings.endpoint')
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
Iron.prototype.group = sendRequest;

/**
 * Send request with `payload`, `settings`, `fn`.
 *
 * @param {Facade} payload
 * @param {Function} fn
 * @api public
 */

function sendRequest(payload, fn){
  var url = fmt('%s/3/projects/%s/queues/segment/messages', this.settings.endpoint, this.settings.projectId);
  return this
    .post(url)
    .query({ oauth: this.settings.token })
    .type('json')
    .send(payload)
    .end(this.handle(fn));
}
