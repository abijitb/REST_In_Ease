module.exports = () => {
    return {
        dependencies        : require('./dependencies'),
        state               : require('./state'),
        responseMessage     : require('./responseMessage'),
        openApi             : () => require('./openapi'),
        middleware          : () => require('./middleware'),
        validation          : () => require('./validation'),
        error               : () => require('./error'),
        helper              : () => require('./helper'),
        queue               : () => require('./queue'),
        model               : function () { return require('./model')( this ) },
        DBConfig            : function () { return require('./dbConfig')( this ) }
    };
};
console.log("\n" +
    "   dBBBBBb    dBBBP.dBBBBP  dBBBBBBP    dBP dBBBBb     dBBBP dBBBBBb  .dBBBBP   dBBBP \n" +
    "       dBP         BP                          dBP                BB  BP              \n" +
    "   dBBBBK'  dBBP   `BBBBb    dBP      dBP dBP dBP    dBBP     dBP BB  `BBBBb  dBBP    \n" +
    "  dBP  BB  dBP        dBP   dBP      dBP dBP dBP    dBP      dBP  BB     dBP dBP      \n" +
    " dBP  dB' dBBBBP dBBBBP'   dBP      dBP dBP dBP    dBBBBP   dBBBBBBBdBBBBP' dBBBBP    \n");
