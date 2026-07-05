const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());

const lerDados = () => {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
};

const salvarDados = (dados) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(dados, null, 2));
};

const proximoId = (lista) => {
  if (!lista.length) return 1;
  return Math.max(...lista.map((item) => Number(item.id))) + 1;
};

const anexarUsuario = (feedback, usuarios) => {
  const usuario = usuarios.find((u) => Number(u.id) === Number(feedback.usuarioId));

  if (!usuario || feedback.anonimo) {
    return {
      ...feedback,
      usuario: {
        id: null,
        name: 'Anônimo',
        email: null,
        role: null
      }
    };
  }

  return {
    ...feedback,
    usuario: {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role
    }
  };
};

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API HablaComigo rodando' });
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const dados = lerDados();

  const usuario = dados.usuarios.find(
    (u) => u.email.toLowerCase() === String(email || '').toLowerCase() && u.senha === senha
  );

  if (!usuario) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }

  const { senha: _senha, ...usuarioSeguro } = usuario;

  res.json({
    token: `fake-jwt-usuario-${usuario.id}`,
    usuario: usuarioSeguro
  });
});

app.get('/usuarios', (req, res) => {
  const { email } = req.query;
  const dados = lerDados();

  const usuariosSemSenha = dados.usuarios.map(({ senha, ...rest }) => rest);

  if (email) {
    const usuario = dados.usuarios.find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase()
    );

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const { senha, ...usuarioSeguro } = usuario;
    return res.json(usuarioSeguro);
  }

  res.json(usuariosSemSenha);
});

app.get('/usuarios/:id', (req, res) => {
  const dados = lerDados();
  const usuario = dados.usuarios.find((u) => Number(u.id) === Number(req.params.id));

  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const { senha, ...usuarioSeguro } = usuario;
  res.json(usuarioSeguro);
});

app.post('/usuarios', (req, res) => {
  const dados = lerDados();
  const { name, email, senha } = req.body;

  if (!name || !email || !senha) {
    return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios' });
  }

  const emailExiste = dados.usuarios.some(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );

  if (emailExiste) {
    return res.status(409).json({ message: 'E-mail já cadastrado' });
  }

  const novoUsuario = {
    id: proximoId(dados.usuarios),
    name,
    email,
    senha,
    role: 'user'
  };

  dados.usuarios.push(novoUsuario);
  salvarDados(dados);

  const { senha: _senha, ...usuarioSeguro } = novoUsuario;
  res.status(201).json(usuarioSeguro);
});

app.get('/feedbacks', (req, res) => {
  const dados = lerDados();
  const { usuarioId, setor, tipo } = req.query;

  let feedbacks = [...dados.feedbacks];

  if (usuarioId) {
    feedbacks = feedbacks.filter((f) => Number(f.usuarioId) === Number(usuarioId));
  }

  if (setor && setor !== 'TODOS') {
    feedbacks = feedbacks.filter((f) => String(f.setor).toUpperCase() === String(setor).toUpperCase());
  }

  if (tipo && tipo !== 'TODOS') {
    feedbacks = feedbacks.filter((f) => String(f.tipo).toLowerCase() === String(tipo).toLowerCase());
  }

  const resposta = feedbacks
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map((f) => anexarUsuario(f, dados.usuarios));

  res.json(resposta);
});

app.get('/feedbacks/setor', (req, res) => {
  const { setor } = req.query;
  const dados = lerDados();

  if (!setor) {
    return res.status(400).json({ message: 'Informe o setor' });
  }

  const feedbacks = dados.feedbacks
    .filter((f) => String(f.setor).toUpperCase() === String(setor).toUpperCase())
    .map((f) => anexarUsuario(f, dados.usuarios));

  res.json(feedbacks);
});

app.get('/feedbacks/me/:usuarioId', (req, res) => {
  const dados = lerDados();
  const feedbacks = dados.feedbacks
    .filter((f) => Number(f.usuarioId) === Number(req.params.usuarioId))
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
    .map((f) => anexarUsuario(f, dados.usuarios));

  res.json(feedbacks);
});

app.get('/feedbacks/:id', (req, res) => {
  const dados = lerDados();
  const feedback = dados.feedbacks.find((f) => Number(f.id) === Number(req.params.id));

  if (!feedback) {
    return res.status(404).json({ message: 'Feedback não encontrado' });
  }

  res.json(anexarUsuario(feedback, dados.usuarios));
});

app.post('/feedbacks', (req, res) => {
  const dados = lerDados();
  const { tipo, mensagem, anonimo, usuarioId, setor, nota } = req.body;

  if (!tipo || !mensagem || usuarioId === undefined || !setor) {
    return res.status(400).json({ message: 'Dados obrigatórios não enviados' });
  }

  const usuarioExiste = dados.usuarios.some((u) => Number(u.id) === Number(usuarioId));

  if (!usuarioExiste) {
    return res.status(404).json({ message: 'Usuário não encontrado para este feedback' });
  }

  const novoFeedback = {
    id: proximoId(dados.feedbacks),
    tipo,
    mensagem,
    anonimo: Boolean(anonimo),
    usuarioId: Number(usuarioId),
    setor,
    nota: Number(nota || 0),
    data: new Date().toISOString()
  };

  dados.feedbacks.push(novoFeedback);
  salvarDados(dados);

  res.status(201).json(anexarUsuario(novoFeedback, dados.usuarios));
});

app.delete('/feedbacks/:id', (req, res) => {
  const dados = lerDados();
  const antes = dados.feedbacks.length;

  dados.feedbacks = dados.feedbacks.filter((f) => Number(f.id) !== Number(req.params.id));

  if (dados.feedbacks.length === antes) {
    return res.status(404).json({ message: 'Feedback não encontrado' });
  }

  salvarDados(dados);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API HablaComigo rodando em http://localhost:${PORT}`);
});
