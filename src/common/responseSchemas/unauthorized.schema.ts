import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const UnauthorizedSchema: SchemaObject = {
  example: {
    statusCode: 401,
    error: "Uma mensagem de erro chavosa aparecerá aqui :)"
  }
}
