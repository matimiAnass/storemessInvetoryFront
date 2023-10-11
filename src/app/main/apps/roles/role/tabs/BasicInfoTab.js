import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name="Role"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Role"
            autoFocus
            id="role"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="Permissions"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="permissions"
            label="Permissions"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
