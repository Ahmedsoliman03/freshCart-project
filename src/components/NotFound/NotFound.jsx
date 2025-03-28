import React, { useEffect, useState } from 'react'
import style from "./NotFound.module.css"
export default function NotFound() {
    const [count, setCount] = useState(0)
    useEffect(()=>{},[])
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-yellow-400 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          className="px-6 py-3 bg-green-600 dark:bg-yellow-500 text-white dark:text-gray-900 rounded-lg hover:bg-green-700 dark:hover:bg-yellow-600 transition-colors"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </>
  )
}
//edited by Joe
