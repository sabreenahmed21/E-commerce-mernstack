import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../Redux/UserSlice";
import {
  Box,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { FaUser, FaUserCheck } from "react-icons/fa6";
import { MdArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);


  const handlelogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setOpen(!open);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setOpen(!open);
  };
  const handleSignInClick = (event) => {
    event.preventDefault(); 
    window.location.pathname = "/login"; 
  };


  return (
    <>
      {currentUser ? (
        <>
          <Box>
            <Tooltip title="Open settings">
              <Box
                onClick={handleOpenUserMenu}
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ color: "#fff", px: "8px" }}>
                  <FaUserCheck fontSize={"small"} />
                </IconButton>
                <Typography sx={{ lineHeight: 0, fontSize: "0.9rem" }}>
                  Hello, {currentUser.data.user.name}
                </Typography>
                {open ? (
                  <MdOutlineArrowDropUp />
                ) : (
                  <MdArrowDropDown sx={{ fontSize: "16px" }} />
                )}
              </Box>
            </Tooltip>
            <Menu
              sx={{
                mt: "46px",
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Button
                onClick={() => navigate("/profilePage")}
                sx={{ width: "100px", margin: " 0 20px", display: "block" }}
              >
                Your profile
              </Button>
              <Button
                onClick={handlelogout}
                sx={{ width: "100px", margin: " 0 20px" }}
              >
                logout
              </Button>
            </Menu>
          </Box>
        </>
      ) : (
        <Link
          onClick={handleSignInClick}
          to="/login"
          style={{
            color: "#fff",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton style={{ color: "#fff", paddingLeft: "3px" }}>
            <FaUser fontSize={"small"} />
          </IconButton>
          <Typography sx={{ lineHeight: 0, fontSize: "0.9rem" }}>
            Sign in
          </Typography>
        </Link>
      )}
    </>
  );
}
export default Profile;
