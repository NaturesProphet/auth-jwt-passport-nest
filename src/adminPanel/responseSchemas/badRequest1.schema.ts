import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const PanelBadRequest1Schema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "name": 0,
          "birthDay": "1987-03-30T12:00:00.000Z",
          "email": "mateus.lopes@auim.com.br",
          "password": "123456",
          "cpf": "03446269037",
          "phone": "+5527988079601",
          "file": {},
          "roleId": "1"
        },
        "value": 0,
        "property": "name",
        "children": [],
        "constraints": {
          "isString": "name must be a string"
        }
      }
    ]
  }
}
