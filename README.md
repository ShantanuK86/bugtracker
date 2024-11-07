# Bug Tracker

A modern bug tracking application built with Next.js 14, featuring a clean and intuitive interface for managing tasks and tracking issues.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Features

- 🔐 **User Authentication**: Simple login system to manage user access
- 📊 **Interactive Dashboard**: Real-time overview of tasks and their status
- 🎯 **Task Management**: Create, edit, and delete tasks with ease
- ⏱️ **Time Tracking**: Log and monitor time spent on each task
- 🔍 **Advanced Filtering**: Sort and filter tasks based on various criteria
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices
- 🌓 **Dark Mode**: Toggle between light and dark themes for comfortable viewing
- 📈 **Trend Analysis**: Visualize task trends with interactive charts

## Prerequisites

Before starting, make sure you have the following installed:

- Node.js (version 18.17 or higher)
- npm (version 9 or higher) or yarn or pnpm
- Git
- A modern web browser
- A code editor (VS Code recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bug-tracker.git
```
2.2. Navigate to the project directory:


```shellscript
 cd bug-trackercd bug-tracker

```

3. Install dependencies:


```shellscript
 npm installnpm install
# or
yarn install
# or
pnpm install

```

## Project Setup

1. Create environment variables:

1. Create a `.env.local` file in the root directory
2. Add the following variables:


```plaintext
 NEXT_PUBLIC_API_URL=http://localhost:3000/apiNEXT_PUBLIC_API_URL=http://localhost:3000/api

```


2. Configure your IDE:

1. Install recommended extensions for VS Code:

1. ESLint
2. Prettier
3. Tailwind CSS IntelliSense






3. Install shadcn/ui components:


```shellscript
 npx shadcn@latest initnpx shadcn@latest init

```

## Running the Application

1. Start the development server:


```shellscript
 npm run devnpm run dev
# or
yarn dev
# or
pnpm dev

```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)
3. Login with default credentials:

1. Username: `admin`
2. Password: `123`





## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier


## Project Structure

```plaintext
 bug-tracker/bug-tracker/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── dashboard/         # Dashboard routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── DashboardContent.tsx
│   ├── TaskList.tsx
│   ├── TaskForm.tsx
│   └── TrendChart.tsx
├── lib/                   # Utility functions
├── styles/               # Global styles
├── public/               # Static assets
└── tests/                # Test files

```

## Usage Guide

### Dashboard Navigation

1. After logging in, you'll see the main dashboard with:

1. Task statistics
2. Recent activity
3. Quick actions



2. Use the top navigation bar to:

1. Access different sections
2. Toggle dark mode
3. Log out





### Managing Tasks

1. Creating a Task:

1. Click "New Task" button
2. Fill in required fields
3. Set priority and status
4. Click "Create"



2. Editing Tasks:

1. Click "Edit" on any task
2. Modify fields
3. Save changes



3. Filtering and Sorting:

1. Use filter dropdown for status
2. Click column headers to sort
3. Use search bar for specific tasks





### Time Tracking

1. Start tracking:

1. Open task details
2. Click "Start Timer"
3. Timer will track automatically



2. Stop tracking:

1. Click "Stop Timer"
2. Time will be logged to task





## Contributing

1. Fork the repository
2. Create your feature branch:


```shellscript
 git checkout -b feature/AmazingFeaturegit checkout -b feature/AmazingFeature

```

3. Commit your changes:


```shellscript
 git commit -m 'Add some AmazingFeature'git commit -m 'Add some AmazingFeature'

```

4. Push to the branch:


```shellscript
 git push origin feature/AmazingFeaturegit push origin feature/AmazingFeature

```

5. Open a Pull Request


## Troubleshooting

### Common Issues

1. Installation Errors:

1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules and reinstall



2. Build Errors:

1. Check Node.js version
2. Verify all dependencies are installed
3. Clear .next directory



3. Runtime Errors:

1. Check console for error messages
2. Verify environment variables
3. Check network connectivity





### Getting Help

- Create an issue in the GitHub repository
- Check existing issues for solutions
- Contact the maintainers