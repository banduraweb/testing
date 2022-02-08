import {Injectable} from "@nestjs/common";
import {CreateRoleDto} from "./dtos/create-role.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {RolesEntity} from "./roles.entity";
import {Repository} from "typeorm";

@Injectable()
export class RolesService{
    constructor(@InjectRepository(RolesEntity) private readonly roleRepository: Repository<RolesEntity>) {
    }
    async create(createRoleDto: CreateRoleDto):Promise<RolesEntity>{
        return await this.roleRepository.save(createRoleDto)
    }
    async findByName(name: string):Promise<RolesEntity>{
        return await this.roleRepository.findOne({where: {role: name}})
    }
}