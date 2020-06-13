const config                        = require('../config')();
const Queue                         = config.queue();
const {
    PUSH_QUEUE,
}                                   = config.state;


Queue[ PUSH_QUEUE.TEST_PUSH ].process( ( job ,done ) => {

    console.log( `[ ${ PUSH_QUEUE.TEST_PUSH } ] => [ EXECUTING ]` );
    console.log( `[ ${ PUSH_QUEUE.TEST_PUSH } ] => [ DATA ]`, job.data );
    done();

} );
