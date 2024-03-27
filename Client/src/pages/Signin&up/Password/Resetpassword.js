//import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import logo from "../../../assets/logo.png";
import { useResetPasswordMutation } from "../../../services/Jsonserverapi";

const ResetPassword = () => {
  const theme = useTheme();
  const { token } = useParams();
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const handleResetPassword = async ({ password, passwordConfirm }) => {
    await resetPassword({ password, passwordConfirm, token })
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password Reset",
          text: "Password reset successfully 💕",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Password reset failed:", error);
        setTokenValid(false);
      });
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: "onBlur" });

  const passwordm = watch("password", "");

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
              Choose a new Password
            </Typography>
          </Box>
          <Box mt="20px" border="1px gray solid" borderRadius="10px" p="20px">
            <Typography style={{ color: grey[600], marginBottom: "15px" }}>
              Create a new password
            </Typography>
            {!tokenValid && (
              <Typography
                color="error"
                sx={{ fontSize: "0.9rem", marginBottom: "15px" }}
              >
                Token has expired. Please request a new reset code.
              </Typography>
            )}
            <form onSubmit={handleSubmit(handleResetPassword)}>
              <Box mb="15px">
                <TextField
                  type="password"
                  placeholder="New password"
                  fullWidth
                  sx={{ marginTop: "5px", marginBottom: "5px" }}
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                />
                <Typography color="error" sx={{ fontSize: "0.9rem" }}>
                  {errors.password?.message}
                </Typography>
              </Box>
              <Box mb="15px">
                <TextField
                  type="password"
                  placeholder="Confirm new password"
                  fullWidth
                  sx={{ marginTop: "0px", marginBottom: "5px" }}
                  {...register("passwordConfirm", {
                    required: {
                      value: true,
                      message: "PasswordConfirm is required",
                    },
                    validate: {
                      matchPassword: (value) => {
                        return value === passwordm || "Passwords do not match";
                      },
                    },
                  })}
                />
                <Typography color="error" sx={{ fontSize: "0.9rem" }}>
                  {errors.passwordConfirm?.message}
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
                Save password
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default ResetPassword;
