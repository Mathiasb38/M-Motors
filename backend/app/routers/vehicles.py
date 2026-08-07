from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.vehicle import VehicleOptionsOut, VehicleOut
from app.services.vehicles_service import get_vehicle_options, list_available_vehicles


router = APIRouter(prefix="/vehicles")


@router.get("/available", response_model=list[VehicleOut])
def get_available_vehicles(db: Session = Depends(get_db)) -> list[VehicleOut]:
    return list_available_vehicles(db)


@router.get("/options", response_model=VehicleOptionsOut)
def get_options(db: Session = Depends(get_db)) -> VehicleOptionsOut:
    return get_vehicle_options(db)
