# JobHub Backend

Backend API for the JobHub application, built with **Node.js**, **Express**, **MongoDB / Mongoose**, and **Socket.IO**.

This service provides:

- JWT-based authentication and authorization
- User, jobs, bookmarks, applications, chats, and messages APIs
- Real-time messaging with Socket.IO
- Request validation, rate limiting, security headers, and request sanitization
- Swagger API documentation in non-production environments

---

## Tech Stack

- Node.js 18+
- Express 5
- MongoDB Atlas or local MongoDB
- Mongoose
- Socket.IO
- Zod validation
- Winston logging
- Swagger UI

---

## Project Structure

```text
boklo_jobhub_backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── validators/
├── logs/
├── docs/
├── package.json
└── .env.example
```

---

## Prerequisites

Before running the backend, make sure you have:

- **Node.js 18 or newer**
- **npm**
- A **MongoDB Atlas** cluster or a local MongoDB instance

Check your installed versions:

```bash
node -v
npm -v
```

---

## Installation

> Important: run all backend commands from the `boklo_jobhub_backend` folder, not from the workspace root.

```bash
cd /home/bokl2002/Abdullah/Work/Job-hub/boklo_jobhub_backend
npm install
```

---

## Environment Configuration

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Update the values in `.env`.

### Required environment variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | HTTP server port. Default: `7000` |
| `MONGO_URL` | Yes | MongoDB connection string |
| `MONGO_DB_NAME` | Yes | MongoDB database name |
| `JWT_SECRET` | Yes | Secret used to sign access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret used to sign refresh tokens |
| `BCRYPT_SALT` | Yes | Bcrypt salt rounds, e.g. `10` |
| `SECRET_KEY` | Yes | Symmetric encryption key used by utility services |
| `CORS_ORIGIN` | Recommended | Comma-separated allowed frontend origins |
| `LOG_LEVEL` | Optional | Logger level, e.g. `info` |
| `CLOUDINARY_CLOUD_NAME` | Optional | Required only for image uploads |
| `CLOUDINARY_API_KEY` | Optional | Required only for image uploads |
| `CLOUDINARY_API_SECRET` | Optional | Required only for image uploads |
| `CLOUDINARY_SECRET_KEY` | Optional | Backward-compatible alias for Cloudinary secret |

### Example Atlas configuration

```env
PORT=7000
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/
MONGO_DB_NAME=jobhub
JWT_SECRET=replace_with_a_long_random_secret
JWT_REFRESH_SECRET=replace_with_a_different_long_random_secret
BCRYPT_SALT=10
SECRET_KEY=replace_with_a_long_random_secret
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000,http://10.0.2.2:3000
LOG_LEVEL=info
```

---

## Running the Backend

### Development mode

Uses `nodemon` for automatic restarts when files change.

```bash
cd /home/bokl2002/Abdullah/Work/Job-hub/boklo_jobhub_backend
npm run dev
```

### Production mode

Runs the server directly with Node.js.

```bash
cd /home/bokl2002/Abdullah/Work/Job-hub/boklo_jobhub_backend
npm start
```

When startup succeeds, you should see logs similar to:

```text
MongoDB connected: <cluster-host>/<database>
Server running on port 7000
```

---

## Available Endpoints

### Basic health endpoints

- `GET /` → simple service status message
- `GET /health` → health check response

### API base path

All REST endpoints are mounted under:

```text
/api/v1
```

Main route groups:

- `/api/v1` → auth routes
- `/api/v1/users`
- `/api/v1/jobs`
- `/api/v1/bookmarks`
- `/api/v1/chats`
- `/api/v1/messages`
- `/api/v1/images`
- `/api/v1/applications`

### Swagger documentation

Swagger UI is available only when `NODE_ENV` is **not** `production`:

```text
GET /api-docs
```

---

## Real-Time Socket.IO

The backend also exposes a Socket.IO server on the same port.

Socket authentication expects a JWT access token in either:

- `socket.handshake.auth.token`
- `Authorization: Bearer <token>` header

If the token is missing or invalid, the socket connection is rejected.

---

## Logs

Application logs are written using Winston and rotated daily in:

```text
logs/
```

Example log file:

```text
logs/app-YYYY-MM-DD.log
```

---

## Common Issues

### 1. `ENOENT: Could not read package.json`

You are likely running `npm` from the wrong directory.

Use:

```bash
cd /home/bokl2002/Abdullah/Work/Job-hub/boklo_jobhub_backend
npm install
npm run dev
```

### 2. `EADDRINUSE: address already in use :::7000`

Another process is already using port `7000`.

Free the port with:

```bash
fuser -k 7000/tcp
```

Then start the backend again.

### 3. MongoDB connection failure

Check the following:

- `MONGO_URL` is correct
- `MONGO_DB_NAME` is set
- your Atlas database user/password is correct
- your current IP address is whitelisted in MongoDB Atlas

### 4. CORS issues from the frontend

Make sure your frontend URL is included in `CORS_ORIGIN`.

Example:

```env
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000,http://10.0.2.2:3000
```

### 5. Image upload errors

If image uploads fail, verify your Cloudinary configuration:

```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Quick Verification

After starting the server, verify it with:

```bash
curl http://127.0.0.1:7000/
curl http://127.0.0.1:7000/health
```

Expected responses:

`GET /`

```json
{"success":true,"message":"JobHub backend is running."}
```

`GET /health`

```json
{"success":true,"status":"ok"}
```

---

## Related Project

Flutter client:

```text
Flutter-NodeJS-Full-Stack-App/
```

---

## Notes

- Keep `.env` out of source control.
- Rotate secrets if they are ever shared publicly.
- Prefer MongoDB Atlas for hosted environments.
- Use `npm run dev` during development and `npm start` for direct runtime execution.

