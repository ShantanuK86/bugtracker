'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type DashboardLayoutProps = {
  children: React.ReactNode
  username: string
}

export default function DashboardLayout({ children, username }: DashboardLayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="font-bold">{username}</span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <h1 className="text-2xl font-bold">Bug Tracker</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  )
}