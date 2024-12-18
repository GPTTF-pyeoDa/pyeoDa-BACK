/**
 * User 엔티티는 애플리케이션의 도메인 모델을 나타냅니다.
 * 사용자와 관련된 모든 비즈니스 로직과 속성을 포함합니다.
 */
export class User {
  /**
   * User 엔티티의 생성자
   * @param memID - 사용자 고유 ID
   * @param password - 사용자 비밀번호 (해시화된 상태)
   * @param name - 사용자 이름 (선택적)
   * @param email - 사용자 이메일 (고유)
   */
  constructor(
    public readonly memID: string,
    public readonly password: string,
    public readonly name: string | null,
    public readonly email: string,
  ) {}
}
