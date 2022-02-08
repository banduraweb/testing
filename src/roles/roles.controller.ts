import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dtos/create-role.dto";
import {AdminGuard} from "../guards/admin.guard";

@Controller('/role')
export class RolesController{
    constructor(private readonly rolesService: RolesService) {
    }
    @Post()
    @UseGuards(AdminGuard)
    async create(@Body() createRoleDto: CreateRoleDto){
        return this.rolesService.create(createRoleDto)
    }
}