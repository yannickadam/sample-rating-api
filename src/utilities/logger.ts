/**
 * Logging Module
 * 
 * 1) Have only one configuration for the Bunyan logger
 * 2) Exposes a middleware for Koa
 */
import * as Koa from 'koa';                 // Koa Framework
import * as bunyan from 'bunyan';           // Logger

// Have only one logger created and configured.
const obj:any = {};
if( !obj.log ) {
    obj.log = bunyan.createLogger({name: "RAPI"});
}

// Used to identify requests uniquely
var requestID = 0;

/**
 * 
 */
async function Logger(ctx:Koa.Context, next:any) {

    let currentRequestID = requestID++;

    // Log initial request
    const startTime = process.hrtime()
    logger.info(`→ (ID:${currentRequestID}) ${ctx.request.method} ${ctx.request.url}`);
    
    await next();

    // Log response status and time
    const endTime = process.hrtime();
    const elapsed = (endTime[0]-startTime[0]) * 1000 + (endTime[1]-startTime[1]) / 1000000;
    logger.info(`← (ID:${currentRequestID}) ${ctx.request.method} ${ctx.request.url} : Status(${ctx.response.status}) Time(${elapsed.toFixed(0)}ms)`);

}


// expose Loggers
export var logger = obj.log;
export var koaLogger = Logger;