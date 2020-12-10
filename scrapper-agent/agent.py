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
                for row in rows:
                    insert_pdb_entry(row)


def insert_pdb_entry(pdb_row):
    sql = (
        "insert into pdb_history(name, con_id, total_size, tstp) "
        "values(:name,:con_id,:total_size,:tstp)"
    )

    try:
        # establish a new connection
        with cx_Oracle.connect(
            config.username2, config.password2, config.dsn, encoding=config.encoding
        ) as connection:
            with connection.cursor() as cursor:
                cursor.setinputsizes(None, None, None, cx_Oracle.TIMESTAMP)
                cursor.execute(sql, [pdb_row[0], pdb_row[1], pdb_row[2], pdb_row[3]])
                connection.commit()
    except cx_Oracle.Error as error:
        print("Error occurred:")
        print(error)


try:
    pdb_query()

except cx_Oracle.Error as error:
    print(error)