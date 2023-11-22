import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import Button from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';
import FuseLoading from '@fuse/core/FuseLoading';
import { descriptionStore, saveContract } from '../../store/contractSlice';
import { useDispatch } from 'react-redux';

function DetailContractWidget(contract) {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { getValues, formState, control } = methods;
  const routeParams = useParams();
  const navigate = useNavigate();



  function handleSaveDescription() {
    dispatch(descriptionStore({ description :getValues().description })).then(() => {
      window.location.reload(true);
    });
  }




  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
           style={{backgroundColor:rgb(241,245,249)}}>
      <div className='flex items-center justify-between px-8 pt-11'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate pb-11'
          color='text.secondary'
        >
          {'Contract Description'}
        </Typography>
      </div>
      <WYSIWYGEditor  />
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
      <Button
        className="float-right mt-10"
        onClick={handleSaveDescription}
        variant="contained"
        color="secondary"
        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
      >
        Save  </Button>
        </motion.div>
      </Paper>
  );
}

export default memo(DetailContractWidget);
