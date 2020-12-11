import cx_Oracle, config, time 
from multiprocessing import Process
from sql_queries import (
    pdb_sql,
    sessions_sql,
    memory_sql,
    tablespaces_sql,
    datafiles_sql,
    users_sql,
)

batch_size = 20


def pdb_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
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
    sql = "insert into pdb_history(name, con_id, total_size, tstp) values(:name, :con_id, :total_size, :tstp)"
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
        cx_Oracle.SYSDBA,
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
    sql = "insert into session_history(sid, con_id, username, status, program, type, tstp) values(:sid, :con_id, :username, :status, :program, :type, :tstp)"
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
        cx_Oracle.SYSDBA,
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
    sql = "insert into memory_history(total, used, tstp) values(:total, :used, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()


def tablespaces_query():
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        cx_Oracle.SYSDBA,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(tablespaces_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_tablespaces_entries(rows)


def insert_tablespaces_entries(rows):
    sql = "insert into tablespace_history(name, total, free, used, percentage_free, percentage_used, tstp) values(:name, :total, :free, :used, :percentage_free, :percentage_used, :tstp)"
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
        cx_Oracle.SYSDBA,
        encoding=config.encoding,
    ) as connection:
        with connection.cursor() as cursor:
            cursor.execute(datafiles_sql)
            while True:
                rows = cursor.fetchmany(batch_size)
                if not rows:
                    break
                insert_datafiles_entries(rows)


def insert_datafiles_entries(rows):
    sql = "insert into datafile_history(tablespace_name, datafile_name, total, free, used, percentage_free, percentage_used, tstp) values(:tablespace_name, :file_name, :total, :free, :used, :percentage_free, :percentage_used, :tstp)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(
                None, None, None, None, None, None, None, cx_Oracle.TIMESTAMP
            )
            cursor.executemany(sql, rows)
            connection.commit()


def users_query():
    delete_users()
    with cx_Oracle.connect(
        config.username,
        config.password,
        config.dsn,
        cx_Oracle.SYSDBA,
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
    sql = "insert into users(user_id, username, account_status, default_tablespace, temp_tablespace, last_login) values(:user_id, :username, :account_status, :default_tablespace, :temp_tablespace, :last_login)"
    with cx_Oracle.connect(
        config.username2, config.password2, config.dsn2, encoding=config.encoding
    ) as connection:
        with connection.cursor() as cursor:
            cursor.setinputsizes(None, None, None, None, None, cx_Oracle.TIMESTAMP)
            cursor.executemany(sql, rows)
            connection.commit()

def runTimed():
    while True:
        main()
        time.sleep(30)

def main():
    try:
        pdb_query()
        session_query()
        memory_query()
        tablespaces_query()
        datafiles_query()
        users_query()
    except cx_Oracle.Error as error:
        print("Error occurred: " + error)


if __name__ == "__main__":
    runTimed()


