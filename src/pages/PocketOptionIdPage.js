import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/PocketOptionIdPage.css'
import pocketOptionLogo from '../images/pocket option logo.png'

const PocketOptionIdPage = () => {
	const [id, setId] = useState('')
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState('')
	const navigate = useNavigate()

	const currentUser = JSON.parse(localStorage.getItem('currentUser'))

	// Блокировка навигации назад
	useEffect(() => {
		const handlePopState = () => {
			window.history.pushState(null, null, window.location.href)
		}

		// Блокируем переход назад
		window.history.pushState(null, null, window.location.href) // Добавляем запись в историю
		window.addEventListener('popstate', handlePopState)

		// Убираем слушатель при размонтировании компонента
		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setError('')
		setSuccess('')

		try {
			const verifyId = async () => {
				const response = await fetch(
					'https://confirm-id-bot-server-3f3d7c52ef50.herokuapp.com/verify-id',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ userId: id }),
					}
				)
				const data = await response.json()
				return { response, data }
			}

			// Первая попытка проверки ID
			await verifyId()

			// Вторая попытка проверки ID
			await new Promise((resolve) => setTimeout(resolve, 1000)) // Небольшая задержка перед повторной попыткой
			const { response, data } = await verifyId()

			// Обработка результата второго запроса
			if (response.ok && data.message === 'ID confirmed') {
				setSuccess('ID подтвержден!')
				const updatedUser = { ...currentUser, pocketOptionId: id }
				localStorage.setItem('currentUser', JSON.stringify(updatedUser))

				// Задержка перед перенаправлением
				setTimeout(() => {
					navigate('/')
				}, 3000)
			} else if (response.status === 404 || data.message === 'User not found') {
				setError('Пользователь не найден')
			} else {
				setError('Не удалось подтвердить ID. Попробуйте позже.')
			}
		} catch (err) {
			setError('Произошла ошибка при проверке ID. Попробуйте позже.')
			console.error('Ошибка:', err)
		} finally {
			setIsLoading(false)
		}
	}

	if (!currentUser) {
		alert('Пользователь не найден. Перенаправление на главную страницу.')
		navigate('/')
		return null
	}

	return (
		<div className='pocket-option-page'>
			<div className='content-container'>
				<div className='text-container'>
					<h1 className='register-broker-title'>
						Зарегистрироваться на брокере
					</h1>
					<p className='subtext'>
						Теперь вам нужно создать аккаунт на <br />
						брокере Pocket Option
					</p>
				</div>

				<div className='verification-container'>
					<h2 className='verification-title'>
						Вам нужно создать новый аккаунт на брокере, и дать нам ваш ID
					</h2>
					<p className='verification-text'>
						Так как мы не берем плату за использование нашего <br />
						сайта, мы используем партнерскую программу
						<br /> брокера Pocket Option, который выплачивает нам 3%
						<br /> от вашего оборота
					</p>
					<a
						href='https://po-ru1.click?utm_campaign=791890&utm_source=affiliate&utm_medium=sr&a=iD5XS2fotKsxuJ&ac=tradepulse'
						className='verification-button'
					>
						<img
							src={pocketOptionLogo}
							alt='Pocket Option'
							height='55px'
							className='button-img'
						/>
					</a>
					<p className='verification-disclaimer'>
						Нажимая на кнопку выше вы автоматически переходите по
						<br /> нашей партнерской ссылке
					</p>
					<h3 className='id-instruction'>
						После регистрации введите свой ID
						<br /> (находиться в информации профиля)
					</h3>
					<div className='id-input-container'>
						<input
							type='text'
							value={id}
							onChange={(e) => setId(e.target.value)}
							placeholder='ID 12345678'
							className='id-input'
						/>
						<button
							onClick={handleSubmit}
							className='verify-button'
							disabled={isLoading}
						>
							{isLoading ? 'Загрузка...' : 'ПРОВЕРИТЬ'}
						</button>
					</div>
					<div className='result-container'>
						{error && <p className='error-message'>{error}</p>}
						{success && <p className='success-message'>{success}</p>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default PocketOptionIdPage
