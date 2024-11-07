import { Metadata } from 'next'
import DashboardContent from '@/components/DashboardContent'

export const metadata: Metadata = {
  title: 'Dashboard | Task Tracker',
  description: 'Manage your tasks and bugs efficiently',
}

export default function DashboardPage() {
  return (
    <main className="container mx-auto p-4">
      <DashboardContent />
    </main>
  )
}