import express, {NextFunction, Response, Request} from 'express';
import {upload} from './lib/upload';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json({
    limit: '10mb',
}));

app.post('/_/upload', async (req, res, next) => {
    try {
        const result = await upload(req);

        res.json({
            status: 'ok',
            url: result,
        });
    } catch (e) {
        next(e);
    }
});

app.get('/_/ping', (_req, res) => {
    res.send('ok');
})

app.use((_req, res) => {
    res.sendStatus(404);
});

app.use((
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    console.error(err.message);

    res.status(500).json({
        status: 'error',
        message: err.message,
    });
});

app.listen(port);
