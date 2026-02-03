---
--- 1. CRIAÇÃO DOS TIPOS ENUMERADOS (POSTGRESQL)
---

CREATE TYPE estado_civil AS ENUM ('Solteiro', 'Casado', 'Divorciado', 'Viúvo', 'SeparadoJudicialmente');
CREATE TYPE nivel_renda AS ENUM ('até 1 salários mínimos', '1 a 2 salários mínimos', 'Mais de 2 salários mínimos');
CREATE TYPE nivel_alfabetizacao AS ENUM ('sabe ler e escrever', 'sabe ler e não escreve', 'não lê e não escreve');
CREATE TYPE grau_escolaridade AS ENUM ('ensino fundamental incompleto', 'ensino fundamental completo', 'ensino médio incompleto', 'ensino médio completo', 'superior ou mais');
CREATE TYPE tipo_metodo AS ENUM ('Digital', 'Manual');
CREATE TYPE tipo_endereco AS ENUM ('urbano', 'rural');
CREATE TYPE status_demanda AS ENUM ('Criada', 'Compartilhada', 'Completa', 'Em_entrega', 'Entregue');
CREATE TYPE status_interesse AS ENUM ('pendente', 'aprovado');
CREATE TYPE tipo_conta_bancaria AS ENUM ('poupanca', 'corrente');
CREATE TYPE tipo_local_rural AS ENUM ('sitio', 'fazenda', 'vila', 'comunidade');

CREATE TYPE unidade_medida AS ENUM (
    'Kg', 'Ampola', 'Balde', 'Barra', 'Bisnaga', 'Bloco', 'Bobina', 'Bomba', 'Capsulas',
    'Carrinho', 'Cento', 'Cj', 'Cm', 'Cm2', 'Cx', 'Cx2', 'Cx3', 'Cx5', 'Cx10', 'Cx15', 
    'Cx20', 'Cx25', 'Cx50', 'Cx100', 'Disp', 'Duzia', 'Embal', 'Fardo', 'Folha', 'Frasco', 
    'Galao', 'Gf', 'M2', 'M3', 'Milhei', 'MWh', 'Pacote', 'Palete', 'Pares', 'Pc', 
    'Resma', 'Rolo', 'Saco', 'Sacola', 'Tambor', 'Tanque', 'Ton', 'Tubo', 'Unid', 
    'Vasil', 'Vidro', 'Gramas', 'Jogo', 'Kit', 'Lata', 'Litro', 'M'
);

---
--- 2. CRIAÇÃO DAS TABELAS
---

-- Tabela Usuários (Acesso ao sistema)
CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    email varchar(150) UNIQUE NOT NULL,
    senha varchar(255) NOT NULL,
    telefone varchar(14)
);

-- Tabela Administrativo/Diretores
CREATE TABLE administrativo (
    id_diretor SERIAL PRIMARY KEY,
    cpf varchar(14) UNIQUE NOT NULL,
    cargo varchar(100)
);

-- Tabela Cooperado (Entidade Principal)
CREATE TABLE cooperado (
    id_cooperado SERIAL PRIMARY KEY,
    num_matricula int UNIQUE NOT NULL,
    cpf varchar(11) UNIQUE NOT NULL,
    rg varchar(20) UNIQUE,
    data_nasc date,
    nome_pai varchar(150),
    nome_mae varchar(150),
    nacionalidade varchar(50),
    naturalidade varchar(50),
    estado_civil estado_civil,
    regime_comunhao varchar(100),
    profissao varchar(100),
    ocupacao varchar(100),
    renda_mensal nivel_renda,
    alfabetizacao nivel_alfabetizacao,
    grau_escola grau_escolaridade,
    num_cnh varchar(20),
    comprovante_rg varchar(255),
    comprovante_cnh varchar(255),
    arqv_cadastro varchar(255),
    arqv_integralizacao varchar(255),
    termo_demissao varchar(255),
    data_emissao date,
    metodo_aceite tipo_metodo
);

