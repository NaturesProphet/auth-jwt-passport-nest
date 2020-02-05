import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const AdminCreatedSchema: SchemaObject = {
  example: {
    "name": "Mateus Garcia",
    "cpf": "03446269037",
    "birthDay": "1987-03-30T12:00:00.000Z",
    "email": "mateus.lopes@auim.com.br",
    "phone": "+5527988079601",
    "passwordHash": "$2a$10$rTwHyMjhZg.cAKmLOJsXeOEWhkjJbBWiQj/1724KN6m5i/CZryLwK",
    "status": "pendent",
    "role": {
      "id": 1,
      "name": "Admin 1",
      "description": "Role de testes, onde um admin pode editar e criar contas de admins"
    },
    "profilePicturePath": null,
    "emailVerificationCode": null,
    "id": 1,
    "createdAt": "2020-02-05T16:24:41.117Z",
    "updatedAt": "2020-02-05T16:24:41.117Z",
    "playerId": "UNKNOWN PLAYER ID"
  }
}
