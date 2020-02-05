import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const GetLogSchema: SchemaObject = {
  example: {
    items: [
      {
        "id": 13,
        "endpoint": "/auth/admin",
        "response": 201,
        "body": "{\"username\":\"mateus.lopes@auim.com.br\",\"password\":\"***\"}",
        "params": "{}",
        "userId": 1,
        "accountType": "admin",
        "ip": "::1",
        "method": "POST",
        "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
      }
    ],
    itemCount: 1,
    totalItems: 1,
    pageCount: 1,
    next: "",
    previous: ""
  }
}
