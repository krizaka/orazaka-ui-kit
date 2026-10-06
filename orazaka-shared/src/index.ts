/**
 * @file index.ts
 * @description Barrel export for orazaka-shared schemas, types, and design tokens.
 */

export {
  tokens,
  themes,
  radius,
  typeScale,
  shadows,
  status,
} from "./tokens";

export type { Tokens, ThemeColors, ThemeName } from "./tokens";

export {
  SovereignWorkflowContextSchema,
  minimalContext,
} from "./schemas/sovereign-workflow-context";

export type { SovereignWorkflowContext } from "./schemas/sovereign-workflow-context";

export {
  IntentEnvelopeSchema,
  IntentTokenSchema,
  InterceptorPolicySchema,
} from "./schemas/intent-envelope";

export type {
  IntentEnvelope,
  IntentToken,
  InterceptorPolicy,
  PolicyPredicate,
} from "./schemas/intent-envelope";

// ── Billing & credits (ADR-033) ────────────────────────────────────────────
export {
  CreditBucketSchema,
  BillableCapabilitySchema,
  BillableUnitSchema,
  WalletSchema,
  EntitlementSnapshotSchema,
  EntitlementSchema,
  PlanSchema,
  PackSchema,
  PackSubscriptionSchema,
  PricebookRateSchema,
  MarginPreviewSchema,
  CapabilityUsageSchema,
  ActorConsumptionSchema,
  SubscriptionStatusSchema,
  SubscriptionSchema,
  RefusalSchema,
  CostEstimateSchema,
  CatalogModelSchema,
  capabilityForModelCategory,
  suggestedUnitFor,
  isModelPriced,
  availableCredits,
  formatCredits,
  formatPrice,
} from "./schemas/billing";

export type {
  CreditBucket,
  BillableCapability,
  BillableUnit,
  Wallet,
  EntitlementSnapshot,
  Entitlement,
  Plan,
  Pack,
  PackSubscription,
  PricebookRate,
  MarginPreview,
  CapabilityUsage,
  ActorConsumption,
  SubscriptionStatus,
  Subscription,
  Refusal,
  CostEstimate,
  CatalogModel,
} from "./schemas/billing";

export {
  PackCategorySchema,
  RegulatoryClassSchema,
  PackKindSchema,
  PackAccessSchema,
  PackSummarySchema,
  PackDetailSchema,
} from "./schemas/pack";

export type {
  PackCategory,
  RegulatoryClass,
  PackKind,
  PackAccess,
  PackSummary,
  PackDetail,
} from "./schemas/pack";

// ── Studios: installable business workflows (ADR-034) ──────────────────────
export {
  StudioPricingSchema,
  StudioStatusSchema,
  BlueprintStatusSchema,
  LockReasonSchema,
  InstallationStatusSchema,
  RunStatusSchema,
  RunStepStatusSchema,
  StudioSummarySchema,
  StudioDetailSchema,
  BlueprintVersionSchema,
  InstallationSchema,
  RunStepSchema,
  RunArtefactSchema,
  ArtefactTypeSchema,
  RunOutputsSchema,
  RunSchema,
  isTerminalRun,
  ComposerInputKindSchema,
  ComposerStudioSchema,
} from "./schemas/studio";

export type {
  ComposerInputKind,
  ComposerStudio,
  StudioPricing,
  StudioStatus,
  BlueprintStatus,
  LockReason,
  InstallationStatus,
  RunStatus,
  RunStepStatus,
  StudioSummary,
  StudioDetail,
  BlueprintVersion,
  Installation,
  RunStep,
  RunArtefact,
  ArtefactType,
  RunOutputs,
  Run,
} from "./schemas/studio";
