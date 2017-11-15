require "erb"
require "sass"
require "rake"
require "commonmarker"

desc "Build website"
task :build do
  sass = Sass::Engine.new(File.read("styles.scss"), syntax: :scss)
  css = sass.render

  File.open("styles.css", "w") do |f|
    f.write(css)
  end

  @title = "Geodate"
  @body = ""
  found_header = false
  doc = CommonMarker.render_doc(File.read("README.md"))
  doc.each do |node|
    case node.type
    when :header
      @body += "</div></section>" if found_header
      @body += "<section class=\"screen\"><div class=\"container\">"
      found_header = true
    end
    @body += node.to_html
  end
  @body += "</div></section>" if found_header

  html = ERB.new(File.read("index.html.erb")).result

  File.open("index.html", "w") do |f|
    f.write(html)
  end
end

task :clean do
  rm "index.html"
  rm "styles.css"
end
