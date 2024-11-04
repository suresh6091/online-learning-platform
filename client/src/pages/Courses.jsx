// src/pages/Courses.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Get user information from AuthContext

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses', {
          headers: {
            Authorization: `Bearer ${user?.token}`, // Include the JWT token in the request headers
          },
        });
        setCourses(response.data); // Assume the response contains an array of courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user]);

  const enrollInCourse = async (courseId) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/enroll`, { courseId }, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      alert('Successfully enrolled in the course!'); // Notify user of successful enrollment
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in the course.'); // Notify user of failure
    }
  };

  if (loading) {
    return <div>Loading courses...</div>; // Show loading indicator while fetching courses
  }

  return (
    <div>
      <h1>Available Courses</h1>
      {courses.length === 0 ? (
        <p>No courses available at the moment.</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button onClick={() => enrollInCourse(course.id)}>Enroll</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
