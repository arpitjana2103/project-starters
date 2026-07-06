import { getEnv } from "../utils/get-env.util.js";

export const config = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
};
