const USER_TYPE = {
    collector: 'collector',
    pri_admin: 'pri_admin'
  } as const
  
  export const userTypeEnum = Object.values(USER_TYPE)
  
  export const userTypeList = Object.keys(USER_TYPE) as Array<keyof typeof USER_TYPE>
  
  export default USER_TYPE
  