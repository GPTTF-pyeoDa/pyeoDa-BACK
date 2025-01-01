/**
 * User 엔티티는 애플리케이션의 도메인 모델을 나타냅니다.
 * 사용자와 관련된 모든 비즈니스 로직과 속성을 포함합니다.
 */
export class User {
  constructor(
    public memID: string,
    public password: string,
    public name: string | null,
    public email: string,
  ) {}
}
