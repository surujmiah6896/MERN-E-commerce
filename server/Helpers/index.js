const helper = {};

helper.sendWithError = (res, code, status, message) =>{
    const resp = res.status(code).json({
      status,
      message
    });
    return resp;
}

module.exports = helper;