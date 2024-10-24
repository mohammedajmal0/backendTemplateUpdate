import dotenv from 'dotenv'
dotenv.config()

const ENV=[
    "PORT",
    "DB_NAME",
    "DB_URL",
    "JWT_SECRET"
] as const

const loadVar=(env:readonly String[]):Record<string,string> =>{
    const variables: Record<string, string> = {}
    env.forEach(name => {
        const value = process.env[`${name}`]
    
        if (value) {
          variables[`${name}`] = value
        } else {
          console.error(`Env ${name} not found`)
        }
      })
    
      return variables
}

export const variables: Record<(typeof ENV)[number], string> = loadVar(ENV)
