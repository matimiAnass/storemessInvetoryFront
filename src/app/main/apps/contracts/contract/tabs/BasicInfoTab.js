import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { DateField, DatePicker } from '@mui/x-date-pickers';
import { parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import moment from 'moment';
import dayjs from 'dayjs';
import { getDropdownList } from '../../store/contractSlice';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function BasicInfoTab(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { control, formState } = methods;
  const [contracts, setContracts] = useState({});
  const [clients, setClients] = useState({});
  const { errors } = formState;

  useEffect(()=>{
    dispatch(getDropdownList()).then((action) => {
      if (action.payload) {
        setContracts(action.payload.contractTypes);
        setClients(action.payload.clients);
      }
    });
  },[dispatch])

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
        render={({ field: { onChange, onBlur, value }  }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Client Name</InputLabel>
            <Select
              className="mt-8 mb-16"
              error={!!errors.name}
              required
              value={value || ""}
              onBlur={onBlur}
              onChange={onChange}
              autoFocus
              id="client_name"
              variant="outlined"
              fullWidth
            >
              {Object.entries(clients).map(([key, element])=>{
              return (<MenuItem key={key} value={element}>{element}</MenuItem>)
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
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Type"
            autoFocus
            id="type"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="start_date"
        control={control}
        render={({ field: { onChange, onBlur, value } }) =>
          (
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
        )
        }
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
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="status"
            label="Status"
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
