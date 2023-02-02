# Monitoring

## Research Computing

What tools can you use to monitor the health of a cluster? Here are some recommendations:

- [Grafana](https://grafana.com/): provides operational dashboards to monitor cluster health.
- [Slurm-web](https://edf-hpc.github.io/slurm-web/): web frontend and REST API to [Slurm]({{ site.baseurl }}/docs/schedulers/slurm) workload manager. You can see job states, reservations, and node metrics.
- [Prometheus](https://prometheus.io/): open source monitoring solution used outside of the HPC space
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/): open source server to collect system metrics.
- [InfluxDB](https://www.influxdata.com/products/influxdb/): time series data platform
- [Netdata](https://www.netdata.cloud/): real-time node-level performance, however does not provide much history
- [XDMoD 17](https://open.xdmod.org/9.0/index.html): provides historical performance of jobs and queues, and resources
- [XDMoD SUPReMM](https://supremm.xdmod.org/9.0/supremm-overview.html): an extension that also provides job-level performance
- [Ganglia](http://ganglia.sourceforge.net/): Not real-time, but provides node-level performance and history. Note that in 2019 they were [looking for maintainers](https://sourceforge.net/p/ganglia/mailman/message/36795542/).
