import React, { useState } from "react";

import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
  Select,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { supabase } from "../../database/supabaseClient";
const moodOptions = [
  { label: "Excited 🤩", value: "Excited" },
  { label: "Sleepy 😴", value: "Sleepy" },
  { label: "Busy 🏃", value: "Busy" },
  { label: "Hungry 🍔", value: "Hungry" },
  { label: "In Love ❤️", value: "In Love" },
  { label: "Bored 😐", value: "Bored" },
  { label: "Confused 😕", value: "Confused" },
  { label: "Sick 🤒", value: "Sick" },
  { label: "Shocked 😲", value: "Shocked" },
  { label: "Relaxed 😌", value: "Relaxed" },
  { label: "Party Mode 🥳", value: "Party Mode" },
  { label: "Crying 😭", value: "Crying" },
  { label: "Thinking 🤔", value: "Thinking" },
  { label: "Scared 😱", value: "Scared" },
  { label: "Lazy 🛌", value: "Lazy" },
  { label: "Working 💻", value: "Working" },
  { label: "Studying 📚", value: "Studying" },
];

const moodIcons = {
  Excited: "🤩",
  Sleepy: "😴",
  Busy: "🏃",
  Hungry: "🍔",
  "In Love": "❤️",
  Bored: "😐",
  Confused: "😕",
  Sick: "🤒",
  Shocked: "😲",
  Relaxed: "😌",
  "Party Mode": "🥳",
  Crying: "😭",
  Thinking: "🤔",
  Scared: "😱",
  Lazy: "🛌",
  Working: "💻",
  Studying: "📚",
};
const DashBoard = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [ayah, setAyah] = useState("");

  const navigate = useNavigate();

  const handleMoodChange = async (event) => {
    const mood = event.target.value;
    setSelectedMood(mood);

    const { data, error } = await supabase
      .from("ayaat")
      .select("ayah")
      .eq("mood_name", mood)
      .single();
    if (error) {
      setAyah("❗ Error fetching ayah.");
      console.error(error);
    } else {
      setAyah(data?.ayah);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box", // ✅ FIX to include padding inside the width/height
        background: "linear-gradient(135deg,rgb(133, 226, 238), #fff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        px: { xs: 2, sm: 4, md: 6 },
        py: { xs: 4, sm: 6 },
      }}
    >
      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/signup")}
          sx={{
            backgroundColor: "green",
            "&:hover": {
              backgroundColor: "darkgreen",
            },
          }}
        >
          Make Account
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          mt: 6,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="green"
          sx={{
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Welcome , get Happiness from Quran in Every Mood 🚀
        </Typography>

        <FormControl
          sx={{ minWidth: 250, backgroundColor: "#fff", borderRadius: 2 }}
        >
          <InputLabel>Mood</InputLabel>
          <Select
            value={selectedMood}
            label="Mood"
            onChange={handleMoodChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {moodOptions.map((mood) => {
              return (
                <MenuItem key={mood.value} value={mood.value}>
                  {mood.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {ayah && (
          <Card
            elevation={6}
            sx={{
              width: { xs: "90%", sm: "80%", md: 400 },
              backgroundColor: "lightgreen",
              borderRadius: 4,
              boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              backdropFilter: "blur(8px)",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {moodIcons[selectedMood] || "🌿"} Qur'an Ayah for Your Mood
              </Typography>
              <Typography variant="body1">"{ayah}"</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default DashBoard;
