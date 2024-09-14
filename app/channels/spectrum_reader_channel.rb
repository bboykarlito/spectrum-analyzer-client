class SpectrumReaderChannel < ApplicationCable::Channel
  def subscribed
    stream_from "spectrum_reader_channel"
  end
end
