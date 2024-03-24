import React, { useEffect, useState } from "react";
//import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import logo from "../../../assets/logo.png";
import { useForgetPasswordMutation } from "../../../services/Jsonserverapi";

export default function Forgotpassword() {
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  // const handleForgetPassword = async (email) => {
  //   try {
  //     await axios.post(
  //       `${process.env.REACT_APP_URL}/api/forgetpassword`,
  //       email
  //     );
  //     navigate("/verifypassword");
  //   } catch (error) {
  //     setEmailError(error.response.data.message);
  //   }
  // };

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const handleForgetPassword = async (email) => {
    await forgetPassword(email)
      .unwrap()
      .then(() => {
        navigate("/verifypassword");
      })
      .catch((error) => {
        setEmailError(error.data.message);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setEmailError("");
  }, [register]);

  return (
    <>
      {isLoading && <LinearProgress determinate />}
      <Container maxWidth="sm">
        <Box pt="50px" pb="50px">
          <Box textAlign={"center"} mb={3}>
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
              Forget your password?
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
              Please enter your email address associated with your account, and
              we'll send you code to reset your password
            </Typography>
            <form noValidate onSubmit={handleSubmit(handleForgetPassword)}>
              <Box mb="20px">
                <label htmlFor="email">Email</label>
                <TextField
                  type="email"
                  placeholder="you@email.com"
                  fullWidth
                  sx={{ marginTop: "5px", marginBottom: "5px" }}
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                  error={Boolean(errors.email || emailError)}
                />
                <Typography color="error" sx={{ fontSize: "0.9rem" }}>
                  {errors.email?.message || emailError}
                </Typography>
              </Box>
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
                }}
              >
                Send reset code
              </Button>
            </form>
            {isLoading && (
              <Typography variant="body1" color="initial" mt={2} align="center">
                Loading...
              </Typography>
            )}
            <Link
              to="/login"
              style={{
                color: " #1976d2 ",
                textDecoration: "none",
                marginTop: "15px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Go back
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
