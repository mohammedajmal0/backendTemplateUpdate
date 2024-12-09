import dotenv from 'dotenv'
dotenv.config()

const ENV=[
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET",
    "PORT",
    "WORKSPACE_PASSWORD",
    "WORKSPACE_EMAIL",
    "BASE_URL"
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
