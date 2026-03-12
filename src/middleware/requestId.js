import { v4 as uuidv4 } from "uuid";

/**
 * Injects a unique request ID into every request.
 * Accessible as req.id and returned in the X-Request-ID header.
 */
export const requestId = (req, res, next) => {
  req.id = req.headers["x-request-id"] || uuidv4();
  res.setHeader("X-Request-ID", req.id);
  next();
};

