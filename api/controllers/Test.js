const config            = require('../../config')();
const {
    QA
}                       = config.helper();
const {
    PUSH_QUEUE,
}                       = config.state;

module.exports = {
    TestPushQueue           : TestPushQueue,
};

/**
 * Test Push Queue
 * @param req
 * @param res
 * @returns {*}
 * @constructor
 * @route `/test/queue/push`
 */
function TestPushQueue ( req, res ) {

    const payload = {
        first_name: req.query('first_name'),
        last_name: req.query('last_name'),
        queue_name: PUSH_QUEUE.TEST_PUSH,
    };

    QA.addPushQueue( PUSH_QUEUE.TEST_PUSH, payload );
    return res.success( "QUEUE200", payload );

}
