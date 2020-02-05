import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PermissionAddedSchema: SchemaObject = {
  example: {
    "operation": "create",
    "feature": "permission",
    "id": 14,
    "createdAt": "2020-02-05T21:43:12.775Z",
    "updatedAt": "2020-02-05T21:43:12.775Z"
  }
}
