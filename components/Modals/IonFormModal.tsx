import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useEffect, useState } from 'react'
import { IonFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
// import { sendIonForm } from "@/utils/SendEmail";
import "./form-modal.scss";
import axios from 'axios';


interface IApplicationModalProps {
  onClose: () => void;
  //   careersPage: {
  //       heroImage: {
  //     alt: string;
  //     url: string;
  //   }
  //   heading: string;
  //   body: string;
  //   unsolicitedApplication: string;
  //   unsolicitedApplicationSentence: string;
  // }
  closeIcons: IGlobalAssetsProps[];
}

const IonFormModal = (
  { onClose, closeIcons }: IApplicationModalProps
) => {
  const { register, handleSubmit, reset } = useForm<IonFormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: IonFormData) => {
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

      const response = await axios.post("/api/hubspot/ion", data);
      
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
          formId: process.env.NEXT_PUBLIC_HUBSPOT_ION_FORM_ID as string,
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
      className={`modal__mit_ion_form`}
      onClick={(e) => e.stopPropagation()}
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

          <h2>We study together the best solution for you structure</h2>
          <p>Please fill out this short form so that we can best respond to your request.</p>

          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}
          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}
          <div id="hubspot-form-container" />
          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}
          {/* ----- DO NOT REMOVE ----- DO NOT REMOVE ----- DO NOT REMOVE ----- */}

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={`name_company`}>
              <div className={`full_name`}>
                <label htmlFor='full_name'>Name and Surname <span>*</span></label>
                <input type='text' placeholder='John Doe' required
                  {...register('name_and_surname', { required: true })}
                />
              </div>

              <div className={`company`}>
                <label htmlFor='company'>Company <span>*</span></label>
                <input type='company' placeholder=''
                  {...register('company', { required: true })}
                />
              </div>
            </div>

            <div className={`email_surface`}>
              <div className={`email`}>
                <label htmlFor='email'>Email address <span>*</span></label>
                <input type='email' placeholder='example@domain.com'
                  {...register('email', { required: true })}
                />
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


            <div className={`select_options`}>
              <label htmlFor='nav_option'>
                Which kind of navigation you want to use? <span>*</span>
              </label>

              <select {...register("which_kind_of_navigation_you_want_to_use", { required: true })}>
                <option value="">Select...</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className={`message`}>
              <label htmlFor='message'>Additional Information</label>
              <textarea rows={4} placeholder='Tell us briefly about your needs'
                {...register('additional_information', { required: true })}
              ></textarea>
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

export default IonFormModal