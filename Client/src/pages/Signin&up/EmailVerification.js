import React, { useEffect } from "react";
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
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import { useVerifyCodeEmailMutation } from "../../services/Jsonserverapi";

const Verify = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [tokenValid, setTokenValid] = React.useState("");

  useEffect(() => {
    setTokenValid("");
  }, [register]);

  const [verifyCodeEmail, { isLoading }] = useVerifyCodeEmailMutation();
  const handleVerify = async (data) => {
      await verifyCodeEmail(data)
      .unwrap()
      .then(() => {
      Swal.fire({
        icon: "success",
        title: "Email Verified",
        text: "Your email has been successfully verified. You can now log in. 💕",
        timer: 5000,
        showConfirmButton: false,
      });
      navigate("/login");
    })
    .catch((error) =>{
      console.log(error);
      setTokenValid("Invalid verification code");
    })
  };

  // const handleVerify = async (data) => {
  //   try {
  //     await axios.get(
  //       `${process.env.REACT_APP_URL}/api/verify-email?verificationCode=${data.verificationCode}`
  //     );
  //     Swal.fire({
  //       icon: "success",
  //       title: "Email Verified",
  //       text: "Your email has been successfully verified. You can now log in. 💕",
  //       timer: 5000,
  //       showConfirmButton: false,
  //     });
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Verification failed:", error);
  //     setTokenValid("Invalid verification code");
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
              variant="h2"
              sx={{
                fontWeight: "700",
                fontSize: "1.75rem",
                lineHeight: "1",
                letterSpacing: "0.006em",
              }}
            >
              Verify e-mail address
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
              Enter the verification code sent to your email.
            </Typography>
            <form onSubmit={handleSubmit(handleVerify)}>
              <TextField
                type="text"
                fullWidth
                sx={{ marginTop: "5px", marginBottom: "5px" }}
                placeholder="Enter verification code"
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
                  mt: 2,
                  fontSize: "large",
                }}
              >
                Verify Email
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Verify;
