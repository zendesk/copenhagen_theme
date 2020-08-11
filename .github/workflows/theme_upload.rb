require 'faraday'
require 'faraday_middleware'
require 'logger'

brand_id = ENV["brand_id"]
subdomain =  ENV["subdomain"]
file_path = File.expand_path("theme.zip")
email = ENV["zendesk_email"]
token = ENV["zendesk_token"]

base_url = "https://#{subdomain}.zendesk.com/api/v2/guide/theming"

logger = Logger.new($stdout)
logger.level = Logger::INFO

# Step 1
zendesk_connection = Faraday.new do |faraday|
  faraday.basic_auth("#{email}/token", token)
  faraday.url_prefix = base_url
  faraday.request :json
  faraday.response :json, content_type: /json/
  faraday.response :logger, logger
  faraday.adapter :net_http
end

job_response = zendesk_connection.post("jobs/themes/imports", { job: { attributes: { brand_id: brand_id, format: "zip" } } })

job_id = job_response.body['job']['id']
theme_id = job_response.body['job']['data']['theme_id']
storage_url = job_response.body['job']['data']['upload']['url']
storage_parameters = job_response.body['job']['data']['upload']['parameters']

# Step 2

storage_connection = Faraday.new do |faraday|
  faraday.request :multipart
  faraday.request :url_encoded
  faraday.response :logger, logger
  faraday.adapter :net_http
end

storage_body = storage_parameters.merge(file: Faraday::UploadIO.new(file_path, 'application/zip'))
storage_connection.post(storage_url, storage_body)

# Step 3

retries = 10

loop do
  raise "timeout" if retries < 1

  job_status_response = zendesk_connection.get("jobs/#{job_id}")
  body = job_status_response.body
  status = body['job']['status']

  if status == "failed"
    warn(body)

    raise 'Import failed'
  end

  break if status == 'completed'

  retries -= 1

  sleep(1)
end

# Publish

zendesk_connection.post("themes/#{theme_id}/publish")

# Clear old themes

themes = zendesk_connection.get("themes?brand_id=#{brand_id}").body["themes"]

themes.each do |theme|
  next if theme["id"] == theme_id

  zendesk_connection.delete("themes/#{theme["id"]}")
end
