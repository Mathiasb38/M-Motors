from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.vehicle import (
    AvailableVehicleFilters,
    VehicleOptionsOut,
    VehicleOut,
    VehicleRentalOptionOut,
)
from app.services.vehicles_service import (
    get_vehicle_options,
    list_available_vehicles,
    list_vehicle_rental_options,
)


router = APIRouter(prefix="/vehicles")


@router.get("/available", response_model=list[VehicleOut])
def get_available_vehicles(
    filters: AvailableVehicleFilters = Depends(),
    db: Session = Depends(get_db),
) -> list[VehicleOut]:
    return list_available_vehicles(
        db=db,
        filters=filters,
    )


@router.get("/options", response_model=VehicleOptionsOut)
def get_options(db: Session = Depends(get_db)) -> VehicleOptionsOut:
    return get_vehicle_options(db)


@router.get("/{vehicle_id}/rental-options", response_model=list[VehicleRentalOptionOut])
def get_rental_options(
    vehicle_id: int,
    db: Session = Depends(get_db),
) -> list[VehicleRentalOptionOut]:
    return list_vehicle_rental_options(db, vehicle_id)
