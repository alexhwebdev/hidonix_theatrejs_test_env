
export interface IGlobalAssetsProps {
  url: string;
  alt: string;
  customData: {
    dataType: string;
    link: string;
    mode: string;
  };
};

export interface IImgProps {
  title: string;
  description: string;
  url: string;
  link: string;
}

export interface IPageDataProps {
  title: string;
  // customData: string;
  customData: {
    dataType: string;
    link: string;
  };
  url: string;
  alt: string;  
  video: []
}

export interface IFooterProps {
  _allAboutUsLocales: {
    locale: string;
    value: string;
  }[];
  _allQuickLinksLocales: {
    locale: string;
    value: string;
  }[];
  _allSubscribeToOurNewsletterLocales: {
    locale: string;
    value: string;
  }[];
  _allMadeWithLocales: {
    locale: string;
    value: string;
  }[];
  _allPrivaryCookiePolicyLocales: {
    locale: string;
    value: string;
  }[];
};

export interface IPageContent {
  // ---------- GLOBAL ASSETS
	globalAsset: {
    title: string;
    // images: {
		// 	title: string;
    //   url: string;
    //   customData: {
    //     dataType: string;
    //     link: string;
    //   };
    // }[]
    images: IGlobalAssetsProps[];
  }
  // ---------- FOOTER
	allFooterModels: {
    _allAboutUsLocales: {
      locale: string;
      value: string;
    }[];
   	_allQuickLinksLocales: {
      locale: string;
      value: string;
    }[];
    _allSubscribeToOurNewsletterLocales: {
      locale: string;
      value: string;
    }[];
    _allMadeWithLocales: {
      locale: string;
      value: string;
    }[];
    _allPrivaryCookiePolicyLocales: {
      locale: string;
      value: string;
    }[];
  }[];


  // ---------- HOME PAGE
  homePage: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[]
    homeGlobalAssets: {
      alt: string;
      url: string;
    }[]

    homeS1Hero: {
      heading: string;
      body: string;
      button: string;
      image: {
        url: string;
        alt: string;
      };
      link: string;
    }[];

		homeS2Brands: {
      images: {
        url: string;
        alt: string;
      }[];
    }[];

		homeS3TechList: (
      | {
        __typename: "HomeS3HeadingBodyRecord";
        heading: string;
        body: string;
        }
      | {
        __typename: "HomeS3SubheadingBodyRecord";
        subheading: string;
        body: string;
      }
    )[];

    homeS4LimitlessApplications: (
      | {
          __typename: "HomeS4HeadingRecord";
          heading: string;
        }
      | {
        __typename: "HomeS4ImageHeadingBodyRecord";
        image: { url: string };
        subheading: string;
        body: string;
      }
    )[];

    homeS5TechPartner: {
      image: {
        alt: string;
        url: string;
      };
      heading: string;
      button: string;
    }[];

    homeS6LatestNews: (
      | {
          __typename: "HomeS5HeadingSubheadingRecord";
          heading: string;
          subheading: string;
        }
      | {
        __typename: "HomeS5ImageCopyRecord";
        image: { url: string };
        body: string;
        date: string;
        link: string;
      }
    )[];
    
