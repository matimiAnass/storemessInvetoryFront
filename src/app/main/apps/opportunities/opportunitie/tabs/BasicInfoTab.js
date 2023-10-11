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
        name="Account"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="accounts"
            label="Accounts"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Stage"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="stage"
            label="Stage"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Amount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="amount"
            label="Amount"
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="AssignedUser"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="assignedUser"
            label="Assigned User"
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
