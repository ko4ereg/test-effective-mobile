import { Router } from "express";
import {
  authMiddleware,
  requireAdmin,
  requireAdminOrSelf,
} from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UpdateStatusDto } from "../dto/user.dto";
import { instanceToPlain } from "class-transformer";

const router = Router();

router.use(authMiddleware);

// GET /users/:id  — admin или сам пользователь
router.get("/:id", requireAdminOrSelf(), async (req, res, next) => {
  try {
    const user = await UserService.getById(req.params.id);
    res.json(instanceToPlain(user));
  } catch (err) {
    next(err);
  }
});

// GET /users — только admin
router.get("/", requireAdmin(), async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Math.min(Number(req.query.limit || 20), 100);
    const data = await UserService.getAll(page, limit);
    data.items = data.items.map((u) => instanceToPlain(u));
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// PATCH /users/:id/status — admin или сам пользователь
router.patch(
  "/:id/status",
  validationMiddleware(UpdateStatusDto),
  requireAdminOrSelf(),
  async (req, res, next) => {
    try {
      const updated = await UserService.updateStatus(
        req.params.id,
        req.body.isActive
      );
      res.json(instanceToPlain(updated));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
