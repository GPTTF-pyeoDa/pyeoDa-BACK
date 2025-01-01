export class LoginUserDto {
  readonly memID: string;
  readonly password: string;

  constructor(memID: string, password: string) {
    this.memID = memID;
    this.password = password;
  }
}
