/* eslint-disable react-hooks/rules-of-hooks */
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Divider,
  useTheme,
  FormControlLabel,
  Checkbox,
  LinearProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Redux/UserSlice.js";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSignInMutation } from "../../services/Jsonserverapi.js";
import logo from "../../assets/logo.png";

export default function Login() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { currentUser } = useSelector((state) => state.user);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [register]);

  if (currentUser) {
    navigate("/home");
    return null;
  }

  const clearEmailError = () => {
    setEmailError("");
  };

  const clearPasswordError = () => {
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [signIn, {isLoading}] = useSignInMutation();

  const onSubmit = async (formData) => {
    dispatch(signInStart());
    try {
      const { data } = await signIn(formData);
      if (data.state === "success") {
        dispatch(signInSuccess(data));
        window.location.pathname = "/home";
      } else {
        dispatch(signInFailure(data.message));
        if (data.message === "User not found") {
          setEmailError(
            "Email not found. Please check your email and try again."
          );
        } else if (data.message === "User not verified") {
          setEmailError(
            "Email not verified. Please verify your email and try again."
          );
        } else if (data.message === "Incorrect password") {
          setPasswordError("Incorrect password");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const onSubmit = async (formData) => {
  //   dispatch(signInStart());
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_URL}/api/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     if (data.state === "success") {
  //       dispatch(signInSuccess(data));
  //       window.location.pathname = "/home";
  //       navigate("/home");
  //     } else {
  //       dispatch(signInFailure(data.message));
  //       if (data.message === "User not found") {
  //         setEmailError(
  //           "Email not found. Please check your email and try again."
  //         );
  //       } else if (data.message === "User not verified") {
  //         setEmailError(
  //           "Email not verified. Please verify your email and try again."
  //         );
  //       } else if (data.message === "Incorrect password") {
  //         setPasswordError("Incorrect password");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

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
            variant="h1"
            textTransform={"capitalize"}
            sx={{ fontSize: "25px", fontWeight:700, letterSpacing: "1px" }}
          >
            join the bazaar market
          </Typography>
        </Box>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box mb="20px">
            <label>Email</label>
            <TextField
              id="email"
              type="email"
              fullWidth
              sx={{ marginTop: "7px", marginBottom: "7px" }}
              {...register("email", {
                required: { value: true, message: "Email is required" },
              })}
              error={Boolean(errors.email || emailError)}
              onInput={clearEmailError}
            />
            <Typography color="error" sx={{ fontSize: "0.9rem" }}>
              {errors.email?.message || emailError}
            </Typography>
          </Box>
          <Box mb="20px">
            <label>Password</label>
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              sx={{ marginTop: "7px", marginBottom: "7px" }}
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
              error={Boolean(errors.password || passwordError)}
              onInput={clearPasswordError}
            />
            <Typography color="error" sx={{ fontSize: "0.9rem" }}>
              {errors.password?.message || passwordError}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={togglePasswordVisibility}
                />
              }
              label="Show Password"
              labelPlacement="end"
            />
          </Box>

          <Button
            variant="contained"
            size="medium"
            fullWidth
            type="submit"
            sx={{
              padding: "16.5px 14px",
              bgcolor: theme.palette.secondary.main,
              fontWeight: 600,
              fontSize: 'large'
            }}
          >
            Log in
          </Button>
        </form>
        <Link
          to="/forgetPassword"
          style={{
            color: " #1976d2 ",
            display: "flex",
            margin: " 20px 0",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          Forgotten password?
        </Link>
        <Divider>NEW TO BAZAAR?</Divider>
        <Box sx={{ display: "flex", marginTop: "20px" }}>
          <Typography color="initial">Don't have an account?</Typography>
          <Link
            to="/signup"
            style={{
              color: " #1976d2 ",
              paddingLeft: "5px",
            }}
          >
            Sign up
          </Link>
        </Box>
      </Box>
    </Container>
    </>
  );
}
