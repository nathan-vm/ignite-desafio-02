import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    if (!email || !name) {
      throw new Error("Missing informations");
    }

    const userAllreadyExist = this.usersRepository.findByEmail(email);
    if (userAllreadyExist) {
      throw new Error("user allready exist");
    }
    const user = this.usersRepository.create({ email, name });
    return user;
  }
}

export { CreateUserUseCase };
