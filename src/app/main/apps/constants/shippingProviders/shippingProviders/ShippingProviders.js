import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../store';
import ShippingProvidersHeader from './ShippingProvidersHeader';
import ShippingProvidersTable from './ShippingProvidersTable';

function ShippingProviders() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<ShippingProvidersHeader />}
      content={<ShippingProvidersTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(ShippingProviders);
