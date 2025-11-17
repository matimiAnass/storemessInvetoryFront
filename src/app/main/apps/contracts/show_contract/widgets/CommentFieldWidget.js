import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { rgb } from 'polished';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import { Link, useParams } from 'react-router-dom';
import './Iconstyle.css'
import { commentStore, getComments, getFilesAttachement, selectContract } from '../../store/contractSlice';
import { useFormContext } from 'react-hook-form';
import MailAttachment from '../../../mailbox/MailAttachment';
import { makeStyles } from '@mui/styles';
import { selectUser } from 'app/store/userSlice';
import { Avatar } from '@mui/material';


function CommentFieldWidget(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const routeParams = useParams();
  const [comment, setComment] = useState({});
  const { getValues, formState, control } = methods;
  const data = useSelector(selectContract);
  const user = useSelector(selectUser);
  console.log("🚀 ~ CommentFieldWidget ~ user:", process.env.REACT_APP_BACKEND_URL)

  const useStyles = makeStyles((theme) => ({
    comment: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  useEffect(()=>
  {
    //get the files contracts
    dispatch(getComments(routeParams.contractId));
  },[dispatch,routeParams])

  function handleSaveComment(text:any) {
    dispatch(commentStore({ comment :text })).then(() => {
      // window.location.reload(true);
    dispatch(getComments(routeParams.contractId));


      // props.navigate(`/apps/contracts/contractsList/${item.id}/${item.client_name}`);
// 
    });
  }


   

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
        onBlur={(event: any) => setComment(event.target.value)}
      />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        <Button
          className="float-right mt-10"
          component={Link}
          onClick={(event: any) => handleSaveComment(comment)}
          // to="/apps/contracts/contractsDetails/new"
          variant="contained"
          color="secondary"

          startIcon={<FuseSvgIcon className="my-class ml-16">heroicons-outline:paper-airplane</FuseSvgIcon>}
        >
        </Button>
      </motion.div>
      <div className="pt-8">
        {data.comments?.data.map((c) => {
          return (<Paper className={classes.comment} elevation={3} key={c.id}>
            <Avatar className="md:mx-4" alt="user photo" src={user.photoURL} />
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {user.displayName}
              </Typography>
              <Typography variant="body1">{c.comment}</Typography>
            </div>
          </Paper>);
            })}
          </div>

    </Paper>
  );
}

export default memo(CommentFieldWidget);
