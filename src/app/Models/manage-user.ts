import { User } from "./firebase/user.model";

export class ManageUser {
  constructor(
    public email: string,
    public firstName: string,
    public role: string,
    public secondName: string,
    public uid: string,
    public password: string
  ) {}
}
