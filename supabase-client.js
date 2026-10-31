(() => {
  const cfg = window.SEV7N_RUNTIME || {};
  const sdk = window.supabase;
  if (!sdk || !cfg.url || !cfg.key) {
    window.SEV7N_DB = null;
    return;
  }
  const client = sdk.createClient(cfg.url, cfg.key);
  const adminEmail = String(cfg.adminEmail || '').toLowerCase();
  const isAdmin = async () => {
    const { data } = await client.auth.getUser();
    return String(data.user?.email || '').toLowerCase() === adminEmail;
  };
  window.SEV7N_DB = {
    client,
    isAdmin,
    async signIn(email) {
      if (String(email).trim().toLowerCase() !== adminEmail) throw new Error('This email is not allowed to manage the site.');
      const { error } = await client.auth.signInWithOtp({ email: adminEmail, options: { emailRedirectTo: location.origin + '/admin.html' } });
      if (error) throw error;
    },
    async getProjects() {
      const { data, error } = await client.from('portfolio_projects').select('*').eq('published', true).order('sort_order');
      if (error) throw error;
      return data;
    },
    async getFilms() {
      const { data, error } = await client.from('cinematic_films').select('*').eq('published', true).order('sort_order');
      if (error) throw error;
      return data.map(x => ({ ...x, url: x.video_url, beats: Array.isArray(x.storyboard) ? x.storyboard.join('\n') : '' }));
    },
    async submitBooking(form) {
      const { error } = await client.from('project_bookings').insert({
        name: form.get('name'), email: form.get('email'), service: form.get('interest'),
        notes: form.get('outcome') || '', timing: form.get('timing') || '', availability: form.get('availability') || ''
      });
      if (error) throw error;
    }
  };
})();
