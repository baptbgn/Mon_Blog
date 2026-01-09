export async function onRequestPost({ request, env }) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!name || !email || !message) {
      return new Response("Champs manquants", { status: 400 });
    }

    // 👉 Ici, tu appelleras une API d’envoi de mail (étape suivante)

    return new Response("Message envoyé", { status: 200 });
  } catch (err) {
    return new Response("Erreur serveur", { status: 500 });
  }
}
