###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

data.tarjetas.productos.each do |producto|
  proxy "/revision/#{producto[1]['titulo'].parameterize}.html", "/revision/template.html", :locals => { :producto => producto[1], :titulo => producto[1]['titulo']}
end

# General configuration
activate :dotenv, env: '.env'
activate :contentful do |f|
  f.space         = {tarjetas: ENV['SPACE_ID']}
  f.access_token  = ENV['CONTENT_DELIVERY_API']
  f.cda_query     = { limit: 1000 }
  f.content_types = {productos: 'producto', generalidades: 'generalidades'}
end

#set :markdown_engine, :redcarpet

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def centered_row(count)
    "colspan='#{count}' class='text-center'"
  end
  # def markdown_to_html(input)
  #   markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, tables: true)
  #   markdown.render(input)
  # end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
