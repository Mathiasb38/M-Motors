from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Brand, Engine, ModelEngine, Vehicle, VehicleModel
from app.schemas.vehicle import (
    AvailableVehicleFilters,
    VehicleBrandOptionsOut,
    VehicleEngineOptionsOut,
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
            Vehicle.mileage,
            Engine.name.label("engine"),
            Vehicle.offer_type,
            Vehicle.availability,
        )
        .join(VehicleModel, VehicleModel.id == Vehicle.model_id)
        .outerjoin(Engine, Engine.id == Vehicle.engine_id)
        .join(Brand, Brand.id == VehicleModel.brand_id)
        .where(Vehicle.availability.is_not(None))
    )

    if filters.offer_type is not None:
        query = query.where(Vehicle.offer_type == filters.offer_type)

    if filters.brand_id is not None:
        query = query.where(Brand.id == filters.brand_id)

    if filters.model_id is not None:
        query = query.where(VehicleModel.id == filters.model_id)

    if filters.engine_id is not None:
        query = query.where(Engine.id == filters.engine_id)

    if filters.available_now is True:
        from datetime import datetime, timezone

        query = query.where(Vehicle.availability <= datetime.now(timezone.utc))

    rows = db.execute(query.order_by(Brand.name, VehicleModel.name)).mappings().all()

    return [
        VehicleOut(**row)
        for row in rows
    ]


def get_vehicle_options(db: Session) -> VehicleOptionsOut:
    brand_rows = db.execute(
        select(
            Brand.id.label("brand_id"),
            Brand.name.label("brand"),
            VehicleModel.id.label("model_id"),
            VehicleModel.name.label("model"),
            Engine.id.label("engine_id"),
            Engine.name.label("engine"),
        )
        .join(VehicleModel, VehicleModel.brand_id == Brand.id)
        .outerjoin(ModelEngine, ModelEngine.model_id == VehicleModel.id)
        .outerjoin(Engine, Engine.id == ModelEngine.engine_id)
        .order_by(Brand.name, VehicleModel.name, Engine.name)
    ).mappings().all()

    brands = []
    current_brand = None
    current_model = None

    for row in brand_rows:
        if current_brand is None or current_brand.name != row["brand"]:
            current_brand = VehicleBrandOptionsOut(
                id=row["brand_id"],
                name=row["brand"],
                models=[],
            )
            brands.append(current_brand)
            current_model = None

        if current_model is None or current_model.id != row["model_id"]:
            current_model = VehicleModelOptionsOut(
                id=row["model_id"],
                name=row["model"],
                engines=[],
            )
            current_brand.models.append(current_model)

        if row["engine_id"] is not None:
            current_model.engines.append(
                VehicleEngineOptionsOut(
                    id=row["engine_id"],
                    name=row["engine"],
                )
            )

    return VehicleOptionsOut(
        brands=brands,
        engines=[],
    )
