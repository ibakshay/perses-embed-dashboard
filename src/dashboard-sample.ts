import type { DashboardResource } from "@perses-dev/core";

export const sampleDashboard: DashboardResource = {
  kind: "Dashboard",
  metadata: {
    name: "prometheus-overview",
    createdAt: "2025-05-23T16:17:39.307996439Z",
    updatedAt: "2025-05-23T16:17:39.307996439Z",
    version: 0,
    project: "greenhouse",
  },
  spec: {
    display: {
      name: "Prometheus / Overview",
    },
    panels: {
      "0_0": {
        kind: "Panel",
        spec: {
          display: {
            name: "Prometheus Stats",
          },
          plugin: {
            kind: "Table",
            spec: {
              columnSettings: [
                {
                  header: "Job",
                  name: "job",
                },
                {
                  header: "Instance",
                  name: "instance",
                },
                {
                  header: "Version",
                  name: "version",
                },
                {
                  hide: true,
                  name: "value",
                },
                {
                  hide: true,
                  name: "timestamp",
                },
              ],
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
                      'count by (job, instance, version) (prometheus_build_info{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"})',
                  },
                },
              },
            },
          ],
        },
      },
      "1_0": {
        kind: "Panel",
        spec: {
          display: {
            name: "Target Sync",
            description:
              "Monitors target synchronization time for Prometheus instances",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
              },
              yAxis: {
                format: {
                  unit: "seconds",
                },
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
                      'sum by (job, scrape_job, instance) (\n  rate(prometheus_target_sync_length_seconds_sum{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval])\n)',
                    seriesNameFormat: "{{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
          ],
        },
      },
      "1_1": {
        kind: "Panel",
        spec: {
          display: {
            name: "Targets",
            description: "Shows discovered targets across Prometheus instances",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'sum by (job, instance) (prometheus_sd_discovered_targets{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"})',
                    seriesNameFormat: "{{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
          ],
        },
      },
      "2_0": {
        kind: "Panel",
        spec: {
          display: {
            name: "Average Scrape Interval Duration",
            description:
              "Shows average interval between scrapes for Prometheus targets",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
              },
              yAxis: {
                format: {
                  unit: "seconds",
                },
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
                      '  rate(prometheus_target_interval_length_seconds_sum{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval])\n/\n  rate(prometheus_target_interval_length_seconds_count{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval])',
                    seriesNameFormat:
                      "{{job}} - {{instance}} - {{interval}} Configured",
                  },
                },
              },
            },
          ],
        },
      },
      "2_1": {
        kind: "Panel",
        spec: {
          display: {
            name: "Scrape failures",
            description: "Shows scrape failure metrics for Prometheus targets",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'sum by (job, instance) (\n  rate(\n    prometheus_target_scrapes_exceeded_body_size_limit_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval]\n  )\n)',
                    seriesNameFormat:
                      "exceeded body size limit: {{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'sum by (job, instance) (\n  rate(\n    prometheus_target_scrapes_exceeded_sample_limit_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval]\n  )\n)',
                    seriesNameFormat:
                      "exceeded sample limit: {{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'sum by (job, instance) (\n  rate(\n    prometheus_target_scrapes_sample_duplicate_timestamp_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval]\n  )\n)',
                    seriesNameFormat:
                      "duplicate timestamp: {{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'sum by (job, instance) (\n  rate(\n    prometheus_target_scrapes_sample_out_of_bounds_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval]\n  )\n)',
                    seriesNameFormat:
                      "out of bounds: {{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
            {
              kind: "TimeSeriesQuery",
              spec: {
                plugin: {
                  kind: "PrometheusTimeSeriesQuery",
                  spec: {
                    query:
                      'sum by (job, instance) (\n  rate(\n    prometheus_target_scrapes_sample_out_of_order_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval]\n  )\n)',
                    seriesNameFormat:
                      "out of order: {{job}} - {{instance}} - Metrics",
                  },
                },
              },
            },
          ],
        },
      },
      "2_2": {
        kind: "Panel",
        spec: {
          display: {
            name: "Appended Samples",
            description: "Shows rate of samples appended to Prometheus TSDB",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'rate(prometheus_tsdb_head_samples_appended_total{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}[$__rate_interval])',
                    seriesNameFormat:
                      "{{job}} - {{instance}} - {{remote_name}} - {{url}}",
                  },
                },
              },
            },
          ],
        },
      },
      "3_0": {
        kind: "Panel",
        spec: {
          display: {
            name: "Head Series",
            description: "Shows number of series in Prometheus TSDB head",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'prometheus_tsdb_head_series{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}',
                    seriesNameFormat: "{{job}} - {{instance}} - Head Series",
                  },
                },
              },
            },
          ],
        },
      },
      "3_1": {
        kind: "Panel",
        spec: {
          display: {
            name: "Head Chunks",
            description: "Shows number of chunks in Prometheus TSDB head",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'prometheus_tsdb_head_chunks{instance="100.64.1.52:9090",job="kube-monitoring-prometheus"}',
                    seriesNameFormat: "{{job}} - {{instance}} - Head Chunks",
                  },
                },
              },
            },
          ],
        },
      },
      "4_0": {
        kind: "Panel",
        spec: {
          display: {
            name: "Query Rate",
            description: "Shows Prometheus query rate metrics",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
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
                      'rate(\n  prometheus_engine_query_duration_seconds_count{instance="100.64.1.52:9090",job="kube-monitoring-prometheus",slice="inner_eval"}[$__rate_interval]\n)',
                    seriesNameFormat: "{{job}} - {{instance}} - Query Rate",
                  },
                },
              },
            },
          ],
        },
      },
      "4_1": {
        kind: "Panel",
        spec: {
          display: {
            name: "Stage Duration",
            description: "Shows duration of different Prometheus query stages",
          },
          plugin: {
            kind: "TimeSeriesChart",
            spec: {
              legend: {
                mode: "table",
                position: "bottom",
              },
              yAxis: {
                format: {
                  unit: "seconds",
                },
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
                      'max by (slice) (\n  prometheus_engine_query_duration_seconds{instance="100.64.1.52:9090",job="kube-monitoring-prometheus",quantile="0.9"}\n)',
                    seriesNameFormat: "{{slice}} - Duration",
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
            title: "Prometheus Stats",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 24,
              height: 6,
              content: {
                $ref: "#/spec/panels/0_0",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Discovery",
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
                $ref: "#/spec/panels/1_0",
              },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 6,
              content: {
                $ref: "#/spec/panels/1_1",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Retrieval",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/2_0",
              },
            },
            {
              x: 8,
              y: 0,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/2_1",
              },
            },
            {
              x: 16,
              y: 0,
              width: 8,
              height: 8,
              content: {
                $ref: "#/spec/panels/2_2",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Storage",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: "#/spec/panels/3_0",
              },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: "#/spec/panels/3_1",
              },
            },
          ],
        },
      },
      {
        kind: "Grid",
        spec: {
          display: {
            title: "Query",
            collapse: {
              open: true,
            },
          },
          items: [
            {
              x: 0,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: "#/spec/panels/4_0",
              },
            },
            {
              x: 12,
              y: 0,
              width: 12,
              height: 8,
              content: {
                $ref: "#/spec/panels/4_1",
              },
            },
          ],
        },
      },
    ],
    variables: [
      {
        kind: "ListVariable",
        spec: {
          display: {
            name: "job",
            hidden: false,
          },
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "job",
              matchers: ["prometheus_build_info{}"],
            },
          },
          name: "job",
          defaultValue: "kube-monitoring-prometheus",
        },
      },
      {
        kind: "ListVariable",
        spec: {
          display: {
            name: "instance",
            hidden: false,
          },
          allowAllValue: false,
          allowMultiple: false,
          plugin: {
            kind: "PrometheusLabelValuesVariable",
            spec: {
              labelName: "instance",
              matchers: [
                'prometheus_build_info{job="kube-monitoring-prometheus"}',
              ],
            },
          },
          name: "instance",
          defaultValue: "100.64.1.52:9090",
        },
      },
    ],
    duration: "1h",
    refreshInterval: "0s",
    datasources: {},
  },
};
