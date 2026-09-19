export const INIT_DELAY = 0.3
export const ANIMATION_DELAY = 0.1
export const CARD_SPACING = 36
export const CARD_SPACING_SM = 24
export const BLOG_SLUG_KEY = process.env.BLOG_SLUG_KEY || ''

/**
 * GitHub 仓库配置
 */
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'zhangjiuri618',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || 'boke1',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '-',
	// 环境变量优先，未设置时使用本地兜底值
	ENCRYPT_KEY: process.env.NEXT_PUBLIC_GITHUB_ENCRYPT_KEY || '7b619e53042c3c9d61227a9a9d5f92e7fc44619cd690fb28b44ac4e9f5d3e625',
} as const
