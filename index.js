const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'Localhost',
  user: 'root',
  password: '',
  database: 'teste_local'
});
db.connect((err) => {
  if (err) {
  console.error('Erro na conexão com o banco de dados:', err);
  return;
  }
  console.log('Conexão com o banco de dados MySQL estabelecida.');
  });

// Configurando o mecanismo de visualização Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Rota principal, renderizando a página home.handlebars
app.get('/', (req, res) => {
  res.render('home');
});

// Rota para inserir dados
app.post('/clientescontroller/insertclientescontroller', (req, res) => {
  const { id, cnpj, razao_social, nome_fantasia, telefone } = req.body;
  const query = 'INSERT INTO clientescontroller (id, cnpj, razao_social, nome_fantasia, telefone ) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, cnpj, razao_social, nome_fantasia, telefone], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err);
      res.status(500).send('Erro ao inserir dados no banco de dados.');
      return;
    }
    console.log('Dados Venda inseridos com sucesso.');
    res.send('Dados Venda inseridos com sucesso.');
  });
});

app.listen(3000, () => {
  console.log('Servidor está executando na porta 3000');
});

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS clientescontroller (
      id INT PRIMARY KEY,
      cnpj VARCHAR(255),
      razao_social VARCHAR(255),
      nome_fantasia VARCHAR(255),
      telefone VARCHAR(255)
      )
  `;

  db.query(createTableQuery, (createErr, createResult) => {
    if (createErr) {
      console.error('Erro ao criar a tabela:', createErr);
      return;
    }
    console.log('Tabela clientescontroller criada com sucesso.');
  });