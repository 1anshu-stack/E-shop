import { Router } from "express";
import { validateToken } from "../middleware/auth.middleware";
import { createProxyMiddleware } from "http-proxy-middleware"


const router = Router();



/**
 * Public auth routes
 */
router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4001/auth",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "/auth"
    }
  })
)


/**
 * Protected User Routes
 */
router.use(
  "/user",
  validateToken,
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true
  })
)


export default router;