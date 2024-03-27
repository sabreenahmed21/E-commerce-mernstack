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
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSignInMutation } from "../../services/Jsonserverapi.js";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, signInSuccess } from "../../Redux/UserSlice.js";

export default function Login() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [signIn, { isLoading }] = useSignInMutation();

  useEffect(() => {
    setEmailError("");
    setPasswordError("");
  }, [register]);

  if (currentUser) {
    navigate("/");
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

  const onSubmit = async (formData) => {
    try {
      const data = await signIn(formData).unwrap();
      dispatch(signInSuccess(data));
      window.location.pathname = "/";
    } catch (err) {
      console.log(err);
      if (err.data && err.data.message.includes("Email")) {
        setEmailError(err.data.message);
      } else {
        setPasswordError(err.data.message);
      }
    }
  };

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
              sx={{ fontSize: "25px", fontWeight: 700, letterSpacing: "1px" }}
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
                error={!!errors.email || !!emailError}
                helperText={
                  errors.email ? "Email is required" : emailError || ""
                }
                onInput={() => {
                  clearPasswordError();
                }}
              />
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
                error={!!errors.password || !!passwordError}
                helperText={
                  errors.password ? "Password is required" : passwordError || ""
                }
                onInput={() => {
                  clearEmailError();
                }}
              />
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
                fontSize: "large",
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
