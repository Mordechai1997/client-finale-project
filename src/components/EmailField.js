import EmailIcon from '@mui/icons-material/Mail';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export function EmailField({ id, value, setValue, label, disabled = false, required = false, errorMessage = '' }) {

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="email"
        disabled={disabled ? true : false}
        endAdornment={
          <InputAdornment position="end">
            {required && <span style={{ color: "red" }}>*</span>}
            <EmailIcon
              sx={{ m: 1 }}
            />

          </InputAdornment>
        }
      />
      {errorMessage && <span style={{ color: "red", fontSize: 'small' }}>{errorMessage}</span>}
    </FormControl>
  )
}