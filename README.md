# Knowledge Base

Welcome to the RSE-ops Knowledge base! Here you can find guides and resources for the [RSE-ops landscape](https://rse-ops.github.io/landscape/).

![assets/img/rse-ops-roadmap.png](assets/img/rse-ops-roadmap.png)

## How to Contribute

### 1. Get the code

You can clone the repository right to where you want to host the docs:

```bash
git clone https://github.com/rse-ops/knowledge.git
cd knowledge
```

### 2. Add Documentation or Pages

You can add documentation as markdown files under [docs](docs) and make sure they are
generally linked from an index.md somewhere!


### 3. Build

You likely want to set up a python environment to install dependencies to:

```bash
python -m venv env 
source env/bin/activate
pip install -r requirements.txt
```

And then build docs:

```bash
cd _build/html/
python -m http.server 9999
```

And open your browser to [http://127.0.0.1](http://127.0.0.1).

### 5. Pull Request

We recommend that you submit your changes as a pull request, as we can review them and also have the spelling automatically checked.
If you want to check spelling on your own, you can install [https://github.com/crate-ci/typos](https://github.com/crate-ci/typos) and then run
the executable on the various folders:

```bash
$ typos ./_docs ./pages ./_data ./_posts 
```
If you don't want to do this, it will run during the CI, and you can see your typos in the GitHub workflow interface.

### Container Development

#### Software Dependencies

If you want to run the knowledge base via a container for development (dev) or production (prod) you can use containers. This approach requires installing [docker-ce](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/). 

#### Customization

Note that the [docker-compose.yml](docker-compose.yml) file is using the [jekyll/jekyll:3.8](https://hub.docker.com/r/jekyll/jekyll/tags) image. If you want to make your build more reproducible, you can specify a particular version for jekyll (tag). Note that at the development time of writing this documentation, the latest was tag 4.0.0,
and it [had a bug](https://github.com/fastai/fastpages/issues/267#issuecomment-620612896) that prevented the server from deploying.

If you are deploying a container to production, you should remove the line to
mount the bundles directory to the host in the docker-compose.yml. Change:

```yaml
    volumes: 
      - "./:/srv/jekyll"
      - "./vendor/bundle:/usr/local/bundle"
      # remove "./vendor/bundle:/usr/local/bundle" volume when deploying in production
```

to:

```yaml
    volumes: 
      - "./:/srv/jekyll"
```

This additional volume is optimal for development so you can cache the bundle dependencies,
but should be removed for production. 

#### Start Container

Once your docker-compose to download the base container and bring up the server:

```bash
$ docker-compose up -d
```

You can then open your browser to [http://localhost:4000](http://localhost:4000)
to see the server running.

> Node : changes `baseurl: ""` in _config.yml  when you are running in local and prod according to the requirement.

## TODO

- add custom functionality akin to sphinx gallery for examples
- quizzes and code alongside tutorials/articles
- completed pages for knowledge base
- top level "subpages"
- a ?highlight=word to highlight text on the page (akin to readthedocs)
- knowledge pages should have means to provide listing of tutorials / examples
- code blocks should be copy-pasteable
- some code blocks could be runnable!
- site should render into pdf
