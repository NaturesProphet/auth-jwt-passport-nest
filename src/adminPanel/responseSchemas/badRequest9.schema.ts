import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest9Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "password": "654321",
          "newPassword": 123456
        },
        "value": 123456,
        "property": "newPassword",
        "children": [],
        "constraints": {
          "isString": "newPassword must be a string"
        }
      }
    ]
  }
}
