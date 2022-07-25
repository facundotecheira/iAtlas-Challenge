const path = require('path')
const fs = require('fs')

const imagesControllers = {


  getAll: (req, res) => {
    req.getConnection((error, conn) => {
      if(error) return res.status(500).send('server error')
      conn.query('SELECT * FROM imagenes', (error, rows) => {
        if (error) return res.json(error)
        
        rows.map(img =>{
          fs.writeFileSync(path.join(__dirname, '../dbimages/' + img.name), img.data)
        })
         const imagenes = fs.readdirSync(path.join(__dirname, '../dbImages/'))
         
        return res.json({ response: imagenes })
      })
    })
  },

  saveImage: (req, res) => {
    const { filename } = req.file
    const data = fs.readFileSync(path.join(__dirname, '../images/' + req.file.filename))   
    req.getConnection((error, conn) => {
      if(error) return res.status(500).send('server error')
      conn.query('INSERT INTO imagenes set ?', [{ name:filename,data }], (error) => {
        if (error) return res.json(error)
        return res.json({ response: 'Se ah cargado correctamente' })
      })
    })
  },


}


module.exports = imagesControllers