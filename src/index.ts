    import express, { Request, Response } from 'express';
    import pool from './db';

    const app = express();
    const port = 3000;

    app.use(express.json());

    app.get('/', async (req: Request, res: Response) => {
  
      try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Connected to PostgreSQL!', timestamp: result.rows[0].now });
      } catch (error) {
        console.error('Error connecting to database:', error);
        res.status(500).json({ error: 'Database connection error' });
      }
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
