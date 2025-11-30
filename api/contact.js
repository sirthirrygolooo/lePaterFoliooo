const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const TARGET_EMAIL = process.env.TARGET_EMAIL || "jean-baptiste.froehly@protonmail.com";


module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée. Utilisez POST.' });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Champs requis manquants dans la requête.' });
    }

    try {
        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: TARGET_EMAIL,
            replyTo: email,
            subject: `[Portfolio] Nouveau message: ${subject}`,
            html: `
                <h1>Message de votre portfolio</h1>
                <p><strong>De:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Sujet:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <div style="padding: 10px; border: 1px solid #ddd; white-space: pre-wrap;">${message}</div>
                <p style="margin-top: 20px; font-size: 12px; color: #888;">
                    Ce message a été envoyé depuis votre Serverless Function Vercel.
                </p>
            `,
            text: `Nouveau message de ${name} (${email}) - Sujet: ${subject}\n\nMessage:\n${message}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Message envoyé avec succès !' });

    } catch (error) {
        console.error('Erreur Nodemailer/SMTP:', error);
        return res.status(500).json({
            message: 'Erreur lors de l\'envoi de l\'e-mail via le serveur.',
            details: error.message || 'Problème de connexion SMTP ou d\'authentification.'
        });
    }
};