const winston =require('winston')
exports.logger=winston.createLogger({
    level:'error',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),     
    ),
    transports:[
        new winston.transports.File({
            filename:'error.log'
        })
    ]
})