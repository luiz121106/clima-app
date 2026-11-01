'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { formatarNomeCidade } from '@/utils/climaUtils';

interface CidadeSalva {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [nome, setNome] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [climaAtual, setClimaAtual] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<CidadeSalva[]>([]);

  // 1. Carregar lista do Supabase
  const carregarFavoritos = async () => {
    const { data } = await supabase.from('cidades').select('*');
    if (data) setFavoritos(data);
  };

  useEffect(() => {
    carregarFavoritos();
  }, []);

  // 2. Consumir API Externa Open-Meteo
  const buscarClima = async (latitude: string, longitude: string) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}¤t_weather=true`
    );
    const data = await res.json();
    setClimaAtual(data.current_weather);
  };

  // 3. Persistir no Supabase
  const salvarCidade = async () => {
    if (!nome || !lat || !lon) return;
    const nomeFormatado = formatarNomeCidade(nome);
    await supabase.from('cidades').insert([{ nome: nomeFormatado, latitude: parseFloat(lat), longitude: parseFloat(lon) }]);
    setNome(''); setLat(''); setLon('');
    carregarFavoritos();
  };

  // 4. Excluir do Supabase
  const deletarCidade = async (id: number) => {
    await supabase.from('cidades').delete().eq('id', id);
    carregarFavoritos();
  };

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">🌤️ Painel de Clima & Favoritos</h1>

      <div className="bg-gray-100 p-4 rounded space-y-3">
        <h2 className="font-semibold text-black">Cadastrar Nova Cidade</h2>
        <input className="border p-2 w-full rounded text-black" placeholder="Nome da cidade (ex: São Paulo)" value={nome} onChange={(e) => setNome(e.target.value)} />
        <div className="flex gap-2">
          <input className="border p-2 w-1/2 rounded text-black" placeholder="Latitude (ex: -23.55)" value={lat} onChange={(e) => setLat(e.target.value)} />
          <input className="border p-2 w-1/2 rounded text-black" placeholder="Longitude (ex: -46.63)" value={lon} onChange={(e) => setLon(e.target.value)} />
        </div>
        <button onClick={salvarCidade} className="bg-blue-600 text-white px-4 py-2 rounded">Salvar no Banco</button>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-xl">Cidades Salvas (Supabase)</h2>
        {favoritos.map((c) => (
          <div key={c.id} className="flex justify-between items-center border p-3 rounded">
            <div>
              <p className="font-bold">{c.nome}</p>
              <p className="text-sm text-gray-500">Lat: {c.latitude} | Lon: {c.longitude}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => buscarClima(c.latitude.toString(), c.longitude.toString())} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Consultar Clima</button>
              <button onClick={() => deletarCidade(c.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm">Excluir</button>
            </div>
          </div>
        ))}
      </div>

      {climaAtual && (
        <div className="bg-green-50 border border-green-200 p-4 rounded">
          <h3 className="font-bold text-lg text-black">Resultado da API Externa:</h3>
          <p className="text-black">Temperatura: <strong>{climaAtual.temperature} °C</strong></p>
          <p className="text-black">Vento: {climaAtual.windspeed} km/h</p>
        </div>
      )}
    </main>
  );
}