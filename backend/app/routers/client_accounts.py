from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.client_account import ClientAccountCreate, ClientAccountOut
from app.services.client_accounts_service import (
    ClientAccountAlreadyExistsError,
    create_client_account,
)


router = APIRouter(prefix="/client-accounts")


@router.post("", response_model=ClientAccountOut, status_code=status.HTTP_201_CREATED)
def create_account(
    account_data: ClientAccountCreate,
    db: Session = Depends(get_db),
) -> ClientAccountOut:
    try:
        return create_client_account(db, account_data)
    except ClientAccountAlreadyExistsError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        ) from error
