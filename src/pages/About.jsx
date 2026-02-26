import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-[#624cb0] mb-4">
          About Task Manager 
        </h1>

        <p className="text-gray-600 mb-6">
          Task Manager is a simple yet powerful productivity application designed
          to help users organize, track, and manage their daily tasks efficiently.
          Whether you're planning your day or managing long-term goals, this app
          keeps everything structured and easy to access.
        </p>

        <h2 className="text-xl font-bold mb-2">✨ Key Features</h2>

        <ul className="text-gray-600 space-y-2 mb-6">
          <li>✔ Add, update, and delete tasks</li>
          <li>✔ Mark tasks as completed</li>
          <li>✔ Clean and responsive UI</li>
          <li>✔ Secure authentication system</li>
          <li>✔ User-specific task management</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">🛠 Tech Stack</h2>

        <p className="text-gray-600 mb-6">
          This application is built using modern web technologies including
          React for the frontend, Node.js & Express for the backend, MongoDB
          for the database, and Tailwind CSS for styling.
        </p>

        <h2 className="text-xl font-bold mb-2">🎯 Our Goal</h2>

        <p className="text-gray-600">
          The goal of Task Manager is to provide a lightweight, fast, and
          intuitive experience that helps users stay productive without
          unnecessary complexity. 
        </p>

      </div>
    </div>
    
  )
}

export default About