export default function cookieParser (req, res, next) {
    const cookie = req.headers.cookie;
    
    if(cookie) {
        const cookiesArray = cookie.replace(/\s/g, '').split(';');

        req.parsedCookies = cookiesArray.reduce((prev, curr) => {
            let [key, value] = curr.split('=');
            prev[key] = value;
            return prev;
        }, {});
    } else {
        req.parsedCookies = {};
    }
  
    next();
}