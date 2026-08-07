from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Brand, Vehicle, VehicleModel
from app.schemas.vehicle import VehicleOut


def list_available_vehicles(db: Session) -> list[VehicleOut]:
    rows = db.execute(
        select(
            Vehicle.id,
            Brand.name.label("brand"),
            VehicleModel.name.label("model"),
            Vehicle.price,
            Vehicle.offer_type,
            Vehicle.availability,
        )
        .join(VehicleModel, VehicleModel.id == Vehicle.model_id)
        .join(Brand, Brand.id == VehicleModel.brand_id)
        .where(Vehicle.availability.is_not(None))
        .order_by(Brand.name, VehicleModel.name)
    ).mappings().all()

    return [
        VehicleOut(**row)
        for row in rows
    ]
