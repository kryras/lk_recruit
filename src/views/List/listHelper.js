export const filterList = (item, search) => {
   const keysToFilter = ['name', 'status', 'tags']
   search = search.trim()
   if (search.length === 0) return true
   return Object.entries(item).some(
      ([key, value]) =>
         keysToFilter.includes(key) &&
         (value.toLowerCase?.().includes(search.toLowerCase()) ??
            value
               .join(',')
               .toLowerCase()
               .includes(search.toLowerCase()))
   )
}
export const mapList = item => {
   const tags_display = item.tags.join(', ')
   const cords_display = item.cords.join(', ')
   return { ...item, tags_display, cords_display }
}
