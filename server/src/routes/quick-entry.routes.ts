import { Router } from "express";
import { z } from "zod";
import { usernameService } from "../services/username.service.js";

const router = Router();

const payloadSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(18, "Username can be at most 18 characters long.")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed."),
});

router.post("/username/check", (req, res) => {
  const parseResult = payloadSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      available: false,
      suggestions: [],
      message: parseResult.error.issues[0]?.message ?? "Invalid payload.",
    });
  }

  const { username } = parseResult.data;
  const normalized = usernameService.normalizeUsername(username);
  const available = usernameService.isUsernameAvailable(normalized);

  if (available) {
    return res.json({
      available: true,
      suggestions: [],
      message: "Username is available",
    });
  }

  const suggestions = usernameService.generateSuggestions(normalized, 5);

  return res.json({
    available: false,
    suggestions,
    message: "That username is taken. Try one of these suggestions.",
  });
});

export { router as quickEntryRouter };
