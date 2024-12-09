export interface IUser{
    name:string
    email:string
    password:string
    isVerified:boolean
}

export interface ILogin{
    email:string
    password:string
}