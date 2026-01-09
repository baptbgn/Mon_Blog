export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return new Response("Champs manquants", { status: 400 });
    }

    // Appel à Resend API
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
      return new Response("Erreur lors de l'envoi du mail", { status: 500 });
    }

    return new Response("Message envoyé", { status: 200 });
  } catch (err) {
    return new Response("Erreur serveur", { status: 500 });
  }
}
console.log("API KEY:", env.RESEND_API_KEY);
