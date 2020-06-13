const config = require('../../config')();
const Queue = config.queue();


module.exports = {
    addPushQueue            : addPushQueue,
    addMailQueue            : addMailQueue,
};

/**
 * Push Queue Add Method
 * @param queueName
 * @param queuePayload
 */
function addPushQueue ( queueName, queuePayload ) {
    addToQueue( queueName, queuePayload );
}

/**
 * Mail Queue Add Method
 * @param queueName
 * @param queuePayload
 */
function addMailQueue( queueName, queuePayload ) {
    addToQueue( queueName, queuePayload );
}

/**
 * Add Queue
 * @param name
 * @param payload
 */
function addToQueue ( name, payload ) {

    const Options = {
        attempts            : 2,
        timeout             : 40000,
        delay               : 100,
    };

    Queue[ name ].add( payload, Options )
        .then(( response ) => {
            console.log( `[ ${ name } ] => [ JOB ADDED. ID: ${ response.id } ]` );
        })
        .catch(( error ) => {
            console.log( `[ ${ name } ] => [ ERROR WHILE ADDING JOB ]`, error );
        })
}
