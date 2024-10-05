---
tags: architecture
---

I like [Ruby on Rails](https://rubyonrails.org/) consistency.
This is something I don't find in Javascript frameworks.

One of the reason is that Rails own their main dependencies: ActiveRecord, ActiveSupport, ActionCable etc.
It is possible to use them without Rails,
but they were made for Rails.

Javascript frameworks are bundle of librairies not owned and not made for the framework.
For example in the Vue world we have vue-router, vuex, pinia.
Those librairies were made for Vue.
Nuxt bundles those librairies with a nice *out of the box* experience.
There's not a strong attachment nor investment from Nuxt in those librairies.
This makes it easier for Nuxt to swap librairies for ... everything.

This is a problem for users of the framework.
Between versions you are in a dependency update / swapping hell.
Instead of focusing on the business aspect of your app you spend time adapting to the latest trend.

I will spend more time checking how much the framework I use own its dependencies.,
If they don't own most of the librairies they are bundling up together, it is a strong indicator I might just do the same and stay free of the framework.
This will allow me to upgrade, change dependencies at my own pace.
