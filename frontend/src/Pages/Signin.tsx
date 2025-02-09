import React from 'react'
import Auth from '../components/Auth'
import Quote from '../components/Quote'

const Signin = () => {
  return (
    <div>
      <div className="grid grid-cols-2">
        <div>
          <Auth type="signin"/>
        </div>
        <div className=" none lg:block">
          <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signin