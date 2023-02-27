import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import {
  Button,
  TableCell,
  TableContainer,
  Typography,
  makeStyles,
  TextField,
  TableBody,
  Table,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { CartContext } from "../contexts/CartContext";
import { createOrder, fetchProducts } from "../servis/api";

const useStyles = makeStyles((theme) => ({
  mt2: {
    marginTop: theme.spacing(4),
  },
}));

const PersonalDetails = () => {
  const classes = useStyles();
  const { cart } = useContext(CartContext);
  const { items = [] } = cart;

  const navigate = useNavigate();
  const [value, setValue] = React.useState("direct");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      country: "",
      address: "",
      city: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      phone: Yup.string().notRequired(),
      email: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      const { items = [] } = cart;
      console.log(items);
      const productIds = items.map((item) => `id_in=${item.id}`);

      const query = productIds.join("&");

      try {
        const products = await fetchProducts(query);
        let total = 0;
        items.forEach((item) => {
          const product = products.data?.find((p) => p.id === item.id);
          total += item.qty * product.attributes.price;
        });
        const data = {
          // Inkludera data här
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            country: values.country,
            address: values.address,
            city: values.city,
            phone: values.phone,
            email: values.email,
            total: `${total}`,
          },
        };
        const order = await createOrder(data);

        navigate(`/orders/${order.data.id}`);
      } catch (e) {
        console.error(e);
      }
    },
  });

  const { getFieldProps, errors, touched } = formik;
  const hasError = (fieldName) => {
    if (errors[fieldName] && touched[fieldName]) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <Typography variant="h6">PersonalDetails</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              className={classes.mt2}
              name="firstName"
              label="First Name"
              fullWidth
              value={formik.values.firstName}
              error={hasError("firstName")}
              helperText={errors.firstName || ""}
              {...getFieldProps("firstName")}
            />
            <TextField
              className={classes.mt2}
              name="lastName"
              label="Last Name"
              fullWidth
              value={formik.values.lastName}
              error={hasError("firstName")}
              helperText={errors.lastName || ""}
              {...getFieldProps("lastName")}
            />
            <TextField
              className={classes.mt2}
              name="country"
              label="Country"
              fullWidth
              value={formik.values.country}
              {...getFieldProps("country")}
              error={hasError("country")}
              helperText={errors.country || ""}
            />
            <TextField
              className={classes.mt2}
              name="address"
              label="Street adress"
              fullWidth
              value={formik.values.address}
              {...getFieldProps("address")}
              error={hasError("address")}
              helperText={errors.address || ""}
            />
            <TextField
              className={classes.mt2}
              name="city"
              label="City"
              fullWidth
              value={formik.values.city}
              error={hasError("city")}
              helperText={errors.city || ""}
              {...getFieldProps("city")}
            />
            <TextField
              className={classes.mt2}
              name="phone"
              label="Phone"
              fullWidth
              value={formik.values.phone}
              {...getFieldProps("phone")}
            />
            <TextField
              className={classes.mt2}
              name="email"
              label="email"
              fullWidth
              value={formik.values.email}
              error={hasError("email")}
              helperText={errors.email || ""}
              {...getFieldProps("email")}
            />
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography className={classes.mt2}>Your order</Typography>
          <Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map(
                    (item) =>
                      item.qty !== 0 && (
                        <TableRow
                          key={item.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{`${item.attributes.name} * ${item.qty}`}</TableCell>
                          <TableCell>
                            {item.attributes.price * item.qty} Kr
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
                <TableRow>
                  <TableCell>Total:</TableCell>
                  <TableCell>
                    <Typography variant="h5">{cart.cartTotal}kr</Typography>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Box>
          <Box className={classes.mt2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  control={<Radio />}
                  value={"direct"}
                  label="Direct bank transfer"
                />
                <Box>
                  Make your payment directly into our bank account. Please use
                  your Order ID as the paymant reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </Box>
                <FormControlLabel
                  control={<Radio />}
                  value={"cash"}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Save & buy
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

PersonalDetails.propTypes = {};

export default PersonalDetails;
