import React, { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import RemoveIcon from "@mui/icons-material/Remove";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CartContext } from "../contexts/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles, Button, CardActions, Box, Input, Select } from "@material-ui/core";
import { Avatar, IconButton } from "@mui/material";
import { appConfig } from "../servis/config";
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
const CartDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("S")
  const sizes = ["S", "M", "L", "XL"] 
  const { cart, removeToCart, setCart } = useContext(CartContext);

  const { items = [] } = cart;
  let total = 0;
  items.forEach((item) => {
    total += item.attributes.price * item.qty;
  });

  const increaseQty = (id) => {
    const newItems = cart.items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCart((prevState) => ({
      ...prevState,
      items: newItems,
    }));
    let cartTotal = 0;
    newItems.forEach((item) => {
      cartTotal += item.attributes.price * item.qty;
    });
    // Uppdatera cartTotal i CartContext
    setCart((prevState) => ({
      ...prevState,
      cartTotal,
    }));
  };

  const decreaseQty = (id) => {
    const newItems = cart.items.map((item) => {
      if (item.id === id) {
        return { ...item, qty: item.qty - 1 };
      }
      return item;
    });
    setCart((prevState) => ({
      ...prevState,
      items: newItems,
    }));
    let cartTotal = 0;
    newItems.forEach((item) => {
      cartTotal += item.attributes.price * item.qty;
    });
    // Uppdatera cartTotal i CartContext
    setCart((prevState) => ({
      ...prevState,
      cartTotal,
    }));
  };
  return (
    <>
      {" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Quantliy</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    alt={item.attributes.name}
                    src={`${appConfig.apiURL}${item.attributes.photo.data.attributes.url}`}
                    variant="square"
                  />
                </TableCell>
                <TableCell>{item.attributes.name}</TableCell>

                <TableCell>{item.attributes.price}</TableCell>
                <TableCell>
              <Select value={selectedSize} onChange={event => setSelectedSize(event.target.value)}>
                {sizes.map(size => <option value={size}>{size}</option>)}
              </Select>
            </TableCell>

                <TableCell>
                  <Button
                    onClick={() => decreaseQty(item.id)}
                    disabled={item.qty === 0}
                  >
                    -
                  </Button>
                  {item.qty}{" "}
                  <Button onClick={() => increaseQty(item.id)}>+</Button>
                </TableCell>
                <TableCell>{item.attributes.price * item.qty} Kr</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" size="small">
                    <DeleteIcon onClick={() => removeToCart(item)} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CartDetails;
