export interface User {
    id: string;
    username: string;
}

export interface FormattedUser {
    id: string;
    name: string;
    email: string;
    address: string;
    phone_number: string;
    created_at: Date;
    updated_at: Date;
}