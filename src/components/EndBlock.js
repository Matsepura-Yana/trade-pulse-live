import React, { useEffect, useState } from 'react'
import '../styles/EndBlock.css'
import { Link } from 'react-router-dom'

const EndBlock = () => {
	const [currentUser, setCurrentUser] = useState(null) // Локальное состояние для пользователя
	const [isLoading, setIsLoading] = useState(true) // Добавляем состояние загрузки

	useEffect(() => {
		// Загружаем пользователя из локального хранилища
		const userData = JSON.parse(localStorage.getItem('currentUser'))
		setCurrentUser(userData)
		setIsLoading(false) // Загрузка завершена
	}, [])

	return (
		<div className='end-block'>
			<h1 className='end-block-title'>Начни уже сейчас!</h1>
			<p className='end-block-subtitle'>
				Начни свой путь в трейдинге уже сейчас, действуй
			</p>
			<div className='end-block-arrow'></div>

			{currentUser ? (
				<Link to='/signal'>
					<button className='end-block-button'>СИГНАЛ</button>
				</Link>
			) : (
				<Link to='/register'>
					<button className='end-block-button'>АВТОРИЗАЦИЯ</button>
				</Link>
			)}
		</div>
	)
}

export default EndBlock
