import { ThemeProvider } from "@emotion/react";
import { PluginRegistry } from "@perses-dev/plugin-system";
import {
  ChartsProvider,
  generateChartsTheme,
  ErrorAlert,
  ErrorBoundary,
  getTheme,
} from "@perses-dev/components";
import { pluginLoader } from "./PersesPluginRegistry";
import { Typography } from "@mui/material";

type PersesDashboardProps = {
  children: React.ReactNode;
};

export function PersesDashboardProvider({ children }: PersesDashboardProps) {
  const muiTheme = getTheme("dark");
  const chartsTheme = generateChartsTheme(muiTheme, {});

  return (
    <>
      <h1>🏠 Greenhouse Platform Dashboard</h1>
      <Typography variant="body1" sx={{ marginBottom: "1rem" }}>
        Real-time monitoring and operational insights for Greenhouse platform
        administrators
      </Typography>
      <ThemeProvider theme={muiTheme}>
        <ChartsProvider chartsTheme={chartsTheme}>
          <ErrorBoundary FallbackComponent={ErrorAlert}>
            <PluginRegistry pluginLoader={pluginLoader}>
              {children}
            </PluginRegistry>
          </ErrorBoundary>
        </ChartsProvider>
      </ThemeProvider>
    </>
  );
}
