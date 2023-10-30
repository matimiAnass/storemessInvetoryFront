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
import 'src/app/main/apps/plan_permissions/plan_permission/tabs/CheckAll';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [state, setState] = useState({});

  const modules: any = {
    1: 'Role',
    2: 'User',
    3: 'Account',
    4: 'Contact',
    5: 'Lead',
    6: 'Opportunities',
    7: 'CommonCase',
    8: 'Meeting',
    9: 'Call',
    10: 'Task',
    11: 'Document',
    12: 'Campaign',
    13: 'Quote',
    14: 'SalesOrder',
    15: 'Invoice',
    16: 'Product',
    17: 'Report',
    18: 'Payment',
    19: 'Invoice Payment',
    20: 'Product',
    21: 'AccountType',
    22: 'AccountIndustry',
    23: 'LeadSource',
    24: 'OpportunitiesStage',
    25: 'DocumentFolder',
    26: 'DocumentType',
    27: 'TargetList',
    28: 'ProductCategory',
    29: 'ProductBrand',
    30: 'ProductTax',
    31: 'ShippingProvider',
    32: 'TaskStage',
    33: 'DocumentFolder',
    34: 'CampaignType',
    37: 'CaseType',
    38: 'Contract',
    39: 'ContractType',
    40: 'Form Builder',
    41: 'Form Field',
  };

  const [data, setData] = useState();
  const [manage, setManage] = useState();
  // Getting the data from Back end

  useEffect(() => {

    setData(formState.defaultValues);
    //const data = formState.defaultValues;
    // All modules founds in database

    // Get the data without (Manage, Create, Edit, Delete, Show)
    const list_data_no_crud: string[] = [];
    // the result data without occurrences
    const data_no_crud_results: string[] = [];
    formState.defaultValues.plan.permissions?.map((permission) => {
      if (permission.includes('Manage'))
        list_data_no_crud.push(permission.split('Manage ')[1]);
      if (permission.includes('Create'))
        list_data_no_crud.push(permission.split('Create ')[1]);
      if (permission.includes('Edit'))
        list_data_no_crud.push(permission.split('Edit ')[1]);
      if (permission.includes('Delete'))
        list_data_no_crud.push(permission.split('Delete ')[1]);
      if (permission.includes('Show'))
        list_data_no_crud.push(permission.split('Show ')[1]);
    });
    let data_no_crud = new Set();
    list_data_no_crud?.forEach(entry => {
      data_no_crud.add(entry);
    });
    data_no_crud?.forEach((d) => {
      data_no_crud_results?.push(d);
    });


    let checkBox_list_checked: any = {};
    for (let mod in modules) {
      if (data_no_crud_results?.includes(modules[mod])) {
        checkBox_list_checked[modules[mod]] = true;
      } else {
        checkBox_list_checked[modules[mod]] = false;
      }
    }

    setState(() => ({ checkBox_list_checked }));
    let manage_list_checked: any = {};
    Object.keys(modules).map(key => {
      formState.defaultValues.permissions?.includes('Manage ' + modules[key]) ? manage_list_checked[modules[key]] = true : manage_list_checked[modules[key]] = false;
    });
    setManage(manage_list_checked);
    console.log(manage_list_checked);

  }, []);

  let handleCheckbox = event => {
    setState((v) => ({
      checkBox_list_checked: {
        ...v.checkBox_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));

  };

  if (!data) return (
    <div className='flex items-center justify-center h-full'>
      <FuseLoading />
    </div>
  );
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
            ?.map((m,key) =>{
              return (
                <TableRow
                  className='h-72 cursor-pointer'
                  hover
                  role='checkbox'
                  key={key}
                >
                  <TableCell align='inherit' className='w-100 md:w-100 row' padding='none'>
                    <FormControlLabel
                      label={m}
                      className='ml-5 custom-checkbox'
                      control={
                        <Checkbox id={m} onChange={handleCheckbox} checked={state?.checkBox_list_checked[m]}
                                  value={m} name='checkall' className='ischeck ml-5' />
                      }
                    />
                  </TableCell>
                  <TableCell align='right' className='w-100 md:w-100 row' component='td'>
                    {/*{data.plan.permissions?.includes('Manage ' + m) ? (*/}
                    <FormControlLabel
                      label={'Manage'}
                      className='custom-checkbox'
                      control={
                        <Checkbox onChange={handleCheckbox} checked={state?.checkBox_list_checked[m]}
                                  value={m} className='form-check-input custom-control-input isscheck isscheck_' />
                      }
                    />
                    {/*) : (*/}
                    {/*  <FormControlLabel*/}
                    {/*    label={'Manage'}*/}
                    {/*    className='custom-checkbox'*/}
                    {/*    control={*/}
                    {/*      <Checkbox className='form-check-input custom-control-input isscheck isscheck_' />*/}
                    {/*    }*/}
                    {/*  />*/}
                    {/*)}*/}
                    {data.plan.permissions?.includes('Create ' + m) ? (
                      <FormControlLabel
                        label={'Create'}
                        className='custom-checkbox'
                        control={
                          <Checkbox className='form-check-input custom-control-input isscheck isscheck_' checked />
                        }
                      />
                    ) : (
                      <FormControlLabel
                        label={'Create'}
                        className='custom-checkbox'
                        control={
                          <Checkbox className='form-check-input custom-control-input isscheck isscheck_' />
                        }
                      />
                    )}
                    {data.plan.permissions?.includes('Edit '+m) ? (
                      <FormControlLabel
                      label={'Edit'}
                      className='custom-checkbox'
                      control={
                        <Checkbox className='form-check-input custom-control-input isscheck isscheck_' checked />
                      }
                    />
                    ) : (
                        <FormControlLabel
                          label={'Edit'}
                          className='custom-checkbox'
                          control={
                            <Checkbox className='form-check-input custom-control-input isscheck isscheck_' />
                          }
                        />
                    )}
                    {data.plan.permissions?.includes('Delete '+m) ? (
                      <FormControlLabel
                      label={'Delete'}
                      className='custom-checkbox'
                      control={
                        <Checkbox className='form-check-input custom-control-input isscheck isscheck_' checked />
                      }
                    />
                    ) : (
                        <FormControlLabel
                          label={'Delete'}
                          className='custom-checkbox'
                          control={
                            <Checkbox className='form-check-input custom-control-input isscheck isscheck_' />
                          }
                        />
                    )}
                    {data.plan.permissions?.includes('Show '+m) ? (
                      <FormControlLabel
                      label={'Show'}
                      className='custom-checkbox'
                      control={
                        <Checkbox className='form-check-input custom-control-input isscheck isscheck_' checked />
                      }
                    />
                    ) : (
                        <FormControlLabel
                          label={'Show'}
                          className='custom-checkbox'
                          control={
                            <Checkbox className='form-check-input custom-control-input isscheck isscheck_'  />
                          }
                        />
                    )}
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
