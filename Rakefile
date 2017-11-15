require "erb"
require "sass"
require "rake"
require "commonmarker"

task default: %w[build]

task build: %w[css html]

task css: Rake::FileList.new("*.scss").ext(".css")
task html: Rake::FileList.new("*.md").ext(".html").map { |f| f.sub("README", "index") }

rule ".css" => ".scss" do |t|
  puts "build #{t.name} from #{t.source}"
  sass = Sass::Engine.new(File.read(t.source), syntax: :scss)
  css = sass.render

  File.open(t.name, "w") do |f|
    f.write(css)
  end
end

rule ".html" => -> (f) { source_for_html(f) } do |t|
  puts "build #{t.source} to #{t.name}"
  @title = ""
  @body = ""
  found_header = false
  doc = CommonMarker.render_doc(File.read(t.source))
  doc.each do |node|
    case node.type
    when :header
      text = node.to_plaintext.chomp
      id = text.downcase.tr(" ", "-")
      @title = text unless found_header
      @body += "</div></section>" if found_header
      @body += "<section id=\"#{id}\" class=\"screen\"><div class=\"container\">"
      found_header = true
    end
    @body += node.to_html
  end
  @body += "</div></section>" if found_header

  html = ERB.new(File.read("app.html.erb")).result

  File.open(t.name, "w") do |f|
    f.write(html)
  end
end

def source_for_html(f)
  f.sub("README", "index").ext(".md")
end

task :clean do
  rm "index.html"
  rm "app.css"
end
