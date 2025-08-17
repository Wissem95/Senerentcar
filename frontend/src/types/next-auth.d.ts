import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      firstName: string
      lastName: string
      phone?: string
      avatar?: string
      roles: Array<{
        id: number
        name: string
        permissions: Array<{
          id: number
          name: string
        }>
      }>
    } & DefaultSession["user"]
    accessToken: string
  }

  interface User extends DefaultUser {
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    roles: any[]
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string
    firstName: string
    lastName: string
    phone?: string
    avatar?: string
    roles: any[]
  }
}