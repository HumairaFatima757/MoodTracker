import React from "react";
import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import bgGif from "../../assets/gifs/bg.gif";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh", // 💡 exact height of screen
        width: "100vw",  // 💡 exact width of screen
        backgroundImage: `url(${bgGif})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        overflow: "hidden", // 💡 avoids scroll bars
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)", // dark overlay
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          zIndex: 2,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          px: 2,
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            lineHeight: 1.3,
          }}
        >
          📿📗🌿 Find Peace in Every Mood with the Quran
        </Typography>

        <Typography variant="h6">
          Let the Quran guide your emotions with wisdom and light.
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "lightgreen",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            "&:hover": {
              backgroundColor: "green",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/dashBoard")}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
