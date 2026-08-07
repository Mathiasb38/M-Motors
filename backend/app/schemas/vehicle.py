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
