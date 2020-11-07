const express = require("express")
const app = express()
const aws = require("aws-sdk")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json({extended:false}))
app.set("view engine","ejs")
app.set("views","./views")
const region = "ap-southeast-1";
const accessKeyId = "";
const secretAccessKey = "";
app.listen(5000,(err)=>{
    if(err)
        console.log("Loi: ",err);
    else 
        console.log("server running port 5000");
});
const dynamoDB = new aws.DynamoDB.DocumentClient({
    region:region,
    accessKeyId:accessKeyId,
    secretAccessKey:secretAccessKey
});
//get danh sach san pham
app.get("/",(req,res)=>{
    const paramsDanhSachSanPham= {
        TableName: "SanPham",
    };
    dynamoDB.scan(paramsDanhSachSanPham,(error,data)=>{
        if(error)
            console.log(JSON.stringify(error,null,2));
        else
            res.render("index",{
                sanPham :data.Items
            });
    });
});
// delete sanpham
app.post("/deleteSanPham",(req,res)=>{
    const maSP = req.body.maSP;
    const paramsDeleteSanPham = {
        TableName : "SanPham",
        Key :{
            "maSP":maSP,
        },
    };
    dynamoDB.delete(paramsDeleteSanPham,(error,data)=>{
        if(error){
            console.log("Loi",error);
            res.json({msg:error});
        }
        else{
            res.redirect("/");
        }
    });
});

// api deleteSanPham
app.post("/api/deleteSanPhamAPI",(req,res)=>{
    const maSP = req.body.maSP;
    const paramsDeleteSanPham = {
        TableName : "SanPham",
        Key :{
            "maSP":maSP,
        },
    };
    dynamoDB.delete(paramsDeleteSanPham,(error,data)=>{
        if(error){
            console.log("Loi",error);
            res.json({msg:error});
        }
        else{
            res.json({msg:"Xóa thành công"});
        }
    });
});