import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest6Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "operation": "wtf",
          "feature": "permission"
        },
        "value": "wtf",
        "property": "operation",
        "children": [],
        "constraints": {
          "isEnum": "operation must be a valid enum value"
        }
      }
    ]
  }
}