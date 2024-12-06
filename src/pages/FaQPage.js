import React from 'react'
import '../styles/FaQPage.css'
import Header from '../components/Header.js'
import Footer from './Footer.js'

const FaQPage = () => {
	return (
		<>
			<Header />
			<div className='faq-page'>
				<h1 className='faq-title'>Ответы на часто задаваемые вопросы</h1>
				<h2 className='faq-subtitle'>
					Мы собрали вопросы, которые нам часто задавали в службу технической
					поддержки, и дали на них ответы ниже
				</h2>
				<div className='faq-blocks'>
					<div className='faq-block'>
						<h3 className='faq-block-title'>В чем наша выгода?</h3>
						<p className='faq-block-text'>
							Наш сайт предоставляет услуги абсолютно бесплатно благодаря
							партнёрству с брокером Pocket Option. Раз в месяц мы получаем
							процент от вашего оборота, но это соглашение действует
							исключительно между нами и брокером. Для вас никаких
							дополнительных платежей не требуется.
						</p>
					</div>
					<div className='faq-block'>
						<h3 className='faq-block-title'>Откуда сигналы?</h3>
						<p className='faq-block-text'>
							Мы используем собственный самообучающийся искусственный интеллект,
							который анализирует рынок с высокой точностью на основе 76
							индикаторов. Это позволяет нам с уверенностью заявить, что мы
							являемся одними из лучших на рынке.
						</p>
					</div>
					<div className='faq-block'>
						<h3 className='faq-block-title'>
							Могу я торговать на другом брокере?
						</h3>
						<p className='faq-block-text'>
							Поскольку мы сотрудничаем исключительно с брокером Pocket Option,
							при отсутствии активности на вашем аккаунте доступ к сигналам
							будет заблокирован.
						</p>
					</div>
					<div className='faq-block'>
						<h3 className='faq-block-title'>Сколько я буду зарабатывать?</h3>
						<p className='faq-block-text'>
							Мы не можем дать точный ответ на этот вопрос, так как заработок
							зависит от вашего баланса на брокере и уровня активности.
							Возможный доход варьируется от 1 доллара до бесконечности — всё
							зависит только от ваших возможностей и целей.
						</p>
					</div>
				</div>
				<h1 className='faq-footer-text'>
					Задавайте любые вопросы — мы с радостью ответим!
				</h1>
			</div>
			<Footer />
		</>
	)
}

export default FaQPage
