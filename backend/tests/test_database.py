from unittest.mock import Mock

import pytest

from app import database


def test_get_db(monkeypatch: pytest.MonkeyPatch) -> None:
    session = Mock()
    monkeypatch.setattr(database, "SessionLocal", Mock(return_value=session))

    db_generator = database.get_db()

    assert next(db_generator) is session

    db_generator.close()

    session.close.assert_called_once()


