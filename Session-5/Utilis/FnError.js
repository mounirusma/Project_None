const Err = (msg , status , statusText)=>{
    const err = new Error();
    err.message = msg;
    err.status = status;
    err.statusText = statusText;

    return err
}

module.exports=Err;
