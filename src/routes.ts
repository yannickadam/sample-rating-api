/**
 * Routes configuration
 * 
 * Declare all routes here
 *
 */
import * as Koa from 'koa';                 // Required for definitions
import * as Router from 'koa-router';

// Import modules here
import {addRating, getRating, getRatings} from './modules/rating';

// Initialize router
const router = new Router();

// Declare routes below
router.get('/ratings', getRatings);
router.post('/rating/:flightId', addRating);
router.get('/rating/:flightId', getRating);

// 
export var koaRoutes = router.routes();