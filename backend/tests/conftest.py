import os
from pathlib import Path

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


load_dotenv(Path(__file__).resolve().parents[1] / ".env")

from app.database import Base


@pytest.fixture
def without_lifespan(monkeypatch: pytest.MonkeyPatch) -> None:
    import app.main as main

    monkeypatch.setattr(main, "check_database_connection", lambda: None)
    monkeypatch.setattr(main, "close_database_connection", lambda: None)


@pytest.fixture
def db_session():
    database_url_test = os.getenv("DATABASE_URL_TEST")

    if database_url_test is None:
        raise RuntimeError("DATABASE_URL_TEST is not defined")

    engine = create_engine(database_url_test)
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)

    with SessionLocal() as session:
        yield session

    Base.metadata.drop_all(engine)
    engine.dispose()
