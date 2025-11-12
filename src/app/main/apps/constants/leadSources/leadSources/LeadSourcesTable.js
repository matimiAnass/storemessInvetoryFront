import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import {
  getLeadSources,
  selectLeadSources,
  selectLeadSourcesSearchText,
} from '../../store/leadSourcesSlice';
import LeadSourcesTableHead from './LeadSourcesTableHead';

function LeadSourcesTable(props) {
  const dispatch = useDispatch();
  const leadSources = useSelector(selectLeadSources);
  const searchText = useSelector(selectLeadSourcesSearchText);

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(leadSources);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quote, setQuote] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(getLeadSources()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText?.length !== 0) {
      setData(
        _.filter(leadSources, (item) => item.name.toLowerCase().includes(searchText.toLowerCase()))
      );
      setPage(0);
    } else {
      setData(leadSources);
    }
  }, [leadSources, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (leadSource.id === property && leadSource.direction === 'desc') {
      direction = 'asc';
    }

    setQuote({
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
    props.navigate(`/apps/constants/leadSources/${item.id}/${item.handle}`);
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
        selected.slice(selectedIndex + 1)
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
      <div className="flex items-center justify-center h-full">
        <FuseLoading />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no leadSources!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <LeadSourcesTableHead
            selectedRoleIds={selected}
            order={leadSources}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((ct) => {
                const isSelected = selected.indexOf(ct.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={ct.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(ct)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, ct.id)}
                      />
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {ct.id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {ct.lead_source}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
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

export default withRouter(LeadSourcesTable);
