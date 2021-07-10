import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (user && !user.admin) {
      this.usersRepository.turnAdmin(user);
      return user;
    }
    if (user && user.admin) {
      return user;
    }

    throw new Error("Usuer not find");
  }
}

export { TurnUserAdminUseCase };
