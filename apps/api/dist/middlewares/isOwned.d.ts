import type { Response, NextFunction } from "express";
import { Model } from "mongoose";
import type { CustomRequest } from "../types/index.js";
interface Params {
    model: Model<any>;
    paramName: string;
    ownerField: string;
}
declare const isOwned: ({ model, paramName, ownerField }: Params) => (req: CustomRequest, _res: Response, next: NextFunction) => Promise<void>;
export default isOwned;
//# sourceMappingURL=isOwned.d.ts.map