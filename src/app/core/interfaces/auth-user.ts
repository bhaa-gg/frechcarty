export interface RegisterUser_Body {
    email: string,
    password: string
    rePassword: string
    name: string
}
export interface LoginUser_Body {
    email: string,
    password: string
}

export interface User {
    id: string,
    name: string
    role: string
    email?: string
    exp?: number
    iat?: number
}

export interface AuthUser {
    token: string,
    user: User
}
