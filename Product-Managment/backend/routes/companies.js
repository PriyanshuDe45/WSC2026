import { Router } from 'express';
import Company from '../models/Company.js';
import Product from '../models/Product.js';
import { requireAdmin } from '../middlewares/auth.js';

const router = Router();
router.use(requireAdmin);


router.get('/', async(req,res)=>{
    const showDeactivated = req.query.deactivated === 'true';
    const companies = await Company.find({deactivated: showDeactivated }).sort({companyName: 1})
    res.json(companies);
})

router.get('/:id', async (req,res) =>{
    try{
        const company = await Company.findById(req.params.id);
        if(!company) return res.status(404).json({error : 'Not found'});
        const products = await Product.find({company: company._id});
        res.json({ company, products});
    } catch{
        res.status(400).json({error: 'Not found'});
    }
});

router.post('/', async (req,res)=>{
    try{
        const company = await Company.create(req.body);
        res.status(201).json(company);
    }catch(err){
        res.status(400).json({error: err.message});    
    }
});

router.put('/:id', async (req,res)=>{
    try{
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        });
        if(!company) return res.status(404).json({error : 'Not found'});
        res.json(company);
    } catch(err){
        res.status(400).json({error: err.message});
    }
});

router.post('/:id/deactivate', async(req,res)=>{
    const company = await Company.findByIdAndUpdate(
        req.params.id,
        {deactivated: true},
        { new: true}
    );
    if(!company) return res.status(404).json({error: 'Not found'});
    await Product.updateMany({ company : company._id}, {hidden: true});
    res.json(company);
});

router.post('/:id/activate', async(req,res)=>{
    const company = await Company.findByIdAndUpdate(
        req.params.id,
        { deactivated: false },
        { new : true }
    );
    if(!company) return res.status(404).json({error: 'Not found'});
    res.json(company);
});

export default router;
