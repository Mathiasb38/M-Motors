from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import mapped_column

from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = mapped_column(Integer, primary_key=True, index=True)
    model_id = mapped_column(Integer, ForeignKey("models.id"), nullable=False)
    engine_id = mapped_column(Integer, ForeignKey("engines.id"), nullable=True)
    price = mapped_column(Numeric(10, 2), nullable=False)
    mileage = mapped_column(Integer, nullable=True)
    offer_type = mapped_column(String(10), nullable=False)
    availability = mapped_column(DateTime(timezone=True), nullable=True)


class Brand(Base):
    __tablename__ = "brands"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(100), unique=True, nullable=False)


class VehicleModel(Base):
    __tablename__ = "models"
    __table_args__ = (
        UniqueConstraint("brand_id", "name", name="uq_models_brand_id_name"),
    )

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(100), nullable=False)
    brand_id = mapped_column(Integer, ForeignKey("brands.id"), nullable=False)


class Engine(Base):
    __tablename__ = "engines"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(50), unique=True, nullable=False)


class ModelEngine(Base):
    __tablename__ = "model_engines"
    __table_args__ = (
        UniqueConstraint("model_id", "engine_id", name="uq_model_engines_model_id_engine_id"),
    )

    model_id = mapped_column(Integer, ForeignKey("models.id"), primary_key=True)
    engine_id = mapped_column(Integer, ForeignKey("engines.id"), primary_key=True)


class RentalOption(Base):
    __tablename__ = "rental_options"

    id = mapped_column(Integer, primary_key=True, index=True)
    name = mapped_column(String(100), nullable=False)


class VehicleRentalOption(Base):
    __tablename__ = "vehicle_rental_options"

    vehicle_id = mapped_column(Integer, ForeignKey("vehicles.id"), primary_key=True)
    rental_option_id = mapped_column(Integer, ForeignKey("rental_options.id"), primary_key=True)
    is_included = mapped_column(Boolean, nullable=False, default=False)
