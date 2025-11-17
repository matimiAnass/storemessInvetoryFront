import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../../store';
import LeadSourcesHeader from './LeadSourcesHeader';
import LeadSourcesTable from './LeadSourcesTable';

function LeadSources() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<LeadSourcesHeader />}
      content={<LeadSourcesTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('constantsApp', reducer)(LeadSources);
