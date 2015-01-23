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

end
