<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération et sécurisation des données
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
    $date = date("Y-m-d H:i:s");

    // Nom du fichier CSV
    $fichier = 'messages.csv';

    // Vérifier si le fichier existe déjà
    $nouveau = !file_exists($fichier);

    // Ouvrir le fichier en mode ajout
    $fp = fopen($fichier, 'a');

    // Si le fichier est nouveau, ajouter l'entête
    if ($nouveau) {
        fputcsv($fp, ['Nom', 'Email', 'Message', 'Date']);
    }

    // Ajouter la nouvelle ligne
    fputcsv($fp, [$nom, $email, $message, $date]);

    // Fermer le fichier
    fclose($fp);

    echo "Message enregistré avec succès !";
}
?>
