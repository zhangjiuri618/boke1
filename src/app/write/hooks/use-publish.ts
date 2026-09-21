import { useCallback } from 'react'
import { readFileAsText } from '@/lib/file-utils'
import { toast } from 'sonner'
import { pushBlog } from '../services/push-blog'
import { deleteBlog } from '../services/delete-blog'
import { useWriteStore } from '../stores/write-store'
import { useAuthStore } from '@/hooks/use-auth'
import { slugify } from '@/lib/markdown-renderer'

function generateSlug(title: string): string {
	const fromTitle = slugify(title || '')
	if (fromTitle) return fromTitle
	// 标题无法生成有效 slug 时，使用时间戳兜底
	return `post-${Date.now().toString(36)}`
}

export function usePublish() {
	const { loading, setLoading, form, cover, images, mode, originalSlug, updateForm } = useWriteStore()
	const { isAuth, setPrivateKey } = useAuthStore()

	const onChoosePrivateKey = useCallback(
		async (file: File) => {
			const pem = await readFileAsText(file)
			setPrivateKey(pem)
		},
		[setPrivateKey]
	)

	const onPublish = useCallback(async () => {
		// 如果 slug 为空，自动从标题生成
		let targetForm = form
		if (!form.slug?.trim()) {
			const generated = generateSlug(form.title)
			updateForm({ slug: generated })
			targetForm = { ...form, slug: generated }
			toast.info(`已自动生成 slug: ${generated}`)
		}

		try {
			setLoading(true)
			await pushBlog({
				form: targetForm,
				cover,
				images,
				mode,
				originalSlug
			})

			const successMsg = mode === 'edit' ? '更新成功' : '发布成功'
			toast.success(successMsg)
		} catch (err: any) {
			console.error(err)
			toast.error(err?.message || '操作失败')
		} finally {
			setLoading(false)
		}
	}, [form, cover, images, mode, originalSlug, setLoading, updateForm])

	const onDelete = useCallback(async () => {
		const targetSlug = originalSlug || form.slug
		if (!targetSlug) {
			toast.error('缺少 slug，无法删除')
			return
		}
		try {
			setLoading(true)
			await deleteBlog(targetSlug)
		} catch (err: any) {
			console.error(err)
			toast.error(err?.message || '删除失败')
		} finally {
			setLoading(false)
		}
	}, [form.slug, originalSlug, setLoading])

	return {
		isAuth,
		loading,
		onChoosePrivateKey,
		onPublish,
		onDelete
	}
}
