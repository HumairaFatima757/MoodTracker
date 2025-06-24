import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signUpWithGoogle } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm();

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const onSubmit = async (data) => {
    const cleanedEmail = data.email.trim();

    try {
      await dispatch(
        signupUser({
          email: cleanedEmail,
          password: data.password,
          name: data.name,
          phone: data.phone,
        })
      ).unwrap();

      setSnack({
        open: true,
        message: "Signup successful!",
        severity: "success",
      });

      reset(); // clear form
    } catch (err) {
      const message = (err?.message || err || "").toLowerCase();

      if (message.includes("already")) {
        setError("email", {
          type: "manual",
          message: "Email already registered",
        });
      } else if (message.includes("invalid")) {
        setError("email", { type: "manual", message: "Invalid email address" });
      } else {
        setSnack({
          open: true,
          message: "Signup failed: " + err.message,
          severity: "error",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
     <Button
  variant="contained"
  color="primary"
  onClick={() => navigate("/dashboard")}
  sx={{
    position: "absolute", // 🔑 Key to placing it on top-right
    top: 16,               // distance from top
    right: 16,             // distance from right
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  }}
>
        Go Back
      </Button>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%", // allow responsiveness
        }}
      >
        <Box
          sx={{
            width: "400px",
            p: 3,
            border: "2px solid #1976d2",
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            SIGNUP
          </Typography>

          {/* Name Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ minWidth: 100 }}>Name:</Typography>
            <TextField
              fullWidth
              label="Enter your name"
              {...register("name", { required: "Name is required" })}
            />
          </Box>
          {errors.name && (
            <Typography color="error" fontSize="small">
              {errors.name.message}
            </Typography>
          )}

          {/* Email Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ minWidth: 100 }}>Email:</Typography>
            <TextField
              fullWidth
              label="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
          </Box>
          {errors.email && (
            <Typography color="error" fontSize="small">
              {errors.email.message}
            </Typography>
          )}

          {/* Password Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ minWidth: 100 }}>Password:</Typography>
            <TextField
              fullWidth
              label="Enter Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "At least 8 chars with uppercase, lowercase, number, special char",
                },
              })}
            />
          </Box>
          {errors.password && (
            <Typography color="error" fontSize="small">
              {errors.password.message}
            </Typography>
          )}

          {/* Phone Field */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography sx={{ minWidth: 100 }}>Phone No:</Typography>
            <TextField
              fullWidth
              label="Enter your phone No"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be 11 digits",
                },
              })}
            />
          </Box>
          {errors.phone && (
            <Typography color="error" fontSize="small">
              {errors.phone.message}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            fullWidth
            disabled={loading}
          >
            Register
          </Button>

          <Typography sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>

        {/* Google Button and Snackbar */}
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 2, width: "400px" }}
          onClick={() => dispatch(signUpWithGoogle())}
        >
          Continue with Google
        </Button>

        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            severity={snack.severity}
            onClose={handleSnackClose}
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Signup;
