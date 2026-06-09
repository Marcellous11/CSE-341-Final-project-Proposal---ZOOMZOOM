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

const registerValidationRules = () => {
  return [
    body('user_name').trim().notEmpty().withMessage("Username is required"),
    body('user_password')
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body('email').optional().isEmail().withMessage("Email must be valid"),
  ]
}

const loginValidationRules = () => {
  return [
    body('user_name').trim().notEmpty().withMessage("Username is required"),
    body('user_password').notEmpty().withMessage("Password is required"),
  ]
}


export {validate,carValidationRules,registerValidationRules,loginValidationRules}