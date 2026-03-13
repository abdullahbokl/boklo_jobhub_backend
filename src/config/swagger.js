import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JobHub API",
            version: "1.0.0",
            description: "Full-stack Job Hub application REST API",
            contact: {
                name: "JobHub Support",
                email: "support@jobhub.com"
            },
        },
        servers: [
            {
                url: "/api/v1",
                description: "Local Development Server"
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token in the format: Bearer <token>"
                },
            },
            schemas: {
                // --- General Response Structure ---
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Operation successful" },
                        data: { type: "object" },
                    },
                },
                // --- User Schema ---
                User: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        id: { type: "string", example: "60d0fe4f5311236168a109ca" },
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", format: "email", example: "john@example.com" },
                        role: { type: "string", enum: ["user", "admin", "recruiter"], default: "user" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                // --- Job Schema ---
                Job: {
                    type: "object",
                    required: ["title", "company", "location", "jobType"],
                    properties: {
                        id: { type: "string", example: "60d0fe4f5311236168a109cb" },
                        title: { type: "string", example: "Full Stack Developer" },
                        company: { type: "string", example: "Tech Corp" },
                        location: { type: "string", example: "Remote" },
                        jobType: { type: "string", enum: ["Full-time", "Part-time", "Contract", "Internship"] },
                        salary: { type: "number", example: 85000 },
                        description: { type: "string", example: "Looking for an expert in Node.js and React." },
                        createdBy: { $ref: "#/components/schemas/User" }
                    }
                }
            },
        },
        // Apply Global Security (optional - remove if you want specific routes public)
        security: [{ BearerAuth: [] }],
    },
    // Path to the API docs (ensure your routes use JSDoc comments)
    apis: ["./src/routes/*.js"],
};

/**
 * Note: If you still see the [DEP0169] warning, it is coming from
 * the internal 'swagger-jsdoc' parser logic. It does not affect
 * the functionality of the code below.
 */
export const swaggerSpec = swaggerJsdoc(options);