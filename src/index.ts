/**
 * Sample Flight rating API - Server implementation
 *
 */
import * as Koa from 'koa';               
import * as Parser from 'koa-bodyparser';   
import {logger, koaLogger} from './utilities/logger';
import {koaRoutes} from './routes';
import {corsHandler} from './utilities/corshandler';

const APPLICATION_PORT = 3017;

(async ()=> {

    try {
        // Initialize flight Database


        // Initialize Koa
        const app = new Koa();

        // Logger needs to be injected first
        app.use( koaLogger );

        // Handle CORS requests
        app.use( corsHandler );

        // Parses body params
        app.use( Parser() );

        // Apply Routes
        app.use( koaRoutes );

        // Generic reply - Needs to return 404
        app.use( (ctx:Koa.Context)=>{
            ctx.status = 404;
            ctx.body="This route is not handled by this API.";
        })

        // Start listening
        logger.info(`Starting server on port ${APPLICATION_PORT}.`);
        await app.listen( APPLICATION_PORT );
        logger.info(`Server Started.`);

    } catch(err) {        
        logger.error(err);
    }
    
})();