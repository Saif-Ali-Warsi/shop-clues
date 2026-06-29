import { User } from "./user.model";

export interface LoginResponse extends User {
    accessToken: string;
    refreshToken: string;
}