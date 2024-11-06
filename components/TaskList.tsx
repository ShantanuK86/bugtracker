import { useState, useMemo } from 'react'
import { Task } from '@/components/DashboardContent'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type TaskListProps = {
  tasks: Task[]
  updateTask: (task: Task) => void
  deleteTask: (taskId: string) => void
}

export default function TaskList({ tasks, updateTask, deleteTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [filterCriteria, setFilterCriteria] = useState<Task['status'] | 'all'>('all')
  const [sortCriteria, setSortCriteria] = useState<keyof Task>('dueDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleEdit = (task: Task) => {
    setEditingTask({ ...task })
  }

  const handleUpdate = () => {
    if (editingTask) {
      updateTask(editingTask)
      setEditingTask(null)
    }
  }

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
  }

  // Priority order map for custom sorting
  const priorityOrder = {
    high: 3,
    medium: 2,
    low: 1
  }

  const filteredAndSortedTasks = useMemo(() => {
    let result = tasks
    if (filterCriteria !== 'all') {
      result = result.filter(task => task.status === filterCriteria)
    }
    return result.sort((a, b) => {
      if (sortCriteria === 'priority') {
        // Custom sorting for priority field
        const priorityA = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
        const priorityB = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
        return sortOrder === 'asc' 
          ? priorityA - priorityB 
          : priorityB - priorityA
      }
      // Default sorting for other fields
      if (a[sortCriteria] < b[sortCriteria]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortCriteria] > b[sortCriteria]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [tasks, filterCriteria, sortCriteria, sortOrder])

  return (
    <div>
      <div className="flex justify-between mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterCriteria('all')}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCriteria('todo')}>To Do</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCriteria('in-progress')}>In Progress</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterCriteria('done')}>Done</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortCriteria('title')}>Title</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortCriteria('priority')}>Priority</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortCriteria('status')}>Status</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortCriteria('dueDate')}>Due Date</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Time Spent</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell>{task.timeSpent} hours</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(task)}>
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                      <DialogDescription>
                        Make changes to the task here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    {editingTask && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">
                            Title
                          </Label>
                          <Input
                            id="title"
                            value={editingTask.title}
                            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                          <Input
                            id="description"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority" className="text-right">
                            Priority
                          </Label>
                          <Select
                            value={editingTask.priority}
                            onValueChange={(value) => setEditingTask({ ...editingTask, priority: value as Task['priority'] })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status" className="text-right">
                            Status
                          </Label>
                          <Select
                            value={editingTask.status}
                            onValueChange={(value) => setEditingTask({ ...editingTask, status: value as Task['status'] })}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="todo">To Do</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="assignee" className="text-right">
                            Assignee
                          </Label>
                          <Input
                            id="assignee"
                            value={editingTask.assignee}
                            onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="dueDate" className="text-right">
                            Due Date
                          </Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={editingTask.dueDate}
                            onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="timeSpent" className="text-right">
                            Time Spent
                          </Label>
                          <Input
                            id="timeSpent"
                            type="number"
                            value={editingTask.timeSpent}
                            onChange={(e) => setEditingTask({ ...editingTask, timeSpent: Number(e.target.value) })}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    )}
                    <DialogFooter>
                      <Button type="submit" onClick={handleUpdate}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the task.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(task.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}