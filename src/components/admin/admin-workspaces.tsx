"use client";

import { ChevronIcon, DownloadIcon, PlusIcon } from "@/components/icons";
import {
  initialOrders,
  managementData,
  statusFilters,
  type ManagementRow,
} from "@/components/admin/admin-data";
import styles from "@/app/admin/admin.module.css";

function downloadCsv(name: string, rows: ManagementRow[]) {
  const csv = [
    ["Name", "Detail", "Value", "Status"],
    ...rows.map((row) => [row.name, row.detail, row.value, row.status]),
  ]
    .map((row) =>
      row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `qotun-${name.toLowerCase().replaceAll(" ", "-")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function OrdersManagement({
  orders,
  filter,
  setFilter,
  setModal,
  setSelectedRow,
}: {
  orders: typeof initialOrders;
  filter: (typeof statusFilters)[number];
  setFilter: (value: (typeof statusFilters)[number]) => void;
  setModal: (value: string) => void;
  setSelectedRow: (value: ManagementRow) => void;
}) {
  const rows = orders.map((order) => ({
    name: order.id,
    detail: `${order.customer} · ${order.item}`,
    value: order.total,
    status: order.status,
  }));
  return (
    <>
      <section className={styles.sectionStats}>
        <article>
          <span>TODAY&apos;S ORDERS</span>
          <strong>84</strong>
          <small>+12.7% vs last Saturday</small>
        </article>
        <article>
          <span>NEEDS ATTENTION</span>
          <strong>12</strong>
          <small>2 payment reviews</small>
        </article>
        <article>
          <span>READY TO SHIP</span>
          <strong>43</strong>
          <small>Before 11:00 cutoff</small>
        </article>
      </section>
      <section className={styles.managementCard}>
        <div className={styles.managementHeader}>
          <div>
            <span>ORDER MANAGEMENT</span>
            <h2>All active orders</h2>
          </div>
          <div>
            <button onClick={() => downloadCsv("orders", rows)}>
              <DownloadIcon size={13} /> Export CSV
            </button>
            <button onClick={() => setModal("Create order")}>
              <PlusIcon size={13} /> Create order
            </button>
          </div>
        </div>
        <div className={styles.filters}>
          {statusFilters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={filter === item ? styles.activeFilter : ""}
            >
              {item}
              <em>
                {item === "All"
                  ? initialOrders.length
                  : initialOrders.filter((order) => order.status === item)
                      .length}
              </em>
            </button>
          ))}
        </div>
        <div className={styles.recordList}>
          <div className={styles.recordHead}>
            <span>ORDER</span>
            <span>CUSTOMER & PRODUCT</span>
            <span>TOTAL</span>
            <span>STATUS</span>
          </div>
          {rows.map((row) => (
            <button key={row.name} onClick={() => setSelectedRow(row)}>
              <span>
                <strong>{row.name}</strong>
              </span>
              <span>{row.detail}</span>
              <span>
                <strong>{row.value}</strong>
              </span>
              <span>
                <em>{row.status}</em>
                <ChevronIcon size={13} />
              </span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export function ManagementWorkspace({
  section,
  setModal,
  setSelectedRow,
  showNotice,
}: {
  section: string;
  setModal: (value: string) => void;
  setSelectedRow: (value: ManagementRow) => void;
  showNotice: (value: string) => void;
}) {
  const data = managementData[section];
  return (
    <>
      <section className={styles.sectionStats}>
        {data.metrics.map(([label, value, note]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>
      <section className={styles.managementGrid}>
        <article className={styles.managementCard}>
          <div className={styles.managementHeader}>
            <div>
              <span>{data.eyebrow}</span>
              <h2>{section} workspace</h2>
            </div>
            <div>
              <button
                onClick={() => {
                  downloadCsv(section, data.rows);
                  showNotice(`${section} export downloaded`);
                }}
              >
                <DownloadIcon size={13} /> Export CSV
              </button>
              <button onClick={() => setModal(data.primary)}>
                <PlusIcon size={13} />
                {data.primary}
              </button>
            </div>
          </div>
          <div className={styles.recordList}>
            <div className={styles.recordHead}>
              <span>NAME</span>
              <span>DETAIL</span>
              <span>VALUE</span>
              <span>STATUS</span>
            </div>
            {data.rows.map((row) => (
              <button key={row.name} onClick={() => setSelectedRow(row)}>
                <span>
                  <strong>{row.name}</strong>
                </span>
                <span>{row.detail}</span>
                <span>
                  <strong>{row.value}</strong>
                </span>
                <span>
                  <em>{row.status}</em>
                  <ChevronIcon size={13} />
                </span>
              </button>
            ))}
          </div>
        </article>
        <aside className={styles.activityCard}>
          <span>RECENT ACTIVITY</span>
          <h2>Team activity</h2>
          <div>
            <i>NS</i>
            <p>
              <strong>Nour approved a return</strong>
              <small>12 minutes ago</small>
            </p>
          </div>
          <div>
            <i>AK</i>
            <p>
              <strong>Ahmed published a product</strong>
              <small>38 minutes ago</small>
            </p>
          </div>
          <div>
            <i>HM</i>
            <p>
              <strong>Hassan reviewed the forecast</strong>
              <small>1 hour ago</small>
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
