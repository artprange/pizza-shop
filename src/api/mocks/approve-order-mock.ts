import { http, HttpResponse } from 'msw'

import { ApproveOrderParams } from '../approve-order'

import { demoOrders } from './orders-data'

export const approveOrderMock = http.patch<ApproveOrderParams, never, never>(
  '/orders/:orderId/approve',
  async ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    const order = demoOrders.find((order) => order.id === params.orderId)
    if (!order) return new HttpResponse(null, { status: 404 })
    order.status = 'processing'
    return new HttpResponse(null, { status: 204 })
  },
)
