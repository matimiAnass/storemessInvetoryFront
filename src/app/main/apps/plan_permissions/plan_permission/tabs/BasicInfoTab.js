import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import FormControlLabel from '@mui/material/FormControlLabel';
import _ from '@lodash';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const data =   formState.defaultValues;
  const modules=['Role','User','Account','Contact','Lead', 'Opportunities', 'CommonCase','Meeting','Call','Task','Document', 'Campaign', 'Quote','SalesOrder','Invoice','Product','Report','Payment','Invoice Payment','Product','AccountType','AccountIndustry','LeadSource', 'OpportunitiesStage', 'DocumentFolder','DocumentType','TargetList', 'ProductCategory','ProductBrand','ProductTax','ShippingProvider','TaskStage','DocumentFolder','CampaignType','CaseType','Contract','ContractType'];
  const list_data_no_crud = [];
  data.plan.permissions.map ((permission) => {
        if (permission.includes('Manage'))
          list_data_no_crud.push(permission.split('Manage')[1]);
        if (permission.includes('Create')) {
          list_data_no_crud.push(permission.split('Create')[1]);
        }
        if (permission.includes('Edit'))
          list_data_no_crud.push(permission.split('Edit')[1]);
        if (permission.includes('Delete'))
          list_data_no_crud.push(permission.split('Delete')[1]);
        if (permission.includes('Show'))
          list_data_no_crud.push(permission.split('Show')[1]);
          // list_data_no_crud.push(permission);
  })
  alert(list_data_no_crud);
  // modules.map((m) =>{alert(m)});
  return (
    <div>
      <Controller
        name='Plan'
        control={control}
        render={({ field }) => (
          <TextField
            className='mt-8 mb-16 min-w-lg'
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label='Plan'
            value={data.plan.name}
            autoFocus
            id='plan'
            variant='outlined'
            fullWidth
          />
        )}
      />
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
          {_.orderBy(modules)
            .map((m) =>{
              return (
              <TableRow
                className='h-72 cursor-pointer'
                hover
                role='checkbox'
              >
                <TableCell align='right' className='w-40 md:w-64 row' padding='none'>
                  <TableRow>
                    {data.plan.permissions.includes(m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                        label={m}
                        className='form-check-input custom-control-input isscheck isscheck_'
                        control={
                          <Checkbox checked={true} />
                        }
                      />
                    </TableCell>
                    ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={m}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                </TableCell>
                <TableCell align='right' className='w-40 md:w-64 row' component='td'>
                  <TableRow>
                    {data.plan.permissions.includes('Manage '+m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                      label={'Manage'}
                      className='form-check-input custom-control-input isscheck isscheck_'
                      control={
                        <Checkbox checked={true} />
                      }
                    />
                    </TableCell>
                      ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={'Manage'}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                        )}
                    {data.plan.permissions.includes('Create '+m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                      label={'Create'}
                      className='form-check-input custom-control-input isscheck isscheck_'
                      control={
                        <Checkbox checked={true} />
                      }
                    />
                    </TableCell>
                    ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={'Create'}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                    )}
                    {data.plan.permissions.includes('Edit '+m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                      label={'Edit'}
                      className='form-check-input custom-control-input isscheck isscheck_'
                      control={
                        <Checkbox checked={true} />
                      }
                    />
                    </TableCell>
                    ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={'Edit'}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                    )}
                    {data.plan.permissions.includes('Delete '+m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                      label={'Delete'}
                      className='form-check-input custom-control-input isscheck isscheck_'
                      control={
                        <Checkbox checked={true} />
                      }
                    />
                    </TableCell>
                    ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={'Delete'}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                    )}
                    {data.plan.permissions.includes('Show '+m) ? (
                    <TableCell className=''>
                      <FormControlLabel
                      label={'Show'}
                      className='form-check-input custom-control-input isscheck isscheck_'
                      control={
                        <Checkbox checked={true} />
                      }
                    />
                    </TableCell>
                    ) : (
                      <TableCell className=''>
                        <FormControlLabel
                          label={'Show'}
                          className='form-check-input custom-control-input isscheck isscheck_'
                          control={
                            <Checkbox checked={false} />
                          }
                        />
                      </TableCell>
                    )}
                  </TableRow>
                </TableCell>
              </TableRow>
              )})}
            </TableBody>
          </Table>

        )}
      />

    </div>
  );
}

export default BasicInfoTab;
