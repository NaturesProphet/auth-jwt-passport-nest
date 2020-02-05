import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const ListPermissionSchema: SchemaObject = {
  example: {
    "items": [
      {
        "id": 9,
        "operation": "edit",
        "feature": "adminAccount"
      },
      {
        "id": 7,
        "operation": "create",
        "feature": "adminAccount"
      }
    ],
    "itemCount": 2,
    "totalItems": 2,
    "pageCount": 1,
    "next": "",
    "previous": ""
  }
}
