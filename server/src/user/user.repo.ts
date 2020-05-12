import { EntityRepository, Repository } from 'typeorm'
import { User } from '@user/entities'
import { UserDto, NewUserDto } from '@user/interfaces'
import { HttpException, HttpStatus } from '@nestjs/common'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getUsers = async () => {
    return this.createQueryBuilder()
      .getMany()
  }

  createUser = async (newUserDto: NewUserDto) => {
    return this.save(newUserDto)
  }

  findUserByEmail = async (email: string) => {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()
  }

  findUserById = async (id: string) => {
    return this.findOneOrFail(id)
  }

  updateUser = async (userDto: UserDto) => {
    return this.save(userDto)
  }

  removeUser = async (id: string) => {
    await this.findOneOrFail(id)
    const query = await this.delete(id)

    if (query.affected === 0) {
      throw new HttpException('Failed to remove user', HttpStatus.NOT_FOUND)
    }

    return true
  }

  changeUserPassword = async (uuid: string, passwordHash: string) => {
    return this.createQueryBuilder()
      .where('user.id = :uuid', { uuid })
      .insert()
      .into(User)
      .values({ password: passwordHash })
      .execute()
  }
}