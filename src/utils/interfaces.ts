import { Usuario } from "@confixcell/modelos";
import { Request, Response } from "express";

export interface SessionData
{
    req: Request,
    res: Response,
    usuario: Usuario
}