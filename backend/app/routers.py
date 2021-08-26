from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from .models import GoalModel
from .utils.json import bson_to_json

router = APIRouter()


@router.get("/goals", response_description="List all goals")
async def list_goals(request: Request):
    goals = []
    for doc in await request.app.mongodb["goals"].find().to_list(length=100):
        goals.append(doc)
    return bson_to_json(goals)


@router.post("/goals", response_description="Add new goal")
async def create_goal(request: Request, goal: GoalModel = Body(...)):
    goal = jsonable_encoder(goal)
    goal.pop("_id")
    new_goal = await request.app.mongodb["goals"].insert_one(goal)
    created_goal = await request.app.mongodb["goals"].find_one(
        {"_id": new_goal.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=bson_to_json(created_goal))
