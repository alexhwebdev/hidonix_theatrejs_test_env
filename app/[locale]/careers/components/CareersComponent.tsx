"use client"
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import parse from 'html-react-parser';
import ThemeSwitchAssetsNoLink from "@/utils/ThemeSwitchAssetsNoLink";
import { IGlobalAssetsProps } from "@/types/pageContent.types";
import "./careers-component.scss";


interface ICareersComponent {
	careersPage: {
		heroImage: {
      alt: string;
      url: string;
    }
    heading: string;
    body: string;
    unsolicitedApplication: string;
    unsolicitedApplicationSentence: string;
  }
  closeIcons: IGlobalAssetsProps[];
}
interface IApplicationModalProps {
  onClose: () => void;
	careersPage: {
		heroImage: {
      alt: string;
      url: string;
    }
    heading: string;
    body: string;
    unsolicitedApplication: string;
    unsolicitedApplicationSentence: string;
  }
  closeIcons: IGlobalAssetsProps[];
}

const ApplicationModal = (
  { onClose, careersPage, closeIcons }: IApplicationModalProps
) => {
  return (
    <div
      className={`careers__modal`}
      onClick={onClose}
    >
      <div
        className={`inner__modal`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <div className={`modal__unsolicited_application`}>
          <div className={`btn__close_modal`}>
            <button onClick={onClose}>
              <ThemeSwitchAssetsNoLink receivedAssets={closeIcons} />
            </button>
          </div>

          <div className={`p1`}>
            {parse(careersPage.unsolicitedApplication)}
          </div>

          <button className={`btn__apply_now`}>
            <a href="mailto:info@hidonix.com">
              <p>Apply Now</p>
            </a>
          </button>

          <p>Overview</p>
          <div className={`p2`}>
            {parse(careersPage.unsolicitedApplicationSentence)}
          </div>
        </div>
      </div>
    </div>
  );
}

const CareersComponent = (
  { careersPage, closeIcons }: ICareersComponent
) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll"); // Cleanup when component unmounts
    };
  }, [isModalOpen]);

  return (
    <div id={`careers_id`}>
      <div className={`careers__hero_image`}>
        <div className={`overlay`}></div>
        <Image 
          src={careersPage.heroImage.url} 
          alt={careersPage.heroImage.alt} 
          fill
          priority
        />
        <h1>Careers</h1>
      </div>

      <div className={`careers__heading_body`}>
        <div className={`careers__heading`}>
          {parse(careersPage.heading)}
        </div>

        <div className={`careers__body`}>
          {parse(careersPage.body)}
        </div>        
      </div>

      <div className={`careers__unsolicited_application`}>
        <div className={`p1`}>{parse(careersPage.unsolicitedApplication)}</div>
        <div className={`p2`}>{parse(careersPage.unsolicitedApplicationSentence)}</div>

        <div className={`careers__buttons`}>
          <button onClick={() => setIsModalOpen(true)}>
            <p>Learn More</p>
          </button>
          <button>
            <a href="mailto:info@hidonix.com">
              <p>Apply Now</p>
            </a>
          </button>
        </div>
      </div>
      {
        isModalOpen && 
        <ApplicationModal 
          onClose={() => setIsModalOpen(false)} 
          careersPage={ careersPage }
          closeIcons={ closeIcons }
        />
      }
    </div>
  )
}

export default CareersComponent;
