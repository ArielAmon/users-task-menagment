import { useRouteError, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";

interface RouterError {
  statusText?: string;
  message?: string;
}

////////////////////////////////////////////////////////////////////////////////////
//                    Styled components
////////////////////////////////////////////////////////////////////////////////////
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  backgroundColor: theme.palette.background.paper,
}));

const ErrorIcon = styled(ErrorOutlineIcon)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.error.main,
  marginBottom: theme.spacing(2),
}));

////////////////////////////////////////////////////////////////////////////////////
//                  Component function
////////////////////////////////////////////////////////////////////////////////////
export default function ErrorPage() {
  const error = useRouteError() as RouterError;
  const navigate = useNavigate();

  console.error(error);

  const errorMessage =
    error?.statusText || error?.message || "An unknown error occurred";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <Container maxWidth="sm">
        <StyledPaper elevation={3}>
          <ErrorIcon />
          <Typography variant="h4" component="h1" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 4 }}
          >
            {errorMessage}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ mt: 2 }}
          >
            Go Back to Home
          </Button>
        </StyledPaper>
      </Container>
    </Box>
  );
}
