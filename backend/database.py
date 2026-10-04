# import os
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker

# # SQLite database file will be created automatically in your backend folder
# SQLALCHEMY_DATABASE_URL = "sqlite:///./mediyog_hospital.db"

# engine = create_engine(
#     SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
# )
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base = declarative_base()

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()



import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Get the folder where database.py is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Always use mediyog_hospital.db inside the backend folder
DATABASE_PATH = os.path.join(
    BASE_DIR,
    "mediyog_hospital.db"
)

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_PATH}"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={
        "check_same_thread": False
    }
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()