DROP TABLE cpu_history;
DROP TABLE datafile_history;
DROP TABLE memory_history;
DROP TABLE pdb_history;
DROP TABLE session_history;
DROP TABLE tablespace_history;
DROP TABLE users;

-- cpu_history
CREATE TABLE cpu_history (
    value  NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);


-- datafile_history
CREATE TABLE datafile_history (
    tablespace_name  VARCHAR2(30 BYTE) NOT NULL,
    datafile_name    VARCHAR2(513 BYTE) NOT NULL,
    total            NUMBER NOT NULL,
    free             NUMBER NOT NULL,
    used             NUMBER NOT NULL,
    percentage_free  NUMBER NOT NULL,
    percentage_used  NUMBER NOT NULL,
    tstp             TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN datafile_history.total IS
    '(MB)';

COMMENT ON COLUMN datafile_history.free IS
    '(MB)';

COMMENT ON COLUMN datafile_history.used IS
    '(MB)';


-- memory_history
CREATE TABLE memory_history (
    total  NUMBER NOT NULL,
    used   NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN memory_history.total IS
    '(MB)';

COMMENT ON COLUMN memory_history.used IS
    '(MB)';


-- pdb_history
CREATE TABLE pdb_history (
    name        VARCHAR2(128 BYTE) NOT NULL,
    con_id      NUMBER NOT NULL,
    total_size  NUMBER NOT NULL,
    tstp        TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN pdb_history.total_size IS
    '(GB)';


-- session_history
CREATE TABLE session_history (
    sid       NUMBER NOT NULL,
    con_id    NUMBER NOT NULL,
    username  VARCHAR2(128 BYTE) NOT NULL,
    status    VARCHAR2(8 BYTE) NOT NULL,
    program   VARCHAR2(48 BYTE) NOT NULL,
    type      VARCHAR2(10 BYTE) NOT NULL,
    tstp      TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);


-- tablespace_history
CREATE TABLE tablespace_history (
    name             VARCHAR2(30 BYTE) NOT NULL,
    total            NUMBER NOT NULL,
    free             NUMBER NOT NULL,
    used             NUMBER NOT NULL,
    percentage_free  NUMBER NOT NULL,
    percentage_used  NUMBER NOT NULL,
    tstp             TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN tablespace_history.total IS
    '(MB)';

COMMENT ON COLUMN tablespace_history.free IS
    '(MB)';

COMMENT ON COLUMN tablespace_history.used IS
    '(MB)';


-- users
CREATE TABLE users (
    user_id             NUMBER NOT NULL,
    username            VARCHAR2(128 BYTE) NOT NULL,
    account_status      VARCHAR2(32 BYTE) NOT NULL,
    default_tablespace  VARCHAR2(30 BYTE) NOT NULL,
    temp_tablespace     VARCHAR2(30 BYTE) NOT NULL,
    last_login          TIMESTAMP WITH LOCAL TIME ZONE NOT NULL
);