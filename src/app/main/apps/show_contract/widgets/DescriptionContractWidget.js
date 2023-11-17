import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import WYSIWYGEditor from 'app/shared-components/WYSIWYGEditor';

function DetailContractWidget() {
  const [textArea, setTextArea] = useState('');

  let handleLabelTextArea = event => {
    setTextArea(event.target.value);
  };

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
      <form noValidate onSubmit={''} className="flex flex-col">
         <WYSIWYGEditor key={0}  onchange={handleLabelTextArea} value={textArea}  />
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
      <Button
        className="float-right mt-10"
        component={Link}
        to="/apps/contracts/contractsDetails/new"
        variant="contained"
        color="secondary"

        startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
      >
        Add  </Button>
        </motion.div>

      </form>
      </Paper>
  );
}

export default memo(DetailContractWidget);
