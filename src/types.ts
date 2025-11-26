export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
}

export interface Training {
  id: number;
  date: string;
  activity: string;
  duration: number;
  customer: Customer;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  };
}
