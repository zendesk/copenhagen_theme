FROM ruby

RUN gem install rake
RUN gem install zendesk_apps_tools
RUN gem update zendesk_apps_tools

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y build-essential

ADD server.rb /usr/local/bundle/gems/zendesk_apps_tools-2.13.5/lib/zendesk_apps_tools/server.rb
ADD theme.rb /usr/local/bundle/gems/zendesk_apps_tools-2.13.5/lib/zendesk_apps_tools/theme.rb
RUN mkdir /zat
WORKDIR /zat
EXPOSE 4567
CMD ["zat", "server"]
