import { TypographyOptions } from '@mui/material/styles/createTypography';

const typography: TypographyOptions = {
  fontFamily: [
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif'
  ].join(','),
  h1: {
    fontSize: '2.5rem',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '32px',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  body1: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.43,
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'none',
  },


};

export default typography;