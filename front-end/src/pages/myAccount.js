import React, { useState, useEffect } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { makeStyles, Box, List } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Gravatar from "react-gravatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { getOrder, fetchProducts, getAdmin} from "../servis/api";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
  items: {
    boxSizing: "border-box",
    display: "flex",
    borderTop: "2px solid #293827",
    color: "black",
    padding: "0px 16px",
  },
  circle: {
    borderRadius: "50%",
  },
  compStyle: {
    fontSize: 14,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      content: '""',
    },
  },
}));

const MyAccount = () => {
  const classes = useStyles();

  const [order, setOrder] = useState({});
  console.log(order);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdmin();
        setOrder(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);
  const [account, setAccount] = useState([]);

  return (
    <List>
      <ListItem
        alignItems="flex-start"
        className={classes.items}
        disablePadding
      >
        <ListItemAvatar
          sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Box>
              <Gravatar
                email="{profile.email} "
                size={50}
                className={classes.circle}
              />
            </Box>
          </StyledBadge>
        </ListItemAvatar>
        {order.data?.map((item) => (
          <Box sx={{ paddingTop: ".5rem", lineHeight: "19px" }}>
            <Typography component="span" variant="h5" color="text.primary">
              {item.attributes.firstName} {item.attributes.lastName}
            </Typography>
          </Box>
        ))}
      </ListItem>
    </List>
  );
};

export default MyAccount;
