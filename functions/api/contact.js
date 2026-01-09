export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const honeypot = formData.get("phone");

    if (honeypot) {
      return new Response("Spam détecté", { status: 400 });
    }

    if (!name || !email || !message) {
      return new Response("Champs manquants", { status: 400 });
    }

    if (!env || !env.RESEND_API_KEY) {
      return new Response("Clé API manquante", { status: 500 });
    }

    // 🔑 Utiliser l’expéditeur vérifié de ton compte Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "no-reply@<ton-compte>.resend.com", // remplace par ton expéditeur Resend vérifié
        to: "baptiste.bergeon2008@gmail.com",
        subject: `Nouveau message depuis ${name}`,
        html: `<p><strong>Nom:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br>${message}</p>`
      })
    });

    if (!resendResponse.ok) {
      const text = await resendResponse.text();
      return new Response(`Erreur API Resend: ${text}`, { status: 500 });
    }

    return new Response("Message envoyé", { status: 200 });
  } catch (err) {
    return new Response(`Erreur serveur: ${err.message}`, { status: 500 });
  }
}
