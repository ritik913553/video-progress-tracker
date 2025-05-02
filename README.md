# Video Progress Tracker

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://video-progress-tracker-henna.vercel.app/)

A video watching application that tracks viewing progress and remembers watched intervals.

## Features
- Tracks watched intervals in MongoDB
- Merges overlapping intervals for accurate progress calculation
- Resumes playback from last watched position
- Responsive design for all devices

## Technology Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend), Render/Railway (Backend)

## Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ritik913553/video-progress-tracker.git
   cd video-progress-tracker
2.  **Set up environment variables**
    Create .env files in both client and server directories:
   
    ```bash

    #client
    VITE_API_BASE_URL=http://localhost:5000
    # For production:
    # VITE_API_BASE_URL=https://your-backend-api.railway.app

    #server
    VITE_API_BASE_URL=http://localhost:5000
    # For production:
    # VITE_API_BASE_URL=https://your-backend-api.railway.app
    
    # you can prefer he env.sample file in the code
3.  **Install dependencies**
     ```bash
      # Install server dependencies
      cd server
      npm install
      
      # Install client dependencies
      cd ../client
      npm install
4.  **Run the applications**
      Open two terminal windows:
      Terminal 1 (Backend)
      
        ```bash
          cd server
          npm run dev
      
      Terminal 2 (Frontend)
    
         ```bash
            cd client
            npm run dev
5. **Access the application**
   
     Frontend: http://localhost:5173
     
     Backend API: http://localhost:5000


## Project Structure
```bash
video-progress-tracker/
├── client/                 # Frontend (React Vite)
│   ├── public/            # Static files
│   ├── src/               # React components
│   ├── .env               # Frontend environment variables
│   └── vite.config.js     # Vite configuration
│
├── server/                # Backend (Express)
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── .env               # Backend environment variables
│   └── server.js          # Express server
│
└── README.md              # This documentation
