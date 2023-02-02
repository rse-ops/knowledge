# Knowledge Base

Welcome to the RSE-ops Knowledge base! Here you can find guides and resources for the [RSE-ops landscape](https://rse-ops.github.io/landscape/).

![assets/img/rse-ops-roadmap.png](assets/img/rse-ops-roadmap.png)

⭐️ [View the Documentation](https://rse-ops.github.io/knowledge) ⭐️

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
$ typos ./docs ./index.md 
```

If you don't want to do this, it will run during the CI, and you can see your typos in the GitHub workflow interface.


## TODO

- add custom functionality for sphinx gallery for examples
- quizzes and code alongside tutorials/articles?
