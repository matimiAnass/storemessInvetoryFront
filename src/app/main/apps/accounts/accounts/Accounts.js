import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import reducer from '../store';
import AccountsHeader from './AccountsHeader';
import AccountsTable from './AccountsTable';

function Accounts() {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<AccountsHeader />}
      content={<AccountsTable />}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('accountsApp', reducer)(Accounts);
