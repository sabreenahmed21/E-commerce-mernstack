import React, { useEffect } from "react";
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
import { useVerifyCodePasswordMutation } from "../../../services/Jsonserverapi";
import logo from "../../../assets/logo.png";
// import axios from "axios";

const Verifypassword = () => {
  const theme = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tokenValid, setTokenValid] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTokenValid("");
  }, [register]);

  // const handleVerifyCode = async (data) => {
  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_URL}/api/verifycode`,
  //       {
  //         code: data.verificationCode,
  //       }
  //     );
  //     const token = response.data.data;
  //     navigate(`/resetpassword/${token}`);
  //   } catch (error) {
  //     setTokenValid(error.response.data.message);
  //   }
  // };

  const [verifyCodePassword, { isLoading }] = useVerifyCodePasswordMutation();
  const handleVerifyCode = async (data) => {
    const response = await verifyCodePassword(data.verificationCode);
    if (response && response.data && response.data.data) {
      const token = response.data.data;
      navigate(`/resetpassword/${token}`);
    } else {
      setTokenValid(response.error.data.message);
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
              variant="h2"
              sx={{
                fontWeight: "700",
                fontSize: "1.75rem",
                lineHeight: "1",
                letterSpacing: "0.006em",
                textTransform: "capitalize",
              }}
            >
              Enter Security Code
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
              Please check your email for a message with your code. Your code is
              8 digits along.
            </Typography>
            <form noValidate onSubmit={handleSubmit(handleVerifyCode)}>
              <TextField
                type="text"
                fullWidth
                placeholder="Enter code"
                sx={{ marginTop: "5px", marginBottom: "5px" }}
                {...register("verificationCode", {
                  required: {
                    value: true,
                    message: "Verification code is required",
                  },
                })}
                error={Boolean(errors.verificationCode || tokenValid)}
              />
              <Typography color="error" sx={{ fontSize: "0.9rem" }}>
                {errors.verificationCode?.message || tokenValid}
              </Typography>
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
                  mt: 3,
                }}
              >
                Continue
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Verifypassword;
