import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest7Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "role": 1,
          "permissions": 1
        },
        "value": 1,
        "property": "permissions",
        "children": [],
        "constraints": {
          "isArray": "permissions must be an array"
        }
      }
    ]
  }
}
