import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const UpdatedPasswordSchema: SchemaObject = {
  example: {
    "id": 1,
    "name": "Mateus Garcia",
    "playerId": "UNKNOWN PLAYER ID",
    "birthDay": "1987-03-30",
    "email": "mateus.lopes@auim.com.br",
    "cpf": "03446269037",
    "phone": "+5527988079601",
    "passwordHash": "$2a$10$YwCT4t1iXWnXOODtlETzjuguY6TXqnarwyQLcaxmb6VboyBMzfdve",
    "status": "active",
    "profilePicturePath": null,
    "emailVerificationCode": null,
    "updatedAt": "2020-02-06T21:11:40.195Z"
  }
}
