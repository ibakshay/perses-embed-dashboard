import { datasourceApi } from "../persesApi";
import { PersesDashboardProvider } from "./PersesDashboardProvider";
import { ViewDashboard } from "@perses-dev/dashboards";
import { sampleDashboard } from "../dashboard-sample";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { BrowserRouter } from "react-router-dom";
import { greenhouseDashboard } from "../greenhouse-sample";

export default function PersesDashboard() {
  console.log("Rendering Dashboard", datasourceApi);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <PersesDashboardProvider>
            <ViewDashboard
              // dashboardResource={sampleDashboard}
              dashboardResource={greenhouseDashboard}
              datasourceApi={datasourceApi}
              isReadonly={true}
              isVariableEnabled={true}
              isEditing={false}
              isCreating={false}
              isDatasourceEnabled={true}
            />
          </PersesDashboardProvider>
        </QueryParamProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
