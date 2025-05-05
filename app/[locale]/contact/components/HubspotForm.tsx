"use client";

import React, {useEffect} from "react";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}
interface HubspotContactFormProps {
  region: string;
  portalId: string;
  formId: string;
}

const HubspotContactForm: React.FC<HubspotContactFormProps> = props => {
  const { region, portalId, formId } = props;

  useEffect(() => {
    const script = document.createElement('script');
    script.src='https://js.hsforms.net/forms/shell.js';
    // script.src='https://js-na2.hsforms.net/forms/embed/242562134.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: region,
          portalId: portalId,
          formId: formId,
          target: '#hubspotForm'
        })
      }
    });

  }, [region, portalId, formId]);

  return (
    <div>
      <div id="hubspotForm"></div>
    </div>
  );
};

export default HubspotContactForm;