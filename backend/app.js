const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/loginRoutes');
const manageUserRoutes = require('./routes/manageUserRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');
const returnEntryRoutes = require('./routes/returnEntryRoutes');
const userDetailRoutes = require('./routes/userDetailRoutes');
const dueBooks = require('./routes/checkDueRoutes');
const fines = require('./routes/fineRoutes');
const request = require('./routes/activationRequestRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/', loginRoutes);
app.use('/users', manageUserRoutes);
app.use('/category', categoryRoutes);
app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/admin/dashboard', adminDashboardRoutes);
app.use('/returnEntry', returnEntryRoutes);
app.use('/userDetail', userDetailRoutes);
app.use('/dueBooks', dueBooks);
app.use('/fines', fines);
app.use('/activationRequest', request);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});