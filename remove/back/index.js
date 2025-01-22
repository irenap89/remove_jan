import express from 'express'
import cors from 'cors'
import fileupload from 'express-fileupload'
import fs from "node:fs";


const app = express()

app.use(cors())
app.use(fileupload());

app.use(express.static("img_upload"));
app.use(express.static("no_bg_upload"));


app.get('/test', function (req, res) {
  res.send('Hello World gfhfghj dfgj')
})


app.post('/upload_img', function (req, res) {

  let file=req.files.img_data;

  if (file.mimetype=='image/png' || file.mimetype=='image/jpeg' || file.mimetype=='image/jpg') {

    if(file.size<=1000000){
      let date_time= new Date();
    
      let file_name = date_time.getTime() +'_'+file.name;

      file.mv('img_upload/' + file_name ,  async function(err) {
          if(err){
            console.log(err);
          }else{
            let color = req.body.color;
            const inputPath = 'img_upload/' + file_name;
            const fileBlob = await fs.openAsBlob(inputPath)
            const rbgResultData = await removeBg(fileBlob, color);
            fs.writeFileSync("no_bg_upload/no_bg_" + file_name, Buffer.from(rbgResultData));
            res.send({status:200,msg:'file uploaded', file_name: file_name});
          }
      });


    } else {
      res.send({status:501,msg:'file too big'})
    }

  } else {
    res.send({status:501,msg:'file type not supported'})
  }

 

 
})





async function removeBg(blob, color) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_file", blob);
  formData.append("bg_color", color);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": "LajjUXV3oiHeB8CbDvttZTcv" },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}





app.listen(5000)