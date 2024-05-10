import { getCountries, getUserAddres } from '@/actions';
import { auth } from '@/auth.config';
import { AddressForm, Title } from '@/components';
import type { Country } from '@/interfaces';

export default async function Address() {
  const countries: Country[] = await getCountries()
  const session = await auth()

  const address = await getUserAddres(session!.user.id)

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-10 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm
          address={address}
          countries={countries}
        />
      </div>
    </div>
  );
}