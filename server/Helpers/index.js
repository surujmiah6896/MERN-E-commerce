const helper = {};

helper.sendWithResponse = (res, code = 500, status = false, message) => {
  const resp = res.status(code).json({
    status,
    message,
  });
  return resp;
};



helper.sendWithData = (res, code = 200, status = true, data=null, message) =>{
  const resp = res.status(code).json({
    status,
    data,
    message,
  });
  return resp;
};

module.exports = helper;