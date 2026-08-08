from pwdlib import PasswordHash
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import ClientAccount
from app.schemas.client_account import ClientAccountCreate, ClientAccountOut


password_hash = PasswordHash.recommended()


class ClientAccountAlreadyExistsError(Exception):
    pass


def create_client_account(
    db: Session,
    account_data: ClientAccountCreate,
) -> ClientAccountOut:
    
    account = ClientAccount(
        email=str(account_data.email).lower(),
        password_hash=password_hash.hash(account_data.password),
        first_name=account_data.first_name,
        last_name=account_data.last_name,
        birth_date=account_data.birth_date,
    )
    db.add(account)

    try:
        db.commit()
    except IntegrityError as error:
        db.rollback()
        raise ClientAccountAlreadyExistsError from error

    db.refresh(account)
    return ClientAccountOut.model_validate(account)
