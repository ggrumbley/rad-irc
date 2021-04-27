import { Auth } from '@supabase/ui';
import { supabase } from '../utils/initSupabase';

import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <main className="dark">
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  </main>
);

export default App;
