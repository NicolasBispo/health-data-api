import { AppDataSource } from "@/config/database";
import { User } from "./user_entity";
import { CreateUserDto, UpdateUserDto } from "./dtos";

export class UserService {
  private readonly userRepository = AppDataSource.getRepository(User);

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
    });
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  async listAllUsers(args: { perPage: number; skip: number }): Promise<User[]> {
    const users = await this.userRepository.find({
      take: args.perPage,
      skip: args.skip,
    });
    return users;
  }

  async findOneUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(
      {
        id,
      },
      {
        ...updateUserDto,
      }
    );
    return await this.userRepository.findOneBy({ id });
  }

  async destroyUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    await this.userRepository.delete({ id });
    return user;
  }

  async count() {
    const count = await this.userRepository.count();
    return count;
  }
}
