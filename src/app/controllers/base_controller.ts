// src/shared/controllers/base.controller.ts
import { Request, Response } from "express";

export abstract class BaseController {
  protected req: Request;
  protected res: Response;

  constructor(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  static handle<T extends typeof BaseController>(
    this: T,
    method: keyof InstanceType<T>
  ) {
    return (req: Request, res: Response) => {
      if (this === BaseController) {
        throw new Error("Cannot instantiate BaseController directly. Use a subclass.");
      }
      const controller = new (this as any)(req, res) as InstanceType<T>;
      return (controller[method] as Function).call(controller);
    };
  }

  protected ok(data: any, message = "Success") {
    return this.res.status(200).json({ status: "success", message, data });
  }

  protected created(data: any, message = "Created") {
    return this.res.status(201).json({ status: "success", message, data });
  }

  protected badRequest(message = "Bad request") {
    return this.res.status(400).json({ status: "error", message });
  }

  protected notFound(message = "Not found") {
    return this.res.status(404).json({ status: "error", message });
  }

  protected serverError(message = "Internal server error") {
    return this.res.status(500).json({ status: "error", message });
  }
}
