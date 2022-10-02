import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    singup(){
        return {msg: 'hello im signup!'}
    }

    signin(){
        return {msg: 'hello im signin!'}
    }
}
