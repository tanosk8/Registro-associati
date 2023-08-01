import { Router, Response, Request } from "express";
import User from '../model/User';
const router = Router();

enum Pages {
  registro = 'Registro',
  aggiungi_utente = 'Aggiungi utente',
  info = 'informazioni',
}

interface required_data {
  title_page: string;
}

router.get('/', async (req: Request, res: Response) => {
    try {
      const data: required_data = { title_page: Pages.registro };
      const users = await User.find({});
      res.render('pages/registro', { data, users } );
    } catch (error) {
      console.log(error);
    }
});

router.get('/aggiungi_utente', async (req: Request, res: Response) => {
  const data: required_data = { title_page: Pages.aggiungi_utente };
  res.render('pages/aggiungi_utente',{ data });
});

router.get('/info', async (req: Request, res: Response) => {
  const data: required_data = { title_page: Pages.info };
  res.render('pages/info',{ data });
});


router.post('/aggiungi_utente', async (req: Request, res: Response) => {
  try {
    const user = req.body;
    User.create(user);
    const data: required_data = { title_page: Pages.registro };
    res.json(user);
  } catch (err) {
    console.log(err)
  }
});

export default router;