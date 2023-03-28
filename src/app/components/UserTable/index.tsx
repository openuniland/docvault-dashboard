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
import { useCallback, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  FormControl,
  IconButton,
  InputBase,
  LinearProgress,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";

import { User } from "types/User";
import styles from "./UserTable.module.scss";

const cx = classNames.bind(styles);

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "fullname",
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: "Full Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    sortable: true,
    label: "Email",
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
    label: "Updated At",
  },
  {
    id: "_id",
    numeric: false,
    disablePadding: false,
    label: "",
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

  const createSortHandler = useCallback(
    (property: keyof User) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    },
    [order, orderBy, onRequestSort],
  );

  return (
    <TableHead className={cx("tableHead")}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            className={cx("checkbox")}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.label}
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
  isLoading?: boolean;
}

export const UsersTable = (props: Props) => {
  const { rows = [], isLoading = false } = props;

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(rows);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof User>("fullname");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [valueOfTab, setValueOfTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [editId, setEditId] = useState("");
  const open = Boolean(anchorEl);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected([]);
      if (event.target.checked) {
        const newSelected = users.map(n => n._id);
        setSelected(newSelected);
        return;
      }

      setSelected([]);
    },
    [selected, users],
  );

  const handleSort = useCallback(
    (newOrder: Order, newOrderBy: keyof User, newDocuments: User[]) => {
      console.log("newDocuments", newDocuments);

      let newArray = [...newDocuments];

      newArray.sort((itemA, itemB) => {
        const compare = (a: string, b: string) => a.localeCompare(b);

        switch (newOrderBy) {
          case "fullname":
          case "email":
            const valA = String(itemA[newOrderBy]);
            const valB = String(itemB[newOrderBy]);
            return newOrder === "asc"
              ? compare(valA, valB)
              : compare(valB, valA);
          case "updated_at":
            return newOrder === "asc"
              ? moment(itemA.created_at).diff(moment(itemB.created_at))
              : moment(itemB.created_at).diff(moment(itemA.created_at));
          default:
            return 0;
        }
      });

      return newArray;
    },
    [],
  );

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof User) => {
      const isAsc = orderBy === property && order === "asc";
      const newOrder = isAsc ? "desc" : "asc";
      const newOrderBy = property;
      setOrder(newOrder);
      setOrderBy(newOrderBy);

      const data = handleSort(newOrder, newOrderBy, rows);

      setUsers(data);
    },
    [rows, order, orderBy],
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

  const handleShowAction = useCallback(
    (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setEditId(id);
    },
    [anchorEl, editId],
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  const handleToEditPage = useCallback(() => {
    navigate(`/users/edit/${editId}`);
  }, [navigate, editId]);

  useEffect(() => {
    const data = handleSort(order, orderBy, rows);
    setUsers(data);
  }, [rows?.length]);

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, tabIndex: number) => {
      setValueOfTab(tabIndex);
      let newArray = [...rows];

      switch (tabIndex) {
        case 1:
          newArray = newArray.filter(item => item.roles === "ADMIN");
          break;
        case 2:
          newArray = newArray.filter(item => item.roles === "USER");
          break;
        default:
          break;
      }

      setUsers(newArray);
    },
    [valueOfTab, rows],
  );

  return (
    <Box className={cx("container")}>
      {isLoading && <LinearProgress />}
      <Paper className={cx("paper")}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueOfTab}
            onChange={handleChangeTab}
            className={cx("tabs")}
            classes={{ indicator: cx("indicator") }}
          >
            <Tab label="All" classes={{ selected: cx("selected") }} />
            <Tab label="ADMIN" classes={{ selected: cx("selected") }} />
            <Tab label="USER" classes={{ selected: cx("selected") }} />
          </Tabs>
        </Box>
        <Box
          sx={{ borderBottom: 1, borderColor: "divider" }}
          className={cx("formSearch")}
        >
          <Autocomplete
            disablePortal
            options={headCells}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} label="Options" />}
          />

          <FormControl className={cx("searchWrapper")}>
            <SearchIcon className={cx("searchIcon")} />
            <InputBase placeholder="Search..." className={cx("inputbase")} />
          </FormControl>
        </Box>
        <Paper>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer className={cx("tableContainer")}>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={users.length}
              />
              <TableBody>
                {users.map(row => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      <TableCell
                        padding="checkbox"
                        onClick={handleClick(row._id)}
                      >
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          className={cx("checkbox")}
                        />
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
                      <TableCell align="left">
                        <IconButton
                          className={cx("actionItem")}
                          onClick={handleShowAction(row._id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>

                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        classes={{ paper: cx("paperOfMenu") }}
                      >
                        <MenuItem
                          onClick={handleCloseMenu}
                          className={cx("menuItem")}
                        >
                          <DeleteOutlineIcon className={cx("delete", "icon")} />
                          <p className={cx("delete")}>Delete</p>
                        </MenuItem>
                        <MenuItem
                          onClick={handleToEditPage}
                          className={cx("menuItem")}
                        >
                          <EditIcon className={cx("icon")} />
                          <p>Edit</p>
                        </MenuItem>
                      </Menu>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </Box>
  );
};
