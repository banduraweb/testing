import {IsIn} from "class-validator";

export class CreateRoleDto {
    @IsIn(['ADMIN', 'USER'])
    role: string;
}