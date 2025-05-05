"use client"

import { useState } from "react"
import { addSubscriber } from "../../app/api/mailchimp/actions"


export const SubscribeSection = () => {

  const [isPending, setIsPending] = useState(false)
  const [subscribeSuccess, setSubscribeSuccess] = useState("")
  const [subscribeError, setSubscribeError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsPending(true)
    setSubscribeSuccess("")
    setSubscribeError("")
    const formData = new FormData(e.target)
    const res = await addSubscriber(formData)
    if(res.successMessage) {
        setSubscribeSuccess(res.successMessage)
    } else {
        setSubscribeError(res.errorMessage)
    }
    setIsPending(false)
}

  return(
    <div className="footer__email_form">
      <div className="">
        <form className="" onSubmit={(e) => handleSubmit(e)}>
          <input 
            type="email"
            name="email"
            className="" 
            placeholder="Email Address" 
            required />
          <button className={`submit`} disabled={isPending}>{isPending ? "Processing..." : "Subscribe"}</button>
        </form>
        <div className="">
          {subscribeSuccess && <p className="">{subscribeSuccess}</p>} 
          {subscribeError && <p className="">{subscribeError}</p>}
        </div>
      </div>
    </div>
  )
}