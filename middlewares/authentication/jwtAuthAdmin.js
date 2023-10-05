import JwtAuth from './jwtAuth.js';

class JwtAuthAdmin extends JwtAuth{
    constructor(){
        super("ADMIN_JWT_TOKEN");
    }
}

export default new JwtAuthAdmin();