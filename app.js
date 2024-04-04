
import express from 'express'
import routes from './routes.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(routes)

app.listen(3045,()=>{ console.log('ta no ar!') })

