from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.config import settings

from app.routers import router

app = FastAPI()

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=[""]
)


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(f"mongodb+srv://"
                                            f"{settings.DB_USER}:"
                                            f"{settings.DB_PASSWORD}@"
                                            f"{settings.DB_URL}/"
                                            f"{settings.DB_NAME}?retryWrites=true)")
    app.mongodb = app.mongodb_client[settings.DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(router)
