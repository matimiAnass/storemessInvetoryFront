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
        name="Avatar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Avatar"
            autoFocus
            id="avatar"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Username"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="User Name"
            autoFocus
            id="username"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Email"
            autoFocus
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="Type"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="type"
            label="Type"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
