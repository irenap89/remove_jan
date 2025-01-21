import express from 'express'
import cors from 'cors'
import fileupload from 'express-fileupload'

const app = express()

app.use(cors())
app.use(fileupload());


app.get('/test', function (req, res) {
  res.send('Hello World gfhfghj dfgj')
})


app.post('/upload_img', function (req, res) {

  // console.log(req.body);
 //console.log(req.files);

 //console.log(req.files.img_data.mimetype)
  if (req.files.img_data.mimetype=='image/png' || req.files.img_data.mimetype=='image/jpeg' || req.files.img_data.mimetype=='image/jpg') {

    if(req.files.img_data.size<=1000000){
      //TODO: save file
      // mv funftion



    } else {
      res.send({status:501,msg:'file too big'})
    }

  } else {
    res.send({status:501,msg:'file type not supported'})
  }

 

 
})




app.listen(5000)