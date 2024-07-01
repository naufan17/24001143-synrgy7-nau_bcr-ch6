export interface FormattedCar {
    id: string;
    plate: string;
    manufacture: string;
    model: string;
    image: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: number;
    rent_price: number;
    available: boolean;
    option: string[];
    spec: string[];
}

export interface FormattedCarDetail extends FormattedCar {
    create: {
        created_by: string | null;
        created_at: Date;
    };
    update: {
        updated_by: string | null;
        updated_at: Date;
    };
    delete: {
        deleted_by: string | null;
        deleted_at: Date;
    };
}