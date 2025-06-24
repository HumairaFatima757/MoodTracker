import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, sendMagicLink } from "../slices/authSlice";
import { Link } from "react-router-dom";




const Login = () => {
const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMsg, setSnackbarMsg] = useState("");

  const dispatch = useDispatch();
  const { error, user, loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
 const onSubmit = async (data) => {
  try {
    const resultAction = await dispatch(loginUser(data)).unwrap();
    
    // Optional: check for verification AFTER successful login
    if (!resultAction.verified) {
      alert("Please verify your email.");
      return;
    }

    // Redirect to dashboard if verified (you'll need a router like react-router-dom)
    // e.g., navigate("/dashboard");
    console.log("Login success, redirect to dashboard");

  } catch (err) {
    console.error("Login failed", err);
  }
};

  const handleMagicLink = () => {
    const email = getValues("email");
    if (!email) {
      setSnackbarMsg("Please enter your email first.");
      setSnackbarOpen(true);
      return;
    }
    dispatch(sendMagicLink(email));
    setSnackbarMsg("Magic link sent! Check your email.");
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          p: 2,

          height: "400px",
          width: " 400px",
          margin: "50px auto",
          padding: 3,
          border: "2px solid #1976d2",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          color="blue"
          gutterBottom
        >
          LOGIN
        </Typography>
        <br />
        

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: "Email is required" })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", { required: "Password is required" })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          
        </form>
        

        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}
        {user && (
          <Typography color="green" mt={2}>
            Welcome, {user.email}
          </Typography>
        )}

        <Button
          variant="outlined"
          color="info"
          onClick={handleMagicLink}
          fullWidth
          sx={{ mt: 2 }}
        >
          Send Link
        </Button>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMsg}
        />
        <Typography sx={{ mt: 2 }}>
  Don’t have an account?{" "}
  <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}>
    Sign up
  </Link>
</Typography>
      </Box>
    </>
  );
};

export default Login;
