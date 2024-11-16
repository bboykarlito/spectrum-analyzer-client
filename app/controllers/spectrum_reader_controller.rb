class SpectrumReaderController < ApplicationController
  def index
    @values = [].to_json

    listener = Listen.to(ENV["LOGFILE_PATH"]) do |modified, added, removed|
      HandleLogFileUpdateJob.perform_later(modified.first) if modified.any?
    end

    listener.start
  end
end
