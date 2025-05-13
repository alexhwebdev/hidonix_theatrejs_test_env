import ThemeSwitchAssetsNoLink from '@/utils/ThemeSwitchAssetsNoLink';
import React, { useState } from 'react'
import { IonFormData, IGlobalAssetsProps } from '@/types/pageContent.types';
import { useForm } from 'react-hook-form';
// import { sendIonForm } from "@/utils/SendEmail";
import "./ion-form-modal.scss";
import axios from 'axios';


interface IApplicationModalProps {
  onClose: () => void;
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

          <h2>Studiamo insieme la soluzione migliore per la tua struttura</h2>
          <p>Compila questo breve form per consentirci di rispondere al meglio alla tua richiesta.</p>

          <form onSubmit={handleSubmit(onSubmit)}>

            <div className={`name_company`}>
              <div className={`full_name`}>
                <label htmlFor='full_name'>Nome e cognome <span>*</span></label>
                <input type='text' placeholder='John Doe' required
                  {...register('name_and_surname', { required: true })}
                />
              </div>

              <div className={`company`}>
                <label htmlFor='company'>Azienda <span>*</span></label>
                <input type='company' placeholder=''
                  {...register('company', { required: true })}
                />
              </div>
            </div>

            <div className={`email_surface`}>
              <div className={`email`}>
                <label htmlFor='email'>Email <span>*</span></label>
                <input type='email' placeholder=''
                  {...register('email', { required: true })}
                />
              </div>

              <div className={`surface_map`}>
                <label htmlFor='surface_map'>
                  Superficie da mappare (mq)
                </label>
                <input type='surface_map' placeholder=''
                  {...register('surface_you_want_to_map__sq__ft_', { required: true })}
                />
              </div>
            </div>


            <div className={`select_options`}>
              <label htmlFor='nav_option'>
               A che tipologia di navigazione sei interessato/a? <span>*</span>
              </label>

              <select {...register("which_kind_of_navigation_you_want_to_use", { required: true })}>
                <option value="">Select...</option>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option>
                <option value="Entrambe">Entrambe</option>
              </select>
            </div>

            <div className={`message`}>
              <label htmlFor='message'>Note aggiuntive</label>
              <textarea rows={4} placeholder=''
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