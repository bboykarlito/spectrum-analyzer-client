class SpectrumReaderController < ApplicationController
  def index
    @values = [
        { frequency: 702, rssi: 100 },
        { frequency: 704, rssi: 97 },
        { frequency: 706,  rssi: 99 }
      ].to_json
  end
end
