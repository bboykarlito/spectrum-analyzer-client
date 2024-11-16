# README

The spectrum analyzer client is able to present data from the spectrum analyzer on the web page. It uses spectrum analyzer properly formatted log files to get the data to present.

## Setup

* `bundle install`
* `bin/rails assets:precompile`

## Everyday usage

* `redis-server`
* `rails s`

## TODO

* Handle several states (current and two previous ones)
* Highlight signals with different colors
