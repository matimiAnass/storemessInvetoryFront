import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { removeUser, saveUser, selectUser } from '../store/userSlice';
import { useEffect, useState } from 'react';
import _ from 'lodash';

function UserHeader(props) {
  const dispatch = useDispatch();
  const methods = useFormContext();
  const { formState, watch, getValues } = methods;
  const { isValid, dirtyFields } = formState;
  const featuredImageId = watch('featuredImageId');
  const images = watch('images');
  const [state, setState] = useState(false);
  const name = watch('name');
  const theme = useTheme();
  const navigate = useNavigate();
  const data = useSelector(selectUser);


  useEffect(()=>{
    const data_user_compare =
      {id:data?.user?.id,username:data?.user?.username, name:data?.user?.name, phone:data?.user?.phone, gender:data?.user?.gender,
        role:data?.user?.role, email:data?.user?.email, type:data?.user?.type, status:data?.user?.status, avatar:data?.user?.avatar}
    if ( data?.userUpdated && Object.keys(data?.userUpdated).length !== 0){
      if (_.isEqual(data?.userUpdated,data_user_compare)===false){
        setState(true)
      }
      else{
        setState(false)
      }
    }
    if(data?.user === undefined){
      setState(true)
    }
  },[state,data?.userUpdated,data?.user])

  function handleSaveUser() {
    let userData = {username:data?.userUpdated.username,name:data?.userUpdated.name, email:data?.userUpdated.email,
    type:data?.userUpdated.type, status:data?.userUpdated.status, phone:data?.userUpdated.phone, gender:data?.userUpdated.gender,
    role:data?.userUpdated.role, avatar:data?.userUpdated.avatar}
    dispatch(saveUser(userData)).then(()=>{
      window.location.reload(true);
    });
  }

  function handleRemoveUser() {
    dispatch(removeUser()).then(() => {
      navigate('/apps/users');
    });
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/users"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === 'ltr'
                ? 'heroicons-outline:arrow-sm-left'
                : 'heroicons-outline:arrow-sm-right'}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Users</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {data?.user?.username || 'New User'}
            </Typography>
            <Typography variant="caption" className="font-medium">
              User Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
      >
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveUser}
          startIcon={<FuseSvgIcon className="hidden sm:flex">heroicons-outline:trash</FuseSvgIcon>}
        >
          Remove
        </Button>
        <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          disabled={_.state || !state}
          onClick={handleSaveUser}
        >
          Save
        </Button>
      </motion.div>
    </div>
  );
}

export default UserHeader;
