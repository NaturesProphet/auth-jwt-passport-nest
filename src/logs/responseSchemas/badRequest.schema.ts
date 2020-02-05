import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export const LogBadRequestSchema: SchemaObject = {
  example: {
    "statusCode": 400,
    "error": "Bad Request",
    "message": [
      {
        "target": {
          "afterDate": "data errada"
        },
        "value": "data errada",
        "property": "afterDate",
        "children": [],
        "constraints": {
          "isDateString": "afterDate must be a ISOString"
        }
      }
    ]
  }
}
