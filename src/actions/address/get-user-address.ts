'use server'

import prisma from '@/lib/prisma'

export const getUserAddres = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } })

    if (!address) return null

    const { countryId, address2, userId: user, id, ...rest } = address

    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : undefined
    }
  } catch (error) {
    console.log(error)
    return null
  }
}