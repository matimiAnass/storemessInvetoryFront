import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import PlanPermissionsHeader from './PlanPermissionsHeader';
import PlanPermissionsTable from './PlanPermissionsTable';

function PlanPermissions() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<PlanPermissionsHeader />}
      content={<PlanPermissionsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('planPermissionsApp', reducer)(PlanPermissions);
