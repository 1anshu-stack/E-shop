import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validations/auth.validator';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { roleBasedAuth } from '../middlewares/authRole.middleware';

const router = Router();

/**
 * register router
 */
router.post(
  '/register', 
  validate(registerSchema), 
  authController.register
);


/**
 * login router
 */
router.post(
  '/login', 
  validate(loginSchema), 
  authController.login
);


/**
 * refresh router
 */
router.post(
  '/refresh', 
  authController.refreshToken
);


/**
 * logout router
 */
router.post(
  '/logout', 
  authMiddleware, 
  authController.logout
);


/**
 * userService to get Detail from authService
 */
router.get(
  '/internal/user/:id',
  authController.getSingleUser
)


/**
 * TEST ROUTES FOR Bearer Token
 */
router.get(
  '/me', 
  authMiddleware, 
  authController.me
);


/**
 * TEST ROUTES FOR ROLE BASED AUTH
 */
router.get(
  '/role', 
  roleBasedAuth('USER'), 
  authController.role
);


export default router;
