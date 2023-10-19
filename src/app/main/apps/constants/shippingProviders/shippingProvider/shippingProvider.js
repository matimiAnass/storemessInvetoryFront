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
import { getShippingProvider, newShippingProvider, resetShippingProvider, selectShippingProvider } from '../../store/shippingProviderSlice';
import reducer from '../../store';
import ShippingProviderHeader from './ShippingProviderHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a shippingProvider name')
    .min(5, 'The shippingProvider name must be at least 5 characters'),
});

function ShippingProvider(props) {
  const dispatch = useDispatch();
  const shippingProvider = useSelector(selectShippingProvider);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noShippingProvider, setNoShippingProvider] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateShippingProviderState() {
      const { shippingProviderId } = routeParams;

      if (shippingProviderId === 'new') {
        /**
         * Create New ShippingProvider data
         */
        dispatch(newShippingProvider());
      } else {
        /**
         * Get ShippingProvider data
         */
        dispatch(getShippingProvider(shippingProviderId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoShippingProvider(true);
          }
        });
      }
    }

    updateShippingProviderState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!shippingProvider) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(shippingProvider);
  }, [shippingProvider, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset ShippingProvider on component unload
       */
      dispatch(resetShippingProvider());
      setNoShippingProvider(false);
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
  if (noShippingProvider) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such shippingProvider!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/shippingProviders"
          color="inherit"
        >
          Go to ShippingProvider Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (shippingProvider && routeParams.shippingProviderId !== shippingProvider.id && routeParams.shippingProviderId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<ShippingProviderHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
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

export default withReducer('constantApp', reducer)(ShippingProvider);
