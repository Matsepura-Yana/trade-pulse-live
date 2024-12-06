import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/EmailVerificationPage.css' // Стили

const EmailVerificationPage = () => {
	const [timeLeft, setTimeLeft] = useState(90)
	const [resendAvailable, setResendAvailable] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)
	const navigate = useNavigate()

	// Загружаем текущего пользователя из localStorage
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('currentUser'))
		if (!user) {
			alert('Пользователь не найден. Перенаправление на главную страницу.')
			navigate('/')
			return
		}
		setCurrentUser(user)

		// Показываем alert с подтверждением
		const confirmed = window.confirm(
			`Письмо с подтверждением отправлено на ${user.email}. Проверьте почту.`
		)

		// Если пользователь подтвердил, перенаправляем через 3 секунды
		if (confirmed) {
			setTimeout(() => {
				navigate('/verify-id')
			}, 2000)
		}
	}, [navigate])

	// Блокировка навигации назад
	useEffect(() => {
		// Блокируем переход назад
		const handlePopState = () => {
			window.history.pushState(null, null, window.location.href)
		}

		window.history.pushState(null, null, window.location.href) // Добавляем запись в историю
		window.addEventListener('popstate', handlePopState)

		// Убираем слушатель при размонтировании компонента
		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [])

	// Обратный отсчет для повторной отправки письма
	useEffect(() => {
		if (timeLeft === 0) {
			setResendAvailable(true)
			return
		}

		const intervalId = setInterval(
			() => setTimeLeft((prevTime) => prevTime - 1),
			1000
		)
		return () => clearInterval(intervalId)
	}, [timeLeft])

	// Функция повторной отправки письма
	const handleResendEmail = () => {
		setTimeLeft(90)
		setResendAvailable(false)
		alert('Письмо отправлено повторно. Проверьте ваш email.')
	}

	if (!currentUser) return null

	return (
		<div className='email-verification-page'>
			{/* Основной контент страницы */}
			<div className='content'>
				<h1 className='title'>Подтверждение Email</h1>
				<p>На ваш email отправлено письмо. Подтвердите вашу почту.</p>
				<p>Если вы не получили письмо, проверьте папку "Спам".</p>
				{resendAvailable ? (
					<button className='resend-btn' onClick={handleResendEmail}>
						Отправить новое письмо
					</button>
				) : (
					<p>Осталось времени: {timeLeft} секунд</p>
				)}
			</div>
		</div>
	)
}

export default EmailVerificationPage
