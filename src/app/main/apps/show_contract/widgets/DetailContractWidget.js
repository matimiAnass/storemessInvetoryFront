import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';

function DetailContractWidget() {
  // const widgets = useSelector(selectWidgets);
  // const { data, ranges, currentRange: currentRangeDefault } = widgets?.summary;
  //
  // const [currentRange, setCurrentRange] = useState(currentRangeDefault);
  //
  // function handleChangeRange(ev) {
  //   setCurrentRange(ev.target.value);
  // }

  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden' style={{backgroundColor:rgb(241,245,249)}}>
      <div className='flex items-center justify-between px-8 pt-11'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
          color='text.secondary'
        >
          {'Contract Details'}
        </Typography>
        <IconButton aria-label='more' size='large'>
          <FuseSvgIcon className="list-item-icon" color="disabled">
            heroicons-outline:flag
          </FuseSvgIcon>
        </IconButton>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
        <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Name'}</Typography>
        <Typography className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'>
          {'Work Contract'}
        </Typography>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
      <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Client Name'}</Typography>
        <Typography className='text-md sm:text-lg font-bold text-blue-500 col-sm pr-24'>
          {'messanass'}
        </Typography>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
      <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Type'}</Typography>
        <Typography className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'>
          {'Stage'}
        </Typography>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
      <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Value'}</Typography>
        <Typography className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'>
          {'$80,000.00'}
        </Typography>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
      <Typography className='text-md font-medium col-sm' color='text.secondary'>{'Start Date'}</Typography>
        <Typography className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'>
          {'Nov 15, 2023'}
        </Typography>
      </div>
      <div className="flex items-center w-full pl-48 pb-7 justify-between">
      <Typography className='text-md font-medium col-sm' color='text.secondary'>{'End Date'}</Typography>
        <Typography className='text-md sm:text-lg font-bold tracking-tight leading-none text-blue-500 col-sm pr-24'>
          {'Mar 31, 2024'}
        </Typography>
      </div>
    </Paper>

  );
}

export default memo(DetailContractWidget);
