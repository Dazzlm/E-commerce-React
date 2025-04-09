
import { useShoesStore } from "../shoesStore";

export const createCartList = (set) => ({
    cartList: JSON.parse(localStorage.getItem('cartList')) || [],
    quantity: 1,

    AddQuantity: (quantity) => {
        set(() => ({
            quantity: quantity
        }));
    },

    addCart: (id, quantity) => {
        set((state) => {
        const existingItem = state.cartList.find(item => item.id === id);
        
        if (existingItem) {
           return;
        } 
            const updatedCartList = [...state.cartList, { id, quantity }];
            set(() => ({
            quantity: 1
            }));
            localStorage.setItem("cartList", JSON.stringify(updatedCartList));
            
            return { cartList: updatedCartList };
    });
        
    },
     updateCartIncreace: (id) => {
    set((state) => {
      const updatedCart = state.cartList.map((item) => {
        if (item.id !== id) return item;

        const stock = state.shoes.find((shoe) => shoe.id === id)?.stock;

        if (item.quantity >= stock) return item;
        return { ...item, quantity: item.quantity + 1 };
      });
      set(() => ({
            quantity: 1
            }));

      localStorage.setItem('cartList', JSON.stringify(updatedCart));

      return { cartList: updatedCart };
    });
    },
    
    updateCartDecreace: (id) => {
        set((state) => {
        const updatedCart = state.cartList
            .map((item) => {
            if (item.id !== id) return item;

            if (item.quantity <= 1) return null;
            return { ...item, quantity: item.quantity - 1 };
            })
            .filter((item) => item !== null);
            set(() => ({
            quantity: 1
            }));
        
        localStorage.setItem('cartList', JSON.stringify(updatedCart));

        return { cartList: updatedCart };
        });
    },

    removeCart: (id) => {
    set((state) => {
      const updatedCart = state.cartList.filter((item) => item.id !== id);

     
      localStorage.setItem('cartList', JSON.stringify(updatedCart));

      return { cartList: updatedCart };
    });
    },


    countItems: () => {
        const cartList = useShoesStore.getState().cartList;
        return cartList.reduce((total, item) => total + item.quantity, 0);
    },

    clearCart: () => {
        set({ cartList: [] });
        set(() => ({
            quantity: 1
        }));
        localStorage.removeItem("cartList");
    }
});
 