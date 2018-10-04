/**
 * Cors Module
 * 
 * - Traps "OPTIONS" requests and always returns 200 OK
 * - Adds to all requests ACCESS-CONTROL-ALLOW-ORIGIN: *
 */
import * as Koa from 'koa';                 // Koa Framework

/**
 * 
 */
export async function corsHandler(ctx:Koa.Context, next:any) {

    // Allow clients to pass Content-Type (and specify JSON)
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Always succeed OPTIONS requests
    if (ctx.request.method === "OPTIONS") {
      ctx.status = 200;
      return;
    }

    await next();
}