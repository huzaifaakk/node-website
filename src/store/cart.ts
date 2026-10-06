import { create } from 'zustand';
import { Database } from '@/types/database.types';

type Product = Database['public']['Tables']['products']['Row'];
export type ProductVariant = Database['public']['Tables']['product_variants']['Row'];

export interface CartItem {
  cartItemId: string;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant?: ProductVariant | null) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product, variant = null) => {
    set((state) => {
      const cartItemId = variant ? `${product.id}-${variant.id}` : product.id;
      const existingItem = state.items.find((item) => item.cartItemId === cartItemId);
      
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        };
      }
      return { 
        items: [...state.items, { cartItemId, product, variant, quantity: 1 }],
        isOpen: true,
      };
    });
  },
  
  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.cartItemId !== cartItemId),
    }));
  },
  
  updateQuantity: (cartItemId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    });
  },
  
  toggleCart: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
  
  clearCart: () => {
    set({ items: [], isOpen: false });
  },

  getTotal: () => {
    return get().items.reduce((total, item) => {
      const itemPrice = item.product.base_price + (item.variant?.price_delta || 0);
      return total + (itemPrice * item.quantity);
    }, 0);
  }
}));
