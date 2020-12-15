DROP MATERIALIZED VIEW mat_view_pdb;

DROP TABLE cpu_values CASCADE CONSTRAINTS;
DROP TABLE datafile CASCADE CONSTRAINTS;
DROP TABLE datafile_values CASCADE CONSTRAINTS;
DROP TABLE memory_values CASCADE CONSTRAINTS;
DROP TABLE pdb_values CASCADE CONSTRAINTS;
DROP TABLE session_values CASCADE CONSTRAINTS;
DROP TABLE tablespace CASCADE CONSTRAINTS;
DROP TABLE tablespace_values CASCADE CONSTRAINTS;
DROP TABLE users CASCADE CONSTRAINTS;


-- cpu_values
CREATE TABLE cpu_values (
    username  VARCHAR2(128 BYTE),
    value  NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);


-- datafile
CREATE TABLE datafile (
    tablespace_name  VARCHAR2(30 BYTE) NOT NULL,
    datafile_name    VARCHAR2(513 BYTE) NOT NULL
);

CREATE UNIQUE INDEX datafile_pk1 ON
    datafile (
        datafile_name
    ASC,
        tablespace_name
    ASC );

ALTER TABLE datafile
    ADD CONSTRAINT datafile_pk PRIMARY KEY ( datafile_name,
                                             tablespace_name )
        USING INDEX datafile_pk1;


-- datafile_values
CREATE TABLE datafile_values (
    tablespace_name  VARCHAR2(30 BYTE) NOT NULL,
    datafile_name    VARCHAR2(513 BYTE) NOT NULL,
    total            NUMBER NOT NULL,
    free             NUMBER NOT NULL,
    used             NUMBER NOT NULL,
    percentage_free  NUMBER NOT NULL,
    percentage_used  NUMBER NOT NULL,
    tstp             TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN datafile_values.total IS
    '(MB)';

COMMENT ON COLUMN datafile_values.free IS
    '(MB)';

COMMENT ON COLUMN datafile_values.used IS
    '(MB)';


-- memory_values
CREATE TABLE memory_values (
    total  NUMBER NOT NULL,
    used   NUMBER NOT NULL,
    tstp   TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN memory_values.total IS
    '(MB)';

COMMENT ON COLUMN memory_values.used IS
    '(MB)';


-- pdb_values
CREATE TABLE pdb_values (
    name        VARCHAR2(128 BYTE) NOT NULL,
    con_id      NUMBER NOT NULL,
    total_size  NUMBER NOT NULL,
    tstp        TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN pdb_values.total_size IS
    '(GB)';


-- session_values
CREATE TABLE session_values (
    sid       NUMBER NOT NULL,
    con_id    NUMBER NOT NULL,
    username  VARCHAR2(128 BYTE),
    status    VARCHAR2(8 BYTE) NOT NULL,
    program   VARCHAR2(48 BYTE) NOT NULL,
    type      VARCHAR2(10 BYTE) NOT NULL,
    tstp      TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);


-- tablespace
CREATE TABLE tablespace (
    name VARCHAR2(30 BYTE) NOT NULL
);

CREATE UNIQUE INDEX tablespace_pk ON
    tablespace (
        name
    ASC );

ALTER TABLE tablespace
    ADD CONSTRAINT tablespace_pk PRIMARY KEY ( name )
        USING INDEX tablespace_pk;


-- tablespace_values
CREATE TABLE tablespace_values (
    name             VARCHAR2(30 BYTE) NOT NULL,
    total            NUMBER NOT NULL,
    free             NUMBER NOT NULL,
    used             NUMBER NOT NULL,
    percentage_free  NUMBER NOT NULL,
    percentage_used  NUMBER NOT NULL,
    tstp             TIMESTAMP WITH LOCAL TIME ZONE DEFAULT systimestamp NOT NULL
);

COMMENT ON COLUMN tablespace_values.total IS
    '(MB)';

COMMENT ON COLUMN tablespace_values.free IS
    '(MB)';

COMMENT ON COLUMN tablespace_values.used IS
    '(MB)';


-- users
CREATE TABLE users (
    username            VARCHAR2(128 BYTE) NOT NULL,
    user_id             NUMBER NOT NULL,
    account_status      VARCHAR2(32 BYTE) NOT NULL,
    default_tablespace  VARCHAR2(30 BYTE) NOT NULL,
    temp_tablespace     VARCHAR2(30 BYTE) NOT NULL,
    last_login          TIMESTAMP WITH LOCAL TIME ZONE
);


-- mat_view_pdb
CREATE MATERIALIZED VIEW mat_view_pdb (
    name,
    con_id
)
    REFRESH
        COMPLETE
        ON COMMIT
AS
    SELECT
        name,
        con_id
    FROM
        pdb_values
    GROUP BY
        name,
        con_id;

ALTER TABLE datafile
    ADD CONSTRAINT datafile_fk1 FOREIGN KEY ( tablespace_name )
        REFERENCES tablespace ( name )
    NOT DEFERRABLE;

ALTER TABLE datafile_values
    ADD CONSTRAINT datafile_values_fk1 FOREIGN KEY ( datafile_name,
                                                     tablespace_name )
        REFERENCES datafile ( datafile_name,
                                        tablespace_name )
    NOT DEFERRABLE;

ALTER TABLE tablespace_values
    ADD CONSTRAINT tablespace_history_fk1 FOREIGN KEY ( name )
        REFERENCES tablespace ( name )
            ON DELETE CASCADE
    NOT DEFERRABLE;