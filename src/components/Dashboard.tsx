import { Box } from "@mui/material";
import { datasourceApi } from "../datasource-api";

export default function Dashboard() {
  console.log("Rendering Dashboard", datasourceApi);
  return (
    <Box>
      <h1>Dashboard</h1>
      <p>This is the dashboard content.</p>
    </Box>
  );
}
