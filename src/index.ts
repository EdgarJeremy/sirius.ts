import express from "express";

const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({
        message: 'run'
    });
});

app.listen(1234, () => {
    console.log('server running');
});