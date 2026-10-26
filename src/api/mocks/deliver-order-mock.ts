import { http, HttpResponse } from 'msw'

import { DeliverOrderParams } from '../deliver-order'

import { demoOrders } from './orders-data'

export const deliverOrderMock = http.patch<DeliverOrderParams, never, never>(
  '/orders/:orderId/deliver',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    const order = demoOrders.find((order) => order.id === params.orderId)
    if (!order) return new HttpResponse(null, { status: 404 })
    order.status = 'delivered'
    return new HttpResponse(null, { status: 204 })
  },
)
