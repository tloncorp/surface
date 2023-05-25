import type UrbitMock from "@tloncorp/mock-http-api";
import Urbit, {
  PokeInterface,
  Scry,
  SubscriptionRequestInterface,
  Thread,
} from "@urbit/http-api";

declare global {
  interface Window {
    ship: string;
    our: string;
    desk: string;
  }
}

let client = undefined as unknown as Urbit | UrbitMock;

async function ensureClient() {
  if (!client) {
    const api = new Urbit("", "", window.desk);
    api.ship = window.ship;
    api.verbose = true;
    client = api;
  }
}

const api = {
  async scry<T>(params: Scry) {
    ensureClient();
    return client.scry<T>(params);
  },
  async poke<T>(params: PokeInterface<T>) {
    ensureClient();
    return client.poke<T>(params);
  },
  async subscribe(params: SubscriptionRequestInterface) {
    ensureClient();
    return client.subscribe(params);
  },
  async subscribeOnce<T>(app: string, path: string, timeout?: number) {
    ensureClient();
    return client.subscribeOnce<T>(app, path, timeout);
  },
  async thread<Return, T>(params: Thread<T>) {
    ensureClient();
    return client.thread<Return, T>(params);
  },
  async unsubscribe(id: number) {
    ensureClient();
    return client.unsubscribe(id);
  },
} as Urbit | UrbitMock;

export default api;
