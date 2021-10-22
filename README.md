# Knowledge Base

[![CircleCI](https://circleci.com/gh/rse-ops/knowledge/tree/main.svg?style=svg)](https://circleci.com/gh/rse-ops/knwoledge/tree/main)

Welcome to the RSE-ops Knowledge base! Here you can find guides and resources for the [RSE-ops landscape](https://rse-ops.github.io/landscape/).

![assets/img/rse-ops-roadmap.png](assets/img/rse-ops-roadmap.png)

## How to Contribute

### 1. Get the code

You can clone the repository right to where you want to host the docs:

```bash
git clone https://github.com/rse-ops/knowledge.git
cd knowledge
```

### 2. Customize

#### Documentation or Pages

You will most likely want to add docs or knowledge articles, in which case you can write them to [_docs](https://github.com/rse-ops/knowledge/blob/main/_docs) under the appropriate category of organization and they will show up.

To add top level pages (e.g. "About") write them into the [pages](https://github.com/rse-ops/knowledge/blob/main/pages) folder. 
For pages you must define urls based on the `permalink` attribute at the top of the markdown.

To edit the main navigation on the left, update [_data/toc.myl](https://github.com/rse-ops/knowledge/blob/main/_data/toc.yml).
The top navigation is controlled by [_data/navigation.yml](https://github.com/rse-ops/knowledge/blob/main/_data/navigation.yml)

#### Terms

To add a new term to the terms pages, add it to the [_data/terms.yaml](_data/terms.yaml)
file. It should be self explanatory - whether you have a term or acronym, it will have a name
and definition. If you are working on a specific documentation page under `_docs`, you can also add
a list of terms there, as follows:

```yaml
terms:
 - name: Avocado
   definition: The most delicious of things.
```

### 3. Options

Most of the configuration values in the [_config.yml](https://github.com/rse-ops/knowledge/blob/main/_config.yml) are self explanatory,
and for more details, see the [Developer getting started](https://rse-ops.github.io/knowledge/docs/developer)
rendered on the site.

### 4. Serve

Depending on how you installed jekyll:

```bash
jekyll serve
# or
bundle exec jekyll serve
```

**NOTE:** If the above serve command throws an error saying `require': cannot load such file -- webrick (LoadError)` try to run `bundle add webrick` to automatically add the webrick gem to your Gemfile, or manually add `gem "webrick"` line to the Gemfile and then run the serve command again.

### 5. Run as a container in dev or prod

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
- spell checking
