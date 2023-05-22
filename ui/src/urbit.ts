import Urbit from "@urbit/http-api";

declare global {
  interface Window {
    ship: string;
    our: string;
    desk: string;
  }
}

const client = new Urbit("", "", window.desk);
client.ship = window.ship;
client.verbose = true;

export default client;
