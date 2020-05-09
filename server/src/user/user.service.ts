import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from '@user/entities'
import { UserRepository } from '@user/user.repo'
import { UserDto, NewUserDto, LoginDto } from '@user/interfaces'
import { generateHash, comparePassword } from '@utils/hash'
import { validateEmail } from '@utils/validate'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async validateLogin(loginDto: LoginDto): Promise<UserDto> {
    try {
      const user = await this.userRepository.findUserByEmail(loginDto.email)
      const isValid = await comparePassword(loginDto.password, user.password)

      if (!isValid) {
        throw new HttpException('Password does not match the username', HttpStatus.FORBIDDEN)
      }

      return this.map(user)
    } catch (e) {
      throw new HttpException('Password does not match the username', HttpStatus.FORBIDDEN)
    }
  }

  public async getUsers() {
    const users = await this.userRepository.getUsers()
    return users.map(this.map)
  }
  
  public async getUser(id: string) {
    const user = await this.userRepository.findUserById(id)
    return this.map(user)
  }

  public async deleteUser(id: string) {
    return this.userRepository.removeUser(id)
  }

  public async createUser(newUserDto: NewUserDto): Promise<UserDto> {
    const isValid = validateEmail(newUserDto.email)

    if (!isValid) {
      throw new HttpException('Email is not valid.', HttpStatus.BAD_REQUEST)
    }
    
    const mailTaken = this.userRepository.findUserByEmail(newUserDto.email)

    if (mailTaken) {
      throw new HttpException('Email is taken.', HttpStatus.BAD_REQUEST)
    }

    const password = await generateHash(newUserDto.password)
    const newUser = new NewUserDto({ ...newUserDto, password })

    const user = await this.userRepository.createUser(newUser)
    return this.map(user)
  }

  private map(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt
    }
  }
}