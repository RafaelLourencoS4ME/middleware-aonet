
# Middleware de API - Padronização de Dados Genesys

Este middleware de API oferece uma solução para padronizar e ajustar dados provenientes de APIs externas. Ele gerencia tokens de autenticação e tratamento de erros, garantindo uma integração de dados eficiente com a Genesys Cloud.

## Índice
1. [Visão Geral](#visão-geral)
2. [Configuração](#configuração)
3. [Endpoints](#endpoints)
4. [Autenticação](#autenticação)
5. [Logs](#logs)
6. [Funções](#funções)
7. [Licença](#licença)
8. [Developers](#developers)
9. [Versao](#versionamento)

## Visão Geral

O middleware padroniza dados aninhados recebidos de APIs externas, especicialmente para integração com Genesys Cloud. Ele gerencia automaticamente tokens de autenticação e reexecuta requisições quando necessário.

### Pré-requisitos
- Node.js (v14 ou superior)
- Docker e Docker Compose

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/TharsysSolve4me/ClilentSafra-ApiSmoother.git
    cd pasta-do-repositorio
    ```

2. Crie um arquivo `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:
    ```
    PORT=porta_opcional
    AUTH_URL_LOGIN=sua_url_de_autenticação
    AUTH_CREDENTIALS_USERNAME=seu_usuario
    AUTH_CREDENTIALS_PASSWORD=sua_senha
    ```

3. Construa e execute os contêineres Docker:
    ```bash
    docker-compose up --build -d
    ```

4. A API estará disponível em `http://localhost/ajustar-dados/${api-para-padronização}`.

## Configuração

- **Dockerfile**: Define o ambiente e as dependências para o middleware.
- **docker-compose.yml**: Configura os serviços, portas e volumes para executar o middleware e gerenciar logs.
- **.env**: Armazena credenciais sensíveis e parâmetros de configuração.

## Endpoints
### Retorna Todos os Itens Ajustados

```http
GET /ajustar-dados
```

**Parâmetros de Query:**
| Parâmetro  | Tipo     | Obrigatório | Descrição                                        |
| :--------- | :------- | :---------- | :----------------------------------------------- |
| `host`     | `string` | Sim         | URL da API externa de onde buscar os dados       |               |

**Resposta:**
- **200**: Dados ajustados com sucesso.
- **401**: Token inválido ou expirado.
- **404**: Nenhum dado encontrado para o host fornecido.
- **500**: Erro interno ao buscar ou ajustar dados.

### Exemplo de Requisição:
```http
GET /ajustar-dados?host=https://api.exemplo.com/
```

## Autenticação

O middleware utiliza um token Bearer para autenticação. Os tokens são automaticamente renovados quando expiram.

## Logs

Os logs são gerenciados usando o Winston e são armazenados no diretório `/usr/src/middleware/logs` dentro do contêiner. Os arquivos de log também são montados em um diretório no sistema host para persistência.

## Funções

### `dadosAninhados(dados)`

- Concatena arrays aninhados em strings para facilitar o processamento de dados.
- **Parâmetros:**
  - `dados` (Array): Array de objetos com dados aninhados.
- **Retorna:** Array ajustado de objetos.

### `obterNovoToken()`

- Solicita um novo token usando as credenciais fornecidas.
- **Retorna:** Atualiza a variável `BEARER_TOKEN` com o novo token.

### `verificarETentarObterNovoToken(error)`

- Verifica se uma requisição à API falhou devido a um token expirado e tenta obter um novo token.
- **Parâmetros:**
  - `error` (Object): O objeto de erro da requisição falhada.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

## Developers

# Autores
[<img src="https://avatars.githubusercontent.com/u/176444600?v=4" width=115><br><sub>Tharsys Santos</sub>](https://github.com/TharsysSolve4me) | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/183089609?v=4" width=115><br><sub>Joao Palazzolli</sub>](https://github.com/JoaoPalazzolli-solve4me)
| :---: | :---: | :---: |

## Versao

1.0 .

---

**Nota:** Substitua os placeholders como `pasta-do-repositorio`, `seu_usuario` e `sua_senha` pelos valores reais.
