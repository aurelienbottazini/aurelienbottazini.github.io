A tutorial on how to create a tmux session selection script.

## Get the list of projects

The first step is to get the list of projects. I store them in two different locations.
`~/perso`, `~/work`. The easiest way to create that list is to use `ls`.

First attempt: `ls ~/perso ~/work` gives me extra lines
![](/img/posts/2022-06-01-tmux-session-creator/ls-extra-lines.jpg)

Second attempt: `ls -d ~/perso/* ~/work/*`. The `-d` argument prevents ls from recursively listing directories. In combination with `*` globbing, this makes my `ls` command more precise and removes the extra lines.
![](/img/posts/2022-06-01-tmux-session-creator/ls-correct.jpg)

## Prepare the list and pass it to fzf

- Sort the results
```shell
ls -d ~/perso/* ~/work/* | sort
```
- Remove the $HOME prefix as it is not usual while selecting the project. $HOME is a special shell variable that represents your user directory.
I use `cut -c` which cuts X characters from a string. `echo $HOME | wc -c` returns the number of characters for $HOME.
```shell
ls -d ~/perso/* ~/work/* ~/dotfiles | sort | cut -c$(echo $HOME | wc -c)-
```

- Pass the list to fzf-tmux. It's like fzf—a general-purpose command-line fuzzy finder—except if you are using tmux you get additional functionalities. I like `-p`, it shows the fzf input in a tmux popup
```shell
ls -d ~/perso/* ~/work/* ~/dotfiles | sort | cut -c$(echo $HOME | wc -c)- | fzf-tmux -p
```

- Pass the selected item to my `tat` script. Note the use of `xargs`. This is a good example of how to use interpolation with pipe chains. `-I "{}"` specifies I want to replace `{}` with the passed argument in `$HOME{}`. Now that I have selected the project I want to work on, I add back `$HOME` to the path as it make things easier with my tmux session creation script: `tat`
 ```shell
 ls -d ~/perso/* ~/work/* ~/dotfiles | sort | cut -c$(echo $HOME | wc -c)- | fzf-tmux -p | xargs -I "{}" tat "$HOME{}"
 ```

## Tmux

My `tat` script. The main function is `create_if_needed_and_attach` and is called at the very end of the script.

```shell
#!/bin/sh
#
# Attach or create tmux session named the same as:
# - current directory if no argument is passed
# - otherwise parent_directory/basename of the argument—must be a path—passed
#
# names are sanitized to ensure there are compatible with tmux

DIR=${1:-$PWD}

sanitized_path_name="/$(dirname $DIR | xargs basename)/$(basename $DIR | tr . -)"
session_name=$sanitized_path_name

create_if_needed_and_attach() {
  if is_in_tmux; then
    if ! does_session_exist; then
      create_detached_session
    fi
    tmux switch-client -t "$session_name"
  else
    start_tmux
  fi
}

is_in_tmux() {
  [ -n "$TMUX" ]
}

does_session_exist() {
  tmux list-sessions | sed -E 's/:.*$//' | grep -q "^$session_name$"
}

create_detached_session() {
  (TMUX='' tmux -f ~/.config/tmux/tmux.conf new-session -c $DIR -Ad -s "$session_name")
}

start_tmux() {
  tmux -u -f ~/.config/tmux/tmux.conf new-session -As "$session_name"
}

create_if_needed_and_attach
```

## Add the command to my tmux config

Inside *tmux.conf*

```
bind C-c run-shell "ls -d ~/perso/* ~/work/* ~/dotfiles | sort | cut -c$(echo $HOME | wc -c)- | fzf-tmux -p | xargs -I\"{}\" tat \"$HOME\"{}"
```

Run the command with`C-b C-c`. `C-c` as a mnemonic for _create_.
