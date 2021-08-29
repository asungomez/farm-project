from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from bson.objectid import ObjectId
from .models import GoalModel, UpdateGoalModel
from .utils.json import bson_to_json
from .utils.processing import delete_null_values

router = APIRouter()


@router.get("/", response_description="List all goals")
async def list_goals(request: Request):
    goals = []
    for doc in await request.app.mongodb["goals"].find().to_list(length=100):
        goals.append(doc)
    goals = bson_to_json(goals)
    return {"goals": goals}


@router.post("/", response_description="Add new goal")
async def create_goal(request: Request, goal: GoalModel = Body(...)):
    goal = delete_null_values(jsonable_encoder(goal))
    new_goal = await request.app.mongodb["goals"].insert_one(goal)
    created_goal = await request.app.mongodb["goals"].find_one(
        {"_id": new_goal.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=bson_to_json(created_goal))


@router.get("/{goal_id}", response_description="Get a single goal")
async def show_goal(goal_id: str, request: Request):
    if (goal := await request.app.mongodb["goals"].find_one({"_id": ObjectId(goal_id)})) is not \
            None:
        return bson_to_json(goal)

    raise HTTPException(status_code=404, detail=f"Goal {goal_id} not found")


@router.put("/{goal_id}", response_description="Update a goal")
async def update_goal(goal_id: str, request: Request, goal: UpdateGoalModel = Body(...)):
    goal = delete_null_values(goal)

    if len(goal) >= 1:
        update_result = await request.app.mongodb["goals"].update_one(
            {"_id": ObjectId(goal_id)}, {"$set": goal}
        )

        if update_result.modified_count == 1:
            if (
                updated_goal := await request.app.mongodb["goals"].find_one({
                    "_id": ObjectId(goal_id)
                })
            ) is not None:
                return bson_to_json(updated_goal)

    if (
        existing_goal := await request.app.mongodb["goals"].find_one({"_id": ObjectId(goal_id)})
    ) is not None:
        return bson_to_json(existing_goal)

    raise HTTPException(status_code=404, detail=f"Goal {goal_id} not found")


@router.delete("/{goal_id}", response_description="Delete goal")
async def delete_goal(goal_id: str, request: Request):
    delete_result = await request.app.mongodb["goals"].delete_one({"_id": ObjectId(goal_id)})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Goal {goal_id} not found")