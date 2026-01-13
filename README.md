# Job Hunt Tracker - Node.js Application

A full-stack job tracking application built with Node.js, Express, and React.

## Features

**5-Stage Kanban Board**: Applied → Interview → Offered → Accepted / Rejected  
**Hamburger Menu Sidebar**: View jobs by country statistics  
**Salary Tracking**: Track salary information (exact or estimated)  
**Visa Sponsorship**: Track visa sponsorship status (Yes/No/Not sure)  
**Country Statistics**: See total applications per country  
**Persistent Database**: JSON file-based storage  
**REST API**: Full CRUD operations  
**Search & Filter**: Find jobs by title, company  
**Responsive Design**: Beautiful dark UI with blue gradients  

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: JSON file storage (jobs.json)
- **Frontend**: React (via CDN) + Tailwind CSS
- **API**: RESTful endpoints

## Installation

1. **Install dependencies**:
```bash
npm install
```

## Running the Application

1. **Start the server**:
```bash
npm start
```

2. **Open your browser**:
```
http://localhost:3001
```

The app will be running!

## API Endpoints

### Get all jobs
```
GET /api/jobs
```

### Get job by ID
```
GET /api/jobs/:id
```

### Create new job
```
POST /api/jobs
Body: {
  "title": "AI Engineer",
  "company": "TechCorp",
  "city": "Paris",
  "country": "France",
  "salary": "50000€",
  "visaSponsored": "Yes",
  "url": "https://...",
  "appliedDate": "2026-01-13",
  "status": "Applied"
}
```

### Get country statistics
```
GET /api/stats/countries
Response: {
  "France": 5,
  "Germany": 3,
  "UK": 2
}
```

### Update job
```
PUT /api/jobs/:id
Body: { ...updated fields }
```

### Delete job
```
DELETE /api/jobs/:id
```

## Project Structure

```
job-tracker-app/
├── server.js           # Express server & API routes
├── jobs.json          # Database file (auto-created)
├── public/
│   └── index.html     # Frontend React app
├── package.json       # Dependencies & scripts
└── README.md         # This file
```

## Database

The application uses a simple JSON file (`jobs.json`) for data persistence. The file is automatically created when you first run the server.
This file is intentionally ignored from version control.

Example job entry:
```json
{
  "id": "job_1736784000000",
  "title": "AI Engineer",
  "company": "TechCorp",
  "city": "Paris",
  "country": "France",
  "salary": "50000€",
  "visaSponsored": "Yes",
  "url": "https://example.com/job",
  "appliedDate": "2026-01-13",
  "status": "Applied",
  "lastUpdate": "2026-01-13T16:00:00.000Z"
}
```

## Customization

### Change Port
Edit `server.js`:
```javascript
const PORT = 3001; // Change to your preferred port
```

### Add More Stages
Edit the `stages` array in `public/index.html`:
```javascript
const stages = ['Applied', 'Interview', 'Offered', 'Accepted', 'Rejected'];
```

### Modify Colors
Update the `stageColors` object in `public/index.html`:
```javascript
const stageColors = {
  'Applied': 'from-blue-600 to-blue-500',
  // ... add your colors
};
```

## Troubleshooting

### Port already in use?
Change the PORT in `server.js` or kill the process using port 3001:
```bash
# Find process
lsof -i :3001

# Kill process
kill -9 <PID>
```

### Can't connect to server?
Make sure:
1. Server is running (`npm start`)
2. You're accessing `http://localhost:3001` (not just opening the HTML file)
3. No firewall is blocking port 3001

### Data not persisting?
Check that `jobs.json` exists in the project root and has proper write permissions.

## Future Enhancements

- [ ] Add user authentication
- [ ] Migrate to SQL database (PostgreSQL/MySQL)
- [ ] Add file upload for resumes
- [ ] Email notifications for interviews
- [ ] Export data to CSV
- [ ] Add statistics/analytics dashboard

## License

MIT

---

Good luck with your job hunt!
