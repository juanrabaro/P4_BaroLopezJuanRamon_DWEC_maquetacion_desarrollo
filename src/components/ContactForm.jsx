import React, { useEffect, useRef, useState } from 'react'

const ContactForm = () => {

  const [message, setMessage] = useState("Form data sended!")
  const [showMessage, setShowMessage] = useState(false)
  const hideMessage = useRef(null)
  // if the form has some information enable the sign in button
  const [validData, setValidData] = useState(false)
  const [form, setForm] = useState({
    email: "",
    suggestion: "",
  })


  useEffect(() => {
    (form.email && form.suggestion) ? setValidData(true) : setValidData(false)
  }, [form])

  
  function handleChange(e) {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }


  function submitForm(e) {
    e.preventDefault()
    setForm({
      email: "",
      suggestion: "",
    })

    setShowMessage(true)

    if (hideMessage.current) {
      clearTimeout(hideMessage.current)
    }
    hideMessage.current = setTimeout(() => {
      setShowMessage(false)
    }, 2000)
  }


  return (
    <form>
      <label>Your email</label>
      <input type="email" name="email" value={ form.email } onChange={ handleChange }/>
      <label>Your suggestion</label>
      <input type="text" name="suggestion" value={ form.suggestion } onChange={ handleChange }/>
      <button disabled={ !validData } onClick={ submitForm }>Sign in</button>
      {
        showMessage && <p>{ message }</p>
      }
    </form>
  )
}

export default ContactForm