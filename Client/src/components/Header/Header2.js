// @ts-nocheck
import {
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useState } from "react";
import logo from "../../assets/logo.png";
import SearchComponent from "../Search/SearchComponent.js";
import { TiShoppingCart } from "react-icons/ti";
import { GrFavorite } from "react-icons/gr";
import { MdClose, MdSearch } from "react-icons/md";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header2() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const isLargeScreen = useMediaQuery("(min-width:769px)");
  const theme = useTheme();

  return (
    <Box py={'20px'} bgcolor={"#fff"}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} alt="logo" sx={{ width: "auto" }} />
        {isLargeScreen ? (
          <SearchComponent />
        ) : (
          <>
            <Box flexGrow={1} />
            <IconButton onClick={toggleDrawer("top", true)}>
              <MdSearch sx={{ color: "#777" }} />
            </IconButton>
          </>
        )}
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{ ".MuiDrawer-paperAnchorTop  ": { height: "100%" } }}
        >
          <Box sx={{ ml: "auto", p: "10px" }}>
            <IconButton
              onClick={toggleDrawer("top", false)}
              sx={{ "&:hover": { rotate: "360deg", transition: "0.5s" } }}
            >
              <MdClose />
            </IconButton>
          </Box>
          <Box sx={{ margin: "auto", marginTop: 0 }}>
            <SearchComponent />
          </Box>
        </Drawer>
        <Stack direction={"row"}>
          <IconButton aria-label="cart" sx={{ marginRight: "8px" }}>
            <StyledBadge
              badgeContent={3}
              sx={{
                ".MuiBadge-badge": {
                  backgroundColor: theme.palette.text.yellow,
                },
              }}
            >
              <TiShoppingCart fontSize={'1.8rem'}/>
            </StyledBadge>
          </IconButton>
          <IconButton aria-label="cart" sx={{ marginRight: "8px" }}>
            <StyledBadge
              badgeContent={3}
              sx={{
                ".MuiBadge-badge": {
                  backgroundColor: theme.palette.text.yellow,
                },
              }}
            >
              <GrFavorite fontSize={'1.4rem'}/>
            </StyledBadge>
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}
