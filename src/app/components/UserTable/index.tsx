import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { User } from "types/User";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames/bind";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";

import styles from "./UserTable.module.scss";
import {
  Button,
  IconButton,
  Menu,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

const cx = classNames.bind(styles);

type Order = "asc" | "desc";

function changeData(
  array: User[],
  tab: number = 0,
  orderBy: keyof User = "fullname",
  order: Order = "asc",
): User[] {
  let newArray = [...array];

  switch (tab) {
    case 1:
      newArray = newArray.filter(item => item.roles === "ADMIN");
      break;
    case 2:
      newArray = newArray.filter(item => item.roles === "USER");
      break;
    default:
      break;
  }

  newArray.sort((itemA, itemB) => {
    const compare = (a: string, b: string) => a.localeCompare(b);

    switch (orderBy) {
      case "_id":
      case "fullname":
      case "email":
        const valA = String(itemA[orderBy]);
        const valB = String(itemB[orderBy]);
        return order === "asc" ? compare(valA, valB) : compare(valB, valA);
      case "updated_at":
        return order === "asc"
          ? moment(itemA.updated_at).diff(moment(itemB.updated_at))
          : moment(itemB.updated_at).diff(moment(itemA.updated_at));
      default:
        return 0;
    }
  });

  return newArray;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
  sortable?: boolean;
  filterDropdown?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "fullname",
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: "Full Name",
    filterDropdown: true,
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: "Email",
    filterDropdown: true,
  },
  {
    id: "roles",
    numeric: false,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "is_blocked",
    numeric: false,
    disablePadding: false,
    label: "Is Blocked",
  },
  {
    id: "updated_at",
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: "Created At",
  },
];

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const EnhancedTableHead = (props: TableHeadProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const createSortHandler =
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <TableHead className={cx("tableHead")}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <>{headCell.label}</>
            )}

            {headCell.filterDropdown && (
              <IconButton onClick={handleClick}>
                <FilterListIcon />
              </IconButton>
            )}

            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Menu>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar className={cx({ toolbar: numSelected > 0 })}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          component="strong"
          className={cx({ toolbarTitle: numSelected > 0 })}
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách người dùng
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

interface Props {
  rows?: User[];
}

export const UsersTable = (props: Props) => {
  const { rows = [] } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("fullname");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [valueOfTab, setValueOfTab] = useState(0);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map(n => n._id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [selected],
  );

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof User) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [orderBy, order],
  );

  const handleClick = useCallback(
    (name: string) => () => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
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
    },
    [selected],
  );

  const isSelected = useMemo(
    () => (name: string) => {
      return selected.indexOf(name) !== -1;
    },
    [selected],
  );

  const HandleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValueOfTab(newValue);
    },
    [valueOfTab],
  );

  return (
    <Box className={cx("container")}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button className={cx("addUserBtn")} variant="contained" sx={{ mr: 1 }}>
          Thêm mới người dùng
        </Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={valueOfTab}
          onChange={HandleChangeTab}
          className={cx("tabs")}
          classes={{ indicator: cx("indicator") }}
        >
          <Tab label="All" classes={{ selected: cx("selected") }} />
          <Tab label="ADMIN" classes={{ selected: cx("selected") }} />
          <Tab label="USER" classes={{ selected: cx("selected") }} />
        </Tabs>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {changeData(rows, valueOfTab, orderBy, order).map(
                (row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={handleClick(row._id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        id={labelId}
                      >
                        {row._id}
                      </TableCell>
                      <TableCell align="left">{row.fullname}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.roles}</TableCell>
                      <TableCell align="left">{`${row.is_blocked}`}</TableCell>
                      <TableCell align="left">
                        {`${moment(row.created_at).format(
                          "hh:mm - DD/MM/YYYY",
                        )}`}
                      </TableCell>
                    </TableRow>
                  );
                },
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
