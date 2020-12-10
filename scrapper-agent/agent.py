import cx_Oracle
import config
from sql_queries import pdb_sql

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


def insert_pdb_entries(pdb_rows):
    sql = "insert into pdb_history(name, con_id, total_size, tstp) values(:name,:con_id,:total_size,:tstp)"

    try:
        # establish a new connection
        with cx_Oracle.connect(
            config.username2, config.password2, config.dsn2, encoding=config.encoding
        ) as connection:
            with connection.cursor() as cursor:
                cursor.setinputsizes(None, None, None, cx_Oracle.TIMESTAMP)
                cursor.executemany(sql, pdb_rows)
                connection.commit()
    except cx_Oracle.Error as error:
        print("Error occurred: " + error)


try:
    pdb_query()

except cx_Oracle.Error as error:
    print("Error occurred: " + error)