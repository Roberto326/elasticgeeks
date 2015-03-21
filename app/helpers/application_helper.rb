module ApplicationHelper

  def active_if(page_name)
    return 'active' if request.fullpath.to_s.end_with?(page_name)
    ''
  end

  def active_if_contains(page_name)
    return 'active' if request.fullpath.to_s.include?(page_name)
    ''
  end

  def active_if_param(param_name, param_value)
    return 'active' if request.params[param_name] == param_value
    ''
  end

  def request_classname
    res = /\/(\w+)(?:\/|)/.match(request.fullpath.to_s)
    return 'body-home' unless res
    return "body-#{res[1]}"
  end

  def markdown(text)
    return '' unless text.present?
    render_options = {
        # will remove from the output HTML tags inputted by user
        filter_html:     false,
        # will insert <br /> tags in paragraphs where are newlines
        # (ignored by default)
        hard_wrap:       true,
        # hash for extra link options, for example 'nofollow'
        # link_attributes: { rel: 'nofollow' }
        # more
        # will remove <img> tags from output
        # no_images: true
        # will remove <a> tags from output
        # no_links: true
        # will remove <style> tags from output
        # no_styles: true
        # generate links for only safe protocols
        # safe_links_only: true
        # and more ... (prettify, with_toc_data, xhtml)
    }
    renderer = Redcarpet::Render::HTML.new(render_options)

    extensions = {
        #will parse links without need of enclosing them
        autolink:           true,
        # blocks delimited with 3 ` or ~ will be considered as code block.
        # No need to indent.  You can provide language name too.
        # ```ruby
        # block of code
        # ```
        fenced_code_blocks: true,
        # will ignore standard require for empty lines surrounding HTML blocks
        lax_spacing:        true,
        # will not generate emphasis inside of words, for example no_emph_no
        no_intra_emphasis:  true,
        # will parse strikethrough from ~~, for example: ~~bad~~
        strikethrough:      true,
        # will parse superscript after ^, you can wrap superscript in ()
        superscript:        true
        # will require a space after # in defining headers
        # space_after_headers: true
    }
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end

end
