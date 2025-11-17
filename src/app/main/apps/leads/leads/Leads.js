import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import LeadsHeader from './LeadsHeader';
import LeadsTable from './LeadsTable';

function Leads() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<LeadsHeader />}
      content={<LeadsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('leadsApp', reducer)(Leads);
