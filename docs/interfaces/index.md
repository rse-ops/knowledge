# Interfaces

## Research Computing

### OnDemand

[OnDemand](https://openondemand.org/) is an application developed by the Ohio Supercomputing Center
that makes it easy to expose computational resources for remote access. It allows for file and job managemnt,
command-line access, monitoring, and integration of apps like notebooks for various languages.
You can read the [documentation](https://osc.github.io/ood-documentation/latest/) to get started.
To create a dummy environment to test, you can use [ood-compose](https://github.com/vsoch/ood-compose)
alongside [this tutorial for app development](https://osc.github.io/ood-documentation/release-1.6/app-development.html).
If you have any questions or issues, there is a [discourse here](https://discourse.osc.edu/c/open-ondemand/5).

## Scientific Applications

It's often the case that a researcher wants to deploy some kind of app, and sometimes even the memory or other resource requirements are extensive.
While there is no single answer for how to best do this, the following approaches are often used:

### Cloud Offerings

It can be fairly easy to deploy a containerized application to a cloud provider. Here are several services that you can use for
different provides:

#### Google Cloud

For all Google Cloud products, you are required to [create a Google project](https://cloud.google.com/gcp). You should check with your university research computing to see if there is a means to get an account through them, as it's common for universities to get discounts on these resources. 

 - [Compute Engine](https://cloud.google.com/compute/docs): is a straight forward strategy to deploy an instance, and then manage it yourself. You can either set up a simple web server, or run an application in a container. You are in charge of managing the instance.
 - [App Engine](https://cloud.google.com/appengine/docs): allows you to manage an app locally, and deploy from the command line. It's easy, but tends to be more expensive.
 - [Kubernetes](https://cloud.google.com/kubernetes-engine/): a scaled container cluster that is more complex, and only likely needed to maintain an app that needs to better scale, or multiple apps.
 - [Cloud Functions](https://cloud.google.com/functions/): appropriate if you have a set of small scripts (or web services) to run.
 - [Cloud Run](https://cloud.google.com/run/): A very simple way to run a container (also serverless).

For any Google Cloud product that you use, make sure to [estimate costs](https://cloud.google.com/products/calculator) and then [set alerts](https://cloud.google.com/billing/docs/how-to/budgets) in case they go over.
 
### Local Offerings

If your center can provide on-premise virtual machines, this is of course another option. This will require someone to manage the application (the server and certificates) so it likely will only be available at larger institutions, if at all.

### Hosted Offerings

#### Static Sites

If your app is static (e.g., uses basic JavaScript) you can host static content easily on [GitHub pages](https://pages.github.com/) or [Netlify](https://www.netlify.com/).

#### RShiny Apps

If you are familiar with R, you are likely familiar with [Shiny](https://shiny.rstudio.com/) and [shinyapps.io](https://www.shinyapps.io/) continues to offer free hosting for apps (up to 5 apps at 25 hours per month on a free plan, which is suitable for many small research groups).

## Science Gateways

A science gateway is another means to allow access to advanced computational resources, and unlike OnDemand which
is a general tool, they tend to be branded for a specific kind of science. The following science gateways
might be of interest to the RSEng community:

 - [https://chemcompute.org/](https://chemcompute.org/): Computational chemistry software for undergraduate teaching and research.

