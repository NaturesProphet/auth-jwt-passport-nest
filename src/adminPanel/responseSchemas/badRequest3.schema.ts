import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest3Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "name": 0,
          "permissions": [
            1,
            2
          ]
        },
        "value": 0,
        "property": "name",
        "children": [],
        "constraints": {
          "isString": "name must be a string"
        }
      }
    ]
  }
}
