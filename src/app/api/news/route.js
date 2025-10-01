import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) 
    return NextResponse.json({ error: "Chiave API mancante" }, { status: 500 });

  const today = new Date().toISOString().split('T')[0];
  const res = await fetch(
    `https://newsapi.org/v2/everything?q=Italia&from=25/09/2020&language=it&pageSize=6&apiKey=${apiKey}`
  );

  if (!res.ok) {
    // se la risposta non è OK, leggi il testo direttamente
    const text = await res.text();
    return NextResponse.json({ error: text }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
