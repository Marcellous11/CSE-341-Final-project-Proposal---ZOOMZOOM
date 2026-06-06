 import {body, validationResult } from "express-validator"

 const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

const carValidationRules = () => {
  return [
    body('make').notEmpty().withMessage("Make is required"),
    body('model').notEmpty().withMessage("Model is required"),
    body('year').notEmpty().withMessage("Year is required"),
  ]
}


export {validate,carValidationRules}