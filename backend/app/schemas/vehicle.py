from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class VehicleOut(BaseModel):
    id: int
    brand: str
    model: str
    price: Decimal
    offer_type: str
    availability: datetime


class VehicleModelOptionsOut(BaseModel):
    id: int
    name: str


class VehicleBrandOptionsOut(BaseModel):
    id: int
    name: str
    models: list[VehicleModelOptionsOut]


class VehicleOptionsOut(BaseModel):
    brands: list[VehicleBrandOptionsOut]
