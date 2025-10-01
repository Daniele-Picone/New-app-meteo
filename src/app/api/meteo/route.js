import { NextResponse } from "next/server";

export async function GET(request) {
  const API_KEY = process.env.METEO_API_KEY;  //prendo la chiave dall env
  const {searchParams} = new URL (request.url)

  const city = searchParams.get('city') || "Roma"; // prende la citta altrimenti Prende Roma di defoult
  const endpoint = searchParams.get("endpoint") || "current"; //se non viene richaiamta l endpoint visualizzera il corrente
  let url = "";
  switch(endpoint){
      case "forecast":
      url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&lang=it`;
      break;
      case "astronomy":
      url = `https://api.weatherapi.com/v1/astronomy.json?key=${API_KEY}&q=${city}&dt=2025-10-01`;
      break;
    default: // current
      url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=it`;
      break;
  }

  const res = await fetch(url)
  const data = await res.json()
  
  return new Response(JSON.stringify(data),{
    headers:{"Content-Type": "application/json"}
  })
}
