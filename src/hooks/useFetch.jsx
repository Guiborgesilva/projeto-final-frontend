import { useState, useEffect } from 'react'

export function useFetch(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()

		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await fetch(url, { signal: controller.signal })

				if (!response.ok) {
					throw new Error('Erro na rede ao buscar dados')
				}

				const json = await response.json()
				setData({ produtos: json }) // O json-server retorna direto o array de produtos, então colocamos dentro de um objeto pra manter o seu código funcionando sem mudar nada mais
				setError(null)
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err.message)
				}
			} finally {
				setLoading(false)
			}
		}

		fetchData()

		// Limpa a requisição se o componente desmontar
		return () => controller.abort()
	}, [url])

	return { data, loading, error }
}
