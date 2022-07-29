/* eslint-disable import/first */

import { config } from "dotenv";
config({ path: __dirname + "/.env" });

import express from "express";
import { api } from "./api";
import "./calendar";

const app = express();
app.use(api);

app.listen(process.env.API_PORT || 3002, () => console.log("Server started"));
