import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginRegisterPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const url = isRegistering ? "/api/auth/register" : "/api/auth/login";
    const body = isRegistering
      ? JSON.stringify({ email, username, password })
      : JSON.stringify({ email, password });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        navigate("/");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Typography variant="h4" gutterBottom>
              {isRegistering ? "Register" : "Login"}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {isRegistering && (
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isRegistering}
                fullWidth
                margin="normal"
                sx={{
                    "& .MuiInputBase-input::placeholder": {
                      color: "white",
                    },
                    "& .MuiInputBase-input": {
                      color: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                        color: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: "white",
                    },
                  }}
              />
            )}

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    color: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              margin="normal"
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "white",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {isRegistering ? "Register" : "Login"}
            </Button>

            <Button
              onClick={() => setIsRegistering(!isRegistering)}
              sx={{ mt: 2 }}
            >
              {isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginRegisterPage;
