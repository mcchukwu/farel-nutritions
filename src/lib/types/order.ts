export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  state: string;
  lga: string;
  streetAddress: string;
  landmark: string;
  deliveryNotes: string;
}

export interface ProductOrder {
  quantity: number;
}

export interface Order {
  customer: Customer;
  address: Address;
  product: ProductOrder;
}

