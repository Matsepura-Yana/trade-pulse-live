import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/ProfilePage.css'
import Header from '../components/Header.js'
import logout from '../images/logout icon.svg'
import Footer from './Footer.js'

const ProfilePage = ({ user, setUser }) => {
	const navigate = useNavigate()
	const [newPassword, setNewPassword] = useState('')
	const [verificationCode, setVerificationCode] = useState('')
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState('')
	const [alertCode, setAlertCode] = useState('')

	const handleLogout = () => {
		setUser(null)
		localStorage.removeItem('currentUser')
		navigate('/')
	}

	const handleOpenModal = () => {
		setModalVisible(true)
		setTimeout(() => {
			const generatedCode = Math.floor(
				100000 + Math.random() * 900000
			).toString()
			setAlertCode(generatedCode)
			alert(`Ваш код: ${generatedCode}`)
		}, 1500)
	}

	const handleCloseModal = () => {
		setModalVisible(false)
		setVerificationCode('')
		setNewPassword('')
		setMessage('')
	}

	const handleChangePassword = () => {
		if (alertCode !== verificationCode) {
			setMessage('Неверный код подтверждения.')
			return
		}

		if (!newPassword.trim()) {
			setMessage('Пароль не может быть пустым.')
			return
		}

		const users = JSON.parse(localStorage.getItem('users')) || []
		const updatedUsers = users.map((u) =>
			u.email === user.email ? { ...u, password: newPassword } : u
		)

		localStorage.setItem('users', JSON.stringify(updatedUsers))
		const updatedCurrentUser = { ...user, password: newPassword }
		setUser(updatedCurrentUser)
		localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser))

		// Устанавливаем сообщение об успешном изменении пароля
		setMessage('Пароль успешно изменен')

		// Закрываем модалку через 1.5 секунды
		setTimeout(() => {
			handleCloseModal()
		}, 1500)
	}

	if (!user) {
		return (
			<div className='profile-page'>
				<div className='profile-container'>
					<p className='login-warning'>
						Пожалуйста, войдите в аккаунт, чтобы просмотреть профиль.
					</p>
				</div>
			</div>
		)
	}

	return (
		<>
			<Header />
			<div className='profile-page'>
				<div className='profile-container'>
					<h1 className='profile-title'>Настройки аккаунта</h1>
					<div className='profile-block'>
						<p className='input-label'>Email</p>
						<div className='profile-info'>{user.email}</div>
					</div>
					<div className='profile-block'>
						<p className='input-label'>Пароль</p>
						<button
							className='change-password-button'
							onClick={handleOpenModal}
						>
							Изменить пароль
						</button>
						<p className='disclaimer'>
							*Для изменения пароля, введите код
							<br /> отправленный на вашу почту
						</p>
					</div>
					<button className='logout-button' onClick={handleLogout}>
						<img src={logout} alt='logout' height='45px' />
						Выйти
					</button>
				</div>
			</div>

			{/* Модалка */}
			{modalVisible && (
				<div className='profile-modal-overlay'>
					<div className='profile-modal'>
						<h2 className='profile-modal-title'>Изменение пароля</h2>
						<input
							type='text'
							placeholder='Введите код из email'
							className='profile-modal-input'
							value={verificationCode}
							onChange={(e) => setVerificationCode(e.target.value)}
						/>
						<input
							type='password'
							placeholder='Введите новый пароль'
							className='profile-modal-input profile-modal-password-input'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<p className='profile-modal-description'>
							Код отправлен на вашу почту. Проверьте папку "Спам"
						</p>
						<button className='resend-code-button' onClick={handleOpenModal}>
							Отправить код повторно
						</button>
						<div className='profile-modal-buttons'>
							<button
								className='profile-modal-save-button'
								onClick={handleChangePassword}
							>
								Сохранить
							</button>
							<button
								className='profile-modal-cancel-button'
								onClick={handleCloseModal}
							>
								Отмена
							</button>
						</div>
						{/* Сообщение об ошибке или успехе */}
						{message && (
							<p className='profile-modal-password-change-result'>
								<p
									className={
										message === 'Пароль успешно изменен'
											? 'profile-modal-success'
											: 'profile-modal-error'
									}
								>
									{message}
								</p>
							</p>
						)}
					</div>
				</div>
			)}
			<Footer />
		</>
	)
}

export default ProfilePage
