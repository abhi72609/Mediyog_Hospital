
import sqlite3
from pathlib import Path

from sqlalchemy import text
from database import engine, Base
from models import (
    AdminModel,
    DoctorModel,
    DepartmentModel,
    AppointmentModel,
)

BASE_DIR = Path(__file__).resolve().parent
SQLITE_PATH = BASE_DIR / "mediyog_hospital.db"

models_and_tables = [
    (AdminModel, "admins"),
    (DoctorModel, "doctors"),
    (DepartmentModel, "departments"),
    (AppointmentModel, "appointments"),
]

sqlite_conn = sqlite3.connect(SQLITE_PATH)
sqlite_conn.row_factory = sqlite3.Row

try:
    # Create any missing tables in Neon.
    Base.metadata.create_all(bind=engine)

    with engine.begin() as pg_conn:
        for model, table_name in models_and_tables:
            rows = sqlite_conn.execute(
                f'SELECT * FROM "{table_name}"'
            ).fetchall()

            columns = [column.name for column in model.__table__.columns]
            copied = 0
            skipped = 0

            for row in rows:
                record = {
                    column: row[column]
                    for column in columns
                    if column in row.keys()
                }

                # Skip records whose IDs already exist.
                existing = pg_conn.execute(
                    text(
                        f'SELECT id FROM "{table_name}" WHERE id = :id'
                    ),
                    {"id": record["id"]},
                ).first()

                if existing:
                    skipped += 1
                    continue

                pg_conn.execute(
                    model.__table__.insert().values(**record)
                )
                copied += 1

            # Reset the ID sequence only if the table uses one.
            sequence_name = pg_conn.execute(
                text(
                    "SELECT pg_get_serial_sequence(:table_name, 'id')"
                ),
                {"table_name": table_name},
            ).scalar()

            if sequence_name:
                max_id = pg_conn.execute(
                    text(f'SELECT MAX(id) FROM "{table_name}"')
                ).scalar()

                if max_id is not None:
                    pg_conn.execute(
                        text(
                            "SELECT setval("
                            "CAST(:sequence_name AS regclass), "
                            ":max_id, true)"
                        ),
                        {
                            "sequence_name": sequence_name,
                            "max_id": max_id,
                        },
                    )

            print(
                f"{table_name}: copied {copied}, "
                f"skipped {skipped}"
            )

    print("\nMigration completed successfully.")

finally:
    sqlite_conn.close()
