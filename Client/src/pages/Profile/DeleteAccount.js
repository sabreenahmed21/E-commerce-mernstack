/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { red } from "@mui/material/colors";
//import { useDeleteAccountMutation } from "../../services/Jsonserverapi";

const DeleteAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const accessToken = currentUser?.token;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState("");
  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  // const [deleteAccount] = useDeleteAccountMutation(accessToken);
  // const onSubmit = async (currentPassword) => {
  //   const res = await deleteAccount(currentPassword)
  //     .unwrap()
  //     .then(() => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Account deleted successfully!",
  //         timer: 3000,
  //         showConfirmButton: false,
  //       });
  //       console.log(res);
  //       dispatch(logout());
  //       navigate("/home");
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setErrorMessage(error.data.message);
  //     });
  // };

  const onSubmit = async (currentPassword) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_URL}/api/delete-me`,
        {
          data: currentPassword,
          headers :{
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(currentPassword),
        }
      );
      Swal.fire({
        icon: "success",
        title: "Account deleted successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
      dispatch(logout());
      navigate("/home");
      console.log(res);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={8}>
        <Box align="center" my={5}>
          <Link to={"/"}>
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Typography
            variant="h2"
            textTransform={"capitalize"}
            sx={{
              fontWeight: "700",
              fontSize: "1.75rem",
              lineHeight: "1",
              letterSpacing: "0.006em",
              textTransform: "capitalize",
            }}
          >
            Delete Your Account
          </Typography>
        </Box>
        <Box
          my="20px"
          border="1px gray solid"
          borderRadius="10px"
          p="20px"
          align="center"
        >
          <Typography
            gutterBottom
            variant="body1"
            sx={{ textTransform: "capitalize", color: theme.palette.grey[800] }}
          >
            Please enter your current password associated with your account, to
            delete your account
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box align="left" my={3}>
              <label>
                Current Password <span style={{ color: red[700] }}>*</span>
              </label>
              <TextField
                {...register("currentPassword", { required: true })}
                type="password"
                fullWidth
                margin="normal"
                error={!!errors.currentPassword || !!errorMessage}
                helperText={
                  errors.currentPassword
                    ? "Current password is required"
                    : errorMessage || ""
                }
                onInput={clearErrorMessage}
              />
            </Box>
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              fullWidth
              sx={{
                padding: "16.5px 14px",
                fontWeight: "600",
                letterSpacing: "0.06em",
                color: theme.palette.secondary.main,
                fontSize: "large",
                mb: 1,
              }}
            >
              Delete Account
            </Button>
            <Link to={"/"}>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                fullWidth
                sx={{
                  padding: "16.5px 14px",
                  fontWeight: "600",
                  letterSpacing: "0.06em",
                  bgcolor: theme.palette.secondary.main,
                  fontSize: "large",
                  ":hover": { bgcolor: theme.palette.secondary.main },
                }}
              >
                Back To Home
              </Button>
            </Link>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default DeleteAccount;
