import { useState } from 'react'

export default function CouponInput({ cupons, produtosNoCarrinho, onAplicarCupom }) {
	const [codigo, setCodigo] = useState('')
	const [mensagem, setMensagem] = useState({ texto: '', tipo: '' })

	const validarCupom = () => {
		const cupomEncontrado = cupons.find((c) => c.codigo.toUpperCase() === codigo.toUpperCase())

		if (!cupomEncontrado) {
			setMensagem({ texto: 'Cupom não encontrado no sistema.', tipo: 'erro' })
			onAplicarCupom({ valido: false })
			return
		}

		if (!cupomEncontrado.ativo) {
			setMensagem({ texto: 'Este cupom existe, mas está inativo/expirado.', tipo: 'erro' })
			onAplicarCupom({ valido: false })
			return
		}

		const produtoCompativel = produtosNoCarrinho.find(
			(p) => p.categoria === cupomEncontrado.categoria_valida
		)

		if (!produtoCompativel) {
			setMensagem({
				texto: `Cupom válido apenas para a categoria '${cupomEncontrado.categoria_valida}'. Seu inventário não possui itens dessa categoria.`,
				tipo: 'erro'
			})
			onAplicarCupom({ valido: false })
			return
		}

		setMensagem({
			texto: `Cupom aplicado! ${cupomEncontrado.desconto_porcentagem}% de desconto.`,
			tipo: 'sucesso'
		})
		onAplicarCupom({ valido: true, cupom: cupomEncontrado })
	}

	return (
		<div className='coupon-box'>
			<h3>Cupom de Desconto</h3>
			<div className='coupon-input-group'>
				<input
					type='text'
					value={codigo}
					onChange={(e) => setCodigo(e.target.value)}
					placeholder='Digite seu cupom...'
				/>
				<button onClick={validarCupom}>Aplicar</button>
			</div>
			{mensagem.texto && <p className={`msg-${mensagem.tipo}`}>{mensagem.texto}</p>}
		</div>
	)
}
