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
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/CPU",
                                    },
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
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Memory",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/users": {
            get: {
                tags: ["Users"],
                description: "Get Users",
                operationId: "getUsers",
                parameters: [],
                responses: {
                    200: {
                        description: "Users data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/User",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/pdbs": {
            get: {
                tags: ["PDBs"],
                description: "Get PDBs",
                operationId: "getPDbs",
                parameters: [],
                responses: {
                    200: {
                        description: "PDBs data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/PDB",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/sessions": {},
        "/tablespaces": {},
        "/datafiles": {},
    },
    components: {
        schemas: {
            CPU: {
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
            Memory: {
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
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "number",
                        description: "User ID",
                        example: "1",
                    },
                    name: {
                        type: "string",
                        description: "Username",
                        example: "ORCLMONITOR",
                    },
                    status: {
                        type: "string",
                        description: "User account status",
                        example: "OPEN",
                    },
                    default_tablespace: {
                        type: "string",
                        description: "User default tablespace",
                        example: "SYSTEM",
                    },
                    temp_tablespace: {
                        type: "string",
                        description: "User temporary tablespace",
                        example: "TEMP",
                    },
                    last_login: {
                        type: "string",
                        description: "User last login",
                        example: "2020-12-11T22:37:31.000Z",
                    },
                },
            },
            PDB: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "PDB name",
                        example: "PDB$SEED",
                    },
                    con_id: {
                        type: "interger",
                        description: "PDB connection id",
                        example: "1",
                    },
                },
            },
        },
    },
};
