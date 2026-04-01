const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const coursesFilePath = path.join(__dirname, '../data/Courses.json');

// GET endpoint to fetch courses
router.get('/', (req, res) => {
  try {
    const courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to load courses data.' });
  }
});

// POST endpoint to add a new course
router.post('/', (req, res) => {
  const { title,description,image, price, status = 'Published' } = req.body;

  if (!title || !price) {
    return res.status(400).json({ error: 'Title and price are required.' });
  }

  try {
    const courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));

    const newCourse = { title, price, status , description , image};
    courses.push(newCourse);

    fs.writeFileSync(coursesFilePath, JSON.stringify(courses, null, 2));

    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'Failed to add the new course.' });
  }
});

module.exports = router;
