import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    updatedAt?: Date;
    isActive?: boolean;
    deleted?: boolean;
    phone?: string;
}
