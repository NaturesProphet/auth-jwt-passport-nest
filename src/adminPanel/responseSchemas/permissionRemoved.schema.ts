import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PermissionsRemovedSchema: SchemaObject = {
  example: {
    "id": 1,
    "name": "Admin Master",
    "description": "Todos os poderes",
    "permissions": [
      {
        "id": 8,
        "operation": "list",
        "feature": "role"
      },
      {
        "id": 7,
        "operation": "delete",
        "feature": "role"
      },
      {
        "id": 6,
        "operation": "edit",
        "feature": "role"
      },
      {
        "id": 5,
        "operation": "create",
        "feature": "role"
      },
      null,
      null,
      null,
      null,
    ]
  }
}
