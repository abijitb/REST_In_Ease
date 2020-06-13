const config            = require('../../config')();
const {
    QA
}                       = config.helper();
const {
    PUSH_QUEUE, MAIL_QUEUE,
}                       = config.state;

module.exports = {
    TestPushQueue           : TestPushQueue,
    TestMailQueue           : TestMailQueue,
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


/**
 * Test Mail Queue
 * @param req
 * @param res
 * @returns {*}
 * @constructor
 * @route `/test/queue/mail`
 */
function TestMailQueue ( req, res ) {

    const payload = {
        first_name: req.query('first_name'),
        last_name: req.query('last_name'),
        queue_name: MAIL_QUEUE.TEST_MAIL,
    };

    QA.addMailQueue( MAIL_QUEUE.TEST_MAIL, payload );
    return res.success( "QUEUE200", payload );

}
