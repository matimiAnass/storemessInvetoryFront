import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import ContractsDashboardAppHeader from './ContractsDashboardAppHeader';
import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import BudgetWidget from './widgets/BudgetWidget';
import PermissionDenied from './widgets/PermissionDenied';

function ContractsDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<ContractsDashboardAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };

            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };
            if (widgets?.error === undefined) {
              return (
                !_.isEmpty(widgets) && (
                  <motion.div
                    className="w-full"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-1 gap-32 w-full mt-32">
                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <AccountBalanceWidget />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32">
                      <motion.div variants={item} className="xl:col-span-2 flex flex-col flex-auto">
                        <RecentTransactionsWidget />
                      </motion.div>
                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <BudgetWidget />
                      </motion.div>
                    </div>
                  </motion.div>
                )
              );
            }
            if (widgets?.error === 'Permission Denied.') {
              return <PermissionDenied />;
            }
          }, [widgets])}
        </div>
      }
    />
  );
}

export default withReducer('contractsDashboardApp', reducer)(ContractsDashboardApp);
