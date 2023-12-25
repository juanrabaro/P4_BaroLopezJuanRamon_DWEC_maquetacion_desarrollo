import React from 'react'

const SigninForm = () => {
  return (
    <>
      <form>
        <label>Sign In</label>
        <input name='email' type="text" placeholder='gmail'/>
        <input name='pwd' type="text" placeholder='password'/>
        <button>Sign in</button>
      </form>
    </>
  )
}

export default SigninForm