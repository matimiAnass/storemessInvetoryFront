import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Iconstyle.css'

function CommentFieldWidget() {

  return (
    <Paper className='flex flex-col flex-auto shadow rounded-2xl overflow-hidden'
           style={{ backgroundColor: rgb(241, 245, 249) }}>
      <div className='flex items-center justify-between px-8 pt-12'>
        <Typography
          className='px-16 text-lg font-medium tracking-tight leading-6 truncate'
          color='text.secondary'
        >
          {'Comments'}
        </Typography>
      </div>
        <TextField
          className='m-16'
          id='comments'
          label='Add a comment'
          type='text'
          multiline
          rows={5}
          variant='outlined'
        />
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

          startIcon={<FuseSvgIcon className="my-class ml-16" >heroicons-outline:paper-airplane</FuseSvgIcon>}
        >
          </Button>
      </motion.div>

    </Paper>
  );
}
export default memo(CommentFieldWidget);