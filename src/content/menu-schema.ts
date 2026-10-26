import { z } from "zod";

export const tagSchema = z.enum(["V", "VG", "SG", "EPICE", "A_PARTAGER", "SIGNATURE"]);
export type MenuTag = z.infer<typeof tagSchema>;

const localized = z.object({ fr: z.string().min(1), en: z.string().min(1) });
const optionalLocalized = z.object({ fr: z.string(), en: z.string() });

export const menuItemSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.object({ fr: z.string().min(1), en: z.string().min(1) }),
  description: optionalLocalized,
  /** Euros. `null` = price to confirm (rendered as "Prix sur place"). */
  price: z.number().positive().nullable(),
  /** e.g. "par personne" — shown next to the price. */
  priceNote: localized.optional(),
  pieces: z.number().int().positive().optional(),
  tags: z.array(tagSchema),
  signature: z.boolean().optional(),
  photoIds: z.array(z.string()),
  priceConfirmed: z.boolean(),
  dineIn: z.boolean(),
});
export type MenuItem = z.infer<typeof menuItemSchema>;

export const menuCategorySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: localized,
  note: localized.optional(),
  items: z.array(menuItemSchema).min(1),
});
export type MenuCategory = z.infer<typeof menuCategorySchema>;

export const menuSchema = z
  .object({
    updatedAt: z.iso.date(),
    categories: z.array(menuCategorySchema).min(1),
  })
  .superRefine((menu, ctx) => {
    const ids = menu.categories.flatMap((c) => c.items.map((i) => i.id));
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    if (dupes.length) ctx.addIssue({ code: "custom", message: `Duplicate item ids: ${dupes.join(", ")}` });
    for (const item of menu.categories.flatMap((c) => c.items)) {
      if (item.signature && item.photoIds.length === 0) {
        ctx.addIssue({ code: "custom", message: `Signature "${item.id}" needs a mapped photo` });
      }
    }
  });
export type Menu = z.infer<typeof menuSchema>;
