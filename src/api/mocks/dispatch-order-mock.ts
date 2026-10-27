import { http, HttpResponse } from 'msw'

import { DispatchOrderParams } from '../dispatch-order'

import { demoOrders } from './orders-data'

export const dispatchOrderMock = http.patch<DispatchOrderParams, never, never>(
  '/orders/:orderId/dispatch',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    const order = demoOrders.find((order) => order.id === params.orderId)
    if (!order) return new HttpResponse(null, { status: 404 })
    order.status = 'delivering'
    return new HttpResponse(null, { status: 204 })
  },
)
