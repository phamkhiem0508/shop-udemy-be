import JwtAuth from './jwtAuth.js';

class JwtAuthAdmin extends JwtAuth{
    constructor(){
        super(process.env.ADMIN_JWT_TOKEN);
    }
}

export default new JwtAuthAdmin();