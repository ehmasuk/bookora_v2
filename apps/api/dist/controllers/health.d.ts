import type { NextFunction, Response } from "express";
import type { CustomRequest } from "../types/index.js";
declare const checkHealth: (_req: CustomRequest, res: Response, next: NextFunction) => Promise<void>;
export default checkHealth;
//# sourceMappingURL=health.d.ts.map