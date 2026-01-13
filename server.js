const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'jobs.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
}

// Helper function to read jobs from file
const readJobs = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading jobs:', error);
    return [];
  }
};

// Helper function to write jobs to file
const writeJobs = (jobs) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(jobs, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing jobs:', error);
    return false;
  }
};

// API Routes

// Get all jobs
app.get('/api/jobs', (req, res) => {
  const jobs = readJobs();
  res.json(jobs);
});

// Get job by ID
app.get('/api/jobs/:id', (req, res) => {
  const jobs = readJobs();
  const job = jobs.find(j => j.id === req.params.id);
  
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Create new job
app.post('/api/jobs', (req, res) => {
  const jobs = readJobs();
  const newJob = {
    id: `job_${Date.now()}`,
    ...req.body,
    appliedDate: req.body.appliedDate || new Date().toISOString().split('T')[0],
    lastUpdate: new Date().toISOString()
  };
  
  jobs.push(newJob);
  
  if (writeJobs(jobs)) {
    res.status(201).json(newJob);
  } else {
    res.status(500).json({ error: 'Failed to save job' });
  }
});

// Get jobs statistics by country
app.get('/api/stats/countries', (req, res) => {
  const jobs = readJobs();
  const countryStats = {};
  
  jobs.forEach(job => {
    const country = job.country || 'Unknown';
    if (!countryStats[country]) {
      countryStats[country] = 0;
    }
    countryStats[country]++;
  });
  
  res.json(countryStats);
});

// Update job
app.put('/api/jobs/:id', (req, res) => {
  const jobs = readJobs();
  const index = jobs.findIndex(j => j.id === req.params.id);
  
  if (index !== -1) {
    jobs[index] = {
      ...jobs[index],
      ...req.body,
      lastUpdate: new Date().toISOString()
    };
    
    if (writeJobs(jobs)) {
      res.json(jobs[index]);
    } else {
      res.status(500).json({ error: 'Failed to update job' });
    }
  } else {
    res.status(404).json({ error: 'Job not found' });
  }
});

// Delete job
app.delete('/api/jobs/:id', (req, res) => {
  const jobs = readJobs();
  const filteredJobs = jobs.filter(j => j.id !== req.params.id);
  
  if (jobs.length === filteredJobs.length) {
    res.status(404).json({ error: 'Job not found' });
  } else {
    if (writeJobs(filteredJobs)) {
      res.json({ message: 'Job deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete job' });
    }
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Job Tracker Server running on http://localhost:${PORT}`);
  console.log(`📊 Database file: ${DB_FILE}`);
});
