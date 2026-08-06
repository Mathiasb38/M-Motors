import os

import pytest


os.environ.setdefault(
    "DATABASE_URL",
    "postgresql+psycopg://user:password@localhost:5432/test",
)


@pytest.fixture
def without_lifespan(monkeypatch: pytest.MonkeyPatch) -> None:
    import app.main as main

    monkeypatch.setattr(main, "check_database_connection", lambda: None)
    monkeypatch.setattr(main, "close_database_connection", lambda: None)
