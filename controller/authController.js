const jsforce= require('jsforce');
require('dotenv').config();

const { SF_LOGIN_URL , API_VERSION} = process.env;

if (!(SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}


const login=(req,res)=>{
    const {username,password,securityToken} = req.body
    const conn = new jsforce.Connection({
        loginUrl: SF_LOGIN_URL,
        version: API_VERSION
    });
    console.log('login');
    conn.login(username,password+securityToken, function(err, userInfo) {
        console.log(err)
        if (err) {
            res.status(401).json(err)
        }
        else{
            console.log(conn);
            const {accessToken, instanceUrl, } =conn;
            res.cookie('accessToken', accessToken,{ expires: new Date(Date.now() + 900000), httpOnly: true });
            res.cookie('instanceUrl', instanceUrl,{ expires: new Date(Date.now() + 900000), httpOnly: true });
            res.status(200).json({success:true,message:'Login successful.'})
        }
    });
}

const validateSession=(req,res)=>{
    if(req.cookies.accessToken && req.cookies.instanceUrl){
        res.status(200).json({success:true});
    }
    else{
        res.status(200).json({success:false});
    }
}

const logout=(req,res)=>{
    var conn = new jsforce.Connection({...req.cookies,version: API_VERSION});
    res.clearCookie("accessToken");
    res.clearCookie("instanceUrl");
    conn.logout(function(err) {
        if (err) {
            res.status(401).json(err)
        }
        else{
            res.status(200).json({success:true,message:'Logout successful.'})
        }
    });
}

const navigateToRecord=(req,res)=>{
    if(req.cookies.instanceUrl && req.cookies.accessToken && req.params.recordId){
        res.status(200).json({message:`${req.cookies.instanceUrl}/secur/frontdoor.jsp?sid=${req.cookies.accessToken}&retURL=/${req.params.recordId}`,success:true});
    }
    else{
        res.status(401).json({message:'Not Found', success:false});
    }
}

module.exports={login,logout,validateSession,navigateToRecord}


