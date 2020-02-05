import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const ReadTokenSchema: SchemaObject = {
  example: {
    "accountType": "admin",
    "email": "mateus.lopes@auim.com.br",
    "id": 1,
    "name": "Mateus Garcia",
    "role": {
      "id": 1,
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
      ]
    }
  }
}
