<template>
   <div class="p-2">
      <div class="field">
         <div class="control">
            <input
               @input="onInput"
               placeholder="Type here..."
               type="text"
               class="input"
            />
         </div>
      </div>
      <Table
         :content="tableContent"
         :config="tableConfig"
         @select="showModal"
      />
      <ListItemEditModal
         v-if="modalVisible"
         @close="closeModal"
         :item="selectedItem"
         @save="saveChanges"
      />
   </div>
</template>
<script>
import Table from '@/components/Table.vue'
import ListItemEditModal from './components/ListItemEditModal.vue'
import { computed, onMounted, reactive, toRefs } from 'vue'
import { filterList, mapList } from './listHelper'
import dummy from '@/assets/dummy.json'
import timeout from 'q'
export default {
   components: { Table, ListItemEditModal },
   setup() {
      const tableConfig = {
         columns: [
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Name' },
            { key: 'cords_display', header: 'Cords' },
            { key: 'tags_display', header: 'Tags' },
            { key: 'status', header: 'Status' }
         ]
      }
      const state = reactive({
         items: [],
         initLoading: true,
         search: '',
         timeout,
         modalVisible: false,
         selectedItem: {}
      })
      const tableContent = computed(() =>
         state.items.filter(item => filterList(item, state.search)).map(mapList)
      )
      const onInput = ({ target: { value } }) => {
         clearTimeout(timeout)
         state.timeout = setTimeout(() => (state.search = value), 500)
      }
      const mockRequest = () => {
         return new Promise(resolve => {
            setTimeout(() => {
               state.items = dummy
               resolve()
            }, 500)
         })
      }
      onMounted(async () => {
         await mockRequest()
         state.loading = false
      })

      let { modalVisible, selectedItem } = toRefs(state)
      const showModal = row => {
         state.selectedItem = row
         state.modalVisible = true
      }
      const closeModal = () => {
         state.selectedItem = {}
         state.modalVisible = false
      }

      const saveChanges = item => {
         const itemToChange = state.items.find(
            element => element.id === item.id
         )
         Object.assign(itemToChange, item)
         closeModal()
      }

      return {
         tableContent,
         tableConfig,
         onInput,
         showModal,
         closeModal,
         modalVisible,
         selectedItem,
         saveChanges
      }
   }
}
</script>
