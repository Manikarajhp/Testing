export interface User {
  id: string;
  username: string;
  fullName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  alternatePhone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  avatar: string;
  role: 'user' | 'admin';
  cart: any[];
  wishlist: any[];
  orderCount: number;
  createdAt: Date;
}
