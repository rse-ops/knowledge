---
title: Bash
tags: 
 - languages
 - bash
description: Getting started with bash
tutorials:
  - name: Bash
    links:
      - name: RIP Tutorial on Bash
        url: https://riptutorial.com/bash
---

# Bash

In high performance computing, we generally work in a terminal, meaning using some shell. Have you ever seen these lines 
at the top of your “shell scripts?”

```bash
#!/bin/sh
```

or

```bash
#!/bin/sh
```

Those first lines are the interpreter lines - or an instruction for what program to use to run the script. If you look at the variable `SHELL` in your terminal, you likely will see the shell that you are using as we speak!

```bash
echo $SHELL
/bin/bash
```

There is a [rich history](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) of how the Unix shell became the "Bourne again" shell, or what we commonly refer to as bash.

## So why bash?

The reason to get excited about bash is because there are SO many things you can do with it that you would typically rely on a higher level language (Python, R, etc.) to do. For example, you can trim strings, write functions to otherwise manipulate strings, calculate quantities, read files, count things... it’s a powerful language! Here is a one line function to make a string all lowercase:

```bash
lower() {
    printf '%s\n' "${1,,}"
}
```
```bash
$ lower LiKeOmGTaCoS
likeomgtacos
```

Specifically, if you are interested in little snippets to perform more complex operations, take a look at (or contribute to) the [bash bible](https://github.com/dylanaraps/pure-bash-bible). So the next time you want to do some special thing from the command line -- ask yourself if you can do it with bash first, before you delve into requiring a higher level language dependency.

## Loops

It's very easy to do loops in bash! Here is a simple for loop:

```bash
for node in compute{1..10}; do
  ssh $node 'hostname -s'
done
```

And a while loop:

```bash
count=1
while /bin/true; do
  echo "looped ${count} times"
  let count=${count}+1
  sleep 10
done
```

And a classic if-then-else statement

```bash
result=0

if [[ "$result" == "0" ]];then
  echo "Success"
else
  echo "Fail"
fi
```

or maybe you want to loop over files in a directory?

```bash
for file in $(ls $PWD); 
    do 
    echo $file; 
done
```

Another simple loop is literally just a line of space separated strings, like this:

```bash
$ for thing in "one" "two";
    do 
        echo $thing 
    done
```
```bash
one
two
```

## Calculator

You can add this to your `~/.bashrc` file to create a simple to use calculator:

```bash
# Results are trimmed to 2 decimal places
calc() { echo "scale=2; $*" | bc -l; }

# Results are not trimmed
calc_full() { echo "$*" | bc -l; }
```

Here is example usage:

```bash
$ calc "1024*8"       # Convert KB into MB
8192
```
```bash
$ calc "40*1.8+32"    # Convert Celcius to Fahrenheit
104.0
```
```bash
$ calc "(2+2)*(2-2)"  # You can also control the order of operation with ( )
0
```

These examples are referenced from [AskCI](https://ask.cyberinfrastructure.org/t/how-do-i-do-insert-thing-here-in-bash/744/4).
