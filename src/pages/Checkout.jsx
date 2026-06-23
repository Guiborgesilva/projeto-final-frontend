import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import CartSummary from '../components/CartSummary'
import CouponInput from '../components/CouponInput'

export default function Checkout({ data, cart, setCart }) {
	const navigate = useNavigate()
	const [cupomInfo, setCupomInfo] = useState({ valido: false, cupom: null })

	const { data: cuponsData } = useFetch('http://localhost:3001/cupons')

	const alterarQtd = (id, acao) => {
		setCart((prev) => {
			if (acao === 'remover') return prev.filter((p) => p.id !== id)
			return prev
				.map((p) => (p.id === id ? { ...p, qtd: p.qtd + (acao === 'mais' ? 1 : -1) } : p))
				.filter((p) => p.qtd > 0)
		})
	}

	let desconto = 0
	if (cupomInfo.valido && cupomInfo.cupom) {
		const subtotalCategoria = cart
			.filter((p) => p.categoria === cupomInfo.cupom.categoria_valida)
			.reduce((total, item) => total + item.preco * item.qtd, 0)
		desconto = subtotalCategoria * (cupomInfo.cupom.desconto_porcentagem / 100)
	}

	if (cart.length === 0) {
		return (
			<div style={{ textAlign: 'center', marginTop: '60px' }}>
				<h2 style={{ color: '#666' }}>Missão Abortada!</h2>
				<p style={{ color: '#999' }}>Você largou todo o loot no chão!</p>
				<button
					className='btn-primary'
					style={{ maxWidth: '300px', margin: '20px auto 0 auto' }}
					onClick={() => navigate('/')}
				>
					Buscar Novo Loot
				</button>
			</div>
		)
	}

	return (
		<div className='checkout-layout'>
			<div className='lista-carrinho'>
				{cart.map((item) => (
					<div
						key={item.id}
						className='cart-item'
					>
						<div>
							<h3>{item.nome}</h3>
							<p>R$ {item.preco.toFixed(2)}</p>
						</div>
						<div className='qtd-controls'>
							<button onClick={() => alterarQtd(item.id, 'menos')}>-</button>
							<span>{item.qtd}</span>
							<button onClick={() => alterarQtd(item.id, 'mais')}>+</button>
							<button
								className='btn-remover'
								onClick={() => alterarQtd(item.id, 'remover')}
							>
								X
							</button>
						</div>
					</div>
				))}
			</div>

			<div className='lateral-direita'>
				<CartSummary
					cart={cart}
					cupom={cupomInfo}
					desconto={desconto}
				/>

				{cuponsData && (
					<CouponInput
						cupons={cuponsData}
						produtosNoCarrinho={cart}
						onAplicarCupom={setCupomInfo}
					/>
				)}

				<div className='botoes-pagamento'>
					<button className='btn-pix'>Pagar com PIX</button>
					<button className='btn-credito'>Pagar com Cartão</button>
				</div>

				<button
					className='btn-voltar'
					onClick={() => navigate('/')}
				>
					Abortar Missão
				</button>
			</div>
		</div>
	)
}
