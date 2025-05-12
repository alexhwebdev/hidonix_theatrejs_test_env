import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useState } from 'react'
import { ExpoxFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
// import { sendIonForm } from "@/utils/SendEmail";
import "./form-modal.scss";
import axios from 'axios';


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
      
      const response = await axios.post("/api/hubspot/expox", data);
      
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
    <div
      className={`modal__expox_form modal__mit_ion_form`}
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

            <div className={`other__surface_map`}>
              <div className={`other`}>
                <label htmlFor='other'>Message</label>
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


            <button className={`btn__submit_ion_form`}>
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
        </div>
      </div>
    </div>
  );
}

export default ExpoxFormModal