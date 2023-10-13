import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getLeadSource, newLeadSource, resetLeadSource, selectLeadSource } from '../../store/LeadSourceSlice';
import reducer from '../../store';
import LeadSourceHeader from './LeadSourceHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a LeadSource name')
    .min(5, 'The leadSource name must be at least 5 characters'),
});

function LeadSource(props) {
  const dispatch = useDispatch();
  const leadSource = useSelector(selectLeadSource);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noContractType, setNoContractType] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateContractTypeState() {
      const { contractTypeId } = routeParams;
      if (contractTypeId === 'new') {
        /**
         * Create New LeadSource data
         */
        dispatch(newContractType());
      } else {
        /**
         * Get LeadSource data
         */
        dispatch(getContractType(contractTypeId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoContractType(true);
          }
        });
      }
    }

    updateContractTypeState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!contractType) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(contractType);
  }, [contractType, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset LeadSource on component unload
       */
      dispatch(resetContractType());
      setNoContractType(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noContractType) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-col flex-1 items-center justify-center h-full'
      >
        <Typography color='text.secondary' variant='h5'>
          There is no such contractType!
        </Typography>
        <Button
          className='mt-24'
          component={Link}
          variant='outlined'
          to='/apps/constants/contractTypes'
          color='inherit'
        >
          Go to ContractTypes Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (contractType && routeParams.contractTypeId !== contractType.id && routeParams.contractTypeId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<LeadSourceHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor='secondary'
              textColor='secondary'
              variant='scrollable'
              scrollButtons='auto'
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className='h-64' label='Basic Info' />
            </Tabs>
            <div className='p-16 sm:p-24 max-w-3xl'>
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('constantsApp', reducer)(LeadSource);
