'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { Task } from '@/components/DashboardContent'
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type TrendChartProps = {
  tasks: Task[]
}

export default function TrendChart({ tasks }: TrendChartProps) {
  const { theme } = useTheme()

  const data = tasks.reduce((acc, task) => {
    const date = task.dueDate
    if (!acc[date]) {
      acc[date] = { date, count: 0 }
    }
    acc[date].count++
    return acc
  }, {} as Record<string, { date: string; count: number }>)

  const chartData = Object.values(data).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getColor = (theme: string | undefined) => {
    return theme === 'dark' ? 'hsl(var(--primary))' : 'hsl(var(--primary))'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Trends</CardTitle>
        <CardDescription>Number of tasks due per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? 'hsl(var(--border))' : 'hsl(var(--border))'} />
              <XAxis 
                dataKey="date" 
                stroke={theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'}
              />
              <YAxis 
                stroke={theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))'}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(var(--background))' : 'hsl(var(--background))',
                  borderColor: theme === 'dark' ? 'hsl(var(--border))' : 'hsl(var(--border))',
                  color: theme === 'dark' ? 'hsl(var(--foreground))' : 'hsl(var(--foreground))',
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={getColor(theme)} 
                strokeWidth={2}
                dot={{ fill: getColor(theme) }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}