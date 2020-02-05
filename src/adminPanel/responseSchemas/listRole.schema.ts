import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const ListRoleSchema: SchemaObject = {
  example: {
    "items": [
      {
        "id": 1,
        "name": "Admin 1",
        "description": "Role de testes, onde um admin pode editar e criar contas de admins"
      }
    ],
    "itemCount": 1,
    "totalItems": 1,
    "pageCount": 1,
    "next": "",
    "previous": ""
  }
}