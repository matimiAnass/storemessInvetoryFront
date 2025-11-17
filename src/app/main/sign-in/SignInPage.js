import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 8 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: false,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    setValue('email', '****', { shouldDirty: true, shouldValidate: true });
    setValue('password', '****', { shouldDirty: true, shouldValidate: true });
  }, [setValue]);

  function onSubmit({ email, password }) {
    jwtService
      .signInWithEmailAndPassword(email, password)
      // .then((user) => {
        // No need to do anything, users data will be set at app/auth/AuthContext
      // })
      // .catch((_errors) => {
      //   _errors?.forEach ? _errors.forEach((error) => {
      //     setError(error.type, {
      //       type: 'manual',
      //       message: error.message,
      //     });
      //   }) : _errors.message;
      // });
  }

  return (
    <div className='flex flex-col flex-auto items-center sm:justify-center min-w-0 md:p-32' style={{ backgroundColor: '#0D0907' }}>
      <Paper
        className='flex w-full sm:w-auto min-h-full p-32 sm:min-h-auto md:w-full md:max-w-6xl rounded-0 sm:rounded-2xl sm:shadow overflow-hidden'
        style={{ backgroundColor: '#0D0907' }} >
        <div className='w-full sm:w-auto py-32 px-16 sm:p-48 md:p-64 ltr:border-r-1 rtl:border-l-1 text-white'>
          <div className='w-full max-w-320 sm:w-320 mx-auto sm:mx-0'>
            {/* <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" /> */}

            <Typography className='mt-32 text-4xl font-extrabold tracking-tight leading-tight'>
              Sign in
            </Typography>
            <div className='flex items-baseline mt-2 font-medium'>
              {/* <Typography>Don't have an account?</Typography> */}
              {/* <Link className='ml-4' to='/sign-up'> */}
              {/*   Sign up */}
              {/* </Link> */}
            </div>

            <form
              name='loginForm'
              noValidate
              className='flex flex-col justify-center w-full mt-32'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className='mb-24'
                    label='Email'
                    autoFocus
                    type='email'
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                    variant='outlined'
                    required
                    fullWidth
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'white', // change input text color
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white', // change label color
                      }
                    }}
                  />
                )}
              />


              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className='mb-24'
                    label='Password'
                    type='password'
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant='outlined'
                    required
                    fullWidth
                    sx={{
                      '& .MuiInputBase-input': {
                        color: 'white', // input text color
                      },
                      '& .MuiFormLabel-root': {
                        color: 'white', // label color
                      },
                    }}
                  />
                )}
              />


              {/* <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between'> */}
              {/*   <Controller */}
              {/*     name='remember' */}
              {/*     control={control} */}
              {/*     render={({ field }) => ( */}
              {/*       <FormControl> */}
              {/*         <FormControlLabel */}
              {/*           label='Remember me' */}
              {/*           control={<Checkbox size='small' {...field} />} */}
              {/*         /> */}
              {/*       </FormControl> */}
              {/*     )} */}
              {/*   /> */}

              {/*   <Link className='text-md font-medium' to='/pages/auth/forgot-password'> */}
              {/*     Forgot password? */}
              {/*   </Link> */}
              {/* </div> */}

              <Button
                variant='contained'
                color='secondary'
                className=' w-full mt-16'
                aria-label='Sign in'
                sx={{
                  backgroundColor: '#2B1B17',}}
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type='submit'
                size='large'
              >
                Sign in
              </Button>

              {/* <div className='flex items-center mt-32'> */}
              {/*   <div className='flex-auto mt-px border-t' /> */}
              {/*   <Typography className='mx-8' color='text.secondary'> */}
              {/*     Or continue with */}
              {/*   </Typography> */}
              {/*   <div className='flex-auto mt-px border-t' /> */}
              {/* </div> */}

              {/* <div className='flex items-center mt-32 space-x-16'> */}
              {/*   <Button variant='outlined' className='flex-auto'> */}
              {/*     <FuseSvgIcon size={20} color='action'> */}
              {/*       feather:facebook */}
              {/*     </FuseSvgIcon> */}
              {/*   </Button> */}
              {/*   <Button variant='outlined' className='flex-auto'> */}
              {/*     <FuseSvgIcon size={20} color='action'> */}
              {/*       feather:twitter */}
              {/*     </FuseSvgIcon> */}
              {/*   </Button> */}
              {/*   <Button variant='outlined' className='flex-auto'> */}
              {/*     <FuseSvgIcon size={20} color='action'> */}
              {/*       feather:github */}
              {/*     </FuseSvgIcon> */}
              {/*   </Button> */}
              {/* </div> */}
            </form>
          </div>
        </div>

        <Box
          className='relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden'
          sx={{
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
          }}
        >
          {/* Decorative infinity symbol */}
          <svg
            className='absolute inset-0 pointer-events-none opacity-15'
            viewBox='0 0 960 540'
            width='100%'
            height='100%'
            preserveAspectRatio='xMidYMid meet'
            xmlns='http://www.w3.org/2000/svg'
          >
            <text
              x='50%'
              y='80%'
              textAnchor='middle'
              dominantBaseline='middle'
              fontSize='1680'
              fill='#1E120F'
              fontWeight='bold'
              fontFamily='sans-serif'
            >
              ∞
            </text>
          </svg>

          {/* Optional top-right pattern for subtle texture */}
          <Box className='absolute -top-64 -right-64 opacity-10'

                          component='svg'
            sx={{ color: 'white' }}
            viewBox='0 0 220 192'
            width='220px'
            height='192px'
            fill='none'
          >
            <defs>
              <pattern
                id='pattern-bg'
                x='0'
                y='0'
                width='20'
                height='20'
                patternUnits='userSpaceOnUse'
              >
                <rect x='0' y='0' width='4' height='4' fill='currentColor' />
              </pattern>
            </defs>
            <rect width='220' height='192' fill='url(#pattern-bg)' />
          </Box>

          {/* Text content */}
          <div className='z-10 relative w-full max-w-2xl'>
            <div className='text-7xl font-bold leading-none text-gray-100'>
              <div>Storemess Pos Inventory Management</div>
            </div>
            <div className='mt-24 text-lg tracking-tight leading-6 text-gray-200'>
              Storemess inventory is a best choice for your company stock management
            </div>
          </div>
        </Box>
      </Paper>
    </div>
  );
}

export default SignInPage;
