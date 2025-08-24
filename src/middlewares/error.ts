import { NextFunction, Request, Response } from "express";
import { ApplicationError, HttpError } from "../utils/custom-errors";
import logger from "../utils/logger";
import { ZodError, ZodRealError } from "zod";

export function routeNotFoundErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({
    success: false,
    code: "ROUTE_NOT_FOUND",
    message: "The requested endpoint does not exist",
  });
  next();
}

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.errorCode,
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const isProduction = process.env.NODE_ENV === "production";

  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: isProduction ? "Internal server error" : err.message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
}
