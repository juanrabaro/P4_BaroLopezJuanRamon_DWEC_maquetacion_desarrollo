import React, { useEffect, useRef, useState } from 'react'

const ContactForm = () => {

  const [message, setMessage] = useState("Form data sended!")
  const [showMessage, setShowMessage] = useState(false)
  const hideMessage = useRef(null)
  const [validData, setValidData] = useState(false)
  
  // form data
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
    <section className='main-contact__contact-form-container'>
      <h2>Contact</h2>
      <form className='main-contact__contact-form-container__contact-form'>
        <div className='main-contact__contact-form-container__contact-form__inputs'>
          <label>Your email</label>
          <input type="email" name="email" value={ form.email } onChange={ handleChange }/>
        </div>
        <div className='main-contact__contact-form-container__contact-form__inputs'>
          <label>Your suggestion</label>
          <textarea type="text" name="suggestion" value={ form.suggestion } onChange={ handleChange }/>
        </div>
        <button disabled={ !validData } onClick={ submitForm }>Sign in</button>
        {
          showMessage && <p className='main-contact__contact-form-container__contact-form__message'>{ message }</p>
        }
      </form>
    </section>
  )
}

export default ContactForm