import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest2Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "operation": "forceAnError",
          "feature": "adminAccount"
        },
        "value": "forceAnError",
        "property": "operation",
        "children": [],
        "constraints": {
          "isEnum": "operation must be a valid enum value"
        }
      }
    ]
  }
}
