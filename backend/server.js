const nodemailer = require('nodemailer')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
	service: 'Gmail', // Можно использовать 'Outlook', 'Yahoo' или другой сервис
	auth: {
		user: process.env.EMAIL_USER, // Ваш email
		pass: process.env.EMAIL_PASS, // Ваш пароль или App Password
	},
})

app.post('/api/send-verification-email', async (req, res) => {
	const { email } = req.body

	if (!email) return res.status(400).send('Email обязателен.')

	try {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Подтверждение Email',
			html: `
                <h1>Подтверждение Email</h1>
                <p>Спасибо за регистрацию. Нажмите на кнопку ниже, чтобы подтвердить вашу почту:</p>
                <a href="http://localhost:3000/confirm-email?email=${encodeURIComponent(
									email
								)}" style="padding:10px 15px; background-color:blue; color:white; text-decoration:none;">
                    Подтвердить Email
                </a>
            `,
		}

		await transporter.sendMail(mailOptions)

		res.status(200).send('Письмо успешно отправлено.')
	} catch (error) {
		console.error('Ошибка при отправке письма:', error)
		res.status(500).send('Ошибка при отправке письма.')
	}
})

app.listen(5000, () => console.log('Сервер запущен на порту 5000.'))
