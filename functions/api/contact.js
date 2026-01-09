export async function onRequestPost({ request, env }) {
  if (!env || !env.RESEND_API_KEY) {
    return new Response("Clé API manquante ou env non défini", { status: 500 });
  }

  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return new Response("Champs manquants", { status: 400 });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "baptiste.bergeon2008@gmail.com",
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
