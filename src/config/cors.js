const parseOrigins = (value) =>
  value
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];

const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;

const isDevelopmentOrigin = (origin) => localhostPattern.test(origin);

export const corsOrigins = parseOrigins(process.env.CORS_ORIGIN);

export const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  if (corsOrigins.includes(origin)) {
    return true;
  }

  return process.env.NODE_ENV === "development" && isDevelopmentOrigin(origin);
};

export const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
};
