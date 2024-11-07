'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { DarkModeToggle } from '@/components/DarkModeToggle'

type DashboardLayoutProps = {
  children: React.ReactNode
  username: string
}

export default function DashboardLayout({ children, username }: DashboardLayoutProps) {
  const router = useRouter()

  const handleLogout = () => {
    // In a real application, you would handle logout logic here
    // For now, we'll just redirect to the login page
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
        <h1 className="text-2xl font-bold hidden sm:block">Task Tracker</h1>
        <DarkModeToggle />
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  )
}