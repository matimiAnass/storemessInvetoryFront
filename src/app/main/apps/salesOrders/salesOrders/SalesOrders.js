import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import SalesOrdersHeader from './SalesOrdersHeader';
import SalesOrdersTable from './SalesOrdersTable';

function SalesOrders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<SalesOrdersHeader />}
      content={<SalesOrdersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('salesOrdersApp', reducer)(SalesOrders);
