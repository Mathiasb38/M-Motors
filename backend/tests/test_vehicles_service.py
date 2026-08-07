from datetime import datetime, timedelta, timezone
from decimal import Decimal

import pytest
from sqlalchemy.orm import Session

from app.models import Brand, Engine, ModelEngine, Vehicle, VehicleModel
from app.schemas.vehicle import AvailableVehicleFilters
from app.services.vehicles_service import get_vehicle_options, list_available_vehicles


@pytest.fixture
def vehicles_data(db_session: Session) -> dict[str, Engine]:
    renault = Brand(name="Renault")
    volkswagen = Brand(name="Volkswagen")
    db_session.add_all([renault, volkswagen])
    db_session.flush()

    clio = VehicleModel(name="Clio", brand_id=renault.id)
    golf = VehicleModel(name="Golf", brand_id=volkswagen.id)
    db_session.add_all([clio, golf])
    db_session.flush()

    tce = Engine(name="1.0 TCe 90")
    dci = Engine(name="1.5 dCi 100")
    tsi = Engine(name="1.5 TSI 150")
    db_session.add_all([tce, dci, tsi])
    db_session.flush()

    db_session.add_all([
        ModelEngine(model_id=clio.id, engine_id=tce.id),
        ModelEngine(model_id=clio.id, engine_id=dci.id),
        ModelEngine(model_id=golf.id, engine_id=tsi.id),
    ])

    now = datetime.now(timezone.utc)
    db_session.add_all([
        Vehicle(
            model_id=clio.id,
            engine_id=dci.id,
            price=Decimal("14900.00"),
            mileage=65000,
            offer_type="sale",
            availability=now - timedelta(days=1),
        ),
        Vehicle(
            model_id=golf.id,
            engine_id=tsi.id,
            price=Decimal("399.00"),
            mileage=24000,
            offer_type="rent",
            availability=now + timedelta(days=10),
        ),
        Vehicle(
            model_id=clio.id,
            engine_id=tce.id,
            price=Decimal("12900.00"),
            mileage=None,
            offer_type="sale",
            availability=None,
        ),
    ])
    db_session.commit()

    return {
        "dci": dci,
    }


def test_filters_by_engine(
    db_session: Session,
    vehicles_data: dict[str, Engine],
) -> None:
    diesel = vehicles_data["dci"]

    vehicles = list_available_vehicles(
        db_session,
        AvailableVehicleFilters(engine_id=diesel.id),
    )

    assert len(vehicles) == 1
    assert vehicles[0].model == "Clio"
    assert vehicles[0].engine == "1.5 dCi 100"


def test_excludes_unavailable(
    db_session: Session,
    vehicles_data: dict[str, Engine],
) -> None:
    vehicles = list_available_vehicles(
        db_session,
        AvailableVehicleFilters(),
    )

    assert [vehicle.model for vehicle in vehicles] == ["Clio", "Golf"]


def test_returns_engines_by_model(
    db_session: Session,
    vehicles_data: dict[str, Engine],
) -> None:
    options = get_vehicle_options(db_session)

    renault = next(brand for brand in options.brands if brand.name == "Renault")
    clio = next(model for model in renault.models if model.name == "Clio")

    assert [engine.name for engine in clio.engines] == ["1.0 TCe 90", "1.5 dCi 100"]
