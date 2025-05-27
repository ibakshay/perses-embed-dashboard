import type { DashboardResource } from "@perses-dev/core";

export const greenhouseDashboard: DashboardResource = {
  kind: "Dashboard",
  metadata: {
    name: "Greenhouse Platform Metrics",
    createdAt: "2025-05-26T20:21:09.695597802Z",
    updatedAt: "2025-05-27T08:02:40.113381462Z",
    version: 28,
    project: "test",
  },
  spec: {
    display: {
      name: "Greenhouse Platform Metrics",
    },
    panels: {
      Alerts: {
        kind: "Panel",
        spec: {
          display: {
            name: "Alerts",
          },
          plugin: {
            kind: "Table",
            spec: {
              cellSettings: [
                {
                  backgroundColor: "#f10d0d",
                  condition: {
                    kind: "Value",
                    spec: {
                      value: "critical",
                    },
                  },
                },
              ],
              columnSettings: [
                {
                  hide: true,
                  name: "__name__",
                },
                {
                  hide: true,
                  name: "instance",
                },
                {
                  hide: true,
                  name: "job",
                },
                {
                  hide: true,
                  name: "namespace",
                },
                {
                  hide: true,
                  name: "container",
                },
                {
                  hide: true,
                  name: "endpoint",
                },
                {
                  hide: true,
                  name: "timestamp",
                },
                {
                  hide: true,
                  name: "value",
                },
              ],
              defaultColumnWidth: "auto",
              density: "standard",
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query: 'ALERTS{alertstate="firing", severity="critical"}',
                  },
                },
              },
            },
          ],
        },
      },
      ControllerCPUUsage: {
        kind: "Panel",
        spec: {
          display: {
            name: "Controller CPU Usage",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                position: "bottom",
              },
              thresholds: {
                steps: [
                  {
                    value: 50,
                  },
                ],
              },
              yAxis: {
                format: {
                  unit: "percent",
                },
                label: "",
                show: true,
              },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'rate(process_cpu_seconds_total{job="$job", namespace="$namespace", pod="$pod"}[5m]) * 100',
                  },
                },
              },
            },
          ],
        },
      },
      ControllerMemoryUsage: {
        kind: "Panel",
        spec: {
          display: {
            name: "Controller Memory Usage",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              yAxis: {
                format: {
                  unit: "bytes",
                },
                label: "",
                show: true,
              },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'process_resident_memory_bytes{job="$job", namespace="$namespace", pod="$pod"}',
                  },
                },
              },
            },
          ],
        },
      },
      FailingPlugins: {
        kind: "Panel",
        spec: {
          display: {
            name: "Plugins with workload failures",
          },
          plugin: {
            kind: "Table",
            spec: {
              columnSettings: [
                {
                  hide: true,
                  name: "timestamp",
                },
                {
                  hide: true,
                  name: "value",
                },
              ],
              density: "standard",
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'count by(pluginDefinition, plugin)(greenhouse_plugin_workload_status_up{job="greenhouse-controller-manager-metrics-service"} == 0)',
                  },
                },
              },
            },
          ],
        },
      },
      PluginswithFailingtests: {
        kind: "Panel",
        spec: {
          display: {
            name: "Plugins with Failing tests",
          },
          plugin: {
            kind: "Table",
            spec: {
              columnSettings: [
                {
                  hide: true,
                  name: "__name__",
                },
                {
                  hide: true,
                  name: "container",
                },
                {
                  hide: true,
                  name: "endpoint",
                },
                {
                  hide: true,
                  name: "instance",
                },
                {
                  hide: true,
                  name: "pod",
                },
                {
                  hide: true,
                  name: "result",
                },
                {
                  hide: true,
                  name: "job",
                },
                {
                  hide: true,
                  name: "service",
                },
                {
                  hide: true,
                  name: "timestamp",
                },
                {
                  name: "plugin",
                },
                {
                  name: "cluster",
                },
                {
                  name: "namespace",
                },
                {
                  header: "Retry Times",
                  name: "value",
                },
              ],
              density: "standard",
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'greenhouse_plugin_chart_test_runs_total{result!="Success", result!="NoTests"}',
                  },
                },
              },
            },
          ],
        },
      },
      RemoteClustersOverview: {
        kind: "Panel",
        spec: {
          display: {
            name: "Remote Clusters Overview",
          },
          plugin: {
            kind: "Table",
            spec: {
              columnSettings: [
                {
                  name: "cluster",
                },
                {
                  hide: true,
                  name: "__name__",
                },
                {
                  hide: true,
                  name: "container",
                },
                {
                  hide: true,
                  name: "endpoint",
                },
                {
                  hide: true,
                  name: "instance",
                },
                {
                  hide: true,
                  name: "job",
                },
                {
                  hide: true,
                  name: "pod",
                },
                {
                  hide: true,
                  name: "service",
                },
                {
                  hide: true,
                  name: "timestamp",
                },
                {
                  hide: true,
                  name: "value",
                },
                {
                  header: "K8s Version",
                  name: "version",
                },
              ],
              density: "standard",
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query: "greenhouse_cluster_k8s_versions_total",
                  },
                },
              },
            },
          ],
        },
      },
      TotalTeammembers: {
        kind: "Panel",
        spec: {
          display: {
            name: "Total Team members",
          },
          plugin: {
            kind: "StatChart",
            spec: {
              calculation: "last-number",
              format: {
                unit: "decimal",
              },
            },
          },
          queries: [
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query: "sum(greenhouse_teammembership_members_count)",
                  },
                },
              },
            },
          ],
        },
      },
    },
    layouts: [
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Overview",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 6,
              y: 0,
              width: 10,
              height: 7,
              content: {
                $ref: "#/spec/panels/RemoteClustersOverview",
              },
            },
            {
              x: 0,
              y: 0,
              width: 6,
              height: 7,
              content: {
                $ref: "#/spec/panels/TotalTeammembers",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Alerts 🚨",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 6,
              content: {
                $ref: "#/spec/panels/FailingPlugins",
              },
            },
            {
              x: 0,
              y: 6,
              width: 12,
              height: 6,
              content: {
                $ref: "#/spec/panels/Alerts",
              },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 6,
              content: {
                $ref: "#/spec/panels/PluginswithFailingtests",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Controller Metrics",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 9,
              content: {
                $ref: "#/spec/panels/ControllerCPUUsage",
              },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 9,
              content: {
                $ref: "#/spec/panels/ControllerMemoryUsage",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          items: [],
        },
      },
    ],
    variables: [
      {
        kind: "ListVariable",
        spec: {
          display: {
            hidden: false,
          },
          defaultValue: "kube-monitoring-prometheus",
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "job",
              matchers: ["prometheus_build_info"],
            },
          },
          name: "prometheus",
        },
      },
      {
        kind: "ListVariable",
        spec: {
          display: {
            hidden: false,
          },
          defaultValue: "greenhouse",
          allowAllValue: false,
          allowMultiple: false,
          sort: "none",
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "namespace",
              matchers: ["controller_runtime_reconcile_total"],
            },
          },
          name: "namespace",
        },
      },
      {
        kind: "ListVariable",
        spec: {
          display: {
            hidden: false,
          },
          defaultValue: "greenhouse-controller-manager-metrics-service",
          allowAllValue: false,
          allowMultiple: false,
          sort: "none",
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "job",
              matchers: [
                'controller_runtime_reconcile_total{namespace=~"$namespace"}',
              ],
            },
          },
          name: "job",
        },
      },
      {
        kind: "ListVariable",
        spec: {
          display: {
            name: "pod",
            hidden: false,
          },
          defaultValue: "greenhouse-controller-manager-6d7d54c697-7fch9",
          allowAllValue: false,
          allowMultiple: false,
          sort: "none",
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "pod",
              matchers: [
                'controller_runtime_reconcile_total{namespace=~"$namespace", job=~"$job"}',
              ],
            },
          },
          name: "pod",
        },
      },
    ],
    duration: "1h",
    refreshInterval: "0s",
  },
};
