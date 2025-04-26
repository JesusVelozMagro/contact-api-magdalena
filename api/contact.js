import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const allowedOrigins = [
    'https://tusitioweb.cl',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500'
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dilemagdaweb@gmail.com',
        pass: 'drvk qiix urky klkt, 
      },
    });

    const mailOptions = {
      from: 'dilemagdaweb@gmail.com',
      to: 'dilemagdaweb@gmail.com',
      subject: `Mensaje de ${name}`,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje:\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  res.status(405).json({ error: 'Método no permitido' });
}
