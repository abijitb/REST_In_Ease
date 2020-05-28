const config = require('../../config')();
const { os } = config.packages;

module.exports = {
    ErrorResponse           : ErrorResponse,
    cpuUsageResponse        : cpuUsageResponse,
    memoryUsageResponse     : memoryUsageResponse,
};

/**
 * Error Response Helper
 * @param res
 * @returns {function(...[*]=)}
 * @constructor
 */
function ErrorResponse (res) {
    return (error) => {
        console.log(`[ ERROR STACK ] => ${ error.stack }`);
        if (!error.errors) {
            return res.error(error.message, error.name);
        } else if (error.errors && error.name && error.name.match(/Sequelize/)) {
            let errorItems = error.errors.map((err, i) => {
                return `\n[ ${ i + 1 } ] => ${ err.message }`;
            });
            console.log(`[ SERVER ERROR ] => ${ errorItems }`);
            return res.error("ERR500", error.message);
        } else {
            return res.error(error.message);
        }
    }
}

/**
 * Cpu Usage Helper
 * @returns {string}
 */
function cpuUsageResponse () {
    const NUMBER_OF_CPUS = os.cpus().length,
    startTime  = process.hrtime(),
    startUsage = process.cpuUsage(),
    elapTime = process.hrtime(startTime),
    elapUsage = process.cpuUsage(startUsage),
    elapTimeMS = hrtimeToMS(elapTime),
    elapUserMS = elapUsage.user / 1000, // microseconds to milliseconds
    elapSystMS = elapUsage.system / 1000;

    return (100 * (elapUserMS + elapSystMS) / elapTimeMS / NUMBER_OF_CPUS).toFixed(1) + '%';
}

/**
 * Memory Usage Helper
 * @returns {string}
 */
function memoryUsageResponse () {
    const rss = process.memoryUsage().rss / 1024 / 1024,
    heapTotal = process.memoryUsage().heapTotal / 1024 / 1024,
    used = process.memoryUsage().heapUsed / 1024 / 1024,
    external = process.memoryUsage().external / 1024 / 1024,
    calculatedObj = {
        RSS: `${Math.round(rss * 100) / 100} MB`,
        HEAP_TOTAL: `${Math.round(heapTotal * 100) / 100} MB`,
        HEAP_USED: `${Math.round(used * 100) / 100} MB`,
        EXTERNAL: `${Math.round(external * 100) / 100} MB`,
    };

    return JSON.stringify(calculatedObj, null, 2);
}

function hrtimeToMS (hrtime) {
    return hrtime[0] * 1000 + hrtime[1] / 1000000
}
