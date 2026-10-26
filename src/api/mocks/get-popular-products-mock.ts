import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Portuguesa', amount: 5 },
    { product: 'Mozzarella', amount: 3 },
    { product: 'Nine', amount: 2 },
    { product: 'Furia', amount: 7 },
    { product: 'Napoletana', amount: 4 },
    { product: 'Frango Catupiry', amount: 6 },
    { product: 'Da Casa', amount: 8 },
  ])
})
