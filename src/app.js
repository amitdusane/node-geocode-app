const path = require('path');
const geocode = require('./utils/geocode');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../template/views');
const partialsDir = path.join(__dirname, '../template/partials');

app.use(express.static(publicDir));
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);


app.get('', (req, res) => {
    res.render('index', {
        pageName: 'Index '
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageName: 'About'
    });
});

app.get('/geocode', (req, res) => {
    const address = req.query.address;
    if (!address){
        return res.send ({
            error: "Address is mandatory!"
        })
    }

    geocode(address , (error, data) => {
        return res.send({
            latitude: data.latitude,
            longitude: data.longitude,
            location: data.location
        });
    })
    
});

app.get('*', (req, res) => {
    res.render('404', {
        pageName: '404'
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port);
})