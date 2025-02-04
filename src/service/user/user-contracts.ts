import type { z } from 'zod'
import UserSchema from '../../schemas/user'

type Flags = {
  messagesEnabled: boolean
  igamingEnabled: boolean
  automationsEnabled: boolean
  productEnabled: boolean
  sellerEnabled: boolean
  salesEnabled: boolean
  crmEnabled: boolean
  plansEnabled: boolean
  coproductEnabled: boolean
  worfklowEnabled: boolean
  affiliatesEnabled: boolean
  conditionalFlowEnabled: boolean
  affiliatesV2Enabled: boolean
  partnerEnabled: boolean
  assetsEnabled: boolean
  startbetEnabled: boolean
}

export interface User {
  id: string
  userId: string
  country: string
  city: string
  state: string
  zipCode: string
  street: string
  number: string
  neighborhood: string
  complement: string
  deletedAt: string | null
  createdAt: string
  updatedAt: string
  firstName: string
  lastName: string
  email: string
  active: boolean
  imageUrl: string
  template: boolean
  phone: string
  imported: boolean | null
  invited: boolean | null
  admin: boolean
  planDuration: number | null
  kyc: boolean | null
  configs: Record<string, unknown> | null
  isFeatured: boolean
  featuredAt: string | null
  moderatedAt: string | null
  moderatorId: string | null
  status: 'approved' | 'pending' | 'refused'
  refusedReason: string
  hash: string
  cpf: string
  birthDate: string
  flags: Flags
  uxAssociatesProject?: string
}

export interface Access {
  plan?: string
  legacy: boolean
  expired: boolean
  trial: boolean
  features: {
    plan_interface: string
    ticto_code?: string
    plan_type?: string
    cloakers?: string
  }
}

export type updateProfileRequest = {
  id: string
  data: Partial<
    z.infer<typeof UserSchema.profile> & {
      configs: {
        startbet?: {
          affiliateCode?: string
        }
        [key: string]: unknown
      }
    }
  >
}
