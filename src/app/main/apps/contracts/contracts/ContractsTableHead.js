import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { lighten } from '@mui/material/styles';
import { removeContracts } from '../store/contractsSlice';

const rows = [
  {
    id: 'Name',
    align: 'left',
    disablePadding: false,
    label: 'name',
    sort: true,
  },
  {
    id: 'Client_name',
    align: 'left',
    disablePadding: false,
    label: 'Client Name',
    sort: true,
  },
  {
    id: 'value',
    align: 'left',
    disablePadding: false,
    label: 'Value',
    sort: true,
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type',
    sort: true,
  },
  {
    id: 'start_date',
    align: 'left',
    disablePadding: false,
    label: 'Start Date',
    sort: true,
  },
  {
    id: 'end_date',
    align: 'left',
    disablePadding: false,
    label: 'End Date',
    sort: true,
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
    sort: true,
  },
];

function ContractsTableHead(props) {
  const { selectedContractIds } = props;
  const numSelected = selectedContractIds?.length;

  const [selectedContractsMenu, setSelectedContractsMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedContractsMenu(event) {
    setSelectedContractsMenu(event.currentTarget);
  }

  function closeSelectedContractsMenu() {
    setSelectedContractsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        <TableCell
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? lighten(theme.palette.background.default, 0.4)
                : lighten(theme.palette.background.default, 0.02),
          }}
          padding="none"
          className="w-40 md:w-64 text-center z-99"
        >
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < props.rowCount}
            checked={props.rowCount !== 0 && numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {numSelected > 0 && (
            <Box
              className="flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10 border-b-1"
              sx={{
                background: (theme) => theme.palette.background.default,
              }}
            >
              <IconButton
                aria-owns={selectedContractsMenu ? 'selectedContractsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedContractsMenu}
                size="large"
              >
                <FuseSvgIcon>heroicons-outline:dots-horizontal</FuseSvgIcon>
              </IconButton>
              <Menu
                id="selectedContractsMenu"
                anchorEl={selectedContractsMenu}
                open={Boolean(selectedContractsMenu)}
                onClose={closeSelectedContractsMenu}
              >
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      dispatch(removeContracts(selectedContractIds));
                      props.onMenuItemClick();
                      closeSelectedContractsMenu();
                    }}
                  >
                    <ListItemIcon className="min-w-40">
                      <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          )}
        </TableCell>
        {rows.map((row) => {
          return (
            <TableCell
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? lighten(theme.palette.background.default, 0.4)
                    : lighten(theme.palette.background.default, 0.02),
              }}
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={props.order.id === row.id ? props.order.direction : false}
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={row.align === 'right' ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default ContractsTableHead;
