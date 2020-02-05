import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PermissionCreatedSchema: SchemaObject = {
  example: {
    "operation": "create",
    "feature": "adminAccount",
    "id": 7,
    "createdAt": "2020-02-05T15:36:12.857Z",
    "updatedAt": "2020-02-05T15:36:12.857Z"
  }
}
