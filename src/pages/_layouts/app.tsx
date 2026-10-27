import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { env } from '../../env'

import { Header } from '../../components/header'
import { api } from '../../lib/axios'

export function AppLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />
      {env.MODE === 'demo' && (
        <div className="border-b bg-muted px-4 py-2 text-center text-sm text-muted-foreground">
          Demonstração — dados fictícios. As alterações são restauradas ao recarregar a página.
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
