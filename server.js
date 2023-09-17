const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory under the "/lab1/" path
// app.get('/', (req, res) => {
//   res.redirect('/lab1/index.html');
// });


app.use('/', express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
