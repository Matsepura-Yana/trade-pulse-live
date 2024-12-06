import React from 'react'
import '../styles/Footer.css'

const Footer = () => {
	return (
		<footer className='footer'>
			<p className='footer-text'>
				© {new Date().getFullYear()} TradePulse. Все права защищены.
				<a href='/privacy-policy' className='footer-link'>
					Политика конфиденциальности
				</a>
			</p>
		</footer>
	)
}

export default Footer
