import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const AdminAuthSuccessSchema: SchemaObject = {
  example: {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0ZXVzIEdhcmNpYSIsImVtYWlsIjoibWF0ZXVzLmxvcGVzQGF1aW0uY29tLmJyIiwiaWQiOjEsImFjY291bnRUeXBlIjoiYWRtaW4iLCJyb2xlIjp7ImlkIjoxLCJuYW1lIjoiQWRtaW4gMSIsImRlc2NyaXB0aW9uIjoiUm9sZSBkZSB0ZXN0ZXMsIG9uZGUgdW0gYWRtaW4gcG9kZSBlZGl0YXIgZSBjcmlhciBjb250YXMgZGUgYWRtaW5zIiwicGVybWlzc2lvbnMiOlt7ImlkIjo3LCJvcGVyYXRpb24iOiJjcmVhdGUiLCJmZWF0dXJlIjoiYWRtaW5BY2NvdW50In0seyJpZCI6OSwib3BlcmF0aW9uIjoiZWRpdCIsImZlYXR1cmUiOiJhZG1pbkFjY291bnQifV19LCJpYXQiOjE1ODA5MTMwNzksImV4cCI6MTU4MDkzMTA3OX0.QPJr8BMbdBo-CDDcCmrfsLlF7z8klzSGvrrwyxkrL8o",
    "user": {
      "name": "Mateus Garcia",
      "email": "mateus.lopes@auim.com.br",
      "id": 1,
      "accountType": "admin",
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
}
