from sqlalchemy import DateTime, ForeignKey, Numeric, String
from sqlalchemy.orm import mapped_column

from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = mapped_column(primary_key=True, index=True)
    model_id = mapped_column(ForeignKey("models.id"), nullable=False)
    price = mapped_column(Numeric(10, 2), nullable=False)
    offer_type = mapped_column(String(10), nullable=False)
    availability = mapped_column(DateTime(timezone=True), nullable=True)


class Brand(Base):
    __tablename__ = "brands"

    id = mapped_column(primary_key=True, index=True)
    name = mapped_column(String(100), unique=True, nullable=False)


class VehicleModel(Base):
    __tablename__ = "models"

    id = mapped_column(primary_key=True, index=True)
    name = mapped_column(String(100), nullable=False)
    brand_id = mapped_column(ForeignKey("brands.id"), nullable=False)
