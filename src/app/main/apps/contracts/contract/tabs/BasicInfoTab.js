import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDropdownList } from '../../store/contractSlice';

function BasicInfoTab(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [contracts, setContracts] = useState({});
  const [clients, setClients] = useState({});

  useEffect(() => {
    dispatch(getDropdownList()).then((action) => {
      if (action.payload) {
        setContracts(action.payload.contractTypes);
        setClients(action.payload.clients);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <Controller
        name="name"
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
        name="client_name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
            <Select
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              displayEmpty
              value={value}
              defaultValue=""
              onBlur={onBlur}
              onChange={onChange}
              autoFocus
              id="client_name"
              variant="outlined"
              fullWidth
            >
              <MenuItem key={0} disabled value="choose">
                Choose Client
              </MenuItem>
              {Object.entries(clients).map(([key, element]) => {
                return (
                  <MenuItem key={key} value={element}>
                    {element}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Value"
            autoFocus
            id="value"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="type"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
            <Select
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              displayEmpty
              value={value}
              defaultValue="choose"
              onBlur={onBlur}
              onChange={onChange}
              autoFocus
              id="type"
              variant="outlined"
              fullWidth
            >
              {Object.entries(contracts).map(([key, element]) => {
                return (
                  <MenuItem key={key} value={element}>
                    {element}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="start_date"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePicker
            className="mt-8 mb-16"
            id="start_date"
            label="Start Date"
            value={Date.parse(value)}
            onBlur={onBlur}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="end_date"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePicker
            className="mt-8 mb-16"
            id="end_date"
            label="End Date"
            value={Date.parse(value)}
            onBlur={onBlur}
            onChange={onChange}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              displayEmpty
              value={value}
              defaultValue="choose"
              onBlur={onBlur}
              onChange={onChange}
              autoFocus
              id="status"
              variant="outlined"
              fullWidth
            >
              <MenuItem key={1} value="Start">
                Start
              </MenuItem>
              <MenuItem key={2} value="Close">
                Close
              </MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
