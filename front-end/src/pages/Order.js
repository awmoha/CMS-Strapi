import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TableCell,
  TableContainer,
  Typography,
  makeStyles,
  Box,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";

import { CartContext } from "../contexts/CartContext";
import { getOrder, fetchProducts } from "../servis/api";
import CartDetails from "../components/CartDetails";

const useStyles = makeStyles((theme) => ({
  total: {
    display: "flex",
    justifyContent: "flex-end",
    margin: " 70px 0px 0px 0px",
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0px 0px 0px 0px",
  },
  mt2: {
    marginTop: theme.spacing(4),
  },
}));

const Order = () => {
  const classes = useStyles();
  const { cart } = useContext(CartContext);
  const { items = [] } = cart;
  const navigate = useNavigate();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrder();
        setOrder(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  // <Typography>{`Thank You  ${item.attributes.firstName}`}</Typography>

  return (
    <>
      <div className={classes.total}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} md={12}>
            <TableContainer component={Paper} sx={{ width: "400px" }}>
              {order.data?.map((item) => (
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={3} align="left">
                        <Typography variant="h5">
                          {" "}
                          {`Dear  ${item.attributes.lastName}`}
                        </Typography>{" "}
                      </TableCell>
                      <TableCell colSpan={3} align="center">
                        <Box>Your order Number is 121343-{item.id}</Box>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography>
                          We appreciate your order. This email confirms that we
                          are preparing it at this very moment and will confirm
                          shopping details within the next few hours.
                        </Typography>
                        <Typography className={classes.mt2}>
                          Sincerely,
                        </Typography>
                        <Typography>ToolShop</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              ))}
              <Button
                color="primary"
                variant="contained"
                fullWidth
                onClick={() => navigate("/")}
              >
                Continu shopping
              </Button>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Order;
