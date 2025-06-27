import React from 'react'
import CourseList from './components/CourseList'
import CourseForm from './components/CourseForm'
import InstanceForm from './components/InstanceForm'
import InstanceList from './components/InstanceList'

const App = () => {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Courses App</h1>
      <CourseForm />
      <hr />
      <CourseList />
      <hr />
      <InstanceForm />
      <hr />
      <InstanceList />
    </div>
  )
}

export default App