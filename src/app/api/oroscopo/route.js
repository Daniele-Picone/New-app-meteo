const zodiacSigns = [
  "Aries","Taurus","Gemini","Cancer",
  "Leo","Virgo","Libra","Scorpio",
  "Sagittarius","Capricorn","Aquarius","Pisces"
];

export async function GET() {
  try {
    const horoscopes = await Promise.all(
      zodiacSigns.map(async (sign) => {
        const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`);
        const json = await res.json();
        return {
          sign,
          horoscope: json?.data?.horoscope_data || "Nessun dato",
          date: json?.data?.date || null
        };
      })
    );

    return new Response(JSON.stringify(horoscopes), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
