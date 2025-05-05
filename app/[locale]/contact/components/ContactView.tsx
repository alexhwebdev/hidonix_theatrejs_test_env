"use client"
import React, { useState } from "react";
import parse from 'html-react-parser';
import ThemeSwitchAssets from "@/utils/ThemeSwitchAssets";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { IGlobalAssetsProps, FormData } from "@/types/pageContent.types";
import "./contact-component.scss";
// import HubspotContactForm from "./HubspotForm"
// import { sendEmail } from "@/utils/SendEmail";


interface IContactViewProps {
  contactsPageModel: {
    contactPage: {
      heading: string;
      body: string;
    }
  }
  socialIcons: IGlobalAssetsProps[]
}

const ContactView = (
  { contactsPageModel, socialIcons }: IContactViewProps
) => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");
      
      const response = await axios.post("/api/hubspot/contactus", data);
      
      if (response.status === 200) {
        setSuccessMessage("Form submitted successfully!");
      }
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrorMessage("A contact with this email already exists.");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
      console.error("Error submitting form:", error);
    }
  };


  return (
    <div id={`contact_id`}>
      <div className={`contact__heading_body`}>
        <div className={`heading_body`}>
          {parse(contactsPageModel.contactPage.heading)}
          {parse(contactsPageModel.contactPage.body)}
        </div>
        <div className={`social_icons`}>
          <ThemeSwitchAssets receivedAssets={ socialIcons } />
        </div>
      </div>

      {/* <HubspotContactForm 
        region={process.env.NEXT_PUBLIC_HUBSPOT_REGION || ""}
        portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID || ""}
        formId={process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID || ""}
      /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Name <span>(required)</span></p>
        <div className={`name__container`}>
          <div className={`first_name`}>
            <label htmlFor='first_name'>First Name</label>
            <input type='text' placeholder='' required
              {...register('first_name', { required: true })}
            />
          </div>
          <div className={`last_name`}>
            <label htmlFor='last_name'>Last Name</label>
            <input type='text' placeholder='' required
              {...register('last_name', { required: true })}
            />
          </div>
        </div>

        <div className={`email`}>
          <label htmlFor='email'>E-mail <span>(required)</span></label>
          <input type='email' placeholder=''
            {...register('email', { required: true })}
          />
        </div>

        <div className={`company`}>
          <label htmlFor='company'>Company <span>(required)</span></label>
          <input type='company' placeholder=''
            {...register('company', { required: true })}
          />
        </div>

        <div className={`message`}>
          <label htmlFor='message'>Message <span>(required)</span></label>
          <textarea rows={4} placeholder=''
            {...register('message', { required: true })}
          ></textarea>
        </div>

        <div className={`checkboxes`}>
          <p>How did you find out about us?</p>

          <label className={`block`}>
            <input type="checkbox" {...register('nextjs_how_did_you_find_out_about_us')} value="google" /> 
            Google
          </label>
          <label className={`block`}>
            <input type="checkbox" {...register('nextjs_how_did_you_find_out_about_us')} value="social_media" /> 
            Social Networks
          </label>
          <label className={`block`}>
            <input type="checkbox" {...register('nextjs_how_did_you_find_out_about_us')} value="recommendation" /> 
            Someone recommended your services
          </label>
        </div>

        <button className={`btn__submit_form`}>
          <p>Send</p>
        </button>

        {errorMessage && (
          <p className="form__error_message" style={{ color: "red", marginTop: "1rem" }}>
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="form__success_message" style={{ color: "green", marginTop: "1rem" }}>
            {successMessage}
          </p>
        )}

        {/* Thank you for contacting us! */}
        {/* You are very important to us, all information received will always remain confidential. We will contact you as soon as we review your message */}
      </form>
    </div>
  );
}

export default ContactView;