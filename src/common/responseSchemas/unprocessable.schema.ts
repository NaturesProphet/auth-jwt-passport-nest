import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const UnprocessableSchema: SchemaObject = {
  example: {
    statusCode: 422,
    error: "Unprocessable Entity",
    message: "Uma mensagem de erro chavosa aparecerá aqui"
  }
}
