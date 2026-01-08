// Supabase Integration API for Sistema de Oficios
// Handles all online storage and multi-user synchronization

const SUPABASE_URL = 'https://YOUR_SUPABASE_URL.supabase.co';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Initialize Supabase Client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

class SupabaseAPI {
  constructor() {
    this.client = supabaseClient;
  }

  // Auth Methods
  async signUp(email, password) {
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    const { data, error } = await this.client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  // Records Methods
  async saveRecord(record) {
    const user = await this.getSession();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this.client
      .from('oficios')
      .upsert({
        ...record,
        user_id: user.user.id,
        updated_at: new Date().toISOString()
      });
    if (error) throw error;
    return data;
  }

  async getRecords() {
    const user = await this.getSession();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await this.client
      .from('oficios')
      .select('*')
      .eq('user_id', user.user.id)
      .order('numero', { ascending: true });
    if (error) throw error;
    return data || [];
  }

  async deleteRecord(id) {
    const { error } = await this.client
      .from('oficios')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  // File Methods
  async uploadFile(recordId, file) {
    const fileName = `${recordId}/${file.name}`;
    const { data, error } = await this.client.storage
      .from('oficios_files')
      .upload(fileName, file, { upsert: true });
    if (error) throw error;
    return data;
  }

  async downloadFile(recordId, fileName) {
    const { data, error } = await this.client.storage
      .from('oficios_files')
      .download(`${recordId}/${fileName}`);
    if (error) throw error;
    return data;
  }

  async deleteFile(recordId, fileName) {
    const { error } = await this.client.storage
      .from('oficios_files')
      .remove([`${recordId}/${fileName}`]);
    if (error) throw error;
  }

  // Real-time Sync
  subscribeToRecords(callback) {
    return this.client
      .from('oficios')
      .on('*', payload => callback(payload))
      .subscribe();
  }
}

// Export for use
window.supabaseAPI = new SupabaseAPI();
