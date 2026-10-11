/** Shared currency helper: we display Sri Lankan rupees, not a hardcoded "$" sign. */
export const formatLKR = (value: number) => `Rs. ${Math.round(value).toLocaleString('en-LK')}`;
export const DEMO_DELIVERY = 350; // Placeholder delivery fee; confirm client's delivery rules.
