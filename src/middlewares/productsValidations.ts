/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const validateAddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await check("nombre", "El nombre es requerido").notEmpty().run(req);
  await check("precio", "El precio es requerido").notEmpty().isNumeric().withMessage('El precio debe expresarse en numero').run(req);
  await check("descripcion", "La descripcion es requerida").notEmpty().run(req);
  await check("codigo", "Codigo requerido").notEmpty().run(req);
  await check("foto", "Foto url es requerida").notEmpty().run(req);
  await check("stock", "El stock es requerido")
    .notEmpty()
    .isNumeric()
    .withMessage("Debe ser un valor numérico")
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
