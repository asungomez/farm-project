from datetime import  datetime
from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class GoalStatus(str, Enum):
    draft = 'Draft'
    published = 'Published'
    completed = 'Completed'
    canceled = 'Canceled'
    not_completed = 'Not Completed'


class GoalModel(BaseModel):
    id: Optional[str] = Field(alias="_id")
    completion_date: Optional[datetime]
    description: str = Field(...)
    due_date: datetime = Field(...)
    is_key_company_goal: bool = False
    name: str = Field(...)
    progress: Optional[float]
    start_date: Optional[datetime]
    status: GoalStatus = Field(...)

    class Config:

        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "description": "All infrastructure must be defined as code to allow easier "
                               "maintenance and scalability",
                "due_date": "2021-08-31T14:57:50+00:00",
                "name": "Define infrastructure as code",
                "status": GoalStatus.draft,
            }
        }


class UpdateGoalModel(BaseModel):
    completion_date: Optional[datetime]
    description: Optional[str]
    due_date: Optional[datetime]
    is_key_company_goal: Optional[bool]
    name: Optional[str]
    progress: Optional[float]
    start_date: Optional[datetime]
    status: Optional[GoalStatus]

    class Config:

        schema_extra = {
            "example": {
                "description": "All infrastructure must be defined as code to allow easier "
                               "maintenance and scalability",
                "due_date": "2021-08-31T14:57:50+00:00",
                "name": "Define infrastructure as code",
                "status": GoalStatus.draft,
            }
        }