
'use client'
import { useEffect, useState } from "react";
import './Oroscopo.css';

export default function OroscopoSection() {
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHoroscopes() {
      try {
        const res = await fetch('/api/oroscopo');
        const data = await res.json();
        setHoroscopes(data || []);
      } catch (err) {
        console.error("Errore fetch oroscopi:", err);
        setHoroscopes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchHoroscopes();
  }, []);

  if (loading) return <p className="text-center mt-10">Caricamento oroscopi...</p>;

  return (
    <div className="oroscope_section">
      <h1 className="text-3xl font-bold text-center mb-8">Oroscopo Giornaliero</h1>
      <div className="oroscope_wrapper">
        {horoscopes.map((o, i) => (
          <div key={i} className="oroscope_card">
            <h2 className="">{o.sign}</h2>
            <p className="">{o.horoscope}</p>
            <p className="">{o.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
