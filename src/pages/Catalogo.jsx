import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem'

export default function Catalogo({ data, setCart }) {
	const navigate = useNavigate()
	const btnRefs = useRef({}) // Guarda a referência de cada botão para animar

	const adicionarAoCarrinho = (produto) => {
		// Animação do botão
		const btn = btnRefs.current[produto.id]
		if (btn) {
			btn.classList.remove('pulse')
			void btn.offsetWidth // Força o reflow para reiniciar a animação CSS
			btn.classList.add('pulse')
		}

		// Lógica de adicionar ao carrinho
		setCart((prev) => {
			const existe = prev.find((p) => p.id === produto.id)
			if (existe) {
				return prev.map((p) => (p.id === produto.id ? { ...p, qtd: p.qtd + 1 } : p))
			}
			return [...prev, { ...produto, qtd: 1 }]
		})
	}

	if (!data) return <p>Carregando itens do inventário...</p>

	return (
		<div>
			<div className='grid-cards'>
				{data.produtos.map((prod) => (
					<ProductItem
						key={prod.id}
						produto={prod}
						onAdd={adicionarAoCarrinho}
						btnRef={btnRefs} // Passa a ref para o componente filho
					/>
				))}
			</div>
			<button
				className='btn-primary'
				onClick={() => navigate('/checkout')}
			>
				Equipar e Seguir
			</button>
		</div>
	)
}
