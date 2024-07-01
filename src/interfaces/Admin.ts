export interface Admin {
    id: string;
    username: string;
    super_admin: boolean;
}

export interface FormattedAdmin {
    id: string;
    username: string;
    super_admin: boolean;
    created_at: Date;
    updated_at: Date;
}