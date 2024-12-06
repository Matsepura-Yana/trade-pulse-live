import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/LoginPage.css'

const LoginPage = ({ setUser }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const navigate = useNavigate()

	const handleLogin = (e) => {
		e.preventDefault()

		// Получаем список пользователей из localStorage
		const users = JSON.parse(localStorage.getItem('users')) || []

		// Ищем пользователя по email
		const existingUser = users.find((user) => user.email === email)

		if (existingUser) {
			// Проверяем пароль
			if (existingUser.password === password) {
				setUser(existingUser)
				localStorage.setItem('currentUser', JSON.stringify(existingUser)) // Устанавливаем текущего пользователя
				navigate('/')
			} else {
				setError('Неверный пароль')
			}
		} else {
			setError('Пользователь не найден')
		}
	}

	return (
		<div className='login-page'>
			<div className='login-content'>
				<div className='login-text'>
					<h1 className='login-title'>
						Войдите в ваш <br />
						аккаунт
					</h1>
					<p className='login-subtext'>
						Для входа в свой аккаунт, введите email и пароль
					</p>
				</div>

				<div className='login-form-container'>
					<h2 className='login-form-title'>Вход</h2>
					<form onSubmit={handleLogin}>
						<label>
							<p className='input-label'>Email</p>
							<input
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder='example@gmail.com'
								className='login-input'
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
								className='login-input'
								required
							/>
						</label>
						<button type='submit' className='login-button'>
							Войти
						</button>
					</form>
					<div className='login-result'>
						{error && <p className='login-error'>{error}</p>}
					</div>
					<p className='register-opportunity'>
						Нет аккаунта?{' '}
						<Link to='/register' className='login'>
							Зарегистрироваться
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
