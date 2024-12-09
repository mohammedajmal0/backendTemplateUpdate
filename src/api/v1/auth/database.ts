import { IUser } from "../../../../DB/interfaces/user"
import User from "../../../../DB/models/user"

class MainAuthDatabase{
    static async isUserExists(email:string){
        const result=await User.findOne({where:{email:email}})
        
        if(result) return true
        return false
    }

    static async createUser(data:IUser){
        const {name,email,password}=data
        const newUser=new User({
            name:name,
            email:email,
            password:password,
            isVerified:false
        })

        const result = await newUser.save();

        return result;
    }

    static async getUser(email:string){
        const result = await User.findOne({where:{email:email}})
        return result
    }

    static async verifyEmail(email:string){
        const result=await User.update({isVerified:true},{where:{email:email}})
        return result
    }

    static async updatePassword(email:string,password:string){
        const result=await User.update({password:password},{where:{email:email}})
        return result
    }
}

export default MainAuthDatabase