import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const RoleCreatedSchema: SchemaObject = {
  example: {
    "name": "Admin 1",
    "description": "Role de testes, onde um admin pode editar e criar contas de admins",
    "permissions": [
      {
        "id": 7,
        "operation": "create",
        "feature": "adminAccount"
      },
      {
        "id": 9,
        "operation": "edit",
        "feature": "adminAccount"
      }
    ],
    "id": 1,
    "createdAt": "2020-02-05T16:13:28.477Z",
    "updatedAt": "2020-02-05T16:13:28.477Z"
  }
}
