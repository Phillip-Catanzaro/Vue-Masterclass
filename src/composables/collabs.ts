import type { GroupedCollabs } from '@/types/GroupCollabs'
import {
  groupedProfilesQuery,
  type Projects,
  type TasksWithProjects
} from '@/utils/supaQueries'

export const useCollabs = () => {
  const groupedCollabs = ref<GroupedCollabs>({})
  const getProfileByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)
    if (error || !data) return []
    return data
  }

  const getGroupedCollabs = async (items: Projects | TasksWithProjects) => {
    const filteredItems = items.filter((item) => item.collaborators.length)
    const promises = items.map((item) => {
      return getProfileByIds(item.collaborators)
    })

    const results = await Promise.all(promises)

    filteredItems.forEach((item, index) => {
      groupedCollabs.value[item.id] = results[index]
    })
  }

  return {
    getProfileByIds,
    getGroupedCollabs,
    groupedCollabs
  }
}
