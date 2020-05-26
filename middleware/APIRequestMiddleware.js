module.exports = () => {

    return (req, res, next) => {

        let query = req.query;

        req.get = (key, model) => {
            if (req.method === 'GET') {
                const Model = model || req.swagger.operation.operationId;
                return req.swagger.params[Model].value[key];
            }
        };

        req.post = (key, model) => {
            if (req.method === "POST") {
                const Model = model || req.swagger.operation.operationId;
                return req.swagger.params[Model].value[key];
            }
        };

        req.getPathValue = (key, model) => {
            return req.swagger.params[key].value;
        };

        req.all = (model) => {
            const Model = model || req.swagger.operation.operationId;
            return req.swagger.params[Model].value;
        };

        req.query = (value) => {
            if(!value) return query;
            return query[value];
        };

        next();
    };
};
