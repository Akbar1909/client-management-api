"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
    },
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map