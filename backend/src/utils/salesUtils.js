const typeToCode = {
  REQUIRED: 400,
  INSERT_WRONG: 422,
  PRODUCT_NOTFOUND: 404,
};
  
const getCodeByType = (type) => typeToCode[type]; 
  
module.exports = {
  getCodeByType,
};  