import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import { useParams } from 'react-router-dom';
import { countersWidgets } from '../../store/contractSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { useFormContext } from 'react-hook-form';

function NoteWidget() {
  const methods = useFormContext();
  const { getValues, formState, control } = methods;


  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden' style={{backgroundColor:rgb(241,245,249)}}>
      <div className='flex items-center justify-between px-8 pt-12'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
          color='text.secondary'
        >
          {'Notes'}
        </Typography>
        <IconButton aria-label='more' size='large'>
          <FuseSvgIcon className="list-item-icon" color="disabled">
            heroicons-outline:pencil-alt
          </FuseSvgIcon>
        </IconButton>
      </div>
      <div className='text-center mt-8'>
        <Typography className='text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500'>
          {getValues().Notes}
        </Typography>
        <Typography className='text-lg font-medium text-blue-600 dark:text-blue-500'>{'Notes'}</Typography>
      </div>
      <Typography
        className='flex items-baseline justify-center w-full mt-20 mb-24'
        color='text.secondary'
      >
        <span className='truncate'>{'Last month\'s'}</span>:
        <b className='px-8'>{45}</b>
      </Typography>
    </Paper>
  );
}

export default memo(NoteWidget);
