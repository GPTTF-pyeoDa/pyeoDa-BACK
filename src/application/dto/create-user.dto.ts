export class CreateUserDto {
  readonly memID: string;
  readonly password: string;
  readonly name?: string;
  readonly email: string;

  constructor(memID: string, password: string, email: string, name?: string) {
    this.memID = memID;
    this.password = password;
    this.email = email;
    this.name = name;
  }
}
