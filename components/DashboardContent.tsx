'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TaskList from '@/components/TaskList'
import TaskForm from '@/components/TaskForm'
import TrendChart from '@/components/TrendChart'
import { Button } from '@/components/ui/button'
import DashboardLayout from '@/components/DashboardLayout'

export type Task = {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
  dueDate: string
  timeSpent: number
}

export default function DashboardContent() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement login functionality',
      description: 'Add user authentication to the application',
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Doe',
      dueDate: '2023-12-31',
      timeSpent: 5
    }
  ])

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  return (
    <DashboardLayout username="Admin">
      <div className="space-y-4">
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                  
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">To Do</CardTitle>
                  
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(task => task.status === 'todo').length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                  
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(task => task.status === 'in-progress').length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Done</CardTitle>
                 
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tasks.filter(task => task.status === 'done').length}</div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Task Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Create New Task</CardTitle>
                  <Button
                    size="icon"
                    onClick={() => {
                      const newTask: Task = {
                        id: Date.now().toString(),
                        title: 'New Task',
                        description: 'Task description',
                        priority: 'medium',
                        status: 'todo',
                        assignee: 'Unassigned',
                        dueDate: new Date().toISOString().split('T')[0],
                        timeSpent: 0
                      }
                      setTasks([...tasks, newTask])
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="sr-only">Add new task</span>
                  </Button>
                </CardHeader>
                <CardContent>
                  <TaskForm addTask={addTask} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Task Trends</CardTitle>
                <CardDescription>Concurrent tasks worked on each day</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendChart tasks={tasks} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}