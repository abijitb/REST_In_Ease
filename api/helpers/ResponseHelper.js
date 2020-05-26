
module.exports = {
    ErrorResponse           : ErrorResponse,
};

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
