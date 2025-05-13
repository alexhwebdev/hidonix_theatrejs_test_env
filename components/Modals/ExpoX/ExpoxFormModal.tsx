import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useEffect, useState } from 'react'
import { ExpoxFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
// import { sendIonForm } from "@/utils/SendEmail";
import axios from 'axios';
import "./expox-form-modal.scss";


interface IApplicationModalProps {
  onClose: () => void;
  closeIcons: IGlobalAssetsProps[];
}

const ExpoxFormModal = (
  { onClose, closeIcons }: IApplicationModalProps
) => {
  const { register, handleSubmit, reset } = useForm<ExpoxFormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const onSubmit = async (data: ExpoxFormData) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const hutk = Cookies.get('hubspotutk');
      const payload = {
        ...data,
        hutk,
        pageUri: window.location.href,
        pageName: document.title,
      };

      const response = await axios.post("/api/hubspot/expox", payload);
      
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

  // ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- 
  // ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- 
  useEffect(() => {
    const loadHubSpotForm = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1", // or your HubSpot region
          portalId: process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID as string,
          formId: process.env.NEXT_PUBLIC_HUBSPOT_EXPOX_FORM_ID as string,
          target: "#hubspot-form-container",
        });
      }
    };
  
    const script = document.createElement('script');
    script.src = "https://js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.defer = true;
    script.onload = loadHubSpotForm;
  
    document.body.appendChild(script);
  
    return () => {
      // Cleanup (if modal closes and unmounts)
      const formContainer = document.querySelector("#hubspot-form-container");
      if (formContainer) formContainer.innerHTML = "";
    };
  }, []);

  return (
    <div
      className={`expox__form_modal`}
      onClick={onClose}
    >
      <div
        className={`container`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className={`modal`}>
          <div className={`btn__close_modal`}>
            <button onClick={onClose}>
              <ThemeSwitchAssetsNoLink receivedAssets={closeIcons} />
            </button>
          </div>

          <h2>Let&apos;s study together the best solution</h2>
          <p>Please fill out this short form so that we can best respond to your request.</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={`name_company expox__container`}>
              <div className={`full_name`}>
                <div className={`first_name`}>
                  <label htmlFor='first_name'>First Name</label>
                  <input type='text' placeholder='' required
                    {...register('firstname', { required: true })}
                  />
                </div>
                <div className={`last_name`}>
                  <label htmlFor='last_name'>Last Name</label>
                  <input type='text' placeholder='' required
                    {...register('lastname', { required: true })}
                  />
                </div>
              </div>

              <div className={`company`}>
                <label htmlFor='company'>Company <span>*</span></label>
                <input type='company' placeholder=''
                  {...register('company', { required: true })}
                />
              </div>
            </div>

            <div className={`expox_email`}>
              <div className={`email`}>
                <label htmlFor='email'>Email address <span>*</span></label>
                <input type='email' placeholder='example@domain.com'
                  {...register('email', { required: true })}
                />
              </div>
            </div>


            <div className={`expox_checkboxes`}>
              <p>What feature are you interested in? *</p>

              <div className={`checkboxes`}>
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Indoor/Outdoor Navigation" /> 
                  Indoor/Outdoor Navigation
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Proximity Marketing" /> 
                  Proximity Marketing
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Visitor App" /> 
                  Visitor App
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Security Tools" /> 
                  Security Tools
                </label>   
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Ticketing & Entry" /> 
                  Ticketing & Entry
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('expox_features')} value="Exhibitors Promotional Tools" /> 
                  Exhibitors Promotional Tools
                </label>
                
              </div>
            </div>

            <div className={`message_surface_map`}>
              <div className={`message`}>
                <label htmlFor='message'>Message</label>
                <textarea rows={4} placeholder='Tell us briefly about your needs'
                  {...register('message', { required: true })}
                ></textarea>
              </div>


              <div className={`surface_map`}>
                <label htmlFor='surface_map'>
                  Surface you want to map (sq. ft)
                </label>
                <input type='surface_map' placeholder=''
                  {...register('surface_you_want_to_map__sq__ft_', { required: true })}
                />
              </div>
            </div>


            <button className={`btn__submit_expox_form`}>
              <p>Send</p>
            </button>

            {/* Show error message if exists */}
            {errorMessage && (
              <p className="form__error_message" style={{ color: "red", marginTop: "1rem" }}>
                {errorMessage}
              </p>
            )}

            {/* Show success message if exists */}
            {successMessage && (
              <p className="form__success_message" style={{ color: "green", marginTop: "1rem" }}>
                {successMessage}
              </p>
            )}

          </form>

          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}
          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}
          <div id="hubspot-form-container" />
        </div>
      </div>
    </div>
  );
}

export default ExpoxFormModal