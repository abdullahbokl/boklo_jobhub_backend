const BLOCKED_KEYS = new Set(["$where", "$regex"]);
const BLOCKED_CHARS = ["$", "."];

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function shouldRemoveKey(key) {
  return BLOCKED_KEYS.has(key) || BLOCKED_CHARS.some((char) => key.includes(char));
}

function sanitizeValue(value) {
  if (Array.isArray(value)) {
    value.forEach((item) => sanitizeValue(item));
    return value;
  }

  if (!isPlainObject(value)) {
    return value;
  }

  Object.keys(value).forEach((key) => {
    if (shouldRemoveKey(key)) {
      delete value[key];
      return;
    }

    sanitizeValue(value[key]);
  });

  return value;
}

export function sanitizeRequest(req, _res, next) {
  sanitizeValue(req.body);
  sanitizeValue(req.params);
  sanitizeValue(req.query);
  next();
}

