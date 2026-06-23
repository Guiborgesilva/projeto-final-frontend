export default function ProductItem({ produto, onAdd, btnRef }) {
	return (
		<div className='card'>
			<div
				className='card-img-container'
				style={{
					backgroundImage: `url(${produto.imagem})`
				}}
			></div>
			<h3>{produto.nome}</h3>
			<p className='descricao'>{produto.descricao}</p>
			<div className='card-footer'>
				<span className='preco'>R$ {produto.preco.toFixed(2)}</span>
				<button
					ref={(el) => (btnRef.current[produto.id] = el)} // Associa a ref aqui
					className='btn-add'
					onClick={() => onAdd(produto)}
				>
					Adicionar
				</button>
			</div>
		</div>
	)
}
