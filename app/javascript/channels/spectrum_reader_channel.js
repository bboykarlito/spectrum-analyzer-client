import consumer from "channels/consumer"

consumer.subscriptions.create("SpectrumReaderChannel", {
  connected() {
    console.log("Connected to the spectrum reader channel!");
  },

  received(data) {
    console.log("New data received");
    const element = document.querySelector("#graph-container")
    element.setAttribute("data-chart-chanels-value", data.body);
  }
});
