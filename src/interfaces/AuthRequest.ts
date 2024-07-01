import { Request } from "express";
import { Admin } from "./Admin"
import { User } from "./User"

export interface AdminRequest extends Request {
    admin?: Admin;
}

export interface UserRequest extends Request {
    user?: User;
}

export interface AdminOrUserRequest extends Request {
    admin?: Admin;
    user?: User;
}
