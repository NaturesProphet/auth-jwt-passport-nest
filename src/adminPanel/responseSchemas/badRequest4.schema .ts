import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest4Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "operation": "nao existe"
        },
        "value": "nao existe",
        "property": "operation",
        "children": [],
        "constraints": {
          "isEnum": "operation must be a valid enum value"
        }
      }
    ]
  }
}
