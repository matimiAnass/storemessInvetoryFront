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
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { getDataUpdated , setDataUpdated } from '../../store/planPermissionSlice';
import { useDispatch, useSelector } from 'react-redux';

function BasicInfoTab({ handleData } ) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const dispatch = useDispatch();
  const { errors } = formState;
  const [plan, setPlan] = useState('');
  const [state, setState] = useState({});
  const [data, setData] = useState();
  const [manage, setManage] = useState({});
  const [create, setCreate] = useState({});
  const [edit, setEdit] = useState({});
  const [deleted, setDeleted] = useState({});
  const [show, setShow] = useState({});
  const dataUpdated = useSelector(getDataUpdated);
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
    16: 'Report',
    17: 'Payment',
    18: 'Invoice Payment',
    19: 'Product',
    20: 'AccountType',
    21: 'AccountIndustry',
    22: 'LeadSource',
    23: 'OpportunitiesStage',
    24: 'DocumentFolder',
    25: 'DocumentType',
    26: 'TargetList',
    27: 'ProductCategory',
    28: 'ProductBrand',
    29: 'ProductTax',
    30: 'ShippingProvider',
    31: 'TaskStage',
    32: 'DocumentFolder',
    33: 'CampaignType',
    34: 'CaseType',
    35: 'Contract',
    36: 'ContractType',
    37: 'Form Builder',
    38: 'Form Field',
  };
  const [ifEmpty, setIfEmpty] = useState(true);
  const [id, setId] = useState(0);


  useEffect(() => {

    // Getting the data from Back end
    setData(formState.defaultValues);
    //const data = formState.defaultValues;
    // All modules founds in database

    // Get the data without (Manage, Create, Edit, Delete, Show)
    const list_data_no_crud: string[] = [];
    // the result data without occurrences
    const data_no_crud_results: string[] = [];
    formState.defaultValues.plan?.permissions?.map((permission) => {
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
      formState.defaultValues.plan?.permissions?.includes('Manage ' + modules[key]) ? manage_list_checked[modules[key]] = true : manage_list_checked[modules[key]] = false;
    });
    setManage(() => ({ manage_list_checked }));

    let create_list_checked: any = {};
    Object.keys(modules).map(key => {
      formState.defaultValues.plan?.permissions?.includes('Create ' + modules[key]) ? create_list_checked[modules[key]] = true : create_list_checked[modules[key]] = false;
    });
    setCreate(() => ({ create_list_checked }));

    let edit_list_checked: any = {};
    Object.keys(modules).map(key => {
      formState.defaultValues.plan?.permissions?.includes('Edit ' + modules[key]) ? edit_list_checked[modules[key]] = true : edit_list_checked[modules[key]] = false;
    });
    setEdit(() => ({ edit_list_checked }));

    let deleted_list_checked: any = {};
    Object.keys(modules).map(key => {
      formState.defaultValues.plan?.permissions?.includes('Delete ' + modules[key]) ? deleted_list_checked[modules[key]] = true : deleted_list_checked[modules[key]] = false;
    });
    setDeleted(() => ({ deleted_list_checked }));

    let show_list_checked: any = {};
    Object.keys(modules).map(key => {
      formState.defaultValues.plan?.permissions?.includes('Show ' + modules[key]) ? show_list_checked[modules[key]] = true : show_list_checked[modules[key]] = false;
    });
    setShow(() => ({ show_list_checked }));

    setPlan(() => (formState.defaultValues.plan?.name));


  }, []);

    useEffect(()=>{
      // handleGetDataUpdated();

    },[dispatch]);


    useEffect(()=>{
      if(formState.defaultValues.plan?.name === undefined){
        setIfEmpty(false);
      }   },[ifEmpty]);


  if (data) {
    //Release the permissions updated to affect in method save
    let permissions = [];
    Object.values(state).forEach(key => {
      Object.keys(key).forEach(checkBoxParent => {
        Object.values(manage).forEach(key => {
          Object.keys(key).forEach(checkBoxManage => {
            key[checkBoxManage] && key[checkBoxParent] ? permissions.push('Manage ' + checkBoxManage) : false;
          });
        });
        Object.values(edit).forEach(key => {
          Object.keys(key).forEach(checkBoxEdit => {
            key[checkBoxEdit] && key[checkBoxParent] ? permissions.push('Edit ' + checkBoxEdit) : false;
          });
        });
        Object.values(create).forEach(key => {
          Object.keys(key).forEach(checkBoxCreate => {
            key[checkBoxCreate] && key[checkBoxParent] ? permissions.push('Create ' + checkBoxCreate) : false;
          });
        });
        Object.values(deleted).forEach(key => {
          Object.keys(key).forEach(checkBoxDeleted => {
            key[checkBoxDeleted] && key[checkBoxParent] ? permissions.push('Delete ' + checkBoxDeleted) : false;
          });
        });
        Object.values(show).forEach(key => {
          Object.keys(key).forEach(checkBoxShow => {
            key[checkBoxShow] && key[checkBoxParent] ? permissions.push('Show ' + checkBoxShow) : false;
          });
        });
      });
    });
    let permissions_no_repeat = new Set();
    permissions?.forEach(entry => {
      permissions_no_repeat.add(entry);
    });
      if(formState.defaultValues.plan?.id !== undefined) {
        dataUpdated['id'] = formState.defaultValues.plan?.id;
      }

    dataUpdated['name'] = plan;
    let permissions_list = [];
    permissions_no_repeat.forEach((key, item) => {
      permissions_list.push(item);
    });
    dataUpdated['permissions'] = permissions_list;
    console.log(dataUpdated);
    // dispatch(setDataUpdated(dataUpdated));
    handleData(dataUpdated);
  }
  let handleLabelPlan = event => {
    setPlan(event.target.value);
  };
  let handleCheckbox = event => {
    setState((v) => ({
      checkBox_list_checked: {
        ...v.checkBox_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));
  };
  let handleCheckboxManage = event => {
    setManage((v) => ({
      manage_list_checked: {
        ...v.manage_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));
  };
  let handleCheckboxCreate = event => {
    setCreate((v) => ({
      create_list_checked: {
        ...v.create_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));
  };
  let handleCheckboxEdit = event => {
    setEdit((v) => ({
      edit_list_checked: {
        ...v.edit_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));
  };
  let handleCheckboxDeleted = event => {
    setDeleted((v) => ({
      deleted_list_checked: {
        ...v.deleted_list_checked,
        [event.target.value]: event.target.checked,
      },
    }));
  };
  let handleCheckboxShow = event => {
    setShow((v) => ({
      show_list_checked: {
        ...v.show_list_checked,
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
            className='mt-8 mb-16 '
            error={!!errors.name}
            required
          disabled={false}
            helperText={errors?.name?.message}
            label='Plan'
            value={plan}
            onChange={handleLabelPlan}
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
          <Table stickyHeader className='min-w-full' aria-labelledby='tableTitle'>
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
                    <FormControlLabel
                      label={'Manage'}
                      className='custom-checkbox'
                      control={
                        <Checkbox onChange={handleCheckboxManage} checked={manage?.manage_list_checked[m]}
                                  value={m} className='form-check-input custom-control-input' />
                      }
                    />
                      <FormControlLabel
                        label={'Create'}
                        className='custom-checkbox'
                        control={
                          <Checkbox onChange={handleCheckboxCreate} checked={create?.create_list_checked[m]} value={m}
                                    className='form-check-input custom-control-input' />
                        }
                      />
                      <FormControlLabel
                      label={'Edit'}
                      className='custom-checkbox'
                      control={
                        <Checkbox onChange={handleCheckboxEdit} checked={edit?.edit_list_checked[m]} value={m}
                                  className='form-check-input custom-control-input' />
                      }
                    />
                      <FormControlLabel
                      label={'Delete'}
                      className='custom-checkbox'
                      control={
                        <Checkbox onChange={handleCheckboxDeleted} checked={deleted?.deleted_list_checked[m]} value={m}
                                  className='form-check-input custom-control-input' />
                      }
                    />
                      <FormControlLabel
                      label={'Show'}
                      className='custom-checkbox'
                      control={
                        <Checkbox onChange={handleCheckboxShow} checked={show?.show_list_checked[m]} value={m}
                                  className='form-check-input custom-control-input' />
                      }
                    />
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
