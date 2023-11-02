import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserUpdated } from '../../store/userSlice';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();
  const data = useSelector(selectUser);
  const userUpdated = data.userUpdated
  const [userObjectUpdated,setUserObjectUpdated] = useState({});
  let nbr = 0;


  useEffect(()=>{
    setUsername(()=>(data.user?.username))
    setName(()=>(data.user?.name))
    setEmail(()=>(data.user?.email))
    setType(()=>(data.user?.type))
    setStatus(()=>(data.user?.status))
    setAvatar(()=>(data.user?.avatar))
  },[])

  useEffect(()=>{
    setUserObjectUpdated((v)=>({...v,id:data.user?.id,username:username, name:name, email:email, type:type, status:status, avatar:avatar}))
  },[userObjectUpdated])


  let handleLabelAvatar = event => {
    setAvatar(event.target.value)
    setUserObjectUpdated((v)=>({...v,avatar:event.target.value}))
  };
  let handleLabelUsername = event => {
    setUsername(event.target.value)
    setUserObjectUpdated((v)=>({...v,username:event.target.value}))
  };
  let handleLabelName = event => {
    setName(event.target.value)
    setUserObjectUpdated((v)=>({...v,name:event.target.value}))

  };
  let handleLabelEmail = event => {
    setEmail(event.target.value)
    setUserObjectUpdated((v)=>({...v,email:event.target.value}))

  };
  let handleLabelType = event => {
    setType(event.target.value)
    setUserObjectUpdated((v)=>({...v,type:event.target.value}))

  };
  let handleLabelStatus = event => {
    setStatus(event.target.value)
    setUserObjectUpdated((v)=>({...v,status:event.target.value}))

  };
  useEffect(()=>{
    Object.values(userObjectUpdated).map((val)=>{if(val!==undefined) nbr++ })
    if (Object.keys(userUpdated).length === 0 && nbr === 7) {
      dispatch(setUserUpdated(userObjectUpdated));
    }
  },[userObjectUpdated])

  return (
    <div>
      <Controller
        name="Avatar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Avatar"
            value = {avatar || ""}
            onChange = {handleLabelAvatar}
            autoFocus
            id="avatar"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Username"
        control={control}
        render={({ field }) => (
          <TextField
          {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            value={username || ""}
            onChange={handleLabelUsername}
            label="Username"
            autoFocus
            id="username"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Name"
        control={control}
        render={({ field }) => (
          <TextField
          {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            value={name || ""}
            onChange={handleLabelName}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Email"
        control={control}
        render={({ field }) => (
          <TextField
          {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Email"
            value={email || ""}
            onChange={handleLabelEmail}
            autoFocus
            id="email"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="Type"
        control={control}
        render={({ field }) => (
          <TextField
          {...field}
            className="mt-8 mb-16"
            id="type"
            label="Type"
            value={type || ""}
            onChange={handleLabelType}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Status"
        control={control}
        render={({ field }) => (
          <TextField
          {...field}
            className="mt-8 mb-16"
            id="status"
            label="Status"
            value={status || ""}
            onChange={handleLabelStatus}
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
