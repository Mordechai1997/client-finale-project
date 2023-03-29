import Box from '@mui/material/Box';

export default function Form({children}) {

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { mt: 3, width: '85%' },
      }}
      noValidate
      autoComplete="on"
      className='form-login'
    >
     {children}
    </Box>
  );
}

