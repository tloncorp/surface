import { render } from 'react-dom';
import Root from '@/components/Root';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import indexedDBPersistor from '@/indexedDBPersistor';
import queryClient from '@/queryClient';
import '@/styles/index.css';

window.our = `~${window.ship}`;

const root = document.getElementById('root') as HTMLElement;

render(
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{
      persister: indexedDBPersistor(`${window.our}-surface`)
    }}
  >
    <Root />
  </PersistQueryClientProvider>,
  root
);
