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
    body('make').notEmpty().withMessage("First name is required"),
    body('model').notEmpty().withMessage("Last name is required"),
    body('year').isEmail().withMessage("Email is required"),
  ]
}


export {validate,carValidationRules}