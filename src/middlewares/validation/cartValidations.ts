import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const validateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check("productos")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un producto al carrito")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
