def process_id(element):
    element["id"] = element["_id"]
    element.pop("_id")
    return element


def delete_null_values(element):
    dict_element = element.dict() if not isinstance(element, dict) else element
    return {k: v for k, v in dict_element.items() if v is not None}
