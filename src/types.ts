
export interface Customer {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    id: number;
    links: { rel: string; href: string }[];
}

export interface Training {
    id: number;
    date: string;
    activity: string;
    duration: number;
}