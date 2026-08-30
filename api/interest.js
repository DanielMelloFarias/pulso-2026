const DIAGNOSTIC_ENDPOINT = "https://www.transformetech.com/api/diagnostic";

function text(value, maxLength = 180) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function operationLevel(reach) {
  if (reach === "Todo o estado") return "avancado";
  if (reach === "De 31 a 60 municípios") return "intermediario";
  return "basico";
}

module.exports = async function interestHandler(request, response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  if (request.method === "OPTIONS") {
    response.setHeader("Allow", "OPTIONS, POST");
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "OPTIONS, POST");
    return response.status(405).json({ success: false, error: "Método não permitido." });
  }

  const body = request.body && typeof request.body === "object" ? request.body : {};
  const name = text(body.nome, 100);
  const whatsapp = text(body.whatsapp, 30);
  const email = text(body.email, 160).toLowerCase();
  const role = text(body.cargo, 60);
  const reach = text(body.alcance, 80);
  const team = text(body.equipe, 80);
  const priority = text(body.prioridade, 160);
  const honeypot = text(body.website, 160);

  if (honeypot) return response.status(200).json({ success: true });

  if (!name || !whatsapp || !email || !role || !reach || !team || !priority) {
    return response.status(400).json({ success: false, error: "Preencha todos os campos." });
  }

  if (body.consentimento !== true) {
    return response.status(400).json({ success: false, error: "Autorize o contato para continuar." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return response.status(400).json({ success: false, error: "Informe um e-mail válido." });
  }

  const phoneDigits = whatsapp.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) {
    return response.status(400).json({ success: false, error: "Informe um WhatsApp válido." });
  }

  const utm = body.utm && typeof body.utm === "object" ? body.utm : {};
  const payload = {
    name,
    organization: `PULSO · ${role} · ${reach}`.slice(0, 180),
    digitalLevel: operationLevel(reach),
    timeWaste: `${priority} | Equipe: ${team} | WhatsApp: ${whatsapp}`.slice(0, 300),
    usesAutomation: "medio",
    wantsScale: `Avaliar implantação do PULSO para ${role} | Contato autorizado no formulário PULSO`.slice(0, 180),
    email,
    website: "",
    page_path: text(body.pagePath, 120) || "/",
    lead_source: "pulso",
    utm_source: text(utm.utm_source, 100),
    utm_medium: text(utm.utm_medium, 100),
    utm_campaign: text(utm.utm_campaign, 100),
    utm_content: text(utm.utm_content, 100),
  };

  try {
    const upstream = await fetch(DIAGNOSTIC_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "PULSO/1.0 (+https://demo-eleitor-gabinete.vercel.app)",
      },
      body: JSON.stringify(payload),
    });
    const result = await upstream.json().catch(() => null);

    if (!upstream.ok || !result?.success) {
      console.error("PULSO interest forwarding failed", { status: upstream.status });
      return response.status(502).json({
        success: false,
        error: "O canal de atendimento está indisponível. Tente novamente em instantes.",
      });
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("PULSO interest forwarding failed", { message: error?.message || "unknown" });
    return response.status(502).json({
      success: false,
      error: "O canal de atendimento está indisponível. Tente novamente em instantes.",
    });
  }
};
