// General imports
import sha from 'crypto-js/sha1.js'

export default function App() {
    if (!process.env.PORT || !process.env.DB_NAME || !process.env.DB_USER || 
        !process.env.DB_PASS || !process.env.DB_HOST || !process.env.JWT_ACC_SIG || !process.env.JWT_REF_SIG || !process.env.SITE_HOST) {
    
        console.warn(
        "\n\x1b[31m[error](.env)\n\x1b[0m missing {" + 
        `${!process.env.PORT && `\n  PORT         :  (auto-generated)  =  ${parseInt(Math.random()*10**4)}` || ""}` +
        `${!process.env.DB_NAME && `\n  DB_NAME      :  (auto-generated)  =  ${sha((Math.random()*13**18).toString())}` || ""}` +
        `${!process.env.DB_USER && `\n  DB_USER      :  (auto-generated)  =  ${sha((Math.random()*13**19).toString())}` || ""}` +
        `${!process.env.DB_PASS && `\n  DB_PASS      :  (auto-generated)  =  ${sha((Math.random()*2**13).toString())}` || ""}` +
        `${!process.env.JWT_ACC_SIG && `\n  JWT_ACC_SIG  :  (auto-generated)  =  ${sha((Math.random()*15**10).toString())}` || ""}` + 
        `${!process.env.JWT_REF_SIG && `\n  JWT_REF_SIG  :  (auto-generated)  =  ${sha((Math.random()*13**8).toString())}` || ""}` +
        `${!process.env.DB_HOST && `\n  DB_HOST      :  (example)         =  ./database/data/database.sqlite3` || ""}` +
        `${!process.env.SITE_HOST && `\n  SITE_HOST    :  (example)         =  'http://localhost:3000/'` || ""}` + "\n }\n"
        );
        process.exit(1);
    }
}