import { Router } from 'express';

const router = Router();
const PASSPHRASE = 'admin';

router.post('/login', (req,res) =>{
    const { passphrase} = req.body || {};
    if(passphrase === PASSPHRASE) {
        req.session.isAdmin = true;
        return res.json({ ok: true});
    }
    return res.status(401).json({ error: 'Invalid passphrase'});
});

router.post('/logout', (req,res) =>{
    req.session.destroy(() => res.json ({ok:true}));
});

router.get('/me', (req,res)=>{
    res.json({isAdmin: !!(req.session && req.session.isAdmin)});
});

export default router;