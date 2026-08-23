"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  BagIcon,
  BellIcon,
  CloseIcon,
  HomeIcon,
  LiveIcon,
  MenuIcon,
  MoreIcon,
  PlusIcon,
  SearchIcon,
  ShopIcon,
  ViewIcon,
} from "@/components/icons";
import styles from "@/app/admin/admin.module.css";
import {
  initialOrders,
  managementData,
  nav,
  sectionRoutes,
  statusFilters,
  type ManagementRow,
} from "@/components/admin/admin-data";
import {
  ManagementWorkspace,
  OrdersManagement,
} from "@/components/admin/admin-workspaces";
import { ActionModal, DetailDrawer } from "@/components/admin/admin-dialogs";
import { AdminOverview } from "@/components/admin/admin-overview";

export function AdminDashboard({
  initialSection = "Overview",
}: {
  initialSection?: string;
}) {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState(initialSection);
  const [filter, setFilter] = useState<(typeof statusFilters)[number]>("All");
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("30 days");
  const [notice, setNotice] = useState("");
  const [live, setLive] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<ManagementRow | null>(null);

  const filteredOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return initialOrders.filter((order) => {
      const matchesFilter = filter === "All" || order.status === filter;
      const matchesQuery =
        !normalized ||
        Object.values(order).some((value) =>
          value.toLowerCase().includes(normalized),
        );
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  function navigate(section: string) {
    setActiveNav(section);
    setMobileMenu(false);
    router.push(sectionRoutes[section]);
  }

  function submitAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showNotice(`${modal} saved successfully`);
    setModal(null);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className={styles.adminShell}>
        {mobileMenu && (
          <button
            className={styles.mobileBackdrop}
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          />
        )}
        <aside
          className={`${styles.sidebar} ${mobileMenu ? styles.sidebarOpen : ""}`}
        >
          <button
            className={styles.sidebarClose}
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <CloseIcon size={18} />
          </button>
          <Link href="/" className={styles.brand} aria-label="Qotun storefront">
            <span>Q</span>
            <div>
              <strong>QOTUN</strong>
              <small>COMMAND CENTER</small>
            </div>
          </Link>

          <nav className={styles.primaryNav} aria-label="Admin navigation">
            <p>Workspace</p>
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.label)}
                  className={activeNav === item.label ? styles.activeNav : ""}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  {item.count && <em>{item.count}</em>}
                </button>
              );
            })}
            <p>Operations</p>
            {[
              ["Fulfillment", "01"],
              ["Returns & CX", "02"],
              ["Automation", "03"],
              ["Reports", "04"],
            ].map(([label, number]) => (
              <button
                key={label}
                onClick={() => navigate(label)}
                className={activeNav === label ? styles.activeNav : ""}
              >
                <b>{number}</b>
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className={styles.sidebarBottom}>
            <button
              className={styles.profile}
              onClick={() => setModal("Account settings")}
            >
              <i className={styles.profileAvatar}>HM</i>
              <span>
                <strong>Hassan Mahmoud</strong>
                <small>Super admin</small>
              </span>
              <MoreIcon size={16} />
            </button>
          </div>
        </aside>

        <section className={styles.workspace}>
          <header className={styles.topbar}>
            <button
              className={styles.mobileNavButton}
              onClick={() => setMobileMenu(true)}
              aria-label="Open navigation"
              aria-expanded={mobileMenu}
            >
              <MenuIcon size={19} />
              <span>Menu</span>
            </button>
            <div className={styles.searchBox}>
              <SearchIcon size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search orders, customers, products…"
                aria-label="Search dashboard"
              />
              <kbd>⌘ K</kbd>
            </div>
            <div className={styles.topActions}>
              <Link href="/" target="_blank">
                <ViewIcon size={17} /> View store
              </Link>
              <button
                onClick={() => setModal("Notifications")}
                className={styles.bell}
                aria-label="Notifications"
              >
                <BellIcon size={17} />
                <span>3</span>
              </button>
              <button
                onClick={() => setModal("Create record")}
                className={styles.createButton}
              >
                <PlusIcon size={16} /> Create
              </button>
            </div>
          </header>

          <div className={styles.content}>
            <div className={styles.pageIntro}>
              <div>
                <p>Saturday, 22 August</p>
                <h1>
                  {activeNav === "Overview"
                    ? "Good morning, Hassan."
                    : activeNav}
                </h1>
                <span>
                  {activeNav === "Overview"
                    ? "Here’s what needs your attention across Qotun today."
                    : activeNav === "Orders"
                      ? "Review, update, and fulfill every active order."
                      : managementData[activeNav]?.description}
                </span>
              </div>
              <div className={styles.dateControls}>
                <button
                  onClick={() => {
                    setLive(!live);
                    showNotice(
                      live ? "Live updates paused" : "Live updates resumed",
                    );
                  }}
                  className={live ? styles.liveActive : ""}
                >
                  <LiveIcon size={13} />
                  <span>{live ? "Live" : "Paused"}</span>
                </button>
                <select
                  value={range}
                  onChange={(event) => setRange(event.target.value)}
                  aria-label="Reporting range"
                >
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </div>
            </div>

            {activeNav === "Overview" ? (
              <AdminOverview
                range={range}
                query={query}
                orders={filteredOrders}
                filter={filter}
                onFilterChange={setFilter}
                onNavigate={navigate}
                onOpenModal={setModal}
                onSelectRow={setSelectedRow}
              />
            ) : activeNav === "Orders" ? (
              <OrdersManagement
                orders={filteredOrders}
                filter={filter}
                setFilter={setFilter}
                setModal={setModal}
                setSelectedRow={setSelectedRow}
              />
            ) : (
              <ManagementWorkspace
                section={activeNav}
                setModal={setModal}
                setSelectedRow={setSelectedRow}
                showNotice={showNotice}
              />
            )}
          </div>
        </section>
        <nav className={styles.mobileDock} aria-label="Admin mobile navigation">
          <button
            onClick={() => navigate("Overview")}
            className={activeNav === "Overview" ? styles.mobileDockActive : ""}
          >
            <HomeIcon size={19} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => navigate("Orders")}
            className={activeNav === "Orders" ? styles.mobileDockActive : ""}
          >
            <BagIcon size={19} />
            <span>Orders</span>
          </button>
          <button
            onClick={() => navigate("Products")}
            className={activeNav === "Products" ? styles.mobileDockActive : ""}
          >
            <ShopIcon size={19} />
            <span>Products</span>
          </button>
          <button onClick={() => setMobileMenu(true)}>
            <MenuIcon size={19} />
            <span>More</span>
          </button>
        </nav>
        <AnimatePresence>
          {(modal || selectedRow) && (
            <motion.button
              key="admin-overlay"
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => {
                setModal(null);
                setSelectedRow(null);
              }}
              aria-label="Close dialog"
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {modal && (
            <ActionModal
              key={modal}
              title={modal}
              close={() => setModal(null)}
              select={setModal}
              submit={submitAction}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedRow && (
            <DetailDrawer
              key={selectedRow.name}
              row={selectedRow}
              close={() => setSelectedRow(null)}
              save={() => {
                showNotice(`${selectedRow.name} updated`);
                setSelectedRow(null);
              }}
            />
          )}
        </AnimatePresence>
        {notice && (
          <div className={styles.toast} role="status">
            ✓ {notice}
          </div>
        )}
      </main>
    </MotionConfig>
  );
}
