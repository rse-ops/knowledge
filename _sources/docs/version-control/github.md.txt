# Contributing to a Community

## Why do we use GitHub?

[GitHub](https://github.com) is a place to collaborate.  You can think of it like a fun social
network for people that like to code, where the unit of sharing is the code itself.
It's also good for documents and other files to be shared. But why GitHub, over say,
some other shared file service like [Google Docs](https://docs.google.com/)? Or why not
just keep them on our local machines? GitHub offers us several nice features:

 1. easily collaborate on common files
 2. advanced reviewing tools and version history
 3. keep a record of discussions, and every change made
 4. be able to revert back to previous versions, if needed
 5. create pretty web interfaces

Some of the points above will be reviewed in more detail. If you don't care about high level
stuff, jump down to the [Getting Started with Github](http://127.0.0.1:4000/knowledge/docs/version-control/github#getting-started-with-github)
tutorial.

### Permissionless collaboration

Anyone can propose changes, of course given they [sign up for a GitHub account](https://github.com/join). You don't need to be given permission to view or edit a document, as is required by some of the platforms mentioned previously. The design
of GitHub works to provide a structured way to do it, which we will discuss in this short guide.

### Advanced reviewing tools

When you open up a Google Doc, you might be able to comment or write in revision mode, but
when you do so, you are working with the entire document. GitHub allows
you to separate your working changes from the production version, ensuring that review and discussion
can proceed before anything is made final. If you imagine changes over time like a tree, git allows us to
create separate branches with different change histories. We can then propose that our changes are integrated
into the main branch, which is literally called "main." By way of these branches, several people can work on their
own special changes at the same time without it being confusing. Along with this more detailed ability to edit,
there is an integrated approval workflow, straightforward visualizations of what changed, "diffs," 
and powerful automatic testing (called continuous integration or CI). GitHub even has recently added more venues
to have discussions, including [GitHub Discussions](https://docs.github.com/en/discussions) and [project planning](https://github.com/features/issues/).
The extent that you want to use these extra features is up to you and your team! For most, issues with [labels](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/encouraging-helpful-contributions-to-your-project-with-labels)
and milestones are sufficient.

### Detailed history

Lets say that you want to understand who added a piece of code, and when or why it was added? 
GitHub has something called [git blame](https://help.github.com/en/github/managing-files-in-a-repository/tracking-changes-in-a-file)
that allows you to easily see this. Along with git blame, you can very easily see the entire history for any file.

### Web Interfaces

Wouldn't it be cool to make websites? Yes! GitHub provides something called [GitHub Pages](https://pages.github.com/)
that will allow you to essentially write [markdown files](https://en.wikipedia.org/wiki/Markdown) (extension *.md) and have them render into beautiful, webby content. For example, the documentation you are reading right now is totally made up of markdown files and some styling, and you
can see the entire structure at the repository [here](https://github.com/rse-ops/knowledge).


## Can I use GitHub if I'm not a programmer?

Absolutely yes! So much of software projects extend beyond just code. A healthy project has documentation, diagrams, 
tutorials, and other image or text content. If you learn the basics of git and using GitHub, you can contribute
to open source communities eve if you aren't a programmer.

## What mindset should I have when contributing?

Learning new things is challenging, and working with people is also challenging, especially in text-only communication, and living
through a global pandemic. It's important to realize that if using GitHub and git is entirely new to you, it's okay that things will at first be hard. 
You'll typically start out and not entirely be sure about what the commands you are copy pasting are doing. 
If this sounds like your experience, please remember the following!

### Inexperienced != Incapable

Every current user of GitHub, or any technology for that matter, was new at  some point. Think of someone that you consider proficient or expert, and 
realize that they at some point were in the same shoes as you. The fact that you are new to a technology says nothing about what you
are capable of, of your innate abilities. It only says that you are new and learning, and will get better with practice.

### It's okay to ask for help

What does it mean to ask for help? You might have questions, feedback, or a general comment, or just want to talk to someone. Asking for help can be daunting, but you shouldn't be afraid to do so. For every one person that is ornery and doesn't want to help, there are easily 10 that do want to help and support you. Depending on the opensource community you want to engage with or your institution, there are usually Slack or other communication channels you can join. And hey, if you feel like you are on your own, [open an issue](https://github.com/rse-ops/knowledge/issues) to chat with us!

### I will improve

As long as you don't give up and keep trying, you will slowly improve. You will only stop improving if you decide to stop, which is something
that is also an option. There is something to say for knowing when to keep going, and knowing when to quit.
For programming, or using git or GitHub, it's good to have a learning mindset. Realize that it's
okay to ask for help, and if you keep trying you will grow over time. You also will probably  meet
interesting people, and have some fun, which is a bonus!


## Getting Started with GitHub

Let's get started with GitHub!

### 1. Create an account on GitHub

If you haven't yet, you get to [create an account](https://github.com/)
to choose a username and provide your email. When you think about it, GitHub is just another super
geeky social network where you'll make a lot of new friends, and connect
with friends that you already might have on their GitHub accounts.
Once you have an account, don't forget to upload a profile picture and add
any other metadata of interest under [settings](https://github.com/settings/profile).
If you want to have some fun and make a "README" for your profile, you can [do that too](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme).

### 2. Install git

GitHub is really powered with [git](https://git-scm.com/).
You'll first want to [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
At this point, you have two options. Since the RSE-ops community is heavily HPC based and we like automation, we are going to encourage
you to get started using the command line, which we will cover in this tutorial. If the command line isn't your thing, then you should
[check out GitHub desktop](https://help.github.com/en/desktop/getting-started-with-github-desktop).

### 3. Fork the Repository

Okay, now we're going to talk about silverware. Actually, we're going to talk about
forking a repository. Remember that a repository is like a set of files on GitHub's server.
For example, the repository content you are reading now is hosted at [github.com/rse-ops/knowledge](https://github.com/rse-ops/knowledge) 
and you can run git commands to interact with it. In our case,
we are going to "fork" it, which means navigating to that page, and clicking
"Fork" in the upper right, and then selecting your GitHub account. GitHub will then
jump you over to your newly forked repository, congratulations - you just 
created your first repository!

### 4. Clone your Fork

Now you want to work on files. This is a pretty extensive knowledge base, so for your first contribution
you can choose any page in `_docs` and make an edit. But how do we do this? GitHub does offer a way to edit files
in the interface if you navigate to the file and click "edit," but we want to walk you though how to do this on the command line,
where you'll have a lot more power. Let's first talk about the idea of "cloning." It's
called cloning because you are doing exactly that - there is a repository in
the cloud (on GitHub servers) somewhere that you want to dump (or rather, pull)
onto your local machine. This will be your first command with git ever run!

First cd to some location where you want to put your GitHub projects. Maybe you
would want to organize by language, or GitHUb organization? For example, I have this
path on my Desktop:

```bash
cd ~/Desktop/Code
```

Once we are happily sitting where we want to create a new folder, we can
issue the GitHub command to clone. Given that our username is `[username]`
that would look like either of these:

```bash
$ git clone git@github.com:[username]/knowledge.git
$ git clone https://github.com/[username]/knowledge.git
```

What's going on here? In the first command, we've set up [an ssh key](https://help.github.com/en/enterprise/2.18/user/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account) and are cloning using it. For the second we 
haven't. You are totally fine to do the second, although when you have a few minutes,
the first is the more secure and better option. You should probably do that now, if you haven't already.
Also note that when you clone, you can name the repository something else:

```bash
$ git clone git@github.com:[username]/knowledge.git docs/
```

The above clones the knowledge repository and names the directory "docs."

### 5. Make a Change

Okay, let's cd into the knowledge base and then make a change!

```bash
$ cd knowledge
```

Before we edit any files, you can do `git branch` to see the branch you are actively
working on. The default is usually called "main," and old repositories will use "master." 
It doesn't have special meaning (although it can be changed) but is really just a convention. 

```bash
$ git branch
*main
```

If you had other branches they would show up too, but without the star. The little
star indicates "this is the branch that we are sitting on."

> What is a branch?

A branch corresponds to a particular set of changes you are working on, perhaps
related to a specific feature. Branches make it possible to work on multiple
different changes at once, or in parallel. If you take a look in your current folder, there is a little hidden folder called .git.
We aren't going to discuss the contents in detail, but this is where every single
change and record is kept. The branches that you create are kept here, and we can
do an action of "checking out" any particular branch when we want to work on it.
If you are super curious you can look at `.git/config` to see how your git repository is configured.

Let's do that now - we will create a new branch to make some change to a file in `_docs`

```bash
$ git checkout -b add/some-meaningful-name
```

The little `-b` in the command above indicates to create a new branch.
You should generally choose a branch name that describes your contribution. The first
part "add" is an action, and you could imagine this also being "update" or "fix" or similar.
The second part is the specific thing - perhaps you want to "clarify-singularity-binds" or something
similar. Personally speaking, I like to have longer branch names that clearly identify what the branch
is aiming to do, because otherwise I'll forget. If you are responding to a particular issue on GitHub,
you can also choose to name the branch based on that, e.g., `fix/issue-111`.

And that's it - you are now sitting on a new branch and you can make changes.
So do it! Choose a markdown file in `_docs` and make some changes. It should be organized fairly logically,
and if you want to add a new document but aren't sure where to do it, please [open an issue](https://github.com/rse-ops/knowledge/issues)!

### 6. Commit the Change

The action of "committing" means that you are happy with a current state,
and want to write the change officially to your .git directory.
To give meaning to future humans, you'll also write a message that describes it.
This is when we will run the following:

```bash
$ git commit -a -m "Adding my contribution (be specific!) to the article on <topic>"
```

Reading the above, it says to "commit ALL changes with the message X." If you have configured
a gpg key, you can also [sign commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
with `-s`:

```bash
$ git commit -a -s -m "Adding my contribution (be specific!) to the article on <topic>"
```

The above also says "commit ALL changes with the message X, and sign the commit to verify it's me." 

### 7. Push to your fork branch

Remember that this is all sitting on your local machine. You next need
to push this up to your remote (on GitHub servers). You can do that as follows:

```bash
$ git push origin add/some-meaningful-name
```

Where `add/some-meaningful-name` is the branch that we are using, and "origin" is another
weird GitHub convention that refers to the default remote name.
Actually, if you look at the .git/config file you can see how this is named. 
Here is what mine looks like.

```
[core]
	repositoryformatversion = 0
	filemode = true
	bare = false
	logallrefupdates = true
[remote "origin"]
        url = git@github.com:rse-ops/knowledge
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
```

See where it says "origin"? I could change that to "pancakes" and then do:

```bash
$ git push pancakes add/some-meaningful-name
```


### 8. Open Pull Request

Now your branch is on GitHub! Let's do the final step, opening the pull request.
You can navigate to your repository page, click on Pull Requests, and open the pull request! You want it to be your branch (of your fork) against the main branch here. 

 1. Click the button to open the pull request, selecting the correct branch
 2. Write a description in the box for what you are changing, and what issues (this one!) you are addressing. Note that if you say anything along the lines of "fixes #1111111" or "closes #111111111" it will automatically close the issues when you merge (neat!)
 3. If it's a draft you can mark as a draft, and put remaining questions or points of discussion in the description.
 4. Ping others that might want to review or contribute to the discussion

And that should be it! Working on GitHub is usually pretty fun, and a good learning experience for forking, cloning, changing, committing, and opening a pull request. And guess what, there are definitely more advanced stuffs you can do with git, but that's largely the basics that will empower you to contribute to most projects! That said, if you want us to add any additional examples here, please [let us know](https://github.com/rse-ops/knowledge/issues).
