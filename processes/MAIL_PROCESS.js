const config                        = require('../config')();
const Queue                         = config.queue();
const {
    MAIL_QUEUE,
}                                   = config.state;


Queue[ MAIL_QUEUE.TEST_MAIL ].process( ( job ,done ) => {

    console.log( `[ ${ MAIL_QUEUE.TEST_MAIL } ] => [ EXECUTING ]` );
    console.log( `[ ${ MAIL_QUEUE.TEST_MAIL } ] => [ DATA ]`, job.data );
    done();

} );
