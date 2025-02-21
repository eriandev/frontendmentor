import { $ } from 'shared/utils/dom'
import {
  $badgeList,
  $filterClear,
  $filterContainer,
  $filterList,
  $filterSection,
  $jobPosts,
  $main,
} from '@/scripts/declareRefs.ts'

declare global {
  interface Window {
    removeFilter: (button: HTMLButtonElement) => void
  }
}

let filters: string[] = []
window.removeFilter = removeFilter

$badgeList.forEach((badge) => {
  badge.addEventListener('click', () => {
    addFilter(badge.getAttribute('data-filter'))
  })
})

function addFilter(filterName: string | null): void {
  if (filterName == null || $filterSection == null) return

  createBadgeFilter(filterName)

  $filterSection.classList.remove('hidden')
  const uniqueFilters = new Set([...filters, filterName.toLocaleLowerCase()])
  filters = Array.from(uniqueFilters)

  filterJobPosts()
  updateMainMarginTop()

  if (filters.length === 1) {
    $filterClear?.addEventListener('click', clearFilters)
    window.addEventListener('resize', updateMainMarginTop)
  }
}

function createBadgeFilter(filterName: string): void {
  const filterAlreadyExists = filters.includes(filterName.toLocaleLowerCase())

  if ($filterList == null || filterAlreadyExists) return

  $filterList.innerHTML += `<div id="badge-filter-${filterName.toLocaleLowerCase()}" class="badge filter">
  <span class="label">${filterName}</span>
  <button onclick="removeFilter(this)">
    <svg><use width="20" height="20" href="#cross"></use></svg>
  </button>
</div>`
}

function removeFilter(element: HTMLElement): void {
  const filterName = element.parentElement?.id.split('-')[2]

  if (filterName != null) {
    const newFilters = new Set(filters)
    newFilters.delete(filterName.toLocaleLowerCase())
    filters = Array.from(newFilters)
  }

  filterJobPosts()
  deleteParent(element)
  updateMainMarginTop()
}

function deleteParent(element: HTMLElement): void {
  const parentElement = element.parentElement
  parentElement?.remove()

  if (filters.length < 1) clearFilters()
}

function updateMainMarginTop(): void {
  if ($main == null) return
  const filterSectionHeight = ($filterContainer?.offsetHeight ?? 0) + 40
  $main.style.marginTop = filterSectionHeight.toString() + 'px'
}

function clearFilters(): void {
  if ($filterSection == null || $filterList == null) return

  $filterSection.classList.add('hidden')
  $filterList.innerHTML = ''
  filters = []

  if ($main == null) return

  showAllJobPosts()
  $main.removeAttribute('style')
  $filterClear?.removeEventListener('click', clearFilters)
  window.removeEventListener('resize', updateMainMarginTop)
}

function getDataTags(jobPostId: string): string[] {
  const $jobPostArticled = $('#' + jobPostId)

  if ($jobPostArticled == null) return []

  const stringTags = $jobPostArticled.getAttribute('data-tags')
  return stringTags != null ? stringTags.toLocaleLowerCase().split(',') : []
}

function filterJobPosts(): void {
  $jobPosts.forEach(($jobPost) => {
    const dataTags = getDataTags($jobPost.id)

    if (dataTags.length === 0) {
      $jobPost.classList.add('hidden')
      return
    }

    const dataTagsArray = new Set(dataTags)
    const haveSomeFilter = filters.every((filter) => dataTagsArray.has(filter))
    haveSomeFilter ? $jobPost.classList.remove('hidden') : $jobPost.classList.add('hidden')
  })
}

function showAllJobPosts(): void {
  $jobPosts.forEach(($jobPost) => {
    $jobPost.classList.remove('hidden')
  })
}
