import useContactState from './contact';
import useDocketState from './docket';

export default function bootstrap() {
  useContactState.getState().start();
  useDocketState.getState().fetchCharges();
  useDocketState.getState().fetchDefaultAlly();
  useDocketState.getState().fetchAllies();
}
