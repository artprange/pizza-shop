import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

import { demoOrders } from './orders-data'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse | null
>('/orders/:orderId', ({ params }) => {
  const order = demoOrders.find((order) => order.id === params.orderId)
  if (!order) return HttpResponse.json(null, { status: 404 })
  return HttpResponse.json(order)
})
