set :ssh_options, {
  user: 'deploy', # overrides user setting above
  keys: %w(/home/deploy/.ssh/id_rsa),
  #forward_agent: false,
  #auth_methods: %w(publickey),
  #     # password: 'please use keys'
  port: 22
}
server 'ns395832.ip-176-31-103.eu', roles: %w(app)
