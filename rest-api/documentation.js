module.exports = {
    openapi: "3.0.3",
    info: {
        version: "1.2.0",
        title: "Oracle Montior",
        description: "Oracle Monitor API",
    },
    license: {
        name: "MIT",
        url: "https://github.com/vascoalramos/oracle-monitor/blob/main/LICENSE",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Local server",
        },
    ],
    tags: [
        {
            name: "CPU",
            name: "Memory",
            name: "Users",
            name: "PDBs",
            name: "Sessions",
            name: "Tablespaces",
            name: "Datafiles",
        },
    ],
    paths: {
        "/cpu/history": {
            get: {
                tags: ["CPU"],
                description: "Get CPU history",
                operationId: "getCpuHistory",
                parameters: [],
                responses: {
                    200: {
                        description: "CPU history was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CpuValues",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/memory/history": {
            get: {
                tags: ["Memory"],
                description: "Get Memory history",
                operationId: "getMemoryHistory",
                parameters: [],
                responses: {
                    200: {
                        description: "Memory history was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/MemoryValues",
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users": {},
        "/pdbs": {},
        "/sessions": {},
        "/tablespaces": {},
        "/datafiles": {},
    },
    components: {
        schemas: {
            CpuValue: {
                type: "object",
                properties: {
                    value: {
                        type: "number",
                        description: "CPU value in %",
                        example: "24.1",
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.432Z",
                    },
                },
            },
            CpuValues: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/CpuValue",
                },
            },
            MemoryValue: {
                type: "object",
                properties: {
                    total: {
                        type: "number",
                        description: "Memory total value in MB",
                        example: "1800",
                    },
                    used: {
                        type: "number",
                        description: "Memory used value in MB",
                        example: "4576",
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.432Z",
                    },
                },
            },
            MemoryValues: {
                type: "array",
                items: {
                    $ref: "#/components/schemas/MemoryValue",
                },
            },
        },
    },
};
