"use client"
import React from "react";
import parse from 'html-react-parser';
import ThemeSwitchAssets from "@/utils/ThemeSwitchAssets";
import { useForm } from 'react-hook-form';
import { sendEmail } from "@/utils/SendEmail";
import "./contact-component.scss";
import { FormData, IGlobalAssetsProps } from "@/types/pageContent.types";


interface IContactComponentProps {
  contactsPageModel: {
    contactPage: {
      heading: string;
      body: string;
    }
  }
  socialIcons: IGlobalAssetsProps[]
}

const ContactComponent = (
  { contactsPageModel, socialIcons }: IContactComponentProps
) => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Nome <span>(obbligatorio)</span></p>
        <div className={`name__container`}>
          <div className={`first_name`}>
            <label htmlFor='first_name'>Nome</label>
            <input type='text' placeholder='' required
              {...register('first_name', { required: true })}
            />
          </div>
          <div className={`last_name`}>
            <label htmlFor='last_name'>Cognome</label>
            <input type='text' placeholder='' required
              {...register('last_name', { required: true })}
            />
          </div>
        </div>


        <div className={`email`}>
          <label htmlFor='email'>E-mail <span>(obbligatorio)</span></label>
          <input type='email' placeholder=''
            {...register('email', { required: true })}
          />
        </div>

        <div className={`company`}>
          <label htmlFor='company'>Azienda <span>(obbligatorio)</span></label>
          <input type='company' placeholder=''
            {...register('company', { required: true })}
          />
        </div>

        <div className={`message`}>
          <label htmlFor='message'>Messaggio <span>(obbligatorio)</span></label>
          <textarea rows={4} placeholder=''
            {...register('message', { required: true })}
          ></textarea>
        </div>

        <div className={`checkboxes`}>
          <p>Ci hai trovato tramite</p>

          <label className={`block`}>
            <input type="checkbox" name="sources[]" value="google" /> 
            Ricerca su Google
          </label>
          <label className={`block`}>
            <input type="checkbox" name="sources[]" value="social_media" /> 
            Social Networks
          </label>
          <label className={`block`}>
            <input type="checkbox" name="sources[]" value="recommendation" /> 
            Passaparola
          </label>
        </div>


        <button className={`btn__submit_form`}>
          <p>Invia</p>
        </button>

      </form>
    </div>
  );
}

export default ContactComponent;