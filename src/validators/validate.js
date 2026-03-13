import { ValidationError } from "../utils/errors.js";
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // Zod v4 exposes issues on `error.issues` (not `error.errors`).
      const issues = result.error?.issues || [];
      const message = issues.length
        ? issues.map((e) => e.message).join(", ")
        : "Invalid request payload";
      return next(new ValidationError(message));
    }
    req.body = result.data;
    next();
  };
}
