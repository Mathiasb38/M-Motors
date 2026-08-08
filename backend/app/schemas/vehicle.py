from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel


class VehicleOut(BaseModel):
    id: int
    brand: str
    model: str
    price: Decimal
    mileage: int | None
    engine: str | None
    offer_type: str
    availability: datetime


class VehicleRentalOptionOut(BaseModel):
    id: int
    name: str
    is_included: bool


class AvailableVehicleFilters(BaseModel):
    offer_type: str | None = None
    brand_id: int | None = None
    model_id: int | None = None
    engine_id: int | None = None
    available_now: bool | None = None


class VehicleEngineOptionsOut(BaseModel):
    id: int
    name: str


class VehicleModelOptionsOut(BaseModel):
    id: int
    name: str
    engines: list[VehicleEngineOptionsOut]


class VehicleBrandOptionsOut(BaseModel):
    id: int
    name: str
    models: list[VehicleModelOptionsOut]


class VehicleOptionsOut(BaseModel):
    brands: list[VehicleBrandOptionsOut]
    engines: list[VehicleEngineOptionsOut]
