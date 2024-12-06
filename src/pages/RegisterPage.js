import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/RegisterPage.css'
import ReCAPTCHA from 'react-google-recaptcha'

const RegisterPage = ({ setUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [captchaVerified, setCaptchaVerified] = useState(false)
	const navigate = useNavigate()

	// Функция обработки верификации CAPTCHA
	const handleCaptchaChange = (value) => {
		if (value) setCaptchaVerified(true)
	}

	// Функция для валидации email
	const validateEmail = (email) => {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
		return emailRegex.test(email)
	}

	// Функция для валидации пароля
	const validatePassword = (password) => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
		return passwordRegex.test(password)
	}

	// Обработчик отправки формы
	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('') // Сброс ошибки

		// Проверка CAPTCHA
		if (!captchaVerified) {
			setError('Пройдите проверку CAPTCHA')
			return
		}

		// Валидация email и пароля
		if (!validateEmail(email)) {
			setError('Пожалуйста, введите правильный email')
			return
		}

		if (!validatePassword(password)) {
			setError(
				'Пароль должен содержать минимум 8 символов, включая заглавную букву, цифру и спец. символ'
			)
			return
		}

		try {
			setIsLoading(true)

			// Получение существующих пользователей
			const users = JSON.parse(localStorage.getItem('users')) || []

			// Проверка существования аккаунта
			const existingUser = users.find((user) => user.email === email)
			if (existingUser) {
				setError('Этот email уже зарегестрирован. Войдите в свой аккаунт')
				return
			}

			// Создание нового пользователя
			const newUser = {
				id: Date.now(),
				email,
				password,
			}

			users.push(newUser) // Добавление нового пользователя
			localStorage.setItem('users', JSON.stringify(users)) // Сохранение в localStorage

			setUser(newUser) // Установка текущего пользователя
			localStorage.setItem('currentUser', JSON.stringify(newUser))

			// Отправка email для подтверждения
			const response = await fetch(
				'http://localhost:5000/api/send-verification-email',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				}
			)

			if (!response.ok) throw new Error('Ошибка при отправке email.')

			alert('Письмо с подтверждением отправлено! Проверьте ваш email.')

			// Переход на страницу подтверждения почты
			setTimeout(() => {
				navigate('/email-verification')
			}, 1000)
		} catch (err) {
			console.error('Ошибка при регистрации:', err)
			setError('Не удалось отправить письмо. Попробуйте позже.')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='register-page'>
			<div className='register-content'>
				<div className='register-text'>
					<h1 className='register-title'>Создайте новый аккаунт на сайте</h1>
					<p className='register-subtext'>
						Для начала вам нужно создать аккаунт на сайте, или <br />
						же войти в уже существующий
					</p>
				</div>

				<div className='register-form-container'>
					<h2 className='register-form-title'>Регистрация</h2>
					<form onSubmit={handleSubmit}>
						<label>
							<p className='input-label'>Email</p>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='example@gmail.com'
								className='register-input'
								required
							/>
						</label>
						<label>
							<p className='input-label password'>Пароль</p>
							<input
								type='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='A12345678a.'
								className='register-input'
								required
							/>
						</label>
						<div className='captcha-container'>
							<ReCAPTCHA
								sitekey='6LcKH5EqAAAAAH_y5gn5XEGDPB0M328pVx8X5HlW'
								onChange={handleCaptchaChange}
								theme='dark'
								hl='ru'
							/>
						</div>
						<button
							type='submit'
							className='register-button'
							disabled={isLoading}
						>
							{isLoading ? 'Создание...' : 'Зарегистрироваться'}
						</button>
					</form>
					<div className='register-result'>
						{error && <p className='register-error'>{error}</p>}
					</div>
					<p className='register-opportunity'>
						Уже есть аккаунт?{' '}
						<Link to='/login' className='login'>
							Войти
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default RegisterPage
