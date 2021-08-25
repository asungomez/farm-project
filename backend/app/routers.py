from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter()


@router.get("/goals", response_description="List all goals")
async def list_tasks():
    goals = [{
        "name": "Holi"
    }]
    return goals
