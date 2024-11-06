import { useEffect, useRef } from 'react'
import { Task } from '@/components/DashboardContent'
import { Chart, ChartConfiguration } from 'chart.js/auto'

type TrendChartProps = {
  tasks: Task[]
}

export default function TrendChart({ tasks }: TrendChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')

      if (ctx) {
        // Destroy existing chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }

        // Prepare data for the chart
        const dates = Array.from(new Set(tasks.map(task => task.dueDate))).sort()
        const data = dates.map(date => {
          return tasks.filter(task => task.dueDate === date).length
        })

        const chartConfig: ChartConfiguration = {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: 'Concurrent Tasks',
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Tasks'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              }
            }
          }
        }

        // Create new chart
        chartInstance.current = new Chart(ctx, chartConfig)
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [tasks])

  return <canvas ref={chartRef} />
}