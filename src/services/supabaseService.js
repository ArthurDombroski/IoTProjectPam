import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '@env';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function saveReading(topic, value) {
  const { error } = await supabase
    .from('sensor_data')
    .insert([{ topic, value }]);

  if (error) {
    console.error('Erro ao salvar no Supabase:', error.message);
  }
}

export async function getReadings() {
  const { data, error } = await supabase
    .from('sensor_data')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Erro ao buscar do Supabase:', error.message);
    return [];
  }

  return data;
}