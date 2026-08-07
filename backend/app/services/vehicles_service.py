from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Brand, Vehicle, VehicleModel
from app.schemas.vehicle import (
    AvailableVehicleFilters,
    VehicleBrandOptionsOut,
    VehicleModelOptionsOut,
    VehicleOptionsOut,
    VehicleOut,
)


def list_available_vehicles(
    db: Session,
    filters: AvailableVehicleFilters,
) -> list[VehicleOut]:
    query = (
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
    )

    if filters.offer_type is not None:
        query = query.where(Vehicle.offer_type == filters.offer_type)

    if filters.brand_id is not None:
        query = query.where(Brand.id == filters.brand_id)

    if filters.model_id is not None:
        query = query.where(VehicleModel.id == filters.model_id)

    if filters.available_now is True:
        from datetime import datetime, timezone

        query = query.where(Vehicle.availability <= datetime.now(timezone.utc))

    rows = db.execute(query.order_by(Brand.name, VehicleModel.name)).mappings().all()

    return [
        VehicleOut(**row)
        for row in rows
    ]


def get_vehicle_options(db: Session) -> VehicleOptionsOut:
    rows = db.execute(
        select(
            Brand.id.label("brand_id"),
            Brand.name.label("brand"),
            VehicleModel.id.label("model_id"),
            VehicleModel.name.label("model"),
        )
        .join(VehicleModel, VehicleModel.brand_id == Brand.id)
        .order_by(Brand.name, VehicleModel.name)
    ).mappings().all()

    brands = []
    current_brand = None

    for row in rows:
        if current_brand is None or current_brand.name != row["brand"]:
            current_brand = VehicleBrandOptionsOut(
                id=row["brand_id"],
                name=row["brand"],
                models=[],
            )
            brands.append(current_brand)

        current_brand.models.append(
            VehicleModelOptionsOut(
                id=row["model_id"],
                name=row["model"],
            )
        )

    return VehicleOptionsOut(
        brands=brands,
    )