-- Tabela de Endereço (Base)
CREATE TABLE endereco_cooperado (
    id_endereco_cooperado SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado) ON DELETE CASCADE,
    tipo_endereco tipo_endereco,
    bairro varchar(150),
    cep varchar(8),
    cidade varchar(100),
    uf char(2),
    path_comp_residencia varchar(255)
);

-- Tabelas de Especialização de Endereço
CREATE TABLE endereco_urbano (
    id_endereco int PRIMARY KEY REFERENCES endereco_cooperado(id_endereco_cooperado),
    logradouro varchar(150),
    numero int,
    complemento varchar(50)
);

CREATE TABLE endereco_rural (
    id_endereco int PRIMARY KEY REFERENCES endereco_cooperado(id_endereco_cooperado),
    tipo_local tipo_local_rural,
    nome_local varchar(150)
);

-- Tabela de Conta Bancária
CREATE TABLE conta_bancaria (
    id_contabancaria SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado) UNIQUE,
    nome_banco varchar(100),
    tipo_conta tipo_conta_bancaria,
    agencia varchar(10),
    num_conta varchar(20),
    chave_pix varchar(100) UNIQUE
);

-- Tabela de Produtos
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    id_cooperado_origem int REFERENCES cooperado(id_cooperado),
    codigo int UNIQUE NOT NULL,
    nome_prod varchar(100),
    marca_prod varchar(100),
    unidade_medida unidade_medida,
    qtd_estoque numeric(15,3) DEFAULT 0,
    ncm varchar(8),
    preco numeric(15,2)
);

-- Tabela de Produção (Histórico de produção do cooperado)
CREATE TABLE producao (
    id_producao SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado),
    id_produto int REFERENCES produto(id_produto),
    qtd_producao numeric(15,3),
    valor_insumo numeric(15,2),
    hectares numeric(12,2),
    data_registro date DEFAULT CURRENT_DATE,
    nome_propriedade varchar(150),
    unidade_medida unidade_medida
);

-- Tabela de Demanda (Necessidades da Cooperativa)
CREATE TABLE demanda (
    id_demanda SERIAL PRIMARY KEY,
    id_produto int REFERENCES produto(id_produto),
    unidade_medida unidade_medida,
    qtd_demanda numeric(15,3),
    qtd_acumulada numeric(15,3) DEFAULT 0,
    data_prazo timestamp,
    status_demanda status_demanda DEFAULT 'Criada'
);

-- Tabela de Interesse (Cooperado respondendo à demanda)
CREATE TABLE interesse (
    id_interesse SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado),
    id_demanda int REFERENCES demanda(id_demanda),
    qtd_interesse numeric(15,3),
    status status_interesse DEFAULT 'pendente',
    data_manifestacao date DEFAULT CURRENT_DATE
);

-- Financeiro: Integralização de Capital
CREATE TABLE integralizacao (
    id_integralizacao SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado),
    data_base date,
    historico text,
    status_total boolean DEFAULT false,
    a_integralizar numeric(15,2),
    valor_quota numeric(15,2),
    num_total int,
    num_falta int
);

CREATE TABLE transferencia_integralizacao (
    id_transferencia SERIAL PRIMARY KEY,
    id_integralizacao int REFERENCES integralizacao(id_integralizacao),
    data_transf date,
    historico text,
    valor numeric(15,2),
    nome_cessionario varchar(150)
);

-- Documentação: Testemunhas e Termos
CREATE TABLE testemunha (
    id_testemunha SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado),
    nome varchar(150),
    cpf varchar(11) UNIQUE
);

CREATE TABLE termo_demissao (
    id_termo SERIAL PRIMARY KEY,
    id_cooperado int REFERENCES cooperado(id_cooperado),
    motivo text,
    data_desligamento date,
    obs varchar(255),
    path_assinado varchar(255)
);