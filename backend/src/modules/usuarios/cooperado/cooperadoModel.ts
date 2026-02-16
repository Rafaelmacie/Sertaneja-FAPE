// Enums para garantir que o banco não receba string errada
export type EstadoCivil = 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | 'SeparadoJudicialmente';
export type NivelRenda = 'até 1 salários mínimos' | '1 a 2 salários mínimos' | 'Mais de 2 salários mínimos';
export type NivelAlfabetizacao = 'sabe ler e escrever' | 'sabe ler e não escreve' | 'não lê e não escreve';
export type GrauEscolaridade = 'ensino fundamental incompleto' | 'ensino fundamental completo' | 'ensino médio incompleto' | 'ensino médio completo' | 'superior ou mais';
export type TipoMetodo = 'Digital' | 'Manual';
export type TipoEndereco = 'urbano' | 'rural';
export type TipoLocalRural = 'sitio' | 'fazenda' | 'vila' | 'comunidade';
export type TipoConta = 'poupanca' | 'corrente';
export type UnidadeMedida = 
    | 'Kg' | 'Ampola' | 'Balde' | 'Barra' | 'Bisnag' | 'Bloco' | 'Bobina' 
    | 'Bombear' | 'Cápsulas' | 'Carrinho' | 'Cento' | 'Cj' | 'Cm' | 'Cm2' 
    | 'Cx' | 'Cx2' | 'Cx3' | 'Cx5' | 'Cx10' | 'Cx15' | 'Cx20' | 'Cx25' 
    | 'Cx50' | 'Cx100' | 'Disp' | 'Duzia' | 'Embal' | 'Fardo' | 'Folha' 
    | 'Frasco' | 'Galao' | 'Gf' | 'M2' | 'M3' | 'Milhei' | 'Mwh' | 'Pacote' 
    | 'Palete' | 'Pares' | 'Pc' | 'Amigo' | 'K' | 'Resma' | 'Rolo' | 'Saco' 
    | 'Sacola' | 'Tambor' | 'Tanque' | 'Ton' | 'Tubo' | 'Unid' | 'Vasil' 
    | 'Vidro' | 'Gramas' | 'Jogo' | 'Kit' | 'Lata' | 'Litro' | 'M';

// Interfaces auxiliares (Partes do formulário)
export interface IEnderecoInput {
    tipo: TipoEndereco;
    cep: string;
    cidade: string;
    uf: string;
    bairro: string;
    // Opcionais dependendo do tipo
    logradouro?: string;      // Urbano
    numero?: number;          // Urbano
    complemento?: string;     // Urbano
    tipoLocal?: TipoLocalRural; // Rural
    nomeLocal?: string;       // Rural
}

export interface IFinanceiroInput {
    nomeBanco: string;
    tipoConta: TipoConta;
    agencia: string;
    numConta: string;
    chavePix: string;
}

export interface ITestemunhaInput {
    nome: string;
    cpf: string;
}

export interface IProducaoInput {
    idProduto: number;       // FK: ID do produto que seu colega criou (Milho, Soja, etc)
    unidadeMedida: UnidadeMedida;
    quantidade: number;      // qntProducao
    valorInsumo: number;     // Quanto gastou para produzir
    valorEstimado: number;   // valorProd (Valor de mercado/venda)
    hectares: number;        // Área utilizada
    nomePropriedade: string; // Onde foi produzido
    cidade: string;
    uf: string;
}

// O DTO PRINCIPAL (O JSON Gigante que o Frontend envia)
export interface ICreateCooperadoDTO {
    // 1. Dados de Usuário (Login)
    usuario: {
        nome: string;
        email: string;
        senhaHash: string; // Service vai gerar isso
        telefone: string;
    };
    
    // 2. Dados Pessoais do Cooperado
    dadosPessoais: {
        numMatricula: number;
        cpf: string;
        rg: string;
        dataNasc: string | Date; // Aceita string do JSON
        nomePai: string;
        nomeMae: string;
        nacionalidade: string;
        naturalidade: string;
        estadoCivil: EstadoCivil;
        regimeComunhao?: string;
        profissao: string;
        ocupacao: string;
        rendaMensal: NivelRenda;
        alfabetizacao: NivelAlfabetizacao;
        grauEscola: GrauEscolaridade;
        numCnh?: string;
        metodoAceite: TipoMetodo;
    };

    // 3. Endereço (Polimórfico: Rural ou Urbano)
    endereco: IEnderecoInput;

    // 4. Financeiro
    financeiro: IFinanceiroInput;

    producoes: IProducaoInput[]; // É um ARRAY, pois ele pode produzir várias coisas

    // 5. Testemunhas (Opcional)
    testemunhas?: ITestemunhaInput[];
}