from bson import json_util
import json


def bson_to_json(data):
    json_data = json.loads(json_util.dumps(data))

    if isinstance(json_data, list):
        return [process_id(element) for element in json_data]
    return process_id(json_data)


def process_id(element):
    element["id"] = element["_id"]["$oid"]
    element.pop("_id")
    return element
