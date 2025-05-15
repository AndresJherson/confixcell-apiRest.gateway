import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }


    @ApiBody({})
    @Post('login')
    async login(
        @Body() body: any
    )
    {
        return await this.authService.login( body );
    }
    

    @ApiBearerAuth()
    @Get('verify')
    verify(
        @Req() req: Request
    ) 
    {
        return this.authService.verifyToken( req );
    }
}