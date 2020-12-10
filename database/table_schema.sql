DROP TABLE cpu_history CASCADE CONSTRAINTS;

DROP TABLE datafile_history CASCADE CONSTRAINTS;

DROP TABLE memory_history CASCADE CONSTRAINTS;

DROP TABLE pdb_history CASCADE CONSTRAINTS;

DROP TABLE session_history CASCADE CONSTRAINTS;

DROP TABLE tablespace_history CASCADE CONSTRAINTS;

DROP TABLE users CASCADE CONSTRAINTS;

CREATE TABLE cpu_history (
    value  NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

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

CREATE UNIQUE INDEX datafile_history_pk ON
    datafile_history (
        datafile_name
    ASC );

ALTER TABLE datafile_history
    ADD CONSTRAINT datafile_history_pk PRIMARY KEY ( datafile_name )
        USING INDEX datafile_history_pk;

CREATE TABLE memory_history (
    total  NUMBER NOT NULL,
    used   NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN memory_history.total IS
    '(MB)';

COMMENT ON COLUMN memory_history.used IS
    '(MB)';

CREATE TABLE pdb_history (
    name        VARCHAR2(128 BYTE) NOT NULL,
    con_id      NUMBER NOT NULL,
    total_size  NUMBER NOT NULL,
    tstp        TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN pdb_history.total_size IS
    '(GB)';

CREATE UNIQUE INDEX pdb_history_pk ON
    pdb_history (
        name
    ASC );

ALTER TABLE pdb_history
    ADD CONSTRAINT pdb_history_pk PRIMARY KEY ( name )
        USING INDEX pdb_history_pk;

CREATE TABLE session_history (
    sid       NUMBER NOT NULL,
    con_id    NUMBER NOT NULL,
    username  VARCHAR2(128 BYTE) NOT NULL,
    status    VARCHAR2(8 BYTE) NOT NULL,
    program   VARCHAR2(48 BYTE) NOT NULL,
    type      VARCHAR2(10 BYTE) NOT NULL,
    tstp      TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

CREATE UNIQUE INDEX session_history_pk ON
    session_history (
        sid
    ASC );

ALTER TABLE session_history
    ADD CONSTRAINT session_history_pk PRIMARY KEY ( sid )
        USING INDEX session_history_pk;

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

CREATE UNIQUE INDEX tablespace_history_pk ON
    tablespace_history (
        name
    ASC );

ALTER TABLE tablespace_history
    ADD CONSTRAINT tablespace_history_pk PRIMARY KEY ( name )
        USING INDEX tablespace_history_pk;

CREATE TABLE users (
    user_id             NUMBER NOT NULL,
    username            VARCHAR2(128 BYTE) NOT NULL,
    account_status      VARCHAR2(32 BYTE) NOT NULL,
    default_tablespace  VARCHAR2(30 BYTE) NOT NULL,
    temp_tablespace     VARCHAR2(30 BYTE) NOT NULL,
    last_login          TIMESTAMP WITH LOCAL TIME ZONE NOT NULL
);

CREATE UNIQUE INDEX users_pk ON
    users (
        user_id
    ASC );

ALTER TABLE users
    ADD CONSTRAINT users_pk PRIMARY KEY ( user_id )
        USING INDEX users_pk;

ALTER TABLE datafile_history
    ADD CONSTRAINT datafile_history_fk1 FOREIGN KEY ( tablespace_name )
        REFERENCES tablespace_history ( name )
            ON DELETE CASCADE
    NOT DEFERRABLE;