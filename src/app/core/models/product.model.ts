export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: Rating;
  image: string;
  stock: number;
}

export interface Rating {
  rate: number;
  count: number;
}