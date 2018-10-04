import * as Koa from 'koa';
import { logger } from '../utilities/logger';

export interface RatingStorage {
  rating: number;
  votes: number;
}

export interface RatingModel {
  flightId: string;
  rating: number;
  votes: number;
}

const FlightsRatingMap: {[key: string]: RatingStorage } = {};

export const addRating = (ctx: Koa.Context, next: any) => {
  const flightId: string = ctx.params.flightId;
  const rating: number = parseInt((ctx.request.body as any).rating, 10);

  if (!rating || rating < 1 || rating > 5) {
    ctx.status = 400;
    ctx.body = {error: "Invalid rating"};
    return;
  }

  logger.info(`addRating called for flight ${flightId}`);  
  if( !FlightsRatingMap[flightId] ) {
    FlightsRatingMap[flightId] = { rating: rating, votes: 1};
  } else {
    logger.info(FlightsRatingMap[flightId]);
    FlightsRatingMap[flightId].rating = (FlightsRatingMap[flightId].rating * FlightsRatingMap[flightId].votes + rating) / (FlightsRatingMap[flightId].votes + 1);
    FlightsRatingMap[flightId].votes++;
    logger.info(FlightsRatingMap[flightId]);
  }
  ctx.status = 201;
  ctx.body = {
      ...FlightsRatingMap[flightId],
      flightId
  };
}

export const getRatings = (ctx: Koa.Context, next: any) => {
  logger.info(`getRatings called.`);
  ctx.status = 201;
  ctx.body = Object.keys(FlightsRatingMap).map((key) => ({...FlightsRatingMap[key], flightId: key}) );
}

export const getRating = (ctx: Koa.Context, next: any) => {
  const flightId: string = ctx.params.flightId;

  logger.info(`getRating called for flight ${flightId}`);

  if( FlightsRatingMap[flightId] ) {
    const ratingModel: RatingModel = {
        ...FlightsRatingMap[flightId],
        flightId
    };
    ctx.body = ratingModel;
  } else {
    ctx.status = 404;
    ctx.body = `No rating yet for flight ${flightId}`;
  }
}