export default function CartSummary({ cart, cupom, desconto }) {
	const subtotal = cart.reduce((total, item) => total + item.preco * item.qtd, 0)
	const totalFinal = subtotal - desconto

	const hoje = new Date()
	hoje.setDate(hoje.getDate() + 6)
	const dataEntrega = hoje.toLocaleDateString('pt-BR')

	// Se o carrinho estiver vazio, não mostra a caixa de resumo
	if (cart.length === 0) return null

	return (
		<div className='summary-box'>
			<h3>Resumo do Pedido</h3>
			<p>Itens no carrinho: {cart.reduce((acc, item) => acc + item.qtd, 0)}</p>

			<p>Data de entrega: {dataEntrega}</p>

			<hr />
			<p>Subtotal: R$ {subtotal.toFixed(2)}</p>
			{cupom.valido && (
				<p style={{ color: 'green' }}>
					Desconto ({cupom.cupom.codigo}): - R$ {desconto.toFixed(2)}
				</p>
			)}
			<h2>Total: R$ {totalFinal.toFixed(2)}</h2>
		</div>
	)
}
