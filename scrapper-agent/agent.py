import cx_Oracle, config, time
from multiprocessing import Process
from sql_queries import (
    pdb_sql,
    sessions_sql,
    memory_sql,
    tablespaces_sql,
    datafiles_sql,
    users_sql,
    cpu_sql,
)

batch_size = 20


def pdb_query():
    with cx_Oracle.connect(
        config.username_root,
        config.password_root,
        config.dsn_root,
        cx_Oracle.SYSDBA,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(pdb_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_pdb_entries(rows)


def insert_pdb_entries(rows):
    sql = "insert into pdb_values(name, con_id, total_size, tstp) values(:name, :con_id, :total_size, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()


def session_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(sessions_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_session_entries(rows)


def insert_session_entries(rows):
    sql = "insert into session_values(sid, con_id, username, status, program, type, tstp) values(:sid, :con_id, :username, :status, :program, :type, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(
                None, None, None, None, None, None, cx_Oracle.TIMESTAMP
            )
            cursor.executemany(sql, rows)
            connection.commit()


def memory_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(memory_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_memory_entries(rows)


def insert_memory_entries(rows):
    sql = "insert into memory_values(total, used, tstp) values(:total, :used, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()


def users_query():
    delete_users()
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(users_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_users_entries(rows)


def delete_users():
    sql = "truncate table users"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            connection.commit()


def insert_users_entries(rows):
    sql = "insert into users(username, user_id, account_status, default_tablespace, temp_tablespace, last_login) values(:username, :user_id, :account_status, :default_tablespace, :temp_tablespace, :last_login)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, None, None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()


def tablespaces_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(tablespaces_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_tablespaces([{"tablespace_name": row[0]} for row in rows])
                insert_tablespaces_values(rows)


def insert_tablespaces(tablespaces):
    sql = "merge into tablespace using dual on (tablespace.name =:tablespace_name) when not matched then insert (name) VALUES (:tablespace_name)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:

            cursor.executemany(sql, tablespaces)
            connection.commit()


def insert_tablespaces_values(rows):
    sql = "insert into tablespace_values(name, total, free, used, percentage_free, percentage_used, tstp) values(:name, :total, :free, :used, :percentage_free, :percentage_used, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(
                None, None, None, None, None, None, cx_Oracle.TIMESTAMP
            )
            cursor.executemany(sql, rows)
            connection.commit()


def datafiles_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(datafiles_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_datafiles(
                    [
                        {"tablespace_name": row[0], "datafile_name": row[1]}
                        for row in rows
                    ]
                )
                insert_datafiles_values(rows)


def insert_datafiles(datafiles):
    sql = "merge into datafile using dual on (datafile.tablespace_name=:tablespace_name and datafile.datafile_name=:datafile_name) when not matched then insert (tablespace_name, datafile_name) VALUES (:tablespace_name, :datafile_name)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.executemany(sql, datafiles)
            connection.commit()


def insert_datafiles_values(rows):
    sql = "insert into datafile_values(tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used, tstp) values(:tablespace_name, :file_name, :total, :free, :used, :percentage_free, :percentage_used, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(
                None, None, None, None, None, None, None, cx_Oracle.TIMESTAMP
            )
            cursor.executemany(sql, rows)
            connection.commit()


def cpu_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(cpu_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_cpu_entries(rows)


def insert_cpu_entries(rows):
    sql = (
        "insert into cpu_values(username,value, tstp) values(:username, :usage, :tstp)"
    )
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()


def run_agent():
    try:
        pdb_query()
        session_query()
        memory_query()
        users_query()
        tablespaces_query()
        datafiles_query()
        cpu_query()
    except cx_Oracle.Error as error:
        print("Error occurred: " + error)


def main():
    while True:
        run_agent()
        time.sleep(30)


if __name__ == "__main__":
    main()
