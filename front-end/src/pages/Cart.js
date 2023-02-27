import React, { useState,useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import Typography from "@mui/material/Typography";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CartContext } from "../contexts/CartContext";
import { makeStyles, Button, CardActions, Box } from "@material-ui/core";
import CartDetails from "../components/CartDetails";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  total: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  btn: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

const Cart = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cart, removeToCart, increaseQty, decreaseQty } =
    useContext(CartContext);
  const { items = [] } = cart;
  const [total, setTotal] = useState(cart.cartTotal);

  useEffect(() => {
    setTotal(cart.cartTotal);
  }, [cart]);
  return (
    <>
      <CartDetails />
      <div className={classes.total}>
        <TableContainer component={Paper} sx={{ width: "400px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Cart Totals
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2}>Total:</TableCell>
                <TableCell align="right">
                  <Typography variant="h5" ali>
                    {cart.cartTotal}kr
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </Button>
        </TableContainer>
      </div>
    </>
  );
};

export default Cart;
