interface Car {
    manufacture: string;
    model: string;
    type: string;
}

interface FormattedUser {
    name: string;
    email: string;
    address: string;
    phone_number: string;
}

export interface FormattedOrder {
    id: string;
    manufacture: string,
    model: string,
    type: string,    
    duration: number;
    total_price: number;
    status: string;
    rent_start: Date;
    rent_end: Date;
    created_at: Date;
}

export interface FormattedOrderDetail {
    id: string;
    duration: number;
    rent_start: Date;
    rent_end: Date;
    total_price: number;
    status: string;
    car: Car;
    user: FormattedUser;
    created_at: Date;
    updated_at: Date;
}