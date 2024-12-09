import { DataTypes, Model, Optional } from "sequelize";
import { IUser } from "../interfaces/user";
import { sequelize } from "../../config/dbConn";

interface UserAttributes extends IUser{
    userId:string
    isVerified:boolean
}

interface UserCreationAttributes  extends Optional<UserAttributes, "userId">{}

class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    public name!:string;
    public userId!: string;
    public email!: string;
    public password! : string
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public isVerified!: boolean;
}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        unique:true
    },
    password:{
        type:DataTypes.STRING
    },
    userId:{
        type:DataTypes.UUID,
        unique:true
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
        
    }
},{sequelize,tableName:"users"})

export default User