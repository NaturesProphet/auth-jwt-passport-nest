import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

export const DuplicatedSchema: SchemaObject = {
  example: {
    statusCode: 409,
    error: "Unprocessable Entity",
    message: "A entidade que você tentou cadastrar contém um ou mais campos únicos que já existem atualmente no banco de dados."
  }
}
