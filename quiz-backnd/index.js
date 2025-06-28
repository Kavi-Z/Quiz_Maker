const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'kavindusangasanjitha123';

app.use(cors());
app.use(express.json());

let users = []; 

app.post('/signup', async (req, res) => {
  const { fullName, email, password, role } = req.body;

  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = { id: users.length + 1, fullName, email, password: hashedPassword, role };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully.' });
});

app.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const user = users.find(u => u.email === email && u.role === role);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return res.json({ message: 'Login successful', token });
});

app.get('/', (req, res) => {
  res.send('Quiz backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
