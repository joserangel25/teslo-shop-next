import type { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StateCart {
  cart: CartProduct[]

  getTotalProducts: () => number
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  }
  addProductToCart: (product: CartProduct) => void
  updateQuantityProductInCart: (product: CartProduct, quantity: number) => void
  removeProductOfCart: (product: CartProduct) => void
  clearStore: () => void
}

export const useCartStore = create<StateCart>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalProducts: () => {
        const { cart } = get();
        return cart.reduce((sum, product) => sum + product.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart, getTotalProducts } = get();
        const subTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const tax = subTotal * 0.19
        const total = subTotal + tax
        const itemsInCart = getTotalProducts()

        return {
          subTotal,
          tax,
          total,
          itemsInCart
        }
      },
      addProductToCart: (product) => {
        const { cart } = get()

        //Revisar si existe en el carrito con la talla seleccionada
        const productExistInCart = cart.some(item => item.id === product.id && item.size === product.size)
        if (!productExistInCart) {
          set({ cart: [...cart, product] })
          // localStorage.setItem('cart', JSON.stringify([...cart, product]))

          return
        }

        //Aqui se que el producto existe por talla, toca incrementar
        const updatedProductsCart = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return product
          }
          return item
        })

        set({ cart: updatedProductsCart })
        // localStorage.setItem('cart', JSON.stringify(updatedProductsCart))
      },
      updateQuantityProductInCart: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const newProductsInCart = cart.map(item => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity
            }
          }
          return item
        })
        set({ cart: newProductsInCart })
      },
      removeProductOfCart: (product: CartProduct) => {
        const { cart } = get()
        const newCart = cart.filter(item => (item.id !== product.id || item.size !== product.size))
        set({ cart: newCart })
      },
      clearStore: () => {
        set({ cart: [] })
      }
    }),
    {
      name: 'shopping-cart',
    }
  )
)
