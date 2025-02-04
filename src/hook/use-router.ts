import { useLocation, useParams } from '@tanstack/react-router'

export default function useRouterHook() {
  const location = useLocation()

  const params = useParams({ strict: false })

  const orgSlug = params?.org || '-'
  const productId = params?.productId || '-'
  const projectSlug =
    localStorage.getItem('clickmax-default-project-slug') || '-'
  const projectId = localStorage.getItem('clickmax-default-project-id') || '-'

  const _pathname = location.pathname

  const searchParams = location.search

  const isWelcome = /[a-zA-Z0-9_-]\/welcome/.test(_pathname)

  const isSettings = /[a-zA-Z0-9_-]\/settings/.test(_pathname)
  const isSettingsProfile = /[a-zA-Z0-9_-]\/settings\/profile/.test(_pathname)

  const isProfile = /[a-zA-Z0-9_-]\/settings\/profile/.test(_pathname)

  const isDomains = /[a-zA-Z0-9_-]\/settings\/domains/.test(_pathname)

  const isCloakers = /[a-zA-Z0-9_-]\/settings\/cloakers/.test(_pathname)

  const isLinkCutter = /[a-zA-Z0-9_-]\/settings\/link-cutter/.test(_pathname)

  const isTracking = /[a-zA-Z0-9_-]\/settings\/tracking/.test(_pathname)

  const isAccountMessages = /[a-zA-Z0-9_-]\/settings\/account-messages/.test(
    _pathname
  )

  const isSeller = /[a-zA-Z0-9_-]\/settings\/seller/.test(_pathname)

  const isDomainsTerms = /\/settings\/domains\/[a-zA-Z0-9_-]+\/terms/.test(
    _pathname
  )

  const isFunnels = /\/funnels/.test(_pathname)

  const isPages = /\/pages/.test(_pathname)

  const isAutomations = /\/automations/.test(_pathname)

  const isMessages = /\/automations\/messages/.test(_pathname)

  const isTemplates = /\/automations\/templates/.test(_pathname)

  const isIntegrations = /[a-zA-Z0-9_-]\/integrations/.test(_pathname)

  const isIntegrationExplore = /[a-zA-Z0-9_-]\/integrations\/explore/.test(
    _pathname
  )

  const isLeads = /[a-zA-Z0-9_-]\/leads/.test(_pathname)

  const isCommunity = /[a-zA-Z0-9_-]\/community/.test(_pathname)

  const isTeams = /\/teams/.test(_pathname)

  const isPayments = /\/profile\/payments/.test(_pathname)

  const isCards = /\/profile\/cards/.test(_pathname)

  const isPans = /\/profile\/plans/.test(_pathname)

  const isPackages = /\/profile\/packages/.test(_pathname)

  const isWallet = /\/profile\/wallet/.test(_pathname)

  const isHelp = /\/help/.test(_pathname)

  const isCloakersFilters = /\/cloakers\/[a-zA-Z0-9_-]+\/filters/.test(
    _pathname
  )

  const isCloakerNeutralPage = /\/cloakers\/[a-zA-Z0-9_-]+\/neutral-page/.test(
    _pathname
  )

  const isCloakerAdvertisingPage =
    /\/cloakers\/[a-zA-Z0-9_-]+\/advertising-page/.test(_pathname)

  const isFunnelEditor =
    /\/projects\/[a-zA-Z0-9_-]+\/funnels\/[a-zA-Z0-9_-]+\/editor/.test(
      _pathname
    )

  const isPageEditor =
    /\/projects\/[a-zA-Z0-9_-]+\/pages\/[a-zA-Z0-9_-]+\/editor/.test(_pathname)

  const isPagePreview =
    /\/projects\/[a-zA-Z0-9_-]+\/pages\/[a-zA-Z0-9_-]+\/preview/.test(_pathname)

  const isPageSeo = /\/pages\/[a-zA-Z0-9_-]+\/seo/.test(_pathname)

  const isPageScript = /\/pages\/[a-zA-Z0-9_-]+\/script/.test(_pathname)

  const isDomainsConnections =
    /\/settings\/domains\/[a-zA-Z0-9_-]+\/connections/.test(_pathname)

  const isDomainsScripts = /\/settings\/domains\/[a-zA-Z0-9_-]+\/scripts/.test(
    _pathname
  )

  const isImportFunnel = /\/import-funnel/.test(_pathname)

  const isImportWorkflow = /\/import-automation/.test(_pathname)

  const isProjects = /\/projects/.test(_pathname)

  const isProjectsAffiliated = /\/projects\/affiliated/.test(_pathname)

  const isRegisterAffiliate = /\/register-affiliate/.test(_pathname)

  const isProjectData = /\/projects\/[a-zA-Z0-9_-]+\/edit\/data/.test(_pathname)

  const isProjectDomains = /\/projects\/[a-zA-Z0-9_-]+\/edit\/domains/.test(
    _pathname
  )

  const isProjectDashboard = /\/projects\/[a-zA-Z0-9_-]+\/edit\/dashboard/.test(
    _pathname
  )

  const isProducts = /[a-zA-Z0-9_-]+\/products/.test(_pathname)

  const isMyProducts = /[a-zA-Z0-9_-]+\/products\/my-products/.test(_pathname)

  const isAffiliates = /[a-zA-Z0-9_-]+\/products\/affiliates/.test(_pathname)

  const isMyAffiliates = /[a-zA-Z0-9_-]+\/products\/my-affiliates/.test(
    _pathname
  )

  const isMarketplace = /[a-zA-Z0-9_-]+\/products\/marketplace/.test(_pathname)

  const isMemberArea = /[a-zA-Z0-9_-]+\/products\/member-area/.test(_pathname)

  const isProjectAffiliatesSettings =
    /\/projects\/[a-zA-Z0-9_-]+\/affiliates/.test(_pathname)

  const isPageSettingsScript = /\/pages\/[a-zA-Z0-9_-]+\/script/.test(_pathname)

  const isPageSettingsSEO = /\/pages\/[a-zA-Z0-9_-]+\/seo/.test(_pathname)

  const isDashboard = /\/dashboard/.test(_pathname)

  const isAffiliatesRequests =
    /[a-zA-Z0-9_-]+\/products\/affiliation-requests/.test(_pathname)

  const isSales = /[a-zA-Z0-9_-]\/sales/.test(_pathname)
  const isSalesMySales = /[a-zA-Z0-9_-]\/sales\/my-sales/.test(_pathname)

  const isIGaming = /\/sales\/my-sales\/igaming/.test(_pathname)

  const isExternalProduct = /\/sales\/my-sales\/external/.test(_pathname)

  const isLeadsList = /\/leads\/lists/.test(_pathname)

  const isTags = /\/leads\/tags/.test(_pathname)

  const isCampaignsEmail = /\/leads\/campaigns\/[a-zA-Z0-9_-]+\/email/.test(
    _pathname
  )

  const isCampaignsWhatsApp =
    /\/leads\/campaigns\/[a-zA-Z0-9_-]+\/whatsapp/.test(_pathname)

  const isCampaignsAutomation =
    /\/leads\/campaigns\/[a-zA-Z0-9_-]+\/automation/.test(_pathname)

  const isCampaignsTelegram =
    /\/leads\/campaigns\/[a-zA-Z0-9_-]+\/telegram/.test(_pathname)

  const isWorkflowEditor =
    /\/projects\/[a-zA-Z0-9_-]+\/automations\/[a-zA-Z0-9_-]+\/editor/.test(
      _pathname
    )

  const isWorkflowEditorImport =
    /\/projects\/[a-zA-Z0-9_-]+\/automations\/[a-zA-Z0-9_-]+\/import/.test(
      _pathname
    )

  const isPartner = /\/partner/.test(_pathname)

  const isLogin = /\/login/.test(_pathname)

  const isAssets = /\/assets/.test(_pathname)

  const isProducer = /[a-zA-Z0-9_-]+\/products/.test(_pathname)

  const isCoproducer = /[a-zA-Z0-9_-]+\/products\/coproducer/.test(_pathname)

  const isAffiliated = /[a-zA-Z0-9_-]+\/products\/affiliated/.test(_pathname)

  return {
    pathname: _pathname,
    searchParams,
    isWelcome,
    isDomains: isProjectDomains ? false : isDomains,
    isDomainsTerms,
    isFunnels,
    isAutomations,
    isMessages,
    isTemplates,
    isCloakers,
    isPages: isCloakers ? false : isPages,
    isIntegrations,
    isIntegrationExplore,
    isLeads,
    isTeams,
    isProfile,
    isPayments,
    isHelp,
    isCloakersFilters,
    isCloakerNeutralPage,
    isCloakerAdvertisingPage,
    isFunnelEditor,
    isPageEditor,
    isPagePreview,
    isPageSeo,
    isPageScript,
    isDomainsConnections,
    isImportFunnel,
    isImportWorkflow,
    isDomainsScripts,
    isProjectData,
    isProjectDomains,
    isPageSettingsScript,
    isPageSettingsSEO,
    isDashboard,
    isProjectDashboard,
    isSeller,
    isSales,
    isWallet,
    isLeadsList,
    isCampaignsEmail,
    isCampaignsWhatsApp,
    isCampaignsAutomation,
    isTags,
    isCampaignsTelegram,
    isIGaming,
    isExternalProduct,
    isCards,
    isPans,
    isPackages,
    isAffiliates,
    isMyAffiliates,
    isWorkflowEditor,
    isWorkflowEditorImport,
    isProjects,
    isProjectsAffiliated,
    isRegisterAffiliate,
    isProjectAffiliatesSettings,
    isAffiliatesRequests,
    isMarketplace,
    isPartner,
    isLogin,
    isAssets,
    isProducts,
    isCommunity,
    isSettings,
    isSettingsProfile,
    isSalesMySales,
    orgSlug,
    projectSlug,
    projectId,
    isLinkCutter,
    isTracking,
    isAccountMessages,
    isMyProducts,
    isMemberArea,
    isProducer,
    isCoproducer,
    isAffiliated,
    productId,
  }
}
