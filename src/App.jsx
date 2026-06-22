import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useFetch } from './hooks/useFetch'
import Catalogo from './pages/Catalogo'
import Checkout from './pages/Checkout'
import bau from './assets/bau.png'
import './App.css'

function useLocalStorage(key, initialValue) {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			return initialValue
		}
	})

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(storedValue))
		} catch (error) {
			console.error('Erro ao salvar no localStorage', error)
		}
	}, [key, storedValue])

	return [storedValue, setStoredValue]
}

function AppContent({ data, cart, setCart }) {
	const location = useLocation()

	const progresso = location.pathname === '/checkout' ? 100 : 20

	const totalItens = cart.reduce((acc, item) => acc + item.qtd, 0)

	return (
		<>
			<header className='header-faixa'>CHECKPOINT</header>
			<div className='progresso-container'>
				<div
					className='progresso-barra'
					style={{ width: `${progresso}%` }}
				></div>
			</div>

			<main className='main-content'>
				<div className='page-top'>
					<h1>
						{location.pathname === '/checkout' ? 'Finalizar Loot' : 'Arsenal de opções'}
					</h1>

					<div
						className='carrinho-icon'
						title='Seu inventário'
					>
						<img src={bau} />
						{totalItens > 0 && <span className='carrinho-badge'>{totalItens}</span>}
					</div>
				</div>

				<Routes>
					<Route
						path='/'
						element={
							<Catalogo
								data={data}
								setCart={setCart}
							/>
						}
					/>
					<Route
						path='/checkout'
						element={
							<Checkout
								data={data}
								cart={cart}
								setCart={setCart}
							/>
						}
					/>
				</Routes>
			</main>

			<footer className='footer-faixa'>Todos os direitos reservados a Falkon © 2026</footer>
		</>
	)
}

export default function App() {
	const { data, loading, error } = useFetch('http://localhost:3001/produtos')
	const [cart, setCart] = useLocalStorage('falkon_cart', [])

	if (loading)
		return (
			<div style={{ textAlign: 'center', marginTop: '50px' }}>
				Carregando texturas do mapa...
			</div>
		)
	if (error)
		return (
			<div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
				Erro: {error}
			</div>
		)

	return (
		<BrowserRouter>
			<AppContent
				data={data}
				cart={cart}
				setCart={setCart}
			/>
		</BrowserRouter>
	)
}
