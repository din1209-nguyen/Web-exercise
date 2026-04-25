const express = require('express');
const app = express();
require('dotenv').config();

// Middleware để parse JSON
app.use(express.json());

// ── MIDDLEWARE LOGGER ──
const loggerMiddleware = (req, res, next) => {
  const now = new Date().toISOString();
  const logMessage = `[${now}] ${req.method} ${req.path}`;
  console.log(logMessage);
  
  // Lưu log vào array
  logs.unshift(logMessage);
  if (logs.length > 20) logs.pop(); // Giữ tối đa 20 logs
  
  next();
};
app.use(loggerMiddleware);

// ── MIDDLEWARE CHECK AGE ──
const checkAge = (req, res, next) => {
  const age = req.query.age || req.body.age;
  
  if (!age || Number(age) < 18) {
    return res.status(400).json({ 
      error: 'Bạn chưa đủ 18 tuổi' 
    });
  }
  next();
};

// ── COUNTER FOR USER ID ──
let nextId = 1;

// ── LOGS STORAGE ──
let logs = [];

// ── ROUTE GET /api/logs ──
app.get('/api/logs', (req, res) => {
  res.json({ logs });
});

// ── ROUTE GET /api/info ──
app.get('/api/info', checkAge, (req, res) => {
  const { name, age } = req.query;
  
  if (!name) {
    return res.status(400).json({ 
      error: 'Vui lòng nhập tên' 
    });
  }
  
  res.json({
    name,
    age: Number(age),
    message: `Chào mừng ${name}!`
  });
});

// ── ROUTE POST /api/register ──
app.post('/api/register', (req, res) => {
  const { name, age, email } = req.body;
  
  // Validate không bỏ trống
  if (!name || !age || !email) {
    return res.status(400).json({ 
      error: 'Vui lòng điền đầy đủ' 
    });
  }
  
  // Validate tuổi >= 18
  if (Number(age) < 18) {
    return res.status(400).json({ 
      error: 'Bạn chưa đủ 18 tuổi' 
    });
  }
  
  // Trả về thông tin + id tự tăng
  const user = {
    id: nextId++,
    name,
    age: Number(age),
    email
  };
  
  res.json(user);
});

// ── SERVE STATIC FILES ──
app.use(express.static('public'));

// ── START SERVER ──
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
