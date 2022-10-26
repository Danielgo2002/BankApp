import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { AccountDocument } from 'src/schemas/account/acount.shema';
import { AdminService } from './admin.service';
import { deleteAccount, getAccount } from './admindto';

@UseGuards(AuthGuard('adminjwt'))


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {}

    @Post('getAccount')
    getAccount(@GetUser() user: AccountDocument, @Body() getAccountDTO: getAccount){
        return this.adminService.getAccount(getAccountDTO,user)
    }

    @Post('deleteAccount')
    deleteAccount(@GetUser() user: AccountDocument, @Body() deleteAccountDTO: getAccount){
        return this.adminService.deleteAccount(deleteAccountDTO,user)
    }

}
