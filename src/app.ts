import express, { Application, Request, Response } from 'express';
// const express = require('express')
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app: Application = express();
app.use(express.json()); //parser
app.use(cors());

// app.get('/', (req: Request, res: Response) => {
//   const a = 10;
//   res.send(a);
// });

//application routes
app.use('/api/v1/students', StudentRoutes);

const getAController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};
app.get('/', getAController);

export default app;

// req client theke route e jabe-----> route calling controller function---->
// controller  (async, await, try--catch)--> service function(model await, find, update etc..),
// service--> model er upore query chalaye db theke data ene controller k dibe,
// controller res hisebe sei data client k dibe
//req->cli->rou->con->ser->mod->db->con->res->cli
