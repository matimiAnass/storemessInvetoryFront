import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { getContracts, selectContracts, selectContractsSearchText } from '../store/contractsSlice';
import ContractsTableHead from './ContractsTableHead';
import format from 'date-fns/format';
import { setContractObj } from '../store/contractSlice';

function ContractsTable(props) {
  const dispatch = useDispatch();
  const contracts = useSelector(selectContracts);
  const searchText = useSelector(selectContractsSearchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(contracts);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [contract, setContract] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(getContracts()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(
        _.filter(contracts, (item) => item.name.toLowerCase().includes(searchText.toLowerCase())),
      );
      setPage(0);
    } else {
      setData(contracts);
    }
  }, [contracts, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (contract.id === property && contract.direction === 'desc') {
      direction = 'asc';
    }

    setContract({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/contracts/contractsList/${item.id}/${item.client_name}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <FuseLoading />
      </div>
    );
  }


  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className='flex flex-1 items-center justify-center h-full'
      >
        <Typography color='text.secondary' variant='h5'>
          There are no contracts!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className='w-full flex flex-col min-h-full'>
      <FuseScrollbars className='grow overflow-x-auto'>
        <Table stickyHeader className='min-w-xl' aria-labelledby='tableTitle'>
          <ContractsTableHead
            selectedContractIds={selected}
            order={contracts}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [contract.direction],
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className='h-72 cursor-pointer'
                    hover
                    role='checkbox'
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell align='left' className='w-40 md:w-64 text-center' padding='none'>
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell align='left'
                      className='p-4 md:p-16'
                      component='th'
                      scope='row'
                    >
                      {n.name}
                    </TableCell>

                    <TableCell align='left' className='p-4 md:p-16' component='th' scope='row'>
                      {n.client_name}
                    </TableCell>

                    <TableCell align='left' className='p-4 md:p-16 truncate' component='th' scope='row'>
                      <span>$</span>
                      {n.value}
                    </TableCell>

                    <TableCell align='left' className='p-4 md:p-16' component='th' scope='row' >
                      {n.type}
                    </TableCell>

                    <TableCell align='left' className='p-4 md:p-16' component='th' scope='row' >
                      {format(new Date(n.start_date), 'MMM dd, y')}
                    </TableCell>
                    <TableCell align='left' className='p-4 md:p-16' component='th' scope='row' >
                      {format(new Date(n.end_date), 'MMM dd, y')}
                    </TableCell>

                    <TableCell align='left' className='p-4 md:p-16' component='th' scope='row' >
                      <Typography
                        className={clsx(
                          'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
                          n.status === 'Close' &&
                          'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-50',
                          n.status === 'Start' &&
                          'bg-green-50 text-green-800 dark:bg-green-600 dark:text-green-50'
                        )}
                      >
                        {n.status}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className='shrink-0 border-t-1'
        component='div'
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ContractsTable);
