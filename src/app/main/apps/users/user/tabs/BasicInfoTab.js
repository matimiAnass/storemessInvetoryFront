import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getListRoles, saveUser, selectUser, setUserUpdated } from '../../store/userSlice';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { getUsers } from '../../store/usersSlice';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSlotProps } from '@mui/base';

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
  const [phone, setPhone] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [roles, setRoles] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector(selectUser);
  const userUpdated = data?.userUpdated
  const [userObjectUpdated,setUserObjectUpdated] = useState({});
  let nbr = 0;
  let cntr = 0;
  const [ifTrue, setIfTrue] = useState(false);
  const [list, setList] = useState([]);
  const [password, setPassword] = useState();
  const [visible, setVisible] = useState(false);


  useEffect(()=>{
    if (ifTrue && data?.roles?.length !== 0) {
    let loadList = [];
      cntr += 1
      if(cntr <=1 ) {
        for (let i = 0; i < roles?.length; i++) {
          loadList.push(roles[i]);
        }
      }
      setList(loadList);
    }
  },[list,roles])

  useEffect(()=>{
    if(data?.user !== undefined) {
      setUsername(() => (data?.user?.username))
      setName(() => (data?.user?.name))
      setEmail(() => (data?.user?.email))
      setType(() => (data?.user?.type))
      setStatus(() => (data?.user?.status))
      setAvatar(() => (data?.user?.avatar))
      setPhone(() => (data?.user?.phone))
      setGender(() => (data?.user?.gender))
      setRole(() => (data?.user?.role))
    }
    else{
      setUsername(() => (''))
      setName(() => (''))
      setEmail(() => (''))
      setType(() => (''))
      setStatus(() => (''))
      setAvatar(() => (''))
      setPhone(() => (''))
      setGender(() => (''))
      setRole(() => (''))
    }
    dispatch(getListRoles());
  },[])

  useEffect(()=>{
    if (data?.roles?.length !== 0){
      setRoles(data?.roles);
      setIfTrue(true);
    }
  },[roles,data?.roles])

  useEffect(()=>{
    if(data?.user !== undefined) {
      setVisible(true);
    }
  },[visible,data?.user])


  useEffect(()=>{
    setUserObjectUpdated((v)=>
      ({...v,id:data?.user?.id,username:username, name:name, phone:phone, gender:gender, role:role, email:email, type:type, status:status, avatar:avatar}))
  },[userObjectUpdated])


  let handleLabelAvatar = event => {
    setAvatar(event.target.value)
    setUserObjectUpdated((v)=>({...v,avatar:event.target.value}))
      dispatch(setUserUpdated((v)=>({...v,username:event.target.value})));
  };
  let handleLabelUsername = event => {
    setUsername(event.target.value)
    setUserObjectUpdated((v)=>({...v,username:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,username:event.target.value})));
  };
  let handleLabelName = event => {
    setName(event.target.value)
    setUserObjectUpdated((v)=>({...v,name:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,name:event.target.value})));
  };
  let handleLabelEmail = event => {
    setEmail(event.target.value)
    setUserObjectUpdated((v)=>({...v,email:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,email:event.target.value})));
  };
  let handleLabelType = event => {
    setType(event.target.value)
    setUserObjectUpdated((v)=>({...v,type:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,type:event.target.value})));

  };
  let handleLabelStatus = event => {
    let statut = 0;
    if (event.target.checked){
        statut = 1;
    }
    setStatus(statut)
    setUserObjectUpdated((v)=>({...v,status:statut}))
    dispatch(setUserUpdated((v)=>({...v,status:statut})));
  };
  let handleLabelPhone = event => {
    setPhone(event.target.value)
    setUserObjectUpdated((v)=>({...v,phone:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,phone:event.target.value})));
  };
  let handleLabelGender = event => {
    setGender(event.target.value)
    setUserObjectUpdated((v)=>({...v,gender:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,gender:event.target.value})));
  };
  let handleLabelRole = event => {
    setRole(event.target.value)
    setUserObjectUpdated((v)=>({...v,role:event.target.value}))
    dispatch(setUserUpdated((v)=>({...v,role:event.target.value})));
  };
  let handleLabelPassword = event => {
    if (!visible) {
      setPassword(event.target.value)
      setUserObjectUpdated((v) => ({ ...v, password: event.target.value }))
      dispatch(setUserUpdated((v) => ({ ...v, password: event.target.value })));
    }
  };
  useEffect(()=>{
    Object.values(userObjectUpdated).map((val)=>{if(val!==undefined) nbr++ })
    if ( userUpdated && Object.keys(userUpdated).length === 0 && nbr === 10) {
      dispatch(setUserUpdated(userObjectUpdated));
    }
    if (!visible && userUpdated && Object.keys(userUpdated).length === 0 && nbr === 11){
      dispatch(setUserUpdated(userObjectUpdated));
    }
  },[userObjectUpdated])



  return (
    <div>
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
        name="Password"
        control={control}
        render={({ field }) => (
          <TextField
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Password"
            value={password || ""}
            onChange={handleLabelPassword}
            autoFocus
            type={'password'}
            id="password"
            disabled={visible}
            variant="outlined"
            fullWidth
          />
        )}
      />
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
        name="Phone"
        control={control}
        render={({ field }) => (
          <TextField
            className="mt-8 mb-16"
            id="phone"
            onChange={handleLabelPhone}
            label="Phone"
            value={phone || ""}
            type="text"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="Gender"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
            {...field}
            className="mt-8 mb-16"
            id="gender"
            onChange={handleLabelGender}
            label="Gender"
            value={gender || ""}
            variant="outlined"
            fullWidth
          >
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
          </FormControl>
        )}
      />
      <Controller
        name="Role"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            {...field}
            defaultValue = ""
            className="mt-8 mb-16"
            id="role"
            onChange={handleLabelRole}
            label="Role"
            value={role || ""}
            variant="outlined"
            fullWidth
          >
            { list?.map((item)=>{
              return(
            <MenuItem key={item} value={item}>{item}</MenuItem>
              )})}
          </Select>
          </FormControl>
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
          <FormControlLabel
            label={'Is Active'}
            className='custom-checkbox ml-1'
            control={
              <Checkbox  onChange={handleLabelStatus} checked={status === 1 }
                        value={status || ""} className='form-check-input custom-control-input' />
            }
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
