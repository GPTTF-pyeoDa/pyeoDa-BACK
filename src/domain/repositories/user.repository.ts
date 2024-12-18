import { User } from '../entities/user.entity';

/**
 * UserRepository 인터페이스는 사용자 데이터에 접근하는 방법을 정의합니다.
 * 이 인터페이스를 구현하여 실제 데이터베이스 연동 로직을 제공해야 합니다.
 */
export interface UserRepository {
  /**
   * 이메일을 기반으로 사용자를 조회합니다.
   * @param email - 조회할 사용자 이메일
   * @returns 해당 이메일을 가진 User 엔티티 또는 null
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * 새로운 사용자를 생성합니다.
   * @param user - 생성할 User 엔티티
   * @returns 생성된 User 엔티티
   */
  create(user: User): Promise<User>;

  /**
   * ID를 기반으로 사용자를 조회합니다.
   * @param id - 조회할 사용자 ID
   * @returns 해당 ID를 가진 User 엔티티 또는 null
   */
  findById(id: number): Promise<User | null>;

  /**
   * 사용자의 정보를 업데이트합니다.
   * @param user - 업데이트할 User 엔티티
   * @returns 업데이트된 User 엔티티
   */
  update(user: User): Promise<User>;

  /**
   * 사용자를 삭제합니다.
   * @param id - 삭제할 사용자 ID
   * @returns 삭제 여부 (true/false)
   */
  delete(id: number): Promise<boolean>;
}
