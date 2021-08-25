from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
# from motor.motor_asyncio import AsyncIOMotorClient

from app.routers import router

app = FastAPI()

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=[""]
)

# @app.on_event("startup")
# async def startup_db_client():
#     app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
#     app.mongodb = app.mongodb_client[settings.DB_NAME]
#
#
# @app.on_event("shutdown")
# async def shutdown_db_client():
#     app.mongodb_client.close()


app.include_router(router)
