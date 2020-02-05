import { Role } from "../../users/permissions/models/role.model";

export class AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  accountType: string;
  role?: Role
}
