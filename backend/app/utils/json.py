from bson.objectid import ObjectId
from datetime import datetime
import json
from .processing import process_id

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime):
            return datetime.timestamp(o)
        return json.JSONEncoder.default(self, o)


# Here I'm assuming that json_data can only be a dict or a list
def bson_to_json(data):
    json_data = json.loads(JSONEncoder().encode(data))
    if isinstance(json_data, list):
        return [process_id(element) for element in json_data]
    return process_id(json_data)



