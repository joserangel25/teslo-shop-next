import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    country: string;
    city: string;
    phone: string;
  }

  setAddress: (adress: State['address']) => void
  getAddress: () => State['address']
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: '',
        lastName: '',
        address: '',
        address2: '',
        postalCode: '',
        country: '',
        city: '',
        phone: '',
      },
      setAddress: (address) => {
        set({ address })
      },
      getAddress: () => {
        const { address } = get()
        return address
      }
    }),
    {
      name: 'address-store'
    }
  )
)