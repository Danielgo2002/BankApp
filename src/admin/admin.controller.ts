import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AdminService } from './admin.service';
import { getAccount } from './admindto';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @UseGuards(AuthGuard('adminjwt'))
    @Get('getAccount')
    getAccount(@GetUser() user: AccountDocument, @Body() getAccountDTO: getAccount){
        return this.adminService.getAccount(getAccountDTO,user)
    }

    @UseGuards(AuthGuard('adminjwt'))
    @Post('deleteAccount')
    deleteAccount(){
        return this.adminService.deleteAccount()
    }

}
