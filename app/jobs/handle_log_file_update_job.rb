class HandleLogFileUpdateJob < ApplicationJob
  queue_as :default

  def perform(*paths)
    file = File.open(paths.first)
    data = file.read.split("|")[-2].split(";").map do |freq_with_rssi|
      freq_with_rssi.split(",").map { |v| v.to_i } => [Integer => frequency, Integer => rssi]
      { frequency: frequency, rssi: rssi }
    end

    ActionCable.server.broadcast("spectrum_reader_channel", { body: data.to_json })
  end
end
