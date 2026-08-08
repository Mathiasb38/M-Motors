from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class ClientAccountCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128, repr=False)
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    birth_date: date

    @field_validator("birth_date")
    @classmethod
    def validate_birth_date(cls, birth_date: date) -> date:
        today = date.today()

        if birth_date > today:
            raise ValueError("Future date not allowed")

        age = today.year - birth_date.year
        if (today.month, today.day) < (birth_date.month, birth_date.day):
            age -= 1

        if age < 18:
            raise ValueError("Must be 18 or older")

        return birth_date


class ClientAccountOut(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    model_config = ConfigDict(from_attributes=True)
