import { expect, test } from "@playwright/test";

test("homepage renders core leadership positioning", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Director-Level RevOps Leadership/i);
  await expect(page.getByRole("link", { name: "Hire" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Measured Case Study" })).toBeVisible();
});

test("projects page tag filter narrows visible cards", async ({ page }) => {
  await page.goto("/projects");

  const allFilter = page.locator(".explorer-controls .filter-chip", { hasText: "All" });
  const revOpsFilter = page.locator(".explorer-controls .filter-chip", { hasText: "RevOps" });

  await expect(allFilter).toHaveClass(/is-active/);
  await revOpsFilter.click();
  await expect(revOpsFilter).toHaveClass(/is-active/);

  await expect(page.getByRole("link", { name: "Forecast Quality Dashboard" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Personal Spend Tracker" })).toBeHidden();
});

test("hire page exposes evaluator path and outcomes", async ({ page }) => {
  await page.goto("/hire");

  await expect(page.getByRole("heading", { level: 1, name: "Executive Brief" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "2-Minute Evaluator Path" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Outcome Evidence" })).toBeVisible();
});

test("contact form can be completed to ready-to-submit state", async ({ page }) => {
  await page.goto("/contact");

  const submitButton = page.getByRole("button", { name: "Send Message" });
  await expect(submitButton).toBeDisabled();

  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Project or role context").fill(
    "Testing the recruiter funnel and validating contact form readiness state."
  );

  await expect(submitButton).toBeEnabled();
  await expect(page.getByText("Spam protection is enabled via validation, honeypot, and submission throttling.")).toBeVisible();
  await expect(page.locator(".field-honeypot")).toHaveAttribute("aria-hidden", "true");
  await expect(page.locator(".field-honeypot")).toHaveAttribute("tabindex", "-1");
});
