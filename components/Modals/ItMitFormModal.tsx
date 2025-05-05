import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useState } from 'react'
import { MitFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
// import { sendIonForm } from "@/utils/SendEmail";
import "./form-modal.scss";
import axios from 'axios';


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
      
      const response = await axios.post("/api/hubspot/mit", data);
      
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
      className={`modal__mit_ion_form`}
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

export default ItMitFormModal;