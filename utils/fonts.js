import { 
  Open_Sans, 
  Raleway, 
} from 'next/font/google';


export const open_sans = Open_Sans({
  subsets: ['latin'],
  variants: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  }
});

export const raleway = Raleway({
  subsets: ['latin'],
  variants: {
    regular: 400,
    bold: 800,
    extrabold: 800,
    black: 900
  }
});