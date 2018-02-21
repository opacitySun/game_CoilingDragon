var fs = require("fs"); 

/**  
 * 删除图片  
 * @returns {Function}  
 */  
exports.removeImgAction = function(req, res) { 
    var result = {};
    var file = req.body.path;
    file = file.replace(/\/\//g,"/");
    try{
        if(file){
            fs.unlinkSync('./public'+file);
            result['state'] = 'success';
            result['message'] = '删除完成';
        }else{
            result['state'] = 'error';
            result['message'] = '删除失败，未找到'+file;
        }
    }catch(err){
        result['state'] = 'error';
        result['message'] = '删除失败：'+err;
    }
    res.json(result);
} 