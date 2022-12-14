const express = require('express'); const path = require('path');
const app = express(); app.use(express.static(path.join(__dirname, 'build'))); 
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const port = 7000; 
app.listen(port, error => {
    console.log("Server is started on port "+ port)
});