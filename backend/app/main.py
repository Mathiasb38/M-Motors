from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import check_database_connection, close_database_connection
from app.routers.vehicles import router as vehicles_router
from app.routers.client_accounts import router as client_accounts_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    check_database_connection()
    yield
    close_database_connection()


app = FastAPI(
    title="M-motors API",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://m-motors-frontend-hxk4.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}

app.include_router(vehicles_router)
app.include_router(client_accounts_router)
