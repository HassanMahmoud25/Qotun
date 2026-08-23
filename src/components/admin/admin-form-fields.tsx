"use client";

import { ProductFields } from "@/components/admin/product-fields";
import { formatPrice, products } from "@/lib/data";
import styles from "@/app/admin/admin.module.css";

export function ContextFields({ title }: { title: string }) {
  const value = title.toLowerCase();
  if (value.includes("product")) return <ProductFields />;
  if (value.includes("purchase order"))
    return (
      <>
        <div className={styles.formGrid}>
          <label>
            Supplier
            <select required defaultValue="">
              <option value="" disabled>
                Select supplier
              </option>
              <option>Misr Spinning & Weaving</option>
              <option>Qotun Workshop</option>
              <option>Cairo Packaging Co.</option>
            </select>
          </label>
          <label>
            Expected arrival
            <input required type="date" />
          </label>
        </div>
        <label>
          Products and quantities
          <textarea
            required
            rows={4}
            placeholder="Luxe Core Set / Natural / King — 120 units"
          />
        </label>
        <div className={styles.formGrid}>
          <label>
            Currency
            <select>
              <option>EGP</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </label>
          <label>
            Estimated cost
            <input type="number" min="0" placeholder="218000" />
          </label>
        </div>
        <label>
          Procurement notes
          <textarea
            rows={3}
            placeholder="Lead time, quality requirements, or packing instructions"
          />
        </label>
      </>
    );
  if (value.includes("order") && !value.includes("purchase"))
    return (
      <>
        <div className={styles.formGrid}>
          <label>
            Customer
            <input
              required
              autoFocus
              placeholder="Search or enter customer name"
            />
          </label>
          <label>
            Phone
            <input required type="tel" placeholder="+20 10 0000 0000" />
          </label>
        </div>
        <label>
          Products
          <select required defaultValue="">
            <option value="" disabled>
              Select a product
            </option>
            {products.map((product) => (
              <option key={product.slug}>
                {product.name} — {formatPrice(product.price)}
              </option>
            ))}
          </select>
        </label>
        <div className={styles.formGrid}>
          <label>
            Quantity
            <input required type="number" min="1" defaultValue="1" />
          </label>
          <label>
            Payment
            <select>
              <option>Payment link</option>
              <option>Cash on delivery</option>
              <option>Bank transfer</option>
            </select>
          </label>
        </div>
        <label>
          Delivery address
          <textarea
            required
            rows={3}
            placeholder="Building, street, area, city"
          />
        </label>
      </>
    );
  if (value.includes("campaign"))
    return (
      <>
        <label>
          Campaign name
          <input
            required
            autoFocus
            placeholder="e.g. Complete your sleep system"
          />
        </label>
        <div className={styles.formGrid}>
          <label>
            Channel
            <select>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Meta Ads</option>
              <option>SMS</option>
            </select>
          </label>
          <label>
            Audience
            <select>
              <option>High-intent sheet buyers</option>
              <option>VIP customers</option>
              <option>90-day win-back</option>
              <option>New Cairo customers</option>
            </select>
          </label>
        </div>
        <label>
          Campaign message
          <textarea
            required
            rows={4}
            placeholder="Write the customer-facing message or creative brief"
          />
        </label>
        <div className={styles.formGrid}>
          <label>
            Send date
            <input type="datetime-local" />
          </label>
          <label>
            Budget (EGP)
            <input type="number" min="0" placeholder="25000" />
          </label>
        </div>
      </>
    );
  if (value.includes("segment"))
    return (
      <>
        <label>
          Segment name
          <input
            required
            autoFocus
            placeholder="e.g. High-intent duvet buyers"
          />
        </label>
        <div className={styles.ruleBuilder}>
          <span>Customers where</span>
          <select>
            <option>Last purchase category</option>
            <option>Lifetime value</option>
            <option>City</option>
            <option>Days since purchase</option>
          </select>
          <select>
            <option>equals</option>
            <option>is greater than</option>
            <option>is less than</option>
            <option>contains</option>
          </select>
          <input required placeholder="Bed Sheets" />
        </div>
        <label>
          Refresh behavior
          <select>
            <option>Keep segment updated automatically</option>
            <option>Create a fixed snapshot</option>
          </select>
        </label>
      </>
    );
  if (value.includes("batch"))
    return (
      <>
        <label>
          Batch name
          <input required autoFocus placeholder="e.g. Cairo morning wave" />
        </label>
        <div className={styles.formGrid}>
          <label>
            Carrier
            <select>
              <option>Bosta</option>
              <option>Mylerz</option>
              <option>Aramex</option>
            </select>
          </label>
          <label>
            Dispatch cutoff
            <input type="time" defaultValue="10:30" />
          </label>
        </div>
        <label>
          Include orders
          <select>
            <option>All ready orders in Cairo</option>
            <option>Priority orders only</option>
            <option>Selected orders</option>
          </select>
        </label>
        <label>
          Fulfillment note
          <textarea rows={3} placeholder="Packing or handoff instructions" />
        </label>
      </>
    );
  if (value.includes("case"))
    return (
      <>
        <div className={styles.formGrid}>
          <label>
            Customer
            <input required autoFocus placeholder="Search customer" />
          </label>
          <label>
            Channel
            <select>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Instagram</option>
            </select>
          </label>
        </div>
        <div className={styles.formGrid}>
          <label>
            Case type
            <select>
              <option>Exchange</option>
              <option>Return</option>
              <option>Delivery issue</option>
              <option>Product care</option>
            </select>
          </label>
          <label>
            Priority
            <select>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </label>
        </div>
        <label>
          Customer issue
          <textarea
            required
            rows={5}
            placeholder="Summarize the conversation and desired outcome"
          />
        </label>
      </>
    );
  if (value.includes("automation"))
    return (
      <>
        <label>
          Automation name
          <input
            required
            autoFocus
            placeholder="e.g. Prevent low-stock sellout"
          />
        </label>
        <div className={styles.workflowStep}>
          <small>WHEN</small>
          <select>
            <option>Inventory cover drops below</option>
            <option>Order is created</option>
            <option>Order is delivered</option>
            <option>Return is requested</option>
          </select>
          <input placeholder="14 days" />
        </div>
        <div className={styles.workflowStep}>
          <small>IF</small>
          <select>
            <option>Product category is Bedding</option>
            <option>Customer is VIP</option>
            <option>Order value exceeds</option>
            <option>Return risk score exceeds</option>
          </select>
          <input placeholder="Optional value" />
        </div>
        <div className={styles.workflowStep}>
          <small>THEN</small>
          <select>
            <option>Create draft purchase order</option>
            <option>Notify operations team</option>
            <option>Send WhatsApp message</option>
            <option>Add priority tag</option>
          </select>
        </div>
      </>
    );
  if (value.includes("report"))
    return (
      <>
        <label>
          Report name
          <input
            required
            autoFocus
            placeholder="e.g. Weekly commercial performance"
          />
        </label>
        <div className={styles.formGrid}>
          <label>
            Primary metric
            <select>
              <option>Net revenue</option>
              <option>Orders</option>
              <option>Contribution margin</option>
              <option>Customer lifetime value</option>
            </select>
          </label>
          <label>
            Group by
            <select>
              <option>Day</option>
              <option>Product</option>
              <option>Collection</option>
              <option>City</option>
              <option>Channel</option>
            </select>
          </label>
        </div>
        <div className={styles.formGrid}>
          <label>
            Date range
            <select>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Year to date</option>
              <option>Custom</option>
            </select>
          </label>
          <label>
            Schedule
            <select>
              <option>Do not schedule</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </label>
        </div>
        <label>
          Share with
          <input placeholder="Team members or email addresses" />
        </label>
      </>
    );
  if (value.includes("account"))
    return (
      <>
        <div className={styles.formGrid}>
          <label>
            Full name
            <input required defaultValue="Hassan Mahmoud" />
          </label>
          <label>
            Role
            <input defaultValue="Super admin" disabled />
          </label>
        </div>
        <label>
          Email
          <input required type="email" placeholder="hassan@qotun.net" />
        </label>
        <label>
          Default workspace
          <select>
            <option>Overview</option>
            <option>Orders</option>
            <option>Reports</option>
          </select>
        </label>
        <label>
          Notification digest
          <select>
            <option>Daily at 9:00 AM</option>
            <option>Weekly</option>
            <option>Critical alerts only</option>
          </select>
        </label>
      </>
    );
  return (
    <>
      <label>
        Name
        <input required autoFocus placeholder="Enter a clear name" />
      </label>
      <label>
        Owner
        <select defaultValue="Hassan Mahmoud">
          <option>Hassan Mahmoud</option>
          <option>Operations team</option>
          <option>Customer care</option>
        </select>
      </label>
      <label>
        Notes
        <textarea rows={3} placeholder="Add context for your team" />
      </label>
    </>
  );
}
