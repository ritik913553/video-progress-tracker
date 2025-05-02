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

## Demo
   This is All lecture Page
      ![Screenshot from 2025-05-02 17-45-17](https://github.com/user-attachments/assets/b6b0bdee-f846-4fae-9a48-1aa8e5baa81f)
      
   Single Video Page of completed lecture
      ![Screenshot from 2025-05-02 17-45-04](https://github.com/user-attachments/assets/f8abfd3a-f80b-4c54-895e-eb3239acac61)
      
   Video page of not completed yet
      ![Screenshot from 2025-05-02 17-45-48](https://github.com/user-attachments/assets/7407ccf1-3178-4569-83d7-cbde742df719)



## 📐 Design Documentation

### 📊 How Watched Intervals Are Tracked

* On the **frontend**, video playback is monitored using `pause`, `play`, `onTimeUpdate`,and `seeked` events on the `<video>` tag.
* We continuously update the `lastTime` and `currentTime` values and **send a new interval along with the latest playback position to the backend every 5 seconds**.
* To prevent excessive network calls while the user is seeking (e.g., holding down or spamming the skip button), a **debouncing mechanism** is implemented on the `seeked` event.

### 🔗 How Intervals Are Merged and Progress Is Calculated

* The backend receives:

  * A single **new interval**
  * The **last watched position** (used to resume)

* Previous intervals are fetched from the database, and the new interval is **pushed into the existing list**.

* All intervals are then **sorted based on their `start` time**.

  * No additional validation is needed during sorting because server-side checks ensure `start < end`.

* A merge operation is performed:

  * If the `current.start <= last.end`, the two intervals are **merged**.
  * Otherwise, the current interval is **pushed as-is** to the merged array.
   
* Time Complexity: O(n log n) (due to sort) + O(n) (for merge) ⇒ Overall O(n log n)

  * Visual Representation of Algo
    ![Pasted image (2)](https://github.com/user-attachments/assets/1d0b5e30-5d13-4bcc-894b-1144b1e4f85b)


* During the merge loop, **total watch time is also calculated**.

* The final percentage of the video watched is then derived using:

  ```
  percentage = (totalWatchedTime / videoDuration) * 100
  ```

* If the `isComplete` flag is already `true` for a progress entry (i.e., the video is fully watched), then **no further updates** are allowed — the backend simply returns the current progress data.

### 🧩 Challenges Encountered
* Excessive Backend Calls During Seek Events
   
   Initially, the video player triggered too many API calls when users rapidly sought through the video. This resulted in unnecessary load on the backend and potential data inconsistencies.
      Solution: Implemented a debouncing mechanism on the seeked event to limit the frequency of calls, ensuring only the final seek position was sent after user interaction stabilized. This significantly optimized performance and             reduced server strain.

* Incorrect Watch Duration Due to Overlapping Intervals
   
   While merging overlapping intervals, I initially added the duration of every interval directly — including portions that were already covered in previous intervals. This caused the totalWatched time to be overestimated, which             broke percentage calculations.
   Solution: Refactored the merging logic to carefully track only non-overlapping parts of each interval using Math.max(0, current.end - lastMerged.end). This ensured an accurate calculation of total watch time and correct progress          tracking.


# 📬 Contact
If you have any questions or feedback, reach out to me on [LinkedIn](https://www.linkedin.com/in/ritik-gupta-52aa982a7/) or [email](ritikgupta9135@gmail.com).








