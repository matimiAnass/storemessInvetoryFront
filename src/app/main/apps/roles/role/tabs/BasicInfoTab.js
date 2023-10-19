import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import Label from '@mui/icons-material/Label';
import FormControlLabel from '@mui/material/FormControlLabel';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Controller
        name='Role'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className='mt-8 mb-16 min-w-lg'
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label='Role'
            autoFocus
            id='role'
            variant='outlined'
            fullWidth
          />
        )}
      />

      {/*<Controller*/}
      {/*  name="Permissions"*/}
      {/*  control={control}*/}
      {/*  render={({ field }) => (*/}
      {/*    <TextField*/}
      {/*      {...field}*/}
      {/*      className='mt-8 mb-16'*/}
      {/*      id='permissions'*/}
      {/*      label='Permissions'*/}
      {/*      type='text'*/}
      {/*      variant='outlined'*/}
      {/*      fullWidth*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      <Controller
        name='Permissions'
        control={control}
        render={({ field }) => (
          <Table stickyHeader className='min-w-lg' aria-labelledby='tableTitle'>
            <TableHead style={{ backgroundColor: 'white' }}>
              <TableRow className='h-100 w-100 sm:h-100'>
                <TableCell
                  align='center'
                  className=''>
                  Module</TableCell>

                <TableCell align='center'
                           className=''>
                  Permissions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                className='h-72 cursor-pointer'
                hover
                role='checkbox'
              >
                <TableCell align='right' className='w-40 md:w-64 row' padding='none'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Role'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableCell>
                <TableCell align='right' className='w-40 md:w-64 row' component='td'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Manage'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Create'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Edit'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Delete'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
              <TableRow
                className='h-72 cursor-pointer'
                hover
                role='checkbox'
              >
                <TableCell align='right' className='w-40 md:w-64 row' padding='none'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'User'}
                        control={
                          <Checkbox />
                        }
                      /></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell align='right' className='w-40 md:w-64 row' component='td'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Manage'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Create'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Edit'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Delete'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Show'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
              <TableRow
                className='h-72 cursor-pointer'
                hover
                role='checkbox'
              >
                <TableCell align='right' className='w-40 md:w-64 row' padding='none'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Account'}
                        control={
                          <Checkbox />
                        }
                      /></TableCell>
                  </TableRow>
                </TableCell>
                <TableCell align='right' className='w-40 md:w-64 row' component='td'>
                  <TableRow>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Manage'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Create'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Edit'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Delete'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                    <TableCell className=''>
                      <FormControlLabel
                        label={'Show'}
                        control={
                          <Checkbox />
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

        )}
      />

    </div>
  );
}

export default BasicInfoTab;
