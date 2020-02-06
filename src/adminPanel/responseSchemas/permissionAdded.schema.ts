import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PermissionAddedSchema: SchemaObject = {
  example: {
    "id": 1,
    "name": "Admin Master",
    "description": "Todos os poderes",
    "permissions": [
      {
        "id": 1,
        "operation": "edit",
        "feature": "adminAccount"
      },
      {
        "id": 2,
        "operation": "create",
        "feature": "adminAccount"
      },
      {
        "id": 3,
        "operation": "delete",
        "feature": "adminAccount"
      },
      {
        "id": 4,
        "operation": "list",
        "feature": "adminAccount"
      }
    ]
  }
}
