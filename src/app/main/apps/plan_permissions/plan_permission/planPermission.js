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
  getPlanPermission,
  newPlanPermission,
  resetPlanPermission,
  selectPlanPermission,
} from '../store/planPermissionSlice';
import reducer from '../store';
import PlanPermissionHeader from './PlanPermissionHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a plan permission name')
    .min(5, 'The planPermission name must be at least 5 characters'),
});

function PlanPermission(props) {
  const dispatch = useDispatch();
  const planPermission = useSelector(selectPlanPermission);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noPlanPermission, setNoPlanPermission] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const [dataTab, setDataTab] = useState();

  useEffect(() => {

  }, []);
  const handleDataTab = (value) => {
    setDataTab(value);
  };

  useDeepCompareEffect(() => {
    function updatePlanPermissionState() {
      const { planPermissionId } = routeParams;

      if (planPermissionId === 'new') {
        /**
         * Create New PlanPermission data
         */
        dispatch(newPlanPermission());
      } else {
        /**
         * Get PlanPermission data
         */
        dispatch(getPlanPermission(planPermissionId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoPlanPermission(true);
          }
        });
      }
    }

    updatePlanPermissionState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!planPermission) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(planPermission);
  }, [planPermission, reset]);

  useEffect(() => {

    return () => {
      /**
       * Reset PlanPermission on component unload
       */

      dispatch(resetPlanPermission());
      setNoPlanPermission(false);
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
  if (noPlanPermission) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such plan Permission!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/planPermissions"
          color="inherit"
        >
          Go to Plan Permissions Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  console.log(planPermission);
  if (
    _.isEmpty(form) ||
    (planPermission && parseInt(routeParams?.planPermissionId) !== planPermission?.plan?.id && routeParams.planPermissionId !== 'new'))
  {
    return <FuseLoading />;
  }
  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<PlanPermissionHeader dataTab={dataTab} />}
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
              <div>
                <BasicInfoTab  handleData={handleDataTab} />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('planPermissionApp', reducer)(PlanPermission);
