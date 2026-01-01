import { Router } from "express";
import checkHealth from "../controllers/health.js";
const router = Router();
// routes
router.get("/", checkHealth);
export default router;
//# sourceMappingURL=health.js.map