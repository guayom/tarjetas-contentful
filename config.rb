###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# General configuration
activate :dotenv, env: '.env'
activate :contentful do |f|
  f.space         = {tarjetas: ENV['SPACE_ID']}
  f.access_token  = ENV['CONTENT_DELIVERY_API']
  f.cda_query     = { limit: 1000 }
  f.content_types = {productos: 'producto', generalidades: 'generalidades', categorias: 'categorias'}
end

after_build do |builder|
  src = File.join(config[:source],"_redirects")
  dst = File.join(config[:build_dir],"_redirects")
  builder.source_paths << File.dirname(__FILE__)
  builder.copy_file(src,dst)
  # 404
  src = File.join(config[:build_dir],"404/index.html")
  dst = File.join(config[:build_dir],"404.html")
  builder.source_paths << File.dirname(__FILE__)
  builder.copy_file(src,dst)
end

set :markdown_engine, :redcarpet
#set :markdown, parse_block_html: true
activate :directory_indexes

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
  def get_grouped_products(category)
    data.tarjetas.productos.select{ |key, value| value['categorias'][0]['identificador'] == category }
  end
  def get_category_description(category)
    @category = data.tarjetas.categorias.find{|a| a[1]['identificador'] == category}
    @category[1]['descripcionCorta']
  end
  def get_row_classes(section)
    if section > 0
      "id='section-#{section}' data-section='#{section}'"
    else
      ""
    end
  end
  def get_variations_by_color(producto)
    producto.variacion.first(3)
  end
  def get_salario_minimo(producto, variacion)
    number_to_currency(producto.planDeLealtad.reglasDeAcumulacion.detect{|regla| regla.colores.detect{|color| color.titulo == variacion.color.titulo} }.colores.detect{|color| color.titulo == variacion.color.titulo}.salarioMinimo, unit: "&#8353;")
  end
  def get_product_brands(producto)
    producto.variacion.map{ |variacion| variacion.emisor.nombre }.uniq
  end
  def markdown(text)
    require 'redcarpet'
    require 'redcarpet/render_strip'
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    Markdown.new(text).to_html
  end
end

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  activate :gzip
  activate :remover, :paths => %w(404)
end
