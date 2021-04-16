/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { supabase } from '../../utils/initSupabase';

export default (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};
