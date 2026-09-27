"use client";

import Image from "@/components/cdn-image";
import { ChevronIcon, MoreIcon } from "@/components/icons";
import { products } from "@/lib/data";
import {
  initialOrders,
  statusFilters,
  type ManagementRow,
} from "@/components/admin/admin-data";
import styles from "@/app/admin/admin.module.css";

export function AdminOverview({
  range,
  query,
  orders,
  filter,
  onFilterChange,
  onNavigate,
  onOpenModal,
  onSelectRow,
}: {
  range: string;
  query: string;
  orders: typeof initialOrders;
  filter: (typeof statusFilters)[number];
  onFilterChange: (value: (typeof statusFilters)[number]) => void;
  onNavigate: (section: string) => void;
  onOpenModal: (title: string) => void;
  onSelectRow: (row: ManagementRow) => void;
}) {
  const filteredOrders = orders;
  const setFilter = onFilterChange;
  const navigate = onNavigate;
  const setModal = onOpenModal;
  const setSelectedRow = onSelectRow;
  return (
    <>
      <section
        className={styles.metrics}
        aria-label="Key performance indicators"
      >
        <article>
          <div>
            <span>NET REVENUE</span>
            <b>↗ 18.4%</b>
          </div>
          <strong>
            1.84M <small>EGP</small>
          </strong>
          <p>vs 1.55M last period</p>
          <i className={styles.sparkOne} />
        </article>
        <article>
          <div>
            <span>ORDERS</span>
            <b>↗ 12.7%</b>
          </div>
          <strong>2,849</strong>
          <p>646 EGP avg. order value</p>
          <i className={styles.sparkTwo} />
        </article>
        <article>
          <div>
            <span>CONVERSION</span>
            <b>↗ 0.6%</b>
          </div>
          <strong>4.82%</strong>
          <p>59.1K store sessions</p>
          <i className={styles.sparkThree} />
        </article>
        <article>
          <div>
            <span>RETURN RATE</span>
            <b className={styles.good}>↓ 1.1%</b>
          </div>
          <strong>3.2%</strong>
          <p>Better than 5% target</p>
          <i className={styles.sparkFour} />
        </article>
      </section>

      <section className={styles.mainGrid}>
        <article className={styles.revenueCard}>
          <div className={styles.cardHeading}>
            <div>
              <span>REVENUE PERFORMANCE</span>
              <h2>Sales momentum</h2>
            </div>
            <div className={styles.legend}>
              <span>
                <i />
                This period
              </span>
              <span>
                <i />
                Previous
              </span>
            </div>
            <button
              onClick={() => setModal("Revenue report")}
              aria-label="Open revenue report"
            >
              <MoreIcon size={16} />
            </button>
          </div>
          <div className={styles.chartSummary}>
            <strong>1,842,650 EGP</strong>
            <span>+285,400 EGP over previous {range}</span>
          </div>
          <div className={styles.chart} aria-label="Revenue trend chart">
            <div className={styles.gridLines}>
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className={styles.areaPrevious} />
            <div className={styles.areaCurrent} />
            <div className={styles.chartPoint}>
              <b>92.4K</b>
              <i />
            </div>
          </div>
          <div className={styles.axis}>
            <span>24 Jul</span>
            <span>30 Jul</span>
            <span>5 Aug</span>
            <span>11 Aug</span>
            <span>17 Aug</span>
            <span>22 Aug</span>
          </div>
        </article>

        <aside className={styles.intelligenceCard}>
          <div className={styles.intelTitle}>
            <span>Q</span>
            <div>
              <small>QOTUN INTELLIGENCE</small>
              <h2>Three things worth knowing</h2>
            </div>
          </div>
          <div className={styles.insight}>
            <b>01</b>
            <div>
              <strong>King-size linen is accelerating</strong>
              <p>
                Demand is up 34% in New Cairo. At the current pace, Natural /
                King will sell out in 9 days.
              </p>
              <button onClick={() => navigate("Inventory")}>
                Review forecast <ChevronIcon size={12} />
              </button>
            </div>
          </div>
          <div className={styles.insight}>
            <b>02</b>
            <div>
              <strong>WhatsApp is your best closer</strong>
              <p>
                Assisted shoppers convert 2.8× better and spend 19% more than
                self-serve visitors.
              </p>
              <button onClick={() => navigate("Customers")}>
                See customer journey <ChevronIcon size={12} />
              </button>
            </div>
          </div>
          <div className={styles.insight}>
            <b>03</b>
            <div>
              <strong>Bundle opportunity: 186K EGP</strong>
              <p>
                412 recent sheet buyers have a high likelihood of adding a duvet
                within 14 days.
              </p>
              <button onClick={() => navigate("Marketing")}>
                Open audience <ChevronIcon size={12} />
              </button>
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.operationsGrid}>
        <article className={styles.ordersCard}>
          <div className={styles.cardHeading}>
            <div>
              <span>LIVE OPERATIONS</span>
              <h2>Orders needing attention</h2>
            </div>
            <button onClick={() => navigate("Orders")}>
              View all <ChevronIcon size={12} />
            </button>
          </div>
          <div className={styles.filters}>
            {statusFilters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={filter === item ? styles.activeFilter : ""}
              >
                {item}
                {item === "All" ? (
                  <em>12</em>
                ) : item === "Ready" ? (
                  <em>6</em>
                ) : item === "Review" ? (
                  <em>2</em>
                ) : item === "Delayed" ? (
                  <em>1</em>
                ) : null}
              </button>
            ))}
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>ORDER</span>
              <span>CUSTOMER</span>
              <span>PRODUCT</span>
              <span>TOTAL</span>
              <span>STATUS</span>
            </div>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <button
                  className={styles.tableRow}
                  key={order.id}
                  onClick={() =>
                    setSelectedRow({
                      name: order.id,
                      detail: `${order.customer} · ${order.city}`,
                      value: order.total,
                      status: order.status,
                    })
                  }
                >
                  <span>
                    <strong>{order.id}</strong>
                    <small>{order.time}</small>
                  </span>
                  <span className={styles.customer}>
                    <i>{order.initials}</i>
                    <b>
                      <strong>{order.customer}</strong>
                      <small>{order.city}</small>
                    </b>
                  </span>
                  <span>{order.item}</span>
                  <span>
                    <strong>{order.total}</strong>
                  </span>
                  <span>
                    <em
                      className={
                        styles[`status${order.status.replace(" ", "")}`]
                      }
                    >
                      {order.status}
                    </em>
                    <ChevronIcon size={14} />
                  </span>
                </button>
              ))
            ) : (
              <div className={styles.empty}>No orders match “{query}”.</div>
            )}
          </div>
        </article>

        <aside className={styles.inventoryCard}>
          <div className={styles.cardHeading}>
            <div>
              <span>SMART INVENTORY</span>
              <h2>Stock pressure</h2>
            </div>
            <button onClick={() => navigate("Inventory")}>Manage</button>
          </div>
          {products.slice(3, 6).map((product, index) => (
            <button
              className={styles.stockItem}
              key={product.slug}
              onClick={() =>
                setSelectedRow({
                  name: product.name,
                  detail: "Stock forecast",
                  value: `${[18, 34, 49][index]} units`,
                  status: "Reorder",
                })
              }
            >
              <Image src={product.image} alt="" width={52} height={52} />
              <span>
                <strong>{product.name}</strong>
                <small>
                  {index === 0
                    ? "Natural · King"
                    : index === 1
                      ? "White · Queen"
                      : "Natural · 180×200"}
                </small>
                <i>
                  <b style={{ width: `${[18, 34, 49][index]}%` }} />
                </i>
              </span>
              <em>
                <strong>{[9, 14, 22][index]}</strong>
                <small>days left</small>
              </em>
            </button>
          ))}
          <div className={styles.purchaseOrder}>
            <span>Suggested purchase order</span>
            <strong>342 units · 218K EGP</strong>
            <button onClick={() => setModal("Create purchase order")}>
              Create draft PO
            </button>
          </div>
        </aside>
      </section>

      <section className={styles.bottomStrip}>
        <button
          className={styles.metricButton}
          onClick={() => navigate("Returns & CX")}
        >
          <span className={styles.score}>92</span>
          <p>
            <small>CUSTOMER PULSE</small>
            <strong>Exceptional</strong>
            <span>+4 points this month</span>
          </p>
        </button>
        <button
          className={styles.metricButton}
          onClick={() => navigate("Fulfillment")}
        >
          <span>
            <small>FULFILLMENT SLA</small>
            <strong>96.8%</strong>
            <em>43 min faster than target</em>
          </span>
        </button>
        <button
          className={styles.metricButton}
          onClick={() => navigate("Customers")}
        >
          <span>
            <small>REPEAT PURCHASE</small>
            <strong>31.4%</strong>
            <em>Top 12% of home brands</em>
          </span>
        </button>
        <button onClick={() => setModal("Weekly executive brief")}>
          <span>WEEKLY EXECUTIVE BRIEF</span>
          <strong>Ready to review →</strong>
        </button>
      </section>
    </>
  );
}
