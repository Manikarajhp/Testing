import { Product } from './product.model';

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'Credit Card' | 'UPI' | 'Cash on Delivery';
}

export interface Order {
  id: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: Date;
}
