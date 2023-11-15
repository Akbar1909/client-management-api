"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const ApiPaginatedResponse = (model) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(model), (0, swagger_1.ApiOkResponse)({
        schema: {
            title: `PaginatedResponseOf${model.name}`,
            allOf: [
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                },
                {
                    properties: {
                        meta: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' },
                                lastPage: { type: 'number' },
                                currentPage: { type: 'number' },
                                perPage: { type: 'number' },
                                prev: { type: 'number' },
                                next: { type: 'number' },
                            },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiPaginatedResponse = ApiPaginatedResponse;
//# sourceMappingURL=pagination-decorator.js.map