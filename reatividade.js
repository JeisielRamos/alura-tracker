const projeto = {
    id: 1,
    descricao: 'alura'
}

const proxy = new Proxy(projeto, {
    get(objetoriginal, chave) {
        console.log(`alguem pediu a chave ${chave} do projeto`)

        return objetoriginal[chave]
    },
    set(objetoriginal, chave, valor) {
        console.log(`alguem alterou a chave ${chave} do projeto para o valor ${valor}`)
        objetoriginal[chave] = valor
    }
})

proxy.descricao = 'reatividade'

console.log(proxy.descricao)