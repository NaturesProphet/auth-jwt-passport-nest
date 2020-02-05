import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const ForbiddenSchema: SchemaObject = {
  example: {
    statusCode: 403,
    error: "Uma mensagem indicando que o recurso acessado não está disponível para seu tipo de usuário"
  }
}
