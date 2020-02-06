import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest8Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "accountType": "@dm1ns",
          "userId": 1,
          "status": "active"
        },
        "value": "@dm1ns",
        "property": "accountType",
        "children": [],
        "constraints": {
          "isEnum": "accountType must be a valid enum value"
        }
      }
    ]
  }
}
