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

type PersesDashboardProps = {
  children: React.ReactNode;
};

export function PersesDashboardProvider({ children }: PersesDashboardProps) {
  const muiTheme = getTheme("dark");
  const chartsTheme = generateChartsTheme(muiTheme, {});

  return (
    <ThemeProvider theme={muiTheme}>
      <ChartsProvider chartsTheme={chartsTheme}>
        <ErrorBoundary FallbackComponent={ErrorAlert}>
          <PluginRegistry pluginLoader={pluginLoader}>
            {children}
          </PluginRegistry>
        </ErrorBoundary>
      </ChartsProvider>
    </ThemeProvider>
  );
}
