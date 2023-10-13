import mysql.connector


def get_db_session():
    try:
        db_connection = mysql.connector.connect(
            host="localhost",
            port=3306,
            user="root",
            password="root",
            database="Asterix"
        )
    except Exception as e:
        print("error: ", e)
    else:
        print("connection to the data base")
        return db_connection


class Connect:
    def __init__(self):
        self.db = get_db_session()
        self.cursor = self.db.cursor()

    def close(self):
        self.cursor.close()
        del self.db
        print("end of connection")

    def sql_query(self, query):
        self.cursor.execute(query)
        res = self.cursor.fetchall()
        return res

    def commit(self):
        self.db.commit()
        return True

    def rollback(self):
        self.db.rollback()
        return True
