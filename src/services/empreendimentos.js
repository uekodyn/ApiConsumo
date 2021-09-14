import { http } from './config'

export default {

	salvar: (empreendimento) => {
		return http.post('empreendimento', empreendimento);
	},

	atualizar: (empreendimento) => {
		return http.put('empreendimento', empreendimento);
	},

	listar: () => {
		return http.get('empreendimentos')
	},

	apagar: (empreendimento) => {
		return http.delete('empreendimento', { data: empreendimento })
	}
}