import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization?.split(" ")[1] === "admin") {
    return next();
  }
  return res.status(401).json({
    error: "Unauthorized",
    message: "You must be logged in to access this route",
  });
};
