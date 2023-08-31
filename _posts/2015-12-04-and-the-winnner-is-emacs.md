---
tags: emacs
---
I am playing a *lot* with text editors, having the best set up is
an obsession.

Actually I am wasting a *lot of time* switching between different
editors. But with it comes a better understanding than most people
have about their different strength with regard to each other.

Recently I have tried Vim and Atom. Both are great but fall in some
areas that makes them the wrong choice for me. But I always fall back
to Emacs.

I believe this is the final switch (a small voice inside my brain says “as
usual”).

Here are some reasons.

## Run inside the terminal

Sometimes I want to code inside the terminal. In fact on some days I
code exclusively inside the terminal. It allows me to use tools like
Tmux, SSH quickly to a remote server, launch some gnu tools. A
terminal emulation is nice, but my point is nothing beats the real
thing.

Vim works inside the terminal as does Emacs. Atom, Sublime Text,
Textmate don't.

This is behind said, Emacs has the best terminal emulation. And it
even has multiples. Tailored for different needs.

## Run outside the terminal

Well running inside the terminal is nice. But what if you want some
extra user interface fanciness?
Vim and Emacs can also run outside of the terminal. As can the others
but with Vim and Emacs you have both world available.

## User Interface (UI) fanciness

Atom is better. Inside Atom you can style everything using web
technologies. So for the pure UI aspect and despite being young, Atom
comes on top. And if you are a web developer it is easy to do.

Emacs is second in my mac. And close second as it can do things other
can't do like displaying PDF, browsing images, managing-compressing zip
files on the fly etc.

## Colors

Atom has amazing themes, again thanks to the ease of use of web
technologies. Vim has really good themes too. With Emacs, even though
everything is configurable, theme support is somehow worse. There are
plenty of themes available but to get really nice colors everywhere
you will need to customize some faces. It is not as good out of the
box experience as the others. But it is solvable.

[base16](https://chriskempson.github.io/base16/) is my preferred way to
go. It provides themes for VIM, Textmate, Emacs, sh colors etc. It
ensures consistent colors in all your tools.

## Quick launch

Vim is really quick to launch. Emacs with the emacsclient, which
connects to an Emacs daemon, is even quicker and lighter. As I write
this, the emacsclient bin weights 30K. Vim weights 4.5M.

To launch a new Emacs frames with your Emacs client it just takes the
time to connect to the Emacs daemon. It is as instantaneous as you can
get.

## Vim-like text manipulation

VIM language for text edition is amazing. When you learn it, it is a
life changing experience. You can use Vim inside Emacs through
[EVIL](https://bitbucket.org/lyro/evil/wiki/Home).
Well you can use *everything you like about VIM inside Emacs and
enhance the experience with some Emacs greatness.
A cool thing is to go to [VimGolf](http://www.vimgolf.com/) and then
complete the challenges inside [EVIL](https://bitbucket.org/lyro/evil/wiki/Home).

This is the best of the two world. Furthermore, if you log into a
server you can efficiently use VI or VIM.

## Learning

It is easier to learn Atom or Textmate or Sublime Test.

It is easier to learn Vim and it is easier to be awesome using Vim.
While My Vim configuration is pretty small, about 2 screen pages long,
my Emacs one is much longer.

I have two advice for this:

- Don't install too many things at the beginning.
- Use org mode to write your configuration. It will make your life
  easier to comment your settings.

I recommend those two ressources if you want to learn VIM/EVIL:

- [Pratical Vim](https://pragprog.com/book/dnvim/practical-vim)
- [Upcase](https://upcase.com/)

The good news is those two courses make you learn
[EVIL](https://bitbucket.org/lyro/evil/wiki/Home) at the same time.


## Conclusion

My point is, everything is available in Emacs. Almost all options are
more powerful.

Take a look at [Magit](http://magit.vc) and [Helm](https://emacs-helm.github.io/helm/)

It takes more time. But if you take it you won't regret it.
