export type Offer = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

export type CartItem = Offer & {
  qty: number;
};

export type Cart = Record<string, CartItem>;
