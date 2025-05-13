import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useEffect, useState } from 'react'
import { MitFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
// import { sendIonForm } from "@/utils/SendEmail";
import axios from 'axios';
import "./mit-form-modal.scss";


interface IApplicationModalProps {
  onClose: () => void;
  closeIcons: IGlobalAssetsProps[];
}

const ItMitFormModal = (
  { onClose, closeIcons }: IApplicationModalProps
) => {
  const { register, handleSubmit, reset } = useForm<MitFormData>();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const onSubmit = async (data: MitFormData) => {
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

      const response = await axios.post("/api/hubspot/mit", payload);
      
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
          formId: process.env.NEXT_PUBLIC_HUBSPOT_MIT_FORM_ID as string,
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
      className={`mit__form_modal`}
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

          <h2>Studiamo insieme la soluzione migliore per il tuo museo</h2>
          <p>Compila questo breve form per consentirci di rispondere al meglio alla tua richiesta.</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={`name_company`}>
              <div className={`full_name`}>
                <label htmlFor='full_name'>Nome e Cognome <span>*</span></label>
                <input type='text' placeholder='John Doe' required
                  {...register('name_and_surname', { required: true })}
                />
              </div>

              <div className={`company`}>
                <label htmlFor='company'>Museo/Azienda <span>*</span></label>
                <input type='company' placeholder=''
                  {...register('museum_company', { required: true })}
                />
              </div>
            </div>

            <div className={`mit__email`}>
              <div className={`email`}>
                <label htmlFor='email'>Email address <span>*</span></label>
                <input type='email' placeholder='example@domain.com'
                  {...register('email', { required: true })}
                />
              </div>
            </div>


            <div className={`mit_checkboxes`}>
              <p>A quale funzionalità sei interessato/a? *</p>

              <div className={`checkboxes`}>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Digitalizzazione e gestione del catalogo" /> 
                  Digitalizzazione e gestione del catalogo
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Gestione e analisi dei flussi" /> 
                  Gestione e analisi dei flussi
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="e-Commerce" /> 
                  e-Commerce
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Realtà Aumentata" /> 
                  Realtà Aumentata
                </label>   
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Indoor/Outdoor Navigation" /> 
                  Indoor/Outdoor Navigation
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Membership e donazioni" /> 
                  Membership e donazioni
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Scansione delle opere d'arte" /> 
                  Scansione delle opere d&apos;arte
                </label>
                <label className={`block`}>
                  <input type="checkbox" {...register('mit_features')} value="Contenuti geolocalizzati" /> 
                  Contenuti geolocalizzati
                </label>                  
              </div>
            </div>

            <div className={`other_number_visitors`}>
              <div className={`other`}>
                <label htmlFor='other'>Altro (specificare)</label>
                <textarea rows={4} placeholder=''
                  {...register('other', { required: true })}
                ></textarea>
              </div>
              <div className={`number_visitors_options`}>
                <label htmlFor='number_visitors_options'>
                  Il numero di visitatori annui del tuo museo è
                </label>

                <select {...register("your_number_of_visitors_per_year", { required: true })}>
                  <option value="">0 - 1000</option>
                  <option value="0-1000">0-1000</option>
                  <option value="2000-10000">2000-10000</option>
                  <option value="10000-50000">10000-50000</option>
                  <option value="+50000">+50000</option>
                </select>
              </div>
            </div>


            <button className={`btn__submit_mit_form`}>
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

export default ItMitFormModal;