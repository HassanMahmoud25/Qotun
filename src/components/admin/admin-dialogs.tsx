"use client";

import Image from "@/components/cdn-image";
import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ChevronIcon, CloseIcon } from "@/components/icons";
import type { ManagementRow } from "@/components/admin/admin-data";
import { formatPrice, products } from "@/lib/data";
import { ContextFields } from "@/components/admin/admin-form-fields";
import styles from "@/app/admin/admin.module.css";

export function ActionModal({
  title,
  close,
  select,
  submit,
}: {
  title: string;
  close: () => void;
  select: (value: string) => void;
  submit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const animation = {
    initial: { opacity: 0, scale: 0.965, y: "calc(-50% + 20px)", x: "-50%" },
    animate: { opacity: 1, scale: 1, y: "-50%", x: "-50%" },
    exit: { opacity: 0, scale: 0.98, y: "calc(-50% + 12px)", x: "-50%" },
    transition: {
      duration: 0.26,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };
  if (title === "Notifications")
    return (
      <motion.div
        {...animation}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.modalClose}
          onClick={close}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <span>ACTIVITY CENTER</span>
        <h2>Notifications</h2>
        <div className={styles.modalNotices}>
          <button>
            <i className={styles.alertDot} />
            <p>
              <strong>Two variants need reordering</strong>
              <small>Inventory · 6 minutes ago</small>
            </p>
          </button>
          <button>
            <i className={styles.warnDot} />
            <p>
              <strong>Payment review required</strong>
              <small>Order #QT-2848 · 24 minutes ago</small>
            </p>
          </button>
          <button>
            <i className={styles.infoDot} />
            <p>
              <strong>Alexandria SLA is at risk</strong>
              <small>Fulfillment · 31 minutes ago</small>
            </p>
          </button>
        </div>
        <button className={styles.primaryWide} onClick={close}>
          Mark all as read
        </button>
      </motion.div>
    );
  if (title === "Weekly executive brief")
    return (
      <motion.div
        {...animation}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.modalClose}
          onClick={close}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <span>WEEKLY EXECUTIVE BRIEF</span>
        <h2>Strong growth, one stock risk.</h2>
        <div className={styles.brief}>
          <div>
            <span>NET REVENUE</span>
            <strong>1.84M EGP</strong>
            <small>+18.4% vs previous period</small>
          </div>
          <div>
            <span>PRIMARY WIN</span>
            <strong>WhatsApp conversion</strong>
            <small>2.8× above self-serve</small>
          </div>
          <div>
            <span>WATCH CLOSELY</span>
            <strong>King inventory</strong>
            <small>9 days of cover</small>
          </div>
          <p>
            Qotun enters the new week with healthy momentum, exceptional
            customer sentiment, and fulfillment ahead of SLA.
          </p>
        </div>
        <button className={styles.primaryWide} onClick={() => window.print()}>
          Print / save as PDF
        </button>
      </motion.div>
    );
  if (title === "Create record")
    return (
      <motion.div
        {...animation}
        className={`${styles.modal} ${styles.modalWide}`}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.modalClose}
          onClick={close}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
        <span>QUICK CREATE</span>
        <h2>What would you like to create?</h2>
        <div className={styles.createLauncher}>
          {[
            [
              "Add product",
              "Catalog",
              "Images, variants, pricing and publishing",
            ],
            [
              "Create order",
              "Commerce",
              "Customer, products, payment and delivery",
            ],
            [
              "Create purchase order",
              "Inventory",
              "Supplier, quantities and expected arrival",
            ],
            [
              "Create campaign",
              "Marketing",
              "Audience, channel, creative and schedule",
            ],
            [
              "New case",
              "Customer care",
              "Issue, priority, channel and resolution",
            ],
            [
              "Build automation",
              "Operations",
              "Trigger, conditions and actions",
            ],
          ].map(([name, group, note]) => (
            <button key={name} onClick={() => select(name)}>
              <small>{group}</small>
              <strong>{name}</strong>
              <span>{note}</span>
              <ChevronIcon size={14} />
            </button>
          ))}
        </div>
      </motion.div>
    );
  const productModal = title.toLowerCase().includes("product");
  return (
    <motion.div
      {...animation}
      className={`${styles.modal} ${productModal ? styles.modalProduct : styles.modalWide}`}
      role="dialog"
      aria-modal="true"
    >
      <button className={styles.modalClose} onClick={close} aria-label="Close">
        <CloseIcon />
      </button>
      <span>{modalEyebrow(title)}</span>
      <h2>{title}</h2>
      <form onSubmit={submit}>
        <ContextFields title={title} />
        <div className={styles.modalActions}>
          <button type="button" onClick={close}>
            Cancel
          </button>
          <button type="submit">
            {productModal ? "Save product" : "Save"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

function modalEyebrow(title: string) {
  const value = title.toLowerCase();
  if (value.includes("product")) return "PRODUCT STUDIO";
  if (value.includes("order"))
    return value.includes("purchase") ? "PROCUREMENT" : "ORDER DESK";
  if (value.includes("campaign") || value.includes("segment"))
    return "GROWTH STUDIO";
  if (value.includes("case")) return "CUSTOMER CARE";
  if (value.includes("automation")) return "OPERATIONS ENGINE";
  if (value.includes("report")) return "DECISION CENTER";
  return "QOTUN COMMAND CENTER";
}

export function DetailDrawer({
  row,
  close,
  save,
}: {
  row: ManagementRow;
  close: () => void;
  save: () => void;
}) {
  const [status, setStatus] = useState(row.status);
  const product = products.find((item) => item.name === row.name);
  return (
    <motion.aside
      className={styles.drawer}
      initial={{ x: "100%", opacity: 0.65 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0.45 }}
      transition={{ type: "spring", stiffness: 330, damping: 35, mass: 0.9 }}
    >
      <button className={styles.modalClose} onClick={close} aria-label="Close">
        <CloseIcon />
      </button>
      <span>{product ? "PRODUCT DETAILS" : "RECORD DETAILS"}</span>
      {product && (
        <div className={styles.productDetailImage}>
          <Image src={product.image} alt={product.name} fill sizes="420px" />
        </div>
      )}
      <h2>{row.name}</h2>
      <p>{product?.description ?? row.detail}</p>
      <dl>
        {product ? (
          <>
            <div>
              <dt>Category</dt>
              <dd>
                {product.category} · {product.subcategory}
              </dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{formatPrice(product.price)}</dd>
            </div>
            <div>
              <dt>Sizes</dt>
              <dd>{product.sizes?.join(", ") ?? "One size"}</dd>
            </div>
            <div>
              <dt>Gallery</dt>
              <dd>{product.gallery.length} images</dd>
            </div>
          </>
        ) : (
          <>
            <div>
              <dt>Current value</dt>
              <dd>{row.value}</dd>
            </div>
            <div>
              <dt>Last updated</dt>
              <dd>Just now</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>Operations team</dd>
            </div>
          </>
        )}
        <div>
          <dt>Status</dt>
          <dd>{status}</dd>
        </div>
      </dl>
      <label>
        Update status
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>{row.status}</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Review</option>
          <option>Paused</option>
          <option>Complete</option>
        </select>
      </label>
      <button className={styles.primaryWide} onClick={save}>
        {product ? "Save product changes" : "Save changes"}
      </button>
    </motion.aside>
  );
}
