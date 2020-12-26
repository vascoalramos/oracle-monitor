module.exports = {
    openapi: "3.0.3",
    info: {
        version: "1.2.0",
        title: "Oracle Monitor",
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
                parameters: [
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
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
                parameters: [
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
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
                operationId: "getPDBs",
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
        "/pdbs/history": {
            get: {
                tags: ["PDBs"],
                description: "Get PDBs history",
                operationId: "getPDBsHistory",
                parameters: [
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
                responses: {
                    200: {
                        description: "PDBs history was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        entities: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/PDB",
                                            },
                                        },
                                        history: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/PDBValue",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/sessions/history": {
            get: {
                tags: ["Sessions"],
                description: "Get Sessions",
                operationId: "getSessions",
                parameters: [],
                responses: {
                    200: {
                        description: "Sessions data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Session",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/sessions/total/history": {
            get: {
                tags: ["Sessions"],
                description: "Get Sessions Total",
                operationId: "getSessionsTotal",
                parameters: [
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
                responses: {
                    200: {
                        description: "Sessions data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/SessionTotal",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/tablespaces": {
            get: {
                tags: ["Tablespaces"],
                description: "Get Tablespaces",
                operationId: "getTablespaces",
                parameters: [],
                responses: {
                    200: {
                        description: "Tablespaces data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Tablespace",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/tablespaces/history": {
            get: {
                tags: ["Tablespaces"],
                description: "Get Tablespaces history",
                operationId: "getTablespacesHistory",
                parameters: [
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
                responses: {
                    200: {
                        description: "Tablespaces history was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        entities: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Tablespace",
                                            },
                                        },
                                        history: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/TablespaceValue",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/datafiles": {
            get: {
                tags: ["Datafiles"],
                description: "Get Datafiles",
                operationId: "getDatafiles",
                parameters: [
                    {
                        name: "tablespace",
                        in: "query",
                        schema: {
                            type: "string",
                            example: "SYSTEM",
                        },
                        required: false,
                    },
                ],
                responses: {
                    200: {
                        description: "Datafiles data was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Datafile",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        "/datafiles/history": {
            get: {
                tags: ["Datafiles"],
                description: "Get Datafiles history",
                operationId: "getDatafilesHistory",
                parameters: [
                    {
                        name: "tablespace",
                        in: "query",
                        schema: {
                            type: "string",
                            example: "SYSTEM",
                        },
                        required: false,
                    },
                    {
                        name: "groupBy",
                        in: "query",
                        schema: {
                            type: "string",
                            enum: ["minute", "hour", "day", "month", "year"],
                            default: "minute",
                        },
                        required: false,
                    },
                ],
                responses: {
                    200: {
                        description: "Datafiles history was obtained",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        entities: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/Datafile",
                                            },
                                        },
                                        history: {
                                            type: "array",
                                            items: {
                                                $ref: "#/components/schemas/DatafileValue",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    components: {
        schemas: {
            CPU: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        description: "DB user name",
                        example: "SYSTEM",
                    },
                    value: {
                        type: "number",
                        description: "CPU value in %",
                        example: 24.1,
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
                        example: 1800,
                    },
                    used: {
                        type: "number",
                        description: "Memory used value in MB",
                        example: 4576,
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
                        type: "integer",
                        description: "User ID",
                        example: 1,
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
                        example: 1,
                    },
                },
            },
            PDBValue: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "PDB name",
                        example: "ORCLPDB1",
                    },
                    con_id: {
                        type: "interger",
                        description: "PDB connection id",
                        example: 2,
                    },
                    size: {
                        type: "number",
                        description: "PDB total size value in GB",
                        example: 3.4,
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.127Z",
                    },
                },
            },
            Session: {
                type: "object",
                properties: {
                    id: {
                        type: "interger",
                        description: "Session ID",
                        example: 1,
                    },
                    con_id: {
                        type: "interger",
                        description: "Session's PDB connection id",
                        example: 2,
                    },
                    username: {
                        type: "string",
                        description: "Session's user name",
                        example: "ORCLMONITOR",
                    },
                    status: {
                        type: "string",
                        description: "Session status",
                        example: "ACTIVE",
                    },
                    program: {
                        type: "string",
                        description: "Session's program",
                        example: "oracle@5027f6f36af6 (W004)",
                    },
                    type: {
                        type: "string",
                        description: "Session type",
                        example: "BACKGROUND",
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.127Z",
                    },
                },
            },
            SessionTotal: {
                type: "object",
                properties: {
                    total: {
                        type: "string",
                        description: "Session type",
                        example: 2.3,
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.127Z",
                    },
                },
            },
            Tablespace: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Tablespace name",
                        example: "SYSTEM",
                    },
                },
            },
            TablespaceValue: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: "Tablespace name",
                        example: "SYSTEM",
                    },
                    total: {
                        type: "number",
                        description: "Tablespace total size (MB)",
                        example: 610,
                    },
                    free: {
                        type: "number",
                        description: "Tablespace free size (MB)",
                        example: 36,
                    },
                    used: {
                        type: "number",
                        description: "Tablespace used size (MB)",
                        example: 574,
                    },
                    percentage_free: {
                        type: "number",
                        description: "Tablespace percentage of free space (%)",
                        example: 6,
                    },
                    percentage_used: {
                        type: "number",
                        description: "Tablespace percentage of used space (%)",
                        example: 94,
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.127Z",
                    },
                },
            },
            Datafile: {
                type: "object",
                properties: {
                    tablespace_name: {
                        type: "string",
                        description: "Tablespace name",
                        example: "SYSTEM",
                    },
                    datafile_name: {
                        type: "string",
                        description: "Datafile name",
                        example: "/u02/app/oracle/oradata/ORCLCDB/orclpdb1/system01.dbf",
                    },
                },
            },
            DatafileValue: {
                type: "object",
                properties: {
                    tablespace_name: {
                        type: "string",
                        description: "Tablespace name",
                        example: "SYSTEM",
                    },
                    datafile_name: {
                        type: "string",
                        description: "Datafile name",
                        example: "/u02/app/oracle/oradata/ORCLCDB/orclpdb1/system01.dbf",
                    },
                    total: {
                        type: "number",
                        description: "Datafile total size (MB)",
                        example: 290,
                    },
                    free: {
                        type: "number",
                        description: "Datafile free size (MB)",
                        example: 9,
                    },
                    used: {
                        type: "number",
                        description: "Datafile used size (MB)",
                        example: 281,
                    },
                    percentage_free: {
                        type: "number",
                        description: "Datafile percentage of free space (%)",
                        example: 97,
                    },
                    percentage_used: {
                        type: "number",
                        description: "Datafile percentage of used space (%)",
                        example: 3,
                    },
                    tstp: {
                        type: "string",
                        description: "Timestamp",
                        example: "2020-12-11T22:34:14.127Z",
                    },
                },
            },
        },
    },
};
