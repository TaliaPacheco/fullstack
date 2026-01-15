const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const { createUserRepositories } = require("../../../repositories");

const createUserService = async (user) => {

    const crypt_password = bcrypt.hashSync(user.user_password, salt);

    const {
        user_created
    } = await createUserRepositories({
        user:{
            ...user,
            user_password: crypt_password
        }
    });

    const has_user_created = Array.isArray(user_created) && user_created.length > 0;

    if(has_user_created === false){
        return {
            user_created_id: []
        }
    }

    return {
       id: user_created[0],
        full_name: user.full_name,
        user_email: user.user_email,
        user_password: crypt_password
    };
}

module.exports = {
    createUserService
}