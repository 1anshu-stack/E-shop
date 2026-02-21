import { Router, Request, Response } from "express";
import { validateToken } from "../middleware/auth.middleware";
import { createProxyMiddleware } from "http-proxy-middleware"
import { ClientRequest } from "http";


const router = Router();



/**
 * Public auth routes
 */
router.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4001/auth",
    changeOrigin: true,
  })
)


/**
 * Protected User Routes
 */
router.use(
  "/user",
  validateToken,
  createProxyMiddleware({
    target: "http://localhost:4002/user",
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq: ClientRequest, req: Request, res: Response) => {
        if (req.user) {
          proxyReq.setHeader(
            "x-user",
            JSON.stringify({
              sub: req.user.sub,
              role: req.user.role,
            })
          );
        }
      },
    },
  })
)


export default router;