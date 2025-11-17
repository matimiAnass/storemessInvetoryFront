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
import {
  getSaleOrder,
  newSaleOrder,
  resetSaleOrder,
  selectSaleOrder,
} from '../store/saleOrderSlice';
import reducer from '../store';
import SaleOrderHeader from './saleOrderHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a saleOrder name')
    .min(5, 'The saleOrder name must be at least 5 characters'),
});

function SaleOrder(props) {
  const dispatch = useDispatch();
  const saleOrder = useSelector(selectSaleOrder);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noSaleOrder, setNoSaleOrder] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateSaleOrderState() {
      const { saleOrderId } = routeParams;

      if (saleOrderId === 'new') {
        /**
         * Create New SaleOrder data
         */
        dispatch(newSaleOrder());
      } else {
        /**
         * Get SaleOrder data
         */
        dispatch(getSaleOrder(saleOrderId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoSaleOrder(true);
          }
        });
      }
    }

    updateSaleOrderState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!saleOrder) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(saleOrder);
  }, [saleOrder, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset SaleOrder on component unload
       */
      dispatch(resetSaleOrder());
      setNoSaleOrder(false);
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
  if (noSaleOrder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such saleOrder!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/saleOrders"
          color="inherit"
        >
          Go to SaleOrders Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (saleOrder && routeParams.saleOrderId !== saleOrder.id && routeParams.saleOrderId !== 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<SaleOrderHeader />}
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

export default withReducer('saleOrderApp', reducer)(SaleOrder);
