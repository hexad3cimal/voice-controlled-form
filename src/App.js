import { Typography, Box } from "@material-ui/core";
import { VoiceProvider } from "./VoiceController";
import FormikForm from "./FormikForm";
function App() {
  return (
    <Box
      display="flex"
      style={{ textAlign: "center" }}
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <Typography variant="h4" component="h1">
        To set value say "set username [value] and set password [value]"
      </Typography>
      <VoiceProvider>
        <FormikForm />
      </VoiceProvider>
    </Box>
  );
}

export default App;
