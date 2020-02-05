import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest5Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "id": "asd"
        },
        "value": "asd",
        "property": "id",
        "children": [],
        "constraints": {
          "isNumberString": "id must be a number string"
        }
      }
    ]
  }
}