import consumer from "channels/consumer"

consumer.subscriptions.create("SpectrumReaderChannel", {
  connected() {
    console.log("Connected to the spectrum reader channel!");
  },

  received(data) {
    console.log("Hello");
    const element = document.querySelector("[data-controller='chart']")
    element.setAttribute("data-chart-chanels-value", data);
  }
});
