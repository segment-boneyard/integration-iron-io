
/**
 * Map messages.
 */

exports.identify = map;
exports.screen = map;
exports.alias = map;
exports.track = map;
exports.page = map;

/**
 * Map msg.
 *
 * @param {Facade} msg
 * @return {Object}
 * @api private
 */

function map(msg){
  return {
    messages: [
      { body: JSON.stringify(msg.json()) }
    ]
  };
}
