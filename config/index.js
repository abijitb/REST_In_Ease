module.exports = () => {
    return {
        packages            : require('./packages'),
        constant            : require('./constant'),
        middleware          : () => require('./middleware'),
        responseMessages    : () => require('./response_messages'),
        error               : () => require('./error'),
        helper              : () => require('./helper'),
        dto                 : () => require('./dto'),
        validation          : () => require('./validation'),
        model               : function () { return require('./model')(this) },
        DBConfig            : function () { return require('./database_configuration')(this) }
    };
};

console.log("\n" +
    "   dBBBBBb    dBBBP.dBBBBP  dBBBBBBP    dBP dBBBBb     dBBBP dBBBBBb  .dBBBBP   dBBBP \n" +
    "       dBP         BP                          dBP                BB  BP              \n" +
    "   dBBBBK'  dBBP   `BBBBb    dBP      dBP dBP dBP    dBBP     dBP BB  `BBBBb  dBBP    \n" +
    "  dBP  BB  dBP        dBP   dBP      dBP dBP dBP    dBP      dBP  BB     dBP dBP      \n" +
    " dBP  dB' dBBBBP dBBBBP'   dBP      dBP dBP dBP    dBBBBP   dBBBBBBBdBBBBP' dBBBBP    \n");