    homeS7AsFeaturedIn: {
      heading: string;
      images: {
        url: string;
        alt: string;
        customData: {
          link: string;
        };
      }[];
    }[];
  }


  // ---------- MIT PAGE
  mitPageModel: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
    mitPage: {
      mitS1HeadingBodyButtonsGallery: {
        heading: string;
        body: string;
        button1: string;
        button2: string;
        gallery: {
          alt: string;
          url: string;

          video: {
            muxPlaybackId: string;
            title: string;
            width: string;
            height: string;
            blurUpThumb: string;
          };
        }[];
      }
      mitS2HeadingBody: {
        heading: string;
        body: string;
      }
      mitS2Gallery: {
        gallery: {
          alt: string;
          url: string;
        }[];
      }
      mitS3HeadingImage: {
        heading: string;
        image: {
          alt: string;
          url: string;
        }
      }
      mitS3SubheadingBody: {
        subheading: string;
        body: string;
      }[];
      mitS4HeadingImage: {
        heading: string;
        image: {
          alt: string;
          url: string;
        }
      }
      mitS4SubheadingBody: {
        subheading: string;
        body: string;
      }[];
      mitS5HeadingBodyImage: {
        heading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        }
      }
      mitS5SubheadingBody: {
        subheading: string;
        body: string;
      }[];
      mitS6Heading: {
        heading: string;
      }
      mitS6SubheadingBodyImage: {
        image: {
          alt: string;
          url: string;
        }
        subheading: string;
        body: string;
      }[];
      mitS7Image: {
        image: {
          alt: string;
          url: string;
        }
      }[];
      mitS7Icon: {
        image: {
          alt: string;
          url: string;
        }
      }
      mitS7Start: {
        image: {
          alt: string;
          url: string;
        }
      }
      mitS7BodyGallery: {
        blockTitle: string;
        body: string;
        gallery: {
          alt: string;
          url: string;
          customData: {
            id: string;
          };
        }[];
      }[];
      mitS8HeadingBodyImages: {
        heading: string;
        body: string;
        images: {
          alt: string;
          url: string;
        }[];
      }
      mitS9HeadingSubheadingButtonImage: {
        image: {
          alt: string;
          url: string;
        }
        subheading: string;
        heading: string;
        button: string;
      }
      mitS10HeadingGallery: {
        heading: string;
        gallery: {
          alt: string;
          url: string;
        }[];
      }
      mitS11HeadingGallery: {
        heading: string;
        gallery: {
          alt: string;
          url: string;
        }[];
      }
    }
  }


  // ---------- ION PAGE
  ionPageModel: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
  	ionPage: {
      ionS1HeadingBodyButtonsVideo: {
        gallery: {
          alt: string;
          url: string;
    
          video: {
            muxPlaybackId: string;
            blurUpThumb: string;
            title: string;
            width: number;
            height: number;
          };
        }[];
        heading: string;
        body: string;
        button1: string;
      }
      ionS2HeadingBody: {
        heading: string;
        body: string;
      }
      ionS3Heading: {
        heading: string;
      }
      ionS3SubheadingBodyImage: {
        subheading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        }
      }[];
      ionS4Image: {
        alt: string;
        url: string;
      }[];
      ionS4Video: {
        video: {
          muxPlaybackId: string;
          title: string;
          width: number;
          height: number;
        };
      };
      ionS5HeadingBody: {
        heading: string;
        body: string;
      }
      ionS5HeadingBodyGallery: {
        heading: string;
        body: string;
        images: {
          alt: string;
          url: string;
        }[];
      }[];
      ionS6Heading: {
        heading: string;
      }
      ionS6SubheadingBodyImage: {
        subheading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        }
      }[];
      ionS7Heading: {
        heading: string;
      }
      ionS7Gallery: {
        gallery: {
          alt: string;
          url: string;
        }[];
      }[];
      ionS8Heading: {
        heading: string;
      }
      ionS8SubheadingBody: {
        subheading: string;
        body: string;
      }[];
      ionS9HeadingButtonImage: {
        heading: string;
        button: string;
        image: {
          alt: string;
          url: string;
        }
      }
    }
  }


  // ---------- EXPOX PAGE
  expoxPageModel: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
    expoxPage: {
      expoxS1HeadingBodyButtonsGallery: {
        heading: string;
        body: string;
        button1: string;
        button2: string;
        gallery: {
          alt: string;
          url: string;
        }[];
      };
      expoxS2HeadingBody: {
        heading: string;
        body: string;
      };
      expoxS3Heading: {
        heading: string;
      }
      expoxS3SubheadingBodyImage: {
        subheading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        }
      }[];
      expoxS4Image: {
        image: {
          alt: string;
          url: string;
        }
      }
      expoxS4Heading: {
        heading: string;
      };
      expoxS4SubheadingBodyGallery: {
        subheading: string;
        body: string;
        gallery: {
          alt: string;
          url: string;
        }[];
      }[];
      expoxS5HeadingImage: {
        heading: string;
        image: {
          alt: string;
          url: string;
        };
      };
      expoxS5SubheadingBody: {
        subheading: string;
        body: string;
      }[];
      expoxS6Heading: {
        heading: string;
      };
      expoxS6SubheadingBodyImage: {
        subheading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        };
      }[];
      expoxS7HeadingSubheadingButtonImage: {
        heading: string;
        body: string;
        body2: string;
        button: string;
        button2: string;
        image: {
          alt: string;
          url: string;
        };
      };
    }
  }


  // ---------- ABOUT PAGE V2
	aboutPageModel: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
    aboutPage: {
      aboutS1HeadingBodyImage: {
        heading: string;
        body: string;
        image: {
          alt: string;
          url: string;
        }
      }
      aboutS2BodyVideo: {
        body: string;
        videoUrl: string;
      }
      aboutS3HeadingBody: {
        heading: string;
        body: string;
      }
      aboutS4HeadingGallery: {
        heading: string;
        gallery: {
          alt: string;
          url: string;
          customData: {
            link: string;
            dataType: string;
          }
        }[];
      }
    }
  }


  // ---------- PROJECTS PAGE
	projectsListingPageModel: {
    // _allProjectListingPageHeadingBodyLocales: {
    //   locale: string;
    //   value: string;
    // }[];
    projectListingPageHeadingBody: string;

    projectListingPageEachProject: {
      projectListingPageProjectImage: {
        alt: string;
        url: string;
      }
      projectListingPageProjectHeading: string;
      projectListingPageProjectLink: string;
      projectTitleMetadata: string;
      projectDescMetadata: string;
    }[];

    itProjectListingModel: {
      heading: string;
      subheading: string;
      body: string;
      accordianTitleAccordianBody: {
        subheading: string;
        body: string;
      };
      image: {
        alt: string;
        url: string;
      }
    }[];

    // EN : Projects page model
    _allProjectListingPageEachProjectLocales: {
      locale: string;
      value: {
        projectListingPageProjectImage: {
          alt: string;
          url: string;
        }
        projectListingPageProjectHeading: string;
        projectListingPageProjectLink: string;
        projectTitleMetadata: string;
        projectDescMetadata: string;
        projectS1HeadingSubheadingImage: {
          heading: string;
          subheading: string;
          gallery: {
            alt: string;
            url: string;
          }[];
        }
        projectS2HeadingBodyImageVideoListitems: {
          heading: string;
          body: string;
          images: {
            alt: string;
            url: string;
          }[];
          videoUrl: string;
          listItems: string;
        }[];
        projectS3Heading: {
          heading: string;
        }
        projectS3BodyImage: {
					body: string;
          gallery: {
            alt: string;
            url: string;
          }
        }[];
        projectS4ImageDescImagesHeadingBody: {
          heading: string;
          body: string;
          images: {
            alt: string;
            url: string;
          }[];
          imagesDesc: string;
        }
        projectS5HeadingImagesBody: {
          heading: string;
          gallery: {
            alt: string;
            url: string;
          }[];
          image: {
            video: {
              muxPlaybackId: string;
              title: string;
              width: string;
              height: string;
              blurUpThumb: string;
            }[];
          };
          body: string;
          image2: {
            video: {
              muxPlaybackId: string;
              title: string;
              width: string;
              height: string;
              blurUpThumb: string;
            }[];
          };
          body2: string;
        }[];
        projectS6Heading: {
					heading: string;
        }
        projectS6Body: {
          body: string;
        }[];
        prevNextArticle: {
          prevArticle: string;
          prevArrow: {
            alt: string;
            url: string;
          }
          nextArticle: string;
          nextArrow: {
            alt: string;
            url: string;
          }
        }
      }[];
    }[];
  }


  // ---------- BLOG PAGE
	blogPageHeadingModel: {
    blogListingPageHeading: string;
    blogListingPageSubheading: string;
  }

	allBlogPageModels: {
    title: string;
    slug: string;
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
    blogPage: {
      blogArticleImage: {
        alt: string;
        url: string;
      }
      blogArticleDate: string;
      blogArticleTitleMetadata: string;
      blogArticleDescMetadata: string;
      blogArticleButton: string;
      heading: string;
      blogLink: string;
      body: string;
      nextBlogLink: string;
    }[];
  }[];


  // ---------- CAREERS PAGE
	careersPage: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
		heroImage: {
      alt: string;
      url: string;
    }
    heading: string;
    body: string;
    unsolicitedApplication: string;
    unsolicitedApplicationSentence: string;
  }


  // ---------- CONTACTS PAGE
  // contactsPage: {
  //   headingBody: string;
  // }
	contactsPageModel: {
    _allSlugLocales: {
      locale: string;
      value: string;
    }[];
    contactPage: {
      heading: string;
      body: string;
    }
  }
};



// ---------- FORM DATA TYPES
export type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  message: string;
  nextjs_how_did_you_find_out_about_us?: string[];
};

export type MitFormData = {
  name_and_surname: string;
  museum_company: string;
  email: string;
  mit_features?: string[];
  other: string;
  your_number_of_visitors_per_year: string;
};

export type IonFormData = {
  name_and_surname: string;
  company: string;
  email: string;
  surface_you_want_to_map__sq__ft_: string;
  which_kind_of_navigation_you_want_to_use: string;
  additional_information: string;
};

export type ExpoxFormData = {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  expox_features?: string[];
  surface_you_want_to_map__sq__ft_: string;
  message: string;
};