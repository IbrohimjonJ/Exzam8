import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='text-center'>
      <img src="./src/assets/page.jpg" alt="page" width={1100} className='found' />

      <Link
                  to="/"
                  className="inline-flex bg-primary-600 btn font-medium rounded-lg text-sm px-5  text-center "
                >
                  Back to Home page
                </Link>
    </div>
  )
}

export default Error
