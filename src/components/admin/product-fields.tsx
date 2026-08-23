"use client";

import { type ChangeEvent, useEffect, useState } from "react";
import { PlusIcon } from "@/components/icons";
import styles from "@/app/admin/admin.module.css";

export function ProductFields() {
  const [previews, setPreviews] = useState<string[]>([]);
  useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews],
  );
  function handleFiles(event: ChangeEvent<HTMLInputElement>) {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setPreviews(
      Array.from(event.target.files ?? [])
        .slice(0, 6)
        .map((file) => URL.createObjectURL(file)),
    );
  }
  return (
    <>
      <label className={styles.uploadZone}>
        Product imagery
        <input
          required
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          onChange={handleFiles}
        />
        <span>
          <PlusIcon size={20} />
          <strong>Upload product images</strong>
          <small>
            JPG, PNG or WebP · Up to 6 images · First image is the cover
          </small>
        </span>
      </label>
      {previews.length > 0 && (
        <div className={styles.uploadPreviews}>
          {previews.map((url, index) => (
            <i key={url} style={{ backgroundImage: `url(${url})` }}>
              <small>{index === 0 ? "Cover" : index + 1}</small>
            </i>
          ))}
        </div>
      )}
      <div className={styles.formGrid}>
        <label>
          Product name
          <input required autoFocus placeholder="e.g. Luxe Percale Sheet Set" />
        </label>
        <label>
          Handle
          <input placeholder="luxe-percale-sheet-set" />
        </label>
      </div>
      <div className={styles.formGrid}>
        <label>
          Category
          <select required>
            <option>Bedding</option>
            <option>Bath</option>
            <option>Bundles</option>
          </select>
        </label>
        <label>
          Subcategory
          <select required>
            <option>Bed Sheets</option>
            <option>Duvet Covers</option>
            <option>Duvets & Pillows</option>
            <option>Towels</option>
            <option>Robes</option>
            <option>Sleep Bundles</option>
          </select>
        </label>
      </div>
      <label>
        Editorial eyebrow
        <input required placeholder="e.g. 500 thread count" />
      </label>
      <label>
        Product description
        <textarea
          required
          rows={5}
          placeholder="Describe the cotton, feel, construction, and customer benefit in Qotun’s tone."
        />
      </label>
      <div className={styles.formGrid}>
        <label>
          Price (EGP)
          <input required type="number" min="0" placeholder="3450" />
        </label>
        <label>
          Compare-at price
          <input type="number" min="0" placeholder="Optional" />
        </label>
      </div>
      <div className={styles.formGrid}>
        <label>
          Sizes
          <input placeholder="100×200, 120×200, 160×200" />
        </label>
        <label>
          Badge
          <input placeholder="e.g. 15% off or New" />
        </label>
      </div>
      <div className={styles.formGrid}>
        <label>
          Initial inventory
          <input type="number" min="0" placeholder="0" />
        </label>
        <label>
          Publishing
          <select>
            <option>Save as draft</option>
            <option>Publish to online store</option>
            <option>Schedule publication</option>
          </select>
        </label>
      </div>
    </>
  );
}
