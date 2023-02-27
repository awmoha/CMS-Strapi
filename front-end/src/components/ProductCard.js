import React, { useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Container,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  Button,
  makeStyles,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Grid,
} from "@material-ui/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  ImageListItem,
  TableRow,
  Toolbar,
  TableSortLabel,
  Paper,
  Rating,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { appConfig } from "../servis/config";
import { CartContext } from "../contexts/CartContext";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },

  media: {
    height: 100,
    paddingTop: "52.25%",
  },
  media2: {
    paddingTop: "100%",
    marginTop: 30,
  },
  mt2: {
    marginTop: theme.spacing(4),
  },
  des: {
    marginTop: theme.spacing(4),
    width: "90%",
  },
}));
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;

  const headCells = [
    {
      id: "Image",
      numeric: false,
      disablePadding: false,
      label: "Image",
    },
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "Summary",
      numeric: true,
      disablePadding: false,
      label: "Summary",
    },
    {
      id: "Price",
      numeric: false,
      disablePadding: false,
      label: "Price",
    },
    {
      id: "Buy",
      numeric: false,
      disablePadding: false,
      label: "Buy",
    },
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              disabled={headCell.disableSort}
              className="asdftest"
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

const ProductCard = ({ products }) => {
  const classes = useStyles();

  const [order, setOrder] = useState(window.history.state?.order ?? "asc");
  const [orderBy, setOrderBy] = useState(window.history.state?.orderBy ?? "");
  const [dense, setDense] = useState(window.history.state?.dense ?? true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [showDataText, setShowDataText] = useState(false);
  const handleClickOpenText = () => {
    setShowDataText(true);
  };
  const handleClickCloseText = () => {
    setShowDataText(false);
  };
  const [rows, setRows] = useState(window.history.state?.rows ?? []);
  const { addToCart } = useContext(CartContext);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getDialogText = useMemo(() => {
    const newList = [];
    for (let i = 0; i < products.data?.length; i++) {
      if (selectedIndex === i) {
        newList.push(products.data[i]);
      }
    }
    return newList;
  });
  return (
    <Paper sx={{ width: "100%" }} className={classes.root}>
      <TableContainer>
        <Table
          sx={{ width: "100%" }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {products.data?.map((product, index) => (
              <TableRow
                hover
                role="checkbox"
                key={product.attributes.name}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                <TableCell onClick={handleClickOpenText}>
                  <CardMedia
                    className={classes.media}
                    image={`${appConfig.apiURL}${product.attributes.photo.data.attributes.url}`}
                  />
                </TableCell>
                <TableCell onClick={handleClickOpenText} align="center">
                  {product.attributes.name}
                </TableCell>
                <TableCell onClick={handleClickOpenText}>
                  {" "}
                  {product.attributes.ShortText}
                </TableCell>
                <TableCell
                  onClick={handleClickOpenText}
                >{`${product.attributes.price}Kr`}</TableCell>
                <TableCell align="center">
                  <CardActions disableSpacing>
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => addToCart(product)}
                    >
                      Add to Basket{" "}
                    </Button>
                  </CardActions>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {showDataText && (
            <Box>
              {getDialogText?.map((item, index) => (
                <Dialog
                  open={showDataText}
                  onClose={handleClickCloseText}
                  key={item.attributes.name}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={6}>
                      <CardMedia
                        className={classes.media2}
                        image={`${appConfig.apiURL}${item.attributes.photo.data.attributes.url}`}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.mt2}>
                      <Typography variant="h5" key={item.attributes.name}>
                        {item.attributes.name}
                      </Typography>

                      <Typography
                        variant="h6"
                        className={classes.mt2}
                      >{`${item.attributes.price}Kr`}</Typography>
                      <Rating name="read-only" value={item.attributes.rating} />
                      <Box className={classes.des}>
                        {item.attributes.description}
                      </Box>

                      <CardActions disableSpacing className={classes.mt2}>
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={() => addToCart(item)}
                        >
                          Add to Basket{" "}
                        </Button>
                      </CardActions>
                    </Grid>
                  </Grid>
                </Dialog>
              ))}
            </Box>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ProductCard;
