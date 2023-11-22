import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { getContract, getDropdownList } from '../../store/contractSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import InputBase from '@mui/material/InputBase';
import moment from 'moment';

function DetailContractWidget(contract,props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
           style={{ backgroundColor: rgb(241, 245, 249) }}>
      <div className='flex items-center justify-between px-8 pt-11'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
          color='text.secondary'
        >
          {'Contract Details'}
        </Typography>
        <IconButton aria-label='more' size='large'>
          <FuseSvgIcon className='list-item-icon' color='disabled'>
            heroicons-outline:flag
          </FuseSvgIcon>
        </IconButton>
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Name'}</Typography>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <InputBase {...field}
                       className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
            />
          )}
        />
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Client Name'}</Typography>
        <Controller
          name='client_name'
          control={control}
          render={({ field }) => (
        <InputBase {...field}
          className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
        />
          )}
        />
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Type'}</Typography>
        <Controller
          name='type'
          control={control}
          render={({ field }) => (
            <InputBase {...field}
                       className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
            />
          )}
        />
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Value'}</Typography>
        <Controller
          name='value'
          control={control}
          render={({ field }) => (
            <InputBase {...field}
                       className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
            />
          )}
        />
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Start Date'}</Typography>
        <Controller
          name='start_date'
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputBase value={moment(value).format('MMM D, y')}
                       className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
            />
          )}
        />
      </div>
      <div className='flex items-center w-full pl-48 pb-7 justify-between'>
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'End Date'}</Typography>
        <Controller
          name='end_date'
          control={control}
          render={({ field: { onChange, onBlur, value }}) => (
            <InputBase value={moment(value).format('MMM D, y')}
                       className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'
            />
          )}
        />
      </div>
    </Paper>
  );
}

export default memo(DetailContractWidget);
