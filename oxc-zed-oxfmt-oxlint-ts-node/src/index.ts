import "dotenv/config";

import type { Request, Response, NextFunction } from "express";
import type { StringValue as msStringValue } from "ms";

import express from "express";
import session from "express-session";
import ms from "ms";
import passport from "passport";
import qs from "qs";

import { config, runningOnProduction } from "./configs/app.config.js";
import { HTTPSTATUSCODE } from "./configs/http.config.js";
import { prisma } from "./libs/prisma.js";
import { handleAsyncError } from "./middlewares/async-handler.middleware.js";
import { handleGlobalError } from "./middlewares/global-error-handler.middleware.js";

const app = express();

// Middleware: Parses JSON request bodies
// - Applies only to Content-Type: application/json
// - Attaches parsed payload to req.body
// - Payload size limit: 10MB
// - Invalid JSON → 400 Bad Request
app.use(express.json({ limit: "10mb" }));

// Config: Custom query parser using qs
// - Parses URL query strings into structured objects
// - Supports nested objects and arrays (qs.parse)
// - Overrides default Express query parser
app.set("query parser", function (queryString: string) {
    return qs.parse(queryString);
});

app.get(
    "/",
    handleAsyncError(async function (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        res.status(HTTPSTATUSCODE.OK).json({
            message: "Welcome To TaskOrbit Server.",
        });
        return;
    }),
);

// Middleware: Global error handler with env-based responses
// - Routes errors to dev or prod handlers based on environment
app.use(handleGlobalError);

// Starts HTTP server on configured PORT and logs environment details
app.listen(config.PORT, async function () {
    console.log(`🛜 Server: http://localhost:${config.PORT} [env:${config.NODE_ENV}]`);
});
