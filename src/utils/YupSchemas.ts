import { number, object, ref, string } from 'yup'

const nicknameRegExp = /^[A-Za-z0-9_]+$/
const nicknameOrEmail = /^[A-Za-z0-9_.@]+$/
const passwordRegExp = /^[A-Za-z0-9_!#$%@^&*(-)+=><"';:}\/?\\{\[\],]+$/
const notSpaceRegExp = /^[^\s]+$/
const notSpecialSymbol = /^[^!#$%^&*(-)+=><"';:}\/?\\{\[\],]+$/

export const LoginSchema = object({
  login: string()
    .matches(notSpaceRegExp, 'Login must not contain spaces.')
    .matches(notSpecialSymbol, 'Login must not contain special symbols.')
    .min(3, 'Login must include at least 3 characters.')
    .max(64, 'Login must not contain more than 64 characters.')
    .matches(nicknameOrEmail, 'Please enter a valid login.')
    .required('Required field'),
  password: string()
    .matches(notSpaceRegExp, 'Password must not contain spaces.')
    .matches(passwordRegExp, 'Please enter a valid password.')
    .min(6, 'Password must include at least 6 characters.')
    .max(36, 'Password must not contain more than 36 characters.')
    .required('Required field'),
})

export const SigniupSchema = object({
  name: string()
    .matches(notSpecialSymbol, 'Name must not contain special symbols.')
    .min(2, 'Name must include at least 2 characters.')
    .max(24, 'Name must not contain more than 24 characters.')
    .required('Required field'),
  secondName: string()
    .matches(notSpecialSymbol, 'Second name must not contain special symbols.')
    .min(2, 'Second name must include at least 2 characters.')
    .max(24, 'Second name must not contain more than 24 characters.')
    .required('Required field'),
  nickname: string()
    .matches(notSpecialSymbol, 'Nickname must not contain special symbols.')
    .matches(nicknameRegExp, 'Please enter a valid nickname.')
    .min(2, 'Nickname must include at least 2 characters.')
    .max(24, 'Nickname must not contain more than 24 characters.')
    .required('Required field'),
  email: string()
    .min(3, 'Email must include at least 3 characters.')
    .max(64, 'Email must not contain more than 24 characters.')
    .email('Please enter a valid email.')
    .required('Required field'),
  password: string()
    .matches(notSpaceRegExp, 'Password must not contain spaces')
    .matches(passwordRegExp, 'Please enter a valid password.')
    .min(6, 'Password must include at least 6 characters.')
    .max(36, 'Password must not contain more than 36 characters.')
    .required('Required field'),
  passwordConfirm: string()
    .oneOf([ref('password'), null], 'Passwords must match')
    .required('Required field'),
})

export const ChangeProfileSchema = object({
  name: string()
    .matches(notSpecialSymbol, 'Name must not contain special symbols.')
    .min(2, 'Name must include at least 2 characters.')
    .max(24, 'Name must not contain more than 24 characters.')
    .required('Required field'),
  secondName: string()
    .matches(notSpecialSymbol, 'Second name must not contain special symbols.')
    .min(2, 'Second name must include at least 2 characters.')
    .max(24, 'Second name must not contain more than 24 characters.')
    .required('Required field'),
  nickname: string()
    .matches(notSpecialSymbol, 'Nickname must not contain special symbols.')
    .matches(nicknameRegExp, 'Please enter a valid nickname.')
    .min(2, 'Nickname must include at least 2 characters.')
    .max(24, 'Nickname must not contain more than 24 characters.')
    .required('Required field'),
})

export const ChangeEmailSchema = object({
  email: string()
    .min(3, 'Email must include at least 3 characters.')
    .max(64, 'Email must not contain more than 24 characters.')
    .email('Please enter a valid email.')
    .required('Required field'),
  hiddenEmail: string().notOneOf([ref('email'), null], 'The new email must be different from the current one.'),
  passwordConfirm: string()
    .matches(notSpaceRegExp, 'Password must not contain spaces.')
    .matches(passwordRegExp, 'Please enter a valid password.')
    .min(6, 'Password must include at least 6 characters.')
    .max(36, 'Password must not contain more than 36 characters.')
    .required('Required field'),
})

export const ChangePasswordSchema = object({
  currentPassword: string()
    .matches(notSpaceRegExp, 'Password must not contain spaces.')
    .matches(passwordRegExp, 'Please enter a valid password.')
    .min(6, 'Password must include at least 6 characters.')
    .max(36, 'Password must not contain more than 36 characters.')
    .required('Required field'),
  password: string()
    .matches(notSpaceRegExp, 'Password must not contain spaces.')
    .matches(passwordRegExp, 'Please enter a valid password.')
    .min(6, 'Password must include at least 6 characters.')
    .max(36, 'Password must not contain more than 36 characters.')
    .notOneOf([ref('currentPassword'), null], 'The new password must be different from the current one.')
    .required('Required field'),
  newPasswordConfirm: string()
    .oneOf([ref('password'), null], 'Passwords must match.')
    .required('Required field'),
})

export const CreateCourseSchema = object({
  name: string()
    .min(6, 'Name must include at least 6 characters.')
    .max(64, 'Name must not contain more than 64 characters.')
    .required('Required field'),
  shortDescription: string()
    .min(6, 'Short description must include at least 6 characters.')
    .max(32, 'Short description must not contain more than 32 characters.'),
  description: string()
    .min(16, 'Description must include at least 16 characters.')
    .max(1024, 'Description must not contain more than 1024 characters.')
    .required('Required field'),
  price: number()
    .min(0, 'Price must be greater than 0.')
    .max(100000, 'Price must be less than 100000.')
    .required('Required field'),
})
